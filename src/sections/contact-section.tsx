import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, MapPin, Phone } from 'lucide-react'
import { company, telHref } from '../data/siteData'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Field, TextareaField } from '../components/ui/field'
import { Section } from '../components/ui/section'
import { useReveal } from '../hooks/use-reveal'

type ContactFields = {
  name: string
  phone: string
  message: string
}

/*
  The previous version of this form called reset() and nothing else, so every
  enquiry silently vanished while the user watched the fields clear and assumed
  it had been sent.

  This composes the enquiry into the visitor's mail client. It is honest about
  what happens and needs no backend. To post to a real endpoint instead, replace
  the body of `onSubmit` with a fetch and keep the same status handling.
*/
export function ContactSection() {
  const scope = useReveal<HTMLElement>()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFields>({ mode: 'onBlur' })

  const onSubmit = (values: ContactFields) => {
    setStatus('sending')

    const subject = `Project enquiry from ${values.name}`
    const body = [
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      '',
      values.message,
    ].join('\n')

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`

    setStatus('sent')
    reset()
  }

  return (
    <Section ref={scope} id="contact">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <h2
            data-reveal
            className="text-h2 leading-[1.08] font-semibold tracking-[-0.03em] text-ink"
          >
            Let&apos;s build with confidence.
          </h2>
          <p data-reveal className="mt-5 max-w-[46ch] leading-[1.7] text-muted">
            Tell us about the tender or the site. We will come back with scope,
            timeline and a materials plan.
          </p>

          <Card data-reveal padding="lg" className="mt-10">
            <address className="space-y-4 not-italic">
              <p className="flex items-start gap-3 text-ink-soft">
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent-strong" />
                <span>{company.address}</span>
              </p>
              {company.phones.map((phone) => (
                <a
                  key={phone}
                  href={telHref(phone)}
                  className="flex items-center gap-3 text-ink-soft transition-colors duration-200 hover:text-ink"
                >
                  <Phone className="h-[18px] w-[18px] shrink-0 text-accent-strong" />
                  <span className="tabular-nums">{phone}</span>
                </a>
              ))}
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-3 break-all text-ink-soft transition-colors duration-200 hover:text-ink"
              >
                <Mail className="h-[18px] w-[18px] shrink-0 text-accent-strong" />
                <span>{company.email}</span>
              </a>
            </address>

            <div className="mt-7">
              <Button asChild variant="outline" size="sm">
                <a href={company.mapsUrl} target="_blank" rel="noreferrer">
                  Open in Google Maps
                </a>
              </Button>
            </div>
          </Card>
        </div>

        <Card
          as="form"
          data-reveal
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          padding="lg"
        >
          <h3 className="text-h3 leading-tight font-semibold tracking-[-0.02em] text-ink">
            Project enquiry
          </h3>

          <div className="mt-7 space-y-5">
            <Field
              label="Your name"
              autoComplete="name"
              error={errors.name?.message}
              {...register('name', {
                required: 'Please enter your name.',
                minLength: { value: 2, message: 'Please enter your full name.' },
              })}
            />
            <Field
              label="Phone number"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              hint="We usually reply on WhatsApp or a call."
              error={errors.phone?.message}
              {...register('phone', {
                required: 'Please enter a phone number.',
                pattern: {
                  value: /^(\+?91[\s-]?)?[6-9]\d{9}$/,
                  message: 'Enter a 10 digit Indian mobile number.',
                },
                setValueAs: (v: string) => v.replace(/[\s-]/g, ''),
              })}
            />
            <TextareaField
              label="Project details"
              rows={4}
              error={errors.message?.message}
              {...register('message', {
                required: 'Tell us briefly what you need.',
                minLength: {
                  value: 12,
                  message: 'A sentence or two helps us respond usefully.',
                },
              })}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            block
            loading={status === 'sending'}
            className="mt-7"
          >
            Send enquiry
          </Button>

          {/*
            Announced politely so screen reader users hear the outcome without
            losing their place in the form.
          */}
          <p
            role="status"
            aria-live="polite"
            className="mt-4 min-h-5 text-sm text-muted"
          >
            {status === 'sent'
              ? 'Your mail app should now be open with the enquiry ready to send.'
              : ''}
          </p>
        </Card>
      </div>
    </Section>
  )
}
