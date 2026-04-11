<template>
  <Table
    :data="tableData"
    :columns="columns"
    border
    stripe
    :pagination="{ pageSize: 3, currentPage: 1 }"
    :defaultSort="{ prop: 'age', order: 'descending' }"
  >
    <template #status="{ row }">
      <span :class="`tag tag-${row.status}`">{{ statusMap[row.status] }}</span>
    </template>
    <template #action="{ row }">
      <button class="btn-action" @click="handleView(row)">查看</button>
      <button class="btn-action" @click="handleEdit(row)">编辑</button>
      <button class="btn-action btn-danger" @click="handleDelete(row)">删除</button>
    </template>
    <template #expand="{ row }">
      <div class="expand-box">
        <p><strong>详细地址：</strong>{{ row.address }}</p>
        <p><strong>入职时间：</strong>{{ row.date }}</p>
        <p><strong>员工备注：</strong>该员工入职以来表现良好，积极配合工作，按时完成任务，具备良好的团队协作精神。</p>
      </div>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Table from '@/components/Table/Table.vue'

const columns = ref([
  { title: '选择', type: 'selection', width: 50 },
  { title: '序号', type: 'index', width: 60 },
  { title: '展开', type: 'expand', expandSlot: 'expand', width: 60 },
  { title: '工号', key: 'id', width: 80, fixed: 'left' },
  { title: '姓名', key: 'name', width: 100, fixed: 'left', sortable: true },
  { title: '部门', key: 'dept', width: 120 },
  { title: '职位', key: 'role', width: 120 },
  { title: '城市', key: 'city', width: 100 },
  { title: '详细地址', key: 'address', width: 220, ellipsis: true },
  { title: '入职日期', key: 'date', width: 120 },
  { title: '年龄', key: 'age', width: 80, sortable: true, align: 'center' },
  { title: '状态', key: 'status', slot: 'status', width: 100, align: 'center' },
  { title: '操作', key: 'action', slot: 'action', width: 220, fixed: 'right', ellipsis: false }
])

const tableData = ref([
  { id: '1001', name: '张三', dept: '技术部', role: '前端工程师', city: '北京', address: '北京市朝阳区建国路88号SOHO现代城A座1201室', date: '2022-01-15', age: 25, status: 1 },
  { id: '1002', name: '李四', dept: '产品部', role: '产品经理', city: '上海', address: '上海市浦东新区世纪大道100号上海环球金融中心', date: '2021-06-20', age: 30, status: 2 },
  { id: '1003', name: '王五', dept: '设计部', role: 'UI设计师', city: '广州', address: '广州市天河区天河路123号太古汇写字楼', date: '2023-03-10', age: 28, status: 1 },
  { id: '1004', name: '赵六', dept: '市场部', role: '市场专员', city: '深圳', address: '深圳市南山区科技路66号高新产业园', date: '2024-01-05', age: 22, status: 3 },
  { id: '1005', name: '钱七', dept: '运营部', role: '运营总监', city: '杭州', address: '杭州市西湖区文一路88号浙江大学科技园', date: '2020-11-30', age: 35, status: 2 },
  { id: '1006', name: '孙八', dept: '财务部', role: '财务经理', city: '南京', address: '南京市鼓楼区中山北路100号鼓楼医院旁', date: '2022-08-15', age: 27, status: 1 }
])

const statusMap: Record<number, string> = { 1: '正常', 2: '休假中', 3: '离职' }

const handleView = (row: any) => console.log('查看', row)
const handleEdit = (row: any) => console.log('编辑', row)
const handleDelete = (row: any) => console.log('删除', row)
</script>

<style scoped>
.expand-box {
  padding: 12px 16px;
  background: #f5f7fa;
}
.expand-box p {
  margin: 0 0 6px;
  font-size: 13px;
  color: #606266;
}
.expand-box p:last-child { margin-bottom: 0; }
.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}
.tag-1 { background: #f0f9eb; color: #67c23a; }
.tag-2 { background: #fdf6ec; color: #e6a23c; }
.tag-3 { background: #fef0f0; color: #f56c6c; }
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
