import React from 'react'
import loading from './spinner.gif'

const Spinner = ()=>{
  
    return (
      <div className="text-center"> 
      <img src={loading} alt="spinner" />
      </div>
    )
  
}

export default Spinner;