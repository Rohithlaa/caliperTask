import reducers from "./Reducers";
// import { composeWithDevTools } from 'redux-devtools-extension'
import {configureStore} from '@reduxjs/toolkit'

const store = configureStore({reducer: reducers})

export default store