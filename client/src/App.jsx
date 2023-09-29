import {BrowserRouter, Routes , Route} from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import RegisterPage from './pages/crear-cuenta/RegisterPage'
import LoginPage from './pages/iniciar-sesion/LoginPage'
import CarritoPage from './pages/CarritoPage'
import { AuthProvider } from './context/authContext'
import ProtectedRoutes from './ProtectedRoutes'
import { CarritoProvider } from './context/carritoContext'
import Header from './pages/Header/Header'
import Footer from './pages/Footer/Footer'
import Catalogo from './pages/Catalogo/Catalogo'
import { ProductoProvier } from './context/productoContext'
function App() {
  return (
   <>
      <AuthProvider>
        <ProductoProvier>
            <CarritoProvider>
                <BrowserRouter>
                <Header/>
                      <Routes>
                          <Route path='/' element={<HomePage/>} />
                          <Route path='/login' element={<LoginPage/>} />
                          <Route path='/register' element={<RegisterPage/>} />
                          <Route path='/catalogo' element={<Catalogo/>} />
                          
                        <Route element={<ProtectedRoutes/>}> 
                          
                            <Route path='/carrito' element={<CarritoPage/>} />
                          
                        </Route>
                    </Routes>
                    <Footer/>
                  </BrowserRouter>
            </CarritoProvider>
        </ProductoProvier>
      </AuthProvider> 
   </>
  )
}

export default App