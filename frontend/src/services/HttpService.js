import axios from "axios";
import { toast } from "react-toastify";
import { deleteRequestOptions, getRequestOptions, postRequestOptions, putRequestOptions } from "./RequestOptions";

export default class HttpService
{
    prefix = "api"
    version = "v1" 
    base_custom_url = process.env.REACT_APP_BASE_URL;
    url = this.base_custom_url
    
    postData = async(item, added_url, tokenId="", contentType = "application/json") =>{
        const token = await JSON.parse(localStorage.getItem(tokenId));
        
        const requestOptions = postRequestOptions(token, item, contentType);

        return fetch(this.url+"/"+added_url, requestOptions).then(
            response=>response.json());
    }

    postFormData = async(item, added_url, tokenId="", contentType = "multipart/form-data") =>{
        const token = await JSON.parse(localStorage.getItem(tokenId));
        
        const requestOptions = postRequestOptions(token, item, contentType);

        return fetch(this.url+"/"+added_url, requestOptions).then(
            response=>response.json());
    }

    getData = async(added_url, tokenId = "", query = null) => 
    {
        const token = await JSON.parse(localStorage.getItem(tokenId));
        const requestOptions = getRequestOptions(token);
        if(query !== null) {
            const searchParams = new URLSearchParams();
            Object.entries(query).forEach(([key, value]) => {
              searchParams.append(key, value);
            });
            return fetch(`${this.url}/${added_url}?${searchParams.toString()}`, requestOptions)
                .then(response => response.json());
        }
        return fetch(`${this.url}/${added_url}`, requestOptions)
        .then(response => response.json());
    }

    listData = async(added_url, tokenId = "", searchParams) => 
    {
        const token = await localStorage.getItem(tokenId);
        const requestOptions = getRequestOptions(token);

        return axios(this.url + "/" + added_url, searchParams, requestOptions).then(
            response => response.json()
        );
    }

    putData = async(item, added_url, contentType = "application/json") =>{
        const token = await JSON.parse(localStorage.getItem("token"));
       
        const requestOptions = putRequestOptions(token, item, contentType);

        return fetch(this.url+"/"+added_url, requestOptions)
               .then(response=> {
                    if(response.status === 204) {
                        toast.success('Updated Succesfully', {
                            position: toast.POSITION.TOP_RIGHT
                          });
                    }
                    return response
                
            });
    }

    deleteData = async(added_url, tokenId="", item= null, contentType = "application/json") =>{
        const token = await JSON.parse(localStorage.getItem(tokenId));
        const requestOptions = deleteRequestOptions(token, contentType, item);

        return fetch(this.url+"/"+added_url, requestOptions)
               .then(response=>response);
    }
}