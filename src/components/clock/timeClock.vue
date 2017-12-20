<template>
  <div id="timeClock"> 
    <p class="date">{{ date }} {{ time }}</p> 
</div>
</template>

<script>
import vue from "VUe";

export default {
  name: "timeClock",
  data() {
    return {
      date: "",
      time: "",
      week: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    };
  },
  created() {
    setInterval(this.updateTime, 1000); 
    this.updateTime();
  },
  methods: {
    updateTime: function() {
      var cd = new Date();
      this.time =
         this.zeroPadding(cd.getHours(), 2) +
        ":" +
         this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
         this.zeroPadding(cd.getSeconds(), 2);
      this.date =
         this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
         this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
         this.zeroPadding(cd.getDate(), 2) +
        " " +
        this.week[cd.getDay()];
    },
    zeroPadding: function(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    }
  }
};
</script>