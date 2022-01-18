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
      <li @click="feedBack">反馈</li>
      <li @click="update">信息</li>
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
                     :text="planContentListTitle[item-1]"
                     @click="planContent(item)"
                     :style="{'display':planContentListDisplay[item-1],'color':'blue'}" />

    </van-grid>

    <van-popup v-model:show="showCardPopup"
               :style="{'width':'90%'}">

      <van-button class="modPlanButton"
                  round
                  block
                  type="primary"
                  size="primary"
                  @click="modPlan">
        修改计划
      </van-button>

      <div :style="{'white-space':'pre'}">{{cardTitle}}
      </div>
      <hr>

      <van-field clickable
                 name="content"
                 v-model="planDetail.content"
                 autosize
                 rows="5"
                 type="textarea"
                 placeholder="备注/内容"
                 label="备注/内容" />

      <van-button class="completePlanButton"
                  round
                  block
                  type="primary"
                  @click="completePlan">
        完成
      </van-button>

    </van-popup>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import calendarComponent from "../components/calendar/calendarComponent.vue";
import { Button, Grid, GridItem, Form, Field, Cell, Popup } from "vant";
import { oppositeDisplay, DisplayEnum } from "../common/enum/displayEnum";
import Push from "push.js";
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
      showCardPopup: false,
      cardTitle: "",
      cardIndex: "",
      planDetail: {},
      planContentListDisplay: [],
      timer: [],
    };
  },
  methods: {
    set() {
      this.setListDisplay = oppositeDisplay(this.setListDisplay);
    },
    newPlann() {
      this.$router.push({
        path: "/plan",
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
    update() {
      this.$router.push({
        path: "/update",
      });
    },

    planContent(index: number) {
      this.cardTitle = this.planContentListTitle[index - 1];
      this.cardIndex = index;
      this.planDetail.content = "";
      let item = localStorage.getItem(
        this.planContentList[this.cardIndex - 1].itemName +
          "-date-" +
          this.datetime
      );
      if (item) {
        let planDetail = JSON.parse(
          item.replace(/\r/g, "\\r").replace(/\n/g, "\\n")
        );
        this.planDetail.content = planDetail.content;
      }

      this.showCardPopup = true;
    },
    modPlan() {
      this.$router.push({
        name: "plan",
        params: {
          itemName: this.planContentList[this.cardIndex - 1].itemName,
          itemIndex: this.planContentList[this.cardIndex - 1].itemIndex,
        },
      });
    },
    completePlan() {
      this.planDetail.datetime = this.datetime;
      this.planDetail.itemName =
        this.planContentList[this.cardIndex - 1].itemName;
      this.planDetail.status = "1";
      localStorage.setItem(
        this.planDetail.itemName + "-date-" + this.datetime,
        JSON.stringify(this.planDetail)
      );
      this.showCardPopup = false;
    },
    getCalendarComponentDate(datetime: string) {
      this.planContentListTitle = [];
      this.planContentList = [];
      this.datetime = datetime;
      let dateSplit = this.datetime.split("-");
      //每天
      let isNext = true;
      let index = 0;
      let itemName = "everyDay";
      while (isNext) {
        let item = localStorage.getItem(itemName + (index + 1));
        if (item) {
          this.planContentList[index] = JSON.parse(
            item.replace(/\r/g, "\\r").replace(/\n/g, "\\n")
          );
          if (this.planContentList[index].status == "-1") {
            this.planContentListDisplay[index] = "none";
            index++;
            continue;
          }
          this.planContentList[index].itemName = itemName + (index + 1);
          this.planContentList[index].itemIndex = index + 1;
          this.planContentListDisplay[index] = "block";
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
      //每月
      itemName = "everyMonth";
      let emIndex = 0;
      while (isNext) {
        let item = localStorage.getItem(itemName + (emIndex + 1));
        if (item) {
          let itemObject = JSON.parse(
            item.replace(/\r/g, "\\r").replace(/\n/g, "\\n")
          );
          let day = itemObject.datetime.substr(0, 2);
          if (dateSplit[2].length < 2) {
            dateSplit[2] = "0" + dateSplit[2];
          }
          if (day == dateSplit[2]) {
            this.planContentList[index] = JSON.parse(
              item.replace(/\r/g, "\\r").replace(/\n/g, "\\n")
            );
            if (this.planContentList[index].status == "-1") {
              this.planContentListDisplay[index] = "none";
              index++;
              continue;
            }
            this.planContentList[index].itemName = itemName + (emIndex + 1);
            this.planContentList[index].itemIndex = emIndex + 1;
            this.planContentListDisplay[index] = "block";
            this.planContentListTitle[index] =
              this.planContentList[index].planType +
              "\n" +
              this.planContentList[index].datetimeType +
              " " +
              this.planContentList[index].datetime +
              "\n" +
              this.planContentList[index].planContent;
            index++;
          }
          emIndex++;
          continue;
        }
        break;
      }
      //每年
      itemName = "everyYear";
      emIndex = 0;
      while (isNext) {
        let item = localStorage.getItem(itemName + (emIndex + 1));
        if (item) {
          let itemObject = JSON.parse(
            item.replace(/\r/g, "\\r").replace(/\n/g, "\\n")
          );
          let monthDay = itemObject.datetime.substr(0, 5);
          if (dateSplit[1].length < 2) {
            dateSplit[1] = "0" + dateSplit[1];
          }
          if (dateSplit[2].length < 2) {
            dateSplit[2] = "0" + dateSplit[2];
          }
          if (monthDay == dateSplit[1] + "-" + dateSplit[2]) {
            this.planContentList[index] = JSON.parse(
              item.replace(/\r/g, "\\r").replace(/\n/g, "\\n")
            );
            if (this.planContentList[index].status == "-1") {
              this.planContentListDisplay[index] = "none";
              index++;
              continue;
            }
            this.planContentList[index].itemName = itemName + (emIndex + 1);
            this.planContentList[index].itemIndex = emIndex + 1;
            this.planContentListDisplay[index] = "block";
            this.planContentListTitle[index] =
              this.planContentList[index].planType +
              "\n" +
              this.planContentList[index].datetimeType +
              " " +
              this.planContentList[index].datetime +
              "\n" +
              this.planContentList[index].planContent;
            index++;
          }
          emIndex++;
          continue;
        }
        break;
      }
      //某个时间点
      itemName = "datetime";
      emIndex = 0;
      while (isNext) {
        let item = localStorage.getItem(itemName + (emIndex + 1));
        if (item) {
          let itemObject = JSON.parse(
            item.replace(/\r/g, "\\r").replace(/\n/g, "\\n")
          );
          let yearMonthDay = itemObject.datetime.substr(0, 10);
          if (dateSplit[1].length < 2) {
            dateSplit[1] = "0" + dateSplit[1];
          }
          if (dateSplit[2].length < 2) {
            dateSplit[2] = "0" + dateSplit[2];
          }
          if (
            yearMonthDay ==
            dateSplit[0] + "-" + dateSplit[1] + "-" + dateSplit[2]
          ) {
            this.planContentList[index] = JSON.parse(
              item.replace(/\r/g, "\\r").replace(/\n/g, "\\n")
            );
            if (this.planContentList[index].status == "-1") {
              this.planContentListDisplay[index] = "none";
              index++;
              continue;
            }
            this.planContentList[index].itemName = itemName + (emIndex + 1);
            this.planContentList[index].itemIndex = emIndex + 1;
            this.planContentListDisplay[index] = "block";
            this.planContentListTitle[index] =
              this.planContentList[index].planType +
              "\n" +
              this.planContentList[index].datetimeType +
              " " +
              this.planContentList[index].datetime +
              "\n" +
              this.planContentList[index].planContent;
            index++;
          }
          emIndex++;
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
.modPlanButton {
  width: 30%;
}
.planContentPopup {
  width: 90%;
}
.completePlanButton {
  width: 40%;
  margin: 0 auto;
}
</style>