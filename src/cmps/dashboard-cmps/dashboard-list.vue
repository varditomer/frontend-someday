<template>

    <section class='dashboard-container'>


        <div class="bar-chart">
            <BarChart :chartData="barChartData" :options="barChartOptions" />
        </div>

        <div class="right-dashboard"></div>


        <div class="statuses-dashboard">
            <div class="statuses-title">
                <span v-svg-icon="'project'"></span>
                <h1>Project estimate</h1>
            </div>
            <div class="card-container">
                <div class="card">
                    <h1 class="card-title">Unattained</h1>
                    <h2 class="card-count">14</h2>
                </div>
                <div class="card">
                    <h1 class="card-title">Working on it</h1>
                    <h2 class="card-count">8</h2>
                </div>
                <div class="card">
                    <h1 class="card-title">Stuck</h1>
                    <h2 class="card-count">4</h2>
                </div>
                <div class="card">
                    <h1 class="card-title">Default</h1>
                    <h2 class="card-count">7</h2>
                </div>
                <div class="card">
                    <h1 class="card-title">Done</h1>
                    <h2 class="card-count">25</h2>
                </div>
            </div>
        </div>


    </section>

</template>
<script>
import { BarChart } from 'vue-chart-3'
import { DoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
    name: 'dashboard-list',
    props: {},
    components: { BarChart, DoughnutChart },
    data() {
        return {
            barChartData: {
                labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
                datasets: [
                    {
                        barThickness: 60,
                        data: [30, 40, 60, 70, 5],
                        backgroundColor: [
                            'red',
                            '#77CEFF',
                            '#0079AF',
                            '#123E6B',
                            '#97B0C4',
                            '#A5C8ED',
                        ],
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
            doughnutChartData: {
                labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
                datasets: [
                    {
                        barThickness: 60,
                        data: [30, 40, 60, 70, 5],
                        backgroundColor: [
                            'red',
                            '#77CEFF',
                            '#0079AF',
                            '#123E6B',
                            '#97B0C4',
                            '#A5C8ED',
                        ],
                    },
                ],
            },
            doughnutChartOptions: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },

        }
    },


}
</script>