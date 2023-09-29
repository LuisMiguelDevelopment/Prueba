import { createContext, useContext, useState, useEffect } from 'react';
import { getCarritos , addCarrito } from '../api/carrito.js';

const CarritoContext = createContext();

export const useCarritos = () => {
    const context = useContext(CarritoContext);

    if (!context) {
        throw new Error('useCarritos debe utilizarse dentro de CarritoProvider');
    }

    return context;
};

export function CarritoProvider({ children }) {
    const [carritos, setCarritos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Llamando a getCarrito');
                const res = await getCarritos();
                if (Array.isArray(res.data.productosCart)) {
                    setCarritos(res.data.productosCart);
                } else {
                    console.log('productosCart no es un array válido en la respuesta:', res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);


    const addCarrito2 = async (carrito) => {
        console.log('carrito', carrito); 
        try {
            const res = await addCarrito(carrito); 
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    };


    const getImageUrl = (carritos) => {
        return 'http://localhost:4001/uploads/' + carritos.Urlimagen;
      };

    return (
        <CarritoContext.Provider value={{
            carritos,
            getImageUrl,
            addCarrito2
            
            }}>
            {children}
        </CarritoContext.Provider> 
    );
}



 