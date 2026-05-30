import { useEffect, useState } from 'react'
import useClock from './hooks/useClock'

import {
  analyzeMarket
} from './utils/marketAnalysis'

import {
  generateForecast
} from './utils/forecastEngine'

import {
  fetchDollarPrice
} from './services/dollarApi'

import ChartPanel from './components/ChartPanel'

import StatsGrid from './components/StatsGrid'

import ForecastPanel from './components/ForecastPanel'

import AnalysisPanel from './components/AnalysisPanel'

import AlertsPanel from './components/AlertsPanel'

import {
  analyzeTrend
} from './utils/trendEngine'

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

import {
  requestNotificationPermission
} from './services/notificationService'

import {
  getNotificationToken
} from './services/firebaseMessaging'

import {
  analyzeOpportunity
} from './utils/opportunityEngine'

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

  /*
  =====================================
  FETCH DOLLAR
  =====================================
  */

  async function fetchDollar() {

    try {

      const data =
        await fetchDollarPrice()

      const currentPrice =
        data.venta

      const opportunity =
  analyzeOpportunity({

      currentPrice,

    history
  })

      if (price !== 0) {

        setPreviousPrice(price)
      }

      setPrice(currentPrice)

      /*
      =====================================
      ALERTS
      =====================================
      */

      const generatedAlerts = []

if (opportunity) {

  generatedAlerts.push({

    type:
      opportunity.type,

    title:
      opportunity.title,

    message:
      opportunity.message
  })
}

      /*
      =====================================
      ANOMALY
      =====================================
      */
      if (
  generatedAlerts.length > 0
) {

  setAlerts((prev) => {

    const validAlerts =
      generatedAlerts.filter(
        (newAlert) =>

          !prev.some(
            (existing) =>

              existing.type ===
              newAlert.type
          )
      )

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

      const now = new Date()

const currentHour =

  `${now.getFullYear()}-` +
  `${String(now.getMonth() + 1).padStart(2, '0')}-` +
  `${String(now.getDate()).padStart(2, '0')} ` +
  `${String(now.getHours()).padStart(2, '0')}:00`

const { data: existingHour } =
  await supabase

    .from('history')

    .select('id')

    .gte(
      'created_at',
      currentHour
    )

    .limit(1)

if (!existingHour?.length) {

  await supabase

    .from('history')

    .insert([{

      price:
        currentPrice,

      trend:
        trendData.direction,

      volatility:
        analysis.volatility,

      business_day: true
    }])
}

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
          currentPrice
        ) {

          return prevHistory
        }

        return [

          ...prevHistory,

          {

            value:
              currentPrice,

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

      await requestNotificationPermission()
      await getNotificationToken()

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

        <ChartPanel
          history={history}
        />

<AnalysisPanel
  analysis={analysis}
  forecast={forecast}
/>

<AlertsPanel
  alerts={alerts}
  dismissAlert={dismissAlert}
/>

      </div>

    </div>
  )
}

export default App