function TradingSignal({

  tradingSignal

}) {

  return (

    <div
      className={`
        trading-panel
        ${tradingSignal.signal.toLowerCase()}
      `}
    >

      <p className="trading-label">
        TRADING SIGNAL
      </p>

      <h2 className="trading-signal">
        {tradingSignal.signal}
      </h2>

      <p className="trading-confidence">
        Confidence:
        {' '}
        {tradingSignal.confidence}
      </p>

      <p className="trading-message">
        {tradingSignal.message}
      </p>

    </div>
  )
}

export default TradingSignal