import React, { Fragment, useEffect, useState } from 'react'
import { getRecipeList } from '../services/ApiService'
import axiosCustom from '../utils/axiosCustom'


const GetRecipeList = (props) => {
    const [data, setData] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const recipeId = props.recipeId

    useEffect(() => {
        getRecipeListt()
    }, [data])

    const getRecipeListt = async () => {
        const result = await getRecipeList
        try {
            setData(result.data.data)
        } catch (err) { console.log(err) }
    }

    const recipeListId = (recipeListId) => {
        // axiosCustom.post(`/recipeList/createRecipe/${recipeListId}/${recipeId}`)
        // console.log('asdasdasd', recipeListId, recipeId)
        setIsOpen(false)
    }


    return (
        <Fragment>
            {isOpen &&
                <div className='add-list-input choose-list'>
                    <div className='row'>
                        <h6 className="col-auto me-auto">Chọn danh sách</h6>
                        <div className="col-auto close-add" onClick={() => setIsOpen(false)}><i className="fa fa-close"></i></div>
                    </div>
                    {data && data.length > 0 &&
                        <div style={{ marginBottom: '16px', marginLeft: '0', textAlign: 'left' }}>
                            {data.map((item) =>
                                <li onClick={() => recipeListId(item.recipeListId)}>
                                    {item.name}
                                </li>
                            )}
                        </div>
                    }
                    <div className='row'>
                        <button type={'submit'} className='btn btn-primary col-md-6 offset-md-3'
                        >+</button>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default GetRecipeList