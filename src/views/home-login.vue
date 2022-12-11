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
                <label v-if="!isLogin">
                    <p>Upload image</p>
                    <div class="add-img-btn flex center" @click="(uploadingImg = !uploadingImg)">
                        <input type="file" @change="handleFile" />
                        <span v-svg-icon="'outlinePlus'"></span>
                        Add file
                    </div>
                </label>
                <button type="submit">
                    {{ isLogin ? 'Login' : 'Signup' }}
                </button>
            </form>
        </section>


    </section>
</template>
  
<script>
import { uploadImg } from '../services/img-upload.service.js'
export default {
    name: 'home-login',

    props: {
    },
    computed: {
        board() {
            return this.$store.getters.board
        }
    },
    data() {
        return {
            isLogin: false,
            creds: {},
            uploadingImg: false
        }
    },
    methods: {
        async loginSignup() {
            const userCreds = this.creds
            if (!userCreds.email) {
                try {
                    await this.$store.dispatch({ type: 'login', userCreds })
                    this.$router.push('/board/' + this.board._id)
                }
                catch (err) {
                    console.log('Wrong details', err);
                }
            }
            else {
                try {
                    await this.$store.dispatch({ type: 'signup', userCreds })
                    this.$router.push('/board/' + this.board._id)
                }
                catch (err) {
                    console.log('Could not sign up', err);
                }
            }
        },

        handleFile(ev) {
            let file
            file = ev.target.files[0]
            this.onUploadFile(file)
        },
        async onUploadFile(file) {
            const res = await uploadImg(file)
            this.creds.imgUrl = res.url
        },

    },
    async created() {
        await this.$store.dispatch({ type: 'queryBoard', filter: {} })
    }

}
</script>