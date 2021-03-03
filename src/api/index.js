import _ from 'lodash'
const files = require.context('./modules', false, /\.js$/)
const modules = {}
files.keys().forEach(key => {
	_.mergeWith(modules,{[files(key).default.name]:files(key).default})
})
export default modules