import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAds, getNewCommentText, getAllCommets } from '../../api';
import { useSelector} from 'react-redux';
import styles from './styles.module.css';
import notImage from '../../img/no-pictures.png'
import Header from '../../components/Header'
import Return from '../../components/Return'
import user from '../../img/photo_user.png';
import PhoneNumber from '../../components/PhoneNumber';
import Modal from '../../components/Modal'

const ReviewsModal = ({ productId, onClose }) => {
  const isTokenGlobal = useSelector(state => state.product.tokenExists);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({ text: '' });
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const loadedComments = await getAllCommets(productId);
        setComments(loadedComments);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
    console.log(isTokenGlobal);
  }, [productId]);

  const setCommentUser = (id) => {
    const textInput = document.getElementById('comment');
    const text = textInput.value.trim();
    switch(true) {
      case !text:
        textInput.classList.add(styles.price_blink);
          setTimeout(() => {
            textInput.classList.remove(styles.price_blink);
          }, 2000);
          break;
      default:
        setError('');
        getNewCommentText(id, text)
          .then(() => getAllCommets(id))
          .then((comments) => {
            setComments(comments);
            const totalComments = comments.length;
            setTotalComments(totalComments);
            document.getElementById('comment').value = '';
          })
          .catch((error) => {
            setError('Ошибка при получении комментариев');
          });
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.modal}>
          <div className={styles.modalContent}>
              <form className={styles.modal_form} key={product.id}>
                <span className={styles.modal_form_title}>Отзывы о товаре</span>
                <div className={styles.modal_form_block}>
                  <span>Добавить отзыв</span>
                  <textarea id='comment' className={styles.modal_form_input} type='text' placeholder='Введите отзыв'/>
                </div>
                <button type="button" className={`${styles.main_button} 
                ${styles.save}`} 
                disabled={!isTokenGlobal} 
                onClick={() => setCommentUser(id)}>
                Опубликовать
              </button>
                <div className={styles.modal_form_block}>
                  <div className={styles.modal_form_textarea}>
                  {comments.map(comment => 
                    <div key={comment.id} className={styles.modal_block}>
                      {comment.author.avatar ? (
                      <img className={styles.main__container_img} src={`http://localhost:8090/${comment.author.avatar}`} alt='photo user'/>
                    ) : (
                      <img className={styles.main__container_img} src={user} alt='photo user'/>
                    )}
                        <div className={styles.modal_block_info}>
                            <div className={styles.modal_block_author}>
                              <span style={{fontWeight: 'bold'}}>{comment.author.name}</span>
                              <span style={{color: '#5F5F5F'}}>{new Date(comment.created_on).toLocaleDateString()}</span>
                            </div>
                            <div className={styles.modal_block_coment}>
                                <span style={{fontWeight: 'bold'}}>Комментарий</span>
                                <span>{comment.text}</span>
                            </div>
                        </div>
                    </div>
                  )} 
                  </div>
                </div>
              </form>
          </div>
        </div>
    </Modal>
  );
};

export const Adv = () => {
  const isTokenGlobal = useSelector(state => state.product.tokenExists);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ text: '' });
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [error, setError] = useState('');
  const [formattedSellsFromDate, setFormattedSellsFromDate] = useState(''); // Добавленное объявление переменной
  const [loading, setLoading] = useState(true);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const openReviewsModal = () => {
    setIsReviewsModalOpen(true);
  };

  const formatDate = (date) => {
    const createdDate = new Date(date);
    return `${createdDate.toLocaleDateString('ru-RU')} ${createdDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
  };

  const formatSellsDate = (date) => {
    return formatDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAds(id);
        if (data.error === "Ad not found") {
        } else {
          setProduct([data]);

          const formattedDate = formatDate(data.created_on);
          setProduct(prevProducts => {
            return prevProducts.map(product => ({
              ...product,
              formattedDate: formattedDate
            }));
          });

          const formattedSellsFromDate = formatSellsDate(data.user.sells_from);
          setFormattedSellsFromDate(formattedSellsFromDate);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, navigate]);
  

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getAllCommets(id);
        if (data && Array.isArray(data)) {
          setComments(data);
          setTotalComments(data.length);
        } else {
          setError('Данные комментариев не получены');
        }
      } catch (error) {
        setError('Ошибка при загрузке комментариев');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

 

  return (
    <div>
      <Header />
      <div className={styles.conteiners}>
        <Return />
        {product.map(product => (
          <div key={product.id} className={styles.main}>
            <div className={styles.main__info}>
              <div className={styles.main__info_picture}>
                <div className={styles.main__info_picture_general}>
                  {product.images[0] && product.images[0].url ? (
                    <img className={styles.main__info_bas} src={`http://localhost:8090/${product.images[0].url}`} alt='photo product' />
                  ) : (
                    <img src={notImage} alt="product" className={styles.main__info_bas} />
                  )}
                  <div className={styles.main__info_addition}>
                    {product.images.slice(1).map((image, index) => (
                      image.url ? (
                        <img key={index} className={styles.addition} src={`http://localhost:8090/${image.url}`} alt={`photo ${index + 2}`} />
                      ) : (
                        <div key={index}>Картинка отсутствует</div>
                      )
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.main__info_text}>
                <div className={styles.main__info_text_product}>
                  <div className={styles.main__h3}>{product.title || "Нет названия"}</div>
                  <div className={styles.main__detailed}>
                    <span>{product.formattedDate}</span>
                    <span>{product.user.city}</span>
                    <div>
                    {isReviewsModalOpen && <ReviewsModal productId={id} onClose={() => setIsReviewsModalOpen(false)} />}
                    <span className={styles.main__reviews} onClick={openReviewsModal}>
  {totalComments > 0 ? `${totalComments} ${totalComments === 1 ? 'отзыв' : 'отзыва'}` : 'Нет отзывов'}
</span>

                    </div>
                  </div>
                </div>
                <div className={styles.main__info_text_buttons}>
                  <div className={styles.main__h3}>{product.price} ₽</div>
                  <div>
                  <PhoneNumber product={product} />
                  </div>
                </div>
                <div className={styles.main__info_text_seller}>
                  {product.user.avatar ? (
                    <img className={styles.main__container_img} src={`http://localhost:8090/${product.user.avatar}`} alt='photo user' />
                  ) : (
                    <img className={styles.main__container_img} src={user} alt='photo user' />
                  )}
                  <div className={styles.main__detailed}>
                    <Link to={`/product/${product.id}/seller/${product.user.id}`} style={{ color: "#009EE4", fontWeight: "bold" }}>{product.user.name}</Link>
                    <span>Продает товары с {formattedSellsFromDate}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.main__container}>
                <div className={styles.main__h3}>Описание товара</div>
                <div className={styles.main__content}>
                  {product.description || "Нет подробной информации"}
                </div>
              </div>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Adv;