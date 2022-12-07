<template>
    <li class="task-summary">
        <section class="static">
            <div class="static-overlay">
                <div></div>
            </div>
        </section>
        <section class="dynamic">
            
            <section v-for="html in getHtmlSumData" v-html="(html)" class="footer-section flex center"></section>
        </section>
    </li>
</template>

<script>
import { groupColors } from '../data/color-picker.js'
import { labelTitles } from '../data/_labelsDB.js'
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
        },
        groupColor: {
            type: String,
            required: false
        },
        colors: {
            type: Object,
            reqiured: true
        }
    },
    data() {
        return {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
                            if (!task.timeline || !Object.keys(task.timeline).length) return
                            const { start, end } = task.timeline
                            const startTime = (new Date([start.year, start.month + 1, start.day])).getTime()
                            const endTime = (new Date([end.year, end.month + 1, end.day])).getTime()
                            if (!summary[idx].start || summary[idx].start > startTime) summary[idx].start = startTime
                            if (!summary[idx].end || summary.end > endTime) summary[idx].end = endTime
                            break
                        default:
                            if (task[column]) summary[idx] += +task[column]
                            break
                    }
                })

                let htmlStr = ''
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
                        htmlStr = `<div class="label-progress" style="background-color: ">`
                        for (let label in summary[idx]) {
                            const width = 100 * (summary[idx][label] / labelsCount) + '%'
                            const labelObj = this.colors[column]
                                ? this.colors[column].find(anyLabel => anyLabel._id === label)
                                : null
                            const backgroundColor = labelObj?.value || 'white'
                            htmlStr += `<div class="label" style="width:${width}; background-color: ${backgroundColor || 'transparent'}"
                                    ></div>`
                        }
                        htmlStr += '</div>'
                        summary[idx] = htmlStr
                        break
                    case 'timeline':
                        const { start, end } = summary[idx]
                        const totalTimeDiff = end - start
                        const timeElapsed = Date.now() - start
                        const width = timeElapsed / totalTimeDiff > 1
                            ? '100 %'
                            : timeElapsed / totalTimeDiff > 0
                                ? 100 * timeElapsed / totalTimeDiff + '%'
                                : 0
                        htmlStr = `<div class="timeline">
                                    <div class="elapsed" style="background-color:${this.groupColor}; width:${width}">
                                    </div>
                                <p>${this.months[(new Date(start)).getMonth()]} ${(new Date(start)).getDate()}, '${(new Date(start)).getYear() % 100} - 
                                    ${this.months[(new Date(end)).getMonth()]} ${(new Date(end)).getDate()}, '${(new Date(end)).getYear() % 100}</p>
                            </div>`
                        summary[idx] = htmlStr
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