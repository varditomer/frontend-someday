<template @keydown.escape="showModal = false">
    <section class='board-filter'>
        <div class="add-new-btns">
            <button @click="addTask">New Item</button>
            <span @click="openModal('new-item-modal')" v-svg-icon="'arrowDown'" class="add-new-group-btn"></span>
        </div>
        <div class="search-tasks" :class="{ 'input-open': isSearchClicked, 'filtering': isFiltering }"
            @click="searchClicked($event)">
            <span v-svg-icon="'search'"></span>
            <input :class="{ 'open': isSearchClicked || isFiltering }" type="text" placeholder="Search"
                @blur="(isSearchClicked = false)" v-model="txt" @input="setFilter('txt', $event.target.value)">
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


        <regular-modal :filter="filter" @filter="setFilter" :users="users" @closeModal="(showModal = false)"
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
        filter: Object
    },
    emits: ['filter', 'addTask', 'addGroup'],
    data() {
        return {
            showModal: false,
            showTitleModal: false,
            modalName: '',
            isSearchClicked: false,
            txt:'',
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
            this.showTitleModal = false
            this.modalName = modalName
            this.showModal = true
        },
        searchClicked(ev) {
            this.isSearchClicked = true
            ev.target.focus()
        },
        setFilter(key, val) {
            let filter = JSON.parse(JSON.stringify(this.$store.getters.filter))
            if (key === 'group' || key === 'txt') filter[key] = val
            else filter.tasks[key] = val
            this.isFiltering = (this.txt) ? true : false
            this.$emit('filter',  filter)
            
        },
        clearFilter() {
            this.isFiltering = false
            this.txt = ''
            this.$emit('filter', { txt })
        },
    },
    components: {
        regularModal,
        titleModal
    }
}
</script>