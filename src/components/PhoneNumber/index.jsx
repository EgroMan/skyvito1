import React, { Component } from 'react';
import styles from './styles.module.css';

class PhoneNumber extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showPhoneNumber: false,
    };
  }

  togglePhoneNumber = () => {
    this.setState(prevState => ({
      showPhoneNumber: !prevState.showPhoneNumber,
    }));
  }

  render() {
    const { product } = this.props;
    const { showPhoneNumber } = this.state;

    if (!product || !product.user || !product.user.phone) {
      return <div>Номер не указан</div>;
    }

    const { phone } = product.user;
    
    return (
      
        <div onClick={this.togglePhoneNumber} className={`${styles.main} ${styles.button}`}>
          <button className={styles.button}>
            <span className={styles.text}>
              {showPhoneNumber ? "Скрыть номер" : "Показать номер"}
            </span>
            <span className={styles.text}>
              {showPhoneNumber ? phone : `${phone.substring(0, 2)} ❉ ❉ ❉ ❉ ❉ ❉ ❉ `}
            </span>
          </button>
        </div>
    );
  }
}

export default PhoneNumber;
