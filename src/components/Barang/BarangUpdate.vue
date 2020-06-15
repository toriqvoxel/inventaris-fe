<template>
        <div class="container">
            <div class="form">
                <div class="alert-success" v-if="this.add.success !== false">{{ this.add.success }}</div>
                <div class="alert alert-danger" v-if="this.add.error !== false">
                    {{ this.add.error }}
                </div>
                <h3>Edit barang</h3>
                <div class="card-body">
                    <form action="" @submit.prevent="saveBarang()">
                        <input type="text" placeholder="Nama Barang..." class='form-control' v-model="add.nama_barang">
                        <input type="submit" value="Save barang" class='btn btn-primary float-right'>
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
        this.getData()
    },
    data() {
        return {
            add: {
                nama_barang: '',
                success: false,
                error: false
            },
            barang_id: this.$route.params.id,
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
        async saveBarang() {
            try {
                const body = {
                    nama_barang: this.add.nama_barang
                }

                const res = await this.$axios.patch(`/barang/${this.barang_id}`, body);

                if (res) {
                    this.add.success = `Barang successfully saved`;
                    this.add.nama_barang = res.data.data.nama_barang;
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
                const barang = await this.$axios.get(`/barang/${this.barang_id}`);
                
                if (barang)
                    this.success = true; 
                    const dataBarang = barang.data.data;
                    this.add.nama_barang = dataBarang.nama_barang;
            }
            catch(err) {
                if(err.response.data.message == 'token authentication is required' ||
                    err.response.data.message == 'invalid token') {
                    this.$router.push('/login');
                }
                else {
                    this.error = err.response.message;
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
            }
            catch(err) {

            }
        }
    }
}
</script>