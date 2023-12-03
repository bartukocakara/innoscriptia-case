const initState = {
    dataDelete:""
    }
    const DataDeleteReducer = (state=initState, action) =>{
            switch(action.type){
            
            case 'LOADING_DELETE':
                    return {
                        ...state,
                        dataDelete: 'loading'
                    }

            case 'DATA_DELETE_SUCCESS':
                    return {
                        ...state,
                        dataDelete: action.res,
                    }
    
            case 'DATA_DELETE_ERROR':

                    return {
                        ...state,
                        dataDelete: action.res,
                    }
    
            case 'CODE_ERROR':
                            console.log(action)
                    return {
                        ...state,
                        dataDelete: 'there seems to be a problem please refresh your browser',
                    }
            default:
                    return state
        }
    }
    
    export default DataDeleteReducer;