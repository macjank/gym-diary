import React, { useEffect, useState } from 'react';
import useInfoModal from '../hooks/useInfoModal';
import useSignup from '../hooks/useSignup';
import styles from '../styles/pages/Signup.module.scss';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signup, error, isPending } = useSignup();

  const { modal, onOpenModal, isModalOpen } = useInfoModal();

  useEffect(() => {
    if (error) {
      onOpenModal(error);
    }
  }, [onOpenModal, error]);

  const handleSubmit = e => {
    e.preventDefault();

    signup(email, password, name);
  };

  return (
    <>
      {isModalOpen && modal}
      <section className={styles.wrapper}>
        <h1 className={styles.header}>Create new account</h1>
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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          {!isPending && (
            <button className={styles.form__btnSignup}>Sign up</button>
          )}

          {isPending && (
            <button className={styles.form__btnSignup} disabled>
              Loading...
            </button>
          )}
        </form>
      </section>
    </>
  );
};

export default Signup;
