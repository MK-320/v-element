import './styles/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { createApp } from 'vue'
import App from './App.vue'
library.add(fas) //使用图标
createApp(App).mount('#app')
