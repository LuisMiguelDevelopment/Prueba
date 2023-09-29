import React from 'react';
import { useCarritos } from '../context/CarritoContext';

const CarritoPage = () => {
    const { carritos } = useCarritos();

    return (
        <div>
           {
                carritos.map(carrito => (
                    <div key={carrito._id}>
                        <h1>{carrito.Urlimagen}</h1>
                        <p>{carrito.Precio}</p>
                        <br />
                    </div>
                ))
                }
        </div>
    );
};

export default CarritoPage;
