import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axiosCustom from '../../utils/axiosCustom'

import {
    Link,
    NavLink,
    useNavigate
} from "react-router-dom"

const Login = () => {
    const [accountName, accountNameUpdate] = useState("")
    const [password, passwordUpdate] = useState("")
    const [accessToken, setAccessToken] = useState('')
    const onEnter = (e) => {
        const onkey = e.key
        if (onkey === 'Enter') {
            ProceedLogin(e)
        }
    }

    const navigate = useNavigate()
    const ProceedLogin = (e) => {
        e.preventDefault()
        axiosCustom.post("/auth/login", {
            accountName: accountName,
            password: password,
        }).then((res) => {
            toast.success('Đăng nhập thành công')
            setAccessToken(localStorage.setItem('accessToken', res.data.data))
            sessionStorage.setItem('isLogin', true)
            window.location.reload();
            navigate('/home')
        }).catch((err) => {
            toast.error(err.message)
        })
    }

    return (
        <div className='row'>
            <div className='offset-lg-4 col-lg-4 ' style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLogin} className='container' onKeyDown={(e) => onEnter(e)}>
                    <div className='card'>
                        <div className='card-header row'>
                            <h2 className="col-auto me-auto">Đăng nhập</h2>
                            <NavLink className="col-auto" to={'/home'}>
                                <button className="btn"><i className="fa fa-close"></i></button>
                            </NavLink>
                        </div>
                        <div className='card-body'>
                            <div className='form-group'>
                                <label>Tên đăng nhập <span className='errmsg'>*</span></label>
                                <input value={accountName} onChange={(e) => accountNameUpdate(e.target.value)} className='form-control'></input>
                            </div>
                            <div className='form-group'>
                                <label>Mật khẩu <span className='errmsg'>*</span></label>
                                <input type={'password'} value={password} onChange={(e) => passwordUpdate(e.target.value)} className='form-control'></input>
                            </div>
                            <button type={'submit'} className='col-md-6 offset-md-3 btn btn-primary' style={{ marginTop: '16px' }}
                            >Đăng nhập</button>
                            <div className='register'><Link to='/register'>Đăng ký ngay</Link></div>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Login
