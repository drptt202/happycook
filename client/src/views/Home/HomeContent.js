import React, { Fragment, useEffect, useState, useRef } from 'react'
import './HomeContent.scss'
import FoodContent from './FoodContent'
import axiosCustom from '../../utils/axiosCustom'

const HomeContent = (props) => {

    const elementRef = useRef(null);
    const [arrowDisable, setArrowDisable] = useState(true);
    const [data, setData] = useState([])
    const { title, url } = props


    useEffect(() => {
        axiosCustom.get(`${props.url}`)
            .then(res => {
                const result = res.data.data
                setData(result)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const handleHorizantalScroll = (element, speed, distance, step) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }
            if (element.scrollLeft === 0) {
                setArrowDisable(true);
            } else {
                setArrowDisable(false);
            }
        }, speed);
    };

    return (
        <Fragment>
            {data && data.length > 0 &&
                <div className='home-content'>
                    <h3 className='food-list-title'>{title}</h3>
                    <br />
                    <div className='container text-center' style={{ marginLeft: '6%' }}>
                        <ul>
                            <button className="round" onClick={() => handleHorizantalScroll(elementRef.current, 25, 350, -10)}>&#8249;</button>
                            <ul className='food-list-content' ref={elementRef}>
                                <FoodContent url={url} data={data} />
                            </ul>
                            <button className="round" onClick={() => handleHorizantalScroll(elementRef.current, 25, 350, 10)}>&#8250;</button>
                        </ul>
                    </div>
                    <br />
                </div>
            }
        </Fragment >
    )
}

export default HomeContent