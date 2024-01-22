<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import VirtualScroller from 'primevue/virtualscroller';

import { onBeforeMount, ref, watch, computed, onMounted } from 'vue';
import _ from 'lodash';
import * as echarts from 'echarts';
import setEchartProp from '@/assets/js/chartOption.js';
import { useRouter } from 'vue-router';
import { deleteTokenInCookies, getTokenInCookies } from '@/utils/cookies.js';
import { useUsersStore } from '@/stores/usersStore.js';


const router = useRouter();
const usersStore = useUsersStore();

const APP_ID = '51809385';
const version = '5.199';

const members = ref([]);
const chartElementRef = ref();
let chart;
const inputNameGroup = ref('dendynn');

const chartOptions = computed(() => {
  let m = members.value.filter((el) => el.sex == 2).length;
  let g = members.value.filter((el) => el.sex == 1).length;

  const { option } = setEchartProp(m,g);
  return option
})
const fetchMembers = _.debounce(async () => {
  await VK.Api.call('groups.getMembers', {
    group_id: inputNameGroup.value,
    v: version,
    language: 'ru',
    fields: 'photo_200_orig,sex,city',
    // count: 200
  }, r => {
      members.value = r.response.items;
      console.log(r.response.items.length)
    })
}, 400)

onBeforeMount(async () => {
  await VK.init({
    apiId: APP_ID
  });
  // await VK.Auth.login();
  fetchMembers();
})
onMounted(async() => {
  chart = echarts.init(chartElementRef.value);
  // chart.setOption(chartOptions.value)
  const vScroller = document.querySelector('.p-virtualscroller-content');
  vScroller.style.display = 'flex';
  vScroller.style.flexWrap = 'wrap';
  vScroller.style.gap = '10px';

  const token = getTokenInCookies();
  const auth = await usersStore.checkUserIsAuth('/auth_me', token);
  if(auth === 401) router.push('/');

})
watch(chartOptions, () => {
  chart.setOption(chartOptions.value)
})
watch(inputNameGroup, () => {
  fetchMembers();
})
const exit = () => {
  deleteTokenInCookies();
  console.log('куки очищены')
  router.push('/');
}

</script>

<template>
  <div class="out-btn">
    <Button class="btn" label="Выйти" severity="warning" @click="exit"/>
  </div>
  <div class="container">
    <form class="form"
	  >
      <span class="p-float-label form__item">
        <InputText
          class="form__input"
          id="name"
          type="text"
          v-model="inputNameGroup"
        />
        <label class="label" for="name">Введите название группы, участников которой хотите посмотреть</label>
      </span>
    </form>
    <VirtualScroller :items="members" :itemSize="50" class="border-1 surface-border border-round mt-20" style="height: 80vh">
      <template v-slot:item="{ item }">
        <div :class="['members__item', {'members__item_girl' : item.sex == 1}]"><img class="members__img" :src="item.photo_200_orig" alt=""></div>
      </template>
    </VirtualScroller>
    <div class="grafic" ref="chartElementRef">
    </div>
  </div>
</template>
<style scoped>
.mt-20 {
  margin-top: 15vh;
}
.out-btn {
  width: 5%;
  position: fixed;
  top: 20px;
  left: 20px;
}
.btn {
  /* width: 100%; */
  padding: 15px;
}
.label {
  font-size: 16px;
  color: magenta
}
.container {
  max-width: 1300px;
  margin: 0 auto;
}
.form__title {
  margin: 20px 0 30px;
  text-align: center;
}
.form__item {
  position: fixed;
  top: 4vh;
  left: 50%;
  transform: translateX(-50%);
  width: 40vw;
}
.form__input {
  padding: 10px;
  width: 100%;
}
.p-float-label label {
  transform: translateY(-50%);
}
.title {
  text-align: center;
  margin-top: auto;
  margin-top: 4vh;
  margin-bottom: 20px;
}
.members {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr) );
  gap: 5px;
  margin-top: 12vh;

}
.members__item {
  border: 3px solid grey;
  width: 200px;
  height: 200px;
}
.members__item_girl {
  border: 3px solid pink;
}
.members__img {
  width: 100%;
  height: 100%;
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
