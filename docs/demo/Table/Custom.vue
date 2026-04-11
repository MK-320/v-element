<template>
  <Table :data="tableData" :columns="columns" border>
    <template #status="{ row }">
      <span :class="row.status === '在职' ? 'tag-success' : 'tag-warning'">
        {{ row.status }}
      </span>
    </template>
    <template #action="{ row }">
      <button class="btn-action" @click="handleEdit(row)">编辑</button>
      <button class="btn-action btn-danger" @click="handleDelete(row)">删除</button>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Table from '@/components/Table/Table.vue'

const columns = ref([
  { title: '工号', key: 'id', width: 80 },
  { title: '姓名', key: 'name', width: 100 },
  { title: '部门', key: 'dept', width: 120 },
  { title: '职位', key: 'role', width: 120 },
  { title: '城市', key: 'city', width: 100 },
  { title: '入职日期', key: 'date', width: 120 },
  { title: '状态', key: 'status', slot: 'status', width: 90, align: 'center' },
  { title: '操作', key: 'action', slot: 'action', width: 160, ellipsis: false }
])

const tableData = ref([
  { id: '1001', name: '张三', dept: '技术部', role: '前端工程师', city: '北京', date: '2022-01-15', status: '在职' },
  { id: '1002', name: '李四', dept: '产品部', role: '产品经理', city: '上海', date: '2021-06-20', status: '在职' },
  { id: '1003', name: '王五', dept: '设计部', role: 'UI设计师', city: '广州', date: '2023-03-10', status: '在职' },
  { id: '1004', name: '赵六', dept: '市场部', role: '市场专员', city: '深圳', date: '2024-01-05', status: '实习' }
])

const handleEdit = (row: any) => console.log('编辑', row)
const handleDelete = (row: any) => console.log('删除', row)
</script>

<style scoped>
.tag-success {
  display: inline-block;
  padding: 2px 8px;
  background: #f0f9eb;
  color: #67c23a;
  border-radius: 4px;
  font-size: 12px;
}
.tag-warning {
  display: inline-block;
  padding: 2px 8px;
  background: #fdf6ec;
  color: #e6a23c;
  border-radius: 4px;
  font-size: 12px;
}
button {
  padding: 4px 10px;
  margin-right: 4px;
  border: 1px solid #dcdfe6;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: #606266;
}
button:last-child { margin-right: 0; }
button:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background: #ecf5ff;
}
.btn-danger:hover {
  color: #f56c6c;
  border-color: #fbc4c4;
  background: #fef0f0;
}
</style>
