<template>
  <div class="form-wrapper">
    <Form :model="form" :rules="rules" ref="formRef">
      <FormItem label="用户名" prop="username">
        <Input v-model="form.username" placeholder="请输入用户名" />
      </FormItem>
      <FormItem label="部门" prop="dept">
        <Select v-model="form.dept" :options="deptOptions" placeholder="请选择部门" />
      </FormItem>
      <FormItem label="角色" prop="role">
        <Select v-model="form.role" :options="roleOptions" placeholder="请选择角色" />
      </FormItem>
      <FormItem label="手机号" prop="phone">
        <Input v-model="form.phone" placeholder="请输入手机号" />
      </FormItem>
      <FormItem label="开启通知" prop="notify">
        <Switch v-model="form.notify" />
      </FormItem>
      <FormItem label=" " prop="agreement">
        <label class="agreement-label">
          <input type="checkbox" v-model="form.agreement" />
          <span>我已阅读并同意相关协议</span>
        </label>
      </FormItem>
      <FormItem>
        <Button type="primary" @click.prevent="handleSubmit">提 交</Button>
        <Button @click.prevent="handleReset">重 置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue'
import Select from '@/components/Select/Select.vue'
import Switch from '@/components/Switch/Switch.vue'
import Button from '@/components/Button/Button.vue'

const formRef = ref()

const form = reactive({
  username: '',
  dept: '',
  role: '',
  phone: '',
  notify: false,
  agreement: false
})

const deptOptions = [
  { label: '技术部', value: 'tech' },
  { label: '产品部', value: 'product' },
  { label: '设计部', value: 'design' },
  { label: '市场部', value: 'marketing' },
  { label: '运营部', value: 'operation' }
]

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '普通成员', value: 'member' },
  { label: '访客', value: 'guest' }
]

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  dept: [
    { required: true, message: '请选择部门', trigger: 'change' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  agreement: [
    { type: 'enum', enum: [true], message: '请勾选同意协议', trigger: 'change' }
  ]
}

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    console.log('提交成功', form)
  } catch (e) {
    console.log('校验失败', e)
  }
}

const handleReset = () => {
  formRef.value.resetFields()
}
</script>

<style scoped>
.form-wrapper {
  width: 420px;
}
.agreement-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
}
.agreement-label input {
  cursor: pointer;
}
</style>
