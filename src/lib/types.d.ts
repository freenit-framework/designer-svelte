/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
  userid: string
}

export interface Component {
  name: string
  id: string
  component: any
  children: Component[]
  props: Record<any, any>
  style: Record<any, boolean | string | number | null>
  text: string
}
