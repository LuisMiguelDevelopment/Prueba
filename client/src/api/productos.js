import axios from './axios';

export const getProductos = () => axios.get(`/productos`);
