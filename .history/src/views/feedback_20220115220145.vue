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
      <van-field v-model="cotent"
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
import { Options, Vue } from "vue-class-component";
import { Cell, Button, Popup, Form, Field, CellGroup } from "vant";
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
      cotent: "",
    };
  },
  methods: {
    goBack() {
      this.$router.push({
        path: "/",
      });
    },
    confirm() {
      axios
        .post("http://127.0.0.1:8081/feedback/insertOne.do", {})
        .then((res) => {
          alert(res.data);
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