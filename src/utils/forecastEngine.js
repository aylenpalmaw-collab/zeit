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
    'El precio se mantiene estable desde hace varios días.'

  let adviceText =
    'Por ahora no se observan cambios importantes.'

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
        ? 'El dólar está subiendo más de lo habitual y mantiene una tendencia clara.'
        : 'El dólar viene subiendo de forma tranquila durante los últimos días.'

    adviceText =
      intensity === 'HIGH'
        ? 'Si la tendencia continúa, podrían verse nuevos aumentos en el corto plazo.'
        : 'Por ahora la tendencia sigue siendo positiva, aunque sin cambios bruscos.'
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
        ? 'El dólar está bajando más de lo habitual y muestra una caída clara.'
        : 'El precio viene bajando de forma gradual respecto a los últimos días.'

    adviceText =
      intensity === 'HIGH'
        ? 'Conviene seguir la evolución del precio antes de tomar decisiones apresuradas.'
        : 'Por ahora la baja sigue siendo moderada y sin movimientos bruscos.'
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
      ' Además, se están viendo movimientos más bruscos de lo habitual.'

    adviceText =
      'Conviene esperar un poco más de estabilidad antes de sacar conclusiones.'
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