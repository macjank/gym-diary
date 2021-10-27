import React, { useState } from 'react';
import useSignup from '../hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signup, isError, isPending } = useSignup();

  const handleSubmit = e => {
    e.preventDefault();

    signup(email, password);
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
      <button>Sign up</button>
    </form>
  );
};

export default Signup;
