import { BsSun } from 'react-icons/bs'
import { FaCloudMoon } from 'react-icons/fa'
import { useTheme } from '../../../hooks/useTheme'
import { setTheme } from '../../../store'
import { useDispatch } from 'react-redux'

export const ThemeButton = () => {
	const theme = useTheme()

	const dispatch = useDispatch()

	const handleThemeChange = () => {
		dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))
	}

	return (
		<button
			className='text-3xl'
			onClick={handleThemeChange}
		>
			{theme === 'dark' ? <FaCloudMoon /> : <BsSun />}
		</button>
	)
}
