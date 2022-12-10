<!-- <template>
    <el-date-picker @blur="handleClose" popper-class="timeline-modal" type="daterange"
        range-separator="To" start-placeholder="Start Date" end-placeholder="End Date" teleported="false"
        :default-time="defaultTime" editable="true" v-model="timeLine"/>
</template> -->
<template>
    <div class="block">
        <el-date-picker @blur="handleClose" v-model="value2" type="daterange" start-placeholder="Start Date"
            end-placeholder="End Date" :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]" teleported="false"
            @click="printInput" />
    </div>
</template>

<script>
import { ref } from 'vue'
// import { ref } from 'vue'

// const value1 = ref('')
export default {
    name: '',
    props: {
        content: {
            type: Object
        },
        defaultTime: {
            type: Array,
            required: true
        },
    },
    created() {
        // this.timeLine = ref('')
    },

    data() {
        return {
            value2: ref('')
            // timeLine: [],
        }
    },
    methods: {
        printInput() {
            console.log(`this.value2:`, this.value2)
        }
    },
    computed: {
    },
    components: {
    },
    unmounted() {
        console.log(`this.timeLine:`, this.value2)
    },
    watch: {
        value2: {
            handler() {
                if (this.value2!=='') {

                    this.$emit('closeModal')
                    console.log(`this.value2:`, this.value2)
                }
            },
            immediate: true,
        },
    },
}
</script>

<style>
.timeline-modal {
    z-index: 10000;
    left: 50%;
}
</style>
