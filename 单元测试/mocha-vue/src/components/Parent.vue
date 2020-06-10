<template>
  <div>
    <Child @show="show"></Child>
    <div id="content" v-if="isShow">内容</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Child from '@/components/Child.vue';

@Component({
  components: {
    Child
  },
})
export default class parent extends Vue {
  isShow: boolean = false;

  show () {
    this.isShow = true;
  }
}
</script>