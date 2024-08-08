import { FrontendApi, Configuration, Session, Identity } from '@ory/client'
import { useState, useCallback, useMemo } from 'react'

export function useKratosAuth() {
	const basePath = useMemo(
		() => process.env.REACT_APP_ORY_URL || 'http://localhost:4000',
		[]
	)

	const ory = useCallback(
		() =>
			new FrontendApi(
				new Configuration({
					basePath,
					baseOptions: {
						withCredentials: true,
					},
				})
			),
		[basePath]
	)()

	const [session, setSession] = useState<
		Session | 'loading' | 'error' | null
	>(null)
	const [logoutUrl, setLogoutUrl] = useState<string | null>(null)

	// Returns either the email or the username depending on the user's Identity Schema
	const getUserName = (identity?: Identity) =>
		identity?.traits.email.split('@')[0] || identity?.traits.username

	const initSession = useCallback(async () => {
		setSession('loading')

		try {
			const { data } = await ory.toSession()

			setSession(data)

			const { data: logoutData } = await ory.createBrowserLogoutFlow()

			setLogoutUrl(logoutData.logout_url)
		} catch (error) {
			setSession('error')
			window.location.replace(`${basePath}/ui/login`)
		}
	}, [basePath, ory])

	// Second, gather session data, if the user is not logged in, redirect to login

	if (!session) {
		initSession()
	}

	return {
		session,
		logoutUrl,
		getUserName,
	}
}
