import React from 'react'
import { LoginForm } from '../components/LoginForm'

const Login = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-end p-6 md:p-10  bg-[url('./fondo.jpg')] bg-no-repeat bg-cover bg-center ">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login    