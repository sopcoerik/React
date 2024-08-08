import { Session } from '@ory/client'

import { useTheme } from '@hooks'
import { useActiveUser } from '@store'

import {
	Logo,
	Navigation,
	UserActionButtons,
	FavoritesButton,
	UserGreet,
} from './components'

export default function Header() {
	const theme = useTheme()

	const { session, logoutUrl } = useActiveUser()

	const { identity } = session || ({} as Session)

	return (
		<div
			className={`${
				theme === 'dark' ? 'bg-black text-white' : 'bg-slate-200'
			} flex justify-around items-center gap-6 px-1`}
		>
			<Logo />
			<div className='w-full max-w-7xl flex items-center justify-between gap-6'>
				<div className='basis-60'>
					<Navigation />
				</div>
				<div className='basis-44'>
					<UserActionButtons>
						<FavoritesButton
							activeUser={session || ({} as Session)}
						/>
					</UserActionButtons>
				</div>
			</div>
			<UserGreet
				displayName={
					identity?.traits.email?.split('@')[0] ||
					identity?.traits.username
				}
				logoutUrl={logoutUrl}
			/>
		</div>
	)
}
