import React, { Fragment, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Profile.scss'
import unknown from './../../assets/img/unknown.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench, faPlus, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import axiosCustom from '../../utils/axiosCustom'
import axiosCustom1 from '../../utils/axiosCustom1'
import MarkList from './MarkList'
import LikedList from './LikedList'
import { imgUrl } from '../../services/ImgUrl'
import { toast } from 'react-toastify'
import Follower from '../Friend/Follower'
import Following from '../Friend/Following'
import { followClick } from '../../services/ApiService'



const Profile = () => {
    const navigate = useNavigate()
    const authId = localStorage.getItem('authId')
    const param = useParams()
    const [profileData, setProfileData] = useState(null)
    const [active, setActive] = useState(param.authId === authId ? 'List' : 'Liked')
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [isFollow, setIsFollow] = useState(false)
    const [userData, setUserData] = useState(null)


    // let Id = ''
    // if (param.id) {
    //     Id = param.id
    // } else {
    //     Id = param.authId
    // }
    const Id = param.authId

    useEffect(() => {
        if (userData) {
            setIsFollow(userData.isFollow);
        }
    }, [userData])

    const handleFollow = (e) => {
        e.stopPropagation();
        setIsFollow(!isFollow)
        followClick(userData)
    }

    console.log('userData', userData)

    const openEditProfile = () => {
        if (open === true) {
            setOpen(false)
        } else {
            setOpen(true)
        }

        if (open === false && open1 === true) {
            setOpen(true)
            setOpen1(false)
        }
    }

    const openAddList = () => {
        if (open1 === true) {
            setOpen1(false)
        } else {
            setOpen1(true)
        }

        if (open1 === false && open === true) {
            setOpen1(true)
            setOpen(false)
        }
    }

    const createRecipeList = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('file', file)
        axiosCustom1.post('/recipeList/createRecipeList/', formData).then(response => {
            toast.success('Thêm thành công')
            setOpen1(false)
        }).catch(err => toast.error('Có lỗi xảy ra'))
    }

    const toUpdateId = () => {
        navigate('/updateID', { state: userData })
    }
    const toChangePassword = () => {
        navigate('/changepassword', { state: userData })
    }

    useEffect(() => {
        axiosCustom.get(`/user/getUser/${Id}`)
            .then(res => {
                const result = res.data.data
                setProfileData(result)
                setUserData(result.user)
            })
            .catch(err => { console.log(err) })
    }, [Id])

    return (
        <Fragment>
            <div className="header__wrapper">
                {authId === param.authId &&
                    <div>
                        <div to={'/updateID'} className="edit-profile-btn" onClick={() => openEditProfile()}>
                            <FontAwesomeIcon icon={faWrench} />
                        </div>
                        {open &&
                            <ul className='row edit-profile-option'>
                                <div onClick={toUpdateId} className="edit-profile-content" style={{ marginBottom: '10px' }}>Cập nhật tài khoản</div>
                                <div className="w-100"></div>
                                <div onClick={toChangePassword} className="edit-profile-content">Đổi mật khẩu</div>
                            </ul>
                        }
                    </div>
                }
                <header></header>
                {profileData && userData &&
                    <div className="cols__container">
                        <div className="left__col lc-bg">
                            <div className="img__container">
                                {userData.avatar ? <img src={`${imgUrl}` + userData.avatar} alt="" onError={(e) =>
                                (
                                    (e.target.src = unknown
                                    )
                                )
                                } />
                                    :
                                    <img src={unknown} alt="" />
                                }
                                <span></span>
                            </div>
                            <h2>{userData.fullName}</h2>

                            <p>{userData.dateOfBirth}</p>
                            <p>{userData.email}</p>
                            <br />
                            {/* <div className="list-title">
                                {isFollow ?
                                    <div className="is-follow" style={{ fontSize: '16px' }} onClick={(e) => handleFollow(e)}>Đang theo dõi</div>
                                    :
                                    <div className="is-follow" style={{ fontSize: '16px' }} onClick={(e) => handleFollow(e)}><FontAwesomeIcon icon={faUserPlus} /> Theo dõi</div>
                                }
                            </div> */}
                            {authId !== param.authId &&
                                <div className="list-title">
                                    {isFollow ?
                                        <div className="is-follow" style={{ fontSize: '16px' }}>Đang theo dõi</div>
                                        :
                                        <div className="is-follow" style={{ fontSize: '16px' }}><FontAwesomeIcon icon={faUserPlus} /> Theo dõi</div>
                                    }
                                </div>
                            }
                            <ul className="about">
                                <li><span>{profileData.countFollowed}</span>Người theo dõi</li>
                                <li><span>{profileData.countFollowing}</span>Đang theo dõi</li>
                            </ul>

                            <div className="content">
                                <p>
                                    {userData.introduce}
                                </p>
                                <br />
                            </div>
                        </div>
                        <div className="right__col">
                            <nav>
                                <ul>
                                    {authId === param.authId &&
                                        <li><NavLink onClick={() => setActive('List')}>Danh sách</NavLink></li>
                                    }
                                    {authId === param.authId ?
                                        <li><NavLink onClick={() => setActive('Liked')}>Yêu thích</NavLink></li>
                                        : <li><NavLink onClick={() => setActive('Liked')}>Công thức</NavLink></li>
                                    }
                                    <li><NavLink onClick={() => setActive('Follower')}>Người theo dõi</NavLink></li>
                                    <li><NavLink onClick={() => setActive('Following')}>Đang theo dõi</NavLink></li>

                                </ul>

                                {active === 'List' && authId === param.authId &&
                                    <button className="add-list-btn" onClick={() => openAddList()}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                }
                                {open1 &&
                                    <form className='add-list-input' onSubmit={createRecipeList}>
                                        <div className='row'>
                                            <h6 className="col-auto me-auto">Thêm danh sách</h6>
                                            <div className="col-auto close-add" onClick={() => setOpen1(false)}><i className="fa fa-close"></i></div>
                                        </div>
                                        <div style={{ marginBottom: '16px' }}>
                                            <div className='form-group '>
                                                <label>Tên danh sách <span className='errmsg'>*</span></label>
                                                <input value={name} className='form-control' onChange={(e) => setName(e.target.value)}></input>
                                            </div>
                                            <br />
                                            <div className='form-group'>
                                                <label htmlFor='file'>Chọn ảnh</label>
                                                <input id={'file'} type={'file'} name={'file'} accept={'image/*'}
                                                    className='form-control'
                                                    onChange={(e) => {
                                                        setFile(e.target.files[0]);
                                                    }}
                                                ></input>
                                            </div>
                                            <div className='row'>
                                                <button type={'submit'} className='btn btn-primary col-md-6 offset-md-3'>
                                                    Thêm</button>
                                            </div>
                                        </div>
                                    </form>
                                }
                            </nav>
                            {active === 'List' && <MarkList Id={Id} />}
                            {authId === param.authId ?
                                <Fragment>
                                    {active === 'Liked' && <LikedList />}
                                </Fragment>
                                :
                                <Fragment>
                                    {active === 'Liked' && <LikedList data={userData.Recipes} />}
                                </Fragment>
                            }
                            {active === 'Follower' && <Follower Id={Id} />}
                            {active === 'Following' && <Following Id={Id} />}

                        </div>
                    </div>
                }
            </div>

        </Fragment >
    )
}

export default Profile