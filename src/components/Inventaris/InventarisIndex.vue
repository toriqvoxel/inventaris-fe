<template>
    <div class="container">
        <div class="card books">
            <div class="card-header">
                <h4>Inventaris</h4>
            </div>
            <div class="card-body">
                <router-link to="/inventaris/add" class='btn btn-primary float-right'>Add Inventaris</router-link>
                <div class="table table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Gudang</th>
                                <th>Barang</th>
                                <th>Stok</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="inventaris in inventaris" :key="inventaris.id">
                                <td>{{ inventaris.Gudang.nama_gudang }}</td>
                                <td>{{ inventaris.Barang.nama_barang }}</td>
                                <td>{{ inventaris.stok }}</td>
                                <td><router-link :to="`/log?barang_id=${inventaris.Barang.id}&gudang_id=${inventaris.Gudang.id}&page=1&per_page=50`" class='btn btn-info'>Open Log</router-link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="inventaris.length > 0">
                    <Tpaginate :paging="paging" url="inventaris" items="inventaris"></Tpaginate>
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
            inventaris: []
        }
    },
    methods: {
        async getData() {
            try {
                const res = await this.$axios.post(`/auth/token`);
                const inventaris = await this.$axios.get(`inventaris`);
                
                if (inventaris) this.inventaris = inventaris.data.data.data;
                if (inventaris) this.paging = inventaris.data.data.pagination;
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