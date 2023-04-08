import React, { useState, useEffect, Fragment } from 'react'
import { useNavigate, useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark, faUser, faClock } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeart1, faBookmark as faBookmark1 } from '@fortawesome/free-solid-svg-icons'
import axiosCustom from '../../utils/axiosCustom'
import noImg from './../../assets/img/noImg.jpg'
import unknown from './../../assets/img/unknown.png'
import './Recipe.scss'
import './../Profile/Profile.scss'
import GetComment from './GetComment'
import { imgUrl } from '../../services/ImgUrl'
import { likeClick, bookmarkClick } from '../../services/ApiService'
import GetRecipeList from '../../components/GetRecipeList'



const RecipeDetails = () => {
    const param = useParams()
    const navigation = useNavigate()
    const recipeId = param.recipeId
    const [data, setData] = useState(null)
    const [ingredient, setIngredient] = useState(null)
    const [steps, setSteps] = useState(null)
    const [isFavorite, setIsFavorite] = useState(false)
    const [likes, setLikes] = useState(0)
    const [isMarked, setIsMarked] = useState(false)

    const handleMark = () => {
        bookmarkClick(isMarked)
        setIsMarked(!isMarked)
    }

    const handleOnClickUser = (id) => {
        navigation(`/profile/${id}`)
    }

    const handleFavorite = () => {
        setIsFavorite(!isFavorite)
        likeClick(data)
        setLikes(isFavorite ? likes - 1 : likes + 1)
    }

    useEffect(() => {
        if (data) {
            setIsFavorite(data.isFavorite);
            setLikes(data.numberOfLikes)
            data.DetailLists && data.DetailLists.length > 0 ? setIsMarked(true) : setIsMarked(false)
        }
    }, [data])

    useEffect(() => {
        axiosCustom.get(`/recipe/getRecipe/${recipeId}`)
            .then(res => {
                const result = res.data.data
                setIngredient(result.DetailIngredients)
                setData(result)
                setSteps(result.Steps)
            })
            .catch(err => { console.log(err) })
    }, [recipeId])

    return (
        <Fragment>
            <div className="header__wrapper" style={{ height: '100%' }}>

                {data &&
                    <div className="cols__container">

                        <div className="left__col" style={{ marginTop: '25px' }}>
                            <div className='recipe-container'>
                                {data.image ?
                                    <img src={`${imgUrl}` + data.image} alt='monngon' onError={(e) =>
                                    (
                                        (e.target.src = noImg
                                        )
                                    )
                                    } />
                                    :
                                    <img src={noImg} alt='monngon' />
                                }
                                <div className='recipe-detail'>
                                    <h1>{data.recipeName}</h1>
                                    <div className='row'>
                                        <div className='col-4'>
                                            <FontAwesomeIcon className='icon' icon={faUser} />
                                            <p>Khẩu phần <br /></p>
                                            <span>{data.amount} người</span>
                                        </div>
                                        <div className='col-4'>
                                            <FontAwesomeIcon className='icon' icon={faClock} />
                                            <p>Chuẩn bị <br /></p>
                                            <span>{data.preparationTime} phút</span>
                                        </div>
                                        <div className='col-4'>
                                            <FontAwesomeIcon className='icon' icon={faClock} />
                                            <p>Thực hiện<br /></p>
                                            <span>{data.cookingTime} phút</span>
                                        </div>
                                    </div>
                                    <br />
                                    {data.description &&
                                        <div className='col-10 recipe-description' >&nbsp;&nbsp;&nbsp;{data.description}</div>

                                    }
                                    <div className='recipe-detail-user col-8'>
                                        {data.User.avatar ?
                                            <img src={`${imgUrl}` + data.User.avatar} alt='' onClick={() => handleOnClickUser(data.User.userId)} style={{ cursor: 'pointer' }}
                                                onError={(e) =>
                                                (
                                                    (e.target.src = unknown
                                                    )
                                                )
                                                } />
                                            : <img src={unknown} alt='' onClick={() => handleOnClickUser(data.User.userId)} style={{ cursor: 'pointer' }} />
                                        }
                                        <h5 onClick={() => handleOnClickUser(data.User.userId)} style={{ cursor: 'pointer' }}>{data.User.fullName}</h5>
                                    </div>

                                    <div className='recipe-icon'>
                                        <span >
                                            {isFavorite ?
                                                <Fragment >
                                                    <FontAwesomeIcon className='like' icon={faHeart1} onClick={handleFavorite} style={{ color: 'red' }} /> <span>{likes}</span>
                                                </Fragment>
                                                :
                                                <Fragment >
                                                    <FontAwesomeIcon className='like' icon={faHeart} onClick={handleFavorite} /> <span>{likes}</span>
                                                </Fragment>
                                            }

                                            {isMarked
                                                ? <FontAwesomeIcon className='book-mark' onClick={handleMark} icon={faBookmark1} style={{ color: 'grey' }} />
                                                :
                                                <FontAwesomeIcon className='book-mark' onClick={handleMark} icon={faBookmark} />
                                            }
                                        </span>
                                        <div style={{ left: '20%' }}>
                                            <GetRecipeList recipeId={data.recipeId} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="right__col1">
                            <div className='ingredient-container'>
                                <div className='ingredient-detail'>
                                    <h2>Nguyên liệu</h2>
                                    <div>
                                        {
                                            ingredient.map((item, index) => (
                                                <p key={index}>{`${item.amount} ${item.name}`}</p>
                                            ))}
                                    </div>
                                </div>

                                <div className='guide-detail'>
                                    <h2>Hướng dẫn nấu nướng</h2>
                                    <div>
                                        {steps && steps.length > 0 &&
                                            steps.map((item, index) => (
                                                <div key={index}>
                                                    <h6>Bước {item.stepIndex}:</h6>
                                                    <p className='guide-description'>{item.description}</p>
                                                    {item.image &&
                                                        <img src={`${imgUrl}` + item.image} alt='' />

                                                    }
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <GetComment />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default RecipeDetails