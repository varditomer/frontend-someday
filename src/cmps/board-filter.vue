<template @keydown.escape="showModal = false">
    <section class='board-filter'>
        <div class="add-new-btns">
            <button @click="addTask">New Item</button>
            <span @click="openModal('newItemModal')" v-svg-icon="'arrowDown'" class="add-new-group-btn"></span>
        </div>
        <div class="search-tasks" :class="{ 'input-open': isSearchClicked, 'filtering': isFiltering }"
            @click="searchClicked">
            <span v-svg-icon="'search'"></span>
            <input :class="{ 'open': isSearchClicked || isFiltering }" type="text" placeholder="Search"
                @blur="(isSearchClicked = false)" v-model="filter.txt" @input="setFilter">
            <span v-svg-icon="'cancel'" class="cancel" :class="{ 'hide': !isFiltering }" @click="clearFilter"></span>
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

        <regular-modal :users="users" @closeModal="(showModal = false)" :showModal="showModal" :cmp="modalName"
            @addGroup="addGroup" />

    </section>
</template>
<script>
import regularModal from './dynamic-modals/regular-modal.vue';
export default {
    name: 'board-filter',
    props: {
        users: Array
    },
    emits: ['filter', 'addTask', 'addGroup'],
    data() {
        return {
            showModal: false,
            modalName: '',
            isSearchClicked: false,
            filter: {
            },
            isFiltering: false,
        }
    },
    methods: {
        addTask() {
            this.$emit('addTask')
        },
        addGroup() {
            this.$emit('addGroup')
        },
        openModal(modalName) {
            this.modalName = modalName
            this.showModal = true
        },
        searchClicked() {
            this.isSearchClicked = true
            document.querySelector('.search-tasks input').focus()
        },
        setFilter() {
            this.isFiltering = (this.filter) ? true : false
            this.$emit('filter', { ...this.filter })
        },
        clearFilter() {
            this.isFiltering = false
            this.filter = {}
            this.$emit('filter', { ...this.filter })
        },

    },

    components: {
        regularModal
    }
}
</script>