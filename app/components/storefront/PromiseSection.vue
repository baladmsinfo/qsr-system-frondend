<template>
  <section class="promise-section mb-8">
    <div class="section-heading text-center mb-4">
      <span class="eyebrow-label d-block">{{ title || 'Our Promise' }}</span>
      <h2 v-if="subtitle" class="section-title">{{ subtitle }}</h2>
    </div>
    <div class="promise-grid">
      <div v-for="(item, i) in items" :key="i" class="promise-item">
        <span class="check">&#10003;</span>
        <p>{{ item }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string | null
  subtitle?: string | null
  items: string[]
}>()
</script>

<style scoped>
.promise-section {
  background: #241209;
  border-radius: 22px;
  padding: 36px 24px;
  color: #fdf8ee;
}
.eyebrow-label {
  text-transform: uppercase;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #e0b354;
  margin-bottom: 4px;
}
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #fdf8ee;
  margin: 0 auto;
  max-width: 420px;
}
.promise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
  margin-top: 20px;
}
.promise-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 14px;
  padding: 12px 14px;
}
.check {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e0b354, #c9962f);
  color: #241209;
  font-weight: 700;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.promise-item p {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.55;
  color: rgba(253, 248, 238, 0.88);
}
</style>
