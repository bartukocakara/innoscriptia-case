const initialState = {
    authResponse : ""
}

const AuthReducer = (state=initialState, action) =>{
        switch(action.type){
            case 'RESTART_AUTH_RESPONSE':
                return {
                    ...state,
                    authResponse:""
                }
            case 'LOADING':
                return {
                    ...state,
                    authResponse:'loading...'
                }

            case 'SIGNUP_SUCCESS':
              return {
                  ...state,
                  authResponse:action.res,
              }
    
            case 'SIGNUP_ERROR':
                console.log(action)
                return {
                    ...state,
                    authResponse:action.res,
            }
    
            case 'CODE_ERROR':
                return {
                    ...state,
                    authResponse:'there seems to be a problem please refresh your browser',
                }
            case 'LOGIN_SUCCESS':
                return {
                    ...state,
                    authResponse:action.res,
                }
            case 'LOGIN_ERROR':
                return {
                    ...state,
                    authResponse:action.res,
                }
            case 'LOGOUT_SUCCESS':
                return {
                    ...state,
                    authResponse:action.res,
                }

            case 'LOGOUT_ERROR':
                return {
                    ...state,
                    authResponse:action.res,
                }
            case 'RESTART_TOKEN_RESPONSE':
                return {
                    ...state,
                    authResponse:""
                }
            case 'REFRESH_TOKEN_SUCCESS':
                return {
                    ...state,
                    authResponse:action.res,
                }
            case 'REFRESH_TOKEN_ERROR':
                return {
                    ...state,
                    authResponse:action.res,
            }
            default:
                    return state
    
    }
}
    
export default AuthReducer;