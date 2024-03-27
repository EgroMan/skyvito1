import React from 'react';
import styles from './styles.module.css';
import logo from '../../img/Logo.svg';

const Search = ({ onSearchInputChange, onSearchButtonClick, searchTerm, onShowAllClick, showNoResultsMessage }) => {
  const handleSearchButtonClick = () => {
    if (searchTerm.trim() !== "") {
      onSearchButtonClick();
    }
  };

  const handleShowAllClick = () => {
    if (searchTerm !== "") {
      onShowAllClick();
    }
  };

  return (
    <div className={styles.main_search}>
      <img src={logo} alt='logo' />
      <input 
        className={styles.main_block_search} 
        placeholder="Поиск по объявлениям"
        value={searchTerm}
        onChange={onSearchInputChange}
      />
      <button className={styles.main_block_search_button} onClick={handleSearchButtonClick}>Найти</button>
      {showNoResultsMessage && <p className={styles.main_search_nothing}>Нет результатов</p>}
    </div>
  );
}

export default Search;
