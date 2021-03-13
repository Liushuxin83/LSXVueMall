<template>
  <div v-if="Object.keys(paramsInfo.length !== 0)">
    <h2 v-if="paramsInfo.rule">{{ paramsInfo.rule.key }}</h2>
    <div v-if="paramsInfo.rule">
      <div v-for="(item, index) in paramsInfo.rule.tables">
        <table>
          <tr v-for="(tr, indey) in item">
            <td v-for="(td, indez) in tr">
              {{ td }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="paramsInfo.info">
      <table>
        <tr v-for="(item, index) in paramsInfo.info.set">
          <td>{{ item.key }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
</style>