<template>
        <div class="container">
            <div class="form">
                <div class="alert-success" v-if="this.add.success !== false">{{ this.add.success }}</div>
                <div class="alert alert-danger" v-if="this.add.error !== false">
                    {{ this.add.error }}
                </div>
                <h3>Add barang</h3>
                <div class="card-body">
                    <form action="" @submit.prevent="addBarang()">
                        <input type="text" placeholder="Nama Barang..." class='form-control' v-model="add.nama_barang">
                        <select v-if="role === -1" v-model="add.user_id" class='form-control'>
                            <option disabled value="0">Pilih user</option>
                            <option v-for="user in userOptions" :value="user.id">{{ user.username }} - {{ user.nama }}</option>
                        </select>
                        <input type="submit" value="Add barang" class='btn btn-primary float-right'>
                    </form>
                </div>
            </div>
        </div>
</template>
<script>
export default {
    mounted() {
        this.check()
        this.getUserId()
        this.getUserRole()
        this.getUserOptions()
    },
    data() {
        return {
            add: {
                nama_barang: '',
                user_id: 0,
                success: false,
                error: false
            },
            role: 0,
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
        async addBarang() {
            try {
                const body = {
                    nama_barang: this.add.nama_barang
                }

                if (this.add.user_id != 0) body.user_id = this.add.user_id;
                const res = await this.$axios.post(`/barang`, body);

                if (res) {
                    this.add.success = `Barang successfully added`;
                    this.add.nama_barang = '';
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
        async getUserOptions() {
            try {
                const user = await this.$axios.get(`/user`)

                if (user) {
                    this.userOptions = user.data.data.data;
                }
            }
            catch(err) {
                
            }
        },
        async getUserId() {
            try {
                const user_id = localStorage.getItem('user_id');
                if (user_id) this.add.user_id = user_id;
            }
            catch(err) {

            }
        },
        async getUserRole() {
            try {
                const role = localStorage.getItem('role');
                if (role) this.role = role;
                if (role == -1) this.add.user_id = 0;
            }
            catch(err) {

            }
        }
    }
}
</script>