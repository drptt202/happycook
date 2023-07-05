import React, { useEffect, useState } from 'react'
import { getFollowing } from '../../services/ApiService'
import RenderItem from './RenderItem'

const Following = (props) => {
    const [data, setData] = useState(null)

    const { Id } = props

    useEffect(() => {
        getFollowingData()
    }, [Id])

    const getFollowingData = async () => {
        const result = await getFollowing(Id)
        try {
            setData(result.data.data.users)
        } catch (e) { console.log(e) }
    }

    console.log('data', data)

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

export default Following