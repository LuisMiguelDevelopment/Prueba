import { createContext, useContext, useState } from "react";
import { getProductos } from '../api/productos';

const ProductoContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductoContext);

  if (!context) {
    throw new Error('useProductos must be used within a ProductoProvider');
  }

  return context;
};

export function ProductoProvier({ children }) {
  const [productos, setProductos] = useState([]);

  const getProductoss = async () => {
    try {
      const res = await getProductos();
      setProductos(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Define getImageUrl function outside the JSX
  const getImageUrl = (productos) => {
    return 'http://localhost:4001/uploads/' + productos.Urlimagen;
  };

  return (
    <ProductoContext.Provider value={{
      productos,
      getProductoss,
      getImageUrl
    }}>
      {children}
    </ProductoContext.Provider>
  );
}