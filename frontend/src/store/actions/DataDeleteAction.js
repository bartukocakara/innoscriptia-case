import {DeleteData} from '../../services/DataDeleteService'

export const deleteDataAction = (fetchUrl, id = null, fields = null, message = null) =>{
    return (dispatch)=>{
        dispatch({type:'LOADING_DELETE'});
        DeleteData(fetchUrl, id, fields, message).then((response)=>{
            if(response.status === 204){
                 
                dispatch({type:'DATA_DELETE_SUCCESS',response});
                    
            }else if(response.status > 300) { 
                dispatch({type:'DATA_DELETE_ERROR',response})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
            window.location.href = '/logout';
        }
        ) 
    }
    
}