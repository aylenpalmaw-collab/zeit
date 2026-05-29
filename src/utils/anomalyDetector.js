export function detectAnomaly({

  price,
  history

}) {

  if (history.length < 5) {

    return null
  }

  const recentPrices =
    history.slice(-5)

  const average =

    recentPrices.reduce(
      (acc, item) =>
        acc + item.value,
      0
    ) / recentPrices.length

  const difference =
    price - average

  /*
  ============================
  STRONG UP
  ============================
  */

  if (difference >= 20) {

    return {

      type: 'up',

      message:
        'Movimiento inusual: el precio subió mucho más rápido de lo normal.'
    }
  }

  /*
  ============================
  STRONG DOWN
  ============================
  */

  if (difference <= -20) {

    return {

      type: 'down',

      message:
        'Movimiento inusual: el precio cayó fuerte frente al promedio reciente.'
    }
  }

  return null
}