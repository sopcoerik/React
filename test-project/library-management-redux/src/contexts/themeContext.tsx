import { createContext, useState, ReactNode } from 'react'

interface ThemeContextType {
	theme: string
	handleTheme: () => void
}

type ThemeProviderProps = {
	children: ReactNode
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
	undefined
)

function ThemeProvider({ children }: ThemeProviderProps) {
	const [theme, setTheme] = useState('light')

	const handleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	const ThemeValue: ThemeContextType = {
		handleTheme,
		theme,
	}

	return (
		<ThemeContext.Provider value={ThemeValue}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
