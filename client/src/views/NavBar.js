import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getAuthor } from '../services/ApiService'

const NavBar = () => {
    const [authId, setAuthId] = useState('')
    const [authData, setAuthData] = useState('')
    useEffect(() => {
        getAuth()
    }, [])

    const getAuth = async () => {
        const result = await getAuthor
        try {
            setAuthData(result.data.data)
            setAuthId(result.data.data.userId)
            localStorage.setItem('authId', result.data.data.userId)
        } catch (error) { console.log(error) }
    }

    const handleLogout = () => {
        sessionStorage.setItem('isLogin', false)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('authId')
        navigate('/')
        window.location.reload();
    }

    const activeStyle = {
        color: '#1d1d1d',
        fontWeight: '600'
    }

    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        setIsLogin(sessionStorage.getItem('isLogin') !== "false")
    }, [])
    return (
        <div className="topnav sticky-top justify-content-between" style={{ margin: '0' }}>
            <div className="col-12">
                <nav className="navbar navbar-expand-lg" >
                    <div className="collapse navbar-collapse justify-content-center">
                        <ul className='navbar-nav'>
                            <li className="nav-item">
                                <NavLink to={'/'} className="nav-link" style={({ isActive }) => isActive ? activeStyle : undefined}>Trang chủ</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/recipes'} className="nav-link" style={({ isActive }) => isActive ? activeStyle : undefined}>Công thức</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/addrecipe'} className="nav-link" style={({ isActive }) => isActive ? activeStyle : undefined}>Thêm công thức</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={`/profile/${authId}`} className="nav-link" style={({ isActive }) => isActive ? activeStyle : undefined}>Tài khoản</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className='nav-item d-flex justify-content-end'>
                        <NavLink to={'/'} className="nav-link" onClick={() => handleLogout()}>Đăng xuất</NavLink>
                    </div>
                </nav>
            </div >
        </div>
    )
}

export default NavBar