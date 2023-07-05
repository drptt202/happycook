import React, { useState, useEffect, Fragment } from 'react'
import './HomeContent.scss'
import { getIngredientBySeason } from '../../services/ApiService'
import { imgUrl } from '../../services/ImgUrl'
import { Link, NavLink, useNavigate } from 'react-router-dom'



const IngredientRecomment = () => {
    const navigate = useNavigate()
    const [ingredientBySeasons, setIngredientBySeasons] = useState([])
    useEffect(() => {
        getIngredient()
    }, [])

    const getIngredient = async () => {
        const result = await getIngredientBySeason
        try {
            setIngredientBySeasons(result.data.data)
        } catch (err) { console.log(err) }
    }

    const toSearchResult = (item) => {
        const slug = item
        navigate(`/search/${slug}`)
    }

    return (
        <div className="container text-center" style={{ marginLeft: '8%' }}>
            <ul className="row">
                {ingredientBySeasons && ingredientBySeasons.length > 0 &&
                    ingredientBySeasons.map((item) =>
                    (
                        <li key={item.ingredientId} className='col-1 item' style={{ cursor: 'pointer' }}>
                            <br />
                            <div className='recomment-ingredient' onClick={() => toSearchResult(item.name)}>
                                <img className='item-header-avatar' src={`${imgUrl}` + item.image} alt='' />
                                <p className='item-header-content' >{item.name}</p>
                            </div>
                        </li>)
                    )}
            </ul>
        </div>
    )
}

export default IngredientRecomment