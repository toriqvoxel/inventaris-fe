<template>
        <div class="container">
            <div class="form">
                <div class="alert-success" v-if="this.add.success !== false">{{ this.add.success }}</div>
                <div class="alert alert-danger" v-if="this.add.error !== false">
                    {{ this.add.error }}
                </div>
                <h3>Add log</h3>
                <div class="card-body">
                    <form action="" @submit.prevent="addLog()">
                        <select v-if="role === -1" v-model="add.user_id" class='form-control' v-on:change="onChangeUser()">
                            <option value="0">Pilih user</option>
                            <option v-for="user in userOptions" :value="user.id">{{ user.username }} - {{ user.nama }}</option>
                        </select>
                        <select v-model="add.gudang_id" class='form-control'>
                            <option disabled value="0">Pilih gudang</option>
                            <option v-for="gudang in gudangOptions" :value="gudang.id">{{ gudang.kode_gudang }} - {{ gudang.nama_gudang }}</option>
                        </select>
                        <select v-model="add.barang_id" class='form-control'>
                            <option disabled value="0">Pilih barang</option>
                            <option v-for="barang in barangOptions" :value="barang.id">{{ barang.kode_barang }} - {{ barang.nama_barang }}</option>
                        </select>
                        <select v-model="add.jenis" class='form-control'>
                            <option disabled value="">Pilih jenis</option>
                            <option value="keluar">Keluar</option>
                            <option value="masuk">Masuk</option>
                        </select>
                        <input type="number" placeholder="Jumlah..." class='form-control' v-model="add.jumlah">
                        <input type="submit" value="Add log" class='btn btn-primary float-right'>
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
        this.getBarangOptions()
        this.getGudangOptions()
        this.getUserOptions()
    },
    data() {
        return {
            add: {
                barang_id: 0,
                gudang_id: 0,
                user_id: 0,
                jumlah: 0,
                jenis: '',
                success: false,
                error: false
            },
            barangOptions: [],
            gudangOptions: [],
            userOptions: [],
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
        async addLog() {
            try {
                const body = {
                    gudang_id: this.add.gudang_id,
                    barang_id: this.add.barang_id,
                    jenis: this.add.jenis,
                    jumlah: this.add.jumlah,
                }

                if (this.add.user_id != 0) body.user_id = this.add.user_id;

                const res = await this.$axios.post(`/log`, body);

                if (res) {
                    this.add.success = `Log successfully added`;
                    this.add.gudang_id = 0;
                    this.add.barang_id = 0;
                    this.add.jenis = '';
                    this.add.jumlah = 0;
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
        async getBarangOptions() {
            try {
                const param = {}
                if (this.add.user_id != 0) param.user_id = this.add.user_id;
                const barang = await this.$axios.get(`/barang`, {
                    params: param
                });

                if (barang) {
                    this.barangOptions = barang.data.data.data;
                }
            }
            catch(err) {
                this.barangOptions = [];
            }
        },
        async getGudangOptions() {
            try {
                const param = {}
                if (this.add.user_id != 0) param.user_id = this.add.user_id;
                const gudang = await this.$axios.get(`/gudang`, {
                    params: param
                });

                if (gudang) {
                    this.gudangOptions = gudang.data.data.data;
                }
            }
            catch(err) {
                this.gudangOptions = [];
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
                if (user_id) this.add.user_id = Number.parseInt(user_id);
            }
            catch(err) {

            }
        },
        async getUserRole() {
            try {
                const role = localStorage.getItem('role');
                if (role) this.role = Number.parseInt(role);
                if (role == -1) this.add.user_id = 0;
            }
            catch(err) {

            }
        },
        async onChangeUser() {
            try {
                this.getBarangOptions();
                this.getGudangOptions();
            }
            catch(err) {

            }
        }
    }
}
</script>