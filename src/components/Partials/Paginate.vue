<template>
  <paginate
    :page-count="paging.total_page"
    :click-handler="clickCallback"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'"
    :page-link-class="'page-link'"
    :prev-link-class="'page-link'"
    :next-link-class="'page-link'"
    :hide-prev-next="true">
  </paginate>
</template>

<script>
export default {
    props: {
        'paging': {default: null},
        'url': {default: null},
        'items': {default: null}
    },
    mounted() {
    },
    methods: {
        async clickCallback(pageNum) {
            try {
                const res = await this.$axios.post(`/auth/token`);
                const data = await this.$axios.get(this.url + '?page=' + pageNum);

                if (data) this.$parent[this.items] = data.data.data.data;
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

<style lang="css">
/*.pagination {
}
.page-item {
}*/
</style>
