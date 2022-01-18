<template>
  <div class="head">
    <van-button type="primary"
                round="true"
                size="small"
                @click="goBack"
                :style="{'float':'left'}">返回</van-button>

    <span>信息</span>
  </div>
  <hr>
  <div style="margin-top:100px">
    <span>https://blog.csdn.net/qq_26730215?spm=1000.2115.3001.5343
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {} from "vant";

@Options({
  components: {},
  props: {},
  data() {
    return {
      content: "",
    };
  },
  methods: {
    goBack() {
      this.$router.push({
        path: "/",
      });
    },
  },
})
export default class feedBack extends Vue {}
</script>
<style  scoped="">
.head {
  height: 30px;
  text-align: center;
}
</style>