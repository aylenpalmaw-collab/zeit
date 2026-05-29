export function analyzeTrend(history) {

  if (!history || history.length < 2) {

    return {

      direction: 'STABLE',

      intensity: 'LOW',

      movement: 0,

      averageVariation: 0
    }
  }

  let ups = 0
  let downs = 0

  let totalVariation = 0

  for (let i = 1; i < history.length; i++) {

    const current =
      history[i].value

    const previous =
      history[i - 1].value

    const variation =
      current - previous

    totalVariation += variation

    if (variation > 0) {
      ups++
    }

    if (variation < 0) {
      downs++
    }
  }

  const averageVariation =
    totalVariation / (history.length - 1)

  let direction = 'STABLE'

  if (ups > downs) {
    direction = 'UP'
  }

  if (downs > ups) {
    direction = 'DOWN'
  }

  let intensity = 'LOW'

  if (Math.abs(averageVariation) >= 3) {
    intensity = 'MEDIUM'
  }

  if (Math.abs(averageVariation) >= 7) {
    intensity = 'HIGH'
  }

  return {

    direction,

    intensity,

    movement:
      averageVariation.toFixed(2),

    averageVariation:
      averageVariation.toFixed(2)
  }
}