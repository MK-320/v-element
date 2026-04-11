<template>
  <div class="form-wrapper">
    <Form :model="form" :rules="rules" ref="formRef">
      <FormItem label="邮箱" prop="email">
        <Input v-model="form.email" placeholder="请输入邮箱" />
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input v-model="form.password" type="password" placeholder="请输入密码" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click.prevent="handleSubmit">登 录</Button>
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
  email: '',
  password: ''
})

const rules = {
  email: [
    { type: 'email', required: true, message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码不能少于 6 位', trigger: 'blur' }
  ]
}

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    console.log('登录成功', form)
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
