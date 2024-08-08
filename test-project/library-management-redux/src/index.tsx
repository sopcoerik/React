import ReactDOM from 'react-dom/client'
import { Router } from './providers/router-provider'

import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'

const el = document.querySelector('#root')!
const root = ReactDOM.createRoot(el)

root.render(
	<Provider store={store}>
		<Router />
	</Provider>
)
