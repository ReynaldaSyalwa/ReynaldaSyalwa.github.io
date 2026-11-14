<script setup>
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import MetaAdsSection from './components/MetaAdsSection.vue'
import IncomeChartSection from './components/IncomeChartSection.vue'
import DealsTableSection from './components/DealsTableSection.vue'
import PillarsSection from './components/PillarsSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import ContactSection from './components/ContactSection.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-200 selection:text-black">
    <Navbar />
    <main>
      <HeroSection />
      <div id="work">
        <MetaAdsSection />
      </div>
      <IncomeChartSection />
      <DealsTableSection />
      <PillarsSection />
      <TimelineSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
</template>
