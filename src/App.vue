<template>
  <div id="app">
    <input type="text" v-model="userInfo.username" @blur="doLoginStatus">
    <input type="text" v-model="userInfo.password">

    <button @click="doLoginAction">登录</button>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginService from './service/LoginService'
import Login from './model/Login';

@Component
export default class App extends Vue{
    userInfo: Login = new Login()
    msg: String = ''

    get getUserName() {
      return this.userInfo.username
    }

    doLoginAction() {
      LoginService.login(this.userInfo).then((res: any)=> {
          console.log(res);
      })
    }

    doLoginStatus() {
      LoginService.status(this.userInfo.username).then((res: any)=> {
          console.log(res);
      })
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
