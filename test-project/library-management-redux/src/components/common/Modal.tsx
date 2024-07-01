import { RxCross2 } from 'react-icons/rx'
import { createPortal } from 'react-dom'
import Button from './Button'
import { useTheme } from '../../hooks/useTheme'
import { ReactNode } from 'react'

type TModalProps = {
	headerText?: string
	children?: ReactNode
	onCancel?(): void
	onOk?(): void
	isOpen: boolean
	confirmMessage?: string
	cancelMessage?: string
}

function Modal({
	headerText,
	children,
	onCancel,
	onOk,
	isOpen,
	confirmMessage,
	cancelMessage,
}: TModalProps) {
	const theme = useTheme()

	if (!isOpen) return null

	return createPortal(
		<>
			<div className='modal absolute z-20 -translate-x-2/4 -translate-y-2/4 top-2/4 left-2/4 bg-white border border-gray-300 rounded flex flex-col'>
				<div className='flex justify-end'>
					<button onClick={onCancel}>
						<RxCross2 className='text-2xl m-2' />
					</button>
				</div>
				<div>{children}</div>
				<div className='flex justify-end mx-3 mb-10 gap-2'>
					{cancelMessage && (
						<Button
							danger
							onClick={onCancel}
						>
							{cancelMessage}
						</Button>
					)}
					{confirmMessage && (
						<Button onClick={onOk}>{confirmMessage}</Button>
					)}
				</div>
			</div>
			<div
				className={`absolute ${
					theme === 'dark' ? 'bg-gray-900' : 'bg-white'
				} inset-0 opacity-70 modal overflow-hidden`}
				onClick={onCancel}
			></div>
		</>,
		document.getElementById('modal-root')!
	)
}

export default Modal
