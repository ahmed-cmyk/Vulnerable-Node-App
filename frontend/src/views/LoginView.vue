<template>
    <form @submit.prevent="login">
        <h2>Login</h2>
        <div class="field">
            <input v-model="email" class="field-input" type="text" name="email" autocomplete="off" required>
            <label class="field-label" for="email">email</label>
        </div>
        <div class="field">
            <input v-model="password" class="field-input" type="password" name="password" required>
            <label class="field-label" for="password">password</label>
        </div>
        <div class="field">
            <input class="field-submit" type="submit" value="Submit" />
        </div>
        <router-link :to="{ name: 'forgot-password' }" class="link">Forgot Password?</router-link>
    </form>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        async login() {
            const loginSucceeded = await this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            })

            if(loginSucceeded) {
                this.$router.push({ name: 'home' })
                this.$store.dispatch('setMessage', 'Login Succeeded')
            }
        }
    },
    computed: {
        myToken() { 
            return this.$store.state.token
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
    .field .field-submit {
        padding: 0.75rem 0.5rem;
        border: none;
        border-radius: 10px;
        background: #68bbe3;
        color: white;
    }
    .field .field-submit:active {
        background: #0e86d4;
        transform: scale(1.1);
    }
</style>