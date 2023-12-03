import {LoadMeProfile} from '../../../services/User/MeProfileService'

export const loadMeProfileAction = (navigate) =>{
    return (dispatch)=>{
        dispatch({type:'LOADING'});

        LoadMeProfile().then((res)=>{
            if(res.hasOwnProperty('statusCode') && res.statusCode === 200){
                dispatch({type:'LOAD_ME_PROFILE_SUCCESS',res});
                
            }else if(res.hasOwnProperty('statusCode') && res.statusCode > 300) { 
                dispatch({type:'LOAD_ME_PROFILE_ERROR',res})
                if(res.statusCode === 401) {
                    setTimeout(() => {
                        navigate('/logout')
                    }, 1500)
                }
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
            setTimeout(() => {
                navigate('/logout')
            }, 1500)
        }
        )
    }
    
}