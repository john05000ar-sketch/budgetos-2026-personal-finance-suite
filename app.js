/**
 * BudgetOS 2026: Client-Side Computational Engine & State Controller
 * Zero-External-CDN, Offline-Ready Architecture
 */

(function () {
  'use strict';

  // Key Constants
  const STORAGE_KEY = 'BUDGETOS_2026_STATE_V1';
  const THEME_KEY = 'BUDGETOS_2026_THEME';

  // Default Golden State (mirrored from starter_data_2026.json)
  const DEFAULT_STATE = {
    profile: {
      name: "Alex & Jordan Taylor",
      occupation: "Senior Product Designer & Systems Consultant",
      fiscalYear: 2026,
      targetSavingsRatePct: 25.0,
      emergencyFundTargetMonths: 6,
      liquidCashReserve: 42000.00
    },
    incomes: [
      { id: "inc_01", name: "Primary Design Lead Salary (Net)", monthlyAmount: 7250.00, cadence: "Bi-Weekly" },
      { id: "inc_02", name: "UX Systems Consulting & Retainers", monthlyAmount: 1850.00, cadence: "Monthly" },
      { id: "inc_03", name: "HYSA & Index Fund Dividend Yields", monthlyAmount: 320.00, cadence: "Monthly" }
    ],
    envelopes: [
      { id: "needs_housing", name: "Housing (Mortgage / Lease)", bucket: "Needs", budget: 2450.00, icon: "🏠" },
      { id: "needs_utilities", name: "Utilities, Fiber & Energy", bucket: "Needs", budget: 380.00, icon: "⚡" },
      { id: "needs_groceries", name: "Groceries & Essentials", bucket: "Needs", budget: 750.00, icon: "🛒" },
      { id: "needs_healthcare", name: "Healthcare & HSA", bucket: "Needs", budget: 420.00, icon: "🩺" },
      { id: "needs_transit", name: "Transportation & EV", bucket: "Needs", budget: 480.00, icon: "🚗" },
      { id: "needs_software_tools", name: "Essential Work Tools", bucket: "Needs", budget: 150.00, icon: "💻" },
      { id: "wants_dining", name: "Dining & Roaster Coffee", bucket: "Wants", budget: 550.00, icon: "☕" },
      { id: "wants_entertainment", name: "Concerts & Streaming", bucket: "Wants", budget: 180.00, icon: "🎬" },
      { id: "wants_shopping", name: "Apparel & Gear", bucket: "Wants", budget: 350.00, icon: "🛍️" },
      { id: "wants_fitness", name: "Fitness & Climbing", bucket: "Wants", budget: 220.00, icon: "🧗" },
      { id: "wants_travel", name: "Travel & Escapes", bucket: "Wants", budget: 600.00, icon: "✈️" },
      { id: "wants_personal_care", name: "Grooming & Wellness", bucket: "Wants", budget: 140.00, icon: "✨" },
      { id: "savings_emergency", name: "6-Mo Liquid Runway", bucket: "Savings", budget: 650.00, icon: "🛡️" },
      { id: "savings_index_funds", name: "Index ETF DCA (VTI)", bucket: "Savings", budget: 1200.00, icon: "📈" },
      { id: "debt_extra_payoff", name: "Debt Payoff Accelerator", bucket: "Debt", budget: 900.00, icon: "🚀" }
    ],
    debts: [
      { id: "debt_01", name: "Apex Platinum Card (Repair)", balance: 4850.00, apr: 23.99, minPayment: 145.00 },
      { id: "debt_02", name: "Tech Studio Equipment Financing", balance: 1250.00, apr: 18.50, minPayment: 65.00 },
      { id: "debt_03", name: "All-Electric Commuter Vehicle", balance: 14200.00, apr: 5.49, minPayment: 320.00 },
      { id: "debt_04", name: "Federal Direct Graduate Loan", balance: 18600.00, apr: 4.80, minPayment: 210.00 }
    ],
    transactions: [
      { id: "tx_101", date: "2026-01-02", payee: "First National Mortgage Servicing", amount: 2450.00, categoryId: "needs_housing", type: "expense", notes: "Escrow & Principal" },
      { id: "tx_102", date: "2026-01-03", payee: "NextEra Clean Power & Electric", amount: 215.40, categoryId: "needs_utilities", type: "expense", notes: "Winter heating" },
      { id: "tx_103", date: "2026-01-04", payee: "Whole Foods Market #084", amount: 184.22, categoryId: "needs_groceries", type: "expense", notes: "Produce & pantry" },
      { id: "tx_104", date: "2026-01-05", payee: "Figma Enterprise Monthly", amount: 45.00, categoryId: "needs_software_tools", type: "expense", notes: "Design seat" },
      { id: "tx_105", date: "2026-01-06", payee: "Blue Bottle Coffee", amount: 28.50, categoryId: "wants_dining", type: "expense", notes: "Espresso beans" },
      { id: "tx_106", date: "2026-01-08", payee: "Apex Platinum Card Auto-Debit", amount: 750.00, categoryId: "debt_extra_payoff", type: "expense", notes: "Avalanche accelerator" },
      { id: "tx_107", date: "2026-01-10", payee: "Vanguard Total Market DCA", amount: 600.00, categoryId: "savings_index_funds", type: "expense", notes: "Scheduled ETF buy" },
      { id: "tx_108", date: "2026-01-12", payee: "Trader Joe's Specialty Goods", amount: 142.10, categoryId: "needs_groceries", type: "expense", notes: "Household supplies" },
      { id: "tx_109", date: "2026-01-14", payee: "Netflix 4K Ultra", amount: 22.99, categoryId: "wants_entertainment", type: "expense", notes: "Streaming" },
      { id: "tx_110", date: "2026-01-15", payee: "Studio Design Retainer Direct Deposit", amount: 3625.00, categoryId: "income_primary", type: "income", notes: "Bi-weekly salary" },
      { id: "tx_111", date: "2026-01-16", payee: "ChargePoint EV Fast Charging", amount: 44.80, categoryId: "needs_transit", type: "expense", notes: "Commute charge" },
      { id: "tx_112", date: "2026-01-18", payee: "Bouldering & Fitness Collective", amount: 110.00, categoryId: "wants_fitness", type: "expense", notes: "Gym membership" },
      { id: "tx_113", date: "2026-01-20", payee: "Osteria Mozza Fine Dining", amount: 185.00, categoryId: "wants_dining", type: "expense", notes: "Anniversary dinner" },
      { id: "tx_114", date: "2026-01-22", payee: "High-Yield Reserve Deposit", amount: 325.00, categoryId: "savings_emergency", type: "expense", notes: "Runway cushion" },
      { id: "tx_115", date: "2026-01-24", payee: "Vanguard Total Market DCA", amount: 600.00, categoryId: "savings_index_funds", type: "expense", notes: "ETF purchase" },
      { id: "tx_116", date: "2026-01-26", payee: "Auto Finance Amortization", amount: 320.00, categoryId: "needs_transit", type: "expense", notes: "Auto loan installment" },
      { id: "tx_117", date: "2026-01-28", payee: "Federal Student Aid Servicing", amount: 210.00, categoryId: "needs_healthcare", type: "expense", notes: "Student loan" },
      { id: "tx_118", date: "2026-01-30", payee: "Studio Design Retainer Direct Deposit", amount: 3625.00, categoryId: "income_primary", type: "income", notes: "End-of-month salary" },
      { id: "tx_119", date: "2026-01-31", payee: "Fintech Consulting Retainer", amount: 1850.00, categoryId: "income_consulting", type: "income", notes: "Consulting retainer" },
      { id: "tx_120", date: "2026-01-31", payee: "HYSA Monthly Yield Credited", amount: 164.50, categoryId: "income_dividends", type: "income", notes: "Cash interest" },
      { id: "tx_121", date: "2026-02-02", payee: "First National Mortgage Servicing", amount: 2450.00, categoryId: "needs_housing", type: "expense", notes: "Feb Mortgage" },
      { id: "tx_122", date: "2026-02-03", payee: "Fiber Broadband Telecom", amount: 95.00, categoryId: "needs_utilities", type: "expense", notes: "Internet" },
      { id: "tx_123", date: "2026-02-04", payee: "Whole Foods Market #084", amount: 172.50, categoryId: "needs_groceries", type: "expense", notes: "Groceries" },
      { id: "tx_124", date: "2026-02-05", payee: "Apex Platinum Card Auto-Debit", amount: 750.00, categoryId: "debt_extra_payoff", type: "expense", notes: "Avalanche payoff" },
      { id: "tx_125", date: "2026-02-07", payee: "Github Copilot Pro", amount: 29.00, categoryId: "needs_software_tools", type: "expense", notes: "Dev subscription" },
      { id: "tx_126", date: "2026-02-10", payee: "Vanguard Total Market DCA", amount: 600.00, categoryId: "savings_index_funds", type: "expense", notes: "ETF purchase" },
      { id: "tx_127", date: "2026-02-14", payee: "Alpine Lodge Weekend Cabin", amount: 420.00, categoryId: "wants_travel", type: "expense", notes: "Mountain trip" },
      { id: "tx_128", date: "2026-02-15", payee: "Studio Design Retainer Direct Deposit", amount: 3625.00, categoryId: "income_primary", type: "income", notes: "Payroll" },
      { id: "tx_129", date: "2026-02-18", payee: "CVS Health & Pharmacy", amount: 64.20, categoryId: "needs_healthcare", type: "expense", notes: "Medicine" },
      { id: "tx_130", date: "2026-02-22", payee: "High-Yield Reserve Deposit", amount: 325.00, categoryId: "savings_emergency", type: "expense", notes: "Emergency fund" }
    ],
    rules: [
      { keyword: "WHOLEFDS", categoryId: "needs_groceries" },
      { keyword: "TRADER JOE", categoryId: "needs_groceries" },
      { keyword: "MORTGAGE", categoryId: "needs_housing" },
      { keyword: "ELECTRIC", categoryId: "needs_utilities" },
      { keyword: "FIBER", categoryId: "needs_utilities" },
      { keyword: "VERIZON", categoryId: "needs_utilities" },
      { keyword: "BLUE BOTTLE", categoryId: "wants_dining" },
      { keyword: "STARBUCKS", categoryId: "wants_dining" },
      { keyword: "NETFLIX", categoryId: "wants_entertainment" },
      { keyword: "SPOTIFY", categoryId: "wants_entertainment" },
      { keyword: "VANGUARD", categoryId: "savings_index_funds" },
      { keyword: "CHARGEPOINT", categoryId: "needs_transit" },
      { keyword: "FIGMA", categoryId: "needs_software_tools" },
      { keyword: "GITHUB", categoryId: "needs_software_tools" },
      { keyword: "AIRBNB", categoryId: "wants_travel" },
      { keyword: "LODGE", categoryId: "wants_travel" }
    ],
    simulationSettings: {
      debtStrategy: "avalanche", // "avalanche" or "snowball"
      debtExtraPayoffMonthly: 750.00,
      inflationRatePct: 3.2,
      incomeShockPct: 0.0,
      hysaYieldPct: 4.8
    }
  };

  // State Controller
  let state = loadState();

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('LocalStorage load error, using default state', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
    renderApp();
  }

  // Formatters
  function formatMoney(amount) {
    const num = Number(amount) || 0;
    return '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatPct(val) {
    const num = Number(val) || 0;
    return num.toFixed(1) + '%';
  }

  // Financial Calculations
  function calculateFinancials() {
    // 1. Total Monthly Income
    const totalIncome = state.incomes.reduce((acc, inc) => acc + (Number(inc.monthlyAmount) || 0), 0);

    // 2. Budget Allocations by Bucket
    let plannedNeeds = 0;
    let plannedWants = 0;
    let plannedSavings = 0;
    let plannedDebt = 0;

    state.envelopes.forEach(env => {
      const amt = Number(env.budget) || 0;
      if (env.bucket === 'Needs') plannedNeeds += amt;
      else if (env.bucket === 'Wants') plannedWants += amt;
      else if (env.bucket === 'Savings') plannedSavings += amt;
      else if (env.bucket === 'Debt') plannedDebt += amt;
    });

    const totalAllocated = plannedNeeds + plannedWants + plannedSavings + plannedDebt;
    const remainingUnallocated = totalIncome - totalAllocated;

    // 3. Actual Spend by Category from Transactions
    const actualSpendByEnvelope = {};
    state.envelopes.forEach(e => { actualSpendByEnvelope[e.id] = 0; });

    let actualExpensesTotal = 0;
    let actualSavingsDebtTotal = 0;

    state.transactions.forEach(tx => {
      const amt = Number(tx.amount) || 0;
      if (tx.type === 'expense') {
        if (actualSpendByEnvelope[tx.categoryId] !== undefined) {
          actualSpendByEnvelope[tx.categoryId] += amt;
        }
        const env = state.envelopes.find(e => e.id === tx.categoryId);
        if (env) {
          if (env.bucket === 'Needs' || env.bucket === 'Wants') {
            actualExpensesTotal += amt;
          } else {
            actualSavingsDebtTotal += amt;
          }
        } else {
          actualExpensesTotal += amt;
        }
      }
    });

    // 4. Savings Rate
    const savingsVelocityTotal = plannedSavings + plannedDebt;
    const savingsRate = totalIncome > 0 ? (savingsVelocityTotal / totalIncome) * 100 : 0;

    // 5. Emergency Runway
    const totalLivingBurnMonthly = plannedNeeds + (plannedWants * 0.65); // baseline survival
    const runwayMonths = totalLivingBurnMonthly > 0 ? (state.profile.liquidCashReserve / totalLivingBurnMonthly) : 0;

    return {
      totalIncome,
      plannedNeeds,
      plannedWants,
      plannedSavings,
      plannedDebt,
      totalAllocated,
      remainingUnallocated,
      actualSpendByEnvelope,
      actualExpensesTotal,
      actualSavingsDebtTotal,
      savingsRate,
      runwayMonths,
      totalLivingBurnMonthly
    };
  }

  // Debt Payoff Simulation (Avalanche vs Snowball)
  function simulateDebtPayoff(strategy, extraMonthly) {
    // Clone debts to avoid mutating state
    const debts = state.debts.map(d => ({
      ...d,
      currentBal: Number(d.balance),
      apr: Number(d.apr) / 100,
      minPayment: Number(d.minPayment),
      totalInterestPaid: 0,
      paidOffMonth: null
    }));

    let month = 0;
    const maxMonths = 360; // 30-year safety ceiling
    const monthlyHistory = []; // [month, totalRemainingBalance]

    const initialTotalBalance = debts.reduce((s, d) => s + d.currentBal, 0);
    monthlyHistory.push({ month: 0, balance: initialTotalBalance });

    while (month < maxMonths) {
      const activeDebts = debts.filter(d => d.currentBal > 0.01);
      if (activeDebts.length === 0) break;

      month++;

      // Sort according to strategy
      if (strategy === 'avalanche') {
        // Highest APR first
        activeDebts.sort((a, b) => b.apr - a.apr);
      } else {
        // Snowball: Smallest balance first
        activeDebts.sort((a, b) => a.currentBal - b.currentBal);
      }

      // Accrue monthly interest & pay minimums
      let availableExtra = extraMonthly;

      for (let d of activeDebts) {
        const monthlyInterest = d.currentBal * (d.apr / 12);
        d.totalInterestPaid += monthlyInterest;
        d.currentBal += monthlyInterest;

        // Pay min payment or full balance
        const payment = Math.min(d.currentBal, d.minPayment);
        d.currentBal -= payment;

        if (d.currentBal <= 0.01) {
          d.currentBal = 0;
          if (!d.paidOffMonth) d.paidOffMonth = month;
        }
      }

      // Apply extra accelerator payment to top priority debt
      for (let d of activeDebts) {
        if (d.currentBal > 0 && availableExtra > 0) {
          const extraPay = Math.min(d.currentBal, availableExtra);
          d.currentBal -= extraPay;
          availableExtra -= extraPay;

          if (d.currentBal <= 0.01) {
            d.currentBal = 0;
            if (!d.paidOffMonth) d.paidOffMonth = month;
          }
        }
      }

      const totalBalMonth = debts.reduce((s, d) => s + d.currentBal, 0);
      monthlyHistory.push({ month: month, balance: totalBalMonth });
    }

    const totalInterest = debts.reduce((s, d) => s + d.totalInterestPaid, 0);
    const monthsToDebtFree = month;

    // Projected Debt-Free Date
    const today = new Date();
    const freedomDate = new Date(today.getFullYear(), today.getMonth() + monthsToDebtFree, 1);
    const freedomFormatted = freedomDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    return {
      strategy,
      monthsToDebtFree,
      freedomFormatted,
      totalInterest,
      debts,
      monthlyHistory
    };
  }

  // Render Functions
  function renderApp() {
    const fin = calculateFinancials();

    // 1. Balance Banner
    const balanceAmtEl = document.getElementById('balance-banner-amount');
    const balanceStatusEl = document.getElementById('balance-status-tag');
    const bannerContainer = document.getElementById('main-balance-banner');
    const pillIncome = document.getElementById('pill-total-income');
    const pillAllocated = document.getElementById('pill-total-allocated');
    const pillSavingsRate = document.getElementById('pill-savings-rate');

    if (balanceAmtEl) {
      balanceAmtEl.textContent = formatMoney(Math.abs(fin.remainingUnallocated));
      if (Math.abs(fin.remainingUnallocated) < 0.01) {
        balanceStatusEl.textContent = 'PERFECT ZERO-BASED HARMONY';
        balanceStatusEl.className = 'balance-status-tag status-balanced';
        bannerContainer.className = 'balance-banner balanced';
      } else if (fin.remainingUnallocated > 0) {
        balanceStatusEl.textContent = 'SURPLUS CAPITAL UNALLOCATED';
        balanceStatusEl.className = 'balance-status-tag status-surplus';
        bannerContainer.className = 'balance-banner';
      } else {
        balanceStatusEl.textContent = 'DEFICIT OVER-ALLOCATION';
        balanceStatusEl.className = 'balance-status-tag status-deficit';
        bannerContainer.className = 'balance-banner deficit';
      }
    }

    if (pillIncome) pillIncome.textContent = formatMoney(fin.totalIncome);
    if (pillAllocated) pillAllocated.textContent = formatMoney(fin.totalAllocated);
    if (pillSavingsRate) pillSavingsRate.textContent = formatPct(fin.savingsRate);

    // 2. KPI Cards
    const kpiInflow = document.getElementById('kpi-inflow-val');
    const kpiNeeds = document.getElementById('kpi-needs-val');
    const kpiWants = document.getElementById('kpi-wants-val');
    const kpiSavings = document.getElementById('kpi-savings-val');
    const kpiRunway = document.getElementById('kpi-runway-val');

    if (kpiInflow) kpiInflow.textContent = formatMoney(fin.totalIncome);
    if (kpiNeeds) {
      kpiNeeds.textContent = formatMoney(fin.plannedNeeds);
      const subNeeds = document.getElementById('kpi-needs-sub');
      if (subNeeds) subNeeds.textContent = `${formatPct((fin.plannedNeeds / (fin.totalIncome || 1)) * 100)} of Income (50% target)`;
    }
    if (kpiWants) {
      kpiWants.textContent = formatMoney(fin.plannedWants);
      const subWants = document.getElementById('kpi-wants-sub');
      if (subWants) subWants.textContent = `${formatPct((fin.plannedWants / (fin.totalIncome || 1)) * 100)} of Income (30% target)`;
    }
    if (kpiSavings) {
      kpiSavings.textContent = formatMoney(fin.plannedSavings + fin.plannedDebt);
      const subSavings = document.getElementById('kpi-savings-sub');
      if (subSavings) subSavings.textContent = `${formatPct(fin.savingsRate)} Wealth Velocity (20% target)`;
    }
    if (kpiRunway) {
      kpiRunway.textContent = `${fin.runwayMonths.toFixed(1)} Months`;
    }

    // 3. Render 50/30/20 Donut SVG
    renderDonutChart(fin);

    // 4. Render 12-Month Trajectory Canvas
    renderCashflowCanvas(fin);

    // 5. Render Envelopes
    renderEnvelopes(fin);

    // 6. Render Debt Simulator
    renderDebtSimulator();

    // 7. Render Runway Scenarios
    renderRunwayScenarios(fin);

    // 8. Render Transaction Ledger
    renderTransactions();
  }

  // Donut SVG Drawing
  function renderDonutChart(fin) {
    const svgEl = document.getElementById('donut-svg');
    const centerValEl = document.getElementById('donut-center-pct');
    if (!svgEl) return;

    const total = fin.totalAllocated || 1;
    const pNeeds = fin.plannedNeeds / total;
    const pWants = fin.plannedWants / total;
    const pSavings = (fin.plannedSavings + fin.plannedDebt) / total;

    if (centerValEl) {
      centerValEl.textContent = formatPct(fin.savingsRate);
    }

    const cx = 90, cy = 90, r = 70;
    let accumulatedAngle = 0;

    const segments = [
      { pct: pNeeds, color: "#38bdf8", name: "Needs" },
      { pct: pWants, color: "#8b5cf6", name: "Wants" },
      { pct: pSavings, color: "#10b981", name: "Savings & Debt" }
    ];

    let svgHtml = '';
    segments.forEach(seg => {
      if (seg.pct <= 0) return;
      const angle = seg.pct * 2 * Math.PI;
      const startAngle = accumulatedAngle;
      const endAngle = accumulatedAngle + angle;
      accumulatedAngle = endAngle;

      const x1 = cx + r * Math.sin(startAngle);
      const y1 = cy - r * Math.cos(startAngle);
      const x2 = cx + r * Math.sin(endAngle);
      const y2 = cy - r * Math.cos(endAngle);

      const largeArc = angle > Math.PI ? 1 : 0;
      const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

      svgHtml += `<path d="${pathData}" fill="${seg.color}" opacity="0.9" />`;
    });

    // Inner Cutout for Donut
    svgHtml += `<circle cx="${cx}" cy="${cy}" r="48" fill="var(--bg-card)" />`;
    svgEl.innerHTML = svgHtml;
  }

  // 12-Month Canvas Trajectory Chart
  function renderCashflowCanvas(fin) {
    const canvas = document.getElementById('cashflow-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth || 600;
    const height = 280;

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    ctx.clearRect(0, 0, width, height);

    const padding = { top: 30, right: 30, bottom: 40, left: 60 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const maxVal = Math.max(fin.totalIncome * 1.25, 10000);

    // Background Grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      const valLabel = Math.round(maxVal - (maxVal / 4) * i);
      ctx.fillStyle = '#64748b';
      ctx.font = '10px ui-monospace, monospace';
      ctx.textAlign = 'right';
      ctx.fillText('$' + (valLabel / 1000).toFixed(0) + 'k', padding.left - 8, y + 3);
    }

    const colWidth = chartW / months.length;

    // Draw Bars for each month
    months.forEach((m, idx) => {
      const x = padding.left + idx * colWidth + colWidth * 0.15;
      const bW = colWidth * 0.7;

      // Income bar (Blue outline/fill)
      const incH = (fin.totalIncome / maxVal) * chartH;
      const incY = padding.top + chartH - incH;

      ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.fillRect(x, incY, bW, incH);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, incY, bW, incH);

      // Total Expenses (Needs + Wants) bar
      const expVal = fin.plannedNeeds + fin.plannedWants;
      const expH = (expVal / maxVal) * chartH;
      const expY = padding.top + chartH - expH;

      ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.fillRect(x + bW * 0.2, expY, bW * 0.6, expH);

      // Retained Savings bar
      const savVal = fin.plannedSavings + fin.plannedDebt;
      const savH = (savVal / maxVal) * chartH;
      const savY = expY - savH;

      ctx.fillStyle = 'rgba(16, 185, 129, 0.7)';
      ctx.fillRect(x + bW * 0.2, savY, bW * 0.6, savH);

      // Month Label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(m, x + bW / 2, height - padding.bottom + 18);
    });
  }

  // Render Envelopes
  function renderEnvelopes(fin) {
    const container = document.getElementById('envelopes-grid-container');
    if (!container) return;

    let html = '';
    state.envelopes.forEach(env => {
      const spent = fin.actualSpendByEnvelope[env.id] || 0;
      const budget = Number(env.budget) || 1;
      const pct = Math.min(100, Math.round((spent / budget) * 100));
      const remaining = budget - spent;

      let tagClass = 'tag-needs';
      if (env.bucket === 'Wants') tagClass = 'tag-wants';
      else if (env.bucket === 'Savings') tagClass = 'tag-savings';
      else if (env.bucket === 'Debt') tagClass = 'tag-debt';

      let barColor = 'var(--color-sky-cyan)';
      if (pct > 90) barColor = 'var(--color-warning-amber)';
      if (pct >= 100) barColor = 'var(--color-danger-rose)';
      if (env.bucket === 'Savings') barColor = 'var(--color-emerald-growth)';

      html += `
        <div class="envelope-card">
          <div class="envelope-header">
            <div class="envelope-title">
              <span>${env.icon}</span>
              <span>${env.name}</span>
            </div>
            <span class="envelope-bucket-tag ${tagClass}">${env.bucket}</span>
          </div>
          
          <div class="envelope-progress-bg">
            <div class="envelope-progress-bar" style="width: ${pct}%; background-color: ${barColor};"></div>
          </div>

          <div class="envelope-details-row">
            <span>Spent: <strong>${formatMoney(spent)}</strong></span>
            <span>Rem: <strong class="${remaining < 0 ? 'text-rose' : 'text-emerald'}">${formatMoney(remaining)}</strong></span>
          </div>

          <div class="envelope-details-row" style="margin-top: 0.25rem;">
            <span style="font-size: 0.75rem; color: var(--text-muted);">Budget Target:</span>
            <div class="envelope-budget-input-group">
              <span style="font-size: 0.8rem; font-weight: 700;">$</span>
              <input type="number" step="10" class="form-input" style="width: 100px; padding: 0.2rem 0.4rem;" 
                value="${env.budget}" onchange="window.budgetApp.updateEnvelopeBudget('${env.id}', this.value)" />
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // Render Debt Simulator
  function renderDebtSimulator() {
    const extraVal = state.simulationSettings.debtExtraPayoffMonthly;
    const simAvalanche = simulateDebtPayoff('avalanche', extraVal);
    const simSnowball = simulateDebtPayoff('snowball', extraVal);
    const simMinimumOnly = simulateDebtPayoff('avalanche', 0);

    const intSaved = simMinimumOnly.totalInterest - simAvalanche.totalInterest;
    const monthsSaved = simMinimumOnly.monthsToDebtFree - simAvalanche.monthsToDebtFree;

    const savedIntEl = document.getElementById('debt-interest-saved');
    const freedomDateEl = document.getElementById('debt-freedom-date');
    const acceleratedMonthsEl = document.getElementById('debt-months-accelerated');
    const sliderLabel = document.getElementById('extra-payoff-slider-val');

    if (savedIntEl) savedIntEl.textContent = formatMoney(intSaved);
    if (freedomDateEl) freedomDateEl.textContent = simAvalanche.freedomFormatted;
    if (acceleratedMonthsEl) acceleratedMonthsEl.textContent = `${monthsSaved} Months Faster`;
    if (sliderLabel) sliderLabel.textContent = formatMoney(extraVal) + '/mo';

    // Update Schedule Table
    const tableBody = document.getElementById('debt-schedule-tbody');
    if (tableBody) {
      let tHtml = '';
      state.debts.forEach((d, idx) => {
        const simDebt = simAvalanche.debts.find(sd => sd.id === d.id);
        const freedomM = simDebt ? simDebt.paidOffMonth : '-';
        tHtml += `
          <tr>
            <td><strong>${d.name}</strong></td>
            <td>${formatMoney(d.balance)}</td>
            <td><span class="brand-badge">${d.apr}%</span></td>
            <td>${formatMoney(d.minPayment)}</td>
            <td class="text-cyan"><strong>Month ${freedomM}</strong></td>
            <td><span class="brand-badge" style="background: rgba(16,185,129,0.15); color: #10b981;">Priority #${idx + 1}</span></td>
          </tr>
        `;
      });
      tableBody.innerHTML = tHtml;
    }

    // Render Canvas Debt Curve
    renderDebtCanvas(simAvalanche, simSnowball, simMinimumOnly);
  }

  // Debt Payoff Curves Canvas
  function renderDebtCanvas(avalanche, snowball, minOnly) {
    const canvas = document.getElementById('debt-curve-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth || 550;
    const height = 240;

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    ctx.clearRect(0, 0, width, height);

    const pad = { top: 20, right: 20, bottom: 35, left: 55 };
    const w = width - pad.left - pad.right;
    const h = height - pad.top - pad.bottom;

    const maxMonths = Math.min(60, minOnly.monthsToDebtFree || 60);
    const maxBalance = state.debts.reduce((s, d) => s + d.balance, 0) * 1.1;

    // Grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const y = pad.top + (h / 3) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(width - pad.right, y);
      ctx.stroke();

      const balLbl = Math.round(maxBalance - (maxBalance / 3) * i);
      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('$' + (balLbl / 1000).toFixed(0) + 'k', pad.left - 6, y + 3);
    }

    function drawLine(history, color, width, dash = []) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.setLineDash(dash);

      history.forEach((pt, i) => {
        if (pt.month > maxMonths) return;
        const x = pad.left + (pt.month / maxMonths) * w;
        const y = pad.top + h - (pt.balance / maxBalance) * h;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Minimum Only (dashed rose)
    drawLine(minOnly.monthlyHistory, '#ef4444', 1.5, [4, 4]);
    // Snowball (amber)
    drawLine(snowball.monthlyHistory, '#f59e0b', 2);
    // Avalanche (cyan/electric blue)
    drawLine(avalanche.monthlyHistory, '#38bdf8', 2.5);

    // Legend
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('— Minimums Only', pad.left + 10, pad.top + 10);
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('— Snowball Payoff', pad.left + 130, pad.top + 10);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('— Avalanche (Accelerated)', pad.left + 260, pad.top + 10);
  }

  // Render Runway Scenarios
  function renderRunwayScenarios(fin) {
    const infRate = state.simulationSettings.inflationRatePct;
    const shockPct = state.simulationSettings.incomeShockPct;

    const baseBurn = fin.totalLivingBurnMonthly;
    const adjBurn = baseBurn * (1 + infRate / 100);
    const adjIncome = fin.totalIncome * (1 - shockPct / 100);
    const netMonthlyBurn = adjIncome - adjBurn;

    const runwayMonths = netMonthlyBurn < 0 ? (state.profile.liquidCashReserve / Math.abs(netMonthlyBurn)) : 999;

    const rHorizonEl = document.getElementById('runway-calculated-horizon');
    const rBurnEl = document.getElementById('runway-adjusted-burn');
    const rCashEl = document.getElementById('runway-liquid-cash');

    if (rHorizonEl) {
      rHorizonEl.textContent = runwayMonths >= 100 ? 'Infinite (Cashflow Positive)' : `${runwayMonths.toFixed(1)} Months`;
    }
    if (rBurnEl) rBurnEl.textContent = formatMoney(adjBurn);
    if (rCashEl) rCashEl.textContent = formatMoney(state.profile.liquidCashReserve);
  }

  // Render Transaction Ledger
  function renderTransactions() {
    const tbody = document.getElementById('transactions-table-body');
    const countEl = document.getElementById('tx-count-badge');
    const searchInput = document.getElementById('tx-search-input');
    const filterCat = document.getElementById('tx-filter-category');

    if (!tbody) return;

    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const catVal = filterCat ? filterCat.value : 'all';

    const filtered = state.transactions.filter(tx => {
      const matchSearch = tx.payee.toLowerCase().includes(query) || (tx.notes && tx.notes.toLowerCase().includes(query));
      const matchCat = catVal === 'all' || tx.categoryId === catVal;
      return matchSearch && matchCat;
    });

    if (countEl) countEl.textContent = `${filtered.length} Records`;

    let html = '';
    filtered.slice(0, 50).forEach(tx => {
      const isExp = tx.type === 'expense';
      const env = state.envelopes.find(e => e.id === tx.categoryId);
      const catName = env ? env.name : (tx.categoryId.replace('_', ' ').toUpperCase());

      html += `
        <tr>
          <td>${tx.date}</td>
          <td><strong>${tx.payee}</strong></td>
          <td><span class="envelope-bucket-tag ${isExp ? 'tag-needs' : 'tag-savings'}">${catName}</span></td>
          <td class="${isExp ? 'text-primary' : 'text-emerald'}" style="font-family: var(--font-mono); font-weight: 700;">
            ${isExp ? '-' : '+'}${formatMoney(tx.amount)}
          </td>
          <td style="color: var(--text-muted); font-size: 0.8rem;">${tx.notes || ''}</td>
          <td>
            <button class="btn-icon" style="width: 26px; height: 26px;" onclick="window.budgetApp.deleteTransaction('${tx.id}')" title="Delete">✕</button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  }

  // Bank CSV Parser & Smart Categorizer
  function parseAndCategorizeCSV(csvText) {
    const lines = csvText.split(/\r?\n/).filter(l => l.trim().length > 0);
    const parsed = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Simple CSV split handling quotes
      const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(p => p.replace(/^"|"$/g, '').trim());
      if (parts.length >= 3) {
        const dateStr = parts[0];
        const payeeStr = parts[1];
        const rawAmt = parseFloat(parts[2].replace(/[$,]/g, ''));

        if (!isNaN(rawAmt)) {
          // Match category from rules
          let matchedCategory = "wants_shopping";
          const upperPayee = payeeStr.toUpperCase();

          for (const rule of state.rules) {
            if (upperPayee.includes(rule.keyword)) {
              matchedCategory = rule.categoryId;
              break;
            }
          }

          parsed.push({
            id: 'tx_csv_' + Date.now() + '_' + i,
            date: dateStr,
            payee: payeeStr,
            amount: Math.abs(rawAmt),
            categoryId: matchedCategory,
            type: rawAmt < 0 ? 'expense' : 'income',
            notes: 'Imported via Smart CSV Rules'
          });
        }
      }
    }
    return parsed;
  }

  // Public Interface attached to window.budgetApp
  window.budgetApp = {
    // Navigation
    switchTab: function (tabId) {
      document.querySelectorAll('.nav-tab-btn').forEach(btn => btn.classList.remove('active'));
      const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
      if (activeBtn) activeBtn.classList.add('active');

      document.querySelectorAll('.tab-view-panel').forEach(p => p.style.display = 'none');
      const targetPanel = document.getElementById(`tab-view-${tabId}`);
      if (targetPanel) targetPanel.style.display = 'block';

      // Re-trigger Canvas resizing
      setTimeout(() => {
        const fin = calculateFinancials();
        renderCashflowCanvas(fin);
        renderDebtSimulator();
      }, 50);
    },

    // Theme Switcher
    toggleTheme: function () {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(THEME_KEY, next);
    },

    // Envelope Budget Updates
    updateEnvelopeBudget: function (envId, newBudget) {
      const env = state.envelopes.find(e => e.id === envId);
      if (env) {
        env.budget = parseFloat(newBudget) || 0;
        saveState();
      }
    },

    // Debt Simulator Controls
    updateExtraPayoff: function (val) {
      state.simulationSettings.debtExtraPayoffMonthly = parseFloat(val) || 0;
      saveState();
    },

    // Runway Slider Controls
    updateInflationRate: function (val) {
      state.simulationSettings.inflationRatePct = parseFloat(val) || 0;
      const lbl = document.getElementById('inflation-slider-val');
      if (lbl) lbl.textContent = val + '%';
      saveState();
    },

    updateIncomeShock: function (val) {
      state.simulationSettings.incomeShockPct = parseFloat(val) || 0;
      const lbl = document.getElementById('shock-slider-val');
      if (lbl) lbl.textContent = val + '%';
      saveState();
    },

    // Transaction Management
    addTransaction: function (date, payee, amount, categoryId, type, notes) {
      const newTx = {
        id: 'tx_' + Date.now(),
        date: date || new Date().toISOString().split('T')[0],
        payee: payee || 'Untitled Transaction',
        amount: parseFloat(amount) || 0,
        categoryId: categoryId || 'wants_shopping',
        type: type || 'expense',
        notes: notes || ''
      };
      state.transactions.unshift(newTx);
      saveState();
      this.closeModal('add-tx-modal');
    },

    deleteTransaction: function (txId) {
      if (confirm('Delete this transaction record?')) {
        state.transactions = state.transactions.filter(t => t.id !== txId);
        saveState();
      }
    },

    // CSV Categorizer
    handleCSVUpload: function (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const parsed = parseAndCategorizeCSV(e.target.result);
        if (parsed.length > 0) {
          state.transactions = parsed.concat(state.transactions);
          saveState();
          alert(`Successfully imported and auto-categorized ${parsed.length} transactions!`);
          window.budgetApp.switchTab('transactions');
        } else {
          alert('Could not parse transactions from CSV. Please check formatting.');
        }
      };
      reader.readAsText(file);
    },

    loadSampleCSV: function () {
      const sample = `Date,Description,Amount
2026-02-19,WHOLEFDS SOMA #102,-89.45
2026-02-20,BLUE BOTTLE COFFEE,-14.25
2026-02-21,NETFLIX STREAMING,-22.99
2026-02-22,VANGUARD INVESTMENT,-600.00
2026-02-23,COMCAST FIBER INTERNET,-85.00
2026-02-24,UBER TRIP TRANSIT,-32.40`;
      const parsed = parseAndCategorizeCSV(sample);
      state.transactions = parsed.concat(state.transactions);
      saveState();
      alert(`Imported ${parsed.length} sample bank transactions with smart categorization!`);
      window.budgetApp.switchTab('transactions');
    },

    // Export CSV
    exportTransactionsCSV: function () {
      let csv = 'ID,Date,Payee,Category,Amount,Type,Notes\r\n';
      state.transactions.forEach(t => {
        csv += `"${t.id}","${t.date}","${t.payee.replace(/"/g, '""')}","${t.categoryId}",${t.amount},"${t.type}","${(t.notes || '').replace(/"/g, '""')}"\r\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `BudgetOS_2026_Ledger_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    // Backup & Restore
    exportBackupJSON: function () {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `BudgetOS_2026_Full_Backup_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    },

    importBackupJSON: function (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const imported = JSON.parse(e.target.result);
          if (imported.envelopes && imported.transactions) {
            state = imported;
            saveState();
            alert('Backup state restored successfully!');
          } else {
            alert('Invalid BudgetOS backup file.');
          }
        } catch (err) {
          alert('Error parsing JSON backup file.');
        }
      };
      reader.readAsText(file);
    },

    resetToDefaults: function () {
      if (confirm('Reset BudgetOS 2026 to golden master default settings? All local edits will be refreshed.')) {
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        saveState();
      }
    },

    // Modal Helpers
    openModal: function (modalId) {
      const m = document.getElementById(modalId);
      if (m) m.classList.add('open');
    },

    closeModal: function (modalId) {
      const m = document.getElementById(modalId);
      if (m) m.classList.remove('open');
    }
  };

  // Initialization on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    // Theme setup
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Initial render
    renderApp();

    // Resize event listener for responsive canvas charts
    window.addEventListener('resize', () => {
      const fin = calculateFinancials();
      renderCashflowCanvas(fin);
      renderDebtSimulator();
    });

    // Populate category dropdown in modal
    const catSelect = document.getElementById('modal-tx-category');
    if (catSelect) {
      let optHtml = '';
      state.envelopes.forEach(e => {
        optHtml += `<option value="${e.id}">${e.icon} ${e.name} (${e.bucket})</option>`;
      });
      catSelect.innerHTML = optHtml;
    }

    // Populate ledger filter dropdown
    const filterSelect = document.getElementById('tx-filter-category');
    if (filterSelect) {
      let fHtml = '<option value="all">All Categories</option>';
      state.envelopes.forEach(e => {
        fHtml += `<option value="${e.id}">${e.icon} ${e.name}</option>`;
      });
      filterSelect.innerHTML = fHtml;
    }
  });

})();
