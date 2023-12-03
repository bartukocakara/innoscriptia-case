import {CreateData, CreateFormData} from '../../services/DataCreateService'

export const createDataAction = (fetchUrl, query = null, navigate = null) =>{
    return (dispatch)=>{
        dispatch({type:'LOADING_CREATE'});
        CreateData(fetchUrl, query).then((res)=>{
            if(res.hasOwnProperty('statusCode') && res.statusCode === 201){
                dispatch({type:'DATA_CREATE_SUCCESS', res});
            }else if(res.hasOwnProperty('statusCode') && res.statusCode > 300) { 
                dispatch({type:'DATA_CREATE_ERROR',res})
            }
            setTimeout(() => {
                if (navigate) {
                    navigate('/articles');
                  }
            }, 2500)
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
            setTimeout(() => {
                navigate('/logout')
            }, 2500)
        }
        )
    }
    
}

export const createFormDataAction = (fetchUrl, query = null, navigate = null) =>{
    return (dispatch)=>{
        dispatch({type:'LOADING_CREATE'});
        CreateFormData(fetchUrl, query).then((res)=>{
            if(res.hasOwnProperty('statusCode') && res.statusCode === 201){
                dispatch({type:'DATA_CREATE_SUCCESS', res});
            }else if(res.hasOwnProperty('statusCode') && res.statusCode > 300) { 
                dispatch({type:'DATA_CREATE_ERROR',res})
            }
            setTimeout(() => {
                if (navigate) {
                    navigate('/articles');
                  }
            }, 2500)
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
            setTimeout(() => {
                navigate('/logout')
            }, 2500)
        }
        )
    }
    
}