//This file is used to create a ganeric http request form.
//If you want to create a requiest under '/user' you simply pass '/user'
// and for '/post' just pass post
import apiClients from "./api-clients";
interface Entity{
    id:number
}
class HttpService{
    endpoint:string;
    constructor(endpoint:string){
        this.endpoint=endpoint;
    }

    getAll<T>(){
     const controller=new AbortController()
     //'/posts/1/comments'
     const request= apiClients.get<T[]>(this.endpoint,{signal:controller.signal}) 
     return {request,cancel:()=>controller.abort()}

    }

    remove(val: number){
        //'posts/'
       return apiClients.delete(this.endpoint+'/'+val)

    }
    //{id:tempId,postId:postId,name:name,email:email}
    add<T>(entity:T){
     //'posts/2/comments'
     return   apiClients.post(this.endpoint,entity)
    }
    update<T extends Entity>(entity:T){
        //'posts/1'
        return apiClients.put(this.endpoint+"/"+entity.id)
    }
    
}
const create=(endpoint:string)=>{
    return new HttpService(endpoint)
}
export default create