import { useForm } from "react-hook-form";
import { Mail, MapPinned, Phone } from "lucide-react";
import { testimonials } from "../data/siteData";
import { Button } from "../components/ui/button";
import { Reveal } from "../components/ui/reveal";
import { SectionHeading } from "../components/ui/section-heading";
import { SectionShell } from "../components/ui/section-shell";

type ContactFields = {
  name: string;
  phone: string;
  message: string;
};

export function TestimonialsContactSection() {
  const { register, handleSubmit, reset } = useForm<ContactFields>();

  const onSubmit = () => {
    reset();
  };

  return (
    <>
      <SectionShell>
        <SectionHeading
          eyebrow="Testimonials"
          title="Confidence built through delivery and reliability."
          description="Feedback from officers, clients, project teams and ecosystem partners."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.02}>
              <article className="rounded-3xl border border-black/10 bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
                <p className="text-neutral-700">"{item.quote}"</p>
                <p className="mt-5 text-sm uppercase tracking-[0.14em] text-neutral-500">
                  {item.name}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="contact" className="mb-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.1)] backdrop-blur-2xl sm:p-8">
              <p className="text-sm uppercase tracking-[0.16em] text-neutral-500">
                Contact
              </p>
              <h3 className="mt-3 text-2xl tracking-tight text-black sm:text-3xl">
                Let's Build With Confidence.
              </h3>
              <div className="mt-8 space-y-4 text-neutral-700">
                <p className="flex items-start gap-3 text-sm sm:text-base">
                  <MapPinned className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>Vanasthalipuram, Hyderabad, Telangana, India</span>
                </p>
                <a
                  href="tel:+919704340570"
                  className="flex items-center gap-3 text-sm hover:text-black sm:text-base"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  +91 9704340570
                </a>
                <a
                  href="tel:+919849431796"
                  className="flex items-center gap-3 text-sm hover:text-black sm:text-base"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  +91 9849431796
                </a>
                <a
                  href="mailto:jyothipowerprojectshyd@gmail.com"
                  className="flex items-center gap-3 break-all text-sm hover:text-black sm:text-base"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  jyothipowerprojectshyd@gmail.com
                </a>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Button asChild>
                  <a
                    href="https://maps.google.com/?q=Vanasthalipuram+Hyderabad"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full"
                  >
                    Google Maps
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href="mailto:jyothipowerprojectshyd@gmail.com"
                    className="w-full"
                  >
                    Mail
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="tel:+919704340570" className="w-full">
                    Call
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8"
            >
              <p className="text-sm uppercase tracking-[0.16em] text-neutral-500">
                Project Inquiry
              </p>
              <div className="mt-6 space-y-4">
                <input
                  {...register("name")}
                  placeholder="Your Name"
                  autoComplete="name"
                  className="h-12 w-full rounded-xl border border-black/10 px-4 outline-none focus:ring-2 focus:ring-black/40"
                />
                <input
                  {...register("phone")}
                  placeholder="Phone Number"
                  autoComplete="tel"
                  className="h-12 w-full rounded-xl border border-black/10 px-4 outline-none focus:ring-2 focus:ring-black/40"
                />
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Project details"
                  className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-black/40"
                />
              </div>
              <Button type="submit" size="lg" className="mt-6 w-full">
                Contact Us
              </Button>
            </form>
          </Reveal>
        </div>
      </SectionShell>
    </>
  );
}
