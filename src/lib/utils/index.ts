import { get } from 'svelte/store'
import type { Component } from '$lib/types'
import { design, dnd, over, initialComponent, theme } from '$lib/store'
import * as components from '$lib/components/components'
import { decompile } from './props'

export function makeid(length = 8): string {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < length; ++i) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export function prepareStyle(
  style: Record<string, boolean | string | number | null>,
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
    dnd.set({ ...initialComponent })
    over.set({ ...initialComponent })
    design.set(get(design))
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

export function toJson(component: Component) {
  const { id, name, props, style, children, text } = component
  return {
    id,
    name,
    text,
    props,
    style,
    children: children.map((c) => toJson(c)),
  }
}

function object2component(obj: Record<string, any>): Component {
  const { id, name, style, props, text, children } = obj
  return {
    id,
    name,
    style,
    props,
    text,
    component: components[obj.name] || '',
    children: children.map((c: Component) => object2component(c)),
  }
}

export function toObject(json: string): Component {
  const obj = JSON.parse(json)
  return object2component(obj)
}

export function exportProps(props: Record<string, any>): string {
  let ret = ''
  for (const prop in props) {
    ret += ` ${prop}="${props[prop]}"`
  }
  return ret
}

export function exportStyle(component: Component): string {
  let ret = `  .${component.id} {`
  for (const s in component.style) {
    ret += `\n    ${s}: ${component.style[s]};`
  }
  ret += '\n  }\n'
  ret += component.children.map((c) => exportStyle(c)).join()
  return ret
}

export function exportText(component: Component): string {
  let ret = `\n    ${component.id}: "${component.text}",`
  ret += component.children.map((c) => exportText(c)).join()
  return ret
}

export function exportCode(component: Component, prefix = ''): string {
  const element = component.name.toLowerCase()
  let ret = `${prefix}<${element} class="${component.id}"`
  ret += exportProps(decompile(component.props))
  ret += `>\n`
  const children = component.children.map((c) => exportCode(c, `${prefix}  `))
  ret += children.join()
  ret += `${prefix}  {data[${component.id}]}\n`
  ret += `${prefix}</${element}>\n`
  return ret
}

export function setThemeProp(key: string, value: string) {
  document.documentElement.style.setProperty(`--${key}`, value)
  theme.update(t => ({ ...t, key: value }))
}
