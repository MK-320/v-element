import { defineComponent } from 'vue'
const RenderVnode = defineComponent({
  props: {
    vNode: {
      type: [String, Object], // 第二个Object就是VNode类型
      required: true,
    },
  },
  setup(props) {
    return () => props.vNode //h()
  },
})

export default RenderVnode
