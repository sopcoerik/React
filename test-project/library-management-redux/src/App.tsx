import { Outlet } from 'react-router-dom'

import { Header } from '@components'
import { useTheme } from '@hooks'

function App() {
	const theme = useTheme()

	return (
		<div
			className={`h-screen ${theme === 'dark' ? theme : 'bg-slate-100'}`}
		>
			<Header />
			<Outlet />
		</div>
	)
}

export default App
