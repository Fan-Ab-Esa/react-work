import { useEffect, useState } from "react"

import apiClients, {CanceledError} from "../services/api-clients"

import UserService , { GetResponseType } from "../services/user-service"

const ProductList = ({produc}:{produc:string}) => {
const [user,setUser]=useState<GetResponseType[]>([])
const[error,setError]=useState('')
const[loader,setLoader]=useState(false)


useEffect(()=>{
  const originalArray=[...user]
  setLoader(true)
   
   const{request,cancel}= UserService.getAllUsers()
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

const deleteFunction=(val:number)=>{
  const originalArray=[...user]
  setUser(user.filter((u)=>u.id!=val))
  UserService.removeUser(val)
    .then((res)=>{
    })
    .catch((err)=>{
      console.log(err)
      setUser([...originalArray])
      setError(err.message)
    })
  console.log('id :'+val)
  }
  const addUser=()=>{
    const originalArray=[...user]
    const tempId=Math.floor(Math.random()*100)
    setUser([{id:tempId,postId:5,name:"Warren",email:"ware@gmail.com"},...user])
    //apiClients.post('posts/2/comments',{id:tempId,postId:5,name:"Warren",email:"ware@gmail.com"})
   
    UserService.addUser(tempId,5,"Larry","larry@gmail.com")
    .then((res)=>{
      console.log(res.data)
    setUser([{...res.data,id:tempId},...user]);
   // setOrArray([{...res.data,id:tempId},...user]);
    }).catch((err)=>{
      setError(err.message)
      setUser([...originalArray])
    })
  }
  const updateFunc=(val:number)=>{
    const originalArray=[...user]
  
   console.log(val)
    const changedArr=user.map(u=>
      u.id==val?{...u,name:"changed"}:u
    )
   UserService.updateUser()
    .then((res)=>{
      console.log(res)
      setUser([...changedArr])
    })
    .catch((err)=>{
      //setUser([...originalArray])
      console.log(err)
    })
    //setUser([changedArr])
    //setUser([{id:tempId,postId:5,name:"Michael",email:"ware@gmail.com"},...user])
  }
  
  return (
    <div>
      {loader&&<div className="spinner-border"></div>}
      <div key={produc}>{produc}</div>
         <ul className="list-group">
        {user.map((u)=>
    
        <li className={produc=='Household'?'bg-info':"bg-warning list-group-item d-flex justify-content-between"} 
              key={u.id}
  
              >
              name : {u.name }  
              || email: {u.email}  
              <div>
                <button className="btn btn-outline-danger mx-2" onClick={()=>updateFunc(u.id)}>Update</button> 
                <button className="btn btn-outline-danger" onClick={()=>deleteFunction(u.id)}>Delete</button> 
              </div>
            
        </li> 
 
        
        )
        }
         </ul>
          {error&&<p className="text-danger">{error}</p>}

          <div onClick={(event)=>{console.log(event.currentTarget.textContent)}}>
            hello world in div
          </div>
          <button onClick={addUser}>Add</button>
    </div>
  )
}

export default ProductList
