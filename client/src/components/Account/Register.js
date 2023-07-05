import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axiosCustom from '../../utils/axiosCustom';


import {
    NavLink,
    useNavigate
} from "react-router-dom"


const Register = () => {
    const [accountName, accountNameChange] = useState('')
    const [password, passwordChange] = useState("")
    const [password2, password2Change] = useState("")
    const [email, emailChange] = useState("")
    const [fullName, fullNameChange] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosCustom.post("/auth/register", {
            fullName: fullName,
            email: email,
            accountName: accountName,
            password: password,
            password2: password2,
        }).then((res) => {
            toast.success('Đăng ký thành công')
            navigate('/login')
        }).catch((err) => {
            toast.error(err.message)
        })
    }


    return (
        <div className='row'>
            <div className='offset-lg-3 col-lg-6' style={{ marginTop: '100px' }}>
                <form className='container' onSubmit={handleSubmit}>
                    <div className='card'>
                        <div className='card-header row'>
                            <h2 className="col-auto me-auto">Đăng Ký Tài Khoản</h2>
                            <NavLink className="col-auto" to={'/'}>
                                <button className="btn"><i className="fa fa-close"></i></button>
                            </NavLink>
                        </div>
                        <div className='card-body'>
                            <div className='row' style={{ marginBottom: '16px' }}>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Tài khoản <span className='errmsg'>*</span></label>
                                        <input value={accountName} onChange={(e) => accountNameChange(e.target.value)} className='form-control'></input>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Email <span className='errmsg'>*</span></label>
                                        <input type={'email'} value={email} onChange={(e) => emailChange(e.target.value)} className='form-control'></input>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Mật khẩu <span className='errmsg'>*</span></label>
                                        <input type={"password"} value={password} onChange={(e) => passwordChange(e.target.value)} className='form-control'></input>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Họ và tên</label>
                                        <input value={fullName} onChange={(e) => fullNameChange(e.target.value)} className='form-control'></input>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Xác nhận Mật khẩu <span className='errmsg'>*</span></label>
                                        <input type={"password"} value={password2} onChange={(e) => password2Change(e.target.value)} className='form-control'></input>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <button type={'submit'} className='btn btn-primary col-md-6 offset-md-3' style={{ width: '30%', margin: 'auto' }}>Đăng ký</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Register