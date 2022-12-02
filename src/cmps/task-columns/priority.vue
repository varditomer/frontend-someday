<template>
    <section class="priority">
        <span :style="getStyle">{{ prop }}</span>
    </section>
</template>

<script>
import { priority } from '../../data/_board_DB.js'
import { colors } from '../../data/color-picker.js'
export default {
    name: '',
    props: {
        prop: String,
    },
    methods: {
    },
    computed: {
        getStyle() {
            return {
                'background-color': colors[priority[this.prop]],
                color: 'white'
            }
        }
    },
}
</script>