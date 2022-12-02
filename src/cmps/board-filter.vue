<template>
    <section class='board-filter'>
        <div class="add-new-btns">
            <button @click="addTask">New Item</button>
            <span @click="openModal('newItemModal')" v-svg-icon="'arrowDown'" class="add-new-group-btn"></span>
        </div>
        <div class="search-tasks" :class="{'input-open': isSearchClicked}" @click="searchClicked">
            <span v-svg-icon="'search'"></span>
            <input :class="{'open': isSearchClicked}" type="text" placeholder="Search" @blur="(isSearchClicked=false)" @input="setFilter">
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
    emits: ['filter','addTask'],
    data() {
        return {
            isModalOpen: false,
            modalName: '',
            isSearchClicked: false,
            filter: {}
        }
    },
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
        },
        searchClicked() {
            this.isSearchClicked = true
            document.querySelector('.search-tasks input').focus()
        },
        setFilter(event) {
            const filter = event.target.value
            this.filter.txt = filter
            this.$emit('filtered', this.filter)
        },

    },
  
    components: {
        regularModal
    }
}
</script>