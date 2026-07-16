<template>
  <section class="philosophy-section mb-8 text-center">
    <span class="eyebrow-label d-block">{{ title || 'Our Philosophy' }}</span>
    <p class="creed">
      <span v-for="(line, i) in lines" :key="i">{{ line }}</span>
    </p>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string | null
  lines: string[]
}>()
</script>

<style scoped>
.philosophy-section {
  background: #f7ecd8;
  border-radius: 18px;
  padding: 28px 24px;
}
.eyebrow-label {
  text-transform: uppercase;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #c9962f;
  margin-bottom: 10px;
}
.creed {
  max-width: 480px;
  margin: 0 auto;
  font-family: 'Playfair Display', serif;
  font-size: 15px;
  line-height: 1.7;
  color: #2a1c10;
}
.creed span {
  display: block;
}
</style>
