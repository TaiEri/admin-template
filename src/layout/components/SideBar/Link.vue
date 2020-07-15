

<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>
<script>
export default {
  components: {},
  props: {
    to: {
      type: String,
      required: true
    }
  },
  data () {
    return {

    }
  },
  computed: {
    type() {
      return 'router-link'
    }
  },
  watch: {},
  methods: {
    linkProps(to) {
      return {
        to: to
      }
    }
  },
  created () {

  },
  mounted () {

  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { }
}
</script>
<style lang='less' scoped>
</style>