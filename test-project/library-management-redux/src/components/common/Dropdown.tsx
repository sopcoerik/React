import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Author, TCategory } from '../../types'

type TDropdownProps = {
	options: Author[] | TCategory[]
	setSelectedAuthor?: (author: Author) => void | null
	setSelectedCategory?: (category: TCategory) => void | null
	category?: boolean
	author?: boolean
	label: string
}

function Dropdown({
	options,
	setSelectedAuthor,
	setSelectedCategory,
	category,
	author,
	label,
}: TDropdownProps) {
	const theme = useTheme()

	const [state, setState] = useState({
		isOpen: false,
		header:
			(author && 'Available authors...') ||
			(category && 'Available categories...'),
	})

	const handleDropdownClick = () => {
		setState({
			...state,
			isOpen: !state.isOpen,
		})
	}

	const handleOptionClick = (option: TCategory | Author) => {
		category ? setSelectedCategory!(option) : setSelectedAuthor!(option)

		setState({
			...state,
			isOpen: false,
			header: option.name!,
		})
	}

	const availableOptions = options.map((option: TCategory | Author) => (
		<div
			key={option.id}
			onClick={() => handleOptionClick(option)}
			className='hover:bg-slate-300'
		>
			{option.name}
		</div>
	))

	return (
		<div className='w-full'>
			<label className='text-base font-bold text-start w-full'>
				{label}
			</label>
			<div className='relative border rounded border-slate-200 py-3 hover:cursor-pointer w-full dropdown'>
				<div
					onClick={handleDropdownClick}
					className='px-1'
				>
					{state.header}
				</div>
				{state.isOpen && (
					<div
						className={`absolute ${
							theme === 'dark'
								? 'bg-black text-white'
								: 'bg-white text-black'
						} w-full border rounded border-slate-200 px-1 py-3 z-10 overflow-auto max-h-24`}
					>
						{availableOptions}
					</div>
				)}
			</div>
		</div>
	)
}
export default Dropdown
