import Notification from './Notification.vue'
import { createNotification, closeAll } from './method'

Notification.install = (app: any) => {
  app.component(Notification.name, Notification)
  app.config.globalProperties.$notification = {
    create: createNotification,
    closeAll
  }
}

export default Notification
export {
  createNotification,
  closeAll
}
export * from './types'
