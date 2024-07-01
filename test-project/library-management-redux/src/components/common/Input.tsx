import { useTheme } from '../../hooks/useTheme'
import { Field, ErrorMessage } from 'formik'
import classNames from 'classnames'
import { ChangeEvent } from 'react'

type TInputProps = {
	name: string
	label?: string
	type?:
		| 'submit'
		| 'text'
		| 'number'
		| 'phone'
		| 'email'
		| 'password'
		| undefined
	className?: string
	row?: boolean
	as?: ''
	placeholder?: string
	onChange?(e: ChangeEvent<HTMLInputElement>): void
	value?: string
}

function Input({ name, label, type, className = '', row }: TInputProps) {
	const theme = useTheme()

	const classesFromUsers = classNames(
		className,
		{
			dark: theme === 'dark',
			'bg-inherit text-black outline-none': theme === 'light',
		},
		'w-full'
	)

	return (
		<div className={`${row && 'flex items-center'} w-full`}>
			<div>
				<label className='text-base font-bold'>{label}</label>
			</div>

			<div>
				<Field
					name={name}
					type={type}
					className={classesFromUsers}
				/>
			</div>

			<div>
				<ErrorMessage
					name={`${name}`}
					render={message => (
						<p className='text-red-300'>{message}</p>
					)}
				/>
			</div>
		</div>
	)
}

export default Input
