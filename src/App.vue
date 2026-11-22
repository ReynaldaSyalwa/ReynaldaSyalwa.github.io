<script setup>
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import MarqueeTicker from './components/MarqueeTicker.vue'
import AboutSection from './components/AboutSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import WorkGallery from './components/WorkGallery.vue'
import BrandSection from './components/BrandSection.vue'
import GrowthSection from './components/GrowthSection.vue'
import AdsSection from './components/AdsSection.vue'
import ContactFooter from './components/ContactFooter.vue'
</script>

<template>
  <div class="grain min-h-screen bg-cream font-sans text-ink">
    <Navbar />

    <main class="relative z-10">
      <HeroSection />
      <MarqueeTicker />

      <AboutSection />
      <ExperienceSection />
      <SkillsSection />

      <WorkGallery />
      <BrandSection />
      <GrowthSection />
      <AdsSection />

      <ContactFooter />
    </main>
  </div>
</template>
