type TCloseButton = {
	onCancel(): void
}

function CloseButton({ onCancel }: TCloseButton) {
	return (
		<div className='header w-full border-b border-slate-300'>
			<div className='flex justify-end'>
				<div
					className='x-boss px-4 py-1 relative flex h-8 cursor-pointer'
					onClick={onCancel}
				>
					<div className='x absolute w-0.5 h-5 top-2/4 left-2/4 bg-gray-300 rotate-45 -translate-x-2/4 -translate-y-2/4' />
					<div className='x absolute w-0.5 h-5 top-2/4 left-2/4 bg-gray-300 -rotate-45 -translate-x-2/4 -translate-y-2/4' />
				</div>
			</div>
		</div>
	)
}

export default CloseButton
