<template>
  <article>
    <!-- <h1>{{ article.title }}</h1>
    <p>{{ article.description }}</p>
    <nuxt-content :document="article" /> -->
  </article>
</template>

<script>
export default {
  layout: 'DashboardLayout',
  asyncData({ params, redirect }) {
    const slug = params.slug
    console.log(`slug = ${slug}`)
    // const response = await this.$axios.get(slug)
  },
}
</script>

<style>
.nuxt-content h2 {
  font-weight: bold;
  font-size: 28px;
}
.nuxt-content h3 {
  font-weight: bold;
  font-size: 22px;
}
.nuxt-content p {
  margin-bottom: 20px;
}
</style>
