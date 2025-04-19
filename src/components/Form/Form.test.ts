import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Form from './Form.vue'
import FormItem from './FormItem.vue'
import Input from '../Input/Input.vue'
import type { FormRules } from './types'

describe('Form.vue', () => {
  const model = {
    email: '',
    password: '',
  }

  const rules: FormRules = {
    email: [{ required: true, message: 'Please input email', trigger: 'blur' }],
    password: [
      { required: true, message: 'Please input password', trigger: 'blur' },
      { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
    ],
  }

  it('renders form with form items', () => {
    const wrapper = mount({
      template: `
        <Form :model="model" :rules="rules">
          <FormItem label="email" prop="email">
            <Input v-model="model.email" />
          </FormItem>
          <FormItem label="Password" prop="password">
            <Input v-model="model.password" type="password" />
          </FormItem>
        </Form>
      `,
      components: { Form, FormItem, Input },
      data() {
        return { model, rules }
      },
    })

    expect(wrapper.findComponent(Form).exists()).toBe(true)
    expect(wrapper.findAllComponents(FormItem).length).toBe(2)
    expect(wrapper.findAllComponents(Input).length).toBe(2)
  })

  it('shows validation errors when submitting invalid form', async () => {
    const wrapper = mount({
      template: `
        <Form ref="form" :model="model" :rules="rules">
          <FormItem label="email" prop="email">
            <Input v-model="model.email" />
          </FormItem>
        </Form>
      `,
      components: { Form, FormItem, Input },
      data() {
        return { model, rules }
      },
    })

    const form = wrapper.findComponent(Form)
    await form.vm.validate().catch(() => {})

    expect(wrapper.find('.vm-form-item__error-msg').exists()).toBe(true)
    expect(wrapper.find('.vm-form-item__error-msg').text()).toContain('Please input email')
  })

  it('passes validation with correct inputs', async () => {
    const wrapper = mount({
      template: `
        <Form ref="form" :model="model" :rules="rules">
          <FormItem label="email" prop="email">
            <Input v-model="model.email" />
          </FormItem>
        </Form>
      `,
      components: { Form, FormItem, Input },
      data() {
        return {
          model: { email: 'testemail' },
          rules,
        }
      },
    })

    const result = await wrapper.findComponent(Form).vm.validate()
    expect(result).toBe(true)
    expect(wrapper.find('.vm-form-item__error-msg').exists()).toBe(false)
  })

  it('resets form fields correctly', async () => {
    const wrapper = mount({
      template: `
        <Form ref="form" :model="model" :rules="rules">
          <FormItem label="email" prop="email">
            <Input v-model="model.email" />
          </FormItem>
        </Form>
      `,
      components: { Form, FormItem, Input },
      data() {
        return {
          model: { email: 'testemail' },
          rules,
        }
      },
    })

    wrapper.findComponent(Form).vm.resetFields()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.vm-form-item__error-msg').exists()).toBe(false)
  })

  it('clears validation messages', async () => {
    const wrapper = mount({
      template: `
        <Form ref="form" :model="model" :rules="rules">
          <FormItem label="email" prop="email">
            <Input v-model="model.email" />
          </FormItem>
        </Form>
      `,
      components: { Form, FormItem, Input },
      data() {
        return { model, rules }
      },
    })

    await wrapper
      .findComponent(Form)
      .vm.validate()
      .catch(() => {})
    expect(wrapper.find('.vm-form-item__error-msg').exists()).toBe(true)

    wrapper.findComponent(Form).vm.clearValidate()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.vm-form-item__error-msg').exists()).toBe(false)
  })
})
