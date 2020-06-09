<template>
  <div>
    <span id="count">{{count}}</span>
    <button @click="increment">+</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Counter extends Vue {
  count: number = 10
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
