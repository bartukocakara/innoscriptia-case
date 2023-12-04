const initState = {
    preferences:""
    }
    const PreferenceReducer = (state=initState, action) =>{
            switch(action.type){
            
            case 'LOADING':
                    return {
                        ...state,
                        preferences:'loading'
                    }

            case 'LOAD_PREFERENCE_SUCCESS':
                    return {
                        ...state,
                        preferences:action.res,
                    }
    
            case 'LOAD_PREFERENCE_ERROR':
                    console.log(action)

                    return {
                        ...state,
                        preferences:action.res,
                    }
    
            case 'CODE_ERROR':
                            console.log(action)
                    return {
                        ...state,
                        preferences:'there seems to be a problem please refresh your browser',
                    }
            default:
                    return state
        }
    }
    
    export default PreferenceReducer;