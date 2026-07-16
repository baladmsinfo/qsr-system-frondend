<template>
  <section class="testimonials-section mb-8">
    <span class="eyebrow-label d-block text-center">{{ title || 'What Our Customers Say' }}</span>
    <div class="testimonial-list">
      <div v-for="(t, i) in testimonials" :key="i" class="testimonial-chip">
        <p class="quote">&ldquo;{{ t.quote }}&rdquo;</p>
        <span v-if="t.author" class="author">{{ t.author }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Testimonial } from '@/types/site'

defineProps<{
  title?: string | null
  testimonials: Testimonial[]
}>()
</script>

<style scoped>
.eyebrow-label {
  text-transform: uppercase;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #c9962f;
  margin-bottom: 14px;
}
.testimonial-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
.testimonial-chip {
  background: #fff;
  border-left: 3px solid #c9962f;
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: 0 6px 18px rgba(74, 39, 18, 0.08);
}
.quote {
  font-size: 13px;
  font-weight: 500;
  color: #331b0d;
  margin: 0 0 6px;
  line-height: 1.5;
}
.author {
  font-size: 11.5px;
  color: #8a7864;
}
</style>
