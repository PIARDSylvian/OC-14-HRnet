import { createSlice } from '@reduxjs/toolkit'
import { selectEmployees } from './selector'
import { getLocal, setLocal } from '../utils/localStorage'
import { AppDispatch } from './store'

const initialState = {
    status: 'void',
    error: null,
    employees: [],
    newEmployee: null,
}

const { actions, reducer } = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        fetching: (draft) => {
            if (draft.status !== 'pending') {
                draft.status = 'pending'
                draft.error = null
                return
            }
            return
        },
        resolved: (draft, action) => {
            if (draft.status === 'pending') {
                draft.employees = action.payload
                draft.status = 'resolved'
                return
            }
            return
        },
        rejected: (draft, action) => {
            if (draft.status === 'pending') {
                draft.error = action.payload
                draft.status = 'rejected'
                return
            }
            return
        },
    },
})

export function addEmployee(employee: any) {
    return async (dispatch: AppDispatch, getState: any) => {
        const state = selectEmployees(getState())
        if (state.status === 'pending') return
        dispatch(actions.fetching())
        try {
            const employees = await getLocal()
            employees.push(employee)
            setLocal(employees)
            dispatch(actions.resolved(employees))
        } catch (error) {
            dispatch(actions.rejected(error))
        }
    }
}

export function getEmployees() {
    return async (dispatch: AppDispatch, getState: any) => {
        const state = selectEmployees(getState())
        if (state.status === 'pending') return
        dispatch(actions.fetching())
        try {
            const employees = await getLocal()
            dispatch(actions.resolved(employees))
        } catch (error) {
            dispatch(actions.rejected(error))
        }
    }
}

export default reducer
