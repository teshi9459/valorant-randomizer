<template>
  <div class="agent-filter">
    <h3 class="filter-title">Agent Filter</h3>

    <div class="filter-section">
      <VCheckbox v-model="localFilters.starterOnly">
        Nur Starter Agents
      </VCheckbox>
    </div>

    <div class="filter-section">
      <h4 class="section-title">Rollen</h4>
      <div class="role-options">
        <label v-for="role in roles" :key="role" class="role-option">
          <input
            type="checkbox"
            :value="role"
            :checked="isRoleSelected(role)"
            @change="toggleRole(role)"
          />
          <span class="role-custom">{{ role }}</span>
        </label>
      </div>
    </div>

    <div class="filter-section">
      <VCheckbox v-model="localFilters.abilitiesEnabled">
        Abilities randomisieren
      </VCheckbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import VCheckbox from '@/components/common/VCheckbox.vue'
import { AgentFilters } from '@/types/filters'

interface Props {
  modelValue: AgentFilters
  abilitiesEnabled?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [filters: AgentFilters]
  'update:abilitiesEnabled': [enabled: boolean]
}>()

const roles = ['Controller', 'Duelist', 'Initiator', 'Sentinel'] as const

const localFilters = ref<AgentFilters & { abilitiesEnabled: boolean }>({
  roles: props.modelValue.roles,
  starterOnly: props.modelValue.starterOnly,
  abilitiesEnabled: props.abilitiesEnabled || false
})

watch(localFilters, (newFilters) => {
  emit('update:modelValue', {
    roles: newFilters.roles,
    starterOnly: newFilters.starterOnly
  })
  emit('update:abilitiesEnabled', newFilters.abilitiesEnabled)
}, { deep: true })

function isRoleSelected(role: string): boolean {
  return localFilters.value.roles?.includes(role as any) || false
}

function toggleRole(role: string) {
  const currentRoles = localFilters.value.roles || []
  if (currentRoles.includes(role as any)) {
    localFilters.value.roles = currentRoles.filter(r => r !== role) as any
    if (localFilters.value.roles.length === 0) {
      localFilters.value.roles = null
    }
  } else {
    localFilters.value.roles = [...currentRoles, role] as any
  }
}
</script>

<style scoped>
.agent-filter {
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}

.filter-title {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-accent);
}

.filter-section {
  margin-bottom: var(--spacing-md);
}

.filter-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 0.9rem;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.role-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
}

.role-option {
  display: flex;
  cursor: pointer;
  user-select: none;
}

.role-option input[type='checkbox'] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.role-custom {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-card-dark);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-muted);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all var(--transition-base);
  text-align: center;
  width: 100%;
}

.role-option input:checked + .role-custom {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-card-dark);
}

.role-option:hover .role-custom {
  border-color: var(--color-accent);
}

@media (max-width: 768px) {
  .role-options {
    grid-template-columns: 1fr;
  }
}
</style>
