import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Dropdown from './Dropdown.vue'
import { nextTick } from 'vue'

vi.mock('@popperjs/core')

describe('Dropdown.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const menuOptions = [
    { key: '1', label: 'Option 1' },
    { key: '2', label: 'Option 2', disabled: true },
    { key: '3', label: 'Option 3', divided: true },
  ]

  test('basic dropdown', async () => {
    const wrapper = mount(Dropdown, {
      props: {
        menuOptions,
        trigger: 'click',
      },
      slots: {
        default: '<button id="trigger">Trigger</button>',
      },
      attachTo: document.body,
    })

    // Initial state
    expect(wrapper.find('.vm-dropdown__menu').exists()).toBeFalsy()

    // Click to show
    await wrapper.find('#trigger').trigger('click')
    await nextTick()
    expect(wrapper.find('.vm-dropdown__menu').exists()).toBeTruthy()
    expect(wrapper.findAll('.vm-dropdown__item').length).toBe(3)
    expect(wrapper.find('#dropdown-item-2').classes()).toContain('is-disabled')
    expect(wrapper.findAll('.divided-placeholder').length).toBe(1)
  })

  test('hover trigger', async () => {
    const wrapper = mount(Dropdown, {
      props: {
        menuOptions,
        trigger: 'hover',
      },
      slots: {
        default: '<button id="trigger">Trigger</button>',
      },
      attachTo: document.body,
    })

    // Mouse enter to show
    await wrapper.find('#trigger').trigger('mouseenter')
    await vi.runAllTimers()
    expect(wrapper.find('.vm-dropdown__menu').exists()).toBeTruthy()

    // Mouse leave to hide
    await wrapper.find('#trigger').trigger('mouseleave')
    await vi.runAllTimers()
    expect(wrapper.find('.vm-dropdown__menu').exists()).toBeFalsy()
  })

  test('item click', async () => {
    const onSelect = vi.fn()
    const wrapper = mount(Dropdown, {
      props: {
        menuOptions,
        trigger: 'click',
        hideAfterClick: true,
        onSelect,
      },
      slots: {
        default: '<button id="trigger">Trigger</button>',
      },
      attachTo: document.body,
    })

    // Click to show menu
    await wrapper.find('#trigger').trigger('click')
    await nextTick()

    // Click menu item
    await wrapper.find('#dropdown-item-1').trigger('click')
    expect(onSelect).toHaveBeenCalledWith(menuOptions[0])
    expect(wrapper.find('.vm-dropdown__menu').exists()).toBeFalsy()

    // Click disabled item
    await wrapper.find('#trigger').trigger('click')
    await nextTick()
    await wrapper.find('#dropdown-item-2').trigger('click')
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  test('manual control', async () => {
    const wrapper = mount(Dropdown, {
      props: {
        menuOptions,
        manual: true,
        modelValue: true,
      },
      slots: {
        default: '<button id="trigger">Trigger</button>',
      },
      attachTo: document.body,
    })

    // Initially visible
    expect(wrapper.find('.vm-dropdown__menu').exists()).toBeTruthy()

    // Click should not hide
    await wrapper.find('#trigger').trigger('click')
    expect(wrapper.find('.vm-dropdown__menu').exists()).toBeTruthy()
  })

  test('expose methods', async () => {
    const wrapper = mount(Dropdown, {
      props: {
        menuOptions,
      },
      slots: {
        default: '<button id="trigger">Trigger</button>',
      },
      attachTo: document.body,
    })

    // Test exposed methods
    const dropdown = wrapper.vm as any
    dropdown.show()
    await nextTick()
    expect(wrapper.find('.vm-dropdown__menu').exists()).toBeTruthy()

    dropdown.hide()
    await nextTick()
    expect(wrapper.find('.vm-dropdown__menu').exists()).toBeFalsy()
  })

  test('visible-change event', async () => {
    const onVisibleChange = vi.fn()
    const wrapper = mount(Dropdown, {
      props: {
        menuOptions,
        trigger: 'click',
        onVisibleChange,
      },
      slots: {
        default: '<button id="trigger">Trigger</button>',
      },
      attachTo: document.body,
    })

    // Click to show
    await wrapper.find('#trigger').trigger('click')
    await nextTick()
    expect(onVisibleChange).toHaveBeenCalledWith(true)

    // Click outside to hide
    document.body.click()
    await nextTick()
    expect(onVisibleChange).toHaveBeenCalledWith(false)
  })
})
