import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Table from './Table.vue'

describe('Table.vue', () => {
  it('renders table with data', () => {
    const columns = [
      { title: 'Name', key: 'name' },
      { title: 'Age', key: 'age' }
    ]
    
    const data = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 }
    ]
    
    const wrapper = mount(Table, {
      props: {
        columns,
        data
      }
    })
    
    // Check if table is rendered
    expect(wrapper.find('table').exists()).toBe(true)
    
    // Check if headers are rendered
    const headers = wrapper.findAll('th')
    expect(headers.length).toBe(2)
    expect(headers[0].text()).toBe('Name')
    expect(headers[1].text()).toBe('Age')
    
    // Check if data rows are rendered
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(2)
    
    const firstRowCells = rows[0].findAll('td')
    expect(firstRowCells[0].text()).toBe('John')
    expect(firstRowCells[1].text()).toBe('30')
  })
  
  it('renders table with border when border prop is true', () => {
    const wrapper = mount(Table, {
      props: {
        border: true,
        columns: [{ title: 'Name', key: 'name' }],
        data: [{ name: 'John' }]
      }
    })
    
    expect(wrapper.find('table').classes()).toContain('vm-table--border')
  })
  
  it('renders slot content when slot is provided', () => {
    const columns = [
      { title: 'Name', key: 'name', slot: 'name' }
    ]
    
    const data = [{ name: 'John' }]
    
    const wrapper = mount(Table, {
      props: {
        columns,
        data
      },
      slots: {
        name: '<span class="custom-name">Custom Name</span>'
      }
    })
    
    expect(wrapper.find('.custom-name').exists()).toBe(true)
  })

  it('renders index column with sequential numbers', () => {
    const columns = [
      { title: '#', key: '__index', type: 'index' as const },
      { title: 'Name', key: 'name' }
    ]
    const data = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }]

    const wrapper = mount(Table, {
      props: {
        columns,
        data,
        expandKey: 'id'
      }
    })

    const headers = wrapper.findAll('th')
    expect(headers.length).toBe(2)
    const firstRowCells = wrapper.findAll('tbody tr')[0].findAll('td')
    expect(firstRowCells[0].text()).toBe('1')
    expect(firstRowCells[1].text()).toBe('A')
  })
})