<template>
  <div>
    <div class="hero-media" :style="mediaStyle" role="img" :aria-label="`${site.name} cover photo`">
      <div class="hero-ring hero-ring--1" />
      <div class="hero-ring hero-ring--2" />
      <div class="hero-bean hero-bean--1" />
      <div class="hero-bean hero-bean--2" />
    </div>

    <v-container class="px-4 hero-overlap">
      <div class="brand-card pa-4 pa-sm-5 mb-6">
        <div class="d-flex align-start ga-3 mb-3">
          <v-avatar v-if="site.logoUrl" size="64" class="storefront-logo flex-shrink-0">
            <v-img :src="site.logoUrl" :alt="`${site.name} logo`" cover />
          </v-avatar>
          <div class="flex-grow-1 min-width-0">
            <span class="eyebrow-label">{{ content?.heroTag || site.companyType }}</span>
            <h1 class="brand-name text-truncate">{{ site.name }}</h1>
            <p v-if="content?.heroHeadline" class="hero-headline mb-0">{{ content.heroHeadline }}</p>
          </div>
        </div>

        <p v-if="content?.heroSubtext || site.description" class="text-body-2 text-medium-emphasis mb-4">
          {{ content?.heroSubtext || site.description }}
        </p>

        <CuisineTagList :tags="site.cuisineTags" />

        <div class="d-flex flex-wrap ga-2 mt-4">
          <v-btn v-if="primaryBranch" color="primary" :to="`/browse/${primaryBranch.id}`">
            <v-icon start size="18">mdi-silverware-fork-knife</v-icon>
            View menu
          </v-btn>
          <v-btn variant="tonal" color="primary" to="/locations">
            <v-icon start size="18">mdi-map-marker-outline</v-icon>
            Locations
          </v-btn>
          <v-btn variant="text" color="primary" to="/contact">
            <v-icon start size="18">mdi-information-outline</v-icon>
            Contact
          </v-btn>
        </div>
      </div>

      <div v-if="quickFacts.length" class="facts-grid mb-8">
        <div v-for="fact in quickFacts" :key="fact.label" class="fact-card">
          <span class="fact-icon" :class="`fact-icon--${fact.color}`">
            <v-icon size="18" color="white">{{ fact.icon }}</v-icon>
          </span>
          <span class="fact-label">{{ fact.label }}</span>
        </div>
      </div>

      <PromiseSection
        v-if="content?.promiseItems?.length"
        :title="content.promiseTitle"
        :subtitle="content.promiseSubtitle"
        :items="content.promiseItems"
      />

      <StorySection
        v-if="content?.storyBody"
        :title="content.storyTitle"
        :body="content.storyBody"
        :pillars="content.storyPillars"
      />

      <div class="section-heading mb-3">
        <div>
          <span class="eyebrow-label">Why Choose Us</span>
          <h2 class="section-title">{{ content?.whyChooseTitle || 'Why Visit Us' }}</h2>
        </div>
      </div>
      <div class="why-grid mb-8">
        <div v-for="reason in whyItems" :key="reason.label" class="why-card">
          <span class="why-icon"><v-icon size="20" color="white">{{ reason.icon }}</v-icon></span>
          <div>
            <div class="why-title">{{ reason.label }}</div>
            <div class="why-copy">{{ reason.copy }}</div>
          </div>
        </div>
      </div>

      <FeaturedDishes v-if="primaryBranch" :branch-id="primaryBranch.id" />

      <template v-if="site.branches.length">
        <div class="section-heading mb-1">
          <div>
            <span class="eyebrow-label">Visit Us</span>
            <h2 class="section-title">Our Locations</h2>
          </div>
          <NuxtLink v-if="site.branches.length > previewBranches.length" to="/locations" class="text-caption font-weight-bold text-primary">
            View all ({{ site.branches.length }})
          </NuxtLink>
        </div>
        <div class="section-divider mb-4"><span class="line" /><span class="dot" /><span class="line" /></div>
        <div class="locations-grid mb-8">
          <BranchLocationCard v-for="branch in previewBranches" :key="branch.id" :branch="branch" />
        </div>
      </template>
      <div v-else class="text-center text-medium-emphasis py-8">
        No locations published yet.
      </div>

      <TestimonialsSection
        v-if="content?.testimonials?.length"
        :title="content.testimonialsTitle"
        :testimonials="content.testimonials"
      />

      <PhilosophySection
        v-if="content?.philosophyLines?.length"
        :title="content.philosophyTitle"
        :lines="content.philosophyLines"
      />

      <div class="cta-band pa-6 mb-8 text-center">
        <div class="cta-band-mark mx-auto mb-3">
          <v-icon size="22" color="white">mdi-coffee-outline</v-icon>
        </div>
        <h3 class="cta-title mb-1">Hungry already?</h3>
        <p class="text-body-2 mb-4" style="opacity: 0.85">Explore the full menu and find a location near you.</p>
        <div class="d-flex justify-center flex-wrap ga-2">
          <v-btn v-if="primaryBranch" color="secondary" variant="flat" class="text-high-emphasis font-weight-bold" :to="`/browse/${primaryBranch.id}`">
            View full menu
          </v-btn>
          <v-btn variant="outlined" color="white" to="/locations">Find a location</v-btn>
        </div>
      </div>

      <div class="text-center pb-6">
        <ContactInfo v-if="site.branches.length" :site="site" compact />
        <p class="text-caption text-medium-emphasis mt-4 mb-0">&copy; {{ currentYear }} {{ site.name }}</p>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TenantSite, WhyChooseItem } from '@/types/site'
import { isOpenNow } from '@/utils/businessHours'
import CuisineTagList from './CuisineTagList.vue'
import BranchLocationCard from './BranchLocationCard.vue'
import FeaturedDishes from './FeaturedDishes.vue'
import ContactInfo from './ContactInfo.vue'
import PromiseSection from './PromiseSection.vue'
import StorySection from './StorySection.vue'
import PhilosophySection from './PhilosophySection.vue'
import TestimonialsSection from './TestimonialsSection.vue'

const props = defineProps<{ site: TenantSite }>()

const primaryBranch = computed(() => props.site.branches[0] || null)
const previewBranches = computed(() => props.site.branches.slice(0, 3))
const currentYear = new Date().getFullYear()
const content = computed(() => props.site.storefrontContent)

// Generic, cuisine-agnostic value props - true for any restaurant on the
// platform, so this section stays useful for a tenant with no CMS content yet.
const whyVisitDefault = [
  { label: 'Freshly Prepared', icon: 'mdi-fire', copy: 'Made through the day, not sitting around.' },
  { label: 'Quality First', icon: 'mdi-leaf', copy: 'Ingredients chosen with care, every time.' },
  { label: 'Hygienic Kitchen', icon: 'mdi-sparkles', copy: 'Clean prep, clean plates, every order.' },
  { label: 'Quick Service', icon: 'mdi-lightning-bolt', copy: 'Good food without the long wait.' },
]

const whyItems = computed(() => {
  if (content.value?.whyChooseItems?.length) {
    return content.value.whyChooseItems.map((w: WhyChooseItem) => ({ label: w.title, icon: w.icon, copy: w.body }))
  }
  return whyVisitDefault
})

const mediaStyle = computed(() => {
  if (props.site.coverImageUrl) {
    return {
      backgroundImage: `linear-gradient(180deg, rgba(36,18,9,0.1) 40%, rgba(36,18,9,0.65) 100%), url(${props.site.coverImageUrl})`,
    }
  }
  return { background: 'linear-gradient(135deg, #4A2712 0%, #6B3A1A 55%, #8A4D22 100%)' }
})

const quickFacts = computed(() => {
  const facts: { label: string; icon: string; color: string }[] = []
  const branchCount = props.site.branches.length

  if (branchCount > 0) {
    facts.push({
      label: branchCount === 1 ? '1 location' : `${branchCount} locations`,
      icon: 'mdi-map-marker-outline',
      color: 'primary',
    })
  }

  if (props.site.branches.some((b) => b.pickupAvailable)) {
    facts.push({ label: 'Pickup available', icon: 'mdi-bag-checked', color: 'success' })
  }

  if (primaryBranch.value) {
    const open = isOpenNow(primaryBranch.value.openingTime, primaryBranch.value.closingTime)
    if (open !== null) {
      facts.push(
        open
          ? { label: 'Open now', icon: 'mdi-clock-check-outline', color: 'success' }
          : { label: 'Closed now', icon: 'mdi-clock-outline', color: 'error' },
      )
    }
  }

  return facts
})
</script>

<style scoped>
.hero-media {
  height: 260px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}
.hero-ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px dashed rgba(224, 179, 84, 0.35);
  pointer-events: none;
}
.hero-ring--1 {
  width: 220px;
  height: 220px;
  top: -60px;
  right: -50px;
}
.hero-ring--2 {
  width: 320px;
  height: 320px;
  top: -110px;
  right: -110px;
  border-color: rgba(224, 179, 84, 0.18);
}
.hero-bean {
  position: absolute;
  width: 20px;
  height: 26px;
  border-radius: 60% 60% 60% 60% / 70% 70% 60% 60%;
  background: linear-gradient(135deg, #8A4D22, #4A2712);
  opacity: 0.3;
  pointer-events: none;
}
.hero-bean::after {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 2px;
  height: 75%;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 2px;
}
.hero-bean--1 {
  top: 20%;
  left: 8%;
  transform: rotate(18deg);
}
.hero-bean--2 {
  bottom: 14%;
  left: 22%;
  transform: rotate(-12deg);
}
.hero-overlap {
  margin-top: -48px;
  position: relative;
  z-index: 2;
}
.brand-card {
  background: #fff;
  border: 1px solid rgba(107, 58, 26, 0.1);
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(74, 39, 18, 0.14);
}
.eyebrow-label {
  display: block;
  text-transform: uppercase;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #C9962F;
  margin-bottom: 2px;
}
.brand-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2A1C10;
  margin: 0;
}
.hero-headline {
  font-family: 'Playfair Display', serif;
  font-size: 0.95rem;
  font-style: italic;
  color: #6B3A1A;
  margin-top: 2px;
}
.storefront-logo {
  border: 2px solid rgba(107, 58, 26, 0.15);
}
.min-width-0 {
  min-width: 0;
}

.facts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}
.fact-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1px solid rgba(107, 58, 26, 0.1);
  border-radius: 14px;
  padding: 10px 14px;
}
.fact-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #6B3A1A;
}
.fact-icon--success { background: #16A34A; }
.fact-icon--error { background: #B3261E; }
.fact-icon--primary { background: #6B3A1A; }
.fact-label {
  font-size: 13px;
  font-weight: 600;
  color: #2A1C10;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #2A1C10;
  margin: 0;
}
.section-divider {
  display: flex;
  align-items: center;
  gap: 8px;
}
.section-divider .line {
  width: 26px;
  height: 2px;
  border-radius: 2px;
  background: #C9962F;
}
.section-divider .dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #C9962F;
}

.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
}
.why-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #fff;
  border: 1px solid rgba(107, 58, 26, 0.1);
  border-radius: 14px;
  padding: 14px 16px;
}
.why-icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #C9962F, #E0B354);
}
.why-title {
  font-size: 13.5px;
  font-weight: 700;
  color: #2A1C10;
}
.why-copy {
  font-size: 12px;
  color: #8a7864;
  line-height: 1.5;
  margin-top: 2px;
}

.locations-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
@media (min-width: 900px) {
  .locations-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.cta-band {
  border-radius: 22px;
  background: linear-gradient(135deg, #241209, #4A2712);
  color: #fff;
  position: relative;
  overflow: hidden;
}
.cta-band-mark {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #C9962F, #E0B354);
}
.cta-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 700;
}
</style>
