<template>
    <div class="container detail">
        <div class="book-title">
            <h3>{{gudang.nama_gudang}}</h3>
        </div>
        <table class='table table-bordered'>
            <tr>
                <td>Kode Gudang:</td>
                <td>{{ gudang.kode_gudang }}</td>
            </tr>
            <tr>
                <td>Nama Gudang:</td>
                <td>{{ gudang.nama_gudang }}</td>
            </tr>
            <tr>
                <td>Alamat Gudang:</td>
                <td>{{ gudang.alamat }}</td>
            </tr>
            <tr>
                <td>Aksi:</td>
                <td><router-link :to="`/gudang/edit/${gudang.id}`" class='btn btn-primary'>Edit</router-link></td>
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
            gudang: {},
            gudang_id: this.$route.params.id,
            success: false,
            error: false
        }   
    },
    methods: {
        async getData() {
            try {
                const gudang = await this.$axios.get(`/gudang/${this.gudang_id}`);
                
                if (gudang)
                    this.success = true; 
                    this.gudang = gudang.data.data;
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