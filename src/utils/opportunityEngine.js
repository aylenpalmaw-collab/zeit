export function analyzeOpportunity({

  currentPrice,

  history

}) {

  if (!history?.length) {

    return null
  }

  const last24h =
    history.slice(-24)

  const last7Days =
    history.slice(-168)

  const average24h =

    last24h.reduce(
      (acc, item) =>
        acc + item.value,
      0
    ) / last24h.length

  const average7d =

    last7Days.reduce(
      (acc, item) =>
        acc + item.value,
      0
    ) / last7Days.length

  const diff24h =
    currentPrice - average24h

  const diff7d =
    currentPrice - average7d

  /*
  =====================================
  OPORTUNIDAD FUERTE
  =====================================
  */

  if (diff7d <= -10) {

    return {

      type:
        'strong-opportunity',

      title:
        '🔥 Oportunidad fuerte',

      message:
        'El dólar se encuentra significativamente por debajo del promedio reciente. Es una oportunidad de compra poco frecuente.'
    }
  }

  /*
  =====================================
  OPORTUNIDAD
  =====================================
  */

  if (diff7d <= -5) {

    return {

      type:
        'opportunity',

      title:
        '💡 Oportunidad',

      message:
        'El dólar está cotizando por debajo de su valor habitual reciente. Puede ser un buen momento para evaluar una compra.'
    }
  }

  /*
  =====================================
  BAJADA
  =====================================
  */

  if (diff24h <= -2) {

    return {

      type:
        'down',

      title:
        '📉 Bajada',

      message:
        'El dólar comenzó a bajar. Conviene seguir su evolución durante las próximas horas.'
    }
  }

  /*
  =====================================
  SUBIDA
  =====================================
  */

  if (diff24h >= 2) {

    return {

      type:
        'up',

      title:
        '📈 Subida',

      message:
        'El dólar comenzó a subir. Puede que el valor actual no dure mucho tiempo.'
    }
  }

  return null
}