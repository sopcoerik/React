const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
	addWebpackAlias({
		'@': ['./*'],
		'@components': path.resolve(__dirname, 'src/components/index.ts'),
		'@contexts': path.resolve(__dirname, 'src/contexts/index.ts'),
		'@hooks': path.resolve(__dirname, 'src/hooks/index.ts'),
		'@pages': path.resolve(__dirname, 'src/pages/index.ts'),
		'@providers': path.resolve(__dirname, 'src/providers/index.ts'),
		'@security': path.resolve(__dirname, 'src/security/index.ts'),
		'@store': path.resolve(__dirname, 'src/store/index.ts'),
		'@types': path.resolve(__dirname, 'src/types/index.ts'),
	})
)
