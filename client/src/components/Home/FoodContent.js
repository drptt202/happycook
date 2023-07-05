import React, { Fragment, useEffect, useState } from 'react'
import './HomeContent.scss'
import './../Recipes/Recipe.scss'
import RenderItem from './RenderItem'


const FoodContent = (props) => {
    const [data, setData] = useState(props.data)
    return (
        <Fragment>
            {
                data.map((item, index) => (
                    <RenderItem key={index} item={item} />
                ))
            }
        </Fragment>
    )
}

export default FoodContent