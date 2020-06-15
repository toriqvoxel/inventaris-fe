<template>
        <div class="container">
            <div class="form">
                <div class="alert-success" v-if="this.add.success !== false">{{ this.add.success }}</div>
                <div class="alert alert-danger" v-if="this.add.error !== false">
                    {{ this.add.error }}
                </div>
                <h3>Add user</h3>
                <div class="card-body">
                    <form action="" @submit.prevent="addUser()">
                        <input type="text" placeholder="Nama Lengkap..." class='form-control' v-model="add.nama">
                        <input type="text" placeholder="Username..." class='form-control' v-model="add.username">
                        <input type="password" placeholder="Password..." class='form-control' v-model="add.password">
                        <input type="submit" value="Add user" class='btn btn-primary float-right'>
                    </form>
                </div>
            </div>
        </div>
</template>
<script>
export default {
    mounted() {
        this.check()
    },
    data() {
        return {
            add: {
                nama: '',
                username: '',
                password: '',
                success: false,
                error: false
            },
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
        async addUser() {
            try {
                const res = await this.$axios.post(`/user`, {
                    nama:this.add.nama, 
                    username: this.add.username, 
                    password: this.add.password
                })

                if (res) {
                    this.add.success = `User successfully added`;
                    this.add.nama = '';
                    this.add.username = '';
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
        }
    }
}
</script>