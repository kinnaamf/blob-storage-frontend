<template>
  <Body class="min-h-screen bg-brand-bg">
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
  </Body>
</template>

<script setup lang="ts">

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all .1s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.card {
  @apply rounded-2xl border border-brand-border bg-brand-card;
}
</style>