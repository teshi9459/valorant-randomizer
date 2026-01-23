<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo">
          <h1>VALORANT RANDOMIZER</h1>
        </router-link>

        <nav class="nav">
          <router-link to="/lobby" class="nav-link">Lobby</router-link>
          <router-link to="/rounds" class="nav-link">Rounds</router-link>
          <router-link to="/category" class="nav-link">Category</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-header {
  background: var(--color-card-dark);
  border-bottom: 2px solid var(--color-accent);
  padding: var(--spacing-md) 0;
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  box-shadow: var(--shadow-md);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo h1 {
  font-size: 1.75rem;
  color: var(--color-accent);
  letter-spacing: 0.1em;
  margin: 0;
}

.logo:hover h1 {
  color: var(--color-accent-hover);
}

.nav {
  display: flex;
  gap: var(--spacing-lg);
}

.nav-link {
  font-family: var(--font-primary);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  transition: all var(--transition-base);
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: width var(--transition-base);
}

.nav-link:hover {
  color: var(--color-text);
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 80%;
}

.nav-link.router-link-active {
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .logo h1 {
    font-size: 1.25rem;
  }

  .nav {
    gap: var(--spacing-sm);
  }

  .nav-link {
    font-size: 0.9rem;
    padding: var(--spacing-xs) var(--spacing-sm);
  }
}
</style>
