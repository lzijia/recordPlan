<template>
  <div class="head">
    <van-button type="primary"
                round="true"
                size="small"
                @click="goBack"
                :style="{'float':'left'}">返回</van-button>

    <span>反馈</span>
  </div>
  <hr>
  <van-form @submit="confirm">
    <van-cell-group inset>
      <van-field v-model="content"
                 label="反馈内容"
                 rows="10"
                 type="textarea"
                 placeholder="请输入反馈内容"
                 colon=true
                 :rules="[{ required: true, message: '请输入反馈内容'}]" />
    </van-cell-group>
    <van-button round
                type="primary"
                size="normal"
                native-type="submit">确定</van-button>

  </van-form>
</template>

<script lang="ts">
import axios from "axios";
import { Options, Vue } from "vue";
import { Cell, Button, Popup, Form, Field, CellGroup } from "vant";

//设置axios为form-data
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.transformRequest = [
  function (data) {
    let ret = "";
    for (let it in data) {
      ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
    }
    return ret;
  },
];
//然后再修改原型链
Vue.prototype.$axios = axios;

@Options({
  components: {
    axios,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Form.name]: Form,
  },
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
    confirm() {
      axios({
        url: "/baseApi/feedback/insertOne",
        method: "post",
        data: { appVersion: "aa", content: this.content },
      })
        .then((res) => {
          console.log(res, "res");
        })
        .catch((res1) => {
          console.log(res1, "res1");
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