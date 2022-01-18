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
  <van-cell-group>
    <van-cell title="版本"
              :value="version"
              :style="{'text-align':'left'}"></van-cell>
    <van-cell title="博客"
              value="https://blog.csdn.net/qq_26730215?spm=1000.2115.3001.5343"
              :style="{'text-align':'left'}"></van-cell>
    <van-cell title="gitee"
              value="https://gitee.com/lzijia/recordPlan"
              :style="{'text-align':'left'}"></van-cell>
    <van-cell title="github"
              value="https://github.com/lzijia/recordPlan"
              :style="{'text-align':'left'}"></van-cell>
  </van-cell-group>
</template>

<script lang="ts">
import axios from "axios";
import { Options, Vue } from "vue-class-component";
import { Button, Cell, CellGroup } from "vant";

@Options({
  components: {
    axios,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  props: {},
  data() {
    return {
      version: "",
    };
  },
  methods: {
    goBack() {
      this.$router.push({
        path: "/",
      });
    },
  },
  mounted() {
    axios.get("./data/version.txt").then((res) => {
      this.version = res.data;
    });
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