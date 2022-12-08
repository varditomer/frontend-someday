<template>
    <section class='multi-filter-modal flex column'>
        <div class="multi-filter-header flex">
            <div class="left-section">
                <div class="title">Quick filters</div>
                <span>Showing all of {{ filterItems }} items</span>
            </div>
            <div class="right-section">
                <div class="clear-all">
                    <span :class="{ 'bold': isFlittered }">clear all</span>
                </div>
            </div>


        </div>
        <section class="filter-area flex column">
            <div class="filter-area-title">
                <h2>All columns</h2>
            </div>
            <div class="filter-groups">
                <div class="filter-col">
                    <div class="title">Group</div>
                    <div class="content flex column">
                        <div class="filter-item">Top group</div>
                        <div class="filter-item">Bugs</div>
                        <div class="filter-item">Details</div>
                        <div class="filter-item">Workspace</div>
                        <div class="filter-item">Task preview</div>
                        <div class="filter-item">Modals</div>
                        <div class="filter-item">For thursday</div>
                        <div class="filter-item">General</div>
                        <div class="filter-item">Task preview</div>
                        <div class="filter-item">Modals</div>
                        <div class="filter-item">For thursday</div>
                        <div class="filter-item">General</div>
                    </div>
                </div>
                <div class="filter-col">
                    <div class="title">Group</div>
                    <div class="content flex column">
                        <div class="filter-item">Top group</div>
                        <div class="filter-item">Bugs</div>
                        <div class="filter-item">Details</div>
                        <div class="filter-item">Workspace</div>
                        <div class="filter-item">Task preview</div>
                        <div class="filter-item">Modals</div>
                        <div class="filter-item">For thursday</div>
                        <div class="filter-item">General</div>
                        <div class="filter-item">Task preview</div>
                        <div class="filter-item">Modals</div>
                        <div class="filter-item">For thursday</div>
                        <div class="filter-item">General</div>
                    </div>
                </div>
                <div class="filter-col">
                    <div class="title">Group</div>
                    <div class="content flex column">
                        <div class="filter-item">Top group</div>
                        <div class="filter-item">Bugs</div>
                        <div class="filter-item">Details</div>
                        <div class="filter-item">Workspace</div>
                        <div class="filter-item">Task preview</div>
                        <div class="filter-item">Modals</div>
                        <div class="filter-item">For thursday</div>
                        <div class="filter-item">General</div>
                        <div class="filter-item">Task preview</div>
                        <div class="filter-item">Modals</div>
                        <div class="filter-item">For thursday</div>
                        <div class="filter-item">General</div>
                    </div>
                </div>
                <div class="filter-col">
                    <div class="title">Group</div>
                    <div class="content flex column">
                        <div class="filter-item">Top group</div>
                        <div class="filter-item">Bugs</div>
                        <div class="filter-item">Details</div>
                        <div class="filter-item">Workspace</div>
                        <div class="filter-item">Task preview</div>
                        <div class="filter-item">Modals</div>
                        <div class="filter-item">For thursday</div>
                        <div class="filter-item">General</div>
                        <div class="filter-item">Task preview</div>
                        <div class="filter-item">Modals</div>
                        <div class="filter-item">For thursday</div>
                        <div class="filter-item">General</div>
                    </div>
                </div>
                <div class="filter-col">
                    <div class="title">Group</div>
                    <div class="content flex column">
                        <div class="filter-item">Top group</div>
                        <div class="filter-item">Bugs</div>
                        <div class="filter-item">Details</div>
                        <div class="filter-item">Workspace</div>
                        <div class="filter-item">Task preview</div>
                        <div class="filter-item">Modals</div>
                        <div class="filter-item">For thursday</div>
                        <div class="filter-item">General</div>
                        <div class="filter-item">Task preview</div>
                        <div class="filter-item">Modals</div>
                        <div class="filter-item">For thursday</div>
                        <div class="filter-item">General</div>
                    </div>
                </div>
                <div class="filter-col">
                    <div class="title">Group</div>
                    <div class="content flex column">
                        <div class="filter-item">Top group</div>
                        <div class="filter-item">Bugs</div>
                        <div class="filter-item">Details</div>
                        <div class="filter-item">Workspace</div>
                        <div class="filter-item">Task preview</div>
                        <div class="filter-item">Modals</div>
                        <div class="filter-item">For thursday</div>
                        <div class="filter-item">General</div>
                        <div class="filter-item">Task preview</div>
                        <div class="filter-item">Modals</div>
                        <div class="filter-item">For thursday</div>
                        <div class="filter-item">General</div>
                    </div>
                </div>
                <div class="filter-col">
                    <div class="title">Group</div>
                    <div class="content flex column">
                        <div class="filter-item">Top group</div>
                        <div class="filter-item">Bugs</div>
                        <div class="filter-item">Details</div>
                        <div class="filter-item">Workspace</div>
                        <div class="filter-item">Task preview</div>
                        <div class="filter-item">Modals</div>
                        <div class="filter-item">For thursday</div>
                        <div class="filter-item">General</div>
                        <div class="filter-item">Task preview</div>
                        <div class="filter-item">Modals</div>
                        <div class="filter-item">For thursday</div>
                        <div class="filter-item">General</div>
                    </div>
                </div>
                <div class="filter-col">
                    <div class="title">Group</div>
                    <div class="content flex column">
                        <div class="filter-item">Top group</div>
                        <div class="filter-item">Bugs</div>
                        <div class="filter-item">Details</div>
                        <div class="filter-item">Workspace</div>
                        <div class="filter-item">Task preview</div>
                        <div class="filter-item">Modals</div>
                        <div class="filter-item">For thursday</div>
                        <div class="filter-item">General</div>
                        <div class="filter-item">Task preview</div>
                        <div class="filter-item">Modals</div>
                        <div class="filter-item">For thursday</div>
                        <div class="filter-item">General</div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
export default {
    name: 'multi-filter-modal',
    props: {},
    data() {
        return {
            filterItems: null
        }
    },
    created() {
        this.filterItems = 46
        this.isFlittered = false

    },
    computed: {},
    methods: {},
    components: {}
}
</script>