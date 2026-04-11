<template>
  <Table :data="tableData" :columns="columns" border>
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
  { title: '工号', key: 'id', width: 80, fixed: 'left' },
  { title: '姓名', key: 'name', width: 100, fixed: 'left' },
  { title: '部门', key: 'dept', width: 120 },
  { title: '职位', key: 'role', width: 120 },
  { title: '省份', key: 'province', width: 100 },
  { title: '城市', key: 'city', width: 100 },
  { title: '详细地址', key: 'address', width: 240 },
  { title: '邮编', key: 'zip', width: 100 },
  { title: '联系电话', key: 'phone', width: 130 },
  { title: '邮箱', key: 'email', width: 220 },
  { title: '入职日期', key: 'date', width: 120 },
  { title: '状态', key: 'status', width: 80 },
  { title: '操作', key: 'action', slot: 'action', width: 160, fixed: 'right', ellipsis: false }
])

const tableData = ref([
  { id: '1001', name: '张三', dept: '技术部', role: '前端工程师', province: '北京市', city: '北京市', address: '朝阳区建国路88号SOHO现代城A座1201室', zip: '100022', phone: '13800138001', email: 'zhangsan@example-company.com', date: '2022-01-15', status: '在职' },
  { id: '1002', name: '李四', dept: '产品部', role: '产品经理', province: '上海市', city: '上海市', address: '浦东新区世纪大道100号环球金融中心B座802室', zip: '200120', phone: '13800138002', email: 'lisi@example-company.com', date: '2021-06-20', status: '在职' },
  { id: '1003', name: '王五', dept: '设计部', role: 'UI设计师', province: '广东省', city: '广州市', address: '天河区天河路123号太古汇写字楼18层', zip: '510620', phone: '13800138003', email: 'wangwu@example-company.com', date: '2023-03-10', status: '在职' },
  { id: '1004', name: '赵六', dept: '市场部', role: '市场专员', province: '浙江省', city: '杭州市', address: '西湖区文一路88号浙江大学科技园', zip: '310012', phone: '13800138004', email: 'zhaoliu@example-company.com', date: '2024-01-05', status: '实习' }
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
.btn-danger:hover {
  color: #f56c6c;
  border-color: #fbc4c4;
  background: #fef0f0;
}
</style>
