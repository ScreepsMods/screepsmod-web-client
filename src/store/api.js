import api from '~/assets/api'

export const state = () => ({
  currentRoom: '',
  mapRooms: [],
  objects: [],
  terrain: []
})

export const mutations = {
  SET_MAP_ROOMS (state, rooms) {
    state.mapRooms = rooms
  },
  SET_CURRENT_ROOM (state, { room, terrain }) {
    state.currentRoom = room
    state.terrain = terrain
    state.objects = []
  }
}

export const actions = {
  setMapRooms({ commit, state }, rooms) {
    const unsub = state.mapRooms.filter(mr => !rooms.includes(mr))
    const sub = rooms.filter(r => !state.mapRooms.includes(r))
    unsub.forEach(r => api.socket.unsubscribe(`roomMap2:${r}`))
    sub.forEach(r => api.socket.subscribe(`roomMap2:${r}`))
    commit('SET_MAP_ROOMS', rooms)
  },
  async setCurrentRoom({ commit, state }, room) {
    console.log(state, room)
    if (state.currentRoom) {
      api.socket.unsubscribe(`room:${state.currentRoom}`)
    }
    if (!room) return
    let { terrain: [{ terrain } = {}] = [] } = await api.raw.game.roomTerrain(room)
    const types = ['plain', 'wall', 'swamp', 'wall']
    terrain = terrain.split('').filter(t => t).map((v, i) => ({
      x: i % 50,
      y: Math.floor(i / 50),
      type: types[v]
    }))
    commit('SET_CURRENT_ROOM', { room, terrain })
    api.socket.subscribe(`room:${room}`)
  }
}