<template>
  <Table 
    :data="tableData" 
    :columns="columns" 
    border
  >
    <template #expand="{ row }">
      <div style="padding: 10px;">
        <p>姓名: {{ row.name }}</p>
        <p>年龄: {{ row.age }}</p>
        <p>地址: {{ row.address }}</p>
        <p>详细信息: 这是展开行的详细信息</p>
      </div>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Table from '@/components/Table/Table.vue'

const columns = ref([
  { title: '展开', type: 'expand', expandSlot: 'expand' },
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
])

const tableData = ref([
  { id: 1, name: '张三', age: 25, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 30, address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 28, address: '广州市天河区' },
  { id: 4, name: '赵六', age: 22, address: '深圳市南山区' }
])
</script>