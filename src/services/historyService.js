import supabase
from '../lib/supabase'

export async function fetchHistory() {

  const { data, error } =
    await supabase

      .from('history')

      .select('*')

      .order(
        'created_at',
        { ascending: true }
      )

  if (error) {

    console.log(error)

    return []
  }

  return data
}