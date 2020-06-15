<template>
    <div class="container">
        <div class="card books">
            <div class="card-header">
                <h4>Logs</h4>
            </div>
            <div class="card-body">
                <router-link to="/log/add" class='btn btn-primary float-right'>Add Logs</router-link>
                <div class="table table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Gudang</th>
                                <th>Barang</th>
                                <th>Jumlah</th>
                                <th>Jenis</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="log in logs" :key="log.id">
                                <td>{{ log.Gudang.nama_gudang }}</td>
                                <td>{{ log.Barang.nama_barang }}</td>
                                <td>{{ log.jumlah }}</td>
                                <td>{{ log.jenis }}</td>
                                <td><router-link :to="`/log/${log.id}`" class='btn btn-info'>Open</router-link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="logs.length > 0">
                    <Tpaginate :paging="paging" url="log" items="logs"></Tpaginate>
                </div>
            </div>
          
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        this.getData();
    },
    data() {
        return {
            paging: '',
            logs: [],
            barang_id: this.$route.query.barang_id ? this.$route.query.barang_id : '',
            gudang_id: this.$route.query.barang_id ? this.$route.query.gudang_id : '',
            user_id: this.$route.query.user_id ? this.$route.query.user_id : '',
            jenis: this.$route.query.jenis ? this.$route.query.jenis : '',
            page: this.$route.query.page ? this.$route.query.page : '',
            per_page: this.$route.query.per_page ? this.$route.query.per_page : '',
        }
    },
    methods: {
        async getData() {
            try {
                const param = {}
                if (this.barang_id !== '') param.barang_id = this.barang_id
                if (this.gudang_id !== '') param.gudang_id = this.gudang_id
                if (this.user_id !== '') param.user_id = this.user_id
                if (this.jenis !== '') param.jenis = this.jenis   
                if (this.page !== '') param.page = this.page
                if (this.per_page !== '') param.per_page = this.per_page

                const res = await this.$axios.post(`/auth/token`);
                const logs = await this.$axios.get(`/log`, {
                    params: param
                });
                
                if (logs) this.logs = logs.data.data.data;
                if (logs) this.paging = logs.data.data.pagination;
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
<style>

</style>