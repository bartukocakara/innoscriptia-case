import { combineReducers } from 'redux'
import AuthReducer from './User/AuthReducer'
import MeProfileReducer  from './User/MeProfileReducer'
import DataShowReducer  from './DataShowReducer'
import DataListReducer  from './DataListReducer'
import DataUpdateReducer from './DataUpdateReducer'
import SettingsReducer from './Setting/SettingsReducer'
import DataCreateReducer from './DataCreateReducer'
import DataDeleteReducer from './DataDeleteReducer'

const RootReducer = combineReducers({
  userAuth : AuthReducer,
  meProfile: MeProfileReducer,
  settings: SettingsReducer,
  dataShow: DataShowReducer,
  dataList: DataListReducer,
  dataUpdate: DataUpdateReducer,
  dataDelete: DataDeleteReducer,
  dataCreate: DataCreateReducer,
})

export default RootReducer