<template>
    <div v-if="blog" class="blogView">
        <h3>{{ blog.title }}</h3>
        <p>{{ blog.body }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id
        }
    },
    computed: {
        blog() {
            return (this.$store.getters.getBlogById(this.id))[0]
        },
        token() {
            return this.$store.state.user.token
        },
    },
    created() {
        this.$store.dispatch('checkLocalStorage')
        this.$store.dispatch('getBlogs', this.token)
    }
}
</script>