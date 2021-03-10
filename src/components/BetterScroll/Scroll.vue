<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      //做下拉加载更多
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // setTimeout(this._initBscroll, 200);
    this._initBscroll();
  },
  methods: {
    _initBscroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,//监听实时滚动位置
				pullUpLoad:this.pullUpLoad,//做下拉加载更多
        // 滚动条  需要给所操作列表加上 position: relative;（对文档流不影响）,这样滚动条就完美了，不会滚到外面去
        // mouseWheel: true, //开启鼠标滚轮
        // disableMouse: true, //启用鼠标拖动
        disableTouch: false, //启用手指触摸
        click: true,
        scrollbar: {
          fade: true,
        },
      });
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("scrollPosition", position);
      });
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
					//监听滚动到底部
					// console.log(1111);
					this.$emit('pullingUp')
				});
      }
      // better-scroll决定有多少区域可以滚动时，是根据scrollerHeight属性决定的，scrollerHeight属性是根据放在better-scroll的content元素中的子组件的高度决定的，但是首页中，better-scroll在计算scrollerHeight属性时，是没有将图片计算在内的，所以计算出来的高度是错误的，后来图片加载进来之后，有了新的高度，但是scrollerHeight属性并未更新，所以滚动会出现问题，
      // 如何解决这个问题：监听每一张图片是否加载完成，只要有一张图片加载完了就执行一次 refresh()，refresh()可以重新计算高度
      // this.scroll.refresh();
    },
    refresh() {
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
}
</style>