import { writable } from 'svelte/store'

export const initialComponent = {
  id: null,
  name: 'root',
  component: '',
  text: '',
  children: [],
  props: {},
  style: {},
}

export const design = writable({ ...initialComponent, id: 'root' })
export const selected = writable({ ...initialComponent })
export const dnd = writable({ ...initialComponent })
export const over = writable({ ...initialComponent })
