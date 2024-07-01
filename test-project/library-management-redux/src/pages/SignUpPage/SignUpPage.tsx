import { ChangeEvent, FormEvent, useState } from 'react'
import { useCreateUserMutation } from '../../store/apis/usersApi_backup'
import { useNavigate } from 'react-router-dom'

function SignUpPage() {
	const [formInput, setFormInputs] = useState({
		username: '',
		email: '',
		password: '',
	})

	const [createUser] = useCreateUserMutation()
	const navigate = useNavigate()

	const handleFormInputsChange = (e: ChangeEvent<HTMLInputElement>) =>
		setFormInputs({ ...formInput, [e.target.name]: e.target.value })

	const resetFormInputs = () =>
		setFormInputs({ username: '', email: '', password: '' })

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault()
		// createUser(formInput)
		resetFormInputs()
		navigate('/login')
	}

	return (
		<>
			<div className='relative container mx-auto h-4/6 mt-20 bg-white flex justify-center items-center flex-col rounded-2xl border border-gray-400'>
				<h3 className='absolute top-24 left-2/4 -translate-x-2/4 -translate-y-2/4 text-3xl font-bold'>
					Sign Up
				</h3>
				<div className='w-4/6 h-0.5 bg-gray-200 mb-24' />
				<div className='w-96 flex justify-center items-center'>
					<form onSubmit={handleFormSubmit}>
						<div className='flex flex-col mb-8'>
							<label>Username:</label>
							<input
								name='username'
								type='text'
								placeholder='Enter Your Name'
								className='border border-gray-200 py-1 px-3'
								value={formInput.username}
								onChange={handleFormInputsChange}
							/>
						</div>
						<div className='flex flex-col mb-8'>
							<label>E-mail:</label>
							<input
								name='email'
								type='email'
								placeholder='Enter your e-mail'
								className='border border-gray-200 py-1 px-3'
								value={formInput.email}
								onChange={handleFormInputsChange}
							/>
						</div>
						<div className='flex flex-col'>
							<label>Password:</label>
							<input
								name='password'
								type='password'
								placeholder='Enter your password'
								className='border border-gray-200 py-1 px-3'
								value={formInput.password}
								onChange={handleFormInputsChange}
							/>
						</div>
						<div className='flex justify-center my-16'>
							<button className='border rounded transition-all hover:bg-green-300 hover:text-white py-1 px-3 text-lg'>
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default SignUpPage
