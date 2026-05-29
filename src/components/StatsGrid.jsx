function StatsGrid({

  minPrice,
  maxPrice,
  analysis

}) {

  return (

    <div className="stats-grid">

      <div className="stat-box">

        <span className="stat-label">
          LOW
        </span>

        <span className="stat-value">
          ${minPrice}
        </span>

      </div>

      <div className="stat-box">

        <span className="stat-label">
          HIGH
        </span>

        <span className="stat-value">
          ${maxPrice}
        </span>

      </div>

      <div className="stat-box">

        <span className="stat-label">
          VOLATILITY
        </span>

        <span className="stat-value">
          {analysis.volatility}
        </span>

      </div>

      <div className="stat-box">

        <span className="stat-label">
          STABILITY
        </span>

        <span className="stat-value">
          {analysis.stableDays} DAYS
        </span>

      </div>

    </div>
  )
}

export default StatsGrid