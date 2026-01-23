<template>
  <div class="home-view">
    <div class="hero">
      <h1 class="hero-title">VALORANT RANDOMIZER</h1>
      <p class="hero-subtitle">Wähle einen Modus und randomisiere Agents, Waffen, Maps und mehr!</p>
    </div>

    <div class="modes-grid">
      <router-link to="/lobby" class="mode-card">
        <div class="mode-icon">👥</div>
        <h2>Lobby Mode</h2>
        <p>
          Füge Spieler zu Teams hinzu (5v5) und randomisiere für jeden Spieler Agents, Waffen und mehr.
          Perfekt für Custom Games!
        </p>
        <div class="mode-cta">Starten →</div>
      </router-link>

      <router-link to="/rounds" class="mode-card">
        <div class="mode-icon">🎯</div>
        <h2>Rounds Mode</h2>
        <p>
          Generiere eine Liste von Runden (1-99) mit zufälligen Loadouts.
          Markiere abgeschlossene Runden und tracke deinen Fortschritt.
        </p>
        <div class="mode-cta">Starten →</div>
      </router-link>

      <router-link to="/category" class="mode-card">
        <div class="mode-icon">🎲</div>
        <h2>Category Mode</h2>
        <p>
          Wähle einfach eine oder mehrere Kategorien und erhalte sofort ein zufälliges Ergebnis.
          Schnell und unkompliziert!
        </p>
        <div class="mode-cta">Starten →</div>
      </router-link>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Lade Valorant Daten...</p>
    </div>

    <div v-if="error" class="error-state">
      <p>❌ Fehler beim Laden der Daten: {{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useValorantDataStore } from '@/stores/valorant-data'

const valorantData = useValorantDataStore()
const { loading, error } = storeToRefs(valorantData)
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-2xl) 0;
}

.hero-title {
  font-size: 4rem;
  color: var(--color-accent);
  margin-bottom: var(--spacing-md);
  text-shadow: 0 0 30px rgba(255, 70, 85, 0.5);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--color-muted);
  max-width: 600px;
  margin: 0 auto;
}

.modes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.mode-card {
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  transition: all var(--transition-base);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.mode-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-8px);
  box-shadow: var(--shadow-accent);
}

.mode-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-sm);
}

.mode-card h2 {
  font-size: 2rem;
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
}

.mode-card p {
  color: var(--color-muted);
  line-height: 1.6;
  flex: 1;
  margin-bottom: var(--spacing-md);
}

.mode-cta {
  font-family: var(--font-primary);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.mode-card:hover .mode-cta {
  color: var(--color-accent-hover);
}

.loading-state,
.error-state {
  text-align: center;
  padding: var(--spacing-xl);
  background: var(--color-card);
  border-radius: var(--radius-lg);
  margin-top: var(--spacing-xl);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto var(--spacing-md);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .modes-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .mode-card h2 {
    font-size: 1.5rem;
  }
}
</style>
