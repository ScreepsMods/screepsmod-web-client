<template>
	<div>
		<panContainer class="fillArea" @wheel="wheel">
			<render-engine 
        @load="loaded"
				:users="users" 
				:objects="objects" 
        :terrain="terrain" 
        :gameTime="gameTime" 
        :state="state"
        :speed="1.2"
        :style="{ width: (zoom * 100) + 'px', height: (zoom * 100) + 'px' }"></render-engine>			
		</panContainer>
	</div>
</template>
<script>
	import renderEngine from '~/components/RenderEngine.vue'
	import panContainer from '~/components/PanContainer.vue'
	export default {
    middleware: 'authenticated',
		components: {
			renderEngine,
			panContainer
		},
		props: [],
    asyncData ({ params: { room } }) {
      return { room }
    },
		data () {
			return {
				lastRoom: '',
				users: {},
        cachedObjects: {},
				objects: [],
				// terrain: [],
				gameTime: 0,
				zoom: 6,
				width: 300,
				height: 300,
				es: null,
        hasLoaded: false,
        state: { objects: [], gameTime: 0, users: {} }
			}
		},
		watch: {
			room (val) {
				if(this.hasLoaded && val.match(/^[EW]\d+[NS]\d+$/)) {
					this.setRoom(val)
				}
			}
		},
    created () {
			this.$api.socket.on('room', this.update)
    },
    mounted () {
      console.log('mounted')			
		},
		beforeDestroy () {
      this.$api.socket.unsubscribe(`room:${this.room}`)
			this.$api.socket.removeListener('room', this.update)
		},
    computed: {
      terrain () {
        return this.$store.state.api.terrain
      },
      // objects () {
      //   return this.$store.api.objects 
      // }
    },
    watch: {
      room(room) {
        this.setRoom(room)
      }
    },
		methods: {
      loaded () {
        console.log('loaded')
        this.hasLoaded = true
        this.setRoom(this.room)
      },
			wheel (e) {
				console.log(e.deltaY)
				if(e.deltaY > 0) {
          this.zoom--
        }
        if(e.deltaY < 0) {
          this.zoom++
        }
        this.zoom = Math.min(Math.max(this.zoom, 2), 10)
			},
			async setRoom (room) {
				if (!this.$api.socket.connected) {
					await this.$api.socket.connect()
				}
        await this.$store.dispatch('api/setCurrentRoom', room)
				
        this.users = {}
        this.cachedObjects = {}
        // this.$api.socket.subscribe(`room:${room}`)
			},
			update ({ data: { gameTime, info, objects, users = {}, visual } = {} }) {
        console.log('update', gameTime, info, objects, users, visual)
        // this.gameTime = gameTime
        for (let k in users) {
          this.users[k] = users[k]
        }
        for (const [id,diff] of Object.entries(objects)) {
          const cobj = this.cachedObjects[id] = this.cachedObjects[id] || {}
          if (diff) {
            this.cachedObjects[id] = Object.assign({}, cobj, diff)
          } else {
            delete this.cachedObjects[id]
          }
        }
        this.state = {
          users: this.users,
          objects: Object.entries(this.cachedObjects).map(([,e]) => e),
          gameTime
        }
        // this.objects = Object.entries(this.cachedObjects).map(([,e]) => e)        
        // this.objects = Object.keys(objects).map(k=>objects[k])
				// data.forEach(user => { 
    //       dat[user._id] = user 
    //       Object.defineProperty(user, 'badgeUrl', {
    //         get () {
    //           return `http://swc.screepspl.us:21025/api/user/badge-svg?username=${this.username}`
    //         },
    //         set (v) {

    //         }
    //       })
    //     })
			}
		}
	}
</script>
<style>
	.fillArea {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>