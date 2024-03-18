"use client"


import { useState,useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
  const router = useRouter()
  const {data:session} = useSession()
  const [posts, setPosts] = useState([])
  if(!session){
    router.push("/")
  }
  useEffect(()=>{
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      console.log(data)
      setPosts(data)
    }
    if(session?.user.id) fetchPosts();
  },[]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    console.log("Deleting",post)
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if(hasConfirmed){
      try{
        const response = await fetch(`/api/prompt/${post._id.toString()}`,{
          method:`DELETE`,
        });
        console.log(response)
        console.log(posts)
        const filteredPosts = posts.filter((p)=>p._id !== post._id)
        console.log(filteredPosts)
        setPosts(filteredPosts)
      } catch (error){
        console.log(error)
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalised profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile