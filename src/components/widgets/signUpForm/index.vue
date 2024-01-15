<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Toast from 'primevue/toast';

import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import { useToast } from 'primevue/usetoast';
import { http } from '@/utils/apiService.js';
import { useUsersStore } from '@/stores/usersStore.js';

const usersStore = useUsersStore();

const inputValue = ref({
  nameData: null,
  emailData: null,
  passwordData: null,
  agree: null
})
onBeforeMount(async () => {
  usersStore.getUsers()      
})
const submitForm = async() => {  

  const theResult = await v$.value.$validate();
  const theCheck = await usersStore.checkUsers(inputValue.value.emailData)

  if(!inputValue.value.agree) {
    toast.add({ severity: 'error', summary: 'Подтвердите согласие', life: 3000 })
    return
  }
  if(theResult) {    
    if(!theCheck) {      
      http.post('/register', {
        fullName: inputValue.value.nameData,
        email: inputValue.value.emailData,
        password: inputValue.value.passwordData
      })      
      toast.add({ severity: 'success', summary: 'Регистрация прошла успешно!', life: 3000 })    
    } else toast.add({ severity: 'error', summary: 'Такой пользователь уже зарегистрирован!', life: 3000 })    
  } else {
    toast.add({ severity: 'error', summary: 'Поля не заполнены', life: 3000 })
  }    
}
const rules = computed(() => {
  return {
    nameData: { required: helpers.withMessage(`Поле Name обязательное`, required) },
    emailData: { required: helpers.withMessage(`Поле Email обязательное`, required), email: helpers.withMessage(`Неверный ввод email`, email) },
    passwordData: { required: helpers.withMessage(`Поле Password обязательное`, required) },
    agree: { required }
}
})
const v$ = useVuelidate(rules, inputValue);
const toast = useToast();

</script>
<template>
<form class="form"
  @submit.prevent="submitForm"
>    
  <span class="p-float-label form__item">    
    <InputText 
      class="form__input"
      id="name" 
      v-model="inputValue.nameData"     
      type="text" 
    />
    <label class="label" for="name">Name</label>    
    <span class="form__item-errors"
      v-for="error in v$.nameData.$errors" :key="error.$uid"
    >
      {{ error.$message }}  
    </span>
  </span>
  
  <span class="p-float-label form__item">
    <InputText 
      class="form__input"
      id="Email"    
      v-model="inputValue.emailData"    
      type="Email"
    />
    <label for="Email">Email</label>
    <span class="form__item-errors"
      v-for="error in v$.emailData.$errors" :key="error.$uid"
    >
      {{ error.$message }}  
    </span>
  </span>

  <span class="p-float-label form__item">
    <InputText 
      class="form__input"
      id="Password"
      v-model="inputValue.passwordData"
      type="Password"      
    />     
    <label for="Password">Password</label>
    <span class="form__item-errors"
      v-for="error in v$.passwordData.$errors" :key="error.$uid"
    >
      {{ error.$message }}  
    </span>
  </span>

  <div class="flex align-items-center form__checkbox">
    <Checkbox v-model="inputValue.agree" inputId="agree" :binary="true"/>
    <label for="agree" class="form__checkbox-label"> I agree the <span class="form__checkbox-text">Terms and Conditions</span></label>    
  </div>
  
  <span class="p-float-label form__item form__button">
    <Toast/>
    <Button class="btn" label="SIGN UP" severity="danger" @click="submitForm" />
  </span>  
</form>

</template>
<style scoped>

.form__item-errors {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: red;
  top: 43px;
  font-size: 14px;
}

.form__input {
  width: 100%;
  padding: 10px;
}
.p-float-label label {
  transform: translateY(-50%);
}

.form__item {
  position: relative;
  margin-bottom: 30px;
}
.form__checkbox {
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
}
.form__checkbox-label {
  margin-bottom: 3px;
}
.form__checkbox-text {
  font-weight: 700;
  color: #344767;
}
.form__button {
  max-width: inherit;
}
.btn {
  width: 100%;
  padding: 15px;
}

</style>
