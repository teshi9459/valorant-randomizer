<template>
  <VButton
    :variant="copySuccess ? 'secondary' : 'ghost'"
    :class="{ 'share-success': copySuccess }"
    @click="handleShare"
  >
    <span v-if="copySuccess">✓ Link kopiert!</span>
    <span v-else>🔗 Teilen</span>
  </VButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VButton from './VButton.vue'

const emit = defineEmits<{
  share: []
}>()

const copySuccess = ref(false)

function handleShare() {
  emit('share')
}

// Allow parent to set success state
defineExpose({
  setSuccess: (success: boolean) => {
    copySuccess.value = success
  }
})
</script>

<style scoped>
.share-success {
  animation: successPulse 0.5s ease;
}

@keyframes successPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
