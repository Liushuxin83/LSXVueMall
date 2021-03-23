<template>
  <div class="menu">
    <scroll class="menusub">
      <div><van-button type="info" @click="changeData">换一换</van-button></div>
      <!-- <div>{{changeDataList}}</div> -->
      <menu-list :changeDataList="changeDataList" />
      <tab-menu :list="list" />
    </scroll>
  </div>
</template>
<script>
import list from "../../mock/list.json";
import MenuList from "../menu/MenuList";
import TabMenu from "../menu/TabMenu";
import Scroll from "../../components/BetterScroll/Scroll";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Vue from "vue";
import { Button } from "vant";

Vue.use(Button);
export default {
  data() {
    return {
      list,
    };
  },
  components: {
    MenuList,
    TabMenu,
    Scroll,
  },
  mounted() {
    this.getListData();
  },
  computed: {
    ...mapGetters(["changeDataList"]),
  },
  methods: {
    ...mapActions(["getListData"]),
    ...mapMutations(["changeData"]),
  },
};
</script>
<style lang="scss" scoped>
.menu {
  height: 100vh;
  .menusub {
    position: relative;
    height: calc(100% - 50px);
    overflow: hidden;
  }
}
</style>