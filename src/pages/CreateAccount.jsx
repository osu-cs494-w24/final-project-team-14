// CreateAccount.jsx

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function CreateAccount() {
  // 이메일과 패스워드를 상태로 관리합니다.
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // 입력 필드 변경시 상태를 업데이트합니다.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    // 이메일과 패스워드를 사용하여 계정을 생성하는 로직을 작성합니다.
    console.log('Creating account with:', formData);
    // 이후 필요한 로직을 추가하세요.
  };

  return (
    <div className="create-account-page">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Account</button>
      </form>
      <p>
        Already have an account? <NavLink to="/signup">Login</NavLink>
      </p>
    </div>
  );
}

export default CreateAccount;
