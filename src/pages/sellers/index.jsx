import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import Return from '../../components/Return';
import user from '../../img/photo_user.png';
import { getAllAds } from '../../api';
import styles from './styles.module.css'; 
import PhoneNumber from '../../components/PhoneNumber';

const Seller = () => {
  const [products, setProducts] = useState([]);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const { sellerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllAds();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []); 

  const filteredProducts = products.filter(product => product.user.id === Number(sellerId));
  if (filteredProducts.length === 0) {
  }

  const formatDate = (date) => {
    const createdDate = new Date(date);
    return `${createdDate.toLocaleDateString('ru-RU')} ${createdDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
  };

  const togglePhoneNumber = () => {
    setShowPhoneNumber(!showPhoneNumber);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.conteiners}>
        <Return />
        <div className={styles.main__container}>
          <div className={styles.main__h2}>Профиль продавца</div>
          {filteredProducts.map((product, index) => {
            if (index === 0) {
              return (
                <SellerProfile key={product.id} product={product} formatDate={formatDate} showPhoneNumber={showPhoneNumber} togglePhoneNumber={togglePhoneNumber}/>
              );
            }
            return null;
          })}

          <div className={styles.main__h3}>Товары продавца</div>
          <div className={styles.main__content}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} sellerId={sellerId}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SellerProfile = ({ product, formatDate, showPhoneNumber, togglePhoneNumber }) => (
  <div key={product.id} className={styles.main__seller}>
    <img className={styles.main__container_img} src={product.user.avatar ? `http://localhost:8090/${product.user.avatar}` : user} alt='photo user'/>
    <div className={styles.main__seller_info}>
      <span className={styles.main__seller_name}>{product.user.name}</span>
      <span>{product.user.city}</span>
      <span>Продает товары с {formatDate(product.created_on)}</span>
      <PhoneNumber product={product} showPhoneNumber={showPhoneNumber} togglePhoneNumber={togglePhoneNumber} />
    </div>
  </div>
);

export default Seller;
