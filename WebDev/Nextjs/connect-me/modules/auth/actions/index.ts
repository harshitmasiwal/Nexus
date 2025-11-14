"use server"

import db from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { error } from "console"

export const onBoardUser = async()=>{

    try{
        const user = await currentUser()

        if(!user){
            return {
                sucess : false , error : "no authenticated user found"
            }
        }

        //using upsert to create or update user
        const {id , firstName , lastName , imageUrl , emailAddresses} = user
        
        const newUser = await db.user.upsert({
            where : {
                clerkId : id
            },
            update : {
                firstName : firstName || null,
                lastName : lastName || null ,
                imageUrl : imageUrl || null , 
                email : emailAddresses[0]?.emailAddress || "" 
            },
            create : {
                clerkId : id ,
                firstName : firstName || null,
                lastName : lastName || null ,
                imageUrl : imageUrl || null , 
                email : emailAddresses[0]?.emailAddress || "" 
            }
        })

        return { 
            sucess : true ,
            user : newUser ,
            message : "user onboarded sucessfully"
        }
    }
    catch(error){

        console.error("error on user onboarding")
        return {
            sucess : false, 
            error : "failed to onboard user"
        }

    }

}