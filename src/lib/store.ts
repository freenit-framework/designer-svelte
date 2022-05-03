import { writable } from 'svelte/store'
import { compile } from './utils/props'

export const initialComponent = {
  id: null,
  name: 'root',
  component: '',
  text: '',
  children: [],
  props: compile({}),
  style: compile({}),
}

export const design = writable({ ...initialComponent, id: 'root' })
export const selected = writable({ ...initialComponent })
export const dnd = writable({ ...initialComponent })
export const over = writable({ ...initialComponent })
export const theme = writable({
  'bg-color': '#ffffff',
  'bg-secondary-color': '#f3f3f6',
  'color-primary': '#14854F',
  'color-lightGrey': '#d2d6dd',
  'color-grey': '#747681',
  'color-darkGrey': '#3f4144',
  'color-error': '#d43939',
  'color-success': '#28bd14',
  'grid-maxWidth': '120rem',
  'grid-gutter': '2rem',
  'font-size': '1.6rem',
  'font-color': '#333333',
  'font-family-sans': '',
  'font-family-mono': 'monaco, Consolas, Lucida Console, monospace',
})
