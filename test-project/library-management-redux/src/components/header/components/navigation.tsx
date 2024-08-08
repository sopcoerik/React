import { NavElement } from './navigation.element'

const navElements = [
	{
		to: '/',
		title: 'Books',
	},
	{
		to: '/authors',
		title: 'Authors',
	},
	{
		to: '/categories',
		title: 'Categories',
	},
]

export default function Navigation() {
	const renderNavElements = () =>
		navElements.map(navElement => (
			<NavElement
				key={navElement.title}
				{...navElement}
			/>
		))

	return (
		<div className='w-full flex justify-between gap-3'>
			{renderNavElements()}
		</div>
	)
}
