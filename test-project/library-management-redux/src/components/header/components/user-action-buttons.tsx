import { ThemeButton } from './theme-button'
import UserProfileButton from './user-profile-button'
import { ReactNode } from 'react'

type TUserActionButtonsProps = {
	children?: ReactNode
}

export default function UserActionButtons({
	children,
}: TUserActionButtonsProps) {
	return (
		<div className='w-full flex items-center justify-between gap-3'>
			<ThemeButton />
			<UserProfileButton />
			{children}
		</div>
	)
}
