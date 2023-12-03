import {LoadShowData} from '../../services/DataShowService'

export const loadShowAction = (fetchUrl, id, query = null) =>{
    return (dispatch)=>{
        dispatch({type:'LOADING'});
        LoadShowData(fetchUrl, id, query).then((res)=>{

            if(res.hasOwnProperty('statusCode') && res.statusCode === 200){

                dispatch({type:'LOAD_DATA_SHOW_SUCCESS',res});
                
            }else if(res.hasOwnProperty('statusCode') && res.statusCode > 300) { 

                dispatch({type:'LOAD_DATA_SHOW_ERROR',res})
                window.location.href = '/logout'
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
            setTimeout(() => {
                window.location.href = '/logout';
            }, 1500)
        }
        )
    }
    
}