export const BookDetailCard = ({
	title,
	value,
}: {
	title: string
	value: string
}) => {
	return (
		<div className='w-full h-1/6 border-b border-gray-300 mt-2'>
			<h3 className='text-lg font-bold'>
				{title}: <p className='font-light italic'>{value}</p>
			</h3>
		</div>
	)
}
