import { useState, useRef, useEffect } from 'react'
import './style.css'
export default function App() {
  const [recordedTimes, setRecordedTimes] = useState([])
  const { time, startTimer, stopTimer, resetTimer, isRunning } = useTimer(
    0,
    setRecordedTimes
  )
  const handleRecord = () => {
    setRecordedTimes([...recordedTimes, formatTime(time)])
  }
  return (
    <div className="container">
      <h1>Timer</h1>
      <div className="timer_wrapper">
        <h2>{formatTime(time)}</h2>
        <div className="button_wrapper">
          <button className="button" onClick={startTimer} disabled={time}>
            Start
          </button>
          <button onClick={stopTimer} disabled={!isRunning || !time}>
            Stop
          </button>
          <button onClick={resetTimer} disabled={!time}>
            Reset
          </button>
          <button onClick={handleRecord} disabled={!isRunning || !time}>
            Record
          </button>
        </div>
        <div>
          {recordedTimes.map((recordedTime, index) => (
            <h3 key={index}>
              [{index + 1}] {recordedTime}
            </h3>
          ))}
        </div>
      </div>
    </div>
  )
}
const useTimer = (initialTime = 0, setRecordedTimes) => {
  const [time, setTime] = useState(initialTime)
  const isRunning = useRef(false)
  const intervalRef = useRef()
  const startTimer = () => {
    isRunning.current = true
    intervalRef.current = setInterval(() => {
      if (isRunning.current) {
        setTime(time => time + 1)
      }
    }, 1000)
  }
  const stopTimer = () => {
    isRunning.current = false
    clearInterval(intervalRef.current)
  }
  const resetTimer = () => {
    setTime(initialTime)
    setRecordedTimes([])
    clearInterval(intervalRef.current)
    isRunning.current = false
  }
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])
  return {
    time,
    isRunning: isRunning.current,
    startTimer,
    stopTimer,
    resetTimer
  }
}
const formatTime = time => {
  const getSeconds = `0${time % 60}`.slice(-2)
  const minutes = Math.floor(time / 60)
  const getMinutes = `0${minutes % 60}`.slice(-2)
  const getHours = `0${Math.floor(minutes / 60)}`.slice(-2)
  return `${getHours} : ${getMinutes} : ${getSeconds}`
}
