import { writable } from 'svelte/store'
import { compile } from './utils/props'
import { A } from './components/components'

export const initialComponent = {
  id: null,
  name: 'root',
  component: '',
  text: '',
  children: [{
    name: 'A',
    id: 'aethseyh',
    component: A,
    children: [],
    props: compile({
      href: 'https://meka.rs',
      target: '_blank',
      obj: {
        id: 'some',
      },
      arr: ['one', 'two', 'tree'],
    }),
    style: {},
    text: 'meka.rs',

  }],
  props: compile({}),
  style: {},
}

export const design = writable({ ...initialComponent, id: 'root' })
export const selected = writable({ ...initialComponent })
export const dnd = writable({ ...initialComponent })
export const over = writable({ ...initialComponent })
