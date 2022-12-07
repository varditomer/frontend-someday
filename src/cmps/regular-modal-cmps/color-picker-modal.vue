<template>
    <section class="color-picker">
        <span v-for="color in formattedColors" class="color-box" :style="color.style" @click="select(color.title)" :title="color.title">
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
        },
        colors: {
            tpye: Object,
            reqiored: true
        },
        name:{
            type: String,
            required: false
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
        formattedColors() {
            console.log(`this.colors[this.name]`, this.colors[this.name])
            const titles = Object.keys(this.colors)
            return this.colors[this.name].map((color, idx) => ({
                style: {backgroundColor: color.value},
                title: titles[idx]
            }))
        }
    },
    components: {
    },
}

</script>