import React, { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import axiosCustom from '../../utils/axiosCustom'
import unknown from './../../assets/img/unknown.png'
import './Recipe.scss'
import './../Profile/Profile.scss'
import { imgUrl } from '../../services/ImgUrl'

const AddComment = (props) => {
    const { recipeId } = props
    const authId = localStorage.getItem('authId')
    const [data, setData] = useState(null)
    const [comment, setComment] = useState('')

    const onEnter = (e) => {
        const onkey = e.key
        if (onkey === 'Enter') {
            postComment()
        }
    }

    useEffect(() => {
        axiosCustom.get(`/user/getUser/${authId}`)
            .then(res => {
                const result = res.data.data
                setData(result)
            })
            .catch(err => { console.log(err) })
    }, [authId])

    const postComment = async () => {
        await axiosCustom.post(`/comment/createComment/${recipeId}`, {
            comment: comment
        }).catch((err) => {
            toast.error('Bạn chỉ comment được 1 lần')
        })
        window.location.reload()
    }
    return (
        <div className="add-comment">
            {data &&
                <div className='comment-detail-user'>
                    {data.user.avatar ? <img src={`${imgUrl}` + data.user.avatar} alt="" />
                        :
                        <img src={unknown} alt="" />}

                    <input value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className='form-control comment comment-input'
                        placeholder='Viết bình luận'
                        onKeyDown={(e) => { onEnter(e) }}
                    >
                    </input>
                    <FontAwesomeIcon icon={faPaperPlane}
                        className='add-comment-btn'
                        onClick={() => postComment()}
                    />
                </div>
            }
        </div>
    )
}


export default AddComment