import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Switch from './Switch.vue'
import type { SwitchValueType } from './types'

describe('Switch.vue', () => {
  it('basic rendering', () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
      },
    })

    expect(wrapper.classes()).toContain('vm-switch')
    expect(wrapper.find('.vm-switch__input').exists()).toBeTruthy()
    expect(wrapper.find('.vm-switch__core').exists()).toBeTruthy()
    expect(wrapper.find('.vm-switch__core-action').exists()).toBeTruthy()
  })

  it('v-model support', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        'onUpdate:modelValue': (e: SwitchValueType) => wrapper.setProps({ modelValue: e }),
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.props('modelValue')).toBe(true)
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('size variants', () => {
    const sizes = ['small', 'large'] as const
    for (const size of sizes) {
      const wrapper = mount(Switch, {
        props: {
          modelValue: false,
          size,
        },
      })
      expect(wrapper.classes()).toContain(`vm-switch--${size}`)
    }
  })

  it('disabled state', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        disabled: true,
      },
    })

    expect(wrapper.classes()).toContain('is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.props('modelValue')).toBe(false)
  })

  it('active/inactive text', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        activeText: 'ON',
        inactiveText: 'OFF',
      },
    })

    const text = wrapper.find('.vm-switch__core-inner-text')
    expect(text.text()).toBe('OFF')

    await wrapper.setProps({ modelValue: true })
    await nextTick()
    expect(text.text()).toBe('ON')
  })

  it('custom values', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: 'off',
        activeValue: 'on',
        inactiveValue: 'off',
        'onUpdate:modelValue': (e: SwitchValueType) => wrapper.setProps({ modelValue: e }),
      },
    })

    await wrapper.trigger('click')
    await nextTick()
    expect(wrapper.props('modelValue')).toBe('on')
  })

  it('keyboard interaction', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        'onUpdate:modelValue': (e: SwitchValueType) => wrapper.setProps({ modelValue: e }),
      },
    })

    const input = wrapper.find('.vm-switch__input')
    await input.trigger('keydown.enter')
    await nextTick()
    expect(wrapper.props('modelValue')).toBe(true)
  })
})
