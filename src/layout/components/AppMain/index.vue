
<template>
  <div class="app-main">
    <router-view :key="key" />
  </div>
</template>
<script>
export default {
  name: 'AppMain',
  components: {},
  data () {
    return {

    }
  },
  computed: {
    key () {
      return this.$route.path
    }
  },
  watch: {},
  methods: {

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
