<template>
        <div class="container">
            <div class="form">
                <div class="alert-success" v-if="this.add.success !== false">{{ this.add.success }}</div>
                <div class="alert alert-danger" v-if="this.add.error !== false">
                    {{ this.add.error }}
                </div>
                <h3>Save user</h3>
                <div class="card-body">
                    <form action="" @submit.prevent="saveUser()">
                        <input type="text" placeholder="Nama Lengkap..." class='form-control' v-model="add.nama">
                        <input disabled type="text" placeholder="Username..." class='form-control' v-model="add.username">
                        <input type="password" placeholder="Password..." class='form-control' v-model="add.password">
                        <input type="submit" value="Save user" class='btn btn-primary float-right'>
                    </form>
                </div>
            </div>
        </div>
</template>
<script>
export default {
    mounted() {
        this.check();
        this.getData();
    },
    data() {
        return {
            add: {
                nama: '',
                password: '',
                success: false,
                error: false
            },
            user_id: this.$route.params.id,
            errors: []
        }
    },
    methods: {
        async check() {
            try {
                const res = await this.$axios.post(`/auth/token`);
            }
            catch(err) {
                if(err.response.data.message == 'token authentication is required' ||
                    err.response.data.message == 'invalid token') {
                    this.$router.push('/login');
                }
            }
        },
        async saveUser() {
            try {
                const body = {}

                if (this.add.nama != '') body.nama = this.add.nama;
                if (this.add.password != '') body.password = this.add.password;
                const res = await this.$axios.patch(`/user/${this.user_id}`, body);

                if (res) {
                    this.add.success = `User successfully saved`;
                    this.add.nama = res.data.data.nama;
                    this.add.password = '';
                }
            }
            catch(err) {
                if(err.response.data.message == 'token authentication is required' ||
                    err.response.data.message == 'invalid token') {
                    this.$router.push('/login');
                } else {
                    this.add.success = false;
                    this.add.error = err.response.data.message;
                    error.response.data.errors.map((error) => {
                        this.errors.push(error);
                    });
                }
            }
        },
        async getData() {
            try {
                const res = await this.$axios.post(`/auth/token`);
                const user = await this.$axios.get(`user/${this.user_id}`);
                
                if (user) {
                    this.add.nama = user.data.data.nama;
                    this.add.username = user.data.data.username;
                }
            }
            catch(err) {
                if(err.response.data.message == 'token authentication is required' ||
                    err.response.data.message == 'invalid token') {
                    this.$router.push('/login');
                }
            }                
        }
    }
}
</script>