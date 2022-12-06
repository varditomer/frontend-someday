<template>
    <section class="login-signup-modal flex column">
        <div class="nav-btns">
            <button @click="(login = true, signingUp = false)">Login</button>
            <button @click="(signingUp = true, login = false)">Signup</button>
        </div>

        <section v-if="login" class="login">
            <section class='persons-modal'>
        <div v-for="person in content" class="active-persons">
            <div class="person">
                <span :style="person.style" class="task-avatar"></span>
                <p>{{ person.fullname }}</p>
                <span @click="removePerson(person._id)" v-svg-icon="'smallExit'" class="remove-person-btn"></span>
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
                <div>
                    <label for="username">username</label>
                    <input name="username" v-model="username" placeholder="username">
                </div>
                <div>
                    <label for="password">password</label>
                    <input name="password" v-model="password" placeholder="password" type="password">
                </div>
                <div>
                    <label for="firstName">first name</label>
                    <input name="firstName" v-model="firstName" placeholder="first name">
                </div>
                <div>
                    <label for="lastName">last name</label>
                    <input name="lastName" v-model="lastName" placeholder="last name">
                </div>
                <button type="submit">Signup</button>
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
    }

}
</script>