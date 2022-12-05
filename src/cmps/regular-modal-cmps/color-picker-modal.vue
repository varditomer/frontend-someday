<template>
    <section class="color-picker">
        <span v-for="color in colors" class="color-box" :style="{  backgroundColor: color  }">
        </span>
    </section>
</template>

<script>
import { colors } from '../../data/color-picker.js'
export default {
    name: '',
    emits: ['updateColor'],
    props: {
        selectedColor: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
        }
    },
    created() {
        console.log(`this.priorities`, this.priorities)
    },
    methods: {
        pickColor(){
            
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