import { ReactNode } from 'react'

import { ThemeButton } from './theme-button'
import UserProfileButton from './user-profile-button'

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
