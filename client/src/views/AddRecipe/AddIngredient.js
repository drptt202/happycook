import React, { useState, useEffect, Fragment } from 'react'
import { getIngredientBySeason } from '../../services/ApiService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const AddIngredient = (props) => {

    const [ingredientForm, setIngredientForm] = useState([{}])
    const [ingredientBySeasons, setIngredientBySeasons] = useState([])
    const [ingredientId, setIngredientId] = useState('')
    const [ingreAmount, SetIngreAmount] = useState('')
    const data = { "ingredientId": ingredientId, "amount": ingreAmount }

    props.getIngredientForm(data)

    useEffect(() => {
        getIngredient()
    }, [])

    const getIngredient = async () => {
        const result = await getIngredientBySeason
        try {
            setIngredientBySeasons(result.data.data)
        } catch (err) { console.log(err) }
    }

    const handleIngredientFormAdd = () => {
        const form = [...ingredientForm, []]
        setIngredientForm(form)
    }

    const handleIngredientFormRemove = (index) => {
        const form = [...ingredientForm]
        form.splice(index, 1)
        setIngredientForm(form)
    }

    return (
        <Fragment>
            <div className='row' style={{ textAlign: 'center' }}>
                <button type={'button'} className='add-btn' onClick={() => handleIngredientFormAdd()}>Thêm nguyên liệu</button>
            </div>
            {
                ingredientForm.map((item, index) => (
                    <div className='row' key={index}>
                        <div className='col-lg-3'>
                            <label>Nguyên liệu</label>
                            <select name='ingredient' id='ingredient'
                                className='form-control' required
                                defaultValue={ingredientId}
                                onChange={(e) => setIngredientId(e.target.value)}>
                                <option value="" disabled hidden>Chọn...</option>
                                {ingredientBySeasons && ingredientBySeasons.length > 0 &&
                                    ingredientBySeasons.map((ingredient, index) => (
                                        <option
                                            key={index}
                                            value={ingredient.ingredientId}>
                                            {ingredient.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className='col-lg-3'>
                            <div className='form-group'>
                                <label>Số lượng</label>
                                <input
                                    className='form-control'
                                    value={ingreAmount}
                                    type={'text'}
                                    placeholder='Kg hoặc Cái'
                                    onChange={(e) => SetIngreAmount(e.target.value)}
                                ></input>
                            </div>
                        </div>
                        <div className='delete-trash-can' type={'button'} onClick={() => handleIngredientFormRemove(index)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>
                    </div>
                ))
            }
        </Fragment>
    )
}

export default AddIngredient