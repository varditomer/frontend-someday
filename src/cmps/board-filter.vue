<template>
    <section class='board-filter'>
        <div class="add-new-btns">
            <option-modal :toShow="isModalOpen" :cmp="'addGroup'" />
            <button @click="addTask">New Item</button>
            <span @click="isModalOpen = true" v-svg-icon="'arrowDown'"></span>
        </div>
        <div class="search-tasks">
            <span v-svg-icon="'search'"></span>
            <button>Search</button>
        </div>
        <div class="person-attach">
            <span v-svg-icon="'account'"></span>
            <button>Person</button>
        </div>
        <div class="filter">
            <span v-svg-icon="'filter'"></span>
            <button>Filter</button>
        </div>
        <div class="sort">
            <span v-svg-icon="'sort'"></span>
            <button>Sort</button>
        </div>

    </section>
</template>
<script>
import optionModal from './option-modal.vue';
export default {
    name: 'board-filter',
    methods: {
        addTask() {
            this.$emit('addTask')
        }
    },
    data() {
        return {
            isModalOpen: false
        }
    },
    components: {
        optionModal
    }
}
</script>