<template @keydown.escape="showModal = false">
    <section class='board-filter'>
        <div class="add-new-btns">
            <button @click="addTask">New Item</button>
            <span @click="openModal('new-item-modal')" v-svg-icon="'arrowDown'" class="add-new-group-btn"></span>
        </div>
        <div class="search-tasks" :class="{ 'input-open': isSearchClicked, 'filtering': isFiltering }"
            @click="searchClicked">
            <span v-svg-icon="'search'"></span>
            <input :class="{ 'open': isSearchClicked || isFiltering }" type="text" placeholder="Search"
                @blur="(isSearchClicked = false)" v-model="filter.txt" @input="setFilter(false)">
            <span v-svg-icon="'cancel'" class="cancel" :class="{ 'hide': !isFiltering }" @click="clearFilter"></span>
        </div>
        <div @click="openModal('filter-person-modal')" @mouseover="(showTitleModal = true)"
            @mouseout="(showTitleModal = false)" class="person-attach">
            <span v-svg-icon="'account'"></span>
            <button>Person</button>
        </div>
        <div class="filter" @click="openModal('multi-filter-modal')">
            <span v-svg-icon="'filter'"></span>
            <button>Filter</button>
        </div>
        <div class="sort">
            <span v-svg-icon="'sort'"></span>
            <button>Sort</button>
        </div>


        <regular-modal :filterBy="filterBy" @filter="setFilter" :users="users" @closeModal="(showModal = false)"
            v-if="showModal" :class="(modalName + '-parent')" :cmp="modalName" @addGroup="addGroup" />

    </section>
</template>
<script>
import titleModal from './dynamic-modals/title-modal.vue'
import regularModal from './dynamic-modals/regular-modal.vue'
export default {
    name: 'board-filter',
    props: {
        users: Array,
        filterBy: Object
    },
    emits: ['filter', 'addTask', 'addGroup'],
    data() {
        return {
            showModal: false,
            showTitleModal: false,
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
            this.$emit('addGroup', false)
        },
        openModal(modalName) {
            console.log(`modalName:`, modalName)
            this.showTitleModal = false
            this.modalName = modalName
            this.showModal = true
        },
        searchClicked() {
            this.isSearchClicked = true
            document.querySelector('.search-tasks input').focus()
        },
        setFilter(filter) {
            this.$store.commit({ type: 'setMultiFilter', multiFilter: filter })
            if (filter) this.$emit('filter', filter)
            else {
                this.isFiltering = (this.filter) ? true : false
                this.$emit('filter', { ...this.filter })
            }
        },
        clearFilter() {
            this.isFiltering = false
            this.filter.txt = ''
            this.$emit('filter', { ...this.filter })
        },
    },
    components: {
        regularModal,
        titleModal
    }
}
</script>