import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import axiosCustom from '../../utils/axiosCustom'
import unknown from './../../assets/img/unknown.png'
import './Recipe.scss'
import './../Profile/Profile.scss'
import { imgUrl } from '../../services/ImgUrl'
import AddComment from './AddComment'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'


const GetComment = () => {

    const param = useParams()
    const recipeId = param.recipeId
    const authId = localStorage.getItem('authId')
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [comments, setComments] = useState(null)
    const [commentCount, setCommentCount] = useState('')
    const [updateComment, setUpdateComment] = useState('')
    const [authComment, setAuthComment] = useState(null)

    useEffect(() => {
        comments && comments.map(item => {
            if (item.userId == authId) {
                setAuthComment(item);
            }
        })
    }, [comments])

    useEffect(() => {
        axiosCustom.get(`/comment/getCommentOfRecipe/${recipeId}`)
            .then(res => {
                setComments(res.data.data.comment)
                setCommentCount(res.data.data.commentCount)
            })
            .catch(err => { console.log(err) })
    }, [recipeId])

    const commentOption = (e) => {
        if (open === true) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

    const handleDeleteComment = () => {
        deleteComment()
        setAuthComment('')
        setCommentCount(commentCount - 1)
    }

    const handleUpdateComment = () => {
        setAuthComment(prev => ({ ...prev, comment: updateComment }))
        setIsEdit(false)
        putComment()
    }

    const deleteComment = async () => {
        await axiosCustom.delete(`/comment/deleteComment/${recipeId}`)
            .then(res => {
                toast.success('Xoá bình luận thành công')
            })
            .catch(err => { console.log(err) })
    }

    const putComment = async () => {
        await axiosCustom.put(`/comment/updateComment/${recipeId}`, {
            comment: updateComment
        })
            .catch(err => { console.log(err) })
    }


    return (
        <div className='comments-detail'>
            {commentCount ?
                <h6><FontAwesomeIcon icon={faMessage} /> Đã có {commentCount} bình luận</h6>
                : <h6><FontAwesomeIcon icon={faMessage} /> Chưa có bình luận</h6>

            }
            {comments && comments.length > 0 &&
                comments.map(item => (
                    <div key={item.date} className='comment-detail-user'>
                        {item.userId != authId &&
                            <Fragment>
                                {item.User.avatar ?
                                    <img src={`${imgUrl}` + item.User.avatar} alt='' />
                                    : <img src={unknown} alt='' />
                                }
                                <div style={{ display: 'inline' }} className='name-and-date'>
                                    <p className='name'>{item.User.fullName}</p>
                                    <br />
                                    <p className='date'>{item.date}</p>
                                </div>
                                {item.comment &&
                                    <p className='comment'>{item.comment}</p>
                                }
                            </Fragment>
                        }
                    </div>
                ))}
            {authComment &&
                <div className='comment-detail-user'>
                    {authComment.User.avatar ?
                        <img src={`${imgUrl}` + authComment.User.avatar} alt='' />
                        : <img src={unknown} alt='' />
                    }
                    <div style={{ display: 'inline' }} className='name-and-date'>
                        <p className='name'>{authComment.User.fullName}</p>
                        <br />
                        <p className='date'>{authComment.date}</p>
                    </div>
                    {authComment.comment &&
                        <Fragment>
                            {isEdit && authComment
                                ? <div>
                                    <input
                                        autoFocus
                                        value={updateComment}
                                        onChange={(e) => setUpdateComment(e.target.value)}
                                        className='form-control comment comment-input'
                                    />

                                    <div className='submit-btn'>
                                        <input type={'submit'} value={'Xác nhận'} onClick={handleUpdateComment} />
                                        <input type={'submit'} value={'Huỷ'} onClick={() => setIsEdit(false)} />
                                    </div>
                                </div>
                                : <p className='comment'>{authComment.comment}</p>
                            }
                        </Fragment>
                    }

                    {authComment &&
                        <Fragment>
                            <span className='comment-option-btn' onClick={() => commentOption()}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </span>
                            {open &&
                                <ul className='row comment-option'>
                                    <span className="comment-option-item" onClick={() => { setIsEdit(true); commentOption() }}>Chỉnh sửa</span>
                                    <div className="w-100"></div>
                                    <span className="comment-option-item" onClick={() => { handleDeleteComment(); commentOption() }}>Xoá</span>
                                </ul>
                            }
                        </Fragment>
                    }

                </div>
            }
            <AddComment recipeId={recipeId} />
        </div>
    )
}

export default GetComment