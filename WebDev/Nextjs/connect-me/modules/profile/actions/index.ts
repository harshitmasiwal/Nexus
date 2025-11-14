"use server"
import db from "@/lib/db"
import { getTempUserNames } from "../utils"
import { currentUser } from "@clerk/nextjs/server"
import { ProfileFormData } from "@/modules/links/components/link-form"

export const checkProfileUsernameAvailablity = async (username : string)=>{
  if(!username){
    return {
      available : false,
      suggestions : []
    }
  }

  const user = await db.user.findUnique(
    {
      where : {
        username : username
      }
    }
  )

  if(!user){
    return {
      available : true,
      suggestions : []
    }
  }

  const suggestions = await getTempUserNames(username , 3)

  return {
    available : false,
    suggestions : suggestions
  }
}

export const claimUsername = async(username : string)=>{
  const loggedInUser = await currentUser()

  if(!loggedInUser){
    return {
      sucess : false , 
      error : "no authenticated user found"
    }
  }

  const user = await db.user.update({
    where : {
      clerkId : loggedInUser.id
    },
    data : {
      username : username
    }
  })

  if(!user){
    return {
      sucess : false , 
      error : "no authenticated user found"
    }
  }

  return {
    sucess : true
  }
}

export const createUserProfile = async (data:ProfileFormData)=>{
}

export const getCurrentUsername = async()=>{

  const user = await currentUser()

  const currentUsername = await db.user.findUnique({
    where : {
      clerkId : user?.id
    },
    select : {
      username : true,
      bio : true
    }
  })

  return currentUsername;

}

export const getUserByUsername = async (username:string)=>{
  const currentUser = await db.user.findUnique({
    where:{
      username:username
    },
    include:{
      links:true,
      socialLinks:true
    }
  })

  return currentUser;
}