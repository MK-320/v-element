<template>
  <Table :data="tableData" :columns="columns" border>
    <template #expand="{ row }">
      <div class="expand-panel">
        <div class="expand-row">
          <span class="expand-item"><em>工号</em><span>{{ row.id }}</span></span>
          <span class="expand-item"><em>姓名</em><span>{{ row.name }}</span></span>
          <span class="expand-item"><em>部门</em><span>{{ row.dept }}</span></span>
          <span class="expand-item"><em>职位</em><span>{{ row.role }}</span></span>
        </div>
        <div class="expand-row">
          <span class="expand-item"><em>城市</em><span>{{ row.city }}</span></span>
          <span class="expand-item"><em>入职日期</em><span>{{ row.date }}</span></span>
          <span class="expand-item full"><em>备注</em><span>该员工入职以来表现良好，按时完成各项工作任务，积极参与团队协作，适合承担核心业务开发工作。</span></span>
        </div>
      </div>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Table from '@/components/Table/Table.vue'

const columns = ref([
  { title: '展开', type: 'expand', expandSlot: 'expand', width: 60 },
  { title: '工号', key: 'id', width: 80 },
  { title: '姓名', key: 'name', width: 100 },
  { title: '部门', key: 'dept', width: 120 },
  { title: '职位', key: 'role', width: 120 },
  { title: '城市', key: 'city', width: 100 },
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
.expand-panel {
  padding: 14px 16px;
  background: #f5f7fa;
}
.expand-row {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.expand-row:last-child {
  margin-bottom: 0;
}
.expand-item {
  display: flex;
  align-items: baseline;
  min-width: 160px;
  margin-right: 32px;
}
.expand-item em {
  font-style: normal;
  color: #909399;
  font-size: 13px;
  width: 56px;
  flex-shrink: 0;
}
.expand-item span {
  color: #303133;
  font-size: 13px;
}
.expand-item.full {
  flex-basis: 100%;
  min-width: 0;
}
</style>
