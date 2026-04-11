<template>
  <Table :data="tableData" :columns="columns" border>
    <template #action="{ row }">
      <button @click="handleEdit(row)">编辑</button>
      <button @click="handleDelete(row)">删除</button>
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
  { title: '邮箱', key: 'email', width: 220 },
  { title: '公司地址', key: 'address', width: 260 },
  { title: '操作', key: 'action', slot: 'action', width: 160, ellipsis: false }
])

const tableData = ref([
  { id: '1001', name: '张三', dept: '技术部', role: '前端工程师', email: 'zhangsan.developer@example-company.com', address: '北京市朝阳区建国路88号SOHO现代城A座1201室' },
  { id: '1002', name: '李四', dept: '产品部', role: '产品经理', email: 'lisi.product@example-company.com', address: '上海市浦东新区世纪大道100号上海环球金融中心B座802室' },
  { id: '1003', name: '王五', dept: '设计部', role: 'UI设计师', email: 'wangwu.design@example-company.com', address: '广州市天河区天河路123号太古汇写字楼18层' },
  { id: '1004', name: '赵六', dept: '市场部', role: '市场专员', email: 'zhaoliu.marketing@example-company.com', address: '深圳市南山区科技路66号高新产业园3号楼5层' }
])

const handleEdit = (row: any) => console.log('编辑', row)
const handleDelete = (row: any) => console.log('删除', row)
</script>

<style scoped>
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
</style>
