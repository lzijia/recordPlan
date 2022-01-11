<template>
  <div>
    <van-button class="addPlanButton"
                type="primary"
                round="true"
                size="small"
                @click="newPlann">新增计划</van-button>

    <van-button class="set"
                type="primary"
                round="true"
                size="small"
                @click="set">设置</van-button>
    <div style="clear:both"></div>

    <ul class="setList"
        :style={display:setListDisplay}>
      <li @click="planType">计划类型</li>
      <!-- <li @click="feedBack">反馈意见</li>
      <li @click="update">更新</li> -->
    </ul>

    <calendarComponent class="calendarComponent"
                       @calendarComponentDate="getCalendarComponentDate" />
    <hr>

    <van-grid :column-num="2"
              gutter="10"
              square
              center
              clickable>

      <van-grid-item v-for="item in planContentListTitle.length"
                     :key="item"
                     :text="this.planContentListTitle[item-1]"
                     @click="planContent(item)"
                     :style="{'white-space':'pre'}" />

    </van-grid>

    <van-popup v-model:show="showCardPicker"
               position="center">

      <van-cell-group inset>
        <van-field readonly
                   clickable
                   name="planType"
                   v-model="planContentObject.planType"
                   label="计划类型" />
        <van-field readonly
                   clickable
                   name="planTime"
                   v-model="planContentObject.planTime"
                   label="计划时间" />
        <van-field readonly
                   clickable
                   name="planContent"
                   v-model="planContentObject.planContent"
                   label="计划目的/内容" />
      </van-cell-group>

    </van-popup>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import calendarComponent from "../components/calendar/calendarComponent.vue";
import { Button, Grid, GridItem, Form, Field, Cell, Popup } from "vant";
import { oppositeDisplay, DisplayEnum } from "../common/enum/displayEnum";

@Options({
  components: {
    calendarComponent,
    [Button.name]: Button,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    oppositeDisplay,
    DisplayEnum,
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Field.name]: Field,
    [Popup.name]: Popup,
  },
  props: {},
  data() {
    return {
      setListDisplay: DisplayEnum.none,
      date: "",
      planContentList: [],
      planContentListTitle: [],
      showCardPicker: false,
      planContentObject: "",
    };
  },
  methods: {
    set() {
      this.setListDisplay = oppositeDisplay(this.setListDisplay);
    },
    newPlann() {
      this.$router.push({
        path: "/newPlan",
      });
    },
    planType() {
      this.$router.push({
        path: "/planType",
      });
    },
    feedBack() {
      this.$router.push({
        path: "/feedBack",
      });
    },
    update() {},

    planContent(index: number) {
      this.showCardPicker = true;
      this.planContentObject = this.planContentList[index];
      this.planContentObject.planTime =
        this.planContentList[index].datetimeType +
        " " +
        this.planContentList[index].datetime;
    },
    getCalendarComponentDate(date: Date) {
      this.date = date;
      //每天
      let isNext = true;
      let index = 0;
      let itemName = "everyDay";
      while (isNext) {
        let item = localStorage.getItem(itemName + (index + 1));
        if (item) {
          this.planContentList[index] = JSON.parse(item);
          this.planContentListTitle[index] =
            this.planContentList[index].planType +
            "\n" +
            this.planContentList[index].datetimeType +
            " " +
            this.planContentList[index].datetime +
            "\n" +
            this.planContentList[index].planContent;
          index++;
          continue;
        }
        break;
      }
    },
  },
})
export default class main extends Vue {}
</script>
<style  scoped="">
.addPlanButton {
  float: left;
  left: 10px;
}
.set {
  float: right;
  right: 10px;
}
.setList {
  position: absolute;
  z-index: 99;
  right: 0;
  color: blue;
  line-height: 25px;
  font-size: 15px;
  background-color: white;
}
.calendarComponent {
  clear: both;
}
</style>