export function calculateRisk({

  volatility,

  intensity,

  percentChange

}) {

  let riskLevel = 'LOW'

  let riskScore = 20

  /*
  =====================================
  VOLATILITY
  =====================================
  */

  if (volatility === 'MEDIUM') {

    riskLevel = 'MEDIUM'

    riskScore = 45
  }

  if (volatility === 'HIGH') {

    riskLevel = 'HIGH'

    riskScore = 75
  }

  /*
  =====================================
  INTENSITY
  =====================================
  */

  if (intensity === 'HIGH') {

    riskScore += 15
  }

  /*
  =====================================
  CAMBIOS FUERTES
  =====================================
  */

  if (
    Math.abs(Number(percentChange)) >= 3
  ) {

    riskScore += 10
  }

  /*
  =====================================
  EXTREMO
  =====================================
  */

  if (riskScore >= 90) {

    riskLevel = 'EXTREME'
  }

  else if (riskScore >= 70) {

    riskLevel = 'HIGH'
  }

  else if (riskScore >= 40) {

    riskLevel = 'MEDIUM'
  }

  else {

    riskLevel = 'LOW'
  }

  return {

    riskLevel,

    riskScore
  }
}