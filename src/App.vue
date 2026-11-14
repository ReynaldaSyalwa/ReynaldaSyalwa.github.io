<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import IncomeChartSection from './components/IncomeChartSection.vue'
import DealsTableSection from './components/DealsTableSection.vue'
import MetaAdsSection from './components/MetaAdsSection.vue'
import PillarsSection from './components/PillarsSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import ContactSection from './components/ContactSection.vue'
import Footer from './components/Footer.vue'
import ProofGalleryModal from './components/ProofGalleryModal.vue'

const isModalOpen = ref(false)
const modalCategory = ref('ads')

function handleOpenModal(category) {
  modalCategory.value = category || 'ads'
  isModalOpen.value = true
}

function handleCloseModal() {
  isModalOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-obsidian-950 text-zinc-100 selection:bg-growth-500 selection:text-obsidian-950 font-sans">
    <Navbar />
    <main>
      <HeroSection />
      <IncomeChartSection />
      <DealsTableSection @open-modal="handleOpenModal" />
      <MetaAdsSection @open-modal="handleOpenModal" />
      <PillarsSection />
      <TimelineSection />
      <ContactSection />
    </main>
    <Footer />

    <!-- Authentic Proof Lightbox Modal -->
    <ProofGalleryModal
      :isOpen="isModalOpen"
      :initialCategory="modalCategory"
      @close="handleCloseModal"
    />
  </div>
</template>
