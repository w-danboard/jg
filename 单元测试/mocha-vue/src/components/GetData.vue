<template>
  <div>
    {{user}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class GetData extends Vue {
  user: string = 'wl';

  mounted () {
    axios.get('/user').then(res => {
      this.user = res.data.user
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>