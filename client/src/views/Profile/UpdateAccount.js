import React, { Fragment, useState } from 'react'
import axiosCustom1 from '../../utils/axiosCustom1'
import { toast } from 'react-toastify'
import {
    Link,
    NavLink,
    useLocation,
    useNavigate
} from "react-router-dom"


const UpdateAccount = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const authId = localStorage.getItem('authId')
    const [fullName, setFullName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [introduce, setIntroduce] = useState('')
    const [avatar, setAvatar] = useState(null)


    const onUpdateAccount = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('fullName', fullName)
        formData.append('dateOfBirth', dateOfBirth)
        formData.append('address', address)
        formData.append('email', email)
        formData.append('introduce', introduce)
        formData.append('user', avatar)

        axiosCustom1.put(`/user/update/`, formData).then(response => {
            toast.success('Cập nhật thành công')
            toProfile()
        }).catch(err => console.log(err))
    }

    const toProfile = () => {
        navigate(`/profile/${authId}`)
    }

    return (
        <div className='row'>
            <div className='offset-lg-3 col-lg-6' style={{ marginTop: '100px' }}>
                <form className='container' onSubmit={onUpdateAccount}>
                    <div className='card'>
                        <div className='card-header row'>
                            <h2 className="col-auto me-auto">Cập nhật thông tin tài khoản</h2>
                            <div className="col-auto" onClick={toProfile}>
                                <button className="btn"><i className="fa fa-close"></i></button>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className='row' style={{ marginBottom: '16px' }}>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Họ và tên <span className='errmsg'>*</span></label>
                                        <input type={'text'} value={fullName} placeholder={location.state.fullName} onChange={(e) => setFullName(e.target.value)} className='form-control'></input>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Ngày sinh<span className='errmsg'>*</span></label>
                                        <input type={'date'} value={dateOfBirth} placeholder={location.state.dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className='form-control'></input>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Địa chỉ</label>
                                        <input value={address} placeholder={location.state.address} onChange={(e) => setAddress(e.target.value)} className='form-control'></input>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Email <span className='errmsg'>*</span></label>
                                        <input type={'email'} value={email} placeholder={location.state.email} onChange={(e) => setEmail(e.target.value)} className='form-control'></input>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Giới thiệu <span className='errmsg'>*</span></label>
                                        <textarea value={introduce} placeholder={location.state.introduce} onChange={(e) => setIntroduce(e.target.value)} className='form-control'></textarea>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label htmlFor='file'>Chọn ảnh</label>
                                        <input id={'file'} type={'file'} name={'file'} accept={'image/*'}
                                            className='form-control'
                                            onChange={(e) => {
                                                setAvatar(e.target.files[0]);
                                            }}
                                        ></input>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <button type={'submit'} className='btn btn-primary col-md-6 offset-md-3' style={{ width: '30%', margin: 'auto' }}>Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default UpdateAccount