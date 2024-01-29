<script setup>
	import SignInForm from '@/components/widgets/signInForm/index.vue'
</script>
<template>
	<div class="signIn">
		<span class="mask bg-gradient-dark"></span>
			<SignInForm />
	</div>
</template>

<style scoped>
.signIn {
	background-image: url('@/assets/images/photo-bg.jpg');
	height: 100vh;
	background-repeat: no-repeat;
	background-position: center;
  background-size: cover;
	display: flex;
	justify-content: center;
	align-items: center;
  padding: 0 20px;
}
.mask {
  position: absolute;
  background-size: cover;
  background-position: center center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}
.bg-gradient-dark {
  background-image: linear-gradient(195deg, #42424a 0%, #191919 100%);
	opacity: 0.2;
}

</style>
