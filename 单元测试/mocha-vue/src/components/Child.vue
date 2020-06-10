<template>
  <div>
    <span @click="show">点我显示标签</span>
    <button @click="click">click</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component
export default class Child extends Vue {
  @Prop() private fn!: () => any;

  @Emit()
  show () {}

  click () {
    console.log(1111)
  }
}
</script>