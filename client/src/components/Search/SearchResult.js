import React, { useEffect, useState, Fragment } from 'react'
import SearchBox from './SearchBox'
import IngredientRecomment from '../Home/IngredientRecomment'
import { Link, NavLink, useNavigate, useParams, useLocation } from 'react-router-dom'
import { getAllRecipe, getRecipeBySlug, searchRecipeByName } from '../../services/ApiService'
import axiosCustom from '../../utils/axiosCustom'
import { toast } from 'react-toastify'
import { imgUrl } from '../../services/ImgUrl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeart1, faBookmark as faBookmark1 } from '@fortawesome/free-solid-svg-icons'
import noImg from './../../assets/img/noImg.jpg'
import unknown from './../../assets/img/unknown.png'


const SearchResult = () => {
    const param = useParams()
    const search = param.search
    const [data, setData] = useState(null)

    useEffect(() => {
        getRecipe(search)
        getRecipebyInput()
        getRecipebyName(search)
    }, [search])

    const getRecipe = async (search) => {
        const result = await getRecipeBySlug(search)
        try {
            setData(result.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const getRecipebyInput = async () => {
        const result = await getAllRecipe
        try {
            const result1 = await result.data.data.filter(result => {
                return result.recipeName === search
            })
            setData(result1)

        }
        catch (err) {
            console.log(err)
        }
    }

    const getRecipebyName = async (search) => {
        const result = await searchRecipeByName(search)
        try {
            setData(result.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const navigation = useNavigate()
    const handleOnClickUser = (id) => {
        navigation(`/profile/${id}`)
    }

    const likeClick = (item) => {
        if (item.isFavorite === false) {
            axiosCustom.post(`/favorite/create/${item.recipeId}`)
        } else {
            axiosCustom.delete(`/favorite/delete/${item.recipeId}`)
        }
    }
    const bookmarkClick = (recipeId) => {
        alert('bookmark click')
    }

    const handleOnClickItem = (recipeId) => {
        navigation(`/recipedetails/${recipeId}`)
    }

    return (
        <Fragment>
            <div className="col-12">
                <div className="logo_area text-center">
                    <Link to={'/'} className="app-logo">Happy Cook</Link>
                </div>
            </div>
            <SearchBox />
            <IngredientRecomment />
            {data && data.length > 0 ?
                <h3 style={{ textAlign: 'center' }}>Tất cả kết quả cho {search}</h3>
                :
                <h3 style={{ textAlign: 'center' }}>Không tìm thấy kết quả cho {search}</h3>
            }
            <br />
            <div className='container text-center' style={{ margin: 'auto' }}>
                <ul className='food-list-content food-list-content1 row'>
                    {data && data.length > 0 &&
                        data.map(item => (
                            <li key={item.recipeId} className='food-content-container food-content-container1 col-2'>
                                <div className='item-header' onClick={() => handleOnClickUser(item.User.userId)}>

                                    {item.User.avatar ?
                                        <img className='item-header-avatar' src={`${imgUrl}` + item.User.avatar} alt='' />
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
                                        {item.isFavorite ?
                                            <Fragment >
                                                <FontAwesomeIcon icon={faHeart1} onClick={() => likeClick(item)} style={{ color: 'red' }} /> <span>{item.numberOfLikes}</span>
                                            </Fragment>
                                            :
                                            <Fragment >
                                                <FontAwesomeIcon icon={faHeart} onClick={() => likeClick(item)} /> <span>{item.numberOfLikes}</span>
                                            </Fragment>
                                        }
                                        {item.DetailLists && item.DetailLists.length > 0
                                            ? <FontAwesomeIcon icon={faBookmark1} onClick={() => bookmarkClick(item)} style={{ marginLeft: '2%', marginRight: '30%', marginTop: '4%', color: 'grey' }} />
                                            :
                                            <FontAwesomeIcon icon={faBookmark} onClick={() => bookmarkClick(item)} style={{ marginLeft: '2%', marginRight: '30%', marginTop: '4%' }} />
                                        }
                                    </span>
                                    <span>{item.recipeName}</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </Fragment>
    )
}

export default SearchResult