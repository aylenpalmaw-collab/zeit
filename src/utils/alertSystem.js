export function generateAlerts({
  price,
  previousPrice
}) {

  const alerts = []

  if (
    previousPrice === null
  ) {
    return alerts
  }

  const difference =
    Math.abs(price - previousPrice)

  if (difference >= 10) {

    alerts.push({
      type:
        price > previousPrice
          ? 'up'
          : 'down',

      message:
        price > previousPrice
          ? `⚠ El dólar subió $${difference}`
          : `🟢 El dólar bajó $${difference}`
    })
  }

  return alerts
}