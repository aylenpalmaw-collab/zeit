function TradingSignal({

  tradingSignal

}) {

  const signalText = {

    BUY: 'COMPRAR',

    SELL: 'VENDER',

    HOLD: 'ESPERAR'

  }

  return (

    <div
      className={`
        trading-panel
        ${tradingSignal.signal.toLowerCase()}
      `}
    >

      <p className="trading-label">
        RECOMENDACIÓN
      </p>

      <h2 className="trading-signal">
        {
          signalText[
            tradingSignal.signal
          ] ||
          tradingSignal.signal
        }
      </h2>

      <p className="trading-message">
        {tradingSignal.message}
      </p>

    </div>
  )
}

export default TradingSignal