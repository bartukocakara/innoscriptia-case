import {UpdateData} from '../../services/DataUpdateService'

export const updateDataAction = (fetchUrl, id = null, query = null) =>{
    return (dispatch)=>{
        dispatch({type:'LOADING_UPDATE'});
        UpdateData(fetchUrl, id, query).then((res)=>{
            let statusCode = res?.status
            if(statusCode && statusCode === 204){
                dispatch({type:'DATA_UPDATE_SUCCESS', res});
                    
            }else if(res.hasOwnProperty('statusCode') && res.statusCode > 300) { 
                dispatch({type:'DATA_UPDATE_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
            window.location.href = '/logout';
        }
        )
    }
    
}