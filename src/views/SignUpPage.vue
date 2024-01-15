<script setup>
import SignUpForm from '@/components/widgets/signUpForm/index.vue'

</script>
<template>
  <section class="signup">
    <div class="signup__block">
      <div class="signup__block-img">        
      </div>
      <div class="signup__block-form">
        <h4 class="signup__block-form-title">Sign Up</h4>
        <p class="signup__block-form-sub-title">Enter your email and password to register</p>
        <SignUpForm />        
        <p class="signup__block-form-info">Already have an account? <router-link to="/"><span>Sign in</span></router-link></p>
      </div>
    </div>
    
  </section>
</template>
<style scoped>
.signup__block {
  display: grid;
  grid-template-columns: 1fr 1fr;  
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.signup__block-img { 
  height: calc(100vh - 20px);
  background-image: url('@/assets/images/illustration-signup.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
.signup__block-form {
  width: 24vw;  
  margin-left: 10rem;
  }

.signup__block-form-title {
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.375;
  margin-bottom: 10px;
}
.signup__block-form-sub-title {
  margin-bottom: 50px;
  line-height: 1.625;
  font-weight: 300;
  color: #7B809A;
}
.signup__block-form-info {
  font-size: 14px;
  color: #7B809A;
  text-align: center;
}
.signup__block-form-info span {
  color: #E91E63;
  font-weight: 600;
  cursor: pointer;
}

@media screen and (max-width: 1003px) {
  .signup__block-img {
    display: none;
  }
  .signup__block {    
    grid-template-columns: 1fr;
    height: 100vh;
    justify-content: center;
    align-content: center;
    margin: 0;
  }
  .signup__block-form {
    width: 60vw;  
    text-align: center;
    margin: auto;
  }
}
@media screen and (max-width: 768px) {
  .signup__block-form {
    width: 80vw;      
  }
  
}
</style>