import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useIncrementStore } from 'host_service/Store'
import './App.css'

function App() {
  const { getCount, increment } = useIncrementStore();

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
        <button onClick={increment}>
          Noti Service count is {getCount()}
        </button>
        <p>
          <code>src/App.tsx</code> 파일을 수정하고 저장하여 HMR을 테스트하세요.
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
