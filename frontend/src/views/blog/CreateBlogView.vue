<template>
    <form @submit.prevent="createBlog">
        <h2>Create Blog</h2>
        <div class="field">
            <input v-model="title" class="field-input" type="text" name="title" autocomplete="off">
            <label class="field-label" for="username">title</label>
        </div>
        <div class="field">
            <textarea v-model="body" id="body" name="body" rows="4" cols="50"></textarea>
            <label class="field-label" for="body">body</label>
        </div>
        <div class="field">
            <input class="field-button field-submit" type="submit" value="submit" />
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            body: ''
        }
    },
    computed: {
        token() {
            return this.$store.state.user.token
        }
    },
    created() {
        this.$store.dispatch('checkLocalStorage')
    },
    methods: {
        async createBlog() {
            const res = await this.$store.dispatch('createBlog', {
                body: { id: this.id, title: this.title, body: this.body },
                token: this.token
            })
            console.log(res)
            if(res.status === 201) {
                this.$store.dispatch('setMessage', 'Blog created successfully')
                this.$router.push({ name: 'blog-detail', params: { id: res.data._id } })
            }
        }
    }
}
</script>

<style>
    form {
        margin: 3rem auto;
        height: 40vh;
        width: 100%;
        max-width: 500px;
    }
    .field {
        display: flex;
        flex-direction: column-reverse;
        padding: 0.5rem 0;
    }
    .field .field-input {
        padding: 0.5rem;
    }
    .field-button {
        padding: 0.75rem 0.5rem;
        border: none;
        border-radius: 10px;
        color: white;
        margin: 5px 0;
    }
    .field .field-submit {
        background: #0275d8 ;
    }
    .field .field-submit:active {
        background: #0e86d4;
        transform: scale(1.1);
    }
    .field .field-cancel {
        background: #f0ad4e ;
    }
</style>