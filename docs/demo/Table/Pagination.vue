<template>
  <Table 
    :data="tableData" 
    :columns="columns" 
    border
    :pagination="{ pageSize: 3, currentPage: 1 }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Table from '@/components/Table/Table.vue'

const columns = ref([
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
])

const tableData = ref([
  { name: '张三', age: 25, address: '北京市朝阳区' },
  { name: '李四', age: 30, address: '上海市浦东新区' },
  { name: '王五', age: 28, address: '广州市天河区' },
  { name: '赵六', age: 22, address: '深圳市南山区' },
  { name: '钱七', age: 35, address: '杭州市西湖区' },
  { name: '孙八', age: 27, address: '南京市鼓楼区' },
  { name: '周九', age: 31, address: '成都市锦江区' }
])
</script>