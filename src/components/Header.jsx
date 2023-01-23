import React from 'react'

function Header() {
  return (
    <div className='position-sticky top-0 header-bg' style={{zIndex:"99"}}>
        <h1 style={{fontFamily:" Copperplate, Papyrus, fantasy"}}>To-Do-Day</h1>
        <p style={{fontFamily:"Brush Script MT, cursive"}}>Organize your task to Remind you about self-imposed deadline</p>
    </div>
  )
}

export default Header