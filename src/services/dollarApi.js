export async function fetchDollarPrice() {

  const response = await fetch(
    'https://dolarapi.com/v1/dolares/oficial'
  )

  return await response.json()
}