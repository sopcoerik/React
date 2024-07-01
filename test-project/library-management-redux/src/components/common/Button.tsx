import classNames from 'classnames'
import { ReactNode } from 'react'

type TButtonProps = {
	children?: ReactNode
	rounded?: boolean
	outlined?: boolean
	primary?: boolean
	danger?: boolean
	className?: string
	pill?: boolean
	icon?: JSX.Element
	onClick?(): void
	type?: 'submit' | 'reset' | 'button' | undefined
}

function Button({
	children,
	rounded,
	outlined,
	primary,
	danger,
	className,
	pill,
	icon = <></>,
	onClick,
	type,
	...props
}: TButtonProps) {
	const buttonClass = classNames(
		'border',
		'py-1',
		'px-3',
		`${!danger ? 'bg-blue-500' : ''} hover:bg-blue-300 text-white `,
		{
			'rounded-full': pill,
			'rounded-md': rounded,
			'bg-transparent text-blue-300': outlined && primary,
			'bg-transparent text-red-300': outlined && danger,
			'bg-red-500 hover:bg-red-300': danger && !outlined,
		},
		className
	)

	return (
		<button
			type={type}
			onClick={onClick}
			className={`${buttonClass} flex items-center gap-2`}
			{...props}
		>
			{icon}
			{children}
		</button>
	)
}

export default Button
