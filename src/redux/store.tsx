import employeesReducer from './employees'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: { employees: employeesReducer },
})

export type AppDispatch = typeof store.dispatch
