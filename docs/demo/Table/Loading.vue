<template>
  <div class="demo-wrapper">
    <button class="trigger-btn" @click="loading = !loading">
      {{ loading ? '关闭加载' : '开启加载' }}
    </button>
    <Table
      :data="tableData"
      :columns="columns"
      border
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Table from '@/components/Table/Table.vue'

const loading = ref(true)

const columns = ref([
  { title: '工号', key: 'id', width: 80 },
  { title: '姓名', key: 'name', width: 100 },
  { title: '部门', key: 'dept', width: 120 },
  { title: '职位', key: 'role', width: 120 },
  { title: '城市', key: 'city', width: 100 },
  { title: '入职日期', key: 'date', width: 120 },
  { title: '状态', key: 'status', width: 80 }
])

const tableData = ref([
  { id: '1001', name: '张三', dept: '技术部', role: '前端工程师', city: '北京', date: '2022-01-15', status: '在职' },
  { id: '1002', name: '李四', dept: '产品部', role: '产品经理', city: '上海', date: '2021-06-20', status: '在职' },
  { id: '1003', name: '王五', dept: '设计部', role: 'UI设计师', city: '广州', date: '2023-03-10', status: '在职' },
  { id: '1004', name: '赵六', dept: '市场部', role: '市场专员', city: '深圳', date: '2024-01-05', status: '实习' }
])
</script>

<style scoped>
.demo-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.trigger-btn {
  align-self: flex-start;
  padding: 6px 14px;
  border: 1px solid #409eff;
  background: #fff;
  border-radius: 4px;
  color: #409eff;
  cursor: pointer;
  font-size: 13px;
}
.trigger-btn:hover {
  background: #ecf5ff;
}
</style>
