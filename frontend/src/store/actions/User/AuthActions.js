import { LoginUser, logoutUser, RefreshToken, SignUpService } from '../../../services/User/AuthService'

export const SignUpAction = (credentials, navigate) => {
    return async (dispatch) => {
        dispatch({type:'RESTART_AUTH_RESPONSE'});
        dispatch({type:'LOADING'});

        try {
            const res = await SignUpService(credentials);
            if(res.statusCode < 300 && res.hasOwnProperty('result')){
                let token = res.result.access_token
                let user = res.result.user
                localStorage.setItem('token', JSON.stringify(token))
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('user_preferences', JSON.stringify(user?.preferences))
                // const decoded = jwt_decode(token);
                dispatch({type:'SIGNUP_SUCCESS', res});
                setTimeout(() => {
                    navigate('/articles')
                    dispatch({type:'RESTART_AUTH_RESPONSE'})
                }, 1500)
            }
            else {
                const errorRes = await res;
                dispatch({type:'SIGNUP_ERROR', res});
                return errorRes.message; // Return the error message
            }
        } catch (error) {
            dispatch({type:'CODE_ERROR', error})
        }
    }
}

export const SignInAction = (credentials, navigate) => {

    return (dispatch) => {
        dispatch({type:'RESTART_AUTH_RESPONSE'});
        dispatch({type:'LOADING'});
            LoginUser(credentials).then((res) => {
                if(res.statusCode < 300 && res.hasOwnProperty('result')){
                    let token = res.result.access_token
                    let user = res.result.user
                    localStorage.setItem('token', JSON.stringify(token))
                    localStorage.setItem('user', JSON.stringify(user))
                    dispatch({type:'LOGIN_SUCCESS', res});
                    setTimeout(() => {
                        navigate('/articles')
                    }, 1500)
                } else {
                    dispatch({type:'LOGIN_ERROR', res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR', error});
                console.log(error)
            }
        )
    }
}

export const RefreshTokenAction = () => {
    return (dispatch) => {
        dispatch({type: 'RESTART_TOKEN_RESPONSE'})
        RefreshToken().then((res) => {
            if (res.status === true) {
                dispatch({type:'REFRESH_TOKEN_SUCCESS', res})
            } else if (res.status > 300) {
                dispatch({type: 'REFRESH_TOKEN_ERROR', res})
            }
        },
        error => {
            dispatch({type:'CODE_ERROR', error});
            console.log(error)
        }
        )
    }
}

export const UserLogOutAction = () =>
{
    return (dispatch)=>{
        dispatch({type:'RESTART_AUTH_RESPONSE'});
        logoutUser().then( (res)=>{
            if(res.status_code === 200){
                dispatch({type:'LOGOUT_SUCCESS',res});

            }else if(res.status_code  > 300){
                dispatch({type:'LOGOUT_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
                console.log(error)
            }
        )
    }   
}

export const clearAuthState = () => {
    return (dispatch) => {
        dispatch({type:'RESTART_AUTH_RESPONSE'})
    }
}