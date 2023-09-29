
import {useForm} from 'react-hook-form';
import { useAuth } from '../../context/authContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
    const {register, handleSubmit , formState:{errors}}= useForm();
    const {signup , isAuthenticated, errors: RegisterErrors} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
      if(isAuthenticated) navigate('/');
    },[isAuthenticated , navigate] )

    const onSubmited = handleSubmit(async(values)=>{
      signup(values)
    })
  return (

    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
          {
            RegisterErrors.map((error , i)=>(
              <div className='bg-red-500 text-white p-2 my-2' key={i}>
                { error }
              </div>
            ))
          }
            <form onSubmit={onSubmited}>
                <input type="text" {...register("Nombre",{required:true})} placeholder='UserName' className='w-full bg-zinc-600 text-white px-4 py-4 rounded-md my-2'/>
                  {
                    errors.username && <p className='text-red-500'>UserName is required</p>
                  }
                <input type="email" {...register("Email",{required:true})} placeholder='email' className='w-full bg-zinc-600 text-white px-4 py-4 rounded-md my-2' />
                  {
                    errors.email && <p className='text-red-500'>Email is required</p>
                  }
                <input type="password" {...register("Contrasena",{required:true})} placeholder='password' className='w-full bg-zinc-600 text-white px-4 py-4 rounded-md my-2'/>
                {
                    errors.password && <p className='text-red-500'>Password is required</p>
                  }
                <button type="submit" className="bg-blue-500 hover:bg-slate-700 text-white font-bold py-2 rounded px-4">Register</button>
            </form>
        </div>
    </div>
    
  )
}

export default RegisterPage