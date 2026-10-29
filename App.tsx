import { useState, type ReactNode } from 'react'

type Screen =
  | 'home'
  | 'services'
  | 'urgency'
  | 'results'
  | 'detail'
  | 'at-hospital'
  | 'staff'

type StatusType = 'accepting' | 'limited' | 'unavailable' | 'referral'

const services = [
  ['consultation', 'General Consultation', 'Primary care for common health concerns'],
  ['laboratory', 'Laboratory', 'Blood tests and diagnostic services'],
  ['dental', 'Dental', 'Oral checkups and dental care'],
  ['maternal', 'Maternal Care', 'Prenatal and postnatal support'],
  ['pediatric', 'Pediatric Care', 'Healthcare for infants and children'],
  ['emergency', 'Emergency Care', 'Immediate care for serious conditions'],
  ['vaccination', 'Vaccination', 'Routine and required immunizations'],
  ['pharmacy', 'Pharmacy', 'Medicines and prescription support'],
  ['specialist', 'Specialist Consultation', 'Care from a specialist doctor'],
] as const

type Facility = {
  name: string
  type: 'Provincial Medical Center' | 'Provincial Hospital' | 'Private Hospital'
  distance: string
  address: string
  status: StatusType
  statusLabel: string
  services: string[]
  update: string
}

const bukidnonHospitals: [string, string, Facility['type']][] = [
  ['Bukidnon Provincial Medical Center', 'Malaybalay City', 'Provincial Medical Center'],
  ['Bukidnon Provincial Hospital – Maramag', 'Maramag', 'Provincial Hospital'],
  ['Bukidnon Provincial Hospital – Manolo Fortich', 'Manolo Fortich', 'Provincial Hospital'],
  ['Bukidnon Provincial Hospital – Kibawe', 'Kibawe', 'Provincial Hospital'],
  ['Bukidnon Provincial Hospital – Kalilangan', 'Kalilangan', 'Provincial Hospital'],
  ['Bukidnon Provincial Hospital – Malitbog', 'Malitbog', 'Provincial Hospital'],
  ['Bukidnon Provincial Hospital – San Fernando', 'San Fernando', 'Provincial Hospital'],
  ['Bukidnon Provincial Hospital – Talakag', 'Talakag', 'Provincial Hospital'],
  ['Adventist Medical Center – Valencia City', 'Valencia City', 'Private Hospital'],
  ['Valencia Polymedic General Hospital', 'Valencia City', 'Private Hospital'],
  ['La Viña General Hospital', 'Valencia City', 'Private Hospital'],
  ['Bethel Baptist Hospital', 'Malaybalay City', 'Private Hospital'],
  ['Malaybalay Polymedic General Hospital', 'Malaybalay City', 'Private Hospital'],
  ['St. Jude Thaddeus General Hospital', 'Malaybalay City', 'Private Hospital'],
  ['Bongcas Holy Child Hospital', 'Maramag', 'Private Hospital'],
  ['St. Joseph Southern Bukidnon Hospital', 'Maramag', 'Private Hospital'],
  ['Abella Midway Hospital', 'Valencia City', 'Private Hospital'],
  ['Don Carlos Doctors Hospital', 'Don Carlos', 'Private Hospital'],
  ['Phillips Memorial Hospital', 'Manolo Fortich', 'Private Hospital'],
  ['Esther Hospital', 'Valencia City', 'Private Hospital'],
  ['St. Claire Hospital', 'Quezon', 'Private Hospital'],
  ['Valencia Medical Hospital', 'Valencia City', 'Private Hospital'],
  ['Blanco Doctors’ Hospital', 'Valencia City', 'Private Hospital'],
]

const statusCycle: [StatusType, string][] = [
  ['accepting', 'Accepting patients'],
  ['limited', 'Limited capacity'],
  ['referral', 'Referral required'],
  ['accepting', 'Accepting patients'],
]

const serviceCycle = [
  ['General Consultation', 'Laboratory', 'Emergency'],
  ['General Consultation', 'Vaccination', 'Maternal Care'],
  ['Specialist Consultation', 'Laboratory', 'Pharmacy'],
  ['General Consultation', 'Pediatric Care', 'Emergency'],
]

const facilities: Facility[] = bukidnonHospitals.map(([name, location, type], index) => ({
  name,
  type,
  distance: location,
  address: 'Bukidnon',
  status: statusCycle[index % statusCycle.length][0],
  statusLabel: statusCycle[index % statusCycle.length][1],
  services: serviceCycle[index % serviceCycle.length],
  update: `Updated ${4 + index * 2} minutes ago`,
}))

const iconPaths: Record<string, ReactNode> = {
  arrow: <path d="m9 18 6-6-6-6M4 12h11" />,
  back: <path d="m15 18-6-6 6-6M20 12H9" />,
  check: <path d="m5 12 4 4L19 6" />,
  consultation: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6M16 11h6" />
    </>
  ),
  laboratory: (
    <>
      <path d="M9 3h6M10 9h4M10 3v6l-4.5 8a2.7 2.7 0 0 0 2.4 4h8.2a2.7 2.7 0 0 0 2.4-4L14 9V3" />
      <path d="M7.5 16h9" />
    </>
  ),
  dental: (
    <path d="M12 5c-2.4-2.3-7-1.4-8 2.1-.9 3 1.1 5 2 7.4.8 2.1.5 5.5 2.5 5.5 1.5 0 1.4-4.7 3.5-4.7s2 4.7 3.5 4.7c2 0 1.7-3.4 2.5-5.5.9-2.4 2.9-4.4 2-7.4C19 3.6 14.4 2.7 12 5Z" />
  ),
  maternal: (
    <>
      <circle cx="12" cy="7" r="3" />
      <path d="M8 21v-5a4 4 0 0 1 8 0v5M6 13c1.3 1 2 2.7 2 5M18 13c-1.3 1-2 2.7-2 5" />
    </>
  ),
  pediatric: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M9 10h.01M15 10h.01M9 15c1.8 1.4 4.2 1.4 6 0M12 4c0-2 2-2 2-1" />
    </>
  ),
  emergency: (
    <>
      <path d="M12 3 2.5 20h19L12 3Z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  vaccination: (
    <>
      <path d="m14 4 6 6M17 7l-8.5 8.5M7 11l6 6M5 15l4 4M3 21l4-4M15 2l7 7" />
    </>
  ),
  pharmacy: (
    <>
      <path d="M8.5 4.5a4.2 4.2 0 0 1 6 0l5 5a4.2 4.2 0 0 1-6 6l-5-5a4.2 4.2 0 0 1 0-6Z" />
      <path d="m10 12 5-5" />
    </>
  ),
  specialist: (
    <>
      <path d="M5 3h14v18H5zM9 7h6M9 11h6M9 15h3" />
    </>
  ),
  location: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  hospital: (
    <>
      <path d="M4 21V5h16v16M2 21h20M9 9h6M12 6v6M8 21v-5h8v5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v5c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V6l-8-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </>
  ),
  people: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M19 8v6M16 11h6" />
    </>
  ),
  logout: <path d="M10 17l5-5-5-5M15 12H3M15 4h5v16h-5" />,
  refresh: (
    <>
      <path d="M20 7h-5V2" />
      <path d="M20 7a9 9 0 1 0 1 8" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
}

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  )
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <button className={`logo ${light ? 'logo-light' : ''}`} onClick={() => window.scrollTo(0, 0)} aria-label="Hopping home">
      <img className="logo-image" src="/hopping-logo-cropped.png" alt="" aria-hidden="true" />
      <span>HOPPING</span>
    </button>
  )
}

function StatusBadge({ status, children }: { status: StatusType; children: ReactNode }) {
  return (
    <span className={`status-badge status-${status}`}>
      <span className="status-dot" />
      {children}
    </span>
  )
}

function Header({
  screen,
  navigate,
}: {
  screen: Screen
  navigate: (screen: Screen) => void
}) {
  const isStaff = screen === 'staff'
  if (isStaff) {
    return (
      <header className="staff-header">
        <div className="header-inner">
          <Logo light />
          <div className="staff-identity">
            <span className="staff-avatar">MC</span>
            <span className="staff-name">
              <strong>Maria Cruz</strong>
              <small>Facility staff</small>
            </span>
            <button className="icon-button light" onClick={() => navigate('home')} aria-label="Sign out">
              <Icon name="logout" />
            </button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav aria-label="Main navigation">
          <button onClick={() => navigate('home')}>How it works</button>
          <button onClick={() => navigate('results')}>Facilities</button>
          <button className="staff-link" onClick={() => navigate('staff')}>
            Hospital portal
          </button>
        </nav>
      </div>
    </header>
  )
}

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedService, setSelectedService] = useState('General Consultation')
  const [selectedUrgency, setSelectedUrgency] = useState('non-emergency')
  const [selectedFacility, setSelectedFacility] = useState(facilities[0])
  const [staffStatus, setStaffStatus] = useState<StatusType>('accepting')
  const [filters, setFilters] = useState<string[]>([])
  const [saved, setSaved] = useState(false)

  const navigate = (next: Screen) => {
    setScreen(next)
    setSaved(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleFilter = (filter: string) => {
    setFilters((current) => {
      if (current.includes(filter)) return current.filter((item) => item !== filter)
      if (filter === 'Government / Provincial') {
        return [...current.filter((item) => item !== 'Private hospitals'), filter]
      }
      if (filter === 'Private hospitals') {
        return [...current.filter((item) => item !== 'Government / Provincial'), filter]
      }
      return [...current, filter]
    })
  }

  return (
    <div className={`app-shell ${screen === 'staff' ? 'staff-app' : ''}`}>
      <Header screen={screen} navigate={navigate} />
      <main>
        {screen === 'home' && <Home navigate={navigate} />}
        {screen === 'services' && (
          <Services
            selected={selectedService}
            onSelect={setSelectedService}
            onBack={() => navigate('home')}
            onContinue={() => navigate('urgency')}
          />
        )}
        {screen === 'urgency' && (
          <Urgency
            selected={selectedUrgency}
            onSelect={setSelectedUrgency}
            onBack={() => navigate('services')}
            onContinue={() => navigate('results')}
          />
        )}
        {screen === 'results' && (
          <Results
            service={selectedService}
            filters={filters}
            onToggleFilter={toggleFilter}
            onBack={() => navigate('urgency')}
            onSelect={(facility) => {
              setSelectedFacility(facility)
              navigate('detail')
            }}
          />
        )}
        {screen === 'detail' && (
          <Detail
            facility={selectedFacility}
            service={selectedService}
            saved={saved}
            onSave={() => setSaved(true)}
            onBack={() => navigate('results')}
          />
        )}
        {screen === 'at-hospital' && (
          <AtHospital onBack={() => navigate('home')} onView={() => navigate('results')} />
        )}
        {screen === 'staff' && (
          <StaffDashboard status={staffStatus} onStatusChange={setStaffStatus} />
        )}
      </main>
      {screen !== 'staff' && <Footer navigate={navigate} />}
    </div>
  )
}

function Home({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <>
      <section className="hero">
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <Icon name="shield" size={18} />
              Your guide to public healthcare
            </span>
            <h1>
              Right Care. <br />
              <span>Right Place.</span>
              <br /> Less Waiting.
            </h1>
            <p>
              Find Bukidnon healthcare facilities that offer the service you need—and
              check their current status before you go.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => navigate('services')}>
                Find the right facility
                <Icon name="arrow" />
              </button>
              <button className="secondary-button" onClick={() => navigate('at-hospital')}>
                <Icon name="hospital" />
                I’m already at the hospital
              </button>
            </div>
            <div className="trust-line">
              <span>
                <Icon name="check" size={16} /> Free to use
              </span>
              <span>
                <Icon name="check" size={16} /> No account needed
              </span>
              <span>
                <Icon name="check" size={16} /> Privacy-first
              </span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Healthcare professional assisting a patient">
            <img
              src="https://images.unsplash.com/photo-1609126385558-bc3fc5082b0a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1080"
              alt="A friendly community healthcare professional"
            />
            <div className="hero-photo-overlay" />
            <div className="floating-card facility-mini">
              <span className="mini-icon">
                <Icon name="hospital" />
              </span>
              <span>
                <small>Nearby facility</small>
                <strong>Bukidnon Provincial Medical Center</strong>
                <em><span /> Accepting patients</em>
              </span>
            </div>
            <div className="floating-card update-mini">
              <span className="pulse-ring">
                <Icon name="refresh" size={18} />
              </span>
              <span>
                <strong>Live status</strong>
                <small>Updated 4 min ago</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="container">
          <div className="section-heading">
            <span className="overline">Simple, guided, reassuring</span>
            <h2>Get to the right care in three steps</h2>
            <p>HOPPING helps you make a more informed choice before leaving home.</p>
          </div>
          <div className="steps-grid">
            {[
              ['01', 'consultation', 'Tell us what you need', 'Choose a healthcare service and indicate how urgent your concern feels.'],
              ['02', 'location', 'See nearby options', 'Compare public facilities, services, distance, and current capacity.'],
              ['03', 'check', 'Check before you go', 'Review referral requirements and clear next steps—all in one place.'],
            ].map(([number, icon, title, description], index) => (
              <article className="step-card" key={number}>
                <span className="step-number">{number}</span>
                <span className="step-icon"><Icon name={icon} size={27} /></span>
                <h3>{title}</h3>
                <p>{description}</p>
                {index < 2 && <span className="step-connector"><Icon name="arrow" /></span>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="container trust-grid">
          <div className="trust-copy">
            <span className="overline overline-light">Built for Bukidnon healthcare</span>
            <h2>Clear information when it matters most</h2>
            <p>
              HOPPING uses facility-provided updates and DOH-aligned language to help patients
              navigate care with confidence.
            </p>
            <div className="trust-points">
              <span><Icon name="shield" /><strong>Responsible guidance</strong><small>Never replaces professional triage</small></span>
              <span><Icon name="refresh" /><strong>Timely updates</strong><small>See when information was last confirmed</small></span>
            </div>
          </div>
          <aside className="disclaimer-card">
            <span className="disclaimer-icon">i</span>
            <div>
              <strong>Important health notice</strong>
              <p>
                HOPPING does not diagnose conditions or replace professional medical advice.
                In a life-threatening emergency, seek immediate care at the nearest emergency
                facility or call 911.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

function Progress({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div className="progress-wrap" aria-label={`Step ${current} of 3`}>
      <span>Step {current} of 3</span>
      <div className="progress-track">
        {[1, 2, 3].map((step) => <i key={step} className={step <= current ? 'active' : ''} />)}
      </div>
    </div>
  )
}

function PageTop({
  onBack,
  eyebrow,
  title,
  description,
  step,
}: {
  onBack: () => void
  eyebrow: string
  title: string
  description: string
  step?: 1 | 2 | 3
}) {
  return (
    <div className="page-top">
      <button className="back-button" onClick={onBack}><Icon name="back" /> Back</button>
      {step && <Progress current={step} />}
      <span className="overline">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

function Services({
  selected,
  onSelect,
  onBack,
  onContinue,
}: {
  selected: string
  onSelect: (service: string) => void
  onBack: () => void
  onContinue: () => void
}) {
  return (
    <section className="flow-page">
      <div className="container narrow">
        <PageTop
          onBack={onBack}
          eyebrow="Choose a service"
          title="What healthcare service do you need?"
          description="Select the option that best matches your current need. You can change this later."
          step={1}
        />
        <div className="service-grid">
          {services.map(([icon, title, description]) => (
            <button
              key={title}
              className={`service-card ${selected === title ? 'selected' : ''}`}
              onClick={() => onSelect(title)}
              aria-pressed={selected === title}
            >
              <span className="service-icon"><Icon name={icon} size={26} /></span>
              <span className="service-text">
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
              <span className="radio-mark"><Icon name="check" size={15} /></span>
            </button>
          ))}
        </div>
        <div className="flow-footer">
          <span><Icon name="shield" size={17} /> Your answers are not stored.</span>
          <button className="primary-button" onClick={onContinue}>Continue <Icon name="arrow" /></button>
        </div>
      </div>
    </section>
  )
}

function Urgency({
  selected,
  onSelect,
  onBack,
  onContinue,
}: {
  selected: string
  onSelect: (urgency: string) => void
  onBack: () => void
  onContinue: () => void
}) {
  const options = [
    ['emergency', 'Emergency', 'Seek emergency care immediately', 'Severe symptoms, life-threatening injury, or difficulty breathing.'],
    ['urgent', 'Urgent', 'Contact a facility promptly', 'Needs attention soon but does not appear immediately life-threatening.'],
    ['non-emergency', 'Non-emergency', 'Primary care is recommended', 'Routine care, mild symptoms, follow-up, or preventive services.'],
  ]
  return (
    <section className="flow-page">
      <div className="container urgency-width">
        <PageTop
          onBack={onBack}
          eyebrow="Urgency guide"
          title="How urgent does your concern feel?"
          description="This simple guide helps us suggest an appropriate type of facility. It is not a diagnosis."
          step={2}
        />
        <div className="urgency-grid">
          {options.map(([value, title, action, description]) => (
            <button
              key={value}
              className={`urgency-card urgency-${value} ${selected === value ? 'selected' : ''}`}
              onClick={() => onSelect(value)}
              aria-pressed={selected === value}
            >
              <span className="urgency-indicator"><i /></span>
              <span className="urgency-text">
                <strong>{title}</strong>
                <b>{action}</b>
                <small>{description}</small>
              </span>
              <span className="radio-mark"><Icon name="check" size={15} /></span>
            </button>
          ))}
        </div>
        <div className="warning-notice">
          <Icon name="shield" />
          <p><strong>HOPPING does not diagnose.</strong> If you believe this is an emergency, do not wait for facility status. Go to the nearest emergency department or call 911.</p>
        </div>
        <div className="flow-footer">
          <span>You can always seek professional help if you are unsure.</span>
          <button className="primary-button" onClick={onContinue}>See facilities <Icon name="arrow" /></button>
        </div>
      </div>
    </section>
  )
}

function Results({
  service,
  filters,
  onToggleFilter,
  onBack,
  onSelect,
}: {
  service: string
  filters: string[]
  onToggleFilter: (filter: string) => void
  onBack: () => void
  onSelect: (facility: (typeof facilities)[number]) => void
}) {
  const filteredFacilities = facilities.filter((facility) => {
    if (
      filters.includes('Government / Provincial') &&
      facility.type === 'Private Hospital'
    ) return false
    if (filters.includes('Private hospitals') && facility.type !== 'Private Hospital') return false
    if (filters.includes('Accepting patients') && facility.status !== 'accepting') return false
    return true
  })

  return (
    <section className="results-page">
      <div className="container">
        <PageTop
          onBack={onBack}
          eyebrow="Recommended facilities"
          title="Care options near you"
          description={`Showing Bukidnon facilities for ${service.toLowerCase()}, starting near Malaybalay City.`}
          step={3}
        />
        <div className="results-toolbar">
          <div className="location-field">
            <Icon name="location" size={19} />
            <span><small>Your location</small><strong>Malaybalay City, Bukidnon</strong></span>
            <button>Change</button>
          </div>
          <div className="filter-row" aria-label="Facility filters">
            {['Government / Provincial', 'Private hospitals', 'Open now', 'Accepting patients'].map((filter) => (
              <button
                key={filter}
                className={filters.includes(filter) ? 'active' : ''}
                onClick={() => onToggleFilter(filter)}
                aria-pressed={filters.includes(filter)}
              >
                {filters.includes(filter) && <Icon name="check" size={14} />}
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="results-layout">
          <div className="facility-list">
            <div className="list-heading">
              <span><strong>{filteredFacilities.length} facilities found</strong><small>Status is provided by each facility</small></span>
              <span className="live-label"><i /> Live updates</span>
            </div>
            {filteredFacilities.map((facility) => (
              <article className="facility-card" key={facility.name}>
                <div className="facility-card-top">
                  <span className="facility-icon"><Icon name="hospital" /></span>
                  <div className="facility-title">
                    <span>{facility.type}</span>
                    <h2>{facility.name}</h2>
                    <p><Icon name="location" size={15} /> {facility.distance} · {facility.address}</p>
                  </div>
                  <StatusBadge status={facility.status}>{facility.statusLabel}</StatusBadge>
                </div>
                <div className="service-tags">
                  {facility.services.map((item) => <span key={item}>{item}</span>)}
                </div>
                <div className="facility-card-footer">
                  <span><Icon name="clock" size={16} /> {facility.update}</span>
                  <button className="outline-button" onClick={() => onSelect(facility)}>
                    Check before I go <Icon name="arrow" size={19} />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <aside className="map-card" aria-label="Map showing Bukidnon healthcare facilities">
            <div className="map-grid" />
            <span className="road road-one" />
            <span className="road road-two" />
            <span className="road road-three" />
            {[
              ['pin-one', '1'],
              ['pin-two', '2'],
              ['pin-three', '3'],
            ].map(([position, number]) => <span className={`map-pin ${position}`} key={number}>{number}</span>)}
            <button className="map-control" aria-label="Center map"><Icon name="location" size={19} /></button>
            <div className="map-legend"><span><i className="green" /> Accepting</span><span><i className="yellow" /> Limited</span><span><i className="blue" /> Referral</span></div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Detail({
  facility,
  service,
  saved,
  onSave,
  onBack,
}: {
  facility: (typeof facilities)[number]
  service: string
  saved: boolean
  onSave: () => void
  onBack: () => void
}) {
  return (
    <section className="detail-page">
      <div className="container detail-width">
        <button className="back-button" onClick={onBack}><Icon name="back" /> Back to results</button>
        <div className="detail-header-card">
          <div className="detail-heading">
            <span className="facility-icon large"><Icon name="hospital" size={29} /></span>
            <div>
              <span className="overline">{facility.type}</span>
              <h1>{facility.name}</h1>
              <p><Icon name="location" size={16} /> {facility.address} · {facility.distance}</p>
            </div>
          </div>
          <StatusBadge status={facility.status}>{facility.statusLabel}</StatusBadge>
        </div>
        <div className="detail-grid">
          <div className="detail-main">
            <div className="status-panel">
              <div className="status-panel-top">
                <span className={`status-beacon ${facility.status}`}><i /></span>
                <div>
                  <span className="overline">Current facility status</span>
                  <h2>{facility.statusLabel}</h2>
                  <p>This facility is currently able to receive patients for the selected service.</p>
                </div>
              </div>
              <div className="updated-row"><Icon name="refresh" size={16} /> {facility.update} by facility staff</div>
            </div>
            <section className="visit-summary">
              <h2>Before you go</h2>
              <div className="summary-list">
                <div><span className="summary-icon"><Icon name="consultation" /></span><span><small>Service needed</small><strong>{service}</strong></span></div>
                <div><span className="summary-icon"><Icon name="specialist" /></span><span><small>Referral required</small><strong>No referral required</strong></span><span className="yes-badge">No</span></div>
                <div><span className="summary-icon"><Icon name="clock" /></span><span><small>Operating hours today</small><strong>Open until 8:00 PM</strong></span></div>
              </div>
            </section>
            <section className="next-steps">
              <h2>Your next steps</h2>
              <ol>
                <li><span>1</span><p><strong>Bring a valid ID and health records</strong><small>Include your PhilHealth ID, prescriptions, and recent test results if available.</small></p></li>
                <li><span>2</span><p><strong>Proceed to the Patient Navigation Desk</strong><small>Tell staff you checked the facility’s status through HOPPING.</small></p></li>
                <li><span>3</span><p><strong>Expect professional triage on arrival</strong><small>Facility staff will assess your condition and determine the appropriate care.</small></p></li>
              </ol>
            </section>
          </div>
          <aside className="detail-aside">
            <div className="action-card">
              <span className="action-icon"><Icon name="location" size={25} /></span>
              <h3>Ready to go?</h3>
              <p>Open directions to review the best route from your current location.</p>
              <button className="primary-button full">Get directions <Icon name="arrow" /></button>
              <button className="text-button" onClick={onSave}>
                <Icon name={saved ? 'check' : 'shield'} size={18} /> {saved ? 'Details saved' : 'Save these details'}
              </button>
            </div>
            <div className="alternative-card">
              <span className="overline">Alternative nearby</span>
              <h3>Bethel Baptist Hospital</h3>
              <p>Malaybalay City · Accepting patients</p>
              <button onClick={onBack}>View alternative <Icon name="arrow" size={17} /></button>
            </div>
            <div className="soft-disclaimer">
              <span>i</span>
              <p>Facility status can change. Final care decisions are made by healthcare professionals after triage.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function AtHospital({ onBack, onView }: { onBack: () => void; onView: () => void }) {
  return (
    <section className="at-hospital-page">
      <div className="container at-hospital-width">
        <button className="back-button" onClick={onBack}><Icon name="back" /> Back home</button>
        <div className="empathy-card">
          <span className="empathy-illustration"><Icon name="people" size={42} /></span>
          <span className="overline">We’re here to help</span>
          <h1>Already at a hospital?</h1>
          <p>
            We understand that being redirected can feel stressful. Let’s help you understand
            your options without delaying urgent care.
          </p>
        </div>
        <div className="hospital-guidance">
          <div className="guidance-primary">
            <span className="guidance-number">1</span>
            <div>
              <h2>Speak with the patient navigator first</h2>
              <p>Ask the hospital’s patient navigator or healthcare professional whether referral is appropriate. They can assess your needs and guide you safely.</p>
            </div>
          </div>
          <div className="guidance-note">
            <Icon name="emergency" />
            <p><strong>Having severe or worsening symptoms?</strong> Tell hospital staff immediately. Do not leave an emergency facility without speaking to a healthcare professional.</p>
          </div>
          <div className="alternative-action">
            <div>
              <span className="overline">If staff recommends another facility</span>
              <h2>Explore nearby alternatives</h2>
              <p>Check available services, current capacity, and referral requirements before traveling.</p>
            </div>
            <button className="primary-button" onClick={onView}>View alternative facilities <Icon name="arrow" /></button>
          </div>
        </div>
      </div>
    </section>
  )
}

function StaffDashboard({
  status,
  onStatusChange,
}: {
  status: StatusType
  onStatusChange: (status: StatusType) => void
}) {
  const statusOptions: [StatusType, string, string][] = [
    ['accepting', 'Accepting patients', 'Facility can receive patients for listed services'],
    ['limited', 'Limited capacity', 'Longer waits or reduced service availability'],
    ['unavailable', 'Unable to accept non-emergency cases', 'Emergency patients must still be assessed'],
    ['referral', 'Referral required', 'A valid referral is needed for selected services'],
  ]
  return (
    <div className="dashboard-shell">
      <aside className="staff-sidebar">
        <span className="portal-label">Hospital portal</span>
        <nav aria-label="Hospital portal">
          <button className="active"><Icon name="hospital" /> Overview</button>
          <button><Icon name="refresh" /> Status updates</button>
          <button><Icon name="consultation" /> Services</button>
        </nav>
        <div className="sidebar-help">
          <Icon name="shield" />
          <strong>Need support?</strong>
          <p>Contact the HOPPING facility support team.</p>
          <button>Get help</button>
        </div>
      </aside>
      <section className="dashboard-content">
        <div className="dashboard-top">
          <div>
            <span className="overline">Monday, 28 April</span>
            <h1>Good morning, Maria</h1>
            <p>Keep your facility status current so patients can plan with confidence.</p>
          </div>
          <span className="verified-badge"><Icon name="shield" size={17} /> Verified facility</span>
        </div>
        <div className="dashboard-stats">
          <div><span className="stat-icon"><Icon name="people" /></span><p><small>Patient views today</small><strong>284</strong><em>12% from yesterday</em></p></div>
          <div><span className="stat-icon"><Icon name="refresh" /></span><p><small>Last status update</small><strong>8:42 AM</strong><em>18 minutes ago</em></p></div>
          <div><span className="stat-icon"><Icon name="consultation" /></span><p><small>Active services</small><strong>8 of 9</strong><em>1 temporarily limited</em></p></div>
        </div>
        <div className="dashboard-grid">
          <section className="status-update-card">
            <div className="panel-heading">
              <span><small>Live facility status</small><h2>Bukidnon Provincial Medical Center</h2></span>
              <span className="live-label"><i /> Visible to patients</span>
            </div>
            <p className="panel-description">Choose the status that best reflects your facility’s current ability to receive patients.</p>
            <div className="status-options">
              {statusOptions.map(([value, label, description]) => (
                <button
                  key={value}
                  className={`staff-status-option option-${value} ${status === value ? 'selected' : ''}`}
                  onClick={() => onStatusChange(value)}
                  aria-pressed={status === value}
                >
                  <span className="staff-dot" />
                  <span><strong>{label}</strong><small>{description}</small></span>
                  <span className="radio-mark"><Icon name="check" size={14} /></span>
                </button>
              ))}
            </div>
            <div className="update-actions">
              <span><Icon name="clock" size={16} /> Changes appear to patients immediately</span>
              <button className="staff-primary" onClick={() => onStatusChange(status)}>Update facility status</button>
            </div>
          </section>
          <aside className="staff-side-column">
            <div className="patient-preview">
              <span className="overline">Patient preview</span>
              <h3>What patients see now</h3>
              <div className="preview-facility">
                <span className="facility-icon"><Icon name="hospital" /></span>
                <span><small>Provincial Medical Center</small><strong>Bukidnon Provincial Medical Center</strong></span>
              </div>
              <StatusBadge status={status}>
                {statusOptions.find(([value]) => value === status)?.[1]}
              </StatusBadge>
              <p><Icon name="refresh" size={15} /> Updated just now by Maria C.</p>
            </div>
            <div className="service-health">
              <div className="panel-heading"><span><small>Today’s services</small><h3>Service availability</h3></span><button>Manage</button></div>
              {[
                ['General Consultation', 'Available'],
                ['Laboratory', 'Available'],
                ['Pediatric Care', 'Limited'],
                ['Emergency Care', 'Always assessed'],
              ].map(([service, state]) => (
                <div className="service-health-row" key={service}>
                  <span>{service}</span>
                  <em className={state === 'Limited' ? 'limited' : ''}>{state}</em>
                </div>
              ))}
            </div>
          </aside>
        </div>
        <div className="staff-reminder">
          <Icon name="shield" />
          <p><strong>Emergency access reminder</strong><span>Never use facility status to refuse emergency assessment. All emergency patients must receive professional triage.</span></p>
        </div>
      </section>
    </div>
  )
}

function Footer({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <footer>
      <div className="container footer-inner">
        <div><Logo light /><p>Helping Filipinos find the right public healthcare facility with less uncertainty.</p></div>
        <div className="footer-links">
          <span><strong>For patients</strong><button onClick={() => navigate('services')}>Find a facility</button><button onClick={() => navigate('at-hospital')}>Already at a hospital</button></span>
          <span><strong>For facilities</strong><button onClick={() => navigate('staff')}>Hospital portal</button><button>Facility support</button></span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2025 HOPPING. A patient navigation platform.</span>
        <span>Does not replace professional medical advice.</span>
      </div>
    </footer>
  )
}

export default App
