import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useInfoModal from '../hooks/useInfoModal';
import useLogin from '../hooks/useLogin';
import styles from '../styles/pages/Login.module.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();

  const { modal, onOpenModal, isModalOpen } = useInfoModal();

  useEffect(() => {
    if (error) {
      onOpenModal(error);
    }
  }, [error, onOpenModal]);

  const handleSubmit = e => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <>
      {isModalOpen && modal}

      <section className={styles.wrapper}>
        <h1 className={styles.header}>Log in to your account</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {!isPending && (
            <button className={styles.form__btnLogin}>Log in</button>
          )}

          {isPending && (
            <button className={styles.form__btnLogin} disabled>
              Loading...
            </button>
          )}

          <Link to="/signup">
            <button className={styles.form__btnSignup}>
              No account yet?
              <br />
              Sign up!
            </button>
          </Link>
        </form>
      </section>
    </>
  );
};

export default Login;
