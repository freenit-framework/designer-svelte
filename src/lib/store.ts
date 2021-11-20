import { writable } from 'svelte/store'

export const rearrange = writable(false)
export const design = writable([])
export const selected = writable({
  id: null
})
