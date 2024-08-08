import { createContext } from 'react'

type ThemeContextValue = {
	theme: string
	handleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
	undefined
)
