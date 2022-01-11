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
              clickable>

      <van-grid-item v-for="item in planContentListTitle.length"
                     :key="item"
                     :text="this.planContentListTitle[item]"
                     @click="planContent(item)" />

    </van-grid>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import calendarComponent from "../components/calendar/calendarComponent.vue";
import { Button, Grid, GridItem } from "vant";
import { oppositeDisplay, DisplayEnum } from "../common/enum/displayEnum";

@Options({
  components: {
    calendarComponent,
    [Button.name]: Button,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    oppositeDisplay,
    DisplayEnum,
  },
  props: {},
  data() {
    return {
      setListDisplay: DisplayEnum.none,
      date: "",
      planContentList: [],
      planContentListTitle: [],
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

    planContent() {},
    getCalendarComponentDate(date: Date) {
      //每天
      let isNext = true;
      let index = 1;
      let itemName = "everyDay";
      while (isNext) {
        let item = localStorage.getItem(itemName + index);
        if (item) {
          this.planContentList[index] = JSON.parse(item);
          this.planContentListTitle[index] =
            this.planContentList[index].planType +
            "\n" +
            this.planContentList[index].datetimeType +
            "\n" +
            this.planContentList[index].datetime;
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