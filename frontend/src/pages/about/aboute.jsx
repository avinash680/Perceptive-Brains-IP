import { useEffect, useRef, useState } from "react";
import { Scale, FileCheck2, Users, BadgeCheck, ArrowRight } from "lucide-react";
import "./about.css";

const whyChooseUs = [
	{
		icon: Scale,
		title: "Proven expertise",
		desc: "Years of experience handling patents, trademarks, and copyrights across industries.",
	},
	{
		icon: FileCheck2,
		title: "On-time filing",
		desc: "We track every deadline so your applications never miss a critical date.",
	},
	{
		icon: Users,
		title: "Dedicated experts",
		desc: "A team of patent agents and IP attorneys assigned to your case, not a call center.",
	},
	{
		icon: BadgeCheck,
		title: "End-to-end support",
		desc: "From search and filing to prosecution, licensing, and litigation support.",
	},
];

const process = [
	{
		step: "01",
		tag: "INTAKE",
		title: "Consultation",
		desc: "We understand your invention, brand, or creative work and your protection goals.",
	},
	{
		step: "02",
		tag: "DILIGENCE",
		title: "Search & strategy",
		desc: "We run prior art, trademark, or design searches and map out the right filing strategy.",
	},
	{
		step: "03",
		tag: "SUBMISSION",
		title: "Drafting & filing",
		desc: "Our experts draft and file your application with the relevant IP office.",
	},
	{
		step: "04",
		tag: "EXAMINATION",
		title: "Prosecution & grant",
		desc: "We respond to office actions and guide your application through to registration.",
	},
	{
		step: "05",
		tag: "ONGOING",
		title: "Portfolio management",
		desc: "We help you manage, renew, license, and enforce your IP long after filing.",
	},
];

const teamMembers = [
	{
		name: "Aarav Sharma",
		role: "Managing Partner & Patent Attorney",
		reg: "IN-04412",
		qualification: "B.Tech (Electrical) · LL.B · Reg. Indian Patent Agent",
		image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
	},
	{
		name: "Priya Patel",
		role: "Head of Trademark Division",
		reg: "IN-05108",
		qualification: "BBA.LL.B · LL.M (IPR) · Reg. Trademark Agent",
		image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
	},
	{
		name: "Rohan Gupta",
		role: "Senior IP Strategist — Energy Tech",
		reg: "IN-03976",
		qualification: "M.Tech (Power Systems) · PG Dip. IPR",
		image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
	},
	{
		name: "Neha Singh",
		role: "Litigation Counsel",
		reg: "IN-06231",
		qualification: "LL.B · LL.M (IPR) · Bar Council of India",
		image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800",
	},
];

const testimonials = [
	{
		quote:
			"They guided us through our first patent filing with patience and clarity, start to finish.",
		name: "Startup founder, AI/ML",
		file: "FILE EMIP-2024-118",
	},
	{
		quote:
			"Fast, professional, and thorough — our trademark was registered without a single objection.",
		name: "D2C brand owner",
		file: "FILE EMIP-2023-092",
	},
];

/* Reveals content with a soft fade + rise the first time it enters the
   viewport. Kept as a single small hook rather than an animation library,
   so the page has no new dependency. */
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
		}, options || { threshold: 0.15 });
		io.observe(node);
		return () => io.disconnect();
	}, []);

	return [ref, inView];
}

function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
	const [ref, inView] = useInView();
	return (
		<Tag
			ref={ref}
			className={`eip-reveal ${inView ? "eip-reveal--visible" : ""} ${className}`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			{children}
		</Tag>
	);
}

function Perforation() {
	return <div className="eip-perforation" aria-hidden="true" />;
}

function FilingStamp() {
	return (
		<svg viewBox="0 0 200 200" className="eip-stamp" role="img" aria-label="Perceptive Brains IP registration seal">
			<defs>
				<path id="arcTop" d="M 24,100 a 76,76 0 1,1 152,0" fill="none" />
				<path id="arcBottom" d="M 24,100 a 76,76 0 1,0 152,0" fill="none" />
			</defs>
			<circle cx="100" cy="100" r="92" fill="none" stroke="#101C36" strokeWidth="1" opacity="0.25" />
			<circle cx="100" cy="100" r="76" fill="none" stroke="#B08D3E" strokeWidth="1.4" strokeDasharray="2 4" />
			<text fontSize="9.2" letterSpacing="2.5" fontFamily="'IBM Plex Mono', monospace" fill="#101C36">
				<textPath href="#arcTop" startOffset="50%" textAnchor="middle">
					PERCEPTIVE BRAINS IP &nbsp;•&nbsp; EST. 2012
				</textPath>
			</text>
			<text fontSize="9.2" letterSpacing="2.5" fontFamily="'IBM Plex Mono', monospace" fill="#9B2C2C">
				<textPath href="#arcBottom" startOffset="50%" textAnchor="middle">
					PATENTS • TRADEMARKS • COPYRIGHTS
				</textPath>
			</text>
			<line x1="60" y1="100" x2="140" y2="100" stroke="#101C36" strokeWidth="1" opacity="0.2" />
			<text x="100" y="93" textAnchor="middle" fontFamily="'Fraunces', serif" fontSize="15" fill="#101C36">
				REGISTERED
			</text>
			<text x="100" y="112" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" letterSpacing="1.5" fill="#5B6472">
				IP COUNSEL
			</text>
		</svg>
	);
}

export default function About() {
	return (
		<main className="eip-about">
			{/* Hero */}
			<section className="eip-hero">
				<div className="eip-container eip-hero__grid">
					<div>
						<div className="eip-hero__meta">
							<span className="eip-hero__dot" aria-hidden="true" />
							FILE NO. EMIP/2026/00142 · STATUS: ACTIVE
						</div>
						<h1 className="eip-font-display eip-hero__title">
							Protecting ideas,
							<br />
							one filing at a time.
						</h1>
						<p className="eip-hero__desc">
							Perceptive Brains IP helps startups, businesses, and individual creators protect
							their patents, trademarks, copyrights, and designs — with clear guidance
							at every step of the process.
						</p>
						<div className="eip-hero__ctas">
							<button className="eip-btn eip-btn--primary">
								Book a filing consultation
								<ArrowRight size={16} aria-hidden="true" />
							</button>
							<a href="#process" className="eip-link">
								SEE OUR PROCESS
							</a>
						</div>
					</div>
					<div>
						<FilingStamp />
					</div>
				</div>
			</section>

			<Perforation />

			{/* Why choose us — ledger */}
			<section className="eip-section">
				<div className="eip-container eip-container--medium">
					<Reveal className="eip-section__head">
						<p className="eip-eyebrow">SCHEDULE A — WHY CLIENTS FILE WITH US</p>
						<h2 className="eip-font-display eip-h2">Why choose us</h2>
					</Reveal>
					<div className="eip-ledger">
						{whyChooseUs.map(({ icon: Icon, title, desc }, i) => (
							<Reveal key={title} delay={i * 70} className="eip-ledger__row">
								<span className="eip-font-mono eip-ledger__index">
									§{String(i + 1).padStart(2, "0")}
								</span>
								<Icon size={20} className="eip-ledger__icon" aria-hidden="true" />
								<div>
									<h3 className="eip-ledger__title">{title}</h3>
									<p className="eip-ledger__desc">{desc}</p>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			<Perforation />

			{/* Our process — filing timeline */}
			<section id="process" className="eip-section eip-section--tint">
				<div className="eip-container eip-container--narrow">
					<Reveal className="eip-section__head">
						<p className="eip-eyebrow">SCHEDULE B — FILING TIMELINE</p>
						<h2 className="eip-font-display eip-h2">Our process</h2>
					</Reveal>
					<div className="eip-timeline">
						<div className="eip-timeline__line" aria-hidden="true" />
						<div className="eip-timeline__list">
							{process.map(({ step, tag, title, desc }, i) => (
								<Reveal key={step} delay={i * 90} className="eip-timeline__item">
									<div className="eip-timeline__marker eip-font-mono">{step}</div>
									<div>
										<span className="eip-timeline__tag eip-font-mono">{tag}</span>
										<h3 className="eip-timeline__title">{title}</h3>
										<p className="eip-timeline__desc">{desc}</p>
									</div>
								</Reveal>
							))}
						</div>
					</div>
				</div>
			</section>

			<Perforation />

			{/* Meet our experts */}
			<section className="eip-section">
				<div className="eip-container">
					<Reveal className="eip-section__head">
						<p className="eip-eyebrow">SCHEDULE C — COUNSEL ON RECORD</p>
						<h2 className="eip-font-display eip-h2" style={{ maxWidth: "48rem" }}>
							A multidisciplinary team of attorneys, agents and engineers.
						</h2>
					</Reveal>

					<div className="eip-experts__grid">
						{teamMembers.map((member, i) => (
							<Reveal key={member.name} delay={i * 90} className="eip-expert-card">
								<div className="eip-expert-card__media">
									<img src={member.image} alt={member.name} loading="lazy" />
									<span className="eip-expert-card__reg eip-font-mono">REG. {member.reg}</span>
								</div>
								<div className="eip-expert-card__bar" aria-hidden="true" />
								<div className="eip-expert-card__body">
									<h3 className="eip-expert-card__name">{member.name}</h3>
									<p className="eip-expert-card__role">{member.role}</p>
									<p className="eip-expert-card__qual">{member.qualification}</p>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials — case notes */}
			<section className="eip-section eip-section--dark">
				<div className="eip-container eip-container--medium">
					<Reveal>
						<p className="eip-eyebrow eip-eyebrow--gold" style={{ textAlign: "center" }}>
							SCHEDULE D — CASE NOTES
						</p>
						<h2
							className="eip-font-display eip-h2"
							style={{ color: "#fff", textAlign: "center", marginBottom: 48 }}
						>
							What our clients say
						</h2>
					</Reveal>
					<div className="eip-notes-grid">
						{testimonials.map(({ quote, name, file }, i) => (
							<Reveal
								key={name}
								delay={i * 120}
								className={`eip-note-card ${i === 0 ? "eip-note-card--left" : "eip-note-card--right"}`}
							>
								<div className="eip-note-card__top">
									<span className="eip-note-card__file eip-font-mono">{file}</span>
									<span className="eip-note-card__badge eip-font-mono">
										<BadgeCheck size={11} aria-hidden="true" />
										VERIFIED CLIENT
									</span>
								</div>
								<p className="eip-note-card__quote">&ldquo;{quote}&rdquo;</p>
								<p className="eip-note-card__author eip-font-mono">— {name}</p>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="eip-cta">
				<div className="eip-container">
					<Reveal>
						<p className="eip-eyebrow" style={{ textAlign: "center" }}>
							NEXT STEP — SCHEDULE A CONSULTATION
						</p>
						<h2 className="eip-font-display eip-cta__title">Ready to protect your idea?</h2>
						<p className="eip-cta__desc">
							Book a free consultation with our team and get a clear path forward.
						</p>
						<button className="eip-btn eip-btn--primary">
							Get consultation
							<ArrowRight size={18} aria-hidden="true" />
						</button>
						<p className="eip-cta__footnote">RESPONSE WITHIN 1 BUSINESS DAY</p>
					</Reveal>
				</div>
			</section>
		</main>
	);
}