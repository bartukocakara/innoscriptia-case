const initState = {
    settings:""
    }
    const SettingsReducer = (state=initState, action) =>{
            switch(action.type){
            
            case 'LOADING':
                    return {
                        ...state,
                        settings:'loading'
                    }

            case 'LOAD_SETTINGS_SUCCESS':
                    return {
                        ...state,
                        settings:action.res,
                    }
    
            case 'LOAD_SETTINGS_ERROR':
                    console.log(action)

                    return {
                        ...state,
                        settings:action.res,
                    }
    
            case 'CODE_ERROR':
                            console.log(action)
                    return {
                        ...state,
                        settings:'there seems to be a problem please refresh your browser',
                    }
            default:
                    return state
        }
    }
    
    export default SettingsReducer;