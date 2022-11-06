import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {

  const [tokenValid, setTokenValid] = useState(true);

  useEffect(()=> {

    const token = localStorage.getItem("token");
    console.log(token)

    if (token) {
      // check if token is valid
      console.log('checking if token is valid')
    }
    else {
      // redirect to login page
      console.log('please login')
    }

  }, [])
  
  return (
  <div className='bg-black-700 h-screen'>
  {true ? 
  <Component {...pageProps} /> : 
  <h1>Login please</h1>}
  
  </div>
  )
}

export default MyApp
