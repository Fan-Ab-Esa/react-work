
import apiClients from "./api-clients";
export interface GetResponseType{
    postId:number,
    id:number,
    name:string,
    email:string
}

class UserService{
    getAllUsers(){
     const controller=new AbortController()
     const request= apiClients.get('/posts/1/comments',{signal:controller.signal}) 
     return {request,cancel:()=>controller.abort()}

    }

    removeUser(val: number){
       return apiClients.delete('posts/'+val)

    }
    addUser(tempId:number,postId:number,name:string,email:string){
     
     return   apiClients.post('posts/2/comments',{id:tempId,postId:postId,name:name,email:email})
    }
    updateUser(){
        return apiClients.put('posts/1')
    }
    
}
export default new UserService()