<template>
  <div>
    <van-calendar v-model:show="show"
                  type="single"
                  color="#2261a1"
                  row-height="40"
                  :min-date="minDate"
                  :show-title="false"
                  :show-confirm="false"
                  :poppable="false"
                  :value="date"
                  :style="{ height: '350px' }"
                  @confirm="onConfirm" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
// import { PropType } from "vue";
import { Calendar, Cell } from "vant";

@Options({
  components: {
    [Calendar.name]: Calendar,
    [Cell.name]: Cell,
  },
  props: {},
  data() {
    return {
      date: "",
      show: true,
      minDate: new Date(1949, 0, 0),
    };
  },
  methods: {
    formatDate(date: Date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    formatDateYMD(date: Date) {
      return `${date.getFullYear} + "-" + ${date.getMonth() + 1} + "-" + ${
        date.getDay
      }`;
    },
    onConfirm(value: Date) {
      this.show = false;
      this.date = this.formatDate(value);
      let date = this.formatDateYMD(value);
      alert(date);
      this.$emit("calendarComponentDate", date);
    },
  },
  mounted() {
    this.onConfirm(new Date());
  },
})
export default class calendarComponent extends Vue {}
</script>



<style  scoped="">
</style>