import { useSelector } from 'react-redux'

export function useTheme() {
	return useSelector(
		(state: { theme: { theme: string } }) => state.theme.theme
	)
}
