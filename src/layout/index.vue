<template>
  <div class="app-wrapper">
    <SideBar class="sidebar-container" />
    <div class="main-container">
      <NavBar />
      <AppMain />
    </div>
  </div>
</template>
<script>
import { AppMain, NavBar, SideBar } from './components'
export default {
  components: { AppMain, NavBar, SideBar },
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {

  },
  created () {

  },
  mounted () {

  }
}
</script>