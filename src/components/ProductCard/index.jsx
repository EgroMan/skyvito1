import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import notImage from '../../img/no-pictures.png';

function ProductCard({ product, editLink }) {
  const firstImageUrl = (product.images.length > 0) ? `http://localhost:8090/${product.images[0].url}` : notImage;
  const createdDate = new Date(product.created_on);
  const formattedDate = `${createdDate.toLocaleDateString('ru-RU')} ${createdDate.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})}`;

  return (
    <div className={styles.content__cards}>
      <div className={styles.cards__item}>
        <div className={styles.cards__card}>
          <div className={styles.card__image}>
            <img src={firstImageUrl} alt="product" className={firstImageUrl ? styles.card__image_first : styles.card__notimage}/>
          </div>
          <div className={styles.card__content}>
            <Link to={editLink || `/product/${product.id}`} className={styles.cardtitle}>
              <div className={styles.mainh3}>{product.title || "Нет названия"}</div>
            </Link>
            <p className={styles.card__price}>{`${product.price} ₽`}</p>
            <p className={styles.card__place}>{product.user.city}</p>
            <p className={styles.card__date}>{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
