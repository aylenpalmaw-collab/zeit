function AnalysisPanel({

  forecast

}) {

  return (

    <div className="analysis-panel">

      <p className="analysis-label">
        ESTADO DEL MERCADO
      </p>

      <p className="analysis-title">

        {forecast.trendLabel ||
          'Estable'}

      </p>

      <p className="analysis-message">

        {forecast.marketMessage}

      </p>

    </div>

  )
}

export default AnalysisPanel