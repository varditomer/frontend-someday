<template>
    <section class="login-signup-modal flex column">

        <div class="nav-btns">
            <button :class="{ 'selected': login }" @click="(login = true, signingUp = false)">Login</button>
            <button :class="{ 'selected': signingUp }" @click="(signingUp = true, login = false)">Signup</button>
        </div>

        <section v-if="login" class="login">
            <section class='persons-modal'>
                <div v-for="person in content" class="active-persons">
                    <div class="person">
                        <span :style="person.style" class="task-avatar"></span>
                        <p>{{ person.fullname }}</p>
                        <span @click="removePerson(person._id)" v-svg-icon="'smallExit'"
                            class="remove-person-btn"></span>
                    </div>
                </div>
                <!-- <p v-if="personsToAdd.length" class="suggested-persons">Suggested people</p> -->
                <div class="not-active-persons">
                    <div @click="addPerson(person._id)" v-for="person in users" class="not-active-person">
                        <div>
                            <img :src="person.imgUrl" />
                            <p>{{ person.fullname }}</p>
                        </div>
                    </div>
                </div>
            </section>

        </section>

        <section v-if="signingUp" class="signup">
            <form class="signup-form flex column" @submit.prevent="doSignup">
                <label>
                    <p>Username</p>
                    <input type="text" v-model="username" placeholder="Username">
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" v-model="password" placeholder="Password">
                </label>
                <label>
                    <p>Full name</p>
                    <input type="text" v-model="fullname" placeholder="Full name">
                </label>
                <label>
                    <p>Mail</p>
                    <input type="mail" v-model="mail" placeholder="mail">
                </label>
                <button type="submit">Sign up</button>
            </form>


        </section>



    </section>
</template>
  
<script>
import { userService } from '../../services/user.service';
export default {
    name: 'signup-modal',
    emits: ['hideModal'],
    props: {
    },
    data() {
        return {
            signingUp: false,
            login: false,
            users: []
        }
    },
    methods: {
        doSignup() {
            this.$emit('hideModal')
        },
        removePerson() {
            return
        }
    },
    created() {
        this.users = userService.getUsers()
        this.login = true
    }

}
</script>