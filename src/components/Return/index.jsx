import styles from './styles.module.css';
import logo from '../../img/Logo.svg';
import { Link } from 'react-router-dom';

const Return = () => {
    return (
    <Link to='/' className={styles.main_search}>
        <img src={logo} alt='logo'/>
        <button className={styles.main_block_search_button}>Вернуться на главную</button>
    </Link>
    );
}

export default Return;