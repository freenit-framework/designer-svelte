import { get } from 'svelte/store'
import type { Component } from '$lib/types'
import { design, dnd, over, initialComponent } from '$lib/store'

export function makeid(length = 8): string {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < length; ++i) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export function isSimple(data: any): boolean {
  return (
    typeof data === 'number' ||
    typeof data === 'boolean' ||
    typeof data === 'string'
  )
}

export function prepareStyle(
  style: Record<any, boolean | string | number | null>,
) {
  if (!style) {
    return ''
  }
  const css = Object.keys(style)
    .map((prop) => `${prop}: ${style[prop]};`)
    .join(' ')
  return css
}

export function dragStart(component: Component) {
  function ds(event: Event) {
    event.stopPropagation()
    dnd.set(component)
  }
  return ds
}

export function dragEnd() {
  dnd.set({ ...initialComponent })
  over.set({ ...initialComponent })
}

export function changeIds(component: Component): Component {
  const newone = {
    ...component,
    id: makeid(),
    props: JSON.parse(JSON.stringify(component.props)),
    style: JSON.parse(JSON.stringify(component.style)),
    children: component.children.map((item) => changeIds(item)),
  }
  return newone
}

export function drop(component: Component, index: number = -1) {
  function doDrop(event: Event) {
    event.stopPropagation()
    event.preventDefault()
    const existing = get(dnd)
    const newone = changeIds(existing)
    if (index === -1) {
      component.children = [...component.children, newone]
    } else {
      component.children.splice(index, 0, newone)
    }
    design.set(get(design))
    dnd.set({ ...initialComponent })
    over.set({ ...initialComponent })
  }
  return doDrop
}

export function dragEnter(component: Component) {
  function de(event: Event) {
    event.stopPropagation()
    over.set(component)
  }
  return de
}

export function dragLeave() {
  over.set({ ...initialComponent })
}
