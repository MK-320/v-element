<template>
  <div class="form-wrapper">
    <Form :model="form" :rules="rules" ref="formRef">
      <FormItem label="密码" prop="password">
        <Input v-model="form.password" type="password" placeholder="请输入密码" />
      </FormItem>
      <FormItem label="确认密码" prop="confirmPassword">
        <Input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" />
      </FormItem>
      <FormItem label="昵称" prop="nickname">
        <Input v-model="form.nickname" placeholder="请输入昵称" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click.prevent="handleSubmit">注 册</Button>
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
import Button from '@/components/Button/Button.vue'

const formRef = ref()

const form = reactive({
  password: '',
  confirmPassword: '',
  nickname: ''
})

// 自定义校验器：密码一致性
const validateConfirm = (_rule: any, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

// 自定义校验器：昵称不能包含 admin
const validateNickname = (_rule: any, value: string, callback: (error?: Error) => void) => {
  if (value && value.includes('admin')) {
    callback(new Error('昵称不能包含 admin'))
  } else {
    callback()
  }
}

const rules = {
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码不能少于 6 位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validateConfirm, trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 12, message: '昵称长度为 2-12 个字符', trigger: 'blur' },
    { validator: validateNickname, trigger: 'blur' }
  ]
}

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    console.log('注册成功', form)
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
  width: 400px;
}
</style>
