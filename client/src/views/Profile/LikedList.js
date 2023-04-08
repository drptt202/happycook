import noImg from './../../assets/img/noImg.jpg'
import { imgUrl } from '../../services/ImgUrl'
import { getAllRecipe } from '../../services/ApiService'
import React, { useEffect, useState } from 'react'
import './../Home/HomeContent.scss'
import './../Recipes/Recipe.scss'
import { useNavigate } from 'react-router'


const LikedList = (props) => {
    const [data, setData] = useState(null)
    const test = props.data

    useEffect(() => {
        if (test) {
            setData(test)
        } else {
            getAllRecipeList()
        }
    }, [])

    const getAllRecipeList = async () => {
        const result = await getAllRecipe
        try {
            const result1 = await result.data.data.filter((result) => {
                return result.isFavorite === true
            })
            setData(result1)
        } catch (err) { console.log(err) }
    }
    const navigation = useNavigate()

    const handleOnClickItem = (recipeId) => {
        navigation(`/recipedetails/${recipeId}`)
    }

    return (
        <div className="list-content">
            {data && data.length > 0 &&
                data.map((item, index) => (
                    <div key={index} className="list-item" >
                        <div onClick={() => handleOnClickItem(item.recipeId)}>
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
                            <div className="list-title">{item.recipeName}</div>
                        </div>
                    </div>
                ))
            }
        </div>

    )
}

export default LikedList