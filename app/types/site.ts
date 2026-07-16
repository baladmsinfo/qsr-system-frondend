// Shapes mirror the REAL backend responses only:
// GET /api/public/tenant/:slug and GET /api/public/branches/:branchId/menu
// (see qsr-system-backend/src/routes/public.js). No speculative fields.

export interface TenantBranch {
  id: string
  name: string
  addressLine1: string
  city: string
  openingTime: string | null
  closingTime: string | null
  pickupAvailable: boolean
  distanceKm: number | null
}

export interface WhyChooseItem {
  icon: string
  title: string
  body: string
}

export interface Testimonial {
  quote: string
  author: string | null
}

export interface StorefrontContent {
  heroTag: string | null
  heroHeadline: string | null
  heroSubtext: string | null
  heroImageUrl: string | null

  promiseTitle: string | null
  promiseSubtitle: string | null
  promiseItems: string[]

  storyTitle: string | null
  storyBody: string | null
  storyPillars: string[]

  whyChooseTitle: string | null
  whyChooseItems: WhyChooseItem[]

  philosophyTitle: string | null
  philosophyLines: string[]

  testimonialsTitle: string | null
  testimonials: Testimonial[]
}

export interface TenantSite {
  id: string
  tenant: string
  name: string
  companyType: string
  logoUrl: string | null
  coverImageUrl: string | null
  description: string | null
  cuisineTags: string[]
  branches: TenantBranch[]
  storefrontContent: StorefrontContent | null
}

export interface ApiEnvelope<T> {
  statusCode: string
  message: string
  data: T
}

export type MenuAvailability = 'AVAILABLE' | 'OUT_OF_STOCK' | 'HIDDEN'
export type MenuItemPreparationType = 'PREPARED_FRESH' | 'READY_TO_SERVE'
export type MenuItemUnitType = 'PIECE' | 'GRAM' | 'KG' | 'ML' | 'LITRE' | 'CUSTOM'

export interface MenuItemImage {
  id: string
  url: string
}

export interface PublicMenuItem {
  id: string
  name: string
  description: string | null
  imageUrl: string | null
  isVeg: boolean
  availability: MenuAvailability
  price: number
  prepTimeMinutes: number | null
  isRecommended: boolean
  isPopular: boolean
  spicyLevel: number
  tags: string[]
  preparationType: MenuItemPreparationType
  unitType: MenuItemUnitType | null
  customUnitLabel: string | null
  categoryId: string
  subCategoryId: string | null
}

export interface PublicMenuSubCategory {
  id: string
  name: string
  displayOrder: number
  menuItems: PublicMenuItem[]
}

export interface PublicMenuCategory {
  id: string
  name: string
  description: string | null
  displayOrder: number
  image: MenuItemImage | null
  subCategories: PublicMenuSubCategory[]
  menuItems: PublicMenuItem[]
}
