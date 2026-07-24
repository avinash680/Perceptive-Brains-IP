import { useEffect, useRef, useState } from "react";
import hirdayPalPhoto from "../../assets/our Team/Dr.Hirday Pal Singh sidhu.jpeg";
import kunalAroraPhoto from "../../assets/our Team/Advocate. Kunal Arora.jpeg";
import vaneetAroraPhoto from "../../assets/our Team/Advocate Vaneet Arora.png";
import jayvirShahPhoto from "../../assets/our Team/Dr. Jayvir Shah.png";
import {
  Scale,
  ShieldCheck,
  FileCheck2,
  Users,
  BadgeCheck,
  ArrowRight,
  Lightbulb,
  Target,
  Eye,
  Award,
  Fingerprint,
  Clock,
  TrendingUp,
  Quote,
  CheckCircle2,
  Sparkles,
  Globe2,
  Handshake,
  Search,
  PenTool,
  Gavel,
  FolderCheck,
  Mail,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const stats = [
  { value: 1200, suffix: "+", label: "IP filings completed" },
  { value: 98, suffix: "%", label: "First-response success rate" },
  { value: 40, suffix: "+", label: "Countries served" },
  { value: 13, suffix: "", label: "Years of practice" },
];

const whyChooseUs = [
  {
    icon: Scale,
    title: "Proven expertise",
    desc: "Deep experience across patents, trademarks, copyrights, and industrial designs, spanning technology, pharma, and consumer brands.",
  },
  {
    icon: Clock,
    title: "On-time, every time",
    desc: "Every deadline is tracked against national and international IP office calendars so nothing is ever filed late.",
  },
  {
    icon: Users,
    title: "A named team, not a queue",
    desc: "Your matter is handled by dedicated patent agents and IP attorneys who know your portfolio by name.",
  },
  {
    icon: FolderCheck,
    title: "End-to-end coverage",
    desc: "From clearance search to filing, prosecution, licensing, and enforcement — one team for the full lifecycle.",
  },
];

const coreValues = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    desc: "Transparent advice, honest timelines, no inflated promises.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We protect original thinking with equally original strategy.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    desc: "We work as an extension of your team, not an outside vendor.",
  },
  {
    icon: Globe2,
    title: "Global outlook",
    desc: "Filing strategies built for cross-border growth from day one.",
  },
];

const process = [
  {
    icon: Search,
    tag: "STEP 01",
    title: "Consultation & search",
    desc: "We assess your invention, brand, or creative work and run prior-art, trademark, or design clearance searches.",
  },
  {
    icon: PenTool,
    tag: "STEP 02",
    title: "Strategy & drafting",
    desc: "We build a filing strategy matched to your goals and draft applications with precision and foresight.",
  },
  {
    icon: FileCheck2,
    tag: "STEP 03",
    title: "Filing & submission",
    desc: "Applications are filed with the relevant IP offices, domestic or international, with every requirement met.",
  },
  {
    icon: Gavel,
    tag: "STEP 04",
    title: "Prosecution & grant",
    desc: "We respond to office actions and objections, guiding your application through to registration.",
  },
  {
    icon: Award,
    tag: "STEP 05",
    title: "Portfolio management",
    desc: "Renewals, licensing, watch services, and enforcement keep your rights strong long after grant.",
  },
];

const team = [
  {
    id: "HSS",
    name: "Dr. Hirday Pal Singh Sidhu",
    title: "Product Design Consultant",
    department: "Product Design & Engineering",
    qualification: "Ph.D. | Product Design & Mechanical Engineering",
    experience: "15+ Years",
    expertise: [
      "Product Design",
      "CAD & 3D Modeling",
      "FEA Analysis",
      "Mechanical Engineering",
      "Automotive Design",
    ],
    bio: "Dr. Hirday Pal Singh Sidhu is a highly experienced Product Design Consultant specializing in product development, CAD modeling, finite element analysis (FEA), and engineering design. He transforms innovative concepts into manufacturable, high-performance products for automotive and industrial applications.",
    photo: hirdayPalPhoto,
    linkedin: "#",
    email: "hirday@example.com",
  },
  {
    id: "KA",
    name: "Adv. Kunal Arora",
    title: "Advocate, High Court of Punjab & Haryana",
    department: "Legal & Public Affairs",
    qualification: "LL.B. | Advocate",
    experience: "6+ Years",
    expertise: [
      "Civil Litigation",
      "Corporate Law",
      "Legal Advisory",
      "Public Affairs",
      "Intellectual Property",
    ],
    bio: "Advocate Kunal Arora is a practicing lawyer before the High Court of Punjab & Haryana. He provides legal counsel in civil, corporate, and intellectual property matters while actively contributing to social development through the Kutumbh Mitra Foundation.",
    photo: kunalAroraPhoto,
    linkedin: "#",
    email: "kunal@example.com",
  },
  {
    id: "VA",
    name: "Advocate Vaneet Arora",
    title: "Trademark Attorney",
    department: "Intellectual Property",
    qualification: "LL.B. | Trademark Attorney",
    experience: "10+ Years",
    expertise: [
      "Trademark Registration",
      "Brand Protection",
      "Trademark Opposition",
      "IP Portfolio Management",
      "Legal Compliance",
    ],
    bio: "Advocate Vaneet Arora is an experienced Trademark Attorney helping startups, SMEs, and enterprises protect their brands through trademark registration, portfolio management, opposition proceedings, and enforcement strategies.",
    photo: vaneetAroraPhoto,
    linkedin: "#",
    email: "vaneet@example.com",
  },
  {
    id: "JS",
    name: "Dr. Jayvir Shah",
    title: "Registered Patent Agent (IN/PA 3339)",
    department: "Patents & Innovation",
    qualification: "Ph.D. | Registered Indian Patent Agent",
    experience: "7+ Years",
    expertise: [
      "Patent Drafting",
      "Patent Prosecution",
      "Prior Art Search",
      "Mechanical Patents",
      "Automobile Innovation",
    ],
    bio: "Dr. Jayvir Shah is a Registered Indian Patent Agent (IN/PA 3339) specializing in patent drafting, prosecution, and innovation strategy. He has successfully protected numerous inventions and mentored over 107 professionals to become registered patent agents.",
    photo: jayvirShahPhoto,
    linkedin: "#",
    email: "jayvir@example.com",
  },
];

const testimonials = [
  {
    quote:
      "They guided us through our very first patent filing with real patience and clarity, from search to grant.",
    name: "Founder, AI/ML startup",
    tag: "Patent client",
  },
  {
    quote:
      "Fast, professional, and thorough. Our trademark cleared registration without a single objection.",
    name: "Owner, D2C consumer brand",
    tag: "Trademark client",
  },
  {
    quote:
      "Their portfolio management keeps thirty-plus marks renewed and enforced across twelve countries without us lifting a finger.",
    name: "General Counsel, manufacturing group",
    tag: "Enterprise client",
  },
];

/* ------------------------------------------------------------------ */
/*  Small hooks                                                        */
/* ------------------------------------------------------------------ */

function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.unobserve(node);
      }
    }, options || { threshold: 0.2 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function CountUp({ value, suffix = "", duration = 1600 }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Signature visual — registration seal                               */
/* ------------------------------------------------------------------ */

function RegistrationSeal() {
  return (
    <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
      <div className="absolute inset-0 animate-[spin_28s_linear_infinite] rounded-full">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <path id="sealArcTop" d="M 20,100 a 80,80 0 1,1 160,0" fill="none" />
            <path id="sealArcBottom" d="M 20,100 a 80,80 0 1,0 160,0" fill="none" />
          </defs>
          <circle cx="100" cy="100" r="94" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="1.5 5" />
          <text fontSize="8.4" letterSpacing="3" fontWeight="600" fill="white" fillOpacity="0.85">
            <textPath href="#sealArcTop" startOffset="50%" textAnchor="middle">
              PATENTS • TRADEMARKS • COPYRIGHTS
            </textPath>
          </text>
          <text fontSize="8.4" letterSpacing="3" fontWeight="600" fill="white" fillOpacity="0.6">
            <textPath href="#sealArcBottom" startOffset="50%" textAnchor="middle">
              PROTECTED SINCE 2012 • GLOBAL COUNSEL
            </textPath>
          </text>
        </svg>
      </div>
      <div className="absolute inset-6 rounded-full bg-white/10 backdrop-blur-2xl border border-white/25 shadow-[0_0_60px_rgba(201,162,39,0.35)]" />
      <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full border border-white/30 bg-gradient-to-br from-white/20 to-white/5 text-center backdrop-blur-xl">
        <Fingerprint className="mb-1.5 h-7 w-7 text-[#E7C873]" strokeWidth={1.5} />
        <span className="font-semibold tracking-wide text-white text-sm">CERTIFIED</span>
        <span className="text-[10px] tracking-[0.2em] text-[#D9C08B]">IP COUNSEL</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function About() {
  return (
    <main className="bg-slate-50 text-slate-800 antialiased">
      {/* ============================= HERO ============================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#081226] via-[#0B1F3D] to-[#16305C]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[#C9A227]/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-[380px] w-[380px] rounded-full bg-[#16305C]/25 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-28 sm:py-32 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white/85 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227]" />
              FILE NO. EMIP/2026/00142 · STATUS: ACTIVE
            </div>
            <h1 className="font-semibold leading-[1.05] tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl">
              Protecting ideas,
              <br />
              <span className="bg-gradient-to-r from-[#E7C873] via-[#F3E3B0] to-white bg-clip-text text-transparent">
                one filing at a time.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Perceptive Brains IP helps startups, enterprises, and individual
              creators protect patents, trademarks, copyrights, and designs —
              with clear guidance and dependable execution at every stage.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0B1F3D] shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:shadow-xl">
                Book a filing consultation
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#process"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                See our process
              </a>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-semibold text-white sm:text-3xl">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs leading-snug text-[#E7C873]/75">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150} className="flex justify-center">
            <RegistrationSeal />
          </Reveal>
        </div>
      </section>

      {/* ============================= WHO WE ARE ============================= */}
      <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#9C7A1E]">WHO WE ARE</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Counsel built around your ideas, not our convenience
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              Founded in 2012, Perceptive Brains IP is a full-service
              intellectual property practice supporting inventors, brands,
              and enterprises across patents, trademarks, copyrights, and
              industrial designs. We combine technical fluency with legal
              precision, so every filing reflects both the science and the
              strategy behind it.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Our attorneys and patent agents work in small, dedicated pods —
              meaning the person who understands your invention on day one is
              still on your file at grant, renewal, and enforcement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Patents", "Trademarks", "Copyrights", "Designs"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#0B1F3D]/10 bg-[#0B1F3D]/5 px-4 py-1.5 text-sm font-medium text-[#0B1F3D]"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative rounded-3xl border border-[#0B1F3D]/10 bg-white p-8 shadow-xl shadow-[#0B1F3D]/5 sm:p-10">
              <div className="absolute -top-4 -right-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B1F3D] to-[#C9A227] text-white shadow-lg shadow-[#C9A227]/30">
                <Sparkles size={22} />
              </div>
              <ul className="space-y-6">
                {[
                  { icon: Users, text: "45+ attorneys, agents, and technical specialists" },
                  { icon: Globe2, text: "Filing coverage across 40+ jurisdictions" },
                  { icon: ShieldCheck, text: "Full lifecycle: search, filing, prosecution, enforcement" },
                  { icon: Award, text: "Recognized IP practice since 2012" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#0B1F3D]/5 text-[#9C7A1E]">
                      <Icon size={18} />
                    </span>
                    <span className="text-sm leading-relaxed text-slate-700">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================= MISSION & VISION ============================= */}
      <section className="bg-gradient-to-b from-slate-50 to-[#0B1F3D]/[0.04] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#9C7A1E]">MISSION &amp; VISION</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              What drives our practice
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-white bg-white/70 p-9 shadow-xl shadow-[#0B1F3D]/5 backdrop-blur-xl">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B1F3D] to-[#16305C] text-white shadow-lg shadow-[#0B1F3D]/30">
                  <Target size={22} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Our Mission</h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  To make intellectual property protection accessible,
                  understandable, and dependable — so every inventor, founder,
                  and creator can secure the value of their original work
                  without friction or guesswork.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="h-full rounded-3xl border border-white bg-white/70 p-9 shadow-xl shadow-[#0B1F3D]/5 backdrop-blur-xl">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C9A227] to-[#8A6D1E] text-white shadow-lg shadow-[#C9A227]/30">
                  <Eye size={22} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Our Vision</h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  To be the trusted global counsel for innovators — known for
                  precision filings, transparent counsel, and portfolios that
                  hold up under scrutiny, litigation, and growth.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================= WHY CHOOSE US ============================= */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#9C7A1E]">WHY CHOOSE US</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Filing expertise you can measure
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 90}>
              <div className="group h-full rounded-2xl border border-slate-100 bg-white p-7 shadow-sm shadow-[#0B1F3D]/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C9A227]/40 hover:shadow-xl hover:shadow-[#0B1F3D]/10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1F3D]/5 text-[#9C7A1E] transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-[#0B1F3D] group-hover:to-[#C9A227] group-hover:text-white">
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================= CORE VALUES ============================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1F3D] to-[#16305C] py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#E7C873]">CORE VALUES</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              The principles behind every filing
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 90}>
                <div className="h-full rounded-2xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.1]">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-[#E7C873]">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-white">{title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/70">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= OUR PROCESS ============================= */}
      <section id="process" className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#9C7A1E]">OUR PROCESS</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            A clear path from idea to registration
          </h2>
        </Reveal>

        <div className="relative">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-[#C9A227]/40 via-[#0B1F3D]/15 to-transparent sm:left-1/2 sm:-translate-x-1/2" />
          <div className="space-y-10">
            {process.map(({ icon: Icon, tag, title, desc }, i) => {
              const leftSide = i % 2 === 0;
              return (
                <Reveal key={tag} delay={i * 100}>
                  <div className="relative flex flex-col gap-4 pl-16 sm:grid sm:grid-cols-2 sm:gap-10 sm:pl-0">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-slate-50 bg-gradient-to-br from-[#0B1F3D] to-[#C9A227] text-white shadow-md shadow-[#C9A227]/30 sm:left-1/2 sm:-translate-x-1/2">
                      <Icon size={18} />
                    </div>
                    <div className={`${leftSide ? "sm:col-start-1 sm:pr-14 sm:text-right" : "sm:col-start-2 sm:pl-14 sm:order-2"}`}>
                      <span className="text-xs font-semibold tracking-[0.2em] text-[#9C7A1E]">{tag}</span>
                      <h3 className="mt-1.5 text-lg font-semibold text-slate-900">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
                    </div>
                    <div className={leftSide ? "sm:col-start-2" : "sm:col-start-1 sm:order-1"} />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================= ACHIEVEMENTS ============================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#081226] to-[#16305C] py-24">
        <div className="pointer-events-none absolute -top-24 left-1/4 h-[360px] w-[360px] rounded-full bg-[#C9A227]/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#E7C873]">ACHIEVEMENTS</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Results our clients rely on
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { icon: FileCheck2, value: 1200, suffix: "+", label: "Applications filed" },
              { icon: TrendingUp, value: 98, suffix: "%", label: "Grant success rate" },
              { icon: Globe2, value: 40, suffix: "+", label: "Countries covered" },
              { icon: Award, value: 13, suffix: "", label: "Years in practice" },
            ].map(({ icon: Icon, value, suffix, label }, i) => (
              <Reveal key={label} delay={i * 100}>
                <div className="h-full rounded-2xl border border-white/15 bg-white/[0.06] p-7 text-center backdrop-blur-xl">
                  <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-[#E7C873]">
                    <Icon size={20} />
                  </div>
                  <div className="text-3xl font-semibold text-white">
                    <CountUp value={value} suffix={suffix} />
                  </div>
                  <div className="mt-1.5 text-xs leading-snug text-[#E7C873]/75">{label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= TEAM ============================= */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#9C7A1E]">OUR TEAM</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Attorneys and agents behind your portfolio
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-2">
          {team.map(
            (
              {
                id,
                name,
                title,
                department,
                qualification,
                experience,
                expertise,
                bio,
                photo,
                linkedin,
                email,
              },
              i
            ) => (
              <Reveal key={id} delay={i * 90}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm shadow-[#0B1F3D]/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#0B1F3D]/10 sm:flex-row">
                  <div className="relative h-64 flex-none overflow-hidden sm:h-auto sm:w-48">
                    <img
                      src={photo}
                      alt={name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3D]/60 via-transparent to-transparent sm:bg-gradient-to-r" />
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#0B1F3D] backdrop-blur">
                      <BadgeCheck size={12} />
                      {experience}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[11px] font-semibold tracking-[0.15em] text-[#9C7A1E]">
                      {department.toUpperCase()}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">{name}</h3>
                    <p className="mt-0.5 text-sm text-[#9C7A1E]">{title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{qualification}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{bio}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {expertise.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-[#0B1F3D]/10 bg-[#0B1F3D]/5 px-3 py-1 text-[11px] font-medium text-[#0B1F3D]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-4">
                      <a
                        href={linkedin}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1F3D]/5 text-[#9C7A1E] transition-colors hover:bg-[#C9A227] hover:text-white"
                        aria-label={`${name} on LinkedIn`}
                      >
                        <FaLinkedinIn size={16} />
                      </a>
                      <a
                        href={`mailto:${email}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1F3D]/5 text-[#9C7A1E] transition-colors hover:bg-[#C9A227] hover:text-white"
                        aria-label={`Email ${name}`}
                      >
                        <Mail size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          )}
        </div>
      </section>

      {/* ============================= TESTIMONIALS ============================= */}
      <section className="bg-gradient-to-b from-[#0B1F3D]/[0.04] to-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#9C7A1E]">TESTIMONIALS</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              What our clients say
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {testimonials.map(({ quote, name, tag }, i) => (
              <Reveal key={name} delay={i * 100}>
                <div className="h-full rounded-2xl border border-slate-100 bg-white p-8 shadow-sm shadow-[#0B1F3D]/5">
                  <Quote className="mb-4 text-[#C9A227]/35" size={28} strokeWidth={1.5} />
                  <p className="text-sm leading-relaxed text-slate-700">{quote}</p>
                  <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4">
                    <CheckCircle2 size={15} className="text-[#9C7A1E]" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{name}</p>
                      <p className="text-xs text-slate-500">{tag}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= CTA BANNER ============================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1F3D] via-[#16305C] to-[#16305C] py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <Reveal className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#E7C873]">NEXT STEP</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to protect your idea?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            Book a free consultation with our team and get a clear, actionable
            path forward for your patent, trademark, or copyright.
          </p>
          <button className="group mt-9 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[#0B1F3D] shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:shadow-xl">
            Get your free consultation
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-4 text-xs tracking-wide text-[#E7C873]/70">RESPONSE WITHIN 1 BUSINESS DAY</p>
        </Reveal>
      </section>
    </main>
  );
}