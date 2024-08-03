import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { FC } from 'react'

type THeaderTabProps = {
	to: string
	title: string
}

export const HeaderTab: FC<THeaderTabProps> = ({ to, title }) => {
	const theme = useTheme()

	return (
		<Link
			to={to}
			className={`hover:border-b hover:border-green-300 ${
				theme === 'dark' ? 'bg-black' : 'hover:bg-slate-300'
			}`}
		>
			<p className='py-4 px-2'>{title}</p>
		</Link>
	)
}
