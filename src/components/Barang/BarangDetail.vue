<template>
    <div class="container detail">
        <div class="book-title">
            <h3>{{barang.nama_barang}}</h3>
        </div>
        <table class='table table-bordered'>
            <tr>
                <td>Kode Barang:</td>
                <td>{{ barang.kode_barang }}</td>
            </tr>
            <tr>
                <td>Nama Barang:</td>
                <td>{{ barang.nama_barang }}</td>
            </tr>
            <tr>
                <td>Action:</td>
                <td><router-link :to="`/barang/edit/${barang.id}`" class='btn btn-primary'>Edit</router-link></td>
            </tr>
        </table>
    </div>        
</template>
<script>
export default {
    mounted() {
        this.getData();
    },
    data(){
        return {
            barang: {},
            barang_id: this.$route.params.id,
            success: false,
            error: false
        }   
    },
    methods: {
        async getData() {
            try {
                const barang = await this.$axios.get(`/barang/${this.barang_id}`);
                
                if (barang)
                    this.success = true; 
                    this.barang = barang.data.data;
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