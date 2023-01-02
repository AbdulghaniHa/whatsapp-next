import React from 'react'

interface Props {
    title: string;
    onClick?: () => void;
    inverseColor: boolean
}
//  lg:w-60 lg:h-60 md:w-40 md:h-40
function BlockButton(props: Props) {
  return (
  <div className={`col-span-1 ${props.inverseColor? "bg-white text-black-800 hover:text-white hover:bg-custom-green-700" : "bg-custom-green-700 text-white hover:text-black-800 hover:bg-white"} md:h-40  rounded-xl text-center duration-200`} onClick={props.onClick}> 
    <div className={`m-auto lg:text-3xl md:text-lg ${props.inverseColor? "text-[#1f8d7d]" : " text-[#ebe4dc]"} py-2`}>{props.title}</div>
    <div className='m-auto px-2 py-3'>Get varity of information of all of the contacts</div>
    <button 
    className={`border-2 p-3 px-5${props.inverseColor? "bg-white text-black-800 hover:text-white hover:bg-custom-green-700" : "bg-custom-green-700 text-white hover:text-black-800 hover:bg-white"}`}
    >Download</button>
  </div>

  )
}

export default BlockButton