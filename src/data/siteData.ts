import highmastLightsImage from '../assets/Highmast lights.png'
import ccCamerasImage from '../assets/cc cameras.png'
import openGymImage from '../assets/open gym.png'
import streetLightsImage from '../assets/street lights.png'
import type {
  ImpactStat,
  NavLink,
  ProjectGalleryItem,
  Testimonial,
  TimelineItem,
} from '../types/site'

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Impact', href: '#impact', showInNavbar: false },
  { label: 'Contact', href: '#contact' },
]

export const navbarLinks = navLinks.filter(
  (link) => link.showInNavbar !== false,
)

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
  'MPs'
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
  { label: 'Years', value: 20, suffix: '+' },
  { label: 'Projects', value: 500, suffix: '+' },
  { label: 'Project Success', value: 100, suffix: '%' },
  { label: 'Villages Developed', value: 100, suffix: '+' },
  { label: 'Street Lights Installed', value: 30000, suffix: '+' },
  { label: 'Citizens Benefited', value: 2500000, suffix: '+' },
]

export const timeline: TimelineItem[] = [
  { year: '2009', title: 'Company Started' },
  { year: '2012', title: 'Expansion' },
  { year: '2014', title: 'Government Infrastructure' },
  { year: '2026', title: '20+ Years of Excellence' },
]

export const processSteps = [
  'Requirement Analysis',
  'Planning',
  'Procurement',
  'Execution',
  'Quality Inspection',
  'Successful Handover',
]

export const projectGallery: ProjectGalleryItem[] = [
  {
    title: 'Street Lights',
    image: streetLightsImage,
    objectPosition: 'center center',
  },
  {
    title: 'Highmast Lights',
    image: highmastLightsImage,
    objectPosition: 'center center',
  },
  {
    title: 'Open Gyms',
    image: openGymImage,
    objectPosition: 'center center',
  },
  {
    title: 'CC Cameras',
    image: ccCamerasImage,
    objectPosition: 'center center',
  },
]

export const qualityPoints = [
  'Only Genuine Products',
  'Certified Materials',
  'Premium Brands',
  'Long Life',
  'Government Standards',
  'Safety First',
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
