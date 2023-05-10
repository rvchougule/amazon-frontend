import React from 'react'
import './NewNavBar.css'
const NewNavbar = () => {
  return (
    <div className='new_nav'>
        <div className='nav_data'>
            <div className='left_data'>
                <p>All</p>
                <p>Mobile</p>
                <p>Bestseller</p>
                <p>Fashion</p>
                <p>Customer Services</p>
                <p>Electronics</p>
                <p>Primes</p>
                <p>Today's deal</p>
                <p>Amazon Pay</p>
            </div>
            <div className='right_data'>
                <img src="./nav.jpg" alt='navata'/>
                </div>
        </div>
    </div>
  )
}

export default NewNavbar