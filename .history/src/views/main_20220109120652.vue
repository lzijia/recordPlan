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

      <span style="{'white-space':'pre'}">{{cardTitle}}
      </span>

      <van-field clickable
                 name="content"
                 v-model="planDetail.content"
                 label="备注/内容" />

      <div style="margin: 16px;">
        <van-button round
                    block
                    type="primary"
                    @click="completePlan">
          完成
        </van-button>
      </div>
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
    [Button.name]: Button,
  },
  props: {},
  data() {
    return {
      setListDisplay: DisplayEnum.none,
      datetime: "",
      planContentList: [],
      planContentListTitle: [],
      showCardPicker: false,
      //planContentObject: "",
      cardTitle: "",
      cardIndex: "",
      planDetail: "",
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
      this.cardTitle = this.planContentListTitle[index - 1];
      this.cardIndex = index;
      this.showCardPicker = true;
      // this.planContentObject = this.planContentList[index - 1];

      // this.planContentObject.planTime =
      //   this.planContentList[index - 1].datetimeType +
      //   " " +
      //   this.planContentList[index - 1].datetime;
    },
    completePlan() {
      this.planDetail.datetime = this.datetime;
      this.planDetail.itemName = this.planContentList[this.cardIndex].itemName;
      alert(this.planDetail);
    },
    getCalendarComponentDate(datetime: Date) {
      this.datetime = datetime;
      //每天
      let isNext = true;
      let index = 0;
      let itemName = "everyDay";
      while (isNext) {
        let item = localStorage.getItem(itemName + (index + 1));
        if (item) {
          this.planContentList[index] = JSON.parse(item);
          this.planContentList[index].itemName = itemName + (index + 1);
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