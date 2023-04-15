import { useEffect, useState } from "react"

import UserService from "../services/item-service"
import useUser from "../hooks/useUser"
const ProductList = ({produc}:{produc:string}) => {
const {user,error,loader,setUser,setError,setLoader}=useUser()



const deleteFunction=(val:number)=>{
  const originalArray=[...user]
  setUser(user.filter((u)=>u.id!=val))
  UserService.remove(val)
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
   
    UserService.add<number>(tempId)
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
    interface Call{
      id:number
    }
    const input={id:val}
   UserService.update<{id:number}>({id:val})
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
