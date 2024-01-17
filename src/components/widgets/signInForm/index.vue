<script setup>
	import { ref, computed, onBeforeMount } from 'vue';
	import Button from 'primevue/button';
	import InputText from 'primevue/inputtext';
	import Checkbox from 'primevue/checkbox';
	import Toast from 'primevue/toast';
	import { useToast } from 'primevue/usetoast';
	import { useRouter } from "vue-router";

	import { http } from '@/utils/apiService.js';
	import { saveTokenToCookies } from '@/utils/cookies.js';
	const toast = useToast();
	const router = useRouter();

	const inputFormData = ref({
		emailValue: null,
		passwordValue: null
	})
	const submitForm = async () => {
		const resp = await http.post('/auth', {
			email: inputFormData.value.emailValue,
			password: inputFormData.value.passwordValue
		});
		if(resp.data) {
			// console.log(resp)
			// saveTokenToCookies(resp.token);
			toast.add({ severity: 'success', summary: 'Авторизация успешна!', life: 3000 });

			setTimeout(() => {
				router.push('/main');
			},2000)
		} else {
			toast.add({ severity: 'error', summary: 'Такой пользователь не зарегистрирован!', life: 3000 });
		}
	}

</script>
<template>
	<form class="signIn__form"
  	@submit.prevent="submitForm"
	>
		<div class="signIn__form-header">
			<h3 class="signIn__form-header-text">Sign In</h3>
		</div>
		<span class="p-float-label signIn__form-item">
			<InputText
				class="form__input"
				id="name"
				v-model="inputFormData.emailValue"
				type="text"
			/>
    	<label class="label" for="name">Email</label>
  	</span>

		<span class="p-float-label signIn__form-item">
			<InputText
				class="form__input"
				id="name"
				v-model="inputFormData.passwordValue"
				type="text"
			/>
    	<label class="label" for="name">Password</label>
  	</span>

		<span class="p-float-label signIn__form-item signIn__form-button">
			<Toast/>
			<Button class="btn" label="SIGN IN" severity="danger" @click="submitForm" />
  	</span>
		<p class="signIn__form-info">Don't have an account? <router-link :to="{name: 'signup'}"><span>Sign up</span></router-link></p>
	</form>
</template>

<style scoped>
.signIn__form {
	max-width: 410px;
	width: 410px;
	height: 500px;
	background-color: white;
	padding: 20px;
	padding-top: 8rem;
	position: relative;
	border-radius: 10px;
	display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.signIn__form-header {
	position: absolute;
	width: 90%;
	top: -40px;
	height: 146px;
	background-color: #EC407A;
	border-radius: 10px;
	box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(233, 30, 99, 0.4);
	padding-top: 2rem;
}
.signIn__form-header-text {
	text-align: center;
	font-weight: 700;
	color: #FFF;
}
.form__input {
  width: 100%;
  padding: 10px;
}
.p-float-label label {
  transform: translateY(-50%);
}
.signIn__form-item{
	width: 100%;
  position: relative;
  margin-bottom: 30px;
}
.signIn__form-button {
  max-width: inherit;
	margin-top: 30px;
}
.btn {
  width: 100%;
  padding: 15px;
}
.signIn__form-info {
	margin-top: 1rem;
	font-size: 14px;
  color: #7B809A;
  text-align: center;
}
.signIn__form-info span {
  color: #E91E63;
  font-weight: 600;
  cursor: pointer;
}

</style>
