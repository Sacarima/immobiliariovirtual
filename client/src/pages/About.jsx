import React from 'react'
import CircleLoader from '../components/CircleLoader.jsx'

const About = () =>{
  return (
    <div 
    style={{ 
        maxWidth: '100%', 
        width: '100%', 
        aspectRatio: '10/6',
        margin: 
        '0 auto' 
        }}
        >
      <CircleLoader />
    </div>
  )
}

export default About

// this is to get the css styling
