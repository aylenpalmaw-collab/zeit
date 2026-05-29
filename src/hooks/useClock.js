import { useEffect, useState } from 'react'

function useClock() {

  const [currentTime, setCurrentTime] =
    useState('')

  const [marketStatus, setMarketStatus] =
    useState('OPEN')

  useEffect(() => {

    const updateClock = () => {

      const now = new Date()

      const hours =
        now.getHours()
          .toString()
          .padStart(2, '0')

      const minutes =
        now.getMinutes()
          .toString()
          .padStart(2, '0')

      const seconds =
        now.getSeconds()
          .toString()
          .padStart(2, '0')

      setCurrentTime(
        `${hours}:${minutes}:${seconds}`
      )

      if (
        now.getHours() >= 10 &&
        now.getHours() < 17
      ) {

        setMarketStatus('OPEN')

      } else {

        setMarketStatus('CLOSED')
      }
    }

    updateClock()

    const interval =
      setInterval(updateClock, 1000)

    return () =>
      clearInterval(interval)

  }, [])

  return {
    currentTime,
    marketStatus
  }
}

export default useClock
