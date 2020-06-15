<template>
    <div class="container auth">
        <div class="form">
            <h3>Register</h3>
            <div class="alert alert-danger" v-if="registerData.error !== false">
                {{ registerData.error }}
            </div>
            <form action="" @submit.prevent="register()">
                <input class='form-control' type="text" placeholder="Nama" v-model="registerData.nama">
                <input class='form-control' type="text" placeholder="Username" v-model="registerData.username">
                <input class='form-control' type="password" placeholder="Password" v-model="registerData.password">
                <input class='form-control' type="password" placeholder="Confirm Password" v-model="registerData.confirm_password">
                <input class='btn btn-primary float-right' type="submit" value="Register">
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
            registerData: {
                error: false,
                username: '',
                password: '',
                role: 1,
                confirm_password: '',
                nama: '',
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
        async register() {
            try {
                if (!this.registerData.nama ||
                    !this.registerData.username ||
                    !this.registerData.password) {
                    throw new Error(`Field harus diisi semua`);
                }
                const signup = await this.$axios.post("/auth/register", {
                    username: this.registerData.username,
                    password: this.registerData.password,
                    nama: this.registerData.nama,
                    role: this.registerData.role
                });
                if (signup) {
                    this.$router.push('/login');
                }
            }
            catch(err) {
                this.registerData.error = err.message ? err.message : err.response.data.message;
            }
        }
    }
}
</script>
