<template>
    <form @submit.prevent="sendForgetReq">
        <h2>Forgot password</h2>
        <div class="field">
            <span class="field-error">{{ error }}</span>
            <input v-model="email" class="field-input" type="text" name="email" autocomplete="off" required>
            <label class="field-label" for="username">email</label>
        </div>
        <div class="field">
            <input class="field-submit" type="submit" value="Submit" />
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            error: ''
        }
    },
    methods: {
        async sendForgetReq() {
            const { status } = await this.$store.dispatch('makeForgetRequest', { email: this.email })
            this.$store.dispatch('setMessage', 'Sent password recovery email')
            
            if(status === 200) {
                this.$router.push({ name: 'reset-password' })
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
    .field-error {
        color: red;
        text-align: center;
    }
</style>