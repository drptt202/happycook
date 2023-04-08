import React, { Fragment, useEffect, useState } from 'react'
import noImg from './../../assets/img/noImg.jpg'
import unknown from './../../assets/img/unknown.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeart1, faBookmark as faBookmark1 } from '@fortawesome/free-solid-svg-icons'
import { imgUrl } from '../../services/ImgUrl'
import { likeClick, bookmarkClick } from '../../services/ApiService'
import { useNavigate } from 'react-router'
import GetRecipeList from '../../components/GetRecipeList'

const RenderItem = (props) => {
    const item = props.item
    const [numberOfLikes, setNumberOfLikes] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
    const [isMarked, setIsMarked] = useState(false)

    const handleMark = () => {
        bookmarkClick(isMarked)
        setIsMarked(!isMarked)
    }
    useEffect(() => {
        if (item) {
            setIsFavorite(item.isFavorite);
            setNumberOfLikes(item.numberOfLikes)
            item.DetailLists && item.DetailLists.length > 0 ? setIsMarked(true) : setIsMarked(false)
        }
    }, [item])

    const handleFavorite = () => {
        setIsFavorite(!isFavorite)
        likeClick(item)
        setNumberOfLikes(isFavorite ? numberOfLikes - 1 : numberOfLikes + 1)
    }

    const navigation = useNavigate()
    const handleOnClickUser = (id) => {
        navigation(`/profile/${id}`)
    }

    const handleOnClickItem = (recipeId) => {
        navigation(`/recipedetails/${recipeId}`)
    }


    return (
        <li key={item.recipeId} className='food-content-container'>
            <div className='item-header' onClick={() => handleOnClickUser(item.User.userId)}>
                {item.User.avatar ?
                    <img className='item-header-avatar' src={`${imgUrl}` + item.User.avatar} alt='' onError={(e) =>
                    (
                        (e.target.src = unknown
                        )
                    )
                    } />
                    : <img className='item-header-avatar' src={unknown} alt='' />
                }
                <p style={{ display: 'inline' }}>{item.User.fullName}</p>
            </div>
            <br />
            <div onClick={() => handleOnClickItem(item.recipeId)}>
                {item.image ?
                    <img src={`${imgUrl}` + item.image} alt='monngon' onError={(e) =>
                    (
                        (e.target.src = noImg
                        )
                    )
                    } />
                    :
                    <img src={noImg} alt='monngon' />
                }

            </div>
            <div className='justify-content-evenly'>
                <span >
                    {isFavorite ?
                        <Fragment >
                            <FontAwesomeIcon icon={faHeart1} onClick={handleFavorite} style={{ color: 'red' }} /> <span>{numberOfLikes}</span>
                        </Fragment>
                        :
                        <Fragment >
                            <FontAwesomeIcon icon={faHeart} onClick={handleFavorite} /> <span>{numberOfLikes}</span>
                        </Fragment>
                    }
                    <GetRecipeList recipeId={item.recipeId} />
                    {isMarked
                        ? <FontAwesomeIcon icon={faBookmark1} onClick={handleMark} style={{ marginLeft: '2%', marginRight: '30%', marginTop: '4%', color: 'grey' }} />
                        :
                        <FontAwesomeIcon icon={faBookmark} onClick={handleMark} style={{ marginLeft: '2%', marginRight: '30%', marginTop: '4%' }} />
                    }
                </span>
                <span>{item.recipeName}</span>
            </div>
        </li>
    )
}

export default RenderItem