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
import qs from "qs";
import { Options, Vue } from "vue-class-component";
import { Cell, Button, Popup, Form, Field, CellGroup, Notify } from "vant";

@Options({
  components: {
    axios,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Form.name]: Form,
    [Notify.name]: Notify,
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
      axios.get("./data/version.txt").then((res) => {
        let data = { appVersion: res.data, content: this.content };
        axios({
          url: "/baseApi/feedback/insertOne",
          method: "post",
          data: qs.stringify(data),
        }).then((res) => {
          if (res.data == "1") {
            Toast("反馈成功");
            this.goBack();
          }
        });
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