

<template>
  <div class="navbar-container">
    <div class="navbar-setting-container">
      <div class="right-menu">
        <div class="avatar-container right-menu-item hover-effect">
          <div class="avatar-wrapper">
            <img :src="avatar" class="user-avatar" />
            <span class="user-name">{{name}}</span>
          </div>
        </div>
        <div class="notify-container right-menu-item hover-effect">
          <svg-icon icon-class="guide" />
        </div>
        <div class="logout-container right-menu-item hover-effect">
          <svg-icon icon-class="guide" />
        </div>
      </div>
    </div>
    <BreadCrumb class="navbar-breadcrumb-container" />
  </div>
</template>
<script>
import BreadCrumb from './BreadCrumb'
import { mapGetters } from 'vuex'
export default {
  name: 'NavBar',
  components: { BreadCrumb },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'name', 'avatar'
    ])
  },
  watch: {},
  methods: {

  },
  created () {

  },
  mounted () {

  }
}
</script>
<style lang='less' scoped>
@import "~@styles/variables.less";
.navbar-container {
  width: calc(100vw - @sidebar-width);
  position: fixed;
  font-size: 0px;
  top: 0;
  right: 0;
  // bottom: 0;
  // left: 0;
  z-index: 1001;
  .navbar-setting-container {
    height: @navbar-setting-height;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .right-menu {
      float: right;
      height: 100%;
      line-height: @navbar-setting-height;
      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;
        &.hover-effect {
          cursor: pointer;
          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }
      .avatar-container {
        margin-right: 30px;
        .avatar-wrapper {
          display: flex;
          align-items: center;
          .user-avatar {
            margin-right: 20px;
            width: 35px;
            height: 35px;
            border-radius: 17px;
            background-color: red;
          }
          .user-name {
            // flex: 1;
            font-size: 18px;
          }
        }
      }
      .notify-container {
        width: 40px;
      }
      .logout-container {
        width: 80px;
      }
    }
  }
  .navbar-breadcrumb-container {
    height: @navbar-breadcrumb-height;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  }
}
</style>