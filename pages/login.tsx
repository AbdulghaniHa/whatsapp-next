import React from 'react'
import { useState } from 'react';


function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  function handelLogin(username: string, password: string) {
    console.log(username, password)
    setUsername("")
    setPassword("")
  }
  
  return (
    <div className='grid h-screen place-items-center'>

        {/* Main border */}
        <div className='w-[590px] h-[590px] bg-custom-green-700 rounded-[50px]'>

            {/* Username Input */}
            <div className='grid place-items-center pt-[10%]'>
              <div>
                <div className='text-white mt-12 text-2xl py-1'>Username</div>
                <input className='bg-custom-green-500 w-[472px] h-[72px] text-xl rounded-xl p-3 text-white outline-0' type="text" value={username} onChange={(e) => {
                  e.preventDefault()
                  setUsername(e.currentTarget.value)
                }}/>
              </div>
            </div>

            {/* password */}
            <div className='grid place-items-center'>
              <div>
                <div className='text-white mt-12 text-2xl py-1'>Password</div>
                <input className='bg-custom-green-500 w-[472px] h-[72px] text-xl rounded-xl p-3 text-white outline-0' type="password" value={password} onChange={(e) => {
                  e.preventDefault()
                  setPassword(e.currentTarget.value)
                }}/>
              </div>
            </div>

            <div className='grid place-items-center pt-[15%]'>
              <button className='w-[235px] h-[67px] bg-white text-custom-green-700 text-[40px] rounded-xl' type='submit' onClick={() => handelLogin(username, password)}>
                Login
              </button>
            </div>

        </div>
        
    </div>
  )
}

export default Login