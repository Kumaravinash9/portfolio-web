import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Content — real data. Replace [bracketed] items where noted.         */
/* ------------------------------------------------------------------ */

const TEAM_NAME = "InnoAI Labs";
const CONTACT_EMAIL = "kumaravinash.job@gmail.com";
const DEMO_URL = "https://claude.ai/code/artifact/341364ae-f6a5-477a-b3a6-057cc6a67764";

const members = [
  {
    initials: "AK",
    photo: "/avinash.png",
    name: "Avinash Kumar",
    role: "AI & Backend Engineer",
    tag: "Senior Software Engineer",
    school: "IIT BHU",
    years: "4+ yrs",
    bio: "Builds AI-powered platforms and cloud-native backends at enterprise scale — RAG, LLM agents, computer vision, and distributed systems. Google Summer of Code alum.",
    stack: ["LangChain", "AI/ML", "RAG", "Computer Vision", "Backend", "Platform"],
    companies: [
      { name: "eBay", domain: "ebay.com" },
      { name: "InMobi", domain: "inmobi.com" },
      { name: "Deutsche Bank", domain: "db.com" },
      { name: "Google (GSoC)", domain: "google.com" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Kumaravinash9" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/avinash-kumar-5270a3212/" },
      { label: "Email", href: "mailto:kumaravinash.job@gmail.com" },
    ],
  },
  {
    initials: "AJ",
    photo: "/aviral.jpeg",
    name: "Aviral Jain",
    role: "AI & Backend Engineer",
    tag: "Senior Software Engineer",
    school: "IIT BHU",
    years: "4+ yrs",
    bio: "Builds AI products and scalable, cloud-native backends at global scale — distributed systems, platform reliability, and hands-on AI/LLM engineering.",
    stack: ["AI / LLMs", "Backend", "Cloud (OCI)", "Distributed Systems", "Microservices"],
    companies: [
      { name: "Oracle Cloud (OCI)", domain: "oracle.com" },
      { name: "Microsoft", domain: "microsoft.com" },
      { name: "Agoda", domain: "agoda.com" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/aviralJain101" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/aviral-jain-10/" },
      { label: "Email", href: "mailto:aviral.application@gmail.com" },
    ],
  },
];

const services = [
  {
    k: "AI",
    title: "AI & LLM Engineering",
    items: ["RAG platforms & knowledge assistants", "LLM agents & function calling", "Computer vision & OCR pipelines", "Vector search & embeddings"],
  },
  {
    k: "BE",
    title: "Backend & APIs",
    items: ["Scalable REST APIs & microservices", "Distributed systems & schedulers", "High-throughput data pipelines", "Database design & optimization"],
  },
  {
    k: "PL",
    title: "Platform & Cloud",
    items: ["CI/CD & developer tooling", "Cloud-native infra (GCP / OCI / AWS)", "Observability & reliability", "Performance & cost optimization"],
  },
];

const cases = [
  {
    title: "Enterprise Knowledge Intelligence Platform",
    stack: "Python · FastAPI · PostgreSQL · pgvector · Qdrant · Gemini · OCR",
    body: "A production RAG platform to ingest, index, and query enterprise engineering documents — P&IDs, ISO drawings, technical manuals. Semantic chunking, hybrid retrieval (BM25 + vector), reranking, and provenance tracking for traceable answers.",
    by: "Avinash Kumar",
    demo: DEMO_URL,
  },
  {
    title: "AI-Powered DEXPI Extraction",
    stack: "Python · OpenCV · PaddleOCR · Gemini Vision · FastAPI · Celery · Redis",
    body: "An AI system that extracts structured data — spools, welds, valves, dimensions, BOM — from piping isometric drawings. Combines OCR, vision, and multimodal LLMs to detect symbols, reconstruct topology, and validate relationships on an async, fault-tolerant pipeline.",
    by: "Avinash Kumar",
  },
  {
    title: "Real-Time Embedding & Personalization Pipeline",
    stack: "Python · Kafka · Redis · Faiss · TensorFlow · GCP",
    body: "High-throughput embedding pipelines generating and serving user-profile embeddings for recommendation models. ANN vector retrieval (Faiss) with real-time feature serving for low-latency inference at production scale.",
    by: "Avinash Kumar",
  },
  {
    title: "Monumento — AR Monument Recognition",
    stack: "Flutter · Android · Firebase · Google Cloud Vision API · AR",
    body: "A cross-platform AR app that identifies monuments in real time with Google Cloud Vision and surfaces contextual information from Wikipedia. Firebase-backed auth, cloud storage, and real-time sync, with native Android components bridged into Flutter for a responsive, interactive experience.",
    by: "Avinash Kumar",
    demo: "https://github.com/AOSSIE-Org/Monumento",
    demoLabel: "View on GitHub",
  },
  {
    title: "Doc-QA Agent — LLM Document Question Answering",
    stack: "Python · FastAPI · ChromaDB · Sentence-Transformers · OpenAI · PyMuPDF · Streamlit",
    body: "An LLM-powered agent that answers questions over your documents. Parses PDFs and web content (PyMuPDF, BeautifulSoup), embeds chunks with sentence-transformers into a ChromaDB vector store, and generates grounded answers via OpenAI over a FastAPI backend — with both a Streamlit UI and a CLI, containerized with Docker.",
    by: "Aviral Jain",
    demo: "https://github.com/aviralJain101/doc-qa-agent",
    demoLabel: "View on GitHub",
  },
];

const whyUs = [
  ["IIT grads", "Both of us graduated from IIT — deep grounding in algorithms, system design, and first-principles thinking that shows up as cleaner architecture and fewer surprises."],
  ["Proven at scale", "Systems built at Google, eBay, Deutsche Bank, Oracle, Microsoft, and Agoda — serving hundreds of millions of users."],
  ["Direct collaboration", "You talk to the engineers building your product — fast decisions, clear communication, no middlemen."],
  ["End to end", "AI, backend, data, and infrastructure under one roof. We own the whole system."],
];

/* ------------------------------------------------------------------ */
/*  Motion helpers                                                      */
/* ------------------------------------------------------------------ */

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] } }),
};

function Eyebrow({ children }) {
  return (
    <div className="font-mono text-[11px] tracking-[0.28em] text-cobalt uppercase mb-4">
      // {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Signature — animated system schematic in the hero                   */
/* ------------------------------------------------------------------ */

function Schematic() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i) => ({ pathLength: 1, opacity: 1, transition: { pathLength: { duration: 1.1, delay: 0.4 + i * 0.12, ease: "easeInOut" }, opacity: { duration: 0.2, delay: 0.4 + i * 0.12 } } }),
  };
  const pop = {
    hidden: { scale: 0, opacity: 0 },
    show: (i) => ({ scale: 1, opacity: 1, transition: { duration: 0.4, delay: 0.9 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] } }),
  };
  const engineers = [{ y: 66, label: "AK" }, { y: 154, label: "AJ" }];
  const systems = [
    { y: 30, label: "RAG" },
    { y: 84, label: "AGENTS" },
    { y: 138, label: "BACKEND" },
    { y: 192, label: "CLOUD" },
  ];
  return (
    <svg viewBox="0 0 420 230" className="w-full h-auto" role="img" aria-label="Diagram: two engineers connected to the systems they build">
      {/* connecting lines */}
      {engineers.map((e, ei) =>
        systems.map((s, si) => (
          <motion.path
            key={`${ei}-${si}`}
            d={`M 96 ${e.y} C 190 ${e.y}, 210 ${s.y}, 300 ${s.y}`}
            fill="none"
            stroke="var(--color-cobalt)"
            strokeWidth="1.2"
            strokeOpacity="0.35"
            variants={draw}
            custom={ei * 4 + si}
          />
        ))
      )}
      {/* engineer nodes */}
      {engineers.map((e, i) => (
        <motion.g key={e.label} variants={pop} custom={i}>
          <rect x="40" y={e.y - 18} width="56" height="36" rx="8" fill="var(--color-paper-2)" stroke="var(--color-ink)" strokeWidth="1.5" />
          <text x="68" y={e.y + 5} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="14" fontWeight="600" fill="var(--color-ink)">{e.label}</text>
        </motion.g>
      ))}
      {/* system nodes */}
      {systems.map((s, i) => (
        <motion.g key={s.label} variants={pop} custom={i + 2}>
          <circle cx="300" cy={s.y} r="6" fill="var(--color-cobalt)" />
          <text x="316" y={s.y + 4} fontFamily="IBM Plex Mono" fontSize="11" letterSpacing="1" fill="var(--color-ink-soft)">{s.label}</text>
        </motion.g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return (
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    );
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="min-h-screen text-ink">
      {/* NAV */}
      <nav className="sticky top-0 z-30 border-b border-line bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="font-display text-lg font-bold tracking-tight">
            <span className="text-cobalt">◇</span> {TEAM_NAME}
          </a>
          <div className="hidden gap-8 font-mono text-xs uppercase tracking-widest text-muted md:flex">
            <a href="#team" className="hover:text-ink">Team</a>
            <a href="#services" className="hover:text-ink">Services</a>
            <a href="#work" className="hover:text-ink">Work</a>
            <a href="#why" className="hover:text-ink">Why us</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="rounded-lg border border-line p-2 text-ink transition hover:border-cobalt hover:text-cobalt"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href="https://calendly.com/aiinno/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (window.Calendly) {
                  e.preventDefault();
                  window.Calendly.initPopupWidget({ url: "https://calendly.com/aiinno/30min" });
                }
              }}
              className="rounded-lg bg-cobalt px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white transition hover:opacity-90"
            >
              Hire us
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28">
        <div className="grid items-center gap-14 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.h1
              initial="hidden" animate="show" variants={rise} custom={1}
              className="font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight md:text-[3.7rem]"
            >
              We architect <span className="text-cobalt">AI systems</span> and the backends that run them.
            </motion.h1>
            <motion.p initial="hidden" animate="show" variants={rise} custom={2} className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
              A two-person engineering studio from IIT BHU. We ship production RAG, LLM applications, and distributed backends — the kind that hold up at enterprise scale.
            </motion.p>
            <motion.p initial="hidden" animate="show" variants={rise} custom={2.5} className="mt-4 font-mono text-sm text-ink">
              <span className="text-cobalt">▸</span> Looking for hard, complex problems worth solving.
            </motion.p>
            <motion.div initial="hidden" animate="show" variants={rise} custom={3} className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="rounded-lg bg-cobalt px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wide text-white transition hover:translate-y-[-2px] hover:shadow-[0_12px_30px_-10px_var(--color-cobalt)]">
                Start a project
              </a>
              <a href="#work" className="rounded-lg border border-line-strong px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wide text-ink transition hover:border-cobalt">
                See the work
              </a>
            </motion.div>
          </div>

          {/* signature schematic */}
          <motion.div
            initial="hidden" animate="show"
            className="rounded-2xl border border-line bg-surface p-6 shadow-[0_1px_0_#fff_inset,0_20px_40px_-30px_rgba(11,18,32,0.4)]"
          >
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
              <span>fig.01 — what we build</span>
              <span>engineers → systems</span>
            </div>
            <Schematic />
          </motion.div>
        </div>

        {/* spec strip — stats as an engineering readout, not gradient tiles */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={rise}
          className="mt-16 flex flex-wrap items-stretch divide-line rounded-xl border border-line bg-surface font-mono md:divide-x"
        >
          {[
            ["8+", "years combined"],
            ["2×", "IIT engineers"],
            ["134M+", "users served at scale"],
            ["10+", "production systems shipped"],
          ].map(([n, l]) => (
            <div key={l} className="flex-1 px-6 py-5">
              <div className="text-2xl font-semibold text-ink">{n}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-muted">{l}</div>
            </div>
          ))}
        </motion.div>

        {/* experience / credibility strip */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={rise}
          className="mt-10 overflow-hidden rounded-xl border border-line bg-surface"
        >
          <div className="flex items-center gap-3 border-b border-line px-6 py-4">
            <span className="h-2 w-2 rounded-full bg-cobalt" />
            <span className="font-display text-base font-semibold tracking-tight text-ink md:text-xl">
              Proven at the companies that set the bar
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4 lg:grid-cols-7">
            {[
              { name: "Google", domain: "google.com" },
              { name: "eBay", domain: "ebay.com" },
              { name: "Microsoft", domain: "microsoft.com" },
              { name: "Deutsche Bank", domain: "db.com" },
              { name: "InMobi", domain: "inmobi.com" },
              { name: "Oracle", domain: "oracle.com" },
              { name: "Agoda", domain: "agoda.com" },
            ].map((c) => (
              <div
                key={c.name}
                title={c.name}
                className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-line bg-paper px-3 py-4 transition hover:-translate-y-0.5 hover:border-cobalt hover:shadow-[0_12px_24px_-16px_var(--color-cobalt)]"
              >
                <img
                  src={`https://www.google.com/s2/favicons?domain=${c.domain}&sz=128`}
                  alt={c.name}
                  width="36"
                  height="36"
                  loading="lazy"
                  className="h-9 w-9 rounded-md object-contain opacity-90 transition group-hover:opacity-100"
                />
                <span className="text-center font-mono text-[10px] uppercase tracking-wider text-muted transition group-hover:text-ink">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </header>

      {/* TEAM */}
      <section id="team" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">The two people you'll work with</h2>
        <p className="mt-3 max-w-xl text-ink-soft">No account managers, no hand-offs — you work directly with the engineers building your product.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {members.map((m, i) => (
            <motion.article
              key={m.name}
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={rise} custom={i}
              className="group rounded-2xl border border-line bg-surface p-7 transition hover:border-cobalt hover:shadow-[0_24px_50px_-34px_rgba(36,86,255,0.55)]"
            >
              <div className="flex items-start justify-between">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className="h-16 w-16 rounded-xl object-cover ring-1 ring-line" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-ink font-mono text-lg font-semibold text-white">{m.initials}</div>
                )}
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted">{m.years} · {m.school}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight">{m.name}</h3>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-cobalt">{m.role}</span>
                {m.tag && (
                  <span className="rounded-full bg-cobalt-soft px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-cobalt">
                    {m.tag}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{m.bio}</p>

              <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted">Shipped systems at</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {m.companies.map((c) => (
                  <span key={c.name} className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-2.5 py-1.5">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${c.domain}&sz=64`}
                      alt=""
                      width="16"
                      height="16"
                      loading="lazy"
                      className="h-4 w-4 rounded-sm"
                    />
                    <span className="text-xs font-medium text-ink">{c.name}</span>
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {m.stack.map((s) => (
                  <span key={s} className="rounded-full border border-line bg-paper-2 px-3 py-1 font-mono text-[11px] text-ink-soft">{s}</span>
                ))}
              </div>

              <div className="mt-6 flex gap-5 font-mono text-xs uppercase tracking-wider text-muted">
                {m.links.map((l) => (
                  <a key={l.label} href={l.href} className="transition hover:text-cobalt">{l.label}</a>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-y border-line bg-surface-2">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">What we can build for you</h2>
          <p className="mt-3 max-w-xl text-ink-soft">Combined capabilities across AI, backend, and platform engineering.</p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={rise} custom={i}
                className="rounded-2xl border border-line bg-paper p-7"
              >
                <div className="font-mono text-xs font-semibold tracking-widest text-cobalt">{s.k}</div>
                <h3 className="mt-2 font-display text-lg font-semibold">{s.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="mt-[2px] font-mono text-cobalt">→</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Systems we've designed & shipped</h2>

        <div className="mt-10 space-y-5">
          {cases.map((c, i) => (
            <motion.article
              key={c.title}
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} variants={rise} custom={i}
              className="rounded-2xl border border-line bg-surface p-7"
            >
              <h3 className="font-display text-xl font-bold tracking-tight">{c.title}</h3>
              <div className="mt-1 font-mono text-[12px] text-cobalt">{c.stack}</div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{c.body}</p>
              {c.demo && (
                <a href={c.demo} target="_blank" rel="noopener noreferrer" className="group mt-4 inline-flex items-center gap-2 rounded-lg border border-cobalt px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wide text-cobalt transition hover:bg-cobalt hover:text-white">
                  {c.demoLabel || "Live demo"}
                  <span className="transition group-hover:translate-x-0.5">↗</span>
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="border-y border-line bg-surface-2">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Enterprise quality, boutique attention</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {whyUs.map(([t, d], i) => (
              <motion.div
                key={t}
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={rise} custom={i}
                className="rounded-2xl border border-line bg-paper p-6"
              >
                <div className="font-mono text-cobalt">◇</div>
                <h3 className="mt-3 font-display font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="max-w-4xl font-display text-2xl font-semibold leading-snug tracking-tight md:text-4xl">
            We're looking for <span className="text-cobalt">hard, complex problems</span> worth solving — the ambiguous, high-stakes, "is this even possible?" kind. If it's a real challenge, we want it.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-24 text-center">
        <Eyebrow>Let's build</Eyebrow>
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight md:text-5xl">
          Have a system worth building right?
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-ink-soft">
          Grab a 30-minute slot and we'll hop on a Google Meet to talk through what you're building — no pitch, just a straight read on scope, approach, and timeline.
        </p>
        <div className="mt-9 flex justify-center">
          <a
            href="https://calendly.com/aiinno/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (window.Calendly) {
                e.preventDefault();
                window.Calendly.initPopupWidget({ url: "https://calendly.com/aiinno/30min" });
              }
            }}
            className="inline-block rounded-lg bg-cobalt px-8 py-4 font-mono text-sm font-semibold uppercase tracking-wide text-white transition hover:translate-y-[-2px] hover:shadow-[0_16px_36px_-12px_var(--color-cobalt)]"
          >
            Hire the team →
          </a>
        </div>

        <div className="mt-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">Connect with us</div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {members.map((m) => (
              <div key={m.name} className="inline-flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-2.5">
                <span className="font-display text-sm font-semibold text-ink">{m.name}</span>
                <span className="h-4 w-px bg-line" />
                {m.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-wider text-muted transition hover:text-cobalt"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-8 font-mono text-[11px] uppercase tracking-widest text-muted">
          <span>◇ {TEAM_NAME}</span>
        </div>
      </footer>
    </div>
  );
}
