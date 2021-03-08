<template>
  <div class="tab-control">
    <div
      v-for="(v, i) in titles"
      class="tab-control-item"
      :class="{ active: i == currentIndex }"
			@click="tabclick(i)"
    >
      <span> {{ v }}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
	methods: {
		tabclick(i){
			this.currentIndex = i;
		},
	},
};
</script>
<style lang="scss" scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
	span{
		padding: 5px;
	}
}
.active {
  color: lightcoral;
  span {
    border-bottom: 3px solid lightcoral;
  }
}
</style>