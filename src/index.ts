// 所有组件的入口文件
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
]
const install = (app: any) => {
  components.map((component) => {
    //循环注册组件
    app.use(component) //注册插件
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
  createMessage,
  closeMessageAll,
  createNotification,
  closeNotificationAll,
}
//默认全局注册组件
export default {
  install,
}
