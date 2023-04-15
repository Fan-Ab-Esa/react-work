
import { useState } from "react" 
import { GetResponseType } from "../services/user-service"
import UserService from "../services/item-service"
import { useEffect } from "react"
import { CanceledError } from "axios"
const useUsers=()=>{
    const [user,setUser]=useState<GetResponseType[]>([])
    const[error,setError]=useState('')
    const[loader,setLoader]=useState(false)
    
useEffect(()=>{
    const originalArray=[...user]
    setLoader(true)
     
     const{request,cancel}= UserService.getAll<GetResponseType>()
     request
      .then((res)=>{
        setLoader(false)
        setUser([...res.data]);
       
      })
      .catch(err=>{
        if( err instanceof CanceledError) return
        setError(err.message)
        setLoader(false)
      })
      .finally(()=>{console.log('request completed');     //setLoader(false)
    })
      return()=>{
        cancel()
      }
     
  },[])

  return {user,error,loader,setUser,setLoader,setError}
}
export default useUsers