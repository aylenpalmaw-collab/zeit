export function generateForecast({

  trend,

  price,

  volatility,

  direction,

  intensity,

  movement

}) {

  let aiSignal = 'STABLE'

  let aiClass = 'neutral'

  let aiConfidence = 'Moderada'

  let forecastTitle =
    'Mercado estable'

  let forecastProbability =
    '50%'

  let forecastRange =
    `$${price}`

  let marketMessage =
    'No se detectan cambios fuertes en el mercado.'

  let adviceText =
    'Conviene esperar movimientos más claros antes de tomar decisiones.'

  /*
  =====================================
  SUBIDA
  =====================================
  */

  if (
    direction === 'UP'
  ) {

    aiSignal = 'UPTREND'

    aiClass = 'up'

    aiConfidence =
      intensity === 'HIGH'
        ? 'Alta'
        : 'Media'

    forecastTitle =
      intensity === 'HIGH'
        ? 'Subida fuerte detectada'
        : 'Tendencia alcista'

    forecastProbability =
      intensity === 'HIGH'
        ? '78%'
        : '64%'

    forecastRange =
      `$${price} → $${price + 10}`

    marketMessage =
      intensity === 'HIGH'
        ? 'El mercado viene mostrando una subida constante y con fuerza.'
        : 'Se observa una tendencia positiva moderada.'

    adviceText =
      intensity === 'HIGH'
        ? 'Hay bastante movimiento positivo. Conviene seguir el comportamiento de cerca.'
        : 'El mercado parece saludable, aunque todavía sin movimientos extremos.'
  }

  /*
  =====================================
  BAJADA
  =====================================
  */

  if (
    direction === 'DOWN'
  ) {

    aiSignal = 'DOWNTREND'

    aiClass = 'down'

    aiConfidence =
      intensity === 'HIGH'
        ? 'Alta'
        : 'Media'

    forecastTitle =
      intensity === 'HIGH'
        ? 'Caída importante detectada'
        : 'Tendencia bajista'

    forecastProbability =
      intensity === 'HIGH'
        ? '74%'
        : '61%'

    forecastRange =
      `$${price - 10} → $${price}`

    marketMessage =
      intensity === 'HIGH'
        ? 'El mercado viene cayendo con bastante intensidad.'
        : 'Se detecta una baja moderada en los últimos movimientos.'

    adviceText =
      intensity === 'HIGH'
        ? 'Hay bastante inestabilidad. Conviene actuar con cautela.'
        : 'El mercado perdió algo de fuerza en las últimas horas.'
  }

  /*
  =====================================
  MUCHA VOLATILIDAD
  =====================================
  */

  if (
    volatility === 'HIGH'
  ) {

    aiConfidence = 'Alta'

    marketMessage +=
      ' Además, hay bastante volatilidad.'

    adviceText =
      'Se recomienda prudencia hasta que el mercado se estabilice.'
  }

  return {

    aiSignal,

    aiClass,

    aiConfidence,

    forecastTitle,

    forecastProbability,

    forecastRange,

    volatility,

    marketMessage,

    adviceText
  }
}