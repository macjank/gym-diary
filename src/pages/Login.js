import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isError, isPending } = useLogin();

  const handleSubmit = e => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='email'>Email</label>
      <input
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button>Log in</button>
    </form>
  );
};

export default Login;
