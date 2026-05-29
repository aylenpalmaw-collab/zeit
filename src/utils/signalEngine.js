export function generateSignal({

  direction,

  intensity,

  volatility,

  riskLevel,

  anomaly

}) {

  /*
  =====================================
  ALERTA FUERTE
  =====================================
  */

  if (
    anomaly &&
    riskLevel === 'HIGH'
  ) {

    return {

      signal: 'CAUTION',

      confidence: 'HIGH',

      message:
        'Se detectó un movimiento fuera de lo normal.'
    }
  }

  /*
  =====================================
  SUBIDA FUERTE
  =====================================
  */

  if (
    direction === 'UP' &&
    intensity === 'HIGH'
  ) {

    return {

      signal: 'BUY',

      confidence: 'HIGH',

      message:
        'El mercado viene mostrando una subida sostenida.'
    }
  }

  /*
  =====================================
  BAJADA FUERTE
  =====================================
  */

  if (
    direction === 'DOWN' &&
    intensity === 'HIGH'
  ) {

    return {

      signal: 'SELL',

      confidence: 'HIGH',

      message:
        'Se detecta una tendencia negativa importante.'
    }
  }

  /*
  =====================================
  MUCHA VOLATILIDAD
  =====================================
  */

  if (
    volatility === 'HIGH'
  ) {

    return {

      signal: 'WAIT',

      confidence: 'MEDIUM',

      message:
        'Hay demasiado movimiento para una señal clara.'
    }
  }

  /*
  =====================================
  ESTABLE
  =====================================
  */

  return {

    signal: 'MONITOR',

    confidence: 'LOW',

    message:
      'Todavía no hay una dirección clara.'
  }
}