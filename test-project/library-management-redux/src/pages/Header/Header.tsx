import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

import { CgProfile } from 'react-icons/cg'

import Favorites from '../../components/common/Favorites'
import { useActiveUser } from '../../store/slices/activeUserSlice'
import { HeaderTab } from './HeaderTab'
import { ThemeButton } from '../../components/theme/ThemeButton'

const headerTabs = [
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

function Header() {
	const theme = useTheme()

	const { session, logoutUrl } = useActiveUser()

	const renderHeaderTabs = () =>
		headerTabs.map(headerTab => (
			<HeaderTab
				key={headerTab.title}
				{...headerTab}
			/>
		))

	return (
		<div
			className={`${
				theme === 'dark' ? 'bg-black text-white' : 'bg-slate-200'
			} flex items-center`}
		>
			<h3 className='text-lg font-bold flex flex-col'>
				<span>Library</span> <span>Manager</span>
			</h3>
			<div className='flex items-center'>
				<div className='flex'>{renderHeaderTabs()}</div>
				<div className='flex items-center'>
					<ThemeButton />
					<Link
						to='/user'
						className='inline-block'
					>
						<CgProfile className='text-3xl' />
					</Link>
					<div>{session && <Favorites activeUser={session} />}</div>
				</div>
			</div>
			<div className='space-y-px my-1 ml-auto'>
				{session ? (
					<p
						className={`${
							!session
								? 'hover:bg-slate-700 cursor-pointer'
								: 'bg-slate-200 text-black'
						} text-center`}
					>
						Hi,{' '}
						{session?.identity?.traits.email?.split('@')[0] ||
							session?.identity?.traits.username}
					</p>
				) : null}
				{session ? (
					<a
						href={logoutUrl}
						className={`${
							!session
								? 'hover:bg-slate-700'
								: 'hover:bg-slate-500 hover:text-white'
						} py-1 px-3 inline-block`}
					>
						Log Out
					</a>
				) : null}
			</div>
		</div>
	)
}

export default Header
