<script setup>
import { onBeforeMount, ref, watch, computed, onMounted } from 'vue';
import _ from 'lodash';
import * as echarts from 'echarts';
import setEchartProp from '@/assets/js/chartOption.js';

const APP_ID = '51809385';
const version = '5.199';

const members = ref([]);
const chartElementRef = ref();
let chart;

const chartOptions = computed(() => {
  let m = members.value.filter((el) => el.sex == 2).length;
  let g = members.value.filter((el) => el.sex == 1).length;
  
  const { option } = setEchartProp(m,g);  
  return option
})
const fetchMembers = _.debounce(async () => {
  await VK.Api.call('groups.getMembers', {
    group_id: 'dendynn',
    v: version,
    language: 'ru',
    fields: 'photo_200_orig,sex,city',
    count: 200
  }, r => {
      members.value = r.response.items;      
    })
}, 300)

onBeforeMount(async () => {
  await VK.init({
    apiId: APP_ID
  });
  // await VK.Auth.login();
  fetchMembers();
})
onMounted(() => {    
  chart = echarts.init(chartElementRef.value);
  // chart.setOption(chartOptions.value)
})
watch(chartOptions, () => {
  chart.setOption(chartOptions.value)  
})

</script>

<template>
  <div class="container">
    <h1 class="title">Участники группы Dendy</h1>
    <div class="members">
      <div v-for="item in members" :key="item.id" :class="['members__item', {'members__item_girl' : item.sex == 1}]" >
        <img :src="item.photo_200_orig" alt="">
      </div>
    </div>
    <div class="grafic" ref="chartElementRef">
    </div>
  </div>
</template>
<style scoped>
.container {
  max-width: 1300px;
  margin: 0 auto;
}
.title {
  text-align: center;
  margin-top: auto;
  margin-top: 10vh;
  margin-bottom: 20px;
}
.members {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr) );
  gap: 5px;
  
}
.members__item {
  border: 3px solid grey;
}
.members__item_girl {
  border: 3px solid pink;
}
.members__item img{
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.grafic {
  position: fixed !important;
  right: 0;
  top: 0;
  z-index: 2;
  width: 300px;
  height: 300px;
  background-color: yellow;
}
</style>
