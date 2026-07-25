import ccTvImage from '../assets/project-cctv.webp'
import highMastImage from '../assets/project-high-mast.webp'
import openGymImage from '../assets/project-open-gym.webp'
import streetLightsImage from '../assets/project-street-lights.webp'

/*
  Category folders are the source of truth for the gallery.

  Drop photos into src/assets/<folder> and they appear on the site with no code
  change. Vite resolves these at build time, so the glob patterns and their
  options have to be written out literally; hoisting either into a variable
  makes the glob silently resolve to nothing.

  A category with an empty folder falls back to its single curated image, so
  nothing is blank while photos are still being sorted.
*/
const folders = {
  streetLights: import.meta.glob(
    '../assets/streetlights/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
    { eager: true, query: '?url', import: 'default' },
  ) as Record<string, string>,
  highMast: import.meta.glob(
    '../assets/highmast lights/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
    { eager: true, query: '?url', import: 'default' },
  ) as Record<string, string>,
  gyms: import.meta.glob(
    '../assets/gyms/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
    { eager: true, query: '?url', import: 'default' },
  ) as Record<string, string>,
  cctv: import.meta.glob(
    '../assets/cc cameras/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
    { eager: true, query: '?url', import: 'default' },
  ) as Record<string, string>,
}

/** Sorted by path so page order matches filename order in Finder. */
function imagesFrom(mod: Record<string, string>, fallback: string): string[] {
  const found = Object.keys(mod)
    .sort()
    .map((k) => mod[k])
  return found.length > 0 ? found : [fallback]
}

export type GalleryCategory = {
  slug: string
  title: string
  telugu: string
  /*
    Cover art, kept separate from the photographs.

    These are the curated studio-style images. Site-wide covers stay consistent
    and on-theme, while the category pages show the real photographs from the
    job. A cover is never mixed into the gallery grid.
  */
  cover: string
  /** Used to build each photo's alt text. */
  subject: string
  intro: string
  /** Short factual points describing how this work is delivered. */
  highlights: { label: string; body: string }[]
  images: string[]
}

/*
  Copy below describes what the photographs show and how the work is delivered.
  It deliberately avoids wattages, pole heights and lux levels: those vary per
  tender and are not something to state on the client's behalf.
*/
export const galleryCategories: GalleryCategory[] = [
  {
    slug: 'street-lights',
    cover: streetLightsImage,
    title: 'Street lights',
    telugu: 'వీధి దీపాలు',
    subject: 'LED street lighting installed by Jyothi Power Projects',
    intro:
      'LED street lighting for village roads, colony streets and approach roads. Fittings, wiring and control gear supplied, installed on new or existing poles, and commissioned on site.',
    highlights: [
      {
        label: 'Supply and install',
        body: 'Branded LED fittings mounted, wired and energised, with the existing pole network reused where it is sound.',
      },
      {
        label: 'Village and colony roads',
        body: 'Delivered for gram panchayats and municipal corporations across the districts we work in.',
      },
      {
        label: 'Handover',
        body: 'Commissioned, inspected and handed over with a completion report for the department.',
      },
    ],
    images: imagesFrom(folders.streetLights, streetLightsImage),
  },
  {
    slug: 'high-mast-lights',
    cover: highMastImage,
    title: 'High mast lights',
    telugu: 'హైమాస్ట్ దీపాలు',
    subject: 'High mast lighting installed by Jyothi Power Projects',
    intro:
      'High mast lighting for junctions, bus stands, markets and open grounds. Galvanised poles and flood light rings fabricated, foundations cast, then erected by crane and commissioned.',
    highlights: [
      {
        label: 'Fabrication',
        body: 'Poles and lantern rings fabricated and galvanised before dispatch to site.',
      },
      {
        label: 'Foundation and erection',
        body: 'Concrete foundation cast and cured, base plate bolted, mast raised by crane.',
      },
      {
        label: 'Commissioning',
        body: 'Flood lights fitted to the ring, wired down the mast and tested after dark.',
      },
    ],
    images: imagesFrom(folders.highMast, highMastImage),
  },
  {
    slug: 'open-gyms',
    cover: openGymImage,
    title: 'Open gyms',
    telugu: 'ఓపెన్ జిమ్‌లు',
    subject: 'Open gym equipment installed by Jyothi Power Projects',
    intro:
      'Outdoor fitness equipment for parks and public open spaces. Supplied, set on prepared foundations and installed ready for public use.',
    highlights: [
      {
        label: 'Equipment supply',
        body: 'Units delivered wrapped and protected, then unpacked on site to avoid damage in transit.',
      },
      {
        label: 'Site preparation',
        body: 'Base area levelled and foundations set before the equipment is fixed down.',
      },
      {
        label: 'Public open spaces',
        body: 'Installed at village parks and community grounds for everyday public use.',
      },
    ],
    images: imagesFrom(folders.gyms, openGymImage),
  },
  {
    slug: 'cctv-surveillance',
    cover: ccTvImage,
    title: 'CCTV surveillance',
    telugu: 'సీసీటీవీ నిఘా',
    subject: 'CCTV surveillance installed by Jyothi Power Projects',
    intro:
      'CCTV surveillance for main roads, junctions and public areas. Pole-mounted cameras, cabling and power, feeding a control room monitoring wall.',
    highlights: [
      {
        label: 'Camera installation',
        body: 'Cameras mounted on poles at junctions and main roads, with weatherproof enclosures and cabling.',
      },
      {
        label: 'Control room',
        body: 'Feeds brought back to a monitoring wall so multiple channels can be watched together.',
      },
      {
        label: 'Public areas',
        body: 'Covering bus stands, markets, statues and main roads for civic and traffic monitoring.',
      },
    ],
    images: imagesFrom(folders.cctv, ccTvImage),
  },
]

export function categoryBySlug(slug?: string) {
  return galleryCategories.find((c) => c.slug === slug)
}

/*
  The home gallery pins the section and converts vertical scroll into horizontal
  travel, so every extra card adds roughly a screen of scrolling. It shows one
  cover per category and links through to the full set.
*/
export const galleryCovers = galleryCategories.map((category) => ({
  slug: category.slug,
  title: category.title,
  image: category.cover,
  alt: category.subject,
  count: category.images.length,
}))
