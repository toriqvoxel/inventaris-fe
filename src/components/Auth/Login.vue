<template>
    <div class="container auth">
        <div class="form">
            <h3>Login</h3>
            <div class="alert alert-danger" v-if="loginData.error !== false">
                {{ loginData.error }}
            </div>
            <form action="" class='mt-20' @submit.prevent="login()">
                <input type="text" class='form-control' placeholder="Username" v-model="loginData.username">
                <input type="password" class='form-control' placeholder="Password" v-model="loginData.password">
                <input type="submit" value="Login" class='btn btn-primary float-right'>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.check();
    },
    data() {
        return {
            loginData: {
                username: '',
                password: '',
                success: false,
                error: false,
            }
        }
    },
    methods: {
        async check() {
            try {
                const auth =  await this.$axios.post(`/auth/token`);
                if (auth.data.status == 'success') this.$router.push('/gudang');
            }
            catch(err) {
                if(err.response.message == 'token authentication is required' ||
                  err.response.message == 'invalid token') {
                  this.$router.push('/login');
                }
            }
        },
        async login() {
            try {
                const signin = await this.$axios.post('/auth/login', {
                    username: this.loginData.username, 
                    password: this.loginData.password
                });

                if (signin) {
                    let token = `Bearer ${signin.data.token}`;
                    localStorage.setItem('token', token);
                    localStorage.setItem('user_id', signin.data.data.id);
                    localStorage.setItem('username', signin.data.data.username);
                    localStorage.setItem('nama', signin.data.data.nama);
                    localStorage.setItem('role', signin.data.data.role);
                    this.$axios.defaults.headers.common['Authorization'] = token;
                    this.$router.push('/gudang');
                }
            }
            catch(err) {
                this.loginData.success = false;
                this.loginData.error = err.response.data.message;
            }
        }
    }
}
</script>