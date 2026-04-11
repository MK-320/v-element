<template>
  <Table :data="tableData" :columns="columns" border />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Table from '@/components/Table/Table.vue'

const columns = ref([
  { title: '序号', type: 'index', width: 60 },
  { title: '工号', key: 'id', width: 80 },
  { title: '姓名', key: 'name', width: 100 },
  { title: '部门', key: 'dept', width: 120 },
  { title: '职位', key: 'role', width: 120 },
  { title: '城市', key: 'city', width: 100 },
  { title: '入职日期', key: 'date', width: 120 }
])

const tableData = ref([
  { id: '1001', name: '张三', dept: '技术部', role: '前端工程师', city: '北京', date: '2022-01-15' },
  { id: '1002', name: '李四', dept: '产品部', role: '产品经理', city: '上海', date: '2021-06-20' },
  { id: '1003', name: '王五', dept: '设计部', role: 'UI设计师', city: '广州', date: '2023-03-10' },
  { id: '1004', name: '赵六', dept: '市场部', role: '市场专员', city: '深圳', date: '2024-01-05' }
])
</script>
