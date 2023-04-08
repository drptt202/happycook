import React, { Fragment, useEffect, useState } from 'react'
import './Recipe.scss'
import './../Home/HomeContent.scss'
import { getAllRecipe, } from '../../services/ApiService'
import RenderItem from './RenderItem'

const RecipesList = () => {
    const [data, setData] = useState(null)
    const authId = localStorage.getItem('authId')

    useEffect(() => {
        getAllRecipeList()
    }, [])

    const getAllRecipeList = async () => {
        const result = await getAllRecipe
        try {
            const result1 = await result.data.data.filter((result) => {
                return result.User.userId == authId
            })
            setData(result1)
        } catch (err) { console.log(err) }
    }


    return (
        <Fragment>
            <br />
            <div className='container text-center' style={{ margin: 'auto' }}>
                <ul className='food-list-content food-list-content1 row'>
                    {data && data.length > 0 &&
                        data.map((item, index) => (
                            <RenderItem item={item} key={index} />
                        ))
                    }
                </ul>
            </div>
        </Fragment>
    )
}

export default RecipesList