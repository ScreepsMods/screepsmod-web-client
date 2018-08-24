<template>
	<v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
    	<v-form class="login" v-model="valid" @submit.prevent="login">
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
      			<v-text-field
      				v-model="username"
      				label="Username"
      				required
      			></v-text-field>
      			<v-text-field
      				v-model="password"
              label="Password"
      				type="password"
      				required
      			></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
      <v-card>
        <v-card-text>
          <a href="/api/auth/steam" target="_blank">
            <img src="~/assets/steam_signin.png" />
          </a>
        </v-card-text>
      </v-card>
    </v-flex>
	</v-layout>
</template>
<script>
export default {
  middleware: 'notAuthenticated',
  props: ['redirect'],
  data() {
    return {
      username: '',
      password: '',
      valid: false
    }
  },
  mounted() {
    window.addEventListener('message', this.message)
  },
  destroyed() {
    window.removeEventListener('message', this.message)
  },
  methods: {
    auth (token) {
      if (token) {
        localStorage.authToken = token
        this.$store.commit('SET_TOKEN', token)
        this.$router.push(this.redirect || '/map')
      } else {

      }
    },
    message (e) {
      try {
        const { token } = JSON.parse(e.data)
        console.log(e,token)
        this.auth(token)
      } catch(e) {}
    },
    async login () {
      const { username, password } = this
      const { token } = await this.$api.auth(username, password)
      this.auth(token)
    }
  }
}
</script>
<style>
	
</style>