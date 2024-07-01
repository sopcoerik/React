import { Link } from 'react-router-dom'
import { FaCloudMoon } from 'react-icons/fa'
import { BsSun } from 'react-icons/bs'
import { setTheme } from '../../store'
import { useTheme } from '../../hooks/useTheme'
import { useDispatch } from 'react-redux'

import { CgProfile } from 'react-icons/cg'

import Favorites from '../../components/common/Favorites'
import { useActiveUser } from '../../store/slices/activeUserSlice'

function Header() {
	const dispatch = useDispatch()

	const handleThemeChange = () => {
		dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))
	}

	const theme = useTheme()

	const { session, logoutUrl } = useActiveUser()

	return (
		<div
			className={`container mx-auto ${
				theme === 'dark' ? 'bg-black text-white' : 'bg-slate-200'
			} flex justify-around items-center h-16`}
		>
			<div className='flex items-center'>
				<div className='text-lg font-bold px-2'>
					<h3>Library Manager</h3>
				</div>
				<div className='flex ml-5 gap-3'>
					<Link
						to='/'
						className={`hover:border-b hover:border-green-300 ${
							theme === 'dark' ? 'bg-black' : 'hover:bg-slate-300'
						}`}
					>
						<p className='mx-5 py-4'>Books</p>
					</Link>
					<Link
						to='/authors'
						className={`hover:border-b hover:border-green-300 ${
							theme === 'dark' ? 'bg-black' : 'hover:bg-slate-300'
						}`}
					>
						<p className='mx-5 py-4'>Authors</p>
					</Link>
					<Link
						to='/categories'
						className={`hover:border-b hover:border-green-300 ${
							theme === 'dark' ? 'bg-black' : 'hover:bg-slate-300'
						}`}
					>
						<p className='mx-5 py-4'>Categories</p>
					</Link>
				</div>
			</div>
			<div className='relative w-20 -translate-y-2/4 translate-x-2/4'>
				<input
					className={`opacity-0 absolute z-10 left-2/4 -translate-x-2/4 -translate-y-2/4 h-9 w-9 cursor-pointer rounded-full bg-gray-400`}
					onClick={handleThemeChange}
					type='checkbox'
				/>
				<div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 h-10 w-10'>
					{theme === 'dark' ? (
						<FaCloudMoon className='h-full w-full' />
					) : (
						<BsSun className='h-full w-full' />
					)}
				</div>
			</div>

			<div>
				<Link to='/user'>
					<CgProfile className='text-3xl' />
				</Link>
			</div>

			<div>{session && <Favorites activeUser={session} />}</div>

			<div
				className={`flex flex-col justify-around items-center h-16 ${
					theme === 'dark'
						? 'bg-zinc-800 text-white'
						: ' bg-slate-400 text-slate-200'
				}`}
			>
				<div
					className={`${
						!session
							? 'hover:bg-slate-700 cursor-pointer'
							: 'bg-slate-200 text-black'
					} py-1 px-3 w-24 text-center`}
				>
					{session ? (
						<p>
							Hi, {session?.identity?.traits.email.split('@')[0]}
						</p>
					) : null}
				</div>
				<div
					className={`${
						!session
							? 'hover:bg-slate-700'
							: 'hover:bg-slate-500 hover:text-white'
					}  py-1 px-3 cursor-pointer w-24 text-center`}
				>
					{session ? <a href={logoutUrl}>Log Out</a> : null}
				</div>
			</div>
		</div>
	)
}

export default Header
