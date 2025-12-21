<template>
  <div v-if="result" class="result-display">
    <h3 class="result-title">Ergebnis</h3>

    <div class="results-grid">
      <!-- Agent -->
      <div v-if="result.agent" class="result-card agent-result">
        <div class="result-label">Agent</div>
        <div class="result-content">
          <img
            v-if="result.agent.fullPortrait"
            :src="result.agent.fullPortrait"
            :alt="result.agent.displayName"
            class="agent-portrait"
          />
          <div class="agent-info">
            <h4 class="result-name">{{ result.agent.displayName }}</h4>
            <p class="result-meta">{{ result.agent.role.displayName }}</p>
            <p class="agent-description">{{ result.agent.description }}</p>
          </div>
        </div>
      </div>

      <!-- Abilities -->
      <div v-if="result.abilities && result.abilities.length > 0" class="result-card">
        <div class="result-label">Abilities</div>
        <div class="abilities-grid">
          <div v-for="ability in result.abilities" :key="ability.slot" class="ability-card">
            <img
              v-if="ability.displayIcon"
              :src="ability.displayIcon"
              :alt="ability.displayName"
              class="ability-icon-large"
            />
            <div class="ability-info">
              <h5 class="ability-name">{{ ability.displayName }}</h5>
              <p class="ability-slot">{{ ability.slot }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Weapon -->
      <div v-if="result.weapon" class="result-card weapon-result">
        <div class="result-label">Waffe</div>
        <div class="result-content">
          <img
            v-if="result.weapon.displayIcon"
            :src="result.weapon.displayIcon"
            :alt="result.weapon.displayName"
            class="weapon-image"
          />
          <div class="weapon-info">
            <h4 class="result-name">{{ result.weapon.displayName }}</h4>
            <p class="result-meta">{{ result.weapon.category }}</p>
            <p v-if="result.weapon.shopData" class="weapon-cost">
              {{ result.weapon.shopData.cost }} Credits
            </p>
          </div>
        </div>
      </div>

      <!-- Map -->
      <div v-if="result.map" class="result-card map-result">
        <div class="result-label">Map</div>
        <div class="result-content">
          <img
            v-if="result.map.splash"
            :src="result.map.splash"
            :alt="result.map.displayName"
            class="map-splash"
          />
          <div class="map-info">
            <h4 class="result-name">{{ result.map.displayName }}</h4>
            <p class="result-meta">{{ result.map.siteCount }} Bomb Sites</p>
            <p class="map-location">{{ result.map.coordinates }}</p>
          </div>
        </div>
      </div>

      <!-- Shield -->
      <div v-if="result.shield" class="result-card shield-result">
        <div class="result-label">Rüstung</div>
        <div class="result-content shield-content">
          <div class="shield-info">
            <h4 class="result-name">{{ result.shield.displayName }}</h4>
            <p class="result-meta">{{ result.shield.cost }} Credits</p>
            <div class="shield-visual">
              <div
                v-for="n in getShieldBars(result.shield.type)"
                :key="n"
                class="shield-bar"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="no-result">
    <p class="text-muted">Klicke auf "Generieren", um ein zufälliges Ergebnis zu erhalten</p>
  </div>
</template>

<script setup lang="ts">
import { CategoryResult } from '@/stores/category'

interface Props {
  result: CategoryResult | null
}

defineProps<Props>()

function getShieldBars(type: 'Light' | 'Heavy' | 'None'): number {
  switch (type) {
    case 'Heavy':
      return 3
    case 'Light':
      return 2
    case 'None':
    default:
      return 0
  }
}
</script>

<style scoped>
.result-display {
  width: 100%;
}

.result-title {
  font-size: 2rem;
  color: var(--color-accent);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.results-grid {
  display: grid;
  gap: var(--spacing-xl);
}

.result-card {
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  transition: all var(--transition-base);
}

.result-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
  box-shadow: var(--shadow-accent);
}

.result-label {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-bottom: var(--spacing-md);
  font-weight: 700;
}

.result-content {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.result-name {
  font-size: 2rem;
  color: var(--color-text);
  margin-bottom: var(--spacing-xs);
}

.result-meta {
  font-size: 1rem;
  color: var(--color-muted);
  background: var(--color-card-dark);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  display: inline-block;
  margin-bottom: var(--spacing-sm);
}

/* Agent Specific */
.agent-result .result-content {
  flex-direction: column;
  text-align: center;
}

.agent-portrait {
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: contain;
  margin: 0 auto;
}

.agent-info {
  width: 100%;
}

.agent-description {
  color: var(--color-muted);
  line-height: 1.6;
  margin-top: var(--spacing-md);
}

/* Abilities */
.abilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-md);
}

.ability-card {
  background: var(--color-card-dark);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  text-align: center;
}

.ability-icon-large {
  width: 64px;
  height: 64px;
  object-fit: contain;
  margin: 0 auto var(--spacing-sm);
}

.ability-name {
  font-size: 1rem;
  color: var(--color-text);
  margin-bottom: var(--spacing-xs);
}

.ability-slot {
  font-size: 0.8rem;
  color: var(--color-muted);
}

/* Weapon Specific */
.weapon-result .result-content {
  flex-direction: column;
}

.weapon-image {
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: contain;
  margin: 0 auto;
}

.weapon-info {
  text-align: center;
}

.weapon-cost {
  font-size: 1.5rem;
  color: var(--color-accent);
  font-family: var(--font-primary);
  margin-top: var(--spacing-md);
}

/* Map Specific */
.map-result .result-content {
  flex-direction: column;
}

.map-splash {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
}

.map-info {
  text-align: center;
}

.map-location {
  color: var(--color-muted);
  font-size: 0.9rem;
  margin-top: var(--spacing-xs);
}

/* Shield Specific */
.shield-content {
  justify-content: center;
  flex-direction: column;
}

.shield-info {
  text-align: center;
}

.shield-visual {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  margin-top: var(--spacing-lg);
}

.shield-bar {
  width: 60px;
  height: 20px;
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover));
  border-radius: var(--radius-sm);
  box-shadow: 0 0 10px rgba(255, 70, 85, 0.5);
}

.no-result {
  padding: var(--spacing-2xl);
  text-align: center;
  background: var(--color-card);
  border-radius: var(--radius-lg);
  border: 2px dashed var(--color-border);
}
</style>
