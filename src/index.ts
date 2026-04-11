// 所有组件的入口文件
import type { App, Plugin } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from '@/components/Button'
import Alert from '@/components/Alert'
import Collapse, { CollapseItem } from '@/components/Collapse'
import Dropdown from '@/components/Dropdown'
import Form, { FormItem } from '@/components/Form'
import Icon from '@/components/Icon'
import Message, { createMessage, closeAll as closeMessageAll } from '@/components/Message'
import Notification, {
  createNotification,
  closeAll as closeNotificationAll,
} from '@/components/Notification'
import Input from '@/components/Input'
import Select from '@/components/Select'
import Switch from '@/components/Switch'
import Tooltip from '@/components/Tooltip'
import Table from '@/components/Table'
import './styles/index.css'
//图标库
library.add(fas)
//所有组件的数组
const components = [
  Button,
  Alert,
  Collapse,
  CollapseItem,
  Dropdown,
  Form,
  FormItem,
  Icon,
  Message,
  Notification,
  Input,
  Select,
  Switch,
  Tooltip,
  Table,
]
const install = (app: App) => {
  components.forEach((component) => {
    //循环注册组件（SFC 上挂的 install 与 Vue 的 Plugin 类型不完全一致，需断言）
    app.use(component as unknown as Plugin)
  })
}
//按需引入组件
export {
  install,
  Button,
  Alert,
  Collapse,
  CollapseItem,
  Dropdown,
  Form,
  FormItem,
  Icon,
  Message,
  Notification,
  Input,
  Select,
  Switch,
  Tooltip,
  Table,
  createMessage,
  closeMessageAll,
  createNotification,
  closeNotificationAll,
}
//默认全局注册组件
export default {
  install,
}
