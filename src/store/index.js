import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
const store = configureStore({
    reducer: rootReducer,
    devTools: true, //dev tools true korar karon jate amra broswer theke dekhte pari
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})

export default store;