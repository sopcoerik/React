type TUserGreetProps = {
	displayName: string
	logoutUrl: string
}

export default function UserGreet({ displayName, logoutUrl }: TUserGreetProps) {
	return (
		<div
			className={`p-1 cursor-pointer hover:bg-slate-700 hover:text-white transition-all duration-300 ${
				displayName ? 'bg-slate-200 text-black' : ''
			} text-center relative group`}
		>
			<p>
				<span className='font-bold'>Hi</span>, {displayName}
			</p>
			<a
				href={logoutUrl}
				className={`w-full py-1 bg-inherit hover:opacity-90 opacity-0 flex -translate-y-full -translate-x-1 duration-500 items-center justify-center absolute group group-hover:translate-y-0 group-hover:opacity-100`}
			>
				<span className='group-hover:opacity-100'>Log Out</span>
			</a>
		</div>
	)
}
