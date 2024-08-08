import { useContext } from 'react'
import { ThemeContext } from '@contexts'

export function useThemeContext() {
	return useContext(ThemeContext)
}
