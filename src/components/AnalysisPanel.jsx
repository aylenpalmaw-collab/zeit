function AnalysisPanel({

  analysis,
  forecast,
  riskLevel,
  riskScore

}) {

  return (

    <>

      <div className="analysis-panel">

        <p className="analysis-label">
          MARKET ANALYSIS
        </p>

        <div className="analysis-grid">

          <div className="analysis-box">

            <span className="analysis-name">
              CHANGE
            </span>

            <span className="analysis-value">
              {analysis.percentChange}%
            </span>

          </div>

          <div className="analysis-box">

            <span className="analysis-name">
              STABLE
            </span>

            <span className="analysis-value">
              {analysis.stableDays} DAYS
            </span>

          </div>

          <div className="analysis-box">

            <span className="analysis-name">
              VOLATILITY
            </span>

            <span className="analysis-value">
              {analysis.volatility}
            </span>

          </div>

          <div className="analysis-box">

            <span className="analysis-name">
              RISK
            </span>

            <span className="analysis-value">
              {riskLevel}
            </span>

          </div>

          <div className="analysis-box">

            <span className="analysis-name">
              SCORE
            </span>

            <span className="analysis-value">
              {riskScore}/100
            </span>

          </div>

        </div>

        <p className="analysis-message">
          {forecast.marketMessage}
        </p>

      </div>

      <p className="advice">
        {forecast.adviceText}
      </p>

    </>

  )
}

export default AnalysisPanel