<template>
  <div class="round-input">
    <VInput
      v-model="localCount"
      type="number"
      label="Anzahl der Runden"
      :min="1"
      :max="99"
      placeholder="13"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import VInput from '@/components/common/VInput.vue'

interface Props {
  modelValue: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const localCount = ref(props.modelValue)

watch(localCount, (newValue) => {
  const count = Math.max(1, Math.min(99, Number(newValue)))
  emit('update:modelValue', count)
})
</script>

<style scoped>
.round-input {
  max-width: 300px;
}
</style>
