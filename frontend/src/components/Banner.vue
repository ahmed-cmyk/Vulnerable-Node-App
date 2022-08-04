<template>
    <div v-if="bannerMessage" class="banner" :class="{ 'banner-error': errorState }">
        <span class="banner-text">{{ bannerMessage }}</span>
    </div>
</template>

<script>
export default {
    computed: {
        bannerMessage() {
            return this.$store.state.banner.message
        },
        errorState() {
            return this.$store.state.banner.errorState
        }
    },
    watch: {
        bannerMessage() {
            setTimeout(() => {
                this.$store.dispatch('setBlank')
            }, 5000)
        }
    }
}
</script>

<style>
.banner {
    animation: slidein 2s;
    background-color: #4BB543;
    border-radius: 10px;
    color: #fff;
    margin: 5px auto;
    padding: 10px;
    position: absolute;
    text-align: center;
    transform: translateX(10%);
    width: 80%;
}
.banner-error {
    background-color: #e74c3c;
}

@keyframes slidein {
    0% {
        transform: translate(10%, -100px);
    }

    100% {
        transform: translate(10%, 0);
    }
}

.banner-text {
    animation: appear 3s;
}

@keyframes appear {
    0% {
        opacity: 0;
    }
  
    100% {
        opacity: 1;
    }
}
</style>