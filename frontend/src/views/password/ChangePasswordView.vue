<template>
    <form @submit.prevent="updatePassword" v-if="1">
        <h2>Reset password</h2>
        <div class="field">
            <input v-model="validEmail" class="field-input" type="email" name="email" autocomplete="off" disabled>
            <label class="field-label" for="email">Email</label>
        </div>
        <div class="field">
            <input v-model="password" class="field-input" type="password" name="password" autocomplete="off">
            <label class="field-label" for="password">New Password</label>
        </div>
        <div class="field">
            <input class="field-submit" type="submit" value="Submit" />
        </div>
    </form>
    <div class="field" v-else>
        Email is missing
    </div>
</template>

<script>
export default {
    data() {
        return {
            password: ''
        }
    },
    computed: {
        changeId() {
            return this.$route.params.id
        },
        validEmail() {
            return this.$store.getters.getEmailByChangeId(this.changeId)
        }
    },
    methods: {
        async updatePassword() {
            const check = await this.$store.dispatch('changePassword', { email: this.validEmail, password: this.password })
            if(check) {
                this.$router.push({ name: 'login' })
                this.$store.dispatch('setMessage', 'Password changed successfully')
            } else {
                this.$store.dispatch('setErrorMessage', 'Password change request failed')
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