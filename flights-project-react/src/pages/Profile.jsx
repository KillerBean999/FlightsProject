import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from "../hooks/useAuth";

const LOGOUT_URL = 'http://localhost:3001/logout';


export default function Profile() {
    const {auth} = useAuth()
    const user = auth.user
    const nav = useNavigate()

    const logout = () => {
        fetch(LOGOUT_URL)
        localStorage.clear()
        nav('/')
    }

  return (
    <div className='custom-menu'>
        <h1>Hello {user}</h1>
        <br/>
        <button>
            <Link to='/'>Home</Link>
        </button>
        <button>
            <Link to='/flightsAdmin'>Edit Flights</Link>
        </button>
        <button>
            <Link to='/customerList'>Customers List</Link>
        </button>
            <button className='btn' onClick={logout}>Logout</button>
    </div>
  )
}
