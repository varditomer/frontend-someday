<template>
    <section v-if="prop" :style="getStyle" class="status-item">
        {{ prop }}
    </section>
    <section v-else> </section>
</template>

<script>
import { status } from '../../data/_board_DB.js'
import { colors } from '../../data/color-picker.js'
export default {
    name: 'statusPreview',
    props: {
        prop: String,
        users: Array
    },
    data() {
        return {
            status: status
        }
    },
    created() {
    },
    computed: {
        getStyle() {
            return {
                'background-color': colors[status[this.prop]],
                color: 'white'
            }
        }
    }
}
</script>