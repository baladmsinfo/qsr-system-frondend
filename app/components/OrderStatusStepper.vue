<template>
  <div>
    <v-alert v-if="status === 'CANCELLED'" type="error" variant="tonal" class="mb-4">
      This order was cancelled.
    </v-alert>

    <div v-else class="d-flex flex-column">
      <div v-for="(step, idx) in steps" :key="step.value" class="d-flex ga-3">
        <div class="d-flex flex-column align-center">
          <v-avatar :color="stateColor(idx)" size="34" class="step-avatar" :class="{ 'step-avatar--current': idx === currentIndex }">
            <v-icon color="white" size="18">{{ stateIcon(idx) }}</v-icon>
          </v-avatar>
          <div v-if="idx < steps.length - 1" class="connector" :class="{ done: idx < currentIndex }" />
        </div>
        <div class="pb-6">
          <div class="font-weight-bold" :class="idx <= currentIndex ? '' : 'text-medium-emphasis'">{{ step.label }}</div>
          <div class="text-caption text-medium-emphasis">{{ step.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ status: { type: String, required: true } })

const steps = [
  { value: 'PLACED', label: 'Order Placed', description: 'Waiting for the restaurant to accept' },
  { value: 'ACCEPTED', label: 'Accepted', description: 'Your order has been accepted' },
  { value: 'PREPARING', label: 'Preparing', description: 'The kitchen is preparing your food' },
  { value: 'READY', label: 'Ready', description: 'Your order is ready to be served' },
  { value: 'SERVED', label: 'Served', description: 'Enjoy your meal!' },
  { value: 'COMPLETED', label: 'Completed', description: 'Bill settled - thank you!' },
]

const currentIndex = computed(() => steps.findIndex((s) => s.value === props.status))

function stateColor(idx) {
  if (idx < currentIndex.value) return 'secondary'
  if (idx === currentIndex.value) return 'primary'
  return 'grey-lighten-1'
}
function stateIcon(idx) {
  if (idx < currentIndex.value) return 'mdi-check'
  if (idx === currentIndex.value) return 'mdi-circle-medium'
  return 'mdi-circle-outline'
}
</script>

<style scoped>
.connector {
  width: 3px;
  flex: 1;
  min-height: 24px;
  background: #F0E4DC;
  border-radius: 2px;
}
.connector.done {
  background: rgb(var(--v-theme-secondary));
}
.step-avatar {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}
.step-avatar--current {
  box-shadow: 0 0 0 4px rgba(255, 87, 34, 0.18);
}
</style>
