export function generateTradingSignal({

  trend,
  percentChange,
  volatility,
  stableDays

}) {

  /*
  =====================================
  BUY
  =====================================
  */

  if (

    trend === 'UP' &&
    percentChange >= 1 &&
    volatility !== 'HIGH'

  ) {

    return {

      signal: 'BUY',

      confidence: 'HIGH',

      message:
        'La tendencia alcista parece sólida.'
    }
  }

  /*
  =====================================
  SELL
  =====================================
  */

  if (

    trend === 'DOWN' &&
    percentChange <= -1

  ) {

    return {

      signal: 'SELL',

      confidence: 'HIGH',

      message:
        'El mercado muestra presión bajista.'
    }
  }

  /*
  =====================================
  HOLD
  =====================================
  */

  if (

    stableDays >= 4

  ) {

    return {

      signal: 'HOLD',

      confidence: 'MEDIUM',

      message:
        'El mercado está lateralizado.'
    }
  }

  /*
  =====================================
  DEFAULT
  =====================================
  */

  return {

    signal: 'WAIT',

    confidence: 'LOW',

    message:
      'No hay una señal clara todavía.'
  }
}