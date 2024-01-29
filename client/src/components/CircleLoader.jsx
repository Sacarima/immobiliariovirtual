import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import '../image-slider.css'

const CircleLoader = () => {
  return (
    <div style={{ width: '100%', height: '100%', poistion: 'relative' }}>
      <img 
        src='https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
        alt='Car'
        className='img-slider-img'
      />
      <button
        className='img-slider-btn'
        style={{ left: '0' }}
      >
        <FaArrowLeft />
      </button>
      <button
        className='img-slider-btn'
        style={{ right: '0' }}
      >
        <FaArrowRight />
      </button>
    </div>
  )
}

export default CircleLoader