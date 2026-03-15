(function () {
  const site = {
    sampleCompany: {
      name: "Aurelis Industrial Systems",
      revenue: "EUR 4.8B",
      ebitMargin: "18.6%",
      valuation: "EUR 14.2B",
      employees: "18,400",
      question:
        "How should Aurelis accelerate profitable growth while protecting margin against lower-cost digital challengers?"
    },
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
    nav: [
      ["index.html", "Home"],
      ["setup.html", "Start analysis"],
      ["workspace.html", "Workspace"],
      ["scenario-lab.html", "Scenario lab"],
      ["war-room.html", "War Room"],
      ["about.html", "Methodology"]
    ],
    scenarioCases: [
      {
        name: "Base case",
        growth: 7.8,
        margin: 19.4,
        risk: 42,
        description: "Platform simplification funds selective software expansion."
      },
      {
        name: "Upside case",
        growth: 11.2,
        margin: 21.1,
        risk: 55,
        description: "AI-enabled service model lifts attach rate and renewal quality."
      },
      {
        name: "Disruption case",
        growth: 3.1,
        margin: 14.6,
        risk: 77,
        description: "Lower-cost competitors compress price and slow retrofit wins."
      }
    ],
    revenueTrend: [
      ["2021", 3.6, 14.1],
      ["2022", 4.0, 15.3],
      ["2023", 4.3, 16.7],
      ["2024", 4.5, 17.8],
      ["2025", 4.8, 18.6]
    ],
    benchmark: [
      ["Aurelis", 73],
      ["NordAxis", 61],
      ["HelioGrid", 81],
      ["Teralink", 58]
    ]
  };

  function setupTheme() {
    const saved = localStorage.getItem("clarity-theme");
    if (saved === "light") {
      document.body.classList.add("light");
    }
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        document.body.classList.toggle("light");
        localStorage.setItem(
          "clarity-theme",
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
    nav.innerHTML = site.nav
      .map(([href, label]) => {
        const active = page === href ? "is-active" : "";
        return `<a href="${href}" class="${active}">${label}</a>`;
      })
      .join("");
  }

  function setupWorkspaceNav() {
    const nav = document.querySelector("[data-module-nav]");
    if (!nav) return;
    const active = document.body.dataset.section || "";
    nav.innerHTML = site.moduleSections
      .map((item) => {
        const isActive = item === active ? "nav-link active" : "nav-link";
        return `<div class="${isActive}"><span>${item}</span><span>></span></div>`;
      })
      .join("");
    const target = document.querySelector("[data-company-name]");
    if (target) target.textContent = site.sampleCompany.name;
    const question = document.querySelector("[data-company-question]");
    if (question) question.textContent = site.sampleCompany.question;
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
        if (growth) growth.textContent = card.dataset.growth + "%";
        if (margin) margin.textContent = card.dataset.margin + "%";
        if (risk) risk.textContent = card.dataset.risk;
        if (description) description.textContent = card.dataset.description;
      });
    });
  }

  function setupSliders() {
    document.querySelectorAll("[data-range]").forEach((input) => {
      const output = input.parentElement.querySelector("[data-range-value]");
      const update = () => {
        if (output) output.textContent = input.value + "%";
      };
      input.addEventListener("input", update);
      update();
    });
  }

  function drawRevenueChart() {
    const mount = document.querySelector("[data-revenue-chart]");
    if (!mount) return;
    const width = 520;
    const height = 220;
    const padding = 28;
    const data = site.revenueTrend;
    const maxRevenue = 5.2;
    const maxMargin = 22;
    const step = (width - padding * 2) / (data.length - 1);
    const linePoints = data
      .map((item, index) => {
        const x = padding + step * index;
        const y = height - padding - ((item[2] / maxMargin) * (height - padding * 2));
        return `${x},${y}`;
      })
      .join(" ");
    const bars = data
      .map((item, index) => {
        const x = padding + step * index - 18;
        const barHeight = (item[1] / maxRevenue) * (height - padding * 2);
        const y = height - padding - barHeight;
        return `<rect x="${x}" y="${y}" width="36" height="${barHeight}" rx="10" fill="rgba(113,166,255,0.55)"></rect>
          <text x="${padding + step * index}" y="${height - 6}" text-anchor="middle" fill="var(--text-faint)" font-size="12">${item[0]}</text>`;
      })
      .join("");
    const dots = data
      .map((item, index) => {
        const x = padding + step * index;
        const y = height - padding - ((item[2] / maxMargin) * (height - padding * 2));
        return `<circle cx="${x}" cy="${y}" r="4" fill="rgba(116,236,209,1)"></circle>`;
      })
      .join("");
    mount.innerHTML = `
      <div class="chart-legend">
        <span><i class="legend-dot" style="background: rgba(113,166,255,0.8)"></i>Revenue</span>
        <span><i class="legend-dot" style="background: rgba(116,236,209,1)"></i>EBIT margin</span>
      </div>
      <div class="line-chart">
        <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
          <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="rgba(148,163,184,0.22)"></line>
          ${bars}
          <polyline points="${linePoints}" fill="none" stroke="rgba(116,236,209,1)" stroke-width="3"></polyline>
          ${dots}
        </svg>
      </div>
    `;
  }

  function drawBenchmark() {
    const mount = document.querySelector("[data-benchmark-chart]");
    if (!mount) return;
    mount.innerHTML = site.benchmark
      .map(
        ([name, value]) => `
        <div class="bar-row">
          <div class="bar-head"><span>${name}</span><span>${value}</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${value}%;background:rgba(245,181,76,0.82)"></div></div>
        </div>
      `
      )
      .join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupTheme();
    setupHeader();
    setupWorkspaceNav();
    setupReveal();
    setupDepthCards();
    setupScenarioCards();
    setupSliders();
    drawRevenueChart();
    drawBenchmark();
  });
})();
