// create the context
// provide the context
// consume the context
import { createContext, useState, useEffect } from 'react';

export const Context = createContext(null);

const ProductContext = ({ children }) => {
  // list of products
  const [products, setProducts] = useState([])

  // loading state
  const [loading, setLoading] = useState(false)

  //favorites

  const [favoriteItems, setFavoriteItems] = useState([])

  const addToFavorites = (productId, reason) => {

    let copyFavoriteItems = [...favoriteItems]
    const index = copyFavoriteItems.findIndex(item => item.id === productId);

    if (index === -1) {
      const getCurrentProductItem = products.find(item => item.id === productId);
      copyFavoriteItems.push({
        title: getCurrentProductItem.title,
        id: productId,
        reason,
      });

    } else {
      copyFavoriteItems[index] = {
        ...copyFavoriteItems[index],
        reason,
      };
    }
    setFavoriteItems(copyFavoriteItems)
  };

  const handleRemoveFavorites = (getCurentId) => {
    let copyFavoriteItems = [...favoriteItems]

    copyFavoriteItems = copyFavoriteItems.filter(item => item.id !== getCurentId)
    setFavoriteItems(copyFavoriteItems)
  }


  useEffect(() => {
    setLoading(true);
    async function getProductsFromApi() {
      const apiRes = await fetch('https://dummyjson.com/products');
      const finalResult = await apiRes.json();
      if (finalResult) {
        setLoading(false);
        setProducts(finalResult.products);
      }
    }
    getProductsFromApi();
  }, [])

  return (
    <Context.Provider value={{ products, loading, addToFavorites, favoriteItems, handleRemoveFavorites }}>
      {children}
    </Context.Provider>
  )


}

export default ProductContext;
