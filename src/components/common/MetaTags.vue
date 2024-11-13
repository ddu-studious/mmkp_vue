<template>
  <vue-meta>
    <template v-slot:title>{{ title }} - {{ siteName }}</template>
    <template v-slot:meta>
      <meta name="description" :content="description">
      <meta property="og:title" :content="`${title} - ${siteName}`">
      <meta property="og:description" :content="description">
      <meta property="og:type" content="website">
      <meta property="og:url" :content="currentUrl">
      <meta property="og:image" :content="image">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" :content="`${title} - ${siteName}`">
      <meta name="twitter:description" :content="description">
      <meta name="twitter:image" :content="image">
    </template>
  </vue-meta>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  image?: string
}

const props = withDefaults(defineProps<Props>(), {
  image: '/og-image.jpg'
})

const siteName = import.meta.env.VITE_APP_TITLE
const currentUrl = window.location.href
</script> 