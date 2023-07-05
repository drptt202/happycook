import React, { useState, useEffect, Fragment } from 'react'
import AddIngredient from './AddIngredient'
import './AddRecipe.scss'
import AddStep from './AddStep'
import axiosCustom1 from '../../utils/axiosCustom1'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const AddRecipe = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [status, setStatus] = useState("CK")
    const [prepareTime, setPrepareTime] = useState('')
    const [cookTime, setCookTime] = useState('')
    const [ingreAmount, setIngreAmount] = useState('')
    const [ingredientId, setIngredientId] = useState('')
    const [ingredientName, setIngredientName] = useState('')
    const [stepIndex, setStepIndex] = useState('')
    const [description, setDescription] = useState('')
    const [step, setStep] = useState(null)
    const [recipe, setRecipe] = useState(null)


    const handleSubmit = (e) => {
        e.preventDefault();


        const formData = new FormData()

        const DetailIngredients = [{
            ingredientId: ingredientId,
            amount: ingreAmount,
            name: '',
        }]

        const Steps = [{
            description: description,
            step: stepIndex,
            image: ''
        }]

        formData.append('recipe', recipe)
        formData.append('recipeName', name)
        formData.append('amount', amount)
        formData.append('status', status)
        formData.append('preparationTime', prepareTime)
        formData.append('cookingTime', cookTime)
        formData.append('DetailIngredients', JSON.stringify(DetailIngredients))
        formData.append('Steps', JSON.stringify(Steps))

        axiosCustom1.post('/recipe/createRecipe1', formData).then((res) => {
            toast.success('Thêm công thức thành công')
            navigate('/recipes')
            window.location.reload()
        }).catch((err) => { console.log(err) })


    }

    const ingredientForm = (data) => {
        setIngreAmount(data.amount)
        setIngredientId(data.ingredientId)
        setIngredientName(data.ingredientName)
    }


    const stepForm = (data) => {
        setStepIndex(data.stepIndex)
        setDescription(data.description)
        setStep(data.step)
    }

    const handleChangeImage = e => {
        const selectedImage = e.target.files
        const selectedImageArray = Array.from(selectedImage)

        const imagesArray = selectedImageArray.map(img => {
            return URL.createObjectURL(img)
        })
        setRecipe(imagesArray)
    }

    console.log(name, amount, status, prepareTime, cookTime, ingreAmount, ingredientId, ingredientName, stepIndex, description, step, recipe)


    return (
        <div className='row'>
            <div className='offset-lg-3 col-lg-6' style={{ marginTop: '10px' }}>
                <form className='container' onSubmit={(e) => handleSubmit(e)} >
                    <div className='card'>
                        <div className='card-header row'>
                            <h2 className="col-auto me-auto">Thêm công thức</h2>
                        </div>
                        <div className='card-body' style={{ maxHeight: '560px', overflowY: 'auto', overflowX: 'hidden' }}>
                            <div className='row' style={{ marginBottom: '16px' }}>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>Tên món <span className='errmsg'>*</span></label>
                                        <input className='form-control' value={name} onChange={(e) => setName(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className='col-lg-3'>
                                    <div className='form-group'>
                                        <label>Khẩu phần ăn<span className='errmsg'>*</span></label>
                                        <input min={'0'} type={'number'} className='form-control' placeholder='Người'
                                            value={amount} onChange={(e) => setAmount(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className='col-lg-3'>
                                    <div className='form-group'>
                                        <label>Trạng thái <span className='errmsg'>*</span></label>
                                        <select name='status' id='status' className='form-control' value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="CK">Công khai</option>
                                            <option value="RT">Riêng tư</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-lg-3'>
                                    <div className='form-group'>
                                        <label>Thời gian chuẩn bị <span className='errmsg'>*</span></label>
                                        <input min={'0'} step={'5'} type={'number'} className='form-control' placeholder='Phút'
                                            value={prepareTime} onChange={(e) => setPrepareTime(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className='col-lg-3'>
                                    <div className='form-group'>
                                        <label>Thời gian nấu <span className='errmsg'>*</span></label>
                                        <input min={'0'} step={'5'} type={'number'} className='form-control' placeholder='Phút'
                                            value={cookTime} onChange={(e) => setCookTime(e.target.value)}></input>
                                    </div>
                                </div>
                                {recipe && recipe.length > 0 &&
                                    <img src={recipe} alt='img' style={{ width: '100px', height: '80px', margin: 'auto' }} />
                                }
                                <div className='col-lg-12'>
                                    <br />
                                    <div className='form-group row'>
                                        <label htmlFor='fileImg' className='add-btn' style={{ cursor: 'pointer' }}>Ảnh</label><br />
                                        <input
                                            style={{ display: "none" }}
                                            id={'fileImg'}
                                            type={'file'}
                                            accept={'image/*'}
                                            onChange={handleChangeImage} ></input>
                                    </div>

                                </div>
                                <hr />
                            </div>
                            <AddIngredient getIngredientForm={ingredientForm} />
                            <hr />
                            <AddStep getStepForm={stepForm} />
                            <div className='row'>
                                <button type={'submit'} className='btn btn-primary col-md-6 offset-md-3' style={{ width: '16%', margin: 'auto' }}>Thêm</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default AddRecipe