import { expect, test, describe } from 'vitest'

test('test Object', () => {
  expect({ name: 'zhangsan' }).toEqual({ name: 'zhangsan' })
})
test('test  number', () => {
  expect(1 + 2).not.toBe(4)
})

// describe('function',()=>{

// })
