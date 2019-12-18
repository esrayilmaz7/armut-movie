<template>
  <div class="progress-bar">
    <md-progress-bar
      md-mode="determinate"
      :md-value="amount"
      id="progress"
    ></md-progress-bar>
  </div>
</template>

<script>
export default {
  name: "progress-bar",
  props: ["amount"]
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables.scss";
#progress {
  background-color: $color-progressbar-background !important;
  --md-theme-default-primary: #ff6000 !important;
}
.progress-bar {
  border-radius: 3px;
}
</style>
