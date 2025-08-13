import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [remoteCount, setRemoteCount] = useState(0)

  useEffect(() => {
    // 주기적으로 remote store의 상태를 확인
    const interval = setInterval(async () => {
      try {
        const module = await import('hostService/Store')
        const store = module.useIncrementStore()
        setRemoteCount(store.count)
      } catch (error) {
        console.error('Failed to load remote store:', error)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleIncrement = async () => {
    try {
      const module = await import('hostService/Store')
      const store = module.useIncrementStore()
      store.increment()
      setRemoteCount(store.count)
    } catch (error) {
      console.error('Failed to increment remote store:', error)
      // 로컬 상태로 fallback
      setCount(prev => prev + 1)
    }
  }

  const currentCount = remoteCount || count

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleIncrement}>
          Auth Service count is {currentCount}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
