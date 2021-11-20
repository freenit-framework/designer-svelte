import { makeid } from '$lib/utils'
import * as components from './components'

const htmlcomponents = Object.keys(components).map((name) => ({
  name,
  id: makeid(),
  component: components[name],
  children: [],
  props: {},
  style: {},
  text: '',
}))

export default htmlcomponents
