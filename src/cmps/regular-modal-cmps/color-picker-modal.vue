<template>
    <section class="color-picker">
        <span v-for="color in colors" class="color-box" :style="{  backgroundColor: color  }" @click="select(color)">
        </span>
    </section>
</template>

<script>
import { colors } from '../../data/color-picker.js'
export default {
    name: '',
    emits: ['updateSelection'],
    props: {
        selectedColor: {
            type: String,
            required: false,
        }
    },
    data() {
        return {
        }
    },
    methods: {
        select(value){
            this.$emit('updateSelection', value)
        }
    },
    computed: {
        colors() {
            return colors
        }
    },
    components: {
    },
}

</script>