import styles from "./styles.module.css";
import Header from "../../components/Header";
import Search from "../../components/Search";
import ProductCard from "../../components/ProductCard";
import { useEffect, useState } from "react";
import { getAllAds } from "../../api";

export const Main = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getAllAds();
      setProducts(data);
      setFilterProducts(data);
    } catch (error) {
      setError("Произошла ошибка: " + error.message);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value); 
    setShowNoResultsMessage(false);
  };

  const handleSearchButtonClick = () => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm !== "") {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(trimmedSearchTerm.toLowerCase())
      );
      setFilterProducts(filtered);
      setShowNoResultsMessage(filtered.length === 0);
    } else {
      handleShowAllProducts();
    }
  };

  const handleShowAllProducts = () => {
    setFilterProducts(products);
    setSearchTerm("");
    setShowNoResultsMessage(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchAndUpdateProducts = async () => {
    fetchData();
  };

  return (
    <div className={styles.container}>
      <Header onAddNewAd={fetchAndUpdateProducts} />
      <div className={styles.conteiners}>
        <Search
          onSearchInputChange={handleSearchInputChange}
          onSearchButtonClick={handleSearchButtonClick}
          searchTerm={searchTerm}
          onShowAllClick={handleShowAllProducts}
          showNoResultsMessage={showNoResultsMessage}
        />
        <div className={styles.main__container}>
          <div className={styles.main__h2}>Объявления</div>
          <div className={styles.main__content}>
            {filterProducts.map((product) => (
              <ProductCard key={product.id} product={product} editLink={`/product/${product.id}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
