<template>
    <div class="container">
        <div class="card books">
            <div class="card-header">
                <h4>Gudang</h4>
            </div>
            <div class="card-body">
                <router-link to="/gudang/add" class='btn btn-primary float-right'>Add Gudang</router-link>
                <div class="table table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Kode Gudang</th>
                                <th>Nama Gudang</th>
                                <th>Alamat</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="gudang in gudangs" :key="gudang.id">
                                <td>{{ gudang.kode_gudang }}</td>
                                <td>{{ gudang.nama_gudang }}</td>
                                <td>{{ gudang.alamat }}</td>
                                <td><router-link :to="`/gudang/${gudang.id}`" class='btn btn-info'>Open</router-link></td>
                                <td><router-link :to="`/gudang/edit/${gudang.id}`" class='btn btn-primary'>Edit</router-link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="gudangs.length > 0">
                    <Tpaginate :paging="paging" url="gudang" items="gudangs"></Tpaginate>
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
            gudangs: []
        }
    },
    methods: {
        async getData() {
            try {
                const res = await this.$axios.post(`/auth/token`);
                const gudang = await this.$axios.get(`gudang`);
                
                if (gudang) this.gudangs = gudang.data.data.data;
                if (gudang) this.paging = gudang.data.data.pagination;
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