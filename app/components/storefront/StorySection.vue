<template>
  <section class="story-section mb-8">
    <span class="eyebrow-label d-block">{{ title || 'Our Story' }}</span>
    <p v-if="body" class="story-body">{{ body }}</p>
    <div v-if="pillars.length" class="pillars">
      <span v-for="pillar in pillars" :key="pillar" class="pillar">{{ pillar }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string | null
  body?: string | null
  pillars: string[]
}>()
</script>

<style scoped>
.story-section {
  background: #fff;
  border: 1px solid rgba(107, 58, 26, 0.1);
  border-radius: 18px;
  padding: 24px;
}
.eyebrow-label {
  text-transform: uppercase;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #c9962f;
  margin-bottom: 8px;
}
.story-body {
  font-size: 14px;
  line-height: 1.75;
  color: #5c4b3b;
  margin: 0 0 14px;
}
.pillars {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.pillar {
  background: #f7ecd8;
  border: 1px solid #f0e1c2;
  border-radius: 30px;
  padding: 7px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #4a2712;
}
</style>
