import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'

export default function UserProfileButton() {
	return (
		<Link
			to='/user'
			className='text-3xl'
		>
			<CgProfile />
		</Link>
	)
}
