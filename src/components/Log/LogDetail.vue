<template>
    <div class="container detail">
        <div class="book-title">
            <h3>Detail Log</h3>
        </div>
        <table class='table table-bordered'>
            <tr>
                <td>Kode Gudang:</td>
                <td>{{ log.Gudang.kode_gudang }}</td>
            </tr>
            <tr>
                <td>Nama Gudang:</td>
                <td>{{ log.Gudang.nama_gudang }}</td>
            </tr>
            <tr>
                <td>Alamat Gudang:</td>
                <td>{{ log.Gudang.alamat }}</td>
            </tr>
            <tr>
                <td>Kode Barang:</td>
                <td>{{ log.Barang.kode_barang }}</td>
            </tr>
            <tr>
                <td>Nama Barang:</td>
                <td>{{ log.Barang.nama_barang }}</td>
            </tr>
            <tr>
                <td>Jumlah:</td>
                <td>{{ log.jumlah }}</td>
            </tr>
            <tr>
                <td>Jenis:</td>
                <td>{{ log.jenis }}</td>
            </tr>
            <tr>
                <td>User:</td>
                <td>{{ log.User.username }} - {{ log.User.nama }}</td>
            </tr>
            <tr>
                <td>Tanggal:</td>
                <td>{{ new Date(log.createdAt) }}</td>
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
            log: {},
            log_id: this.$route.params.id,
            success: false,
            error: false
        }   
    },
    methods: {
        async getData() {
            try {
                const log = await this.$axios.get(`/log/${this.log_id}`);
                
                if (log)
                    this.success = true; 
                    this.log = log.data.data;
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