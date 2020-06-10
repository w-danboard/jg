<template>
  <div id="app">
    <HelloWorld msg="Welcome"/>
    <Counter></Counter>
    <Parent></Parent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import Counter from './components/Counter.vue';

import Parent from './components/Parent.vue';

@Component({
  components: {
    HelloWorld,
    Counter,
    Parent
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
