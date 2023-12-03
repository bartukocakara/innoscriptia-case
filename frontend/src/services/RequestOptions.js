export const getRequestOptions = (token) => 
{
    let requestOptions =  {
        method : "GET",
        headers : {
            "Authorization" : "Bearer " + token,
            "Content-type" : "application/json"
        }
    }
    return requestOptions
}

export const postRequestOptions = (token, item, contentType) => 
{
    let requestOptions =  {
        method : "POST",
        headers : {
            "Authorization" : "Bearer " + token,
            "Content-type" : contentType
        },
        body : contentType === 'application/json' ? JSON.stringify(item) : item
    }
    return requestOptions
}

export const putRequestOptions = (token, item, contentType) => 
{
    let requestOptions =  {
        method : "PUT",
        headers : {
            "Authorization" : "Bearer " + token,
            "Content-type" : contentType
        },
        body : JSON.stringify(item)
    }
    
    return requestOptions
}

export const deleteRequestOptions = (token, contentType, item = {}) => 
{
    let requestOptions =  {
        method : "DELETE",
        headers : {
            "Authorization" : "Bearer " + token,
            "Content-type" : contentType
        },
        body : JSON.stringify(item)
    }

    return requestOptions
}