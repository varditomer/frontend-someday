<template>
    <section class='filter-person-modal'>
        <div class="modal-group upper-group flex column">
            <div class="modal-item flex align-center">
                <p class="title">Quick person filter</p>
            </div>
            <div class="modal-item flex align-center">
                <p class="subtitle">Filter items and subitems by person</p>
            </div>
            <div class="modal-item flex align-center">
                <div :title="user.fullname" class="filter-user" v-for="user in users">
                    <img :src="user.imgUrl" alt="">
                </div>
                <!-- Todo: render persons and set filter by persons  -->
            </div>
        </div>

    </section>
</template>
<script>
export default {
    name: 'filter-person-modal',
    props: {
        users: Array,
    },
    methods: {
    }
}
</script>