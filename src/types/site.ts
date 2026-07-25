export type NavLink = {
  label: string
  href: `#${string}`
}

export type ImpactStat = {
  label: string
  value: number
  suffix: string
}

export type TimelineItem = {
  year: string
  title: string
}

export type ProjectGalleryItem = {
  title: string
  image: string
}

export type Testimonial = {
  quote: string
  name: string
}
