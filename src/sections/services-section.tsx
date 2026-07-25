import {
  Building2,
  Cctv,
  Droplets,
  Dumbbell,
  FileText,
  Filter,
  Landmark,
  Lightbulb,
  PlugZap,
  Route,
  TowerControl,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { services, whoWeServe } from '../data/siteData'
import { Card } from '../components/ui/card'
import { Section, SectionIntro } from '../components/ui/section'
import { useReveal } from '../hooks/use-reveal'
import emblem from '../assets/emblem-telangana.webp'
import cctvStreet from '../assets/project-cctv.webp'

/*
  Keyed by the service label so the mapping stays readable. An unmatched label
  falls back to the generic bolt rather than rendering an empty circle.
*/
const serviceIcons: Record<string, LucideIcon> = {
  'LED Street Lighting': Lightbulb,
  'High Mast Lights': TowerControl,
  'Open Gyms': Dumbbell,
  'CCTV Surveillance': Cctv,
  'Water Treatment Plants': Droplets,
  'RO Plants': Filter,
  'CC Roads': Route,
  'Electrical Infrastructure': Zap,
  'Power Distribution': PlugZap,
  'Tender Execution': FileText,
  'Government Project Execution': Landmark,
  'Civil Infrastructure': Building2,
}

export function ServicesSection() {
  const scope = useReveal<HTMLElement>()

  return (
    <Section ref={scope} id="services">
      <SectionIntro
        title="Government infrastructure execution, end to end."
        telugu="ప్రభుత్వ మౌలిక వసతులకు ఖచ్చితమైన అమలు సేవలు"
        lead="From lighting to civil and electrical infrastructure, we deliver complete execution under strict quality controls and public procurement compliance."
      />

      {/*
        The first two are the work this company is known for, so they take a
        double-width tile. That keeps the grid from being twelve identical
        boxes while still giving every service a card of its own.
      */}
      <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {services.map((service, i) => {
          const Icon = serviceIcons[service] ?? Zap
          const featured = i < 2
          return (
            <Card
              as="li"
              key={service}
              data-reveal
              interactive
              padding="none"
              className={[
                'flex min-h-[132px] flex-col justify-between p-5 sm:min-h-[150px] sm:p-6',
                // Full width on phones too, so the grid has rhythm rather than
                // six identical rows of two.
                featured ? 'col-span-2' : '',
              ].join(' ')}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-wash"
                aria-hidden
              >
                <Icon
                  className="h-[18px] w-[18px] text-accent-strong"
                  strokeWidth={1.75}
                />
              </span>
              <span
                className={[
                  'mt-5 leading-snug font-medium text-ink',
                  featured ? 'text-lg sm:text-2xl' : 'text-[0.9375rem] sm:text-lg',
                ].join(' ')}
              >
                {service}
              </span>
            </Card>
          )
        })}
      </ul>

      {/*
        A real installed streetscape sits behind this block. The scrim
        keeps the pill text well clear of contrast minimums while the street
        stays visible on the right.
      */}
      <div
        data-reveal
        className="relative mt-16 overflow-hidden rounded-card bg-night"
      >
        <img
          src={cctvStreet}
          alt=""
          aria-hidden
          width={900}
          height={1200}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[50%_35%]"
        />
        <div className="photo-scrim absolute inset-0" aria-hidden />

        <div className="relative px-6 py-9 sm:px-10 sm:py-11">
          {/*
            The state emblem lives here rather than floating beside the section
            heading. On a phone that heading has no second column, so the
            emblem stacked underneath as a stray graphic with nothing to sit
            against. Next to "Who we serve" it reads as what it is.
          */}
          <div className="flex items-center gap-4">
            <img
              src={emblem}
              alt="Government of Telangana emblem"
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
              className="h-12 w-12 shrink-0 rounded-full bg-paper p-1 sm:h-14 sm:w-14"
            />
            <div>
              <h3 className="font-medium text-paper">Who we serve</h3>
              <p className="mt-0.5 text-sm text-paper/60">
                Public bodies across Telangana and India
              </p>
            </div>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-2.5 gap-y-3">
            {whoWeServe.map((item) => (
              <li
                key={item}
                className="rounded-full border border-paper/25 bg-paper/5 px-4 py-2 text-sm text-paper backdrop-blur-[2px] transition-colors duration-200 hover:border-paper/50 hover:bg-paper/12"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
