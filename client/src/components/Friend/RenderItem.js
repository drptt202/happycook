import React, { Fragment, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'
import { imgUrl } from '../../services/ImgUrl'
import unknown from './../../assets/img/unknown.png'
import { followClick } from '../../services/ApiService'

const RenderItem = (props) => {
    const { item } = props
    const [isFollow, setIsFollow] = useState(false)
    const authId = localStorage.getItem('authId')

    console.log('item', item)

    useEffect(() => {
        if (item) {
            setIsFollow(item.isFollow);
        }
    }, [item])

    const handleFollow = (e) => {
        e.stopPropagation();
        setIsFollow(!isFollow)
        followClick(item)
    }

    const navigation = useNavigate()
    const handleOnClickUser = (id) => {
        navigation(`/profile/${id}`)
    }
    return (
        <Fragment>
            {item.userId != authId &&
                <div className="list-item" onClick={(e) => handleOnClickUser(item.userId, e)}>
                    <div>
                        {item.avatar
                            ?
                            <img className="list-img" src={`${imgUrl}` + item.avatar} style={{ height: '139.44px' }} alt="Photo" onError={(e) =>
                            (
                                (e.target.src = unknown
                                )
                            )
                            } />
                            :
                            <img className="list-img" style={{ height: '139.44px' }} src={unknown} alt="Photo" />
                        }
                        <div className="list-title">
                            <span>{item.fullName}</span>
                            {isFollow ?
                                <div className="is-follow" onClick={(e) => handleFollow(e)}>Đang theo dõi</div>
                                :
                                <div className="is-follow" onClick={(e) => handleFollow(e)}><FontAwesomeIcon icon={faUserPlus} /> Theo dõi</div>
                            }
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default RenderItem