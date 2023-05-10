import React from 'react'
import { useParams } from 'react-router'

const EditRecipe = () => {
    const param = useParams()
    const recipeId = param.recipeId

    return (
        <div></div>
    )
}

export default EditRecipe