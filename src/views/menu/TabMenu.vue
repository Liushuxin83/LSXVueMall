<template>
  <div>
    <!-- tab栏区域 -->
    <div class="tab">
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="index == currentIndex ? 'active' : ''"
        @click="tabClick(index)"
      >
        <span>{{ item.name }}</span>
      </div>
    </div>
    <!-- tab栏下方数据 -->
    <div v-for="item in getCurrentData" class="tabData">
			<img :src="item.img">
			<span>{{item.name}}</span>
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
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    getCurrentData() {
      return this.list[this.currentIndex].children;
    },
  },
  methods: {
    //点击tab栏切换
    tabClick(index) {
      this.currentIndex = index;
    },
  },
};
</script>
<style lang="scss" scoped>
.tab {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
.active {
  color: red;
}
.tabData{
	img{
		width: 100px;
	}
}
</style>