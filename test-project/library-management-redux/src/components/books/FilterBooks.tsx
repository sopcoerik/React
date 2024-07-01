import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { TCategory } from '../../types'

type TFilterBooksProps = {
	categories: TCategory[]
	setSelectedCategoriesIds(value: string[]): void
}

function FilterBooks({
	categories,
	setSelectedCategoriesIds,
}: TFilterBooksProps) {
	const [checked, setChecked] = useState(false)
	const theme = useTheme()

	const handleCheckboxChange = (id: string) => {
		// if (!checked) {
		//   setChecked(true);
		//   setSelectedCategoriesIds([id]);
		// } else {
		//   setChecked(false);
		//   setSelectedCategoriesIds([]);
		// }
		setSelectedCategoriesIds([id])
	}

	const handleShowAll = () => {
		setSelectedCategoriesIds([])
	}

	const renderedCategories = categories?.map(category => (
		<div key={category.id}>
			<input
				type='radio'
				name='category'
				onClick={() => handleCheckboxChange(category.id)}
			/>
			&nbsp;{category.name}
		</div>
	))

	return (
		<div className={`${theme === 'dark' ? 'bg-black text-white' : ''}`}>
			<div>
				<label>Filter Books By Category: &nbsp;</label>
				<div className={`flex justify-around flex-wrap`}>
					<div>
						<input
							type='radio'
							name='category'
							onClick={handleShowAll}
						/>
						All
					</div>
					{renderedCategories}
				</div>
			</div>
		</div>
	)
}

export default FilterBooks
