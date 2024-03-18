"use client";

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Profile from '@components/Profile'

const OthersProfiles = () => {
  const {id} = useParams();
  const [posts, setPosts] = useState([])
  const [username, setUsername] = useState([])
  useEffect(()=>{
    const fetchdata = async () => {
        const response = await fetch(`/api/users/${id}/posts`)
        const data = await response.json()
        const responseusername = data[0].creator.username
        console.log(data)
        setUsername(responseusername)
        setPosts(data)
    }
    fetchdata()
  },[id])
  return (
    <Profile data={posts} name={username} desc="Check out other's prompts"/>
  )
}

export default OthersProfiles