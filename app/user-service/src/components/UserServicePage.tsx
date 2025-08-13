import React from 'react';

const UserServicePage: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>User Service Page</h1>
      <p>이것은 사용자 서비스의 메인 페이지입니다.</p>
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h3>사용자 서비스 기능</h3>
        <ul>
          <li>사용자 프로필 관리</li>
          <li>계정 설정</li>
          <li>개인정보 관리</li>
        </ul>
      </div>
    </div>
  );
};

export default UserServicePage; 