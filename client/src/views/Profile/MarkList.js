import React, { Fragment, useEffect, useState } from 'react'
import noImg from './../../assets/img/noImg.jpg'
import { imgUrl } from '../../services/ImgUrl'
import { getRecipeList, getRecipeByUserId, deleteRecipeList } from '../../services/ApiService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './Profile.scss'

const MarkList = (props) => {

    const [data, setData] = useState(null)
    const { Id } = props
    const authId = localStorage.getItem('authId')

    useEffect(() => {
        if (Id == authId) {
            getRecipeList1()
        } else {
            getRecipeList2(Id)
        }
    }, [Id])

    const getRecipeList1 = async () => {
        const result = await getRecipeList
        try {
            setData(result.data.data)
        } catch (err) { console.log(err) }
    }

    const getRecipeList2 = async () => {
        const result = await getRecipeByUserId(Id)
        try {
            setData(result.data.data)
        } catch (err) { console.log(err) }
    }
    const handleDeleteList = (recipeListId) => {
        // console.log('recipeListId', recipeListId)
    }

    console.log('data', data)
    return (
        <div className="list-content">
            {data && data.length > 0 &&
                data.map(item => (
                    <div key={item.recipeListId} className="list-item">

                        {item.image
                            ?
                            <img className="list-img" src={`${imgUrl}` + item.image} alt="Photo" onError={(e) =>
                            (
                                (e.target.src = noImg
                                )
                            )
                            } />
                            :
                            <img className="list-img" src={noImg} alt="Photo" />

                        }
                        {item.name ?
                            <div className="list-title">{item.name}
                                <span className='delete-list' type={'button'} onClick={() => handleDeleteList(item.recipeListId)}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </span>
                            </div>
                            : <div className="list-title">{item.recipeName}
                                <span className='delete-list' type={'button'} onClick={() => handleDeleteList(item.recipeListId)}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </span>
                            </div>
                        }


                    </div>
                ))
            }
        </div>
    )
}

export default MarkList