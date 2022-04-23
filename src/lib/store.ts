import { writable } from 'svelte/store'
import { compile } from './utils/props'

export const initialComponent = {
  id: null,
  name: 'root',
  component: '',
  text: '',
  children: [],
  props: compile({}),
  style: {},
}

export const design = writable({ ...initialComponent, id: 'root' })
export const selected = writable({ ...initialComponent })
export const dnd = writable({ ...initialComponent })
export const over = writable({ ...initialComponent })
