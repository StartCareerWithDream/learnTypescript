<template>
<div>
  <h1>{{msg}}</h1>
</div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"

@Component
export default class HelloWorld extends Vue {
  msg: string =  'Welcome to Your Vue.js App use Typescript'
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
