import { ThemeContext } from '@contexts'
import { ReactNode, useState } from 'react'

type ThemeContextValue = {
	theme: string
	handleTheme: () => void
}

type TThemeProviderProps = {
	children: ReactNode
}

export default function ThemeProvider({ children }: TThemeProviderProps) {
	const [theme, setTheme] = useState('light')

	const handleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	const ThemeValue: ThemeContextValue = {
		handleTheme,
		theme,
	}

	return (
		<ThemeContext.Provider value={ThemeValue}>
			{children}
		</ThemeContext.Provider>
	)
}
