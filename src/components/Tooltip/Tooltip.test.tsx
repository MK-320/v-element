import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'
vi.mock('@popperjs/core')

describe('Tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('basic tooltip', async () => {
    const onVisibleChange = vi.fn()
    const wrapper = mount(Tooltip, {
      props: {
        content: 'hello tooltip',
        trigger: 'click',
      },
      attrs: {
        'onVisible-change': onVisibleChange,
      },
      slots: {
        default: () => <button id="trigger">Trigger</button>,
      },
      attachTo: document.body,
    })

    // 静态测试
    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()
    expect(wrapper.find('.vm-tooltip__popper').exists()).toBeFalsy()

    // 测试点击行为
    triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.vm-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.get('.vm-tooltip__popper').text()).toBe('hello tooltip')
    expect(onVisibleChange).toHaveBeenCalledWith(true)

    // 测试点击外部关闭
    const outside = document.createElement('div')
    outside.id = 'outside'
    document.body.appendChild(outside)
    outside.click()
    await vi.runAllTimers()
    expect(wrapper.find('.vm-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
    document.body.removeChild(outside)
  })

  test('hover trigger', async () => {
    const onVisibleChange = vi.fn()
    const wrapper = mount(Tooltip, {
      props: {
        content: 'hover tooltip',
        trigger: 'hover',
      },
      attrs: {
        'onVisible-change': onVisibleChange,
      },
      slots: {
        default: () => <button id="trigger">Trigger</button>,
      },
      attachTo: document.body,
    })

    // 鼠标移入显示
    await wrapper.find('#trigger').trigger('mouseenter')
    await vi.runAllTimers()
    expect(wrapper.find('.vm-tooltip__popper').exists()).toBeTruthy()
    expect(onVisibleChange).toHaveBeenCalledWith(true)

    // 鼠标移出隐藏
    await wrapper.find('#trigger').trigger('mouseleave')
    await vi.runAllTimers()
    expect(wrapper.find('.vm-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenCalledWith(false)
  })

  test('manual trigger mode', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: 'manual tooltip',
        trigger: 'click',
        manual: true,
        visible: true,
      },
      slots: {
        default: () => <button id="trigger">Trigger</button>,
      },
      attachTo: document.body,
    })

    // 初始应该显示
    expect(wrapper.find('.vm-tooltip__popper').exists()).toBeTruthy()

    // 点击不应关闭
    await wrapper.find('#trigger').trigger('click')
    expect(wrapper.find('.vm-tooltip__popper').exists()).toBeTruthy()
  })

  test('disabled tooltip', async () => {
    const onVisibleChange = vi.fn()
    const wrapper = mount(Tooltip, {
      props: {
        content: 'disabled tooltip',
        manual: true,
        disabled: true,
      },
      attrs: {
        'onVisible-change': onVisibleChange,
      },
      slots: {
        default: () => <button id="trigger">Trigger</button>,
      },
      attachTo: document.body,
    })

    // 点击不应显示
    await wrapper.find('#trigger').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.vm-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).not.toHaveBeenCalled()
  })

  test('custom content slot', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        trigger: 'click',
      },
      slots: {
        default: () => <button id="trigger">Trigger</button>,
        content: () => <span class="custom-content">Custom Content</span>,
      },
      attachTo: document.body,
    })

    // 点击显示自定义内容
    await wrapper.find('#trigger').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.custom-content').exists()).toBeTruthy()
    expect(wrapper.find('.custom-content').text()).toBe('Custom Content')
  })

  test('delay show/hide', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: 'delayed tooltip',
        trigger: 'hover',
        openDelay: 200,
        closeDelay: 300,
      },
      slots: {
        default: () => <button id="trigger">Trigger</button>,
      },
      attachTo: document.body,
    })

    // 鼠标移入，未到延迟时间
    await wrapper.find('#trigger').trigger('mouseenter')
    await vi.advanceTimersByTime(100)
    expect(wrapper.find('.vm-tooltip__popper').exists()).toBeFalsy()

    // 到达延迟时间后显示
    await vi.advanceTimersByTime(100)
    expect(wrapper.find('.vm-tooltip__popper').exists()).toBeTruthy()

    // 鼠标移出，未到延迟时间
    await wrapper.find('#trigger').trigger('mouseleave')
    await vi.advanceTimersByTime(200)
    expect(wrapper.find('.vm-tooltip__popper').exists()).toBeTruthy()

    // 到达延迟时间后隐藏
    await vi.advanceTimersByTime(100)
    expect(wrapper.find('.vm-tooltip__popper').exists()).toBeFalsy()
  })
})
