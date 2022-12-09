<template>
    <section class='multi-filter-column'>
        <div class="filter-col">
            <div class="title">{{ column }}</div>
            <div class="content flex column">
                <div v-if="column === 'person'" v-for="item in formattedData" class="filter-item person"
                    @click="setSubFilter(item)">
                    <div class="filter-option">
                        <img :src="item.imgUrl" alt="">
                        <span>{{ item.fullname }}</span>
                    </div>
                    <div class="filter-counter">
                        22
                    </div>
                </div>
                <div v-else v-for="item in formattedData" class="filter-item" @click="setSubFilter(item)">
                    <div class="filter-option">
                        <span>
                            {{ item }}
                        </span>    
                    </div>
                    <div class="filter-counter">
                        <span>4</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'multi-filter-column',
    emits: ['setSubFilter'],
    props: {
        column: {
            type: String,
            required: true
        },
        data: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            multiFilter: []
        }
    },
    created() {
    },
    computed: {
        formattedData() {
            console.log(`this.column:`, this.column)

            // console.log(`this.data.filter(item => item):`, this.data.filter(item => item))
            return this.data.filter(item => item)
        }
    },
    methods: {
        setSubFilter(item) {
            const idx = this.multiFilter.indexOf('Group')
            if (idx === -1) this.multiFilter.push(item)
            else this.multiFilter.splice(idx, 1)
            this.$emit('setSubFilter', this.multiFilter, this.column)
        },
        formattedPersons() {
            if (!this.content?.length) return []
            return this.content.reduce((userArr, person) => {
                const { _id, fullname } = person
                const user = this.additionalDb.find(anyUser => anyUser._id === _id)
                if (!user) return userArr
                const style = user.imgUrl
                    ? `background-image: url(${user.imgUrl})`
                    : `backgroud-color: ${user.color || '#fff'}`
                const pic = user.imgUrl
                    ? true
                    : false
                const initials = user.fullname.split(' ').map(name => name.charAt(0).toUpperCase()).join('')
                userArr.push({ _id, style, initials, fullname, pic })
                return userArr

            }, [])
        }
    },
    components: {}
}
</script>
