<template>
    <section v-if="!isKanban" class="labels" @click="clickToEdit">
        <span class="label-name" :style="getLabel.style">{{ getLabel.title === 'Default' ? '' : getLabel.title }}</span>
        <triangle-modal v-if="getLabel && show" :content="content" :name="name" @updateTask="updateTask"
            @hideModal="(show=false)" :cmp="'task-label-modal'" :colors="colors" />
    </section>
</template>

<script>
import triangleModal from '../dynamic-modals/triangle-modal.vue'
export default {
    name: 'labels',
    emits: ['updateTask', 'editing'],
    props: {
        content: String,
        name: String,
        colors: {
            type: Object,
            reqiured: true
        },
        isKanban: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        updateTask(labelObj) {
            this.$emit('updateTask', labelObj)
            setTimeout(() => this.show = false, 1)
        },
        clickToEdit() {
            this.show = true
            this.$emit('editing')
        }
    },
    computed: {
        getLabel() {
            if (!this.colors[this.name]) return {
                style: {
                    'backgrond-colorr': 'white',
                    color: 'white'
                },
                title: ''
            }
            const label = this.colors[this.name].find(label => label._id === this.content)
            return {
                style: {

                    'background-color': label?.value || '#c4c4c4',
                    color: 'white'
                },
                title: label?.title || '',

            }
        }
    },
    components: {
        triangleModal
    }
}
</script>