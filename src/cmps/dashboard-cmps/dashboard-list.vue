<template>

    <section v-if="Object.keys(data).length" class='dashboard-container'>


        <div class="bar-chart">
            <div class="bar-chart-title">
                <span v-svg-icon="'priorities'"></span>
                <h1>Tasks status</h1>
            </div>
            <BarChart :chartData="barChartData" :options="barChartOptions" />
        </div>

        <div class="right-dashboard">
            <div class="pie-chart">
                <div class="pie-chart-title">
                    <span v-svg-icon="'tasks'"></span>
                    <h1>Tasks per member</h1>
                </div>
                <PieChart :chartData="pieChartData" :options="pieChartOptions" />
            </div>
            <div class="total-count">
                <div class="total-div">
                    <span v-svg-icon="'quest'"></span>
                    <h1>Total tasks</h1>
                    <p>{{ totalTasksCount }}</p>
                </div>
                <span class="separator"></span>
                <div class="total-div">
                    <span v-svg-icon="'workspace'"></span>
                    <h1>Total groups</h1>
                    <p>{{ Object.keys(data.group).length }}</p>
                </div>
                <span class="separator"></span>
                <div class="total-div">
                    <span v-svg-icon="'largePerson'"></span>
                    <h1>Total members</h1>
                    <p>{{ Object.keys(data.person).length }}</p>
                </div>
            </div>
        </div>

        <div class="statuses-dashboard">
            <div class="statuses-title">
                <span v-svg-icon="'project'"></span>
                <h1>Project estimate</h1>
            </div>
            <div class="card-container" v-if="data">
                <div class="card" v-if="priorities.length" v-for="priority in priorities"
                    :style="`background-color:${priority.value}`">
                    <h1 class="card-title">{{ priority.title }}</h1>
                    <h2 class="card-count">{{ priority.count }}</h2>
                </div>
            </div>
        </div>


    </section>

</template>
<script>
import { BarChart } from 'vue-chart-3'
import { PieChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { boardService } from '../../services/board.service.js'
import { colorService } from '../../services/color.service.js'
import { userService } from '../../services/user.service.js'

Chart.register(...registerables)

export default {
    name: 'dashboard-list',
    props: {},
    components: { BarChart, PieChart },
    data() {
        return {
            barChartData: {
                labels: [],
                datasets: [
                    {
                        barThickness: 60,
                        data: [],
                        backgroundColor: [],
                    },
                ],
            },
            barChartOptions: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
            pieChartData: {
                labels: [],
                datasets: [
                    {
                        barThickness: 60,
                        data: [],
                        backgroundColor: [
                            '#77CEFF',
                            '#0079AF',
                            '#123E6B',
                            '#97B0C4',
                            '#A5C8ED',
                        ],
                    },
                ],
            },
            pieChartOptions: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
            priorities: [],
            totalTasksCount: 0

        }
    },
    computed: {
        stats() {
            return this.$store.getters.stats
        },
        board() {
            return this.$store.getters.board
        },
        data() {
            return boardService.getDashboardData(this.board)
        },

    },
    methods: {
        setLabels() {
            const data = this.data
            for (let statusId in data.status) {
                const label = colorService.getLabelById('status', statusId)
                if (!label) return
                const { title, value } = label
                label.count = data.status[statusId]
                this.barChartData.labels.unshift(title)
                this.barChartData.datasets[0].backgroundColor.unshift(value)
                this.barChartData.datasets[0].data.unshift(label.count)
            }
        },
        setPriorities() {
            const data = this.data
            const priorities = []
            for (let priorityId in data.priority) {
                const priority = colorService.getLabelById('priority', priorityId)
                const { title, value } = priority
                const count = data.priority[priorityId]
                const p = { title, value, count }
                priorities.push(p)
            }
            this.priorities = priorities
        },
        setTasksPerMember() {
            const users = userService.getUsers()
            const data = this.data
            for (let personId in data.person) {
                const { fullname } = users.find(u => u._id === personId)
                this.pieChartData.labels.unshift(fullname)
                this.pieChartData.datasets[0].data.unshift(data.person[personId].total)

            }
        },
        getTotalTasks() {
            let sum = 0
            for (let g in this.data.group) {
                sum += this.data.group[g].total
            }
            this.totalTasksCount = sum
        }
    },
    created() {
        setTimeout(() => {
            this.setLabels()
            this.setPriorities()
            this.getTotalTasks()
            this.setTasksPerMember()
        }, 200)
    }

}
</script>