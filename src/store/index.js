export const state = () => ({
  authToken: ''
})

export const mutations = {
  SET_TOKEN (state, token) {
    state.authToken = token
  }
}