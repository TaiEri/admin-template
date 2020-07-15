
const getters = {
  roles: state => state.user.roles,
  token: state => state.user.token,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  permission_routes: state => state.routerPermissions.routes
}
export default getters