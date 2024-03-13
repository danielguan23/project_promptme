'use client';

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const {data: session} = useSession();
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt:"",
    tag:"",
  })

  useEffect(()=>{
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()
    //   console.log("received data")
      setPost({
        prompt:data.prompt,
        tag:data.tag
      })
    }
    if(promptId) getPromptDetails();
  },[promptId])


  const updatePrompt = async (e) => {
    // console.log("trying")
    e.preventDefault();
    setSubmitting(true)
    if(!promptId) return alert("Prompt ID not found")
    try{
      const response = await fetch(`/api/prompt/${promptId}`, {
        method:"PATCH",
        body:JSON.stringify({
          prompt:post.prompt,
          tag:post.tag
        })
      })
      console.log("reponse")
      if(response.ok){
        router.push('/')
      }
      console.log(response.ok)
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form 
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt