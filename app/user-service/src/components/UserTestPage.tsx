import React, { useState } from 'react';

const UserTestPage: React.FC = () => {
  const [testData, setTestData] = useState<string>('');

  const handleTest = () => {
    setTestData('테스트가 성공적으로 실행되었습니다!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Test Page</h1>
      <p>이것은 사용자 서비스의 테스트 페이지입니다.</p>
      
      <div style={{ 
        backgroundColor: '#e8f5e8', 
        padding: '15px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h3>테스트 기능</h3>
        <button 
          onClick={handleTest}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        >
          테스트 실행
        </button>
        
        {testData && (
          <div style={{ 
            backgroundColor: '#d4edda', 
            padding: '10px', 
            borderRadius: '4px',
            border: '1px solid #c3e6cb'
          }}>
            {testData}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTestPage; 