import { useEffect, useState } from 'react'
import useClock from './hooks/useClock'

import {
  analyzeMarket
} from './utils/marketAnalysis'

import {
  generateForecast
} from './utils/forecastEngine'

import {
  generateAlerts
} from './utils/alertSystem'

import {
  fetchDollarPrice
} from './services/dollarApi'

import ChartPanel from './components/ChartPanel'

import StatsGrid from './components/StatsGrid'

import ForecastPanel from './components/ForecastPanel'

import AnalysisPanel from './components/AnalysisPanel'

import AlertsPanel from './components/AlertsPanel'

import TradingSignal from './components/TradingSignal'

import {
  generateTradingSignal
} from './utils/tradingSignal'

import {
  analyzeTrend
} from './utils/trendEngine'

import {
  calculateRisk
} from './utils/riskEngine'

import {
  detectAnomaly
} from './utils/anomalyDetector'

import {
  generateSignal
} from './utils/signalEngine'

import supabase
from './lib/supabase'

import {
  fetchHistory
}
from './services/historyService'

import './styles/app.css'
import './styles/layout.css'
import './styles/market.css'
import './styles/chart.css'
import './styles/stats.css'
import './styles/analysis.css'
import './styles/alerts.css'
import './styles/forecast.css'
import './styles/ai.css'
import './styles/trading.css'

function App() {

  const [price, setPrice] =
    useState(0)

  const [
    previousPrice,
    setPreviousPrice
  ] = useState(null)

  const [updated, setUpdated] =
    useState('')

  const [alerts, setAlerts] =
    useState([])

  const [history, setHistory] =
    useState([])

  const [anomaly, setAnomaly] =
    useState(null)

  const [
    lastAlertTimes,
    setLastAlertTimes
  ] = useState({})

  const {
    currentTime,
    marketStatus
  } = useClock()

  /*
  =====================================
  ANALYSIS
  =====================================
  */

  const analysis =
    analyzeMarket({

      price,
      previousPrice,
      history
    })

  const trendData =
    analyzeTrend(history)

  const riskData =
    calculateRisk({

      volatility:
        analysis.volatility,

      intensity:
        trendData.intensity,

      percentChange:
        analysis.percentChange
    })

  const signalData =
    generateSignal({

      direction:
        trendData.direction,

      intensity:
        trendData.intensity,

      volatility:
        analysis.volatility,

      riskLevel:
        riskData.riskLevel,

      anomaly
    })

  const forecast =
    generateForecast({

      trend:
        analysis.trend,

      price,

      volatility:
        analysis.volatility,

      direction:
        trendData.direction,

      intensity:
        trendData.intensity,

      movement:
        trendData.movement
    })

  const tradingSignal =
    generateTradingSignal({

      trend:
        analysis.trend,

      percentChange:
        Number(
          analysis.percentChange
        ),

      volatility:
        analysis.volatility,

      stableDays:
        analysis.stableDays
    })

  /*
  =====================================
  FETCH DOLLAR
  =====================================
  */

  async function fetchDollar() {

    try {

      const data =
        await fetchDollarPrice()

      const simulatedPrice =
        data.venta

      if (price !== 0) {

        setPreviousPrice(price)
      }

      setPrice(simulatedPrice)

      /*
      =====================================
      ALERTS
      =====================================
      */

      const generatedAlerts =
        generateAlerts({

          price:
            simulatedPrice,

          previousPrice:
            price === 0
              ? null
              : price,

          history
        })

      /*
      =====================================
      ANOMALY
      =====================================
      */

      const detectedAnomaly =
        detectAnomaly({

          price:
            simulatedPrice,

          history
        })

      setAnomaly(
        detectedAnomaly
      )

      /*
      =====================================
      SMART ALERTS
      =====================================
      */

      const businessHistory =
        history.filter(
          (item) =>
            item.businessDay
        )

      const last7Days =
        businessHistory.slice(-7)

      const averagePrice =
        last7Days.length > 0

          ? Math.round(

              last7Days.reduce(
                (acc, item) =>
                  acc + item.value,
                0
              ) / last7Days.length
            )

          : data.venta

      const difference =
        simulatedPrice -
        averagePrice

      /*
      =====================================
      TREND ALERTS
      =====================================
      */

      if (

        analysis.trend === 'UP' &&

        Number(
          analysis.percentChange
        ) >= 2
      ) {

        generatedAlerts.push({

          type: 'up',

          message:
            '📈 Hace varios días que el dólar viene subiendo.'
        })
      }

      if (

        analysis.trend === 'DOWN' &&

        Number(
          analysis.percentChange
        ) <= -2
      ) {

        generatedAlerts.push({

          type: 'down',

          message:
            '📉 El dólar viene bajando hace días.'
        })
      }

      /*
      =====================================
      STABLE MARKET
      =====================================
      */

      if (
        analysis.stableDays >= 5
      ) {

        generatedAlerts.push({

          type: 'neutral',

          message:
            '😴 Mercado muy estable últimamente.'
        })
      }

      /*
      =====================================
      OPPORTUNITY
      =====================================
      */

      if (
        difference <= -10
      ) {

        generatedAlerts.push({

          type: 'down',

          message:
            '💡 El valor actual está más bajo que el promedio reciente.'
        })
      }

      if (
        difference >= 15
      ) {

        generatedAlerts.push({

          type: 'up',

          message:
            '⚠ El valor actual está bastante por encima del promedio reciente.'
        })
      }

      /*
      =====================================
      ANOMALY ALERT
      =====================================
      */

      if (detectedAnomaly) {

        generatedAlerts.push({

          type:
            detectedAnomaly.type,

          message:
            detectedAnomaly.message
        })
      }

      /*
      =====================================
      ALERT COOLDOWN
      =====================================
      */

      const ALERT_COOLDOWN =
        1000 * 60 * 30

      const currentTimestamp =
        Date.now()

      if (
        generatedAlerts.length > 0
      ) {

        setAlerts((prev) => {

          const validAlerts =
            generatedAlerts.filter(
              (newAlert) => {

                const lastTime =
                  lastAlertTimes[
                    newAlert.message
                  ]

                const cooldownPassed =

                  !lastTime ||

                  currentTimestamp -
                    lastTime >
                    ALERT_COOLDOWN

                const alreadyExists =
                  prev.some(
                    (existing) =>

                      existing.message ===
                      newAlert.message
                  )

                return (

                  cooldownPassed &&

                  !alreadyExists
                )
              }
            )

          if (
            validAlerts.length > 0
          ) {

            setLastAlertTimes(
              (prevTimes) => {

                const updatedTimes =
                  { ...prevTimes }

                validAlerts.forEach(
                  (alert) => {

                    updatedTimes[
                      alert.message
                    ] =
                      currentTimestamp
                  }
                )

                return updatedTimes
              }
            )
          }

          return [

            ...validAlerts.map(
              (alert) => ({

                ...alert,

                id:
                  Date.now() +
                  Math.random(),

                time:
                  new Date()
                    .toLocaleTimeString(
                      'es-AR'
                    )
              })
            ),

            ...prev
          ]
        })
      }

      /*
      =====================================
      SAVE TO DATABASE
      =====================================
      */

      await supabase

        .from('history')

        .insert([{

          price:
            simulatedPrice,

          trend:
            trendData.direction,

          volatility:
            analysis.volatility,

          business_day: true
        }])

      /*
      =====================================
      HISTORY
      =====================================
      */

      setHistory((prevHistory) => {

        const lastEntry =
          prevHistory[
            prevHistory.length - 1
          ]

        if (
          lastEntry?.value ===
          simulatedPrice
        ) {

          return prevHistory
        }

        return [

          ...prevHistory,

          {

            value:
              simulatedPrice,

            businessDay: true
          }

        ].slice(-30)
      })

      /*
      =====================================
      UPDATE TIME
      =====================================
      */

      const currentDate =
        new Date()

      const time =

        currentDate
          .getHours()
          .toString()
          .padStart(2, '0')

        +

        ':'

        +

        currentDate
          .getMinutes()
          .toString()
          .padStart(2, '0')

      setUpdated(time)

    } catch (error) {

      console.log(error)
    }
  }

  /*
  =====================================
  INITIAL LOAD
  =====================================
  */

  useEffect(() => {

    async function loadData() {

      const dbHistory =
        await fetchHistory()

      if (dbHistory.length > 0) {

        const formattedHistory =
          dbHistory.map((item) => ({

            value:
              item.price,

            businessDay:
              item.business_day
          }))

        setHistory(
          formattedHistory
        )
      }

      await fetchDollar()
    }

    loadData()

    const interval =
      setInterval(
        fetchDollar,
        60000
      )

    return () =>
      clearInterval(interval)

  }, [])

  /*
  =====================================
  MIN / MAX
  =====================================
  */

  const minPrice =
    history.length > 0

      ? Math.min(
          ...history.map(
            (item) =>
              item.value
          )
        )

      : 0

  const maxPrice =
    history.length > 0

      ? Math.max(
          ...history.map(
            (item) =>
              item.value
          )
        )

      : 0

  /*
  =====================================
  STATUS
  =====================================
  */

  let statusText =
    '▬ Sin cambios'

  let statusClass =
    'neutral'

  if (

    previousPrice !== null &&

    price > previousPrice
  ) {

    statusText =
      '▲ Subiendo'

    statusClass =
      'up'
  }

  if (

    previousPrice !== null &&

    price < previousPrice
  ) {

    statusText =
      '▼ Bajando'

    statusClass =
      'down'
  }

  /*
  =====================================
  ALERT REMOVE
  =====================================
  */

  const dismissAlert = (id) => {

    setAlerts((prev) =>

      prev.filter(
        (alert) =>
          alert.id !== id
      )
    )
  }

  return (

    <div className="app">

      <div className="card">

        <div className="market-bar">

          <div className="market-item">

            <span className="market-title">
              SESSION
            </span>

            <span className="market-value market-open">
              OPEN
            </span>

          </div>

          <div className="market-item">

            <span className="market-title">
              UPDATE
            </span>

            <span className="market-value">
              REALTIME
            </span>

          </div>

        </div>

        <p className="label">
          USD OFICIAL BNA
        </p>

        <h1
          className={`price ${
            statusClass === 'up'
              ? 'price-up'
              : statusClass === 'down'
              ? 'price-down'
              : ''
          }`}
        >
          $ {price}
        </h1>

        <p className={`status ${statusClass}`}>
          {statusText}
        </p>

        <div className="divider"></div>

        <div className="market-bar">

          <div className="market-item">

            <span className="market-title">
              SYSTEM TIME
            </span>

            <span className="market-value">
              {currentTime}
            </span>

          </div>

          <div className="market-item">

            <span className="market-title">
              MARKET
            </span>

            <span
              className={`market-value ${
                marketStatus === 'OPEN'
                  ? 'market-open'
                  : 'market-closed'
              }`}
            >
              {marketStatus}
            </span>

          </div>

        </div>

        <ChartPanel
          history={history}
        />

        <StatsGrid

          minPrice={minPrice}

          maxPrice={maxPrice}

          analysis={analysis}
        />

        <ForecastPanel
          forecast={forecast}
        />

        <TradingSignal
          tradingSignal={tradingSignal}
        />

        <AnalysisPanel

          analysis={analysis}

          forecast={forecast}

          riskLevel={
            riskData.riskLevel
          }

          riskScore={
            riskData.riskScore
          }
        />

        <AlertsPanel

          alerts={alerts}

          dismissAlert={
            dismissAlert
          }
        />

        <p className="updated">

          Última actualización:

          {' '}

          {updated}

        </p>

      </div>

    </div>
  )
}

export default App