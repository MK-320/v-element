import type { App } from 'vue'
import Notification from './Notification.vue'
import { createNotification, closeAll } from './method'

Notification.install = (app: App) => {
  app.component(Notification.name || 'VmNotification', Notification)
  app.config.globalProperties.$notification = {
    create: createNotification,
    closeAll,
  }
}

export default Notification
export { createNotification, closeAll }
export * from './types'
