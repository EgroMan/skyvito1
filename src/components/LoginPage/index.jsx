import React, { useState } from 'react';
import { login, registration } from '../../api';  // Импортировать функции из файла API
import styles from './styles.module.css'

// Объединенный компонент, включающий формы регистрации и входа
const CombinedAuthForm = ({setIsLoggedIn }) => {
  // Состояния для управления формами и значениями полей
  const [isLoginView, setIsLoginView] = useState(true);  // переключатель между регистрацией и логином
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');

  // Функция для обработки регистрации
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Пароли не совпадают.');
      return;
    }
    try {
      const response = await registration(password, 'user', email, firstName, lastName, '', city);
      console.log('Успешная регистрация', response);
      // Обработка успешной регистрации: например, переход к форме входа
      setIsLoginView(true);  // переключиться на вход после регистрации
    } catch (error) {
      console.error('Ошибка регистрации:', error.message);
    }
  };

  // Функция для обработки входа
  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      console.log('Авторизация успешна', response);
      setIsLoggedIn(true); // Указываем, что пользователь успешно авторизовался
      localStorage.setItem('isLoggedIn', 'true');
    } catch (error) {
      console.error('Ошибка авторизации:', error.message);
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <div className={styles.modalContent}>
      {isLoginView ? (
        // Форма входа
        <div className={styles.modal_div}>
          <input className={styles.modal_form_input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className={styles.modal_form_input} type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className={styles.modal_button} onClick={handleLogin}>Войти</button>
          <button className={styles.modal_button} onClick={() => setIsLoginView(false)}>Зарегистрироваться</button>
        </div>
      ) : (
        // Форма регистрации
        <div className={styles.modal_div_two}>
          <input className={styles.modal_form_input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className={styles.modal_form_input} type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input className={styles.modal_form_input} type="password" placeholder="Повторите пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <input className={styles.modal_form_input} type="text" placeholder="Имя" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input className={styles.modal_form_input} type="text" placeholder="Фамилия" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <input className={styles.modal_form_input} type="text" placeholder="Город" value={city} onChange={(e) => setCity(e.target.value)} />
          <button className={styles.modal_button} onClick={handleRegister}>Зарегистрироваться</button>
          <button className={styles.modal_button} onClick={() => setIsLoginView(true)}>Войти</button>
        </div>
      )}
    </div>
  );
};

export default CombinedAuthForm;
