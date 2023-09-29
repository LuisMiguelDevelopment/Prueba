import axios from "./axios";

export const getCarritos = () => axios.get(`/carrito`);

export const addCarrito = (carrito) => axios.post(`/carrito`, carrito);
