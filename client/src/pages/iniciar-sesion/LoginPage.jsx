import {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, showAlert , isAuthenticated} = useAuth(); // Obtiene la función showAlert del contexto
  const navigate = useNavigate();
    
  useEffect(()=>{
    if(isAuthenticated) navigate('/');
  },[isAuthenticated , navigate] )
  

  const onSubmited = async (data) => {
    try {
      await signin(data);
    } catch (error) {
      showAlert('Error de inicio de sesión', 'Hubo un error durante el inicio de sesión.', 'error');
    }
  }
 
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        <form onSubmit={handleSubmit(onSubmited)}>
          <input type="email" {...register("Email", { required: true })} placeholder='email' className='w-full bg-zinc-600 text-white px-4 py-4 rounded-md my-2' />
          {
            errors.email && <p className='text-red-500'>Email is required</p>
          }
          <input type="password" {...register("Contrasena", { required: true })} placeholder='password' className='w-full bg-zinc-600 text-white px-4 py-4 rounded-md my-2' />
          {
            errors.password && <p className='text-red-500'>Password is required</p>
          }
          <button type="submit" className="bg-blue-500 hover:bg-slate-700 text-white font-bold py-2 rounded px-4">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
