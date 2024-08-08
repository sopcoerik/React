import { GrFavorite } from 'react-icons/gr'
import { Session } from '@ory/client'
import { useState } from 'react'

import { useFetchFavoritesQuery } from '../../../store'
import FavoritesList from './favorites-list'

type TFavoritesButtonProps = {
	activeUser: Session
}

export default function FavoritesButton({ activeUser }: TFavoritesButtonProps) {
	const [showFavoritesList, sestShowFavoritesList] = useState(false)

	const handleFavoritesState = () => {
		sestShowFavoritesList(!showFavoritesList)
	}

	const { data: favorites } = useFetchFavoritesQuery(
		{ userId: activeUser?.identity?.id! },
		{
			skip: !activeUser,
		}
	)

	return (
		<button
			onClick={handleFavoritesState}
			className='relative flex'
		>
			<GrFavorite className='text-3xl' />
			{showFavoritesList ? (
				<FavoritesList favorites={favorites || []} />
			) : null}
		</button>
	)
}
