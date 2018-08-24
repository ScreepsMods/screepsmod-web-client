<template>
	<div class="renderEngineContainer"></div>
</template>
<script>
import GameRenderer from '@screeps/renderer'
import worldConfigs from '~/assets/worldConfigs'
import { resourceMap, rescaleResources } from '~/assets/resourceMap'

export default {
	props: ['terrain','objects','users','gameTime','speed','state'],
	data() {
		return {
			started: false,
			renderer: null,
			lastTick: 0,
			view: null,
      baseZoomLevel: 1,
		}
	},
	computed: {
    metrics() {
      return this.renderer.metrics
    },
		secondsPerTick(){
			return this.speed || 1
		}
	},
	watch: {
    state (state) {
      if (this.renderer) {
        this.renderer.applyState(state, Math.max(this.speed, 0.1))
      }
    },
		terrain (terrain) {
			if (this.renderer && terrain) {
				this.renderer.setTerrain(terrain)
			}
		},
		objects (objects) {
			if (this.renderer) {
				this.applyState()
			}
		},
		users (users) {
			if (this.renderer) {
				this.applyState()
			}
		},
		gameTime (gameTime) {
			if (this.renderer) {
				this.applyState()
			}
		}
	},
	mounted() {
	  this.attachView();
  	// this.eventBus.$on('resize', this.resizeView);
  	window.addEventListener('resize', () => this.resizeView());

	},
  updated() {
  	
  },
  beforeDestroy() {
    // this.eventBus.$off('resize', this.resizeView);
    window.removeEventListener('resize', () => this.resizeView());
    if (this.renderer) {
    	this.renderer.release()
    }
  },
  methods: {
  	attachView() {
  		this.createRenderer();
	  	this.resizeView();
  	},
  	resizeView() {
  		if (this.renderer) {
  			console.log(this.$el.offsetWidth, this.$el.offsetHeight)
	  		this.renderer.resize({ width: this.$el.offsetWidth, height: this.$el.offsetHeight });
        // this.renderer.resize()
	  	}
  	},
    applyState () {
    	if(this.gameTime === this.lastTick) return
      if (!this.terrain) return
    	this.lastTick = this.gameTime
      let dur = Math.max(this.secondsPerTick, .1)
      if (this.started && this.renderer) {
        setTimeout(() => {
          this.renderer.applyState({
            objects: this.objects || [],
            users: this.users || {},
            gameTime: this.gameTime || 0
          }, dur)
        },1)
      }
    },
		async createRenderer() {
      const view = this.$el
      worldConfigs.gameData.player = this.$api.user._id
      GameRenderer.compileMetadata(worldConfigs.metadata)
      this.renderer = new GameRenderer({
        size: {
          width: view.offsetWidth,
          height: view.offsetHeight
        },
        autoFocus: false,
        resourceMap,
        rescaleResources,
        worldConfigs,
        onGameLoop: function() {},
        countMetrics: true,
        fitToWorld: {
          width: 50,
          height: 50
        },
        useDefaultLogger: true,
        backgroundColor: 0x555555
      })
      // PIXI.loader.resources = {}
      await this.renderer.init(view)
      await this.renderer.setTerrain(this.terrain)
      this.started = true
      this.renderer.resize()
      this.baseZoomLevel = this.renderer.zoomLevel
      this.$emit('load')
		}
	}
}
</script>
<style>
.renderEngineContainer {
  width: 100%;
  height: 100%;
}
</style>