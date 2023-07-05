import React, { Fragment, useState } from 'react'
import {
    Link,
    NavLink,
    useNavigate
} from "react-router-dom"

const UpdatePassword = () => {
    const authId = localStorage.getItem('authId')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const onChangePassword = () => {
        // console.log('password', password)
        // console.log('password2', password2)
    }

    return (
        <div className='row'>
            <div className='offset-lg-3 col-lg-6'>
                <form className='container' onSubmit={onChangePassword} style={{ marginTop: '100px', width: '50%' }}>
                    <div className='card'>
                        <div className='card-header row'>
                            <h2 className="col-auto me-auto">Đổi mật khẩu</h2>
                            <NavLink className="col-auto" to={`/profile/${authId}`}>
                                <button className="btn"><i className="fa fa-close"></i></button>
                            </NavLink>
                        </div>
                        <div className='card-body'>
                            <div className='row' style={{ marginBottom: '16px' }}>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>Nhập mật khẩu <span className='errmsg'>*</span></label>
                                        <input type={'password'} onChange={(e) => setPassword(e.target.value)} className='form-control'></input>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>Xác nhận mật khẩu <span className='errmsg'>*</span></label>
                                        <input type={'password'} onChange={(e) => setPassword2(e.target.value)} className='form-control'></input>
                                    </div>
                                </div>

                            </div>

                            <div className='row'>
                                <button type={'submit'} className='btn btn-primary col-md-6 offset-md-3' style={{ width: '30%', margin: 'auto' }}>Xác nhận</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default UpdatePassword