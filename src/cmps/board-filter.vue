<template>
    <section class='board-filter'>
        <div class="add-new-btns" @click="openModal('newItemModal')">
            <button @click="addTask">New Item</button>
            <span @click="" v-svg-icon="'arrowDown'" class="add-new-group-btn"></span>
        </div>
        <div class="search-tasks">
            <span v-svg-icon="'search'"></span>
            <button>Search</button>
        </div>
        <div class="person-attach" @click="openModal('filterPersonModal')">
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

        <regular-modal @modalClosed="(isModalOpen = false)" :toShow="isModalOpen" :cmp="modalName" @addGroup="addGroup"/>

    </section>
</template>
<script>
import regularModal from './dynamic-modals/regular-modal.vue';
export default {
    name: 'board-filter',
    methods: {
        addTask() {
            this.$emit('addTask')
        },
        addGroup(){
            this.$emit('addGroup')
        },
        openModal(modalName) {
            console.log(`openModal:`, modalName)
            this.modalName = modalName
            this.isModalOpen = true
        }
    },
    data() {
        return {
            isModalOpen: false,
            modalName: ''
        }
    },
    components: {
        regularModal
    }
}
</script>