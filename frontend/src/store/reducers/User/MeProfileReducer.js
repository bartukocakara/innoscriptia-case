const initState = {
    meProfile:""
    }
    const MeProfileReducer = (state=initState, action) =>{
            switch(action.type){
            
            case 'LOADING':
                    return {
                        ...state,
                        meProfile:'loading'
                    }

            case 'LOAD_ME_PROFILE_SUCCESS':
                    return {
                        ...state,
                        meProfile:action.res,
                    }
    
            case 'LOAD_ME_PROFILE_ERROR':
                    console.log(action)

                    return {
                        ...state,
                        meProfile:action.res,
                    }
    
            case 'CODE_ERROR':
                            console.log(action)
                    return {
                        ...state,
                        meProfile:'there seems to be a problem please refresh your browser',
                    }
            default:
                    return state
        }
    }
    
    export default MeProfileReducer;