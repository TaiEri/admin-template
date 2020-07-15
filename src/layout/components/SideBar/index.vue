

<template>
  <div>
    <Logo />
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :default-active="activeMenu"
        :background-color="variables['sidebar-bgColor']"
        :text-color="variables['sidebar-textColor']"
        :active-text-color="variables['sidebar-activeTextColor']"
      >
        <SidebarItem
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import { constantRoutes } from '@/router'
import variables from '@styles/variables.less'
export default {
  name: 'SideBar',
  components: { Logo, SidebarItem },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ]),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      console.log(path)
      return path
    },
    routes () {
      // console.log(constantRoutes)
      return constantRoutes
    },
    variables () {
      return variables
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
<style lang='less' scoped>
</style>