export function analyzeMarket({
  price,
  previousPrice,
  history
}) {

  const businessHistory = history.filter(
    (item) => item.businessDay
  )

  let stableDays = 0

  for (
    let i = businessHistory.length - 1;
    i > 0;
    i--
  ) {

    const current =
      businessHistory[i].value

    const previous =
      businessHistory[i - 1].value

    if (current === previous) {
      stableDays++
    } else {
      break
    }
  }

  let trend = 'STABLE'

  const recent =
    businessHistory.slice(-5)

  if (recent.length >= 3) {

    let upMoves = 0
    let downMoves = 0

    for (
      let i = 1;
      i < recent.length;
      i++
    ) {

      if (
        recent[i].value >
        recent[i - 1].value
      ) {
        upMoves++
      }

      if (
        recent[i].value <
        recent[i - 1].value
      ) {
        downMoves++
      }
    }

    if (upMoves >= 3) {
      trend = 'UP'
    }

    if (downMoves >= 3) {
      trend = 'DOWN'
    }
  }

  let volatility = 'LOW'

  const recentValues =
    businessHistory
      .slice(-10)
      .map((item) => item.value)

  const range =
    recentValues.length > 0
      ? Math.max(...recentValues) -
        Math.min(...recentValues)
      : 0

  if (range >= 10) {
    volatility = 'MEDIUM'
  }

  if (range >= 25) {
    volatility = 'HIGH'
  }

  let percentChange = 0

  if (
    previousPrice !== null &&
    previousPrice !== 0
  ) {

    percentChange =
      (
        ((price - previousPrice) /
          previousPrice) *
        100
      ).toFixed(2)
  }

  return {
    trend,
    volatility,
    stableDays,
    percentChange
  }
}