<template>
  <div class="form-wrapper">
    <Form :model="form" :rules="rules" ref="formRef">
      <FormItem label="用户名" prop="username">
        <Input v-model="form.username" placeholder="请输入用户名" />
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input v-model="form.email" placeholder="请输入邮箱" />
      </FormItem>
      <FormItem label="部门" prop="dept">
        <Select v-model="form.dept" :options="deptOptions" placeholder="请选择部门" />
      </FormItem>
      <FormItem label="职位" prop="role">
        <Input v-model="form.role" placeholder="请输入职位" />
      </FormItem>
      <FormItem label="手机号" prop="phone">
        <Input v-model="form.phone" placeholder="请输入手机号" />
      </FormItem>
      <FormItem label="个人网站" prop="website">
        <Input v-model="form.website" placeholder="请输入网址（选填）" />
      </FormItem>
      <FormItem label="简介" prop="bio">
        <Input v-model="form.bio" type="textarea" placeholder="请输入个人简介" />
      </FormItem>
      <FormItem label="开启通知" prop="notify">
        <Switch v-model="form.notify" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click.prevent="handleSubmit">提 交</Button>
        <Button @click.prevent="handleReset">重 置</Button>
        <Button type="info" @click.prevent="handleClear">清除校验</Button>
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
  email: '',
  dept: '',
  role: '',
  phone: '',
  website: '',
  bio: '',
  notify: false
})

const deptOptions = [
  { label: '技术部', value: 'tech' },
  { label: '产品部', value: 'product' },
  { label: '设计部', value: 'design' },
  { label: '市场部', value: 'marketing' },
  { label: '运营部', value: 'operation' }
]

const rules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度为 2-20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  dept: [
    { required: true, message: '请选择部门', trigger: 'change' }
  ],
  role: [
    { required: true, message: '职位不能为空', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  website: [
    { type: 'url', message: '请输入正确的网址格式', trigger: 'blur' }
  ],
  bio: [
    { max: 200, message: '简介不能超过 200 个字符', trigger: 'blur' }
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

const handleClear = () => {
  formRef.value.clearValidate()
}
</script>

<style scoped>
.form-wrapper {
  width: 440px;
}
</style>
