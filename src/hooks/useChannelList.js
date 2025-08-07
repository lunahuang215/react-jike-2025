import { useState, useEffect } from 'react'
import { getChannelListAPI } from '@/apis/article'

const useChannelList = () => {
    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        const fetchChannelList = async () => {
            const res = await getChannelListAPI()
            setChannelList(res.data.data.channels)
        }
        fetchChannelList()
    }, [])
    return channelList
}

export default useChannelList