
import React, { useState, useEffect } from 'react'; // импорт React и хука useState
import { Link } from 'react-router-dom'; // импорт Link из react-router-dom для навигации
import styles from './styles.module.css'

const Modal = ({ onClose, children }) => {
  // Функция обработки клика вне модального окна
  const handleOutsideClick = (event) => {
    if (event.target.dataset.dismiss === 'true') {
      onClose();
    }
  };

  return (
    <div className={styles.modalContent} data-dismiss="true" onClick={handleOutsideClick}>
      <div className={styles.modal_div} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal