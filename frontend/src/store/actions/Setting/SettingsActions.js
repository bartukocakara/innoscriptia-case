import {LoadSettings} from '../../../services/Setting/SettingsService'

export const loadSettingsAction = ( apiUrl, query={} ) =>{
    return (dispatch)=>{
        dispatch({type:'LOADING'});
        LoadSettings(apiUrl, query).then((res)=>{
            if(res.hasOwnProperty('statusCode') && res.statusCode === 200){
                dispatch({type:'LOAD_SETTINGS_SUCCESS',res});
            }else if(res.hasOwnProperty('statusCode') && res.statusCode > 300) { 
                dispatch({type:'LOAD_SETTINGS_ERROR',res})
                window.location.href = '/logout';
            }
        },
        error=>{
                dispatch({type:'CODE_ERROR',error});
                window.location.href = '/logout';
            }
        )
    }
    
}