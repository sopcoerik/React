import { createPortal } from 'react-dom'
import { useTheme } from '@hooks'
import { MouseEventHandler } from 'react'

type TOverlayProps = {
	isOpen: boolean
	setModal(value: boolean): void
}

function Overlay({ isOpen, setModal }: TOverlayProps) {
	const theme = useTheme()

	const handleModalClick: MouseEventHandler<HTMLDivElement> = e => {
		if ((e.target as Element)?.classList.contains('modal')) {
			setModal(false)
		}
	}

	return (
		isOpen &&
		createPortal(
			<div
				className={`absolute ${
					theme === 'dark' ? 'bg-gray-900' : 'bg-white'
				} inset-0 opacity-70 modal  overflow-hidden`}
				onClick={handleModalClick}
			></div>,
			document.getElementById('modal-root')!
		)
	)
}

export default Overlay
