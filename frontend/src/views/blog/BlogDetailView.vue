<template>
    <div v-if="blog" class="detailView">
        <div v-if="!editMode">
            <div class="buttons">
                <button class="button button-edit" @click="toggleEdit">edit</button>
                <button class="button button-delete" @click="callDelete">delete</button>
            </div>
            <div class="blog">
                <h3 class="blog-heading">{{ blog.title }}</h3>
                <p>{{ blog.body }}</p>
            </div>
        </div>
        <div v-else>
            <EditBlogView :blog="blog" @toggle="toggleEdit" />
        </div>
    </div>
</template>

<script>
import EditBlogView from './EditBlogView.vue'
export default {
    data() {
        return {
            id: this.$route.params.id,
            editMode: false
        };
    },
    computed: {
        blog() {
            return (this.$store.getters.getBlogById(this.id))[0];
        },
        token() {
            return this.$store.state.user.token;
        },
    },
    created() {
        this.$store.dispatch("checkLocalStorage");
        this.$store.dispatch("getBlogs", this.token);
    },
    methods: {
        toggleEdit() {
            this.editMode = !this.editMode;
        },
        async callDelete() {
            const status = await this.$store.dispatch('deleteBlog', {
                id: this.id,
                token: this.token
            })
            console.log(status)
            if(status === 200) {
                this.$store.dispatch('setMessage', 'Blog deleted successfully')
                this.$router.push({ name: 'home' })
            }
        }
    },
    components: { EditBlogView }
}
</script>

<style>
.detailView {
    width: 70vw;
    margin: 5px auto;
}
.blog {
    border: 1px solid black;
}
.blog-heading {
    background: #000;
    padding: 5px;
    color: #fff;
}
.buttons {
    text-align: right;
}
.button {
    padding: 10px 15px;
    border: none;
    color: #fff;
    border-radius: 10px;
    margin: 0.3rem;
}
.button-edit {
    background: blue;
}
.button-delete {
    background: red;
}
</style>