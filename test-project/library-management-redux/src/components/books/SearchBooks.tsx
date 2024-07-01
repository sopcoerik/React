import { useTheme } from '../../hooks/useTheme'
import Button from '../common/Button'
import { Form, Formik } from 'formik'
import Input from '../common/Input'

type TSearchBooksProps = {
	setTerm(value: string): void
}

function SearchBooks({ setTerm }: TSearchBooksProps) {
	const theme = useTheme()

	const handleSubmit = (searchTerm: string) => {
		setTerm(searchTerm)
	}

	const initialFormValues = {
		term: '',
	}

	return (
		<div
			className={`my-2 p-5 ${
				theme === 'dark' ? 'bg-black text-white' : 'bg-slate-200'
			}  rounded`}
		>
			<Formik
				initialValues={initialFormValues}
				onSubmit={(values, actions) => {
					handleSubmit(values.term)
				}}
			>
				<Form className='flex'>
					<Input
						name='term'
						type='text'
						label='Search:'
						className={`border border-gray-400 ml-2 px-3 outline-none`}
						row
					/>
					<Button
						type='submit'
						className='ml-3'
					>
						Submit
					</Button>
				</Form>
			</Formik>
		</div>
	)
}

export default SearchBooks
