<template>
  <div id="app">
    <div class="header">
        <router-link to="/gudang">
        <span class="buku">Simple</span><span class="bagus">Inventaris</span>
        </router-link>
        <div class="right" v-if="token != ''">
          <router-link to="/gudang">
            <span>Gudang</span>
          </router-link>
          <router-link to="/barang">
            <span>Barang</span>
          </router-link>
          <router-link to="/inventaris">
            <span>Inventaris</span>
          </router-link>
          <router-link to="/log">
            <span>Log</span>
          </router-link>
          <router-link to="/profile">
            <span>Profil</span>
          </router-link>
          <router-link v-if="getRole == -1" to="/user">
            <span>User</span>
          </router-link>
          <a href="#" @click="logout">Logout</a>
        </div>
        <div class="right" v-else>
          <router-link to="/login">
            <span>Login</span>
          </router-link>
          <router-link to="/register">
            <span>Register</span>
          </router-link>
        </div>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  mounted() {
    this.check();
  },
  name: 'app',
  components: {

  },
  data() {
    return {
      get token() {
        return localStorage.getItem('token') ? localStorage.getItem('token') : '';
      },
      get role() {
        return localStorage.getItem('role') ? localStorage.getItem('role') : 0;
      }
    }
  },
  computed: {
    getNama: function() {
      return localStorage.getItem('nama') ? localStorage.getItem('nama') : '';
    },
    getRole: function () {
      return localStorage.getItem('role') ? localStorage.getItem('role') : 0;
    },
    getUsername: function() {
      return localStorage.getItem('username') ? localStorage.getItem('username') : '';
    },
    getToken: function() {
      return localStorage.getItem('token') ? localStorage.getItem('token') : '';
    }
  },
  methods: {
    async logout() {
      try {
        const signout = await this.$axios.post(`/auth/token`);

        if (signout.data.status == 'success') {
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          localStorage.removeItem('username');
          localStorage.removeItem('nama');
          localStorage.removeItem('role');
          this.$axios.defaults.headers.common['Authorization'] = '';
          this.$router.push('/login');
        }
      }
      catch(err) {
        if(err.response.message == 'token authentication is required' ||
          err.response.message == 'invalid token') {
          this.$router.push('/login');
        }
      }
    },
    async check() {
      try {
        const check = await this.$axios.post(`/auth/token`);

        if (check.status == 'success') this.$router.push('/gudang');
      }
      catch(err) {
        if(err.response.message == 'token authentication is required' ||
          err.response.message == 'invalid token') {
          this.$router.push('/login');
        }
      }
    }
  }
}
</script>

<style>

</style>
