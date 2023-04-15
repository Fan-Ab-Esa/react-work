import creates from "./http-service"

export interface GetResponseType{
    postId:number,
    id:number,
    name:string,
    email:string
}


export default creates('/users')