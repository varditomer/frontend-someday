<template>
    <section class>
        <HotelDatePicker></HotelDatePicker>
    </section>
</template>

<script>
import HotelDatePicker from 'vue-hotel-datepicker'
import 'vue-hotel-datepicker/dist/vueHotelDatepicker.css'

export default {
    name: '',
    props: {
        content: Object
    },
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
    components: {
        HotelDatePicker
    },
}
</script>