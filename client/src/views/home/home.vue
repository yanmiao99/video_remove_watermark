<template>
  <div class="home">
    <!-- <BaseECharts :options="options" :height="echartsHeight" /> -->
    还没想好~
  </div>
</template>

<script setup >
import BaseECharts from "@/components/baseCharts/baseCharts.vue";
//设置图表高度
const echartsHeight = '500px'
//图表自定义配置
const options = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
};


</script>

<style scoped lang="scss"></style>
