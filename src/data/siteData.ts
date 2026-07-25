import ccTvImage from '../assets/project-cctv.webp'
import highMastImage from '../assets/project-high-mast.webp'
import openGymImage from '../assets/project-open-gym.webp'
import streetLightsImage from '../assets/project-street-lights.webp'
import type {
  ImpactStat,
  NavLink,
  ProjectGalleryItem,
  Testimonial,
  TimelineItem,
} from '../types/site'

export const company = {
  name: 'Jyothi Power Projects',
  tagline: 'Engineering rural progress.',
  teluguTagline: 'గ్రామాభివృద్ధికి నమ్మకమైన ఇంజనీరింగ్ భాగస్వామ్యం',
  address: 'Vanasthalipuram, Hyderabad, Telangana, India',
  email: 'jyothipowerprojectshyd@gmail.com',
  phones: ['+91 97043 40570', '+91 98494 31796'],
  mapsUrl: 'https://maps.google.com/?q=Vanasthalipuram+Hyderabad',
} as const

/** Tel: links need the raw form, display keeps the grouped form. */
export const telHref = (phone: string) => `tel:${phone.replace(/\s+/g, '')}`

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Impact', href: '#impact' },
  { label: 'Contact', href: '#contact' },
]

export const services = [
  'LED Street Lighting',
  'High Mast Lights',
  'Open Gyms',
  'CCTV Surveillance',
  'Water Treatment Plants',
  'RO Plants',
  'CC Roads',
  'Electrical Infrastructure',
  'Power Distribution',
  'Tender Execution',
  'Government Project Execution',
  'Civil Infrastructure',
]

export const whoWeServe = [
  'Government of India',
  'Government of Telangana',
  'Municipal Corporations',
  'Gram Panchayats',
  'Government Schools',
  'Government Colleges',
  'Village Development Authorities',
  'Infrastructure Departments',
  'MLAs',
  'MPs',
]

/** Telangana has 33 districts; this is the denominator shown beside the map. */
export const TELANGANA_DISTRICT_COUNT = 33

/*
  Districts with completed projects, as confirmed by the company.

  x/y are positions inside the map's 600x565 viewBox. To add a district, take
  its headquarters longitude/latitude and project with:

    x = (lon - 77.2583) * 132.53
    y = (19.88715 - lat) * 139.4

  Those constants are solved against the shipped Natural Earth outline, so
  markers line up with the path rather than with a re-derived projection.
*/
export const districtPresence = [
  { name: 'Adilabad', x: 168.8, y: 31.1 },
  { name: 'Bhadradri Kothagudem', x: 445.5, y: 325.8 },
  { name: 'Hanumakonda', x: 305.2, y: 263.6 },
  { name: 'Hyderabad', x: 162.8, y: 348.8 },
  { name: 'Jagtial', x: 219, y: 152.8 },
  { name: 'Jangaon', x: 254.9, y: 301.9 },
  { name: 'Jayashankar Bhupalapally', x: 345.3, y: 201.9 },
  { name: 'Khammam', x: 383.4, y: 368 },
  { name: 'Komaram Bheem Asifabad', x: 268.4, y: 72.6 },
  { name: 'Mahabubabad', x: 363.5, y: 319 },
  { name: 'Mahabubnagar', x: 96.4, y: 437.6 },
  { name: 'Medak', x: 133.4, y: 256.7 },
  { name: 'Nagarkurnool', x: 141.3, y: 474.6 },
  { name: 'Nalgonda', x: 266.2, y: 394.5 },
  { name: 'Narayanpet', x: 31.4, y: 438 },
  { name: 'Nirmal', x: 143.9, y: 110.2 },
  { name: 'Nizamabad', x: 110.8, y: 169.3 },
  { name: 'Siddipet', x: 211.2, y: 248.9 },
  { name: 'Suryapet', x: 313.5, y: 382.9 },
  { name: 'Warangal', x: 309.6, y: 267.4 },
  { name: 'Yadadri Bhuvanagiri', x: 216.2, y: 331.1 },
]

export const brands = [
  'Havells',
  'Wipro',
  'Halonix',
  'Fortuna',
  'Accent',
  'Kapart',
  'Osram',
  'Philips',
  'Crompton',
  'Bajaj',
  'Anchor',
  'Polycab',
  'Syska',
]

export const impactStats: ImpactStat[] = [
  { label: 'Years in operation', value: 15, suffix: '+' },
  { label: 'Projects delivered', value: 500, suffix: '+' },
  { label: 'Villages developed', value: 100, suffix: '+' },
  { label: 'Street lights installed', value: 30000, suffix: '+' },
  { label: 'Citizens benefited', value: 2500000, suffix: '+' },
  { label: 'Project success rate', value: 100, suffix: '%' },
]

export const timeline: TimelineItem[] = [
  { year: '2009', title: 'Company started' },
  { year: '2012', title: 'Expansion' },
  { year: '2014', title: 'Government infrastructure' },
  { year: '2026', title: '15+ years of excellence' },
]

/*
  A real ordered sequence, so numbering these carries information. Nothing else
  on the page is numbered.
*/
export const processSteps = [
  'Requirement analysis',
  'Planning',
  'Procurement',
  'Execution',
  'Quality inspection',
  'Handover',
]

export const projectGallery: ProjectGalleryItem[] = [
  { title: 'Street lights', image: streetLightsImage },
  { title: 'High mast lights', image: highMastImage },
  { title: 'Open gyms', image: openGymImage },
  { title: 'CCTV surveillance', image: ccTvImage },
]

export const coreValues = [
  'Quality',
  'Integrity',
  'Engineering excellence',
  'Transparency',
  'Innovation',
  'Customer satisfaction',
]

export const qualityPoints = [
  'Only genuine products',
  'Certified materials',
  'Premium brands',
  'Long service life',
  'Government standards',
  'Safety first',
]

export const compliancePoints = [
  'Tender documentation and verification',
  'Material traceability and certification',
  'Safety-first site controls',
  'Inspection-ready progress reports',
]

export const testimonials: Testimonial[] = [
  {
    quote:
      'Jyothi Power Projects consistently delivers public infrastructure with strong technical discipline and transparent execution.',
    name: 'Senior Government Officer',
  },
  {
    quote:
      'Their timeline commitment and on-ground coordination make them one of the most dependable execution partners in the region.',
    name: 'Infrastructure Project Partner',
  },
  {
    quote:
      'From planning to handover, every detail is handled with professionalism and measurable quality.',
    name: 'Public Sector Partner',
  },
]
