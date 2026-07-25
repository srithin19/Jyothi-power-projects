import { useRef } from 'react'
import { districtPresence } from '../data/siteData'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'

/*
  Telangana state outline.

  Geometry derived from Natural Earth 1:10m admin-1 boundaries, which is in the
  public domain ("no rights reserved"), simplified with Ramer-Douglas-Peucker to
  216 points so it can be inlined rather than fetched.

  Deliberately the state outline only, not district boundaries. The district
  boundary datasets available were either pre-2014 (Telangana still inside
  Andhra Pradesh) or carried no usable licence, and neither belongs on a site
  bidding for public tenders. District locations are shown as plotted markers
  instead, which is accurate without redrawing surveyed borders.
*/
const TELANGANA_PATH =
  'M38.9,220.4L39.1,215.1L32.5,210.1L38,203.8L40,192.6L45.7,185.8L57.1,183.2L60.3,167.3L69.4,165.3L77.1,150.6L86.7,147L85.6,143.3L77.5,136.7L77,131.4L72.8,130.2L71.3,125.8L67.4,125.5L65.5,117.7L76.7,106.4L79.2,92.3L83.8,86.3L80.5,82.7L86.6,78.1L96.9,78.8L105.1,87.1L120.6,87.3L121.5,71.9L126.4,62.8L138.5,56.9L138.9,44L142.5,34.5L151.8,23.9L146.5,18.2L142,7.3L142,0L149.1,3.5L152.8,9.2L161.7,12.8L169.1,9.3L180.1,10.6L192.7,16.3L201.7,16L209.6,21.5L214.4,34.4L220.4,37.1L222.2,40.8L232.7,48.1L243.7,50.1L257,59.8L259.8,58L259.5,53.9L266.1,42L277.1,43.3L284.4,49.2L302.2,49.8L307.2,53.3L315.1,44.7L328.3,40.1L336.3,41.4L345.4,53.2L353.7,56.4L358.5,64.8L357.6,80.4L353.8,87.8L355.9,100.5L349.2,104.9L345,112.8L345.4,117.3L354.5,116.7L358.7,133.1L358.1,142.5L352.3,148.2L363.6,153.9L375.3,166.2L385.8,167.2L402.4,163.9L410,180.8L412.6,177.6L417.5,181.3L427.8,178.9L440.6,187.9L455.6,205.9L465.3,227.2L465.6,230.8L460.3,234.4L460.7,239.1L469.2,239.8L473,233.3L475.6,234.3L479,244.1L490.4,242.6L487.6,254L493,268.3L493.9,285.4L497.8,293.1L501.7,294.4L516.6,285.8L528.3,290.6L548,290.1L559.4,292.8L563.5,287.4L572.4,291.5L596.3,275.9L600,282.3L598.6,286.5L579.1,296.2L571.8,304.4L566.7,313.7L558,343.9L549.9,350.8L524.2,357.4L514.9,367.7L486.6,375.6L481.6,380.8L476.7,395L452,391.3L448.3,386.1L441.6,383L429.8,387.4L428.8,394.2L425.2,397.4L421.9,397.9L416,391.4L414.2,405.8L426.2,411.2L433,409.1L441,411.6L442.2,415.4L438.3,421.7L442.5,431.2L430.4,431.3L415.4,424.9L406.9,417.8L397,399.1L383.6,399.2L365,416L363.6,420.4L373,427.1L369,438.8L357.8,453.9L351.4,453.7L347.7,443.7L340.3,445.3L333.1,440.4L326.3,445.7L309.6,448.5L303.8,454L297.7,452.3L286.2,459.5L266,462.3L259.1,473L258.4,487.5L261.8,495.6L257.5,509.8L252.1,511.1L233.7,507.2L220.6,515.2L217.3,521.7L210.6,520.6L209.6,532.3L199.2,537.7L183.9,531.6L172.5,533.7L164.6,528.6L151.4,530L138.1,538.4L130.7,536.2L132.3,540.8L129.5,548.5L117.1,557.2L111.7,565.3L84.5,553L78.5,556.4L53.4,556.1L25,548.1L30,541.3L30.9,505.2L37.4,499.9L39.1,495.4L31.2,489L4.8,485L0,479.1L15,468.6L17.5,462.8L22.5,460.1L25,452.4L20.4,451.4L24.9,445.5L20.2,438.9L23.4,428.5L23.6,408.7L27.9,398.8L22.2,382.6L15,378.9L15.5,371.4L35.5,342.5L41.5,340.5L45.3,334.6L52.4,332.8L56.8,323.5L55.2,322.1L45.3,326.3L43.1,321.9L31.2,322L20.4,314.6L27.3,303.1L36.3,297.5L32.2,289.4L33.2,286.2L48.9,271.3L45.8,258.5L40,252.3L45.5,245.8L41.2,230.7L43.2,222.7L38.9,220.4Z'

export function TelanganaMap() {
  const scope = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope.current, start: 'top 82%', once: true },
      })

      // Outline settles first, then markers land across the state.
      tl.from('[data-outline]', {
        opacity: 0,
        scale: 0.985,
        transformOrigin: 'center',
        duration: 0.7,
        ease: 'power2.out',
      }).from(
        '[data-marker]',
        {
          scale: 0,
          opacity: 0,
          transformOrigin: 'center',
          duration: 0.45,
          stagger: { each: 0.045, from: 'random' },
          ease: 'back.out(2.2)',
        },
        '-=0.3',
      )
    },
    { scope },
  )

  return (
    <svg
      ref={scope}
      viewBox="0 0 600 565"
      className="h-auto w-full"
      role="img"
      aria-label={`Map of Telangana marking districts where Jyothi Power Projects has delivered work: ${districtPresence
        .map((d) => d.name)
        .join(', ')}`}
    >
      <path
        data-outline
        d={TELANGANA_PATH}
        className="fill-sunken stroke-line-strong"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/*
        Markers carry no text. Twenty-one labels at this scale overlap into an
        unreadable mass, so the names live in the list beside the map and each
        marker gets a <title> for pointer and assistive-tech users.
      */}
      {districtPresence.map((d) => (
        <g data-marker key={d.name}>
          <title>{d.name}</title>
          <circle cx={d.x} cy={d.y} r={12} className="fill-accent/25" />
          <circle
            cx={d.x}
            cy={d.y}
            r={5}
            className="fill-accent-strong stroke-surface"
            strokeWidth={1.5}
          />
        </g>
      ))}
    </svg>
  )
}
