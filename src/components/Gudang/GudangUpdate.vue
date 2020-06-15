<template>
        <div class="container">
            <div class="form">
                <div class="alert-success" v-if="this.add.success !== false">{{ this.add.success }}</div>
                <div class="alert alert-danger" v-if="this.add.error !== false">
                    {{ this.add.error }}
                </div>
                <h3>Edit gudang</h3>
                <div class="card-body">
                    <form action="" @submit.prevent="saveGudang()">
                        <input type="text" placeholder="Nama Gudang..." class='form-control' v-model="add.nama_gudang">
                        <input type="text" placeholder="Alamat Gudang..." class='form-control' v-model="add.alamat">
                        <input type="submit" value="Save gudang" class='btn btn-primary float-right'>
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
                nama_gudang: '',
                alamat: '',
                success: false,
                error: false
            },
            role: 0,
            gudang_id: this.$route.params.id,
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
        async saveGudang() {
            try {
                const body = {
                    nama_gudang: this.add.nama_gudang,
                    alamat: this.add.alamat
                }

                const res = await this.$axios.patch(`/gudang/${this.gudang_id}`, body);

                if (res) {
                    this.add.success = `Gudang successfully saved`;
                    this.add.nama_gudang = res.data.data.nama_gudang;
                    this.add.alamat = res.data.data.alamat;
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
            }
            catch(err) {

            }
        },
        async getData() {
            try {
                const gudang = await this.$axios.get(`/gudang/${this.gudang_id}`);
                
                if (gudang) {
                    this.success = true; 
                    const gudangData = gudang.data.data;
                    this.add.nama_gudang = gudangData.nama_gudang;
                    this.add.alamat = gudangData.alamat;
                }
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
        }
    }
}
</script>