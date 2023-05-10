import React, { useState, useEffect, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const AddStep = (props) => {

    const [stepForm, setStepForm] = useState([{}])
    const [stepIndex, setStepIndex] = useState('')
    const [description, setDescription] = useState('')
    const [step, setStep] = useState(null)
    const [sendData, setSendData] = useState('')

    const data = [{ "stepIndex": stepIndex, "description": description, "step": step }]
    props.getStepForm(data)



    const handleStepFormAdd = () => {
        const form = [...stepForm, []]
        setStepForm(form)
    }

    const handleStepFormRemove = (index) => {
        const form = [...stepForm]
        form.splice(index, 1)
        setStepForm(form)
    }

    return (
        <Fragment>
            <div className='row' style={{ textAlign: 'center' }}>
                <button type={'button'} className='add-btn' onClick={() => handleStepFormAdd()}>Thêm bước hướng dẫn</button>
            </div>
            {
                stepForm.map((item, index) => (
                    <div className='row' key={index}>
                        <br />
                        <div className='col-lg-3'>Bước {index + 1}:</div>
                        <textarea placeholder='Mô tả' style={{ width: '70%', marginLeft: '10%' }}
                            onChange={(e) => { setDescription(e.target.value); setStepIndex(index + 1) }}>

                        </textarea>

                        <div className='col-lg-2'>
                            <div className='form-group row'>
                                <label htmlFor='fileImg' className='add-btn' style={{ cursor: 'pointer', width: '60px' }}>Ảnh</label><br />
                                <input
                                    style={{ display: "none" }}
                                    id={'fileImg'}
                                    type={'file'}
                                    accept={'image/*'}
                                    onChange={(e) => {
                                        setStep(e.target.files[0]);
                                    }} ></input>
                            </div>
                        </div>
                        <div className='delete-trash-can' type={'button'} onClick={() => handleStepFormRemove(index)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>
                    </div>
                ))
            }
        </Fragment>
    )
}

export default AddStep