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
  console.log(products);
  return (
    <Context.Provider value={{ products, loading }}>
      {children}
    </Context.Provider>
  )


}

export default ProductContext;
