import React from 'react'

const Footer = (props) => {
  const className = props.className || "";
  return (
    <footer className={`${className} flex justify-center px-4 text-gray-100 bg-black`}>
        <div className="container py-6">
            <h1 className="text-center text-white text-lg font-bold lg:text-2xl">
                MYPT Real Estate Digitalization
            </h1>
        </div>
    </footer>
  )
}

export default Footer