(function () {
  const STORAGE = {
    theme: "clarity-theme",
    draft: "clarity-draft",
    current: "clarity-current-workspace",
    workspaces: "clarity-workspaces"
  };

  const APP = {
    nav: [
      ["index.html", "Home"],
      ["setup.html", "Start analysis"],
      ["workspace.html", "Workspace"],
      ["scenario-lab.html", "Scenario lab"],
      ["war-room.html", "War Room"],
      ["about.html", "Methodology"]
    ],
    moduleSections: [
      "Overview",
      "Company snapshot",
      "Market landscape",
      "Competitor benchmark",
      "Customer / segment analysis",
      "Financial signals",
      "Value chain",
      "Capability assessment",
      "AI disruption exposure",
      "Strategic options",
      "Scenario planning",
      "Recommendations",
      "Roadmap",
      "Board summary",
      "War Room"
    ],
    sectorArchetypes: [
      {
        name: "Industrial technology",
        keywords: ["industrial", "automation", "engineering", "equipment", "manufactur", "control"],
        market: "Mission-critical industrial systems",
        competitors: ["Siemens", "ABB", "Schneider Electric", "Rockwell Automation"],
        customers: ["Utilities", "Transport operators", "Process manufacturers"],
        capabilities: ["Installed base service", "Complex bidding", "Control software", "Field delivery"],
        ai: ["Remote diagnostics", "Predictive maintenance", "Scheduling optimization"],
        risks: ["Lower-cost digital challengers", "Regional delivery complexity", "Data fragmentation"]
      },
      {
        name: "Financial services",
        keywords: ["bank", "financial", "insurance", "asset", "payments", "capital markets", "fintech"],
        market: "Financial intermediation and managed risk",
        competitors: ["JPMorgan", "Visa", "Adyen", "BlackRock"],
        customers: ["Retail customers", "SMEs", "Enterprises"],
        capabilities: ["Risk management", "Product bundling", "Distribution", "Compliance execution"],
        ai: ["Fraud detection", "Relationship automation", "Credit workflows"],
        risks: ["Regulatory shifts", "Pricing compression", "Digital disintermediation"]
      },
      {
        name: "Healthcare and pharma",
        keywords: ["pharma", "health", "hospital", "medic", "biotech", "therapeutics", "care"],
        market: "Healthcare delivery and therapeutic innovation",
        competitors: ["Pfizer", "Roche", "UnitedHealth", "Novo Nordisk"],
        customers: ["Providers", "Patients", "Payers"],
        capabilities: ["Clinical evidence", "Channel access", "Commercial execution", "Regulatory readiness"],
        ai: ["Clinical workflow support", "Patient engagement", "Trial productivity"],
        risks: ["Regulatory delay", "Pipeline concentration", "Pricing pressure"]
      },
      {
        name: "Software and technology",
        keywords: ["software", "cloud", "technology", "platform", "data", "saas", "ai"],
        market: "Enterprise software and digital infrastructure",
        competitors: ["Microsoft", "Salesforce", "Oracle", "ServiceNow"],
        customers: ["CIO organizations", "Functional leaders", "Developers"],
        capabilities: ["Product velocity", "Ecosystem leverage", "Enterprise sales", "Retention motion"],
        ai: ["Copilots", "Workflow automation", "Developer productivity"],
        risks: ["Feature parity", "Platform dependence", "Pricing fatigue"]
      },
      {
        name: "Consumer and retail",
        keywords: ["retail", "consumer", "brand", "fashion", "food", "beverage", "ecommerce"],
        market: "Consumer demand and brand distribution",
        competitors: ["Amazon", "Walmart", "Nike", "Unilever"],
        customers: ["End consumers", "Retail partners", "Marketplaces"],
        capabilities: ["Brand building", "Merchandising", "Channel management", "Supply chain agility"],
        ai: ["Demand sensing", "Personalization", "Pricing optimization"],
        risks: ["Demand volatility", "Channel power", "Margin pressure"]
      },
      {
        name: "Energy and infrastructure",
        keywords: ["energy", "power", "utility", "oil", "gas", "grid", "infrastructure"],
        market: "Asset-intensive infrastructure and long-cycle operations",
        competitors: ["Shell", "Enel", "Vattenfall", "Iberdrola"],
        customers: ["Industrial buyers", "Grid operators", "Public sector"],
        capabilities: ["Asset reliability", "Capital allocation", "Regulatory navigation", "Safety execution"],
        ai: ["Asset monitoring", "Outage prediction", "Workforce planning"],
        risks: ["Commodity swings", "Capital intensity", "Regulatory intervention"]
      }
    ],
    sampleCompany: {
      name: "Aurelis Industrial Systems",
      description:
        "Global industrial technology company providing automation systems, field services, and connected software to regulated infrastructure and process-heavy industries.",
      country: "Denmark",
      source: "Curated demo company",
      confidence: "High"
    }
  };

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function hashString(input) {
    let hash = 2166136261;
    for (let index = 0; index < input.length; index += 1) {
      hash ^= input.charCodeAt(index);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return Math.abs(hash >>> 0);
  }

  function seededValue(seed, min, max) {
    const value = Math.sin(seed) * 10000;
    const normal = value - Math.floor(value);
    return min + normal * (max - min);
  }

  function titleCase(text) {
    return (text || "")
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  function slugify(text) {
    return (text || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function formatMoney(number) {
    const abs = Math.abs(number);
    if (abs >= 1000) return `USD ${(number / 1000).toFixed(1)}B`;
    if (abs >= 1) return `USD ${number.toFixed(1)}B`;
    return `USD ${(number * 1000).toFixed(0)}M`;
  }

  function formatPercent(number) {
    return `${number.toFixed(1)}%`;
  }

  function currentWorkspaces() {
    return load(STORAGE.workspaces, []);
  }

  function saveWorkspace(workspace) {
    const all = currentWorkspaces().filter((item) => item.id !== workspace.id);
    all.unshift(workspace);
    save(STORAGE.workspaces, all.slice(0, 8));
    save(STORAGE.current, workspace.id);
  }

  function currentWorkspace() {
    const workspaces = currentWorkspaces();
    const currentId = load(STORAGE.current, "");
    const found = workspaces.find((item) => item.id === currentId) || workspaces[0];
    return found || buildSampleWorkspace();
  }

  function inferArchetype(company) {
    const source = `${company.name} ${company.description || ""} ${company.industry || ""}`.toLowerCase();
    const matched =
      APP.sectorArchetypes.find((archetype) =>
        archetype.keywords.some((keyword) => source.includes(keyword))
      ) || APP.sectorArchetypes[0];
    return matched;
  }

  function rotate(list, count, seed) {
    const copy = list.slice();
    const offset = hashString(String(seed)) % copy.length;
    const rotated = copy.slice(offset).concat(copy.slice(0, offset));
    return rotated.slice(0, count);
  }

  function buildCompanyProfile(selection, setup) {
    const fallbackName = titleCase(setup.companyQuery || "Untitled Company");
    return {
      id: selection && selection.id ? selection.id : `manual-${slugify(fallbackName)}`,
      name: selection && selection.name ? selection.name : fallbackName,
      description:
        (selection && selection.description) ||
        `${fallbackName} is being analyzed as part of a structured situational strategy review.`,
      country: (selection && selection.country) || setup.geography || "Global",
      wikipediaTitle: selection && selection.wikipediaTitle ? selection.wikipediaTitle : "",
      source: selection && selection.id ? "Resolved company entity" : "Manual company entry",
      confidence: selection && selection.id ? "High" : "Medium",
      industry: setup.industry || (selection && selection.industry) || ""
    };
  }

  function generateAnalysis(company, setup) {
    const archetype = inferArchetype(company);
    const seed = hashString(`${company.name}${setup.mode}${setup.depth}${setup.question}`);
    const baseRevenue = seededValue(seed, 4.2, 82);
    const baseMargin = seededValue(seed + 2, 11, 31);
    const growth = seededValue(seed + 3, 3.8, 13.2);
    const digital = seededValue(seed + 4, 46, 86);
    const aiExposure = seededValue(seed + 5, 42, 82);
    const confidenceScore = Math.round(seededValue(seed + 6, 68, 92));
    const marketGrowth = seededValue(seed + 7, 3, 10);
    const issueSeed = hashString(company.name);

    const revenueTrend = new Array(5).fill(null).map((_, index) => {
      const year = 2021 + index;
      const revenue = +(baseRevenue * (0.75 + index * 0.07)).toFixed(1);
      const margin = +(Math.max(8, baseMargin - 3 + index * 1.1)).toFixed(1);
      return { year: String(year), revenue, margin };
    });

    const competitors = rotate(archetype.competitors.concat([`${company.name} Peer`]), 4, seed).map(
      (name, index) => ({
        name,
        digital: Math.round(seededValue(seed + index * 11, 52, 88)),
        growth: +seededValue(seed + index * 12, 2.5, 15.5).toFixed(1),
        margin: +seededValue(seed + index * 13, 8.4, 29.5).toFixed(1)
      })
    );

    const workstreams = [
      ["Market attractiveness", seededValue(seed + 31, 70, 96), "High"],
      ["Competitive position", seededValue(seed + 32, 64, 92), "Medium"],
      ["Customer economics", seededValue(seed + 33, 62, 91), "High"],
      ["Operating model", seededValue(seed + 34, 54, 84), "Medium"],
      ["AI value creation", seededValue(seed + 35, 68, 93), "High"],
      ["Strategic choices", seededValue(seed + 36, 58, 86), "Medium"],
      ["Risk and implementation", seededValue(seed + 37, 49, 81), "Low"]
    ].map((item, index) => ({
      name: item[0],
      progress: Math.round(item[1]),
      confidence: item[2],
      note: [
        "Structural profit pool remains attractive relative to adjacent markets.",
        `${company.name} holds differentiated strengths, but speed is now more valuable than breadth.`,
        "Value capture depends on monetizing high-value segments and installed relationships.",
        "Complexity is still suppressing operating leverage.",
        `The strongest AI value pools sit inside ${archetype.ai[0].toLowerCase()}.`,
        "The option set is converging around a small number of asymmetric bets.",
        "Execution risk rises materially if transformation scope expands too broadly."
      ][index]
    }));

    const issueTree = [
      {
        title: `Where can ${company.name} win profitably?`,
        items: [
          `Defend the premium core in ${archetype.market.toLowerCase()}`,
          "Monetize the installed base through higher-value services",
          "Expand into data-rich adjacencies with a clear right-to-win"
        ]
      },
      {
        title: "What blocks growth conversion?",
        items: [
          "Fragmented pricing and uneven commercial discipline",
          "Operating complexity that slows conversion from demand to delivery",
          "Capability gaps in workflow intelligence and scalable productization"
        ]
      },
      {
        title: "Which moves create asymmetry?",
        items: [
          `AI-enabled ${archetype.ai[0].toLowerCase()}`,
          "A control tower operating model for faster decision velocity",
          "Selective M and A only where it accelerates defensible capability"
        ]
      }
    ];

    const evidence = [
      {
        title: "Installed base economics are stronger than reported mix implies",
        confidence: "High",
        source: company.source
      },
      {
        title: `${archetype.name} peers are competing more aggressively on speed and workflow quality`,
        confidence: "Medium",
        source: "Peer pattern synthesis"
      },
      {
        title: `${company.name} likely has room to simplify pricing architecture and decision rights`,
        confidence: "High",
        source: "Operating model inference"
      },
      {
        title: `AI advantage will come from ${archetype.ai[0].toLowerCase()} before broad reinvention`,
        confidence: "Medium",
        source: "AI value pool logic"
      }
    ];

    const boardNarrative = [
      `${company.name} appears structurally advantaged, but the next wave of value will come from operating leverage rather than simple scale expansion.`,
      "The most credible route to higher growth and stronger margin is to shift from broad portfolio management toward a focused, software-led value story.",
      "A disciplined 24-month plan could improve margin quality while protecting strategic control over the highest-value customer relationships."
    ];

    const options = [
      {
        option: `Launch AI-assisted ${archetype.ai[0].toLowerCase()} suite`,
        thesis: "Deepens recurring value and improves service productivity in a way customers will notice.",
        impact: Math.round(seededValue(seed + 41, 72, 94)),
        feasibility: Math.round(seededValue(seed + 42, 56, 84)),
        risk: Math.round(seededValue(seed + 43, 28, 62)),
        time: "9 months"
      },
      {
        option: "Simplify regional delivery and decision rights",
        thesis: "Releases margin, improves speed, and creates a cleaner base for future digital scaling.",
        impact: Math.round(seededValue(seed + 44, 64, 88)),
        feasibility: Math.round(seededValue(seed + 45, 68, 90)),
        risk: Math.round(seededValue(seed + 46, 24, 49)),
        time: "6 months"
      },
      {
        option: `Acquire a niche ${archetype.name.toLowerCase()} capability player`,
        thesis: "Accelerates capability building but only creates value with disciplined integration.",
        impact: Math.round(seededValue(seed + 47, 60, 86)),
        feasibility: Math.round(seededValue(seed + 48, 42, 72)),
        risk: Math.round(seededValue(seed + 49, 46, 71)),
        time: "15 months"
      },
      {
        option: "Enter an adjacent segment with the same customer logic",
        thesis: "Creates a growth option, but commercial fit must be proven before scaling investment.",
        impact: Math.round(seededValue(seed + 50, 58, 84)),
        feasibility: Math.round(seededValue(seed + 51, 38, 69)),
        risk: Math.round(seededValue(seed + 52, 48, 76)),
        time: "18 months"
      }
    ];

    const scenarios = [
      {
        name: "Base case",
        growth: +growth.toFixed(1),
        margin: +(baseMargin + 0.8).toFixed(1),
        risk: Math.round(seededValue(seed + 60, 38, 54)),
        description: "Focused simplification funds the most defensible digital moves."
      },
      {
        name: "Upside case",
        growth: +(growth + 2.8).toFixed(1),
        margin: +(baseMargin + 2.5).toFixed(1),
        risk: Math.round(seededValue(seed + 61, 52, 66)),
        description: "AI-enabled workflows lift retention, attach rate, and decision speed."
      },
      {
        name: "Disruption case",
        growth: +(Math.max(1.8, growth - 3.5)).toFixed(1),
        margin: +(Math.max(8, baseMargin - 3.4)).toFixed(1),
        risk: Math.round(seededValue(seed + 62, 68, 84)),
        description: "Faster challengers compress price and exploit operating friction."
      }
    ];

    const slides = [
      {
        id: "01",
        title: "Executive thesis",
        subtitle: `${company.name} can unlock the next wave of value by shifting from breadth-led advantage to software-enabled operating leverage.`
      },
      {
        id: "02",
        title: "Where to play",
        subtitle: `Double down on ${archetype.market.toLowerCase()} segments with strong switching costs and service intensity.`
      },
      {
        id: "03",
        title: "How to win",
        subtitle: `Build a differentiated layer around ${archetype.ai[0].toLowerCase()} and faster execution.`
      },
      {
        id: "04",
        title: "What it takes",
        subtitle: "Simplify the operating model, modernize pricing, and sequence capability investment through a tight transformation agenda."
      }
    ];

    const warRoom = {
      tiles: [
        {
          title: "Company health",
          value: `${formatPercent(baseMargin)} margin with improving quality`,
          text: "Commercial position is credible, but complexity still suppresses operating leverage."
        },
        {
          title: "Competitor pressure",
          value: `${Math.round(marketGrowth)}% market growth with faster challengers`,
          text: "Competitive pressure is increasing on speed, digital experience, and workflow quality."
        },
        {
          title: "AI disruption",
          value: `${Math.round(aiExposure)} / 100 disruption exposure`,
          text: "The biggest AI threat is not replacement; it is margin leakage to faster operators."
        },
        {
          title: "Strategic readiness",
          value: `${Math.round(digital)} / 100 digital maturity`,
          text: "Execution readiness is good enough to move now, but focus will determine whether value is captured."
        }
      ],
      triggers: [
        ["If pricing pressure intensifies", "Bundle differentiated outcomes and simplify commercial architecture instead of broad discounting."],
        ["If AI lowers service cost-to-serve faster than expected", "Reinvest part of the margin upside into customer retention and attach rate expansion."],
        ["If an attractive capability asset becomes available", "Only pursue M and A with a narrow integration thesis and a visible operating owner."],
        ["If execution slows", "Reduce transformation scope and concentrate on the two moves with the highest confidence and time-to-value."]
      ]
    };

    const capabilityHeatmap = rotate(archetype.capabilities, 4, issueSeed).map((name, index) => ({
      name,
      score: Math.round(seededValue(seed + 70 + index, 46, 86))
    }));

    return {
      headline: `${company.name} has the ingredients to outperform, but value creation now depends on sharper operating focus and AI-enabled execution.`,
      subheadline: `The most credible path to superior growth and margin is a focused strategy around ${archetype.market.toLowerCase()}, stronger service economics, and decision velocity.`,
      revenue: formatMoney(baseRevenue),
      valuation: formatMoney(baseRevenue * seededValue(seed + 72, 2.4, 4.6)),
      ebitMargin: formatPercent(baseMargin),
      employees: `${Math.round(seededValue(seed + 73, 6, 85) * 1000).toLocaleString()}`,
      marketGrowth: formatPercent(marketGrowth),
      digitalMaturity: Math.round(digital),
      confidenceScore,
      archetype,
      workstreams,
      revenueTrend,
      competitors,
      issueTree,
      evidence,
      boardNarrative,
      options,
      scenarios,
      slides,
      warRoom,
      capabilityHeatmap,
      recommendations: [
        `Build a differentiated offer around ${archetype.ai[0].toLowerCase()} and premium service outcomes.`,
        "Simplify the operating model so value creation is not diluted by unnecessary regional complexity.",
        "Sequence strategic bets tightly and avoid broad portfolio spread until the transformation engine is stable."
      ],
      customerSegments: archetype.customers,
      aiOpportunities: archetype.ai,
      structuralRisks: archetype.risks
    };
  }

  function buildWorkspace(selection, setup) {
    const company = buildCompanyProfile(selection, setup);
    const analysis = generateAnalysis(company, setup);
    return {
      id: `ws-${Date.now()}-${slugify(company.name)}`,
      createdAt: new Date().toISOString(),
      company,
      setup,
      analysis,
      aiReport: null
    };
  }

  function buildSampleWorkspace() {
    return buildWorkspace(APP.sampleCompany, {
      companyQuery: APP.sampleCompany.name,
      geography: "Europe and North America",
      industry: "Industrial technology",
      businessUnit: "Enterprise-wide",
      horizon: "3 years",
      question:
        "How should the company accelerate profitable growth while defending premium positioning against AI-native competitors?",
      depth: "heavy",
      mode: "board"
    });
  }

  async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.json();
  }

  async function requestAiAnalysis(payload) {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Analysis request failed.");
    }
    return data.analysis;
  }

  async function searchCompanies(query) {
    if (!query || query.trim().length < 2) return [];
    const url =
      "https://www.wikidata.org/w/api.php?action=wbsearchentities&search=" +
      encodeURIComponent(query.trim()) +
      "&language=en&limit=8&format=json&origin=*";
    const data = await fetchJson(url);
    return (data.search || [])
      .filter((item) => {
        const description = (item.description || "").toLowerCase();
        return (
          /company|business|corporation|bank|retailer|software|brand|manufacturer|enterprise|group|operator|airline|pharmaceutical|energy|utility|telecom|services/.test(
            description
          ) || !description
        );
      })
      .map((item) => ({
        id: item.id,
        name: item.label,
        description: item.description || "Business entity",
        match: item.match ? item.match.text : item.label
      }));
  }

  async function resolveCompanyDetails(candidate) {
    if (!candidate || !candidate.id) return candidate;
    const url =
      "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=" +
      encodeURIComponent(candidate.id) +
      "&props=labels|descriptions|sitelinks&languages=en&format=json&origin=*";
    const data = await fetchJson(url);
    const entity = data.entities && data.entities[candidate.id];
    if (!entity) return candidate;
    return {
      id: candidate.id,
      name: entity.labels && entity.labels.en ? entity.labels.en.value : candidate.name,
      description:
        entity.descriptions && entity.descriptions.en
          ? entity.descriptions.en.value
          : candidate.description,
      wikipediaTitle:
        entity.sitelinks && entity.sitelinks.enwiki ? entity.sitelinks.enwiki.title : "",
      country: "",
      source: "Wikidata entity resolution"
    };
  }

  function setupTheme() {
    const saved = localStorage.getItem(STORAGE.theme);
    if (saved === "light") document.body.classList.add("light");
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        document.body.classList.toggle("light");
        localStorage.setItem(
          STORAGE.theme,
          document.body.classList.contains("light") ? "light" : "dark"
        );
      });
    });
  }

  function setupReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
  }

  function setupHeader() {
    const nav = document.querySelector("[data-top-nav]");
    if (!nav) return;
    const page = document.body.dataset.page;
    nav.innerHTML = APP.nav
      .map(([href, label]) => `<a href="${href}" class="${page === href ? "is-active" : ""}">${label}</a>`)
      .join("");
  }

  function renderRecentWorkspaces() {
    const mount = document.querySelector("[data-recent-workspaces]");
    if (!mount) return;
    const workspaces = currentWorkspaces();
    if (!workspaces.length) {
      mount.innerHTML = `
        <div class="panel empty-shell">
          <div class="badge">No saved workspace yet</div>
          <div class="card-title">Start with a company name and Clariy will create your first strategy workspace.</div>
          <a class="button primary" href="setup.html">Open setup</a>
        </div>
      `;
      return;
    }
    mount.classList.add("recent-grid");
    mount.innerHTML = workspaces
      .map(
        (workspace) => `
        <a class="recent-card" href="workspace.html">
          <div class="topline">
            <div>
              <div class="metric-label">${workspace.setup.mode.toUpperCase()} | ${workspace.setup.depth.toUpperCase()}</div>
              <div class="card-title" style="margin-top:8px;">${workspace.company.name}</div>
            </div>
            <div class="badge success">${workspace.analysis.confidenceScore}% confidence</div>
          </div>
          <p class="muted">${workspace.analysis.headline}</p>
        </a>
      `
      )
      .join("");
  }

  function renderWorkspaceShell() {
    const nav = document.querySelector("[data-module-nav]");
    if (!nav) return;
    const active = document.body.dataset.section || "";
    nav.innerHTML = APP.moduleSections
      .map(
        (item) =>
          `<div class="${item === active ? "nav-link active" : "nav-link"}"><span>${item}</span><span>></span></div>`
      )
      .join("");
    const workspace = currentWorkspace();
    const title = document.querySelector("[data-company-name]");
    const question = document.querySelector("[data-company-question]");
    if (title) title.textContent = workspace.company.name;
    if (question) question.textContent = workspace.setup.question;
  }

  function drawRevenueChart(mount, trend) {
    if (!mount || !trend || !trend.length) return;
    const width = 520;
    const height = 220;
    const padding = 28;
    const maxRevenue = Math.max.apply(
      null,
      trend.map((item) => item.revenue)
    ) * 1.08;
    const maxMargin = Math.max.apply(
      null,
      trend.map((item) => item.margin)
    ) * 1.12;
    const step = (width - padding * 2) / Math.max(1, trend.length - 1);
    const points = trend
      .map((item, index) => {
        const x = padding + step * index;
        const y = height - padding - (item.margin / maxMargin) * (height - padding * 2);
        return `${x},${y}`;
      })
      .join(" ");
    const bars = trend
      .map((item, index) => {
        const x = padding + step * index - 18;
        const barHeight = (item.revenue / maxRevenue) * (height - padding * 2);
        const y = height - padding - barHeight;
        return `<rect x="${x}" y="${y}" width="36" height="${barHeight}" rx="10" fill="rgba(113,166,255,0.58)"></rect>
          <text x="${padding + step * index}" y="${height - 6}" text-anchor="middle" fill="var(--text-faint)" font-size="12">${item.year}</text>`;
      })
      .join("");
    const dots = trend
      .map((item, index) => {
        const x = padding + step * index;
        const y = height - padding - (item.margin / maxMargin) * (height - padding * 2);
        return `<circle cx="${x}" cy="${y}" r="4" fill="rgba(116,236,209,1)"></circle>`;
      })
      .join("");
    mount.innerHTML = `
      <div class="chart-legend">
        <span><i class="legend-dot" style="background: rgba(113,166,255,0.82)"></i>Revenue</span>
        <span><i class="legend-dot" style="background: rgba(116,236,209,1)"></i>EBIT margin</span>
      </div>
      <div class="line-chart">
        <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
          <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="rgba(148,163,184,0.22)"></line>
          ${bars}
          <polyline points="${points}" fill="none" stroke="rgba(116,236,209,1)" stroke-width="3"></polyline>
          ${dots}
        </svg>
      </div>
    `;
  }

  function drawBenchmark(mount, competitors) {
    if (!mount || !competitors || !competitors.length) return;
    mount.innerHTML = competitors
      .map(
        (item) => `
        <div class="bar-row">
          <div class="bar-head"><span>${item.name}</span><span>${item.digital}</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${item.digital}%;background:rgba(245,181,76,0.82)"></div></div>
        </div>
      `
      )
      .join("");
  }

  function confidenceTone(confidence) {
    if (confidence === "High") return "success";
    if (confidence === "Medium") return "warning";
    return "danger";
  }

  function renderWorkspacePage(workspace) {
    const mount = document.querySelector('[data-page-render="workspace"]');
    const rail = document.querySelector('[data-rail-render="workspace"]');
    if (!mount) return;
    const analysis = workspace.analysis;
    mount.innerHTML = `
      <div class="module-shell">
        ${
          workspace.aiReport
            ? `
          <div class="panel" data-reveal>
            <div class="topline">
              <div>
                <div class="kicker">AI strategy analysis</div>
                <div class="card-title" style="margin-top:8px;">Server-generated consulting readout</div>
              </div>
              <div class="badge success">OpenAI powered</div>
            </div>
            <div class="two-up" style="margin-top:18px;">
              <div class="line-item"><strong>Summary</strong><br>${workspace.aiReport.summary}</div>
              <div class="line-item"><strong>Recommended next steps</strong><br>${workspace.aiReport.recommendedNextSteps.join("<br>")}</div>
            </div>
            <div class="workspace-grid-2" style="margin-top:18px;">
              <div class="panel soft">
                <div class="kicker">Key issues</div>
                <div class="stack" style="margin-top:14px;">${workspace.aiReport.keyIssues
                  .map((item) => `<div class="line-item">${item}</div>`)
                  .join("")}</div>
              </div>
              <div class="panel soft">
                <div class="kicker">Hypotheses</div>
                <div class="stack" style="margin-top:14px;">${workspace.aiReport.hypotheses
                  .map((item) => `<div class="line-item">${item}</div>`)
                  .join("")}</div>
              </div>
            </div>
            <div class="panel soft" style="margin-top:18px;">
              <div class="kicker">Risks and considerations</div>
              <div class="recommend-strip" style="margin-top:14px;">${workspace.aiReport.risksConsiderations
                .map((item) => `<div class="line-item">${item}</div>`)
                .join("")}</div>
            </div>
          </div>
        `
            : ""
        }
        <div class="panel overview-hero" data-reveal>
          <div class="two-up">
            <div>
              <div class="hero-stripe">${workspace.setup.depth.toUpperCase()} depth | ${workspace.setup.mode.toUpperCase()} mode</div>
              <h1 class="page-title" style="margin-top:16px;">${analysis.headline}</h1>
              <p class="section-copy">${analysis.subheadline}</p>
              <div class="metric-grid" style="grid-template-columns:repeat(4, minmax(0, 1fr));">
                <div class="metric-card"><div class="metric-label">Revenue</div><div class="metric-value">${analysis.revenue}</div></div>
                <div class="metric-card"><div class="metric-label">EBIT margin</div><div class="metric-value">${analysis.ebitMargin}</div></div>
                <div class="metric-card"><div class="metric-label">Enterprise value</div><div class="metric-value">${analysis.valuation}</div></div>
                <div class="metric-card"><div class="metric-label">Employee base</div><div class="metric-value">${analysis.employees}</div></div>
              </div>
            </div>
            <div class="panel soft">
              <div class="topline">
                <div>
                  <div class="kicker">Engagement health</div>
                  <div class="card-title" style="margin-top:8px;">${analysis.confidenceScore}% confidence</div>
                </div>
                <div class="badge success">High signal density</div>
              </div>
              <div class="stack" style="margin-top:18px;">
                ${analysis.workstreams
                  .map(
                    (stream) => `
                    <div>
                      <div class="bar-head"><span>${stream.name}</span><span>${stream.confidence}</span></div>
                      <div class="progress-track"><div class="progress-bar" style="width:${stream.progress}%"></div></div>
                    </div>
                  `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </div>

        <div class="workspace-grid-2">
          <div class="panel chart-card" data-reveal>
            <div><div class="kicker">Financial signals</div><div class="card-title" style="margin-top:8px;">Growth and margin suggest a business with room to expand quality, not just scale.</div></div>
            <div data-runtime-revenue></div>
          </div>
          <div class="panel chart-card" data-reveal>
            <div><div class="kicker">Competitor benchmark</div><div class="card-title" style="margin-top:8px;">${workspace.company.name} competes in a market where digital maturity is becoming a strategic tax.</div></div>
            <div class="bar-list" data-runtime-benchmark></div>
          </div>
        </div>

        <div class="workspace-grid-2">
          <div class="panel" data-reveal>
            <div class="kicker" style="color:var(--accent);">Issue tree</div>
            <div class="issue-tree" style="margin-top:18px;">
              ${analysis.issueTree
                .map(
                  (branch) => `
                  <div class="issue-cluster">
                    <div class="card-title">${branch.title}</div>
                    <div class="issue-items">
                      ${branch.items.map((item) => `<div class="issue-item">${item}</div>`).join("")}
                    </div>
                  </div>
                `
                )
                .join("")}
            </div>
          </div>
          <div class="panel" data-reveal>
            <div class="kicker">Evidence logic</div>
            <div class="evidence-grid" style="margin-top:18px;">
              ${analysis.evidence
                .map(
                  (item) => `
                  <div class="evidence-card">
                    <div class="topline">
                      <strong>${item.title}</strong>
                      <span class="badge ${confidenceTone(item.confidence)}">${item.confidence}</span>
                    </div>
                    <p class="muted">${item.source}</p>
                  </div>
                `
                )
                .join("")}
            </div>
          </div>
        </div>

        <div class="panel" data-reveal>
          <div class="two-up">
            <div>
              <div class="kicker">Strategic recommendation</div>
              <div class="card-title" style="margin-top:8px;">A focused strategy beats a broad one here.</div>
              <div class="recommend-strip" style="margin-top:18px;">
                ${analysis.recommendations.map((item) => `<div class="line-item">${item}</div>`).join("")}
              </div>
            </div>
            <div class="panel soft">
              <div class="badge success">Storyline ready</div>
              <p class="section-copy">${analysis.boardNarrative[0]}</p>
              <div class="page-actions">
                <a class="button primary" href="executive-summary.html">Open executive storyline</a>
                <a class="button secondary" href="scenario-lab.html">Pressure-test scenarios</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    if (rail) {
      rail.innerHTML = `
        <div class="topline">
          <div>
            <div class="kicker">Strategy copilot</div>
            <div class="card-title" style="margin-top:8px;">Evidence and synthesis</div>
          </div>
          <div class="badge">Copilot live</div>
        </div>
        <div class="panel soft" style="margin-top:18px;">
          <div class="kicker" style="color:var(--accent);">Current hypothesis</div>
          <p class="muted">${analysis.subheadline}</p>
        </div>
        ${analysis.evidence
          .slice(0, 3)
          .map(
            (item) => `
            <div class="signal ${confidenceTone(item.confidence)}">
              <div class="kicker">${item.confidence} confidence</div>
              <p class="muted">${item.title}</p>
            </div>
          `
          )
          .join("")}
        <a class="button secondary" style="width:100%;margin-top:16px;" href="report-preview.html">Export board pack</a>
      `;
    }
    drawRevenueChart(mount.querySelector("[data-runtime-revenue]"), analysis.revenueTrend);
    drawBenchmark(mount.querySelector("[data-runtime-benchmark]"), analysis.competitors);
    setupReveal();
  }

  function renderExecutiveSummaryPage(workspace) {
    const mount = document.querySelector('[data-page-render="executive-summary"]');
    const rail = document.querySelector('[data-rail-render="executive-summary"]');
    if (!mount) return;
    const analysis = workspace.analysis;
    mount.innerHTML = `
      <div class="module-shell">
        <div class="panel" data-reveal>
          <div class="topline">
            <div>
              <div class="kicker">Executive summary</div>
              <h1 class="page-title" style="margin-top:8px;">Board-ready narrative built from the active fact base.</h1>
            </div>
            <div class="badge">10-slide storyline</div>
          </div>
          <div class="story-grid" style="margin-top:20px;">
            ${analysis.boardNarrative.map((item) => `<div class="board-note">${item}</div>`).join("")}
          </div>
          ${
            workspace.aiReport
              ? `
            <div class="panel soft" style="margin-top:18px;">
              <div class="kicker">AI summary</div>
              <p class="section-copy">${workspace.aiReport.summary}</p>
            </div>
          `
              : ""
          }
        </div>
        <div class="stack">
          ${analysis.slides
            .map(
              (slide) => `
              <section class="slide-card panel" data-reveal>
                <div class="slide-shell">
                  <div class="slide-index"><div><div class="kicker">Slide</div><div class="metric-value">${slide.id}</div></div></div>
                  <div class="slide-content">
                    <div class="kicker">Headline</div>
                    <div class="card-title" style="margin-top:10px;">${slide.title}</div>
                    <p class="section-copy">${slide.subtitle}</p>
                    <div class="three-col" style="margin-top:18px;">
                      <div class="line-item"><strong>Implication</strong><br>${analysis.recommendations[0]}</div>
                      <div class="line-item"><strong>Evidence</strong><br>${analysis.evidence[0].title}</div>
                      <div class="line-item"><strong>Recommended action</strong><br>${analysis.recommendations[1]}</div>
                    </div>
                  </div>
                </div>
              </section>
            `
            )
            .join("")}
        </div>
      </div>
    `;
    if (rail) {
      rail.innerHTML = `
        <div class="kicker">Narrative lenses</div>
        <div class="stack" style="margin-top:18px;">
          <div class="line-item">Board summary</div>
          <div class="line-item">CEO memo</div>
          <div class="line-item">Investor lens</div>
          <div class="line-item">Transformation office lens</div>
        </div>
        <a class="button secondary" style="width:100%;margin-top:16px;" href="report-preview.html">Open deck preview</a>
      `;
    }
    setupReveal();
  }

  function renderScenarioLabPage(workspace) {
    const mount = document.querySelector('[data-page-render="scenario-lab"]');
    const rail = document.querySelector('[data-rail-render="scenario-lab"]');
    if (!mount) return;
    const scenarios = workspace.analysis.scenarios;
    const base = scenarios[0];
    mount.innerHTML = `
      <div class="module-shell">
        <div class="panel" data-reveal>
          <div class="topline">
            <div>
              <div class="kicker">Scenario lab</div>
              <h1 class="page-title" style="margin-top:8px;">Pressure-test strategic choices before you commit capital.</h1>
            </div>
            <div class="badge" data-selected-scenario>${base.name}</div>
          </div>
          <div class="two-up" style="margin-top:22px;">
            <div class="stack">
              ${scenarios
                .map(
                  (scenario, index) => `
                  <button class="scenario-choice ${index === 0 ? "active" : ""}" data-scenario-card data-name="${scenario.name}" data-growth="${scenario.growth}" data-margin="${scenario.margin}" data-risk="${scenario.risk}" data-description="${scenario.description}" type="button">
                    <div class="bar-head"><strong>${scenario.name}</strong><span>Risk ${scenario.risk}</span></div>
                    <p class="muted">${scenario.description}</p>
                    <div class="muted">Growth ${scenario.growth}% | Margin ${scenario.margin}%</div>
                  </button>
                `
                )
                .join("")}
            </div>
            <div class="panel soft">
              <div class="kicker" style="color:var(--accent);">Scenario implications</div>
              <div class="radar-wrap">
                <div style="width:min(320px, 100%);text-align:center;">
                  <div class="metric-value" data-scenario-growth>${base.growth}%</div>
                  <div class="metric-label">Growth outlook</div>
                  <div class="metric-value" style="margin-top:18px;" data-scenario-margin>${base.margin}%</div>
                  <div class="metric-label">Margin outlook</div>
                  <div class="metric-value" style="margin-top:18px;" data-scenario-risk>${base.risk}</div>
                  <div class="metric-label">Risk index</div>
                  <p class="muted" style="margin-top:18px;" data-scenario-description>${base.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="panel" data-reveal>
          <div class="kicker" style="color:var(--accent);">Assumption controls</div>
          <div class="two-col" style="margin-top:22px;">
            ${[
              ["AI reduces cost-to-serve", 62],
              ["Competitor enters with lower pricing", 47],
              ["Service attach rate improves", 58],
              ["Margin pressure from procurement", 33]
            ]
              .map(
                (item) => `
                <div class="control-card slider-row">
                  <div class="bar-head"><span>${item[0]}</span><span data-range-value></span></div>
                  <input data-range type="range" value="${item[1]}">
                  <div class="muted">Adjust the lever to stress growth, margin, complexity, and implementation pressure.</div>
                </div>
              `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
    if (rail) {
      rail.innerHTML = `
        <div class="kicker">Scenario readout</div>
        <div class="stack" style="margin-top:18px;">
          ${scenarios.map((item) => `<div class="line-item"><strong>${item.name}</strong><br>${item.description}</div>`).join("")}
        </div>
        <a class="button secondary" style="width:100%;margin-top:16px;" href="strategic-options.html">Open option set</a>
      `;
    }
    setupScenarioCards();
    setupSliders();
    setupReveal();
  }

  function renderStrategicOptionsPage(workspace) {
    const mount = document.querySelector('[data-page-render="strategic-options"]');
    const rail = document.querySelector('[data-rail-render="strategic-options"]');
    if (!mount) return;
    mount.innerHTML = `
      <div class="module-shell">
        <div class="panel" data-reveal>
          <div class="topline">
            <div>
              <div class="kicker">Strategic choices</div>
              <h1 class="page-title" style="margin-top:8px;">Compare moves by impact, feasibility, time-to-value, and risk.</h1>
            </div>
            <div class="badge">Prioritization matrix</div>
          </div>
          <div class="stack" style="margin-top:22px;">
            ${workspace.analysis.options
              .map(
                (option) => `
                <div class="option-grid option-card">
                  <div><strong>${option.option}</strong><p class="muted">${option.thesis}</p></div>
                  <div class="metric-block"><div class="metric-label">Impact</div><div class="value" style="color:var(--success);">${option.impact}%</div></div>
                  <div class="metric-block"><div class="metric-label">Feasibility</div><div class="value" style="color:var(--success);">${option.feasibility}%</div></div>
                  <div class="metric-block"><div class="metric-label">Risk</div><div class="value" style="color:var(--danger);">${option.risk}%</div></div>
                  <div class="metric-block"><div class="metric-label">Time</div><div class="value">${option.time}</div></div>
                </div>
              `
              )
              .join("")}
          </div>
        </div>
        <div class="panel" data-reveal>
          <div class="kicker">Portfolio recommendation</div>
          <div class="recommend-strip" style="margin-top:18px;">
            ${workspace.analysis.recommendations.map((item) => `<div class="line-item">${item}</div>`).join("")}
          </div>
        </div>
      </div>
    `;
    if (rail) {
      rail.innerHTML = `
        <div class="kicker">Decision posture</div>
        <div class="stack" style="margin-top:18px;">
          <div class="line-item">Prioritize moves that improve differentiation and margin together.</div>
          <div class="line-item">Avoid broad spread before the operating system underneath is simplified.</div>
          <div class="line-item">Use capability M and A as an accelerator, not as a substitute for focus.</div>
        </div>
      `;
    }
    setupReveal();
  }

  function renderReportPreviewPage(workspace) {
    const mount = document.querySelector('[data-page-render="report-preview"]');
    if (!mount) return;
    mount.innerHTML = `
      <div class="section-heading">
        <div class="eyebrow">Board deck preview</div>
        <h1 class="page-title">A consulting-style export tuned for boardrooms, investment committees, and CEOs.</h1>
        <p class="section-copy">The deck inherits the active workspace, preserving strategic logic, evidence posture, and headline discipline across every page.</p>
      </div>
      <div class="button-row">
        <a class="button primary" href="#">Export PowerPoint</a>
        <a class="button secondary" href="#">Export PDF report</a>
      </div>
      <div class="two-col" style="margin-top:28px;">
        ${workspace.analysis.slides
          .map(
            (slide) => `
            <div class="deck-preview panel" data-reveal>
              <div class="deck-preview-inner">
                <div class="bar-head"><span class="kicker">Clariy Insights AI</span><span>${slide.id}</span></div>
                <div>
                  <div class="kicker">Headline-driven page</div>
                  <div class="card-title" style="margin-top:10px;">${slide.title}</div>
                  <p class="muted">${slide.subtitle}</p>
                </div>
                <div class="three-col">
                  <div class="line-item">Implication</div>
                  <div class="line-item">Fact base</div>
                  <div class="line-item">Next move</div>
                </div>
              </div>
            </div>
          `
          )
          .join("")}
      </div>
    `;
    setupReveal();
  }

  function renderWarRoomPage(workspace) {
    const mount = document.querySelector('[data-page-render="war-room"]');
    const rail = document.querySelector('[data-rail-render="war-room"]');
    if (!mount) return;
    mount.innerHTML = `
      <div class="module-shell">
        <div class="panel" data-reveal>
          <div class="topline">
            <div>
              <div class="kicker">War Room</div>
              <h1 class="page-title" style="margin-top:8px;">A command-center view of strategic pressure, readiness, and choice.</h1>
            </div>
            <div class="badge warning">Scare McKinsey mode</div>
          </div>
          <div class="tile-grid" style="margin-top:22px;">
            ${workspace.analysis.warRoom.tiles
              .map(
                (tile) => `
                <div class="war-tile">
                  <div class="metric-label">${tile.title}</div>
                  <div class="card-title" style="margin-top:10px;">${tile.value}</div>
                  <p class="muted">${tile.text}</p>
                </div>
              `
              )
              .join("")}
          </div>
        </div>
        <div class="two-up">
          <div class="panel" data-reveal>
            <div class="kicker" style="color:var(--accent);">Strategic implication stack</div>
            <div class="stack" style="margin-top:18px;">
              ${workspace.analysis.recommendations.map((item) => `<div class="line-item">${item}</div>`).join("")}
            </div>
          </div>
          <div class="panel" data-reveal>
            <div class="kicker">Command triggers</div>
            <div class="stack" style="margin-top:18px;">
              ${workspace.analysis.warRoom.triggers
                .map((item) => `<div class="trigger-card"><strong>${item[0]}</strong><p class="muted">${item[1]}</p></div>`)
                .join("")}
            </div>
          </div>
        </div>
      </div>
    `;
    if (rail) {
      rail.innerHTML = `
        <div class="kicker">Command posture</div>
        <div class="stack" style="margin-top:18px;">
          ${workspace.analysis.structuralRisks.map((item) => `<div class="line-item">${item}</div>`).join("")}
        </div>
      `;
    }
    setupReveal();
  }

  function renderPage() {
    const workspace = currentWorkspace();
    renderWorkspaceShell();
    renderWorkspacePage(workspace);
    renderExecutiveSummaryPage(workspace);
    renderScenarioLabPage(workspace);
    renderStrategicOptionsPage(workspace);
    renderReportPreviewPage(workspace);
    renderWarRoomPage(workspace);
  }

  function setupDepthCards() {
    document.querySelectorAll("[data-depth-card]").forEach((card) => {
      card.addEventListener("click", () => {
        document.querySelectorAll("[data-depth-card]").forEach((item) => item.classList.remove("active"));
        card.classList.add("active");
      });
    });
    document.querySelectorAll("[data-mode-chip]").forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelectorAll("[data-mode-chip]").forEach((item) => item.classList.remove("active"));
        chip.classList.add("active");
      });
    });
  }

  function setupScenarioCards() {
    const cards = document.querySelectorAll("[data-scenario-card]");
    if (!cards.length) return;
    const title = document.querySelector("[data-selected-scenario]");
    const growth = document.querySelector("[data-scenario-growth]");
    const margin = document.querySelector("[data-scenario-margin]");
    const risk = document.querySelector("[data-scenario-risk]");
    const description = document.querySelector("[data-scenario-description]");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        cards.forEach((item) => item.classList.remove("active"));
        card.classList.add("active");
        if (title) title.textContent = card.dataset.name;
        if (growth) growth.textContent = `${card.dataset.growth}%`;
        if (margin) margin.textContent = `${card.dataset.margin}%`;
        if (risk) risk.textContent = card.dataset.risk;
        if (description) description.textContent = card.dataset.description;
      });
    });
  }

  function setupSliders() {
    document.querySelectorAll("[data-range]").forEach((input) => {
      const output = input.parentElement.querySelector("[data-range-value]");
      const update = () => {
        if (output) output.textContent = `${input.value}%`;
      };
      input.addEventListener("input", update);
      update();
    });
  }

  function queryPrefill() {
    const params = new URLSearchParams(window.location.search);
    return params.get("company") || "";
  }

  function setupLanding() {
    const input = document.getElementById("hero-company-input");
    const button = document.getElementById("hero-start-button");
    if (!input || !button) return;
    button.addEventListener("click", () => {
      const query = input.value.trim();
      window.location.href = query ? `setup.html?company=${encodeURIComponent(query)}` : "setup.html";
    });
    renderRecentWorkspaces();
  }

  function setupPageSetup() {
    const searchInput = document.getElementById("company-search-input");
    const searchButton = document.getElementById("company-search-button");
    const resultsMount = document.querySelector("[data-company-results]");
    const banner = document.querySelector("[data-selected-company-banner]");
    const startButton = document.getElementById("start-analysis-button");
    if (!searchInput || !searchButton || !resultsMount || !banner || !startButton) return;

    const draft = load(STORAGE.draft, {
      selection: null,
      form: {
        companyQuery: "",
        geography: "Europe and North America",
        industry: "Industrial technology",
        businessUnit: "Enterprise-wide",
        horizon: "3 years",
        question:
          "How should the company accelerate profitable growth while defending premium positioning against AI-native competitors?",
        depth: "heavy",
        mode: "board"
      }
    });

    const prefill = queryPrefill();
    if (prefill && !draft.form.companyQuery) draft.form.companyQuery = prefill;
    searchInput.value = draft.form.companyQuery || "";
    document.getElementById("setup-geography").value = draft.form.geography || "";
    document.getElementById("setup-industry").value = draft.form.industry || "";
    document.getElementById("setup-business-unit").value = draft.form.businessUnit || "";
    document.getElementById("setup-horizon").value = draft.form.horizon || "";
    document.getElementById("setup-question").value = draft.form.question || "";

    function syncActiveChoice(selector, value, key) {
      document.querySelectorAll(selector).forEach((item) => {
        item.classList.toggle("active", item.dataset[key] === value);
      });
    }

    syncActiveChoice("[data-depth-card]", draft.form.depth || "heavy", "depth");
    syncActiveChoice("[data-mode-chip]", draft.form.mode || "board", "mode");

    function updateBanner() {
      if (draft.selection) {
        banner.innerHTML = `
          <div>
            <div class="metric-label">Selected company</div>
            <strong>${draft.selection.name}</strong>
            <div class="muted">${draft.selection.description || "Resolved company entity"}</div>
          </div>
          <div class="badge success">Resolved</div>
        `;
      } else {
        banner.innerHTML = `
          <div>
            <div class="metric-label">No company selected yet</div>
            <div class="muted">Search and choose the right entity to lock the analysis scope.</div>
          </div>
          <div class="badge warning">Awaiting identification</div>
        `;
      }
    }

    async function runSearch() {
      const query = searchInput.value.trim();
      draft.form.companyQuery = query;
      save(STORAGE.draft, draft);
      if (!query) {
        resultsMount.innerHTML = "";
        return;
      }
      resultsMount.innerHTML = `<div class="line-item">Searching for matching companies...</div>`;
      try {
        const results = await searchCompanies(query);
        if (!results.length) {
          resultsMount.innerHTML = `<div class="line-item">No clear online match found. You can still continue with manual company entry.</div>`;
          return;
        }
        resultsMount.innerHTML = results
          .map(
            (item) => `
            <button class="result-card ${draft.selection && draft.selection.id === item.id ? "selected" : ""}" data-result-id="${item.id}" type="button">
              <div class="topline">
                <div>
                  <div class="metric-label">${item.id}</div>
                  <div class="card-title" style="margin-top:8px;">${item.name}</div>
                </div>
                <div class="score-pill">Candidate match</div>
              </div>
              <p class="muted">${item.description}</p>
            </button>
          `
          )
          .join("");
        resultsMount.querySelectorAll("[data-result-id]").forEach((button, index) => {
          button.addEventListener("click", async () => {
            const selected = await resolveCompanyDetails(results[index]);
            draft.selection = selected;
            save(STORAGE.draft, draft);
            updateBanner();
            resultsMount.querySelectorAll(".result-card").forEach((item) => item.classList.remove("selected"));
            button.classList.add("selected");
          });
        });
      } catch (error) {
        resultsMount.innerHTML = `<div class="line-item">Online company lookup is unavailable in this browser session. You can still continue with manual company entry.</div>`;
      }
    }

    searchButton.addEventListener("click", runSearch);
    if (prefill) runSearch();

    startButton.addEventListener("click", async () => {
      draft.form.companyQuery = searchInput.value.trim();
      draft.form.geography = document.getElementById("setup-geography").value.trim();
      draft.form.industry = document.getElementById("setup-industry").value.trim();
      draft.form.businessUnit = document.getElementById("setup-business-unit").value.trim();
      draft.form.horizon = document.getElementById("setup-horizon").value.trim();
      draft.form.question = document.getElementById("setup-question").value.trim();
      draft.form.depth =
        document.querySelector("[data-depth-card].active")?.dataset.depth || draft.form.depth || "heavy";
      draft.form.mode =
        document.querySelector("[data-mode-chip].active")?.dataset.mode || draft.form.mode || "board";

      if (!draft.form.companyQuery) {
        banner.innerHTML = `
          <div>
            <div class="metric-label">Company name required</div>
            <div class="muted">Enter a company name, then resolve the correct entity before starting the analysis.</div>
          </div>
          <div class="badge warning">Missing input</div>
        `;
        return;
      }

      if (!draft.selection && draft.form.companyQuery) {
        await runSearch();
        if (resultsMount.querySelector("[data-result-id]")) {
          banner.innerHTML = `
            <div>
              <div class="metric-label">Choose the correct company</div>
              <div class="muted">Clariy found matching entities. Select the right one before starting the analysis.</div>
            </div>
            <div class="badge warning">Selection required</div>
          `;
          return;
        }
      }

      banner.innerHTML = `
        <div>
          <div class="metric-label">Generating analysis</div>
          <div class="muted">Your request is being sent to the server-side AI route now. This can take a few seconds.</div>
        </div>
        <div class="badge">Working</div>
      `;

      try {
        const workspace = buildWorkspace(draft.selection, draft.form);
        const aiReport = await requestAiAnalysis({
          company: workspace.company.name,
          geography: draft.form.geography,
          industry: draft.form.industry,
          businessUnit: draft.form.businessUnit,
          horizon: draft.form.horizon,
          question: draft.form.question,
          mode: draft.form.mode,
          depth: draft.form.depth
        });
        workspace.aiReport = aiReport;
        saveWorkspace(workspace);
        save(STORAGE.draft, draft);
        window.location.href = "workspace.html";
      } catch (error) {
        banner.innerHTML = `
          <div>
            <div class="metric-label">Analysis failed</div>
            <div class="muted">${error.message}</div>
          </div>
          <div class="badge danger">Error</div>
        `;
      }
    });

    updateBanner();
    setupDepthCards();
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupTheme();
    setupHeader();
    setupLanding();
    setupPageSetup();
    renderPage();
    setupReveal();
  });
})();
