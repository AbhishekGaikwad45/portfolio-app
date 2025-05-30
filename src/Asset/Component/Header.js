import React from 'react'

function Header() {
  return (
    <div className='header'>
        <ul>
           <li><Link className="text" to ={'/'}>Home</Link></li>
            <li><Link className="text" to ={'/about'}>About</Link></li>
            <li><Link className="text" to ={'/projects'}>Projects</Link></li>
            <li><Link className="text" to ={'/contact'}>Contact Us</Link></li>
        </ul>
      
    </div>
  )
}

export default Header
