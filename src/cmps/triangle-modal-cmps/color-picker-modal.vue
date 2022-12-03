<template>
    <section class="color-picker">
        <span v-for="priority in getFormattedPrioities" :class="priority.pClass" :style="priority.style"
            :title="priority.title">
        </span>
    </section>
</template>

<script>
export default {
    name: '',
    emits: ['updateColor'],
    props: {
    },
    data() {
        return {
            color: ''
        }
    },
    created() {
        console.log(`this.priorities`, this.priorities)
    },
    methods: {
        pickColor
    },
    computed: {
        getFormattedPrioities() {
            // return this.priorities.map(priority => {
            //     const pClass = 'label'
            //     const style = { backgroundColor: priority.color }
            //     const { title } = priority
            //     return { title, pClass, style }
            // })
        },
        getFormattedColors() {
            const colorArr = []
            for (let color in colors) {
                const name = color.split('-').map(colName => {
                    return colName.charAt(0).toUpperCase() + colName.slice(1).toLowerCase()
                }).join(' ')
                colorArr.push({
                    name,
                    value: colors[color]
                })
            }
        }
    },
    components: {
    },
}

const colors = {
    'dark_indigo': '#401694',
    'egg_yolk': '#ffcb00',
    'bright-green': '#9cd326',
    'sofia_pink': '#ff158a',
    'berry': '#7e3b8a',
    'royal': '#2B76E5',
    'jade': '#03c875',
    'grass_green': '#037f4c',
    'dark-purple': '#784bd1',
    'bubble': '#faa1f1',
    'aqua': '#00d1d1',
    'teal': '#175A63',
    'navy': '#225091',
    'peach': '#ffadad',
    'dark-orange': '#ff642e',
    'indigo': '#5559df',
    'river': '#68a1bd',
    'sky': '#A1E3F6',
    'lipstick': '#ff5ac4',
    'purple': '#a25ddc',
    'chili-blue': '#66ccff',
    'stuck-red': '#e2445c',
    'orange': '#fdab3d',
    'live_blue': '#009aff',
    'sunset': '#ff7575',
}
</script>