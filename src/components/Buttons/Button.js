import React from 'react'

const Button = ({text, bgColor, onClick}) => {
  return (
    <button 
        className={`rounded-lg p-2 shadow-lg text-white font-semibold w-full
                        ${bgColor ?  `${bgColor}` : `bg-blue-800`}`} 
        onClick={onClick}
    >
        {text}
    </button>
  )
}

export default Button