import { useState } from 'react'
import clsx from 'clsx'

const SECTIONS = [
  { id: 'all',       label: 'All' },
  { id: 'books',     label: 'Books' },
  { id: 'apps',      label: 'Apps' },
  { id: 'nutrition', label: 'Nutrition' },
  { id: 'telehealth',label: 'Telehealth' },
]

const RESOURCES = [
  // ── Books ────────────────────────────────────────────────────────────────
  {
    id: 'obesity-code',
    section: 'books',
    sectionLabel: 'Books',
    emoji: '📗',
    name: 'The Obesity Code',
    sub: 'Dr. Jason Fung',
    description: 'A science-backed look at why we gain weight and how insulin resistance drives obesity — essential context for anyone coming off GLP-1 medication.',
    affiliate: true,
    href: '#',
  },
  {
    id: 'always-hungry',
    section: 'books',
    sectionLabel: 'Books',
    emoji: '📘',
    name: 'Always Hungry?',
    sub: 'Dr. David Ludwig',
    description: 'Explains why low-fat diets backfire and how to reset your metabolism through smarter food choices — practical for long-term maintenance.',
    affiliate: true,
    href: '#',
  },
  {
    id: 'intuitive-eating',
    section: 'books',
    sectionLabel: 'Books',
    emoji: '📙',
    name: 'Intuitive Eating',
    sub: 'Evelyn Tribole & Elyse Resch',
    description: 'The original framework for making peace with food and rebuilding body trust — especially valuable during the post-medication adjustment period.',
    affiliate: true,
    href: '#',
  },
  {
    id: 'plateau-effect',
    section: 'books',
    sectionLabel: 'Books',
    emoji: '📕',
    name: 'The Plateau Effect',
    sub: 'Bob Sullivan & Hugh Thompson',
    description: 'Explores the science behind why progress stalls in every domain and how to break through — applies directly to weight maintenance plateaus.',
    affiliate: true,
    href: '#',
  },

  // ── Apps ─────────────────────────────────────────────────────────────────
  {
    id: 'cronometer',
    section: 'apps',
    sectionLabel: 'Apps',
    emoji: '🔬',
    name: 'Cronometer',
    sub: 'Precision nutrition tracking',
    description: 'Tracks micronutrients alongside macros — ideal for post-GLP-1 users who need to ensure adequate protein, zinc, and B-vitamins during weight maintenance.',
    affiliate: false,
    href: '#',
  },
  {
    id: 'zero',
    section: 'apps',
    sectionLabel: 'Apps',
    emoji: '⏱️',
    name: 'Zero',
    sub: 'Intermittent fasting tracker',
    description: 'Clean, simple fasting timer with zone tracking and insights — pairs well with the appetite changes that often persist after stopping GLP-1 medication.',
    affiliate: false,
    href: '#',
  },
  {
    id: 'headspace',
    section: 'apps',
    sectionLabel: 'Apps',
    emoji: '🧘',
    name: 'Headspace',
    sub: 'Stress & mindfulness',
    description: 'Guided meditation and stress management — directly relevant to weight maintenance since cortisol is one of the primary drivers of rebound weight gain.',
    affiliate: false,
    href: '#',
  },
  {
    id: 'oura',
    section: 'apps',
    sectionLabel: 'Apps',
    emoji: '💍',
    name: 'Oura Ring',
    sub: 'Sleep & recovery tracking',
    description: 'Tracks sleep quality, HRV, and readiness scores — poor sleep measurably increases hunger hormones, making it a key variable to monitor in maintenance.',
    affiliate: false,
    href: '#',
  },

  // ── Nutrition ─────────────────────────────────────────────────────────────
  {
    id: 'levels',
    section: 'nutrition',
    sectionLabel: 'Nutrition',
    emoji: '📊',
    name: 'Levels',
    sub: 'Continuous glucose monitor',
    description: 'Real-time blood glucose feedback shows exactly how different meals affect your metabolic response — particularly useful for understanding post-GLP-1 glucose patterns.',
    affiliate: true,
    href: '#',
  },
  {
    id: 'momentous',
    section: 'nutrition',
    sectionLabel: 'Nutrition',
    emoji: '💪',
    name: 'Momentous Protein',
    sub: 'NSF-certified protein powder',
    description: 'Third-party tested for purity and label accuracy — hitting 1.2–1.6g protein per kg body weight is one of the most evidence-backed strategies for maintenance.',
    affiliate: true,
    href: '#',
  },
  {
    id: 'factor',
    section: 'nutrition',
    sectionLabel: 'Nutrition',
    emoji: '🥘',
    name: 'Factor',
    sub: 'Ready-made meal delivery',
    description: 'Chef-prepared, dietitian-approved meals with clear macro breakdowns — removes the decision fatigue that can derail nutrition habits in the maintenance phase.',
    affiliate: true,
    href: '#',
  },
  {
    id: 'vital-proteins',
    section: 'nutrition',
    sectionLabel: 'Nutrition',
    emoji: '🌿',
    name: 'Vital Proteins',
    sub: 'Collagen peptides',
    description: 'Collagen supports skin elasticity and joint health during body recomposition — commonly relevant after significant weight loss on GLP-1 therapy.',
    affiliate: true,
    href: '#',
  },

  // ── Telehealth ────────────────────────────────────────────────────────────
  {
    id: 'calibrate',
    section: 'telehealth',
    sectionLabel: 'Telehealth',
    emoji: '⚕️',
    name: 'Calibrate',
    sub: 'Metabolic health program',
    description: 'Year-long metabolic health program combining GLP-1 medication management with lifestyle coaching — designed specifically for sustainable weight maintenance.',
    affiliate: false,
    href: '#',
  },
  {
    id: 'found',
    section: 'telehealth',
    sectionLabel: 'Telehealth',
    emoji: '🩺',
    name: 'Found',
    sub: 'Weight care platform',
    description: 'Personalised weight care combining clinical treatment, medication management, and behavioural coaching for people navigating long-term weight health.',
    affiliate: false,
    href: '#',
  },
  {
    id: 'ro-body',
    section: 'telehealth',
    sectionLabel: 'Telehealth',
    emoji: '💊',
    name: 'Ro Body',
    sub: 'GLP-1 follow-up care',
    description: 'Telehealth platform offering ongoing GLP-1 prescriptions and follow-up care — useful for those continuing or transitioning off semaglutide or tirzepatide.',
    affiliate: false,
    href: '#',
  },
  {
    id: 'noom-med',
    section: 'telehealth',
    sectionLabel: 'Telehealth',
    emoji: '🏥',
    name: 'Noom Med',
    sub: 'Medication + coaching',
    description: 'Combines prescription GLP-1 management with Noom\'s behaviour-change curriculum — bridges the gap between medication use and the psychological side of maintenance.',
    affiliate: false,
    href: '#',
  },
]

const SECTION_ICONS = {
  books:      '📚',
  apps:       '📱',
  nutrition:  '🥗',
  telehealth: '🏥',
}

const SECTION_HEADINGS = {
  books:      { title: 'Recommended Reading',       sub: 'Curated books on weight maintenance and post-GLP-1 life.' },
  apps:       { title: 'Complementary Apps',        sub: 'Apps that pair well with Steady to support your daily habits.' },
  nutrition:  { title: 'Protein & Meal Support',    sub: 'Vetted products for post-GLP-1 nutritional needs.' },
  telehealth: { title: 'Medical & Clinical Support', sub: 'Services for ongoing GLP-1 care and weight maintenance.' },
}

function ResourceCard({ item }) {
  return (
    <div className="bg-white rounded-2xl border border-warm-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl leading-none" aria-hidden="true">{item.emoji}</span>
          <div>
            <p className="text-sm font-semibold text-warm-900 leading-tight">{item.name}</p>
            <p className="text-xs text-warm-500 mt-0.5">{item.sub}</p>
          </div>
        </div>
        {item.affiliate && (
          <span className="shrink-0 text-[10px] font-medium text-warm-400 bg-warm-50 border border-warm-100 rounded-full px-2 py-0.5">
            Affiliate
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-warm-600 leading-relaxed flex-1">{item.description}</p>

      {/* Footer row */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] font-medium text-warm-400 uppercase tracking-wide">{item.sectionLabel}</span>
        <a
          href={item.href}
          className="inline-flex items-center gap-1 text-xs font-medium text-teal-600 hover:text-teal-700 hover:underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more →
        </a>
      </div>
    </div>
  )
}

function SectionBlock({ sectionId, items }) {
  const heading = SECTION_HEADINGS[sectionId]
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg" aria-hidden="true">{SECTION_ICONS[sectionId]}</span>
        <h2 className="text-base font-semibold text-warm-900">{heading.title}</h2>
      </div>
      <p className="text-xs text-warm-500 mb-4">{heading.sub}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {items.map(item => <ResourceCard key={item.id} item={item} />)}
      </div>
    </div>
  )
}

export default function Resources() {
  const [activeSection, setActiveSection] = useState('all')

  const visibleSections = activeSection === 'all'
    ? ['books', 'apps', 'nutrition', 'telehealth']
    : [activeSection]

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Resources</h1>
        <p className="text-sm text-warm-500 mt-1">Tools, reading, and support for your maintenance journey.</p>
      </div>

      {/* Affiliate disclaimer */}
      <div className="bg-warm-50 border border-warm-100 rounded-2xl px-4 py-3 text-xs text-warm-500 leading-relaxed">
        <span className="font-medium text-warm-600">Disclosure: </span>
        Steady may earn a small commission from affiliate links at no extra cost to you. All resources are editorially selected based on quality and relevance to your maintenance journey.
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter resources by category">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            role="tab"
            aria-selected={activeSection === s.id}
            onClick={() => setActiveSection(s.id)}
            className={clsx(
              'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150',
              activeSection === s.id
                ? 'bg-teal-500 text-white shadow-sm'
                : 'bg-warm-100 text-warm-600 hover:bg-warm-200'
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Sections */}
      {visibleSections.map(sectionId => (
        <SectionBlock
          key={sectionId}
          sectionId={sectionId}
          items={RESOURCES.filter(r => r.section === sectionId)}
        />
      ))}
    </div>
  )
}
