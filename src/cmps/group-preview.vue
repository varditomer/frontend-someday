<template>
    <section class='group-preview'>
        <div class="group-title flex align-center" :class="{minimized:!viewTasks}">
            <div class="options hidden flex center">
                <span @click="lineOptions" v-svg-icon="'fatMore'"></span>
            </div>
            <span class="group-arrow" v-svg-icon="'arrowDown'" @click="toggleTaskView"></span>
            <h4 v-html="group.title"></h4>
        </div>
        <task-list v-if="viewTasks" :tasks="group.tasks" :group="group" :cmpsOrder="cmpsOrder" :users="users" @saveTask="saveTask" @removeTask="removeTask"/>
    </section>
</template>
<script>
import taskList from './task-list.vue'
import {eventBus} from '../services/event-bus.service.js'
export default {
    name: 'group-preview',
    props: {
        group: Object,
        cmpsOrder: Array,
        users: Array
    },
    data(){
        return {
            viewTasks:true
        }
    },
    mounted(){
        eventBus.on('minimzed-groups', minimzeGroup => {
            this.viewTasks = !minimzeGroup
        })
    },
    methods: {
        toggleTaskView(){
            this.viewTasks = !this.viewTasks
        },
        saveTask(task){
            this.$emit('saveTask', task)
        },
        removeTask(task){
            this.$emit('removeTask', task)
        }
    },
    components: {
        taskList
    }
}
</script>