import React, { useState, useEffect } from 'react'; // импорт React и хука useState
import { Link } from 'react-router-dom'; // импорт Link из react-router-dom для навигации
import CombinedAuthForm from '../LoginPage'; // импорт объединенной формы авторизации и регистрации
import styles from './styles.module.css'; // импорт стилей
import logo from '../../img/logo_modal.svg';

// Базовый компонент модального окна
const Modal = ({ onClose, children }) => {
  // Функция обработки клика вне модального окна
  const handleOutsideClick = (event) => {
    if (event.target.dataset.dismiss === 'true') {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} data-dismiss="true" onClick={handleOutsideClick}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleLogout = () => setIsLoggedIn(false);

  // Эффект для проверки статуса авторизации
  useEffect(() => {
    if (isLoggedIn) {
      setShowModal(false); // закрыть модальное окно, если пользователь успешно авторизован
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(savedIsLoggedIn);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main_head}>
        {!isLoggedIn ? (
          <div className={styles.main_button} onClick={handleOpenModal}>
            Вход в личный кабинет
          </div>
        ) : (
          <>
            <Link to="/sellers" className={styles.main_button}>
              Разместить объявление
            </Link>
            <Link to="/profile" className={styles.main_button}>
              Личный кабинет
            </Link>
            <button className={styles.main_button_exit} onClick={handleLogout} type="button">
              Выйти
            </button>
          </>
        )}
      </div>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <div className={styles.logoContainer}>
    <img src={logo} alt="Логотип" className={styles.logo} />
  </div>
        <CombinedAuthForm setIsLoggedIn={setIsLoggedIn} onClose={handleCloseModal} />
      </Modal>
      )}
    </div>
  );
};

export default Header;
