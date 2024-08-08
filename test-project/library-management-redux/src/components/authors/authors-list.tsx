import { Session } from '@ory/client'
import { useTheme } from '@hooks'
import { Author } from '@types'

type TAuthorsListProps = {
	setModal(value: boolean): void
	setAuthorToEditId(authorId: string | null): void
	authors: Author[]
	deleteAuthor(value: { id: string }): void
	activeUser: Session
}

function AuthorsList({
	setModal,
	setAuthorToEditId,
	authors,
	deleteAuthor,
	activeUser,
}: TAuthorsListProps) {
	const theme = useTheme()

	const handleDeleteAuthorClick = (id: string) => {
		deleteAuthor({ id })
	}

	const handleAddAuthorClick = () => {
		setAuthorToEditId(null)
		setModal(true)
	}

	const handleEditAuthorClick = (id: string) => {
		setAuthorToEditId(id)
		setModal(true)
	}

	const renderedAuthors = authors.map(author => (
		<div
			key={author.id}
			className='m-2 border-b border-slate-300 flex justify-between items-center'
		>
			{author.name}
			<div className='h-10'>
				{activeUser && (
					<>
						<button
							onClick={() => handleEditAuthorClick(author.id)}
							className='px-3 py-1 border border-slate-300 rounded hover:bg-blue-300 mb-2 hover:text-white'
						>
							Edit Author
						</button>
						<button
							onClick={() => handleDeleteAuthorClick(author.id)}
							className='px-3 py-1 ml-3 border border-slate-300 rounded hover:bg-red-300 mb-2 hover:text-white'
						>
							Delete
						</button>
					</>
				)}
			</div>
		</div>
	))

	return (
		<div
			className={`${
				theme === 'dark' ? 'bg-black text-white' : 'bg-slate-200'
			} p-2`}
		>
			<div className='p-2 font-bold text-lg'>Name</div>
			{renderedAuthors}
			<div className='flex justify-end m-2'>
				{activeUser && (
					<button
						className='px-3 py-1 border rounded hover:bg-blue-300 hover:text-white'
						onClick={handleAddAuthorClick}
					>
						+ Add Author
					</button>
				)}
			</div>
		</div>
	)
}

export default AuthorsList
