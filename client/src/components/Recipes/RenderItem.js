import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { imgUrl } from '../../services/ImgUrl'
import noImg from './../../assets/img/noImg.jpg'
import unknown from './../../assets/img/unknown.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeart1, faBookmark as faBookmark1, faTrashCan, faWrench } from '@fortawesome/free-solid-svg-icons'
import GetRecipeList from '../../components/GetRecipeList'
import { likeClick, bookmarkClick, deleteRecipe } from '../../services/ApiService'
import { toast } from 'react-toastify'

const RenderItem = (props) => {
    const { item } = props

    const [numberOfLikes, setNumberOfLikes] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)

    const [isMarked, setIsMarked] = useState(false)
    const handleMark = () => {
        bookmarkClick(isMarked)
        setIsMarked(!isMarked)
    }

    useEffect(() => {
        if (item) {
            setIsFavorite(item.isFavorite)
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

    const handleDeleteItem = async (recipeId, e) => {
        e.stopPropagation()
        await deleteRecipe(recipeId)
        try {
            toast.success('Xoá thành công')
            window.location.reload()
        } catch (e) { console.log(e) }
    }

    const openEditRecipe = (recipeId) => {
        navigation(`/editrecipe/${recipeId}`)

    }

    return (
        <li className='food-content-container food-content-container1 col-2'>
            <span className='delete-recipe' type={'button'} onClick={(e) => handleDeleteItem(item.recipeId, e)}>
                <FontAwesomeIcon icon={faTrashCan} />
            </span>
            <span className="edit-recipe" onClick={() => openEditRecipe(item.recipeId)}>
                <FontAwesomeIcon icon={faWrench} />
            </span>
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
                <div className='item-header-name'>{item.User.fullName}</div>
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
                    {isMarked
                        ? <FontAwesomeIcon icon={faBookmark1} onClick={handleMark} style={{ marginLeft: '2%', marginRight: '30%', marginTop: '4%', color: 'grey' }} />
                        :
                        <FontAwesomeIcon icon={faBookmark} onClick={handleMark} style={{ marginLeft: '2%', marginRight: '30%', marginTop: '4%' }} />
                    }
                </span>
                <span>{item.recipeName}</span>
            </div>

            <GetRecipeList recipeId={item.recipeId} />
        </li>
    )
}

export default RenderItem