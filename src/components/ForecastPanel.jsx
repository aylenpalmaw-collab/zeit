function ForecastPanel({

  forecast

}) {

  return (

    <>

      <div className={`ai-panel ${forecast.aiClass}`}>

        <p className="ai-label">
          AI SIGNAL
        </p>

        <h3 className="ai-signal">
          {forecast.aiSignal}
        </h3>

        <p className="ai-confidence">

          Confidence:
          {' '}

          {forecast.aiConfidence}

        </p>

      </div>

      <div className="forecast-panel">

        <p className="forecast-label">
          AI FORECAST
        </p>

        <h3 className="forecast-title">
          {forecast.forecastTitle}
        </h3>

        <div className="forecast-grid">

          <div className="forecast-box">

            <span className="forecast-name">
              PROBABILITY
            </span>

            <span className="forecast-value">
              {forecast.forecastProbability}
            </span>

          </div>

          <div className="forecast-box">

            <span className="forecast-name">
              RANGE
            </span>

            <span className="forecast-value">
              {forecast.forecastRange}
            </span>

          </div>

          <div className="forecast-box">

            <span className="forecast-name">
              VOLATILITY
            </span>

            <span className="forecast-value">
              {forecast.volatility}
            </span>

          </div>

        </div>

      </div>

    </>

  )
}

export default ForecastPanel