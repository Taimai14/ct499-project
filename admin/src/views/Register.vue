<template>
  <h1>Login</h1>
  <form @submit.prevent="register">
    <div>
      <input class="form-control" type="text" v-model="staff.name" placeholder="Enter name"/>
      <input class="form-control" type="password" v-model="staff.password" placeholder="Enter passwrod"/>
      <input class="form-control" type="text" v-model="staff.address" placeholder="Enter address"/>
      <input class="form-control" type="text" v-model="staff.duty" placeholder="Enter duty"/>
      <input class="form-control" type="text" v-model="staff.phone" placeholder="Enter phone"/>

      <button class="btn btn-primary" v-on:click="register">register</button>
      <p>
        <router-link to="/login">
          login
        </router-link>
      </p>
    </div>
  </form>

</template>
<script>
import axios from 'axios';
export default{
  name: 'Register',
  data(){
    return{
      result:{},
      staff:{
        name:'',
        password:'',
        duty:'',
        address:'',
        phone:''
      }
    }
  },
  created(){

  },
  mounted(){

  },
  methods:{
    async register(){
      try{
        await axios.post("http://localhost:3000/api/staffs/auth/staffregister",this.staff)
            alert("register successfully");
      }catch(error){
        alert(error);
      }
    }
  },
}
</script>