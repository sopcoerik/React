import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '../../hooks/useTheme'
import { useUpdateUserMutation } from '../../store'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { HiCheck } from 'react-icons/hi'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { ChangeEvent } from 'react'

function UserPage() {
	const activeUser = useSelector(
		(state: {
			activeUser: {
				activeUser: {
					id: string
					name: string
					email: string
					password: string
				}
			}
		}) => state.activeUser.activeUser
	)

	const theme = useTheme()

	const [updateUser] = useUpdateUserMutation()
	const dispatch = useDispatch()

	if (!activeUser) {
		return (
			<div className='container mx-auto text-center py-10 text-xl font-bold'>
				Please Log In
			</div>
		)
	}

	const EditSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),
		email: Yup.string().email('Invalid Email').required('Required'),
		password: Yup.string()
			.min(2, 'Too Short!')
			.max(12, 'Too Long!')
			.required('Required'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), undefined], 'Passwords must match!')
			.required('Required'),
	})

	return (
		<div className={'container mx-auto'}>
			{activeUser && (
				<div
					className={`w-full p-3 ${
						theme === 'dark' ? theme : 'bg-slate-50'
					}`}
				>
					<div className='text-center border-b'>
						<h1 className='font-bold text-2xl py-3'>
							Your Profile
						</h1>
					</div>
					<div>
						<Formik
							initialValues={{
								name: activeUser.name,
								email: activeUser.email,
								password: activeUser.password,
								confirmPassword: '',
							}}
							validationSchema={EditSchema}
							onSubmit={(values, { resetForm }) => {
								// updateUser({
								// 	id: activeUser.id,
								// 	updatedUser: {
								// 		...activeUser,
								// 		...values,
								// 	},
								// })

								// dispatch(
								// 	editActiveUser({
								// 		...activeUser,
								// 		...values,
								// 	})
								// )
								resetForm({
									values: {
										name: values.name,
										email: values.email,
										password: values.password,
										confirmPassword: '',
									},
								})
							}}
						>
							<Form className='flex flex-col gap-5'>
								<Input
									label='Name'
									name='name'
									type='text'
									onChange={function (
										e: ChangeEvent<HTMLInputElement>
									): void {
										throw new Error(
											'Function not implemented.'
										)
									}}
								/>

								<Input
									label='Email'
									type='email'
									name='email'
									onChange={function (
										e: ChangeEvent<HTMLInputElement>
									): void {
										throw new Error(
											'Function not implemented.'
										)
									}}
								/>

								<Input
									label='Password'
									type='password'
									name='password'
									onChange={function (
										e: ChangeEvent<HTMLInputElement>
									): void {
										throw new Error(
											'Function not implemented.'
										)
									}}
								/>

								<Input
									label='Confirm Password'
									type='password'
									name='confirmPassword'
									onChange={function (
										e: ChangeEvent<HTMLInputElement>
									): void {
										throw new Error(
											'Function not implemented.'
										)
									}}
								/>

								<div>
									<Button
										primary
										icon={<HiCheck />}
										type='submit'
									>
										Save Changes
									</Button>
								</div>
							</Form>
						</Formik>
					</div>
				</div>
			)}
		</div>
	)
}

export default UserPage
