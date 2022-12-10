<template>
    <section class="login-signup-modal flex column">

        <div class="nav-btns">
            <button :class="{ 'selected': isLogin }" @click="(isLogin = true)">Login</button>
            <button :class="{ 'selected': !isLogin }" @click="(isLogin = false)">Signup</button>
        </div>

        <section class="signup login">
            <form class="signup-form flex column" @submit.prevent="loginSignup">
                <label>
                    <p>Username</p>
                    <input required type="text" v-model="creds.username" placeholder="Username">
                </label>
                <label>
                    <p>Password</p>
                    <input required type="password" v-model="creds.password" placeholder="Password">
                </label>
                <label v-if="!isLogin">
                    <p>Full name</p>
                    <input required type="text" v-model="creds.fullname" placeholder="Full name">
                </label>
                <label v-if="!isLogin">
                    <p>Email</p>
                    <input required type="email" v-model="creds.email" placeholder="Email">
                </label>
                <button v-if="!isLogin" type="submit">Sign up</button>
                <button v-if="isLogin" type="submit">Login</button>
            </form>
        </section>



    </section>
</template>
  
<script>
import { userService } from '../../services/user.service';
export default {
    name: 'signup-modal',
    emits: ['hideModal', 'loginSignup'],
    props: {
    },
    data() {
        return {
            isLogin: false,
            creds: {}
        }
    },
    methods: {
        loginSignup() {
            const userCreds = this.creds
            this.$emit('loginSignup', userCreds)
            this.$emit('hideModal')
            this.creds = {}
        },
    },
    created() {
        this.users = userService.getUsers()
        this.isLogin = true
    }

}
</script>