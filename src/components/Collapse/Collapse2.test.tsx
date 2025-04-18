import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

describe('Collapse.vue', () => {
  test('basic collapse', async () => {
    const wrapper = mount(Collapse, {
      props: {
        'modelValue': ['a']
      },
      slots: {
        default:
          (<>
            <CollapseItem name="a" title="title a">
              content a
            </CollapseItem>
            <CollapseItem name="b" title="title b">
              content b
            </CollapseItem>
            <CollapseItem name="c" title="title c" disabled>
              content c
            </CollapseItem>
          </>)
      },
      global: {
        stubs: ['Icon']
      },
      attachTo: document.body
    })

    // 基础结构测试
    const headers = wrapper.findAll('.vm-collapse-item__header')
    const contents = wrapper.findAll('.vm-collapse-item__wrapper')
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    // 内容显示测试
    const firstHeader = headers[0]
    const secondHeader = headers[1]
    expect(firstHeader.text()).toBe('title a')

    const firstContent = contents[0]
    const secondContent = contents[1]
    const disabledContent = contents[2]
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')

    // 交互行为测试
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()

    // 事件测试
    expect(wrapper.emitted()).toHaveProperty('change')
    const changeEvent = wrapper.emitted('change') as any[]
    expect(changeEvent).toHaveLength(2)
    expect(changeEvent[0]).toEqual([[]])
    expect(changeEvent[1]).toEqual([['b']])

    // 禁用测试
    const disableHeader = headers[2]
    expect(disableHeader.classes()).toContain('is-disabled')
    await disableHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
  })

  test('accordion mode', async () => {
    const wrapper = mount(Collapse, {
      props: {
        'modelValue': ['a'],
        accordion: true
      },
      slots: {
        default:
          (<>
            <CollapseItem name="a" title="title a">
              content a
            </CollapseItem>
            <CollapseItem name="b" title="title b">
              content b
            </CollapseItem>
          </>)
      },
      global: {
        stubs: ['Icon']
      },
      attachTo: document.body
    })

    const headers = wrapper.findAll('.vm-collapse-item__header')
    const contents = wrapper.findAll('.vm-collapse-item__wrapper')

    // 初始状态
    expect(contents[0].isVisible()).toBeTruthy()
    expect(contents[1].isVisible()).toBeFalsy()

    // 点击第二个面板
    await headers[1].trigger('click')
    expect(contents[0].isVisible()).toBeFalsy()
    expect(contents[1].isVisible()).toBeTruthy()

    // 再次点击第二个面板
    await headers[1].trigger('click')
    expect(contents[1].isVisible()).toBeFalsy()
  })

  test('custom title slot', async () => {
    const wrapper = mount(Collapse, {
      props: {
        'modelValue': ['a']
      },
      slots: {
        default:
          (<CollapseItem name="a" v-slots={{
            title: () => <span class="custom-title">Custom Title</span>
          }}>
            content a
          </CollapseItem>)
      },
      global: {
        stubs: ['Icon']
      },
      attachTo: document.body
    })

    expect(wrapper.find('.custom-title').exists()).toBeTruthy()
    expect(wrapper.find('.custom-title').text()).toBe('Custom Title')
  })

  test('no default active panel', () => {
    const wrapper = mount(Collapse, {
      slots: {
        default:
          (<>
            <CollapseItem name="a" title="title a">
              content a
            </CollapseItem>
          </>)
      },
      global: {
        stubs: ['Icon']
      },
      attachTo: document.body
    })

    expect(wrapper.find('.vm-collapse-item__wrapper').isVisible()).toBeFalsy()
  })
})
