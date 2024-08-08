import { Link } from 'react-router-dom'
import { useTheme } from '@hooks'
import { FC } from 'react'

type TNavElementProps = {
	to: string
	title: string
}

export const NavElement: FC<TNavElementProps> = ({ to, title }) => {
	const theme = useTheme()

	return (
		<Link
			to={to}
			className={`border-b border-b-transparent hover:border-b-green-300 ${
				theme === 'dark' ? 'bg-black' : 'hover:bg-slate-300'
			}`}
		>
			<span>{title}</span>
		</Link>
	)
}
