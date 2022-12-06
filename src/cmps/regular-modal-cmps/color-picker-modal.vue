<template>
    <section class="color-picker">
        <span v-for="color in colors" class="color-box" :style="{  backgroundColor: color  }" @click="select(color)">
        </span>
    </section>
</template>

<script>
import { groupColors , labelColors } from '../../data/color-picker.js'
export default {
    name: '',
    emits: ['updateSelection'],
    props: {
        selectedColor: {
            type: String,
            required: false,
        },
        idx :Number,
        target: {
            type: String,
            required: true
        }
    },
    data() {
        return {
        }
    },
    methods: {
        select(value){
            const colors= Object.keys(this.colors)
            const colorName = colors.find(key => this.colors[key] === value)
            this.$emit('updateSelection', this.idx, 'color', value)
            this.$emit('updateSelection', this.idx, 'colorName', colorName)
        }
    },
    computed: {
        colors() {
            return this.target === 'group'
                ? groupColors
                : labelColors
        }
    },
    components: {
    },
}

</script>