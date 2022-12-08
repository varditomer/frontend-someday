<template>
    <section class="color-picker">
        <span v-for="color in formattedColors" class="color-box" :style="color.style" @click="select(color.title)" :title="color.title">
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
        },
        idx :Number,
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
    mounted(){
        console.log(`colors`, colors)
        console.log(`this.name`, this.name)
    },
    methods: {
        select(value){
            const colors= Object.keys(colors)
            const colorName = colors.find(key => colors[key] === value)
            this.$emit('updateSelection', this.idx, 'color', value)
            this.$emit('updateSelection', this.idx, 'colorName', colorName)
        }
    },
    computed: {
        formattedColors() {
            // if (!this.name || colors) return
            console.log(`colors[this.name]`, colors)
            console.log(`this.name`, this.name)
            const titles = Object.keys(colors)
            return colors[this.name].map((color, idx) => ({
                style: {backgroundColor: color.value},
                title: titles[idx]
            }))
        }
    },
    components: {
    },
}

</script>