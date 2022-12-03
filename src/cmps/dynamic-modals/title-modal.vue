<template>

    <section class='title-modal'>
        <p>{{ content }}</p>
        <div class="arrow-down"></div>
    </section>

</template>

<script>
export default {
    name: 'title-modal',
    props: {
        content: String,
    }
}
</script>