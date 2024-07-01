import { useSelector } from 'react-redux'

function useTheme() {
	return useSelector(
		(state: { theme: { theme: string } }) => state.theme.theme
	)
}

export { useTheme }
