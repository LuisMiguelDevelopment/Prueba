import { useState, useEffect } from 'react';
import { useCarritos } from '../../context/carritoContext';
import { useAuth } from '../../context/authContext';
import './Header.css';
import logo from './img/logo.png';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineShoppingCart, AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Header = () => {

    useEffect(() => {

        
        const menus = document.querySelector(".menu");
        const navLinks = document.querySelector(".navbar__enlaces");

        const abrirCarrito = document.querySelector(".abrirCarrito");
        const carrito = document.querySelector(".carrito");
        const salirCarrito = document.querySelector(".salir-carrito");

        const abrir = document.querySelector(".abrir")
        const salirperfil = document.querySelector(".salir-perfil");
        const perfil = document.querySelector(".perfil");
       
        if (menus && navLinks) {
            const burgerMenu = () => {
              navLinks.classList.toggle('mobile-menu');
            };
            const cart = () => {
              carrito.classList.toggle('mobile-menu');
            };
            const perfill = () => {
                perfil.classList.toggle('mobile-menu');
            };
        
            menus.addEventListener('click', burgerMenu);

            abrirCarrito.addEventListener('click', cart);
            salirCarrito.addEventListener('click', cart);

            abrir.addEventListener('click', perfill);
            salirperfil.addEventListener('click', perfill);
        
            return () => {
                menus.removeEventListener('click', burgerMenu);

                abrirCarrito.removeEventListener('click', cart);
                salirCarrito.removeEventListener('click', cart);

                abrir.removeEventListener('click', perfill);
                salirperfil.removeEventListener('click', perfill);
                
            };
          }
        
    
      },[]);
       
      const { carritos , getImageUrl} = useCarritos();
      const { user, profile, isAuthenticathed } = useAuth();
      useEffect(() => {
        profile();
      }, []);
  return (
    <div>
        <div className="navbar">
        <a className="navbar__logo" href="/">
          <img className="navbar__logo navbar__logo--img" src={logo} alt="" />
        </a>
        <div className="navbar__enlaces">
          <ul className="navbar__ul">
            <li className="navbar__li">
              <a href="/" className="navbar__a">INICIO</a>
            </li>
            <li className="navbar__li">
              <Link to="/catalogo" className="navbar__a">CATALOGO</Link>
            </li>
            <li className="navbar__li">
              <a href="" className="navbar__a">CONTACTANOS</a>
            </li>
            <li className="navbar__li">
              <a href="pedidos" className="navbar__a">PEDIDOS</a>
            </li>
            <li className="navbar__li">
              <a className="navbar__a abrir"><CgProfile className='icons'/></a>
            </li>
            <li className="navbar__li">
              <a className="navbar__a abrirCarrito"><AiOutlineShoppingCart className='icons'/></a>
            </li>
          </ul>
        </div>
        <FaBars className="fa-solid fa-bars menu"/>
      </div>

      <div className="perfil">
        <div className="perfil-section">
            <AiOutlineClose className="fa-solid fa-x salir-perfil"/>
          <h2 className="perfil-h2 perfil-titulo">PERFIL</h2>
          
          <div className="perfil-header">
            <img src="../assets/img/perfil.jpg" alt="" className="perfil__img" />
          </div>
          <hr />
          {user && (
              <div className="perfil-body" key={user._id}>
                <h2 className="perfil-h2">NOMBRE</h2>
                <p className="perfil-p">{user.Nombre}</p>
                <h2 className="perfil-h2">CORREO ELECTRONICO</h2>
                <p className="perfil-p">{user.Email}</p>
                {/* Add more profile data fields as needed */}
              </div>
            )}
          <hr />
          <div className="perfil-footer">
            <button className="perfil-button">EDITAR PERFIL</button>
            <button className="perfil-button">CERRAR PERFIL</button>
          </div>
        </div>

        <div className="carrito">
  <AiOutlineClose className="fa-solid fa-x salir-carrito" />
  <div className="carrito-header">
    <div className="carrito__h2">TU CARRITO</div>
  </div>
  {carritos.map((carrito ) => (
    <div className="carrito-items" key={carrito._id}>
      <hr />
      <div className="carrito__body">
        <div className="carrito-img">
          {/* Replace this with your actual cart item image */}
          <img src={getImageUrl({ Urlimagen: carrito.Urlimagen })} className="carrito-producto" alt="" />
        </div>
        <div className="carrito__info">
          <div className="carrito__descripcion">
            <p className="carrito__p">{carrito.Nombre}</p>
            <p className="carrito__p">200ml</p>
          </div>
          <div className="carrito__pr-cant">
            <div className="button-aumt">
              <button className="button-cantidad">-</button>
              <p className="carrito__cantidad">{carrito.Cantidad}</p>
              <button className="button-cantidad">+</button>
            </div>
            <div className="carrito__precio">
              <p className="precio-carrito">{carrito.Precio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  )
}

export default Header