import {
  Scale,
  ShieldCheck,
  FileCheck2,
  FileSearch,
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
  Download,
  Lock,
  FileText,
  Rocket,
} from "lucide-react";

import vaneetAroraPhoto from "../../../assets/our-team/advocate-vaneet-arora.png";
import jayvirShahPhoto from "../../../assets/our-team/dr-jayvir-shah.png";
import hirdayPalPhoto from "../../../assets/our-team/dr-hirday-pal-singh-sidhu.jpeg";
import kunalAroraPhoto from "../../../assets/our-team/advocate-kunal-arora.jpeg";

export const stats = [
  { value: 1200, suffix: "+", label: "IP filings completed" },
  { value: 98, suffix: "%", label: "First-response success rate" },
  { value: 40, suffix: "+", label: "Countries served" },
  { value: 13, suffix: "", label: "Years of practice" },
];

export const whyChooseUs = [
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

export const coreValues = [
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

export const howItWorks = [
  {
    numeral: "01",
    icon: Lock,
    tag: "Confidentiality first",
    title: "Sign a Non-Disclosure Agreement (NDA)",
    desc: "Your invention deserves complete confidentiality. Before any discussion begins, we sign a Mutual Non-Disclosure Agreement (NDA) to ensure your idea remains secure and protected.",
    badges: ["100% Confidential Process"],
    cta: {
      label: "Download NDA Form",
      href: "/document/Perceptive_Brains_IP_NDA.pdf",
      download: true,
    },
  },
  {
    numeral: "02",
    icon: FileText,
    tag: "Invention disclosure",
    title: "Submit Your Invention Disclosure Form (IDF)",
    desc: "Complete our easy-to-understand Invention Disclosure Form (IDF) and share the details of your innovation, including its purpose, working principle, novelty, and supporting drawings or photographs (if available).",
    badges: ["Simple Online Submission", "Expert Guidance Available"],
    cta: {
      label: "Download IDF Form",
      href: "/document/Perceptive_Brains_IP_Invention_Disclosure_Form.pdf",
      download: true,
    },
    formCta: {
      label: "Submit IDF Online",
    },
  },
  {
    numeral: "03",
    icon: FileSearch,
    tag: "Prior art search",
    title: "Patentability & Prior Art Search",
    desc: "Our IP experts conduct a comprehensive prior art search using advanced AI-powered patent databases and professional search software to assess the novelty and patentability of your invention.",
    badges: ["Global Patent Search", "Novelty Assessment", "Patentability Opinion", "Detailed Search Report"],
    price: "Starting at ₹1,000 only",
    payCta: { label: "Pay ₹1,000 & Start Search", href: "/payment/prior-art-search" },
  },
  {
    numeral: "04",
    icon: Rocket,
    tag: "Filing",
    title: "Patent Filing",
    desc: "Once your invention is found to be patentable, our patent professionals prepare the complete patent specification and file your patent application with the Indian Patent Office.",
    badges: [
      "Affordable Professional Fees",
      "Transparent Government Fees",
      "Patent Filing Within 7 Working Days*",
    ],
  },
];

export const filingBenefits = [
  "Confidential Handling of Every Innovation",
  "Experienced Patent Professionals",
  "AI-Assisted Patent Search",
  "Affordable Pricing for Students, Researchers & Startups",
  "End-to-End Patent Filing Support",
  "Fast Turnaround",
  "PAN India Services",
];

export const process = [
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

export const team = [
  {
    id: "VA",
    name: "Advocate Vaneet Arora",
    title: "Trademark Attorney",
    department: "Trademark Registration",
    qualification: "LL.B. | Trademark Attorney",
    experience: "20+ Years",
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
    experience: "15+ Years",
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
  {
    id: "HSS",
    name: "Dr. Hirday Pal Singh Sidhu",
    title: "Product Design Registration",
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
    department: "Legal & Public  IP Litigation Expert",
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
];

export const testimonials = [
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
