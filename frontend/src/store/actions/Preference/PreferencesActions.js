import {LoadPreferences} from '../../../services/Preference/PreferenceService'

export const loadPreferencesAction = ( apiUrl, query={} ) =>{
    return (dispatch)=>{
        dispatch({type:'LOADING'});
        LoadPreferences(apiUrl, query).then((res)=>{
            if(res.hasOwnProperty('statusCode') && res.statusCode === 200){
                dispatch({type:'LOAD_PREFERENCE_SUCCESS',res});
            }else if(res.hasOwnProperty('statusCode') && res.statusCode > 300) { 
                dispatch({type:'LOAD_PREFERENCE_ERROR',res})
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