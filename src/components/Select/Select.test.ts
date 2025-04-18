import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Select from './Select.vue'
import Input from '../Input/Input.vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { SelectOption } from './types'

describe('Select.vue', () => {
  const options: SelectOption[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Disabled Option', value: '3', disabled: true },
  ]

  it('basic rendering', () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: 'Select...',
      },
    })

    expect(wrapper.classes()).toContain('vm-select')
    expect(wrapper.findComponent(Input).exists()).toBeTruthy()
    expect(wrapper.findComponent(Tooltip).exists()).toBeTruthy()
  })

  it('v-model support', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '1',
        options,
        placeholder: 'Select...',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
      },
    })

    expect(wrapper.find('input').element.value).toBe('Option 1')
    await wrapper.setProps({ modelValue: '2' })
    expect(wrapper.find('input').element.value).toBe('Option 2')
  })

  it('dropdown toggle', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: 'Select...',
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('visible-change')).toBeTruthy()
    expect(wrapper.find('.vm-select__menu').exists()).toBeTruthy()
  })

  it('option selection', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: 'Select...',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
      },
    })

    await wrapper.trigger('click')
    const menuItems = wrapper.findAll('.vm-select__menu-item')
    await menuItems[1].trigger('click')
    expect(wrapper.props('modelValue')).toBe('2')
    expect(wrapper.find('input').element.value).toBe('Option 2')
  })

  it('filterable mode', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: 'Select...',
        filterable: true,
      },
    })

    await wrapper.trigger('click')
    const input = wrapper.find('input')
    await input.setValue('Option 2')
    const filteredOptions = wrapper.findAll('.vm-select__menu-item')
    expect(filteredOptions.length).toBe(1)
    expect(filteredOptions[0].text()).toBe('Option 2')
  })

  it('remote search', async () => {
    const remoteMethod = vi.fn((query: string) => {
      return Promise.resolve(options.filter((opt) => opt.label.includes(query)))
    })

    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options: [],
        placeholder: 'Select...',
        filterable: true,
        remote: true,
        remoteMethod,
      },
    })

    await wrapper.trigger('click')
    const input = wrapper.find('input')
    await input.setValue('Option')
    expect(remoteMethod).toHaveBeenCalledWith('Option')
  })

  it('keyboard navigation', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: 'Select...',
      },
    })

    const input = wrapper.find('input')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('clear functionality', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '1',
        options,
        placeholder: 'Select...',
        clearable: true,
      },
    })

    await wrapper.setData({ states: { mouseHover: true } })
    const clearIcon = wrapper.find('.vm-input__clear')
    await clearIcon.trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toEqual([['']])
  })

  it('disabled state', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: 'Select...',
        disabled: true,
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('visible-change')).toBeFalsy()
  })

  it('custom option rendering', async () => {
    const renderLabel = vi.fn((option: SelectOption) => {
      return option.label + ' (custom)'
    })

    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: 'Select...',
        renderLabel: renderLabel as any, // Temporary workaround for test
      },
    })

    await wrapper.trigger('click')
    const firstOption = wrapper.find('.vm-select__menu-item')
    expect(firstOption.text()).toContain('(custom)')
  })
})
