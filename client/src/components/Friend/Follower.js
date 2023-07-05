import React, { useEffect, useState } from 'react'
import { getFollower } from '../../services/ApiService'
import './Friends.scss'
import RenderItem from './RenderItem'

const Follower = (props) => {
    const [data, setData] = useState(null)
    const { Id } = props
    useEffect(() => {
        getFollowerData()
    }, [Id])

    const getFollowerData = async () => {
        const result = await getFollower(Id)
        try {
            setData(result.data.data.users)
        } catch (e) { console.log(e) }
    }

    return (
        <div className="list-content">
            {data && data.length > 0 &&
                data.map((item, index) => (
                    <RenderItem key={index} item={item} />
                ))
            }
        </div>
    )
}

export default Follower