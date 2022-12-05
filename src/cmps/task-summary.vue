<template>
    <li class="task-summary">
        <span class="empty-span"></span>
        <span class="empty-span"></span>
        <span class="empty-span"></span>
        <span class="empty-span"></span>
        <span class="empty-span overlay-span">
            <span class="border-overlay-span"></span>
        </span>
        <div class="summary-footer-title">
            <p v-for="cmp in cmpsOrder"  v-if="isCollapsed">{{cmp}}</p>
        </div>
        <section v-for="html in getHtmlSumData" v-html="(html)" class="footer-section flex center">
        </section>
        <span class="empty-fill-span"></span>
    </li>
</template>

<script>
import { colors } from '../data/color-picker.js'
import { labels } from '../data/_board_DB.js'
export default {
    name: '',
    props: {
        cmpsOrder: {
            type: Array,
            required: true
        },
        tasks: {
            type: Array,
            required: true
        },
        isCollapsed: {
            type: Boolean,
            required: false
        }
    },
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
        getHtmlSumData() {
            const summary = []
            this.cmpsOrder.map((column, idx) => {
                switch (column) {
                    case 'person':
                    case 'priority':
                    case 'status':
                    case 'label':
                    case 'timeline':
                        summary[idx] = {}
                        break
                    default: summary[idx] = 0
                }

                this.tasks.forEach(task => {
                    if (!task[column] || column === 'text' || column === 'link') return
                    switch (column) {
                        case 'person':
                            task.person.forEach(person => summary[idx][person._id] = person)
                            break
                        case 'priority':
                        case 'status':
                        case 'label':
                            const label = task[column]
                            if (label) {
                                if (!summary[idx][label]) summary[idx][label] = 0
                                summary[idx][label]++
                            }
                            break
                        case 'timeline':
                            if (!task.timline || !Object.keys(task.timline).length) return
                            const { start, end } = task.timeline
                            const startTime = (new Date([start.year, start.month, start.day])).getTime()
                            const endTime = (new Date([end.year, end.month, end.day])).getTime()

                            if (!summary.start || summary.start > startTime) summary[idx].start = startTime
                            if (!summary.end || summary.end > endTime) summary[idx].end = endTime
                            break
                        default:
                            if (task[column]) summary[idx] += +task[column]
                            break
                    }
                })

                switch (column) {
                    case 'person':
                        let persons = ''
                        for (let id in summary[idx]) {
                            const person = summary[idx][id]
                            persons += `<span class="task-avatar" style="
                            ${person.imgUrl?.length
                                    ? `background-image: url(${person.imgUrl})`
                                    : `backgroud-color: ${person.color || '#fff'}`}"
                            ${person.imgUrl
                                    ? 'class="cover"'
                                    : ''} 
                            title="${person.fullname}">
                            </span>`
                        }
                        summary[idx] = persons
                        break

                    case 'priority':
                    case 'status':
                    case 'label':
                        let labelsCount = 0
                        for (let label in summary[idx]) {
                            labelsCount += summary[idx][label]
                        }
                        let htmlStr = `<div class="label-progress" style="background-color: ">`
                        for (let label in summary[idx]) {
                            const width = 100 * (summary[idx][label] / labelsCount) + '%'
                            const backgroundColor = colors[labels[label]]
                            htmlStr += `<div class="label" style="width:${width}; background-color: ${backgroundColor || 'transparent'}"
                                    ></div>`
                        }
                        htmlStr += '</div>'
                        summary[idx] = htmlStr
                        break
                    case 'timeline':
                        summary[idx] = ''
                        break
                    case 'numbers':
                        const numbers = summary[idx].toLocaleString()
                        const numbersStr = `<div class="numbers-summary flex column center">
                            <p class="numbers-summary">${numbers}</p>
                            <p class="sum">sum</p> 
                            </div>`
                        summary[idx] = numbersStr

                        break
                    case 'text':
                    case 'date':
                    case 'link': summary[idx] = ''
                }

            })
            // color: $primary-blue
            //             //primary
            return summary
        }
    },
    components: {
    },
}
</script>