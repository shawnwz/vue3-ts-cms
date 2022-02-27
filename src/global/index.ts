import type { App } from 'vue'

const NODE_ENV = process?.env?.NODE_ENV

export default function globalRegister(app: App): void {
  if (NODE_ENV === 'development') {
    require('../mock')
  }
}
