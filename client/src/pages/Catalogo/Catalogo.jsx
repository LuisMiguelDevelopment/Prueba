import './Catalogo.css';
import { useEffect } from 'react';
import { useProductos } from '../../context/productoContext';
import { useCarritos } from '../../context/carritoContext'; // Import useCarritos hook

import corona from './img/back.png';

const Catalogo = () => {
  const { getProductoss, productos, getImageUrl } = useProductos();
  const { addCarrito2 } = useCarritos(); // Get the addCarrito function from the cart context

  useEffect(() => {
    getProductoss();
  }, []);

  const handleAddToCart = (producto) => {
   
    addCarrito2(producto);
  };

  return (
    <div>
      <img className="imgFondo" />
      <main className="main">
        <h2 className="main__titulo">
          CATA<span className="main__titulo main__titulo-span">LOGO</span>
        </h2>
        <div className="catalogo">
          {productos.map((producto) => (
            <div className="card card" key={producto._id}>
              <div className="img">
                <img src={getImageUrl(producto)} alt="" className="card__img" />
                <img src={corona} alt="" className="card__backk" />
              </div>
              <h3 className="card__title">{producto.Nombre}</h3>
              <h4 className="card__cantidad">
                {producto.descripcion}
                <span className="card__cantidad--span">ml</span>
              </h4>
              <span className="card__precio">{producto.Precio}</span>
              {/* Add an onClick handler to call handleAddToCart when the button is clicked */}
              <button onClick={() => handleAddToCart(producto)} className="card__button">
                <span className="card__button-text">AGREGAR</span>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Catalogo;
