<template>
  <div class="head">
    <van-button type="primary"
                round="true"
                size="small"
                @click="goBack"
                :style="{'float':'left'}">返回</van-button>

    <span>反馈意见</span>
  </div>
  <hr>
  <van-form @submit="confirm">
    <van-cell-group inset>
      <van-field v-model="planType"
                 label="计划类型"
                 placeholder="请输入计划类型"
                 colon=true
                 :rules="[{ required: true, message: '请输入计划类型'}]" />
    </van-cell-group>
    <van-button round
                type="primary"
                size="small"
                native-type="submit">确定</van-button>

  </van-form>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Cell, Button, Popup, Form, Field, CellGroup } from "vant";
@Options({
  components: {
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Form.name]: Form,
  },
})
export default class feedBack extends Vue {}
</script>

<style  scoped="">
</style>