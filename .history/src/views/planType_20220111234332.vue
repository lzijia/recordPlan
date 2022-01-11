<template>
  <div>
    <div class="head">
      <van-button type="primary"
                  round="true"
                  size="small"
                  @click="goBack"
                  :style="{'float':'left'}">返回</van-button>

      <span>计划类型</span>
    </div>
    <hr>
    <van-button class="addButton"
                type="primary"
                round="true"
                size="small"
                @click="add"
                :style="{'float':'left'}">新增</van-button>

    <van-list v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="getPlanTypeContent">
      <van-cell v-for="item in planTypeContent"
                :key="item.id"
                :title="item.name"
                :style="{'text-align':'left'}">

        <van-button class="modButton"
                    type="primary"
                    round="true"
                    size="small"
                    @click="mod(item.id)">编辑</van-button>
      </van-cell>
    </van-list>

    <van-popup v-model:show="showPlanTypeOne"
               :style="{'width':'90%'}">
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
    </van-popup>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Options, Vue } from "vue-class-component";
import { List, Cell, Button, Popup, Form, Field, CellGroup } from "vant";

@Options({
  components: {
    axios,
    [List.name]: List,
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
      planTypeContent: [],
      loading: false,
      finished: false,
      showPlanTypeOne: false,
      planType: "",
      planTypeContentId: "",
    };
  },
  methods: {
    //获取本地计划类型
    getPlanTypeContent() {
      let isPlanTypeContent = true;
      let planTypeContentIndex = 1;
      while (isPlanTypeContent) {
        let planTypeContentData = localStorage.getItem(
          "planTypeContent" + planTypeContentIndex
        );
        if (planTypeContentIndex == 1 && planTypeContentData == null) {
          //获取默认的计划类型
          axios.get("./data/planTypeContent.json").then((res) => {
            this.planTypeContent = res.data;
            //存入localStorage
            for (let i = 0; i < this.planTypeContent.length; i++) {
              localStorage.setItem(
                "planTypeContent" + (i + 1),
                JSON.stringify(this.planTypeContent[i])
              );
            }
          });
          isPlanTypeContent = false;
          break;
        }
        if (planTypeContentData == null) {
          isPlanTypeContent = false;
          break;
        }
        if (planTypeContentData != null) {
          //获取localStorage的计划类型
          this.planTypeContent[planTypeContentIndex - 1] = JSON.parse(
            planTypeContentData.replace(/\r/g, "\\r").replace(/\n/g, "\\n")
          );
          planTypeContentIndex++;
        }
      }
      this.loading = false;
      this.finished = true;
    },
    goBack() {
      this.$router.push({
        path: "/",
      });
    },
    add() {
      this.showPlanTypeOne = true;
      this.planType = "";
      this.planTypeContentId = "";
    },
    mod(id: number) {
      this.showPlanTypeOne = true;
      this.planType = this.planTypeContent[id - 1].name;
      this.planTypeContentId = id;
    },
    confirm() {
      let id = this.planTypeContentId;
      if (this.planTypeContentId == "") {
        id = this.planTypeContent.length + 1;
      }
      let planTypeContent =
        '{"id":"' + id + '","name":"' + this.planType + '","status":"1"}';

      localStorage.setItem("planTypeContent" + id, planTypeContent);

      this.planTypeContent[id - 1] = JSON.parse(
        planTypeContent.replace(/\r/g, "\\r").replace(/\n/g, "\\n")
      );
      this.showPlanTypeOne = false;
    },
  },
  mounted() {},
})
export default class planType extends Vue {}
</script>

<style  scoped="">
.head {
  height: 30px;
  text-align: center;
}
</style>