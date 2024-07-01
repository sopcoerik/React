import { Session } from '@ory/client'
import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const activeUserSlice = createSlice({
	name: 'activeUser',
	initialState: {
		session: null,
		logoutUrl: '',
	},
	reducers: {
		updateActiveUserData(state, action) {
			console.log(action)
			return {
				...action.payload,
			}
		},
		resetActiveUser(_state, _action) {
			return {
				session: null,
				logoutUrl: '',
			}
		},
	},
})

export const { updateActiveUserData, resetActiveUser } = activeUserSlice.actions
export const ActiveUserReducer = activeUserSlice.reducer

export const useActiveUser = () =>
	useSelector(
		(state: {
			activeUser: { session: null | Session; logoutUrl: string }
		}) => state!.activeUser
	)
