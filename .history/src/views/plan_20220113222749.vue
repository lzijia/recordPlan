<template>
  <div>
    <div class="head">
      <van-button type="primary"
                  round="true"
                  size="small"
                  @click="goBack"
                  :style="{'float':'left'}">返回</van-button>
      <van-button type="primary"
                  round="true"
                  size="small"
                  @click="abolish"
                  :style="{'float':'right','display':@displayAbolishButton}">废止该计划</van-button>
      <span>计划</span>
    </div>
    <hr>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field readonly
                   clickable
                   name="planType"
                   v-model="planTypeValue"
                   label="计划类型"
                   placeholder="点击选择计划类型"
                   @click="showPlanType"
                   :rules="[{ required: true, message: '请选择计划类型' }]" />
        <van-popup v-model:show="showPicker"
                   position="center">
          <van-picker show-toolbar
                      :columns="planTypeColumns"
                      @confirm="onConfirm"
                      @cancel="showPicker=false" />
        </van-popup>

        <van-field v-model="planContent"
                   name="planContent"
                   label="计划目的/内容"
                   placeholder="计划目的/内容"
                   rows="5"
                   autosize
                   type="textarea"
                   :rules="[{ required: true, message: '请输入计划目的/内容' }]" />

        <van-field readonly
                   clickable
                   name="datetimeType"
                   v-model="planContentTimeType"
                   label="计划时间类型选择"
                   placeholder="点击选择计划时间类型"
                   @click="showDatetimeType"
                   :rules="[{ required: true, message: '请选择计划时间类型' }]" />

        <van-popup v-model:show="showDatetimeTypePicker">

          <van-picker show-toolbar
                      :columns="datetimeTypeColumns"
                      @confirm="onConfirmDatetimeType"
                      @cancel="showDatetimeTypePicker=false" />

        </van-popup>

        <van-field readonly
                   clickable
                   name="datetime"
                   v-model="planContentTime"
                   label="计划时间选择"
                   placeholder="点击选择计划时间"
                   @click="selectPlanTime"
                   :rules="[{ required: true, message: '请选择计划时间' }]" />

        <van-popup v-model:show="showDatetimePicker"
                   :style="{'width':'90%'}">
          <van-picker :title="datetimePickerTitle"
                      :columns="datetimePickerColumns"
                      @confirm="onConfirmDatetime"
                      @cancel="showDatetimePicker = false" />

        </van-popup>

      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="primary"
                    native-type="submit"
                    :style="{'margin':'0 auto','width':'40%'}">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Form, Field, Cell, Button, CellGroup, Popup, Picker } from "vant";
import axios from "axios";
@Options({
  components: {
    [Cell.name]: Cell,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Form.name]: Form,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    axios,
  },
  props: {},
  data() {
    return {
      displayAbolishButton: false,
      planTypeContent: [],
      planTypeValue: "",
      planTypeColumns: [],
      planTypeColumnsIndex: "",
      showPicker: false,
      planContent: "",
      showDatetimePicker: false,
      showDatetimeTypePicker: false,
      planContentTime: "",
      datetimeTypeColumns: [],
      datetimeTypeColumnsIndex: "",
      datetimeTypeContent: [],
      planContentTimeType: "",
      modIndex: "",
      //: "",
      datetimePickerTitle: "",
      datetimePickerColumns: [],
      year: [],
      month: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      day: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
      hour: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ],
      minute: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "59",
      ],
      //datetimePickerOrder: [],
    };
  },
  methods: {
    goBack() {
      this.$router.push({
        path: "/",
      });
    },
    abolish() {
      let itemKey =
        this.datetimeTypeContent[this.datetimeTypeColumnsIndex].en_name +
        this.modIndex;
      let plan = JSON.parse(localStorage.getItem(itemKey) + "");
      plan.status = "-1";
      localStorage.setItem(itemKey, JSON.stringify(plan));
    },
    onConfirm(value: string, index: number) {
      this.planTypeValue = value;
      this.showPicker = false;
      this.planTypeColumnsIndex = index;
    },
    selectPlanTime() {
      if (this.planContentTimeType) {
        this.showDatetimePicker = true;
      }
    },
    onConfirmDatetime(time: string[]) {
      this.planContentTime = this.getTimeFormat(time);
      this.showDatetimePicker = false;
    },
    showPlanType() {
      if (this.modIndex) {
        this.showPicker = false;
        return;
      }
      this.showPicker = true;
    },
    showDatetimeType() {
      if (this.modIndex) {
        this.showDatetimeTypePicker = false;
        return;
      }
      this.showDatetimeTypePicker = true;
    },
    getTimeFormat(time: string[]) {
      let result = "";
      switch (this.datetimeTypeContent[this.datetimeTypeColumnsIndex].en_name) {
        case "everyDay":
          result = time[0] + ":" + time[1];
          break;
        case "everyMonth":
          result = time[0] + " " + time[1] + ":" + time[2];
          break;
        case "everyYear":
          result = time[0] + "-" + time[1] + " " + time[2] + ":" + time[3];
          break;
        case "datetime":
          result =
            time[0] +
            "-" +
            time[1] +
            "-" +
            time[2] +
            " " +
            time[3] +
            ":" +
            time[4];
          break;
        default:
          result = "";
          break;
      }
      return result;
    },
    onConfirmDatetimeType(value: string, index: number) {
      this.planContentTimeType = value;
      this.showDatetimeTypePicker = false;
      this.datetimeTypeColumnsIndex = index;
      let datetimeType = this.datetimeTypeContent[index].en_name;
      this.datetimePickerTitle = this.getDatetimePickerTitle(datetimeType);
      this.datetimePickerColumns = this.getDatetimePickerColumns(datetimeType);
    },

    getDatetimePickerTitle(type: string) {
      let result = "";
      switch (type) {
        case "everyDay":
          result = "时-分";
          break;
        case "everyMonth":
          result = "日-时-分";
          break;
        case "everyYear":
          result = "月-日-时-分";
          break;
        case "datetime":
          result = "年-月-日-时-分";
          break;
        default:
          result = "";
          break;
      }
      return result;
    },
    getDatetimePickerColumns(type: string) {
      let result: { values: any; defaultIndex: number }[] = [];
      switch (type) {
        case "everyDay":
          result = [
            {
              values: this.hour,
              defaultIndex: 2,
            },
            {
              values: this.minute,
              defaultIndex: 1,
            },
          ];
          break;
        case "everyMonth":
          result = [
            {
              values: this.day,
              defaultIndex: 3,
            },
            {
              values: this.hour,
              defaultIndex: 2,
            },
            {
              values: this.minute,
              defaultIndex: 1,
            },
          ];
          break;
        case "everyYear":
          result = [
            {
              values: this.month,
              defaultIndex: 3,
            },
            {
              values: this.day,
              defaultIndex: 3,
            },
            {
              values: this.hour,
              defaultIndex: 2,
            },
            {
              values: this.minute,
              defaultIndex: 1,
            },
          ];
          break;
        case "datetime":
          result = [
            {
              values: this.year,
              defaultIndex: 4,
            },
            {
              values: this.month,
              defaultIndex: 3,
            },
            {
              values: this.day,
              defaultIndex: 3,
            },
            {
              values: this.hour,
              defaultIndex: 2,
            },
            {
              values: this.minute,
              defaultIndex: 1,
            },
          ];
          break;
        default:
          result = [];
          break;
      }
      return result;
    },

    onSubmit(values: string) {
      let index = 1;
      let haveItem = true;
      while (haveItem) {
        if (this.modIndex) {
          index = this.modIndex;
          break;
        }
        let item = localStorage.getItem(
          this.datetimeTypeContent[this.datetimeTypeColumnsIndex].en_name +
            index
        );
        if (item) {
          index++;
          continue;
        }
        break;
      }

      let valuesObject = JSON.parse(JSON.stringify(values));
      let itemKey =
        this.datetimeTypeContent[this.datetimeTypeColumnsIndex].en_name + index;
      let itemValue =
        '{"datetime":"' +
        valuesObject.datetime +
        '","datetimeType":"' +
        valuesObject.datetimeType +
        '","planType":"' +
        valuesObject.planType +
        '","planContent":"' +
        valuesObject.planContent +
        '","datetimeTypeId":"' +
        (this.datetimeTypeColumnsIndex + 1) +
        '","planTypeId":"' +
        (this.planTypeColumnsIndex + 1) +
        '","status":"1"}';
      localStorage.setItem(itemKey, itemValue);
      this.goBack();
    },
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
              this.planTypeColumns[i] = this.planTypeContent[i].name;
            }
            this.getDatetimeType();
          });
          break;
        }
        if (planTypeContentData == null) {
          this.getDatetimeType();
          break;
        }
        if (planTypeContentData != null) {
          //获取localStorage的计划类型
          this.planTypeColumns[planTypeContentIndex - 1] = JSON.parse(
            planTypeContentData.replace(/\r/g, "\\r").replace(/\n/g, "\\n")
          ).name;
          planTypeContentIndex++;
        }
      }
    },
    getDatetimeType() {
      axios.get("./data/datetimeType.json").then((res) => {
        this.datetimeTypeContent = res.data;
        for (let i = 0; i < this.datetimeTypeContent.length; i++) {
          this.datetimeTypeColumns[i] = this.datetimeTypeContent[i].name;
        }
        if (this.$route.params.itemName) {
          this.displayAbolishButton = true;
          this.getExistPlan();
        }
      });
    },
    getExistPlan() {
      let itemName = this.$route.params.itemName;
      if (itemName) {
        let planContent = JSON.parse(
          (localStorage.getItem(itemName) + "")
            .replace(/\r/g, "\\r")
            .replace(/\n/g, "\\n")
        );
        this.planTypeValue = planContent.planType;
        this.planContent = planContent.planContent;
        this.planContentTime = planContent.datetime;
        this.planTypeColumnsIndex = planContent.planTypeId - 1;
        this.planContentTimeType = planContent.datetimeType;
        this.datetimeTypeColumnsIndex = planContent.datetimeTypeId - 1;
        this.modIndex = this.$route.params.itemIndex;
      }
      this.onConfirmDatetimeType(
        this.planContentTimeType,
        this.datetimeTypeColumnsIndex
      );
    },
  },
  mounted() {
    this.year = [];
    let nowYear = new Date().getFullYear();
    for (let i = 0; i < 60; i++) {
      this.year.push(nowYear + i);
    }

    this.getPlanTypeContent();
  },
})
export default class plan extends Vue {}
</script>

<style  scoped="">
.head {
  height: 30px;
  text-align: center;
}
</style>