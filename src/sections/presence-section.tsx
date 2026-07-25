import {
  districtPresence,
  TELANGANA_DISTRICT_COUNT,
} from '../data/siteData'
import { Card } from '../components/ui/card'
import { Section, SectionIntro } from '../components/ui/section'
import { TelanganaMap } from '../components/telangana-map'
import { useReveal } from '../hooks/use-reveal'

export function PresenceSection() {
  const scope = useReveal<HTMLElement>()

  return (
    <Section ref={scope} id="presence">
      <SectionIntro
        title="Delivering across Telangana."
        telugu="తెలంగాణ వ్యాప్తంగా మా సేవలు"
        lead="Completed public infrastructure in 21 of the state's 33 districts, from city corporations to gram panchayats."
      />

      {/*
        Map plus the headline figure, nothing else. The full list of district
        names was removed at the client's request; the markers carry their names
        as tooltips and in the map's aria-label, so the information is still
        reachable without printing twenty-one lines on the page.
      */}
      <div className="mt-12 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <Card padding="lg" className="flex items-center justify-center">
          <TelanganaMap />
        </Card>

        <Card
          padding="lg"
          className="flex flex-col justify-center bg-night lg:py-14"
        >
          <p className="text-[clamp(3rem,8vw,5rem)] leading-none font-semibold tracking-[-0.035em] text-paper tabular-nums">
            {districtPresence.length}
            <span className="text-accent">/{TELANGANA_DISTRICT_COUNT}</span>
          </p>
          <p className="mt-4 max-w-[30ch] leading-relaxed text-paper/70">
            districts across Telangana with completed public infrastructure
            projects
          </p>
        </Card>
      </div>
    </Section>
  )
}
