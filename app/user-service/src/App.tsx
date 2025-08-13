import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserServicePage from './components/UserServicePage';
import UserTestPage from './components/UserTestPage';
import './App.css';

export function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* 네비게이션 */}
        <nav style={{ 
          backgroundColor: '#333', 
          padding: '15px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link 
              to="/" 
              style={{ 
                color: 'white', 
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: '#555'
              }}
            >
              User Service
            </Link>
            <Link 
              to="/test" 
              style={{ 
                color: 'white', 
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: '#555'
              }}
            >
              User Test
            </Link>
          </div>
        </nav>

        {/* 라우트 */}
        <Routes>
          <Route path="/" element={<UserServicePage />} />
          <Route path="/test" element={<UserTestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
