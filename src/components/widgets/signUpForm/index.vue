<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';

const inputValue = ref({
  nameData: null,
  emailData: null,
  passwordData: null,
  agree: true
})

</script>
<template>

<form class="form">  
  <span class="p-float-label form__item">    
    <InputText 
      class="form__input"
      id="name" 
      v-model="inputValue.nameData"      
    />
    <label class="label" for="name">Name</label>
  </span>

  <span class="p-float-label form__item">
    <InputText 
      class="form__input"
      id="Email"    
      v-model="inputValue.emailData"    
      type="Email"
    />
    <label for="Email">Email</label>
  </span>

  <span class="p-float-label form__item">
    <InputText 
      class="form__input"
      id="Password"
      v-model="inputValue.passwordData"
      type="Password"      
    />
     
    <label for="Password">Password</label>
  </span>

  <div class="flex align-items-center form__checkbox">
    <Checkbox v-model="inputValue.agree" inputId="agree" :binary="true"/>
    <label for="agree" class="form__checkbox-label"> I agree the <span class="form__checkbox-text">Terms and Conditions</span></label>
  </div>
  
  <span class="p-float-label form__item form__button">
    <Button class="btn" label="SIGN UP" severity="danger" />
  </span>  
</form>


</template>
<style scoped>
.form__input {
  width: 100%;
  padding: 10px;
}
.p-float-label label {
  transform: translateY(-50%);
}

.form__item {
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
