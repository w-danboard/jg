<template>
  <div>
    <span @click="show">点我显示标签</span>
    <button @click="clickMe">click</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component
export default class Child extends Vue {
  @Prop() private fn!: (str: string) => any;

  @Emit()
  show () {}

  clickMe () {
    this.fn('测试啊')
  }
}
</script>