'use client'
import { useState, useEffect } from 'react'

export const Ticker = ({ startDateTime }: { startDateTime: string }) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0)

  const inputDate = new Date(startDateTime).getTime()

  const minutes = Math.floor(secondsElapsed / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (secondsElapsed % 60).toString().padStart(2, '0')

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime()
      const difference = Math.floor((now - inputDate) / 1000)
      setSecondsElapsed(difference)
    }, 1000)

    return () => clearInterval(intervalId) // Clear interval on unmount
  }, [inputDate])

  return (
    <div className="inline-block px-2 py-1 font-mono border border-black rounded">
      {minutes}:{seconds}
    </div>
  )
}
