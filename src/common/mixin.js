import BackTop from "../components/BackTop";
//methods中的函数内部的东西不能抽出来
export const backTopMixin = {
    data() {
        return {
            isBackTopShow: false,
        }
    },
    components: {
        BackTop
    },
    methods: {
        //监听backtop的函数
        backTopClick() {
            // console.log(this.$refs.betterScrollRef.scroll);
            this.$refs.betterScrollRef.scroll.scrollTo(0, 0, 500);
        },
    },
}