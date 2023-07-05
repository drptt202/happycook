import React, { useState, useEffect } from 'react'
import { searchRecipe } from '../../services/ApiService'
import './Search.scss'
import { useNavigate } from 'react-router'

const SearchBox = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState('')
    const [onkey, setOnkey] = useState('')
    const [hint, setHint] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const onEnter = (e) => {
        setOnkey(e.key);
        if (onkey === 'Enter') {
            navigate(`/search/${input}`)
            setIsOpen(false)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search/${input}`)
        setIsOpen(false)
    }

    const autoComplete = (input) => {
        if (input && input.length > 0) {
            setIsOpen(true)
        }
        if (input === '') {
            setIsOpen(false)
        }
    }

    const getSearchInput = async (name) => {
        if (input) {
            const result = await searchRecipe(name)
            try {
                setHint(result.data.data)
            }
            catch (err) {
                console.log(err)
            }
        }
    }
    useEffect(() => {
        getSearchInput(input)
        autoComplete(input)
    }, [input])

    const handleOnClick = (item) => {
        navigate(`/search/${item}`)
        setIsOpen(false)
    }

    return (
        <div className='col-md-6 offset-md-3'>
            <div className="form" style={{ width: '70%', margin: 'auto' }}>
                <i className="fa fa-search" onClick={handleSearch}></i>
                <input value={input} type={"text"} className="form-control form-input" placeholder="Tìm món..."
                    onChange={(e) => { setInput(e.target.value); autoComplete(input) }}
                    onKeyDown={(e) => onEnter(e)}
                />
                <span className="delete-input" onClick={() => { setInput(''); setIsOpen(false) }}><i className="fa fa-close"></i></span>
            </div>
            {isOpen &&
                <div className="auto-complete">
                    {hint && hint.length > 0 &&
                        hint.map((item, index) => (
                            <li className='content' key={index}
                                onClick={() => handleOnClick(item.recipeName)}
                            >{item.recipeName}</li>
                        ))}
                </div>
            }
        </div>
    )
}

export default SearchBox