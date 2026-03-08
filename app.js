// Algorithm data
const algorithms = [
  {
    name: "PPO",
    fullName: "Proximal Policy Optimization",
    bestFor: "Robust, easy to tune, beginner-friendly",
    sampleEfficiency: 3,
    stability: 5
  },
  {
    name: "A2C",
    fullName: "Advantage Actor-Critic",
    bestFor: "Fast training, good cumulative rewards",
    sampleEfficiency: 2,
    stability: 5
  },
  {
    name: "TD3",
    fullName: "Twin Delayed DDPG",
    bestFor: "Continuous actions, stable performance",
    sampleEfficiency: 4,
    stability: 5
  },
  {
    name: "SAC",
    fullName: "Soft Actor-Critic",
    bestFor: "Maximum entropy, sample efficient",
    sampleEfficiency: 5,
    stability: 3
  },
  {
    name: "DDPG",
    fullName: "Deep Deterministic Policy Gradient",
    bestFor: "Continuous control, benchmark algorithm",
    sampleEfficiency: 4,
    stability: 2
  }
];

// State variables
let isTraining = false;
let isBacktestComplete = false;
let portfolioChart = null;
let priceChart = null;

// Initialize app
function init() {
  updateDateTime();
  setInterval(updateDateTime, 1000);
  populateAlgorithmTable();
  setupEventListeners();
}

// Update date/time display
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  document.getElementById('datetime').textContent = now.toLocaleDateString('en-US', options);
}

// Populate algorithm comparison table
function populateAlgorithmTable() {
  const tbody = document.getElementById('algorithmTableBody');
  tbody.innerHTML = '';

  algorithms.forEach(algo => {
    const row = document.createElement('tr');
    const selectedAlgo = document.getElementById('algorithm').value;
    if (algo.name === selectedAlgo) {
      row.classList.add('active');
    }

    row.innerHTML = `
      <td><strong>${algo.name}</strong></td>
      <td>${algo.fullName}</td>
      <td>${algo.bestFor}</td>
      <td>${generateStars(algo.sampleEfficiency)}</td>
      <td>${generateStars(algo.stability)}</td>
    `;
    tbody.appendChild(row);
  });
}

// Generate star rating
function generateStars(rating) {
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  return `<span class="rating-stars">${stars}</span>`;
}

// Setup event listeners
function setupEventListeners() {
  document.getElementById('trainBtn').addEventListener('click', startTraining);
  document.getElementById('backtestBtn').addEventListener('click', runBacktest);
  document.getElementById('algorithm').addEventListener('change', populateAlgorithmTable);
}

// Start training simulation
function startTraining() {
  if (isTraining) return;

  isTraining = true;
  const trainBtn = document.getElementById('trainBtn');
  const backtestBtn = document.getElementById('backtestBtn');
  const trainingSection = document.getElementById('trainingSection');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const statusMessage = document.getElementById('statusMessage');
  const trainingMetrics = document.getElementById('trainingMetrics');

  trainBtn.disabled = true;
  trainBtn.textContent = 'Training...';
  backtestBtn.disabled = true;
  trainingSection.style.display = 'block';
  trainingMetrics.style.display = 'grid';

  // Reset progress
  progressFill.style.width = '0%';
  progressText.textContent = '0%';
  statusMessage.textContent = 'Initializing environment...';

  const totalDuration = 5000; // 5 seconds
  const updateInterval = 50; // Update every 50ms
  const steps = totalDuration / updateInterval;
  let currentStep = 0;

  const interval = setInterval(() => {
    currentStep++;
    const progress = (currentStep / steps) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = Math.round(progress) + '%';

    // Update status messages
    if (progress < 20) {
      statusMessage.textContent = 'Initializing environment...';
    } else if (progress < 40) {
      statusMessage.textContent = 'Loading training data...';
    } else if (progress < 60) {
      statusMessage.textContent = 'Training agent...';
    } else if (progress < 80) {
      statusMessage.textContent = 'Optimizing policy network...';
    } else if (progress < 100) {
      statusMessage.textContent = 'Finalizing training...';
    }

    // Update training metrics
    const episodes = Math.floor((progress / 100) * 500);
    const reward = (Math.random() * 200 - 50).toFixed(2);
    const timeElapsed = Math.floor((progress / 100) * totalDuration / 1000);

    document.getElementById('episodes').textContent = episodes;
    document.getElementById('currentReward').textContent = reward;
    document.getElementById('timeElapsed').textContent = timeElapsed + 's';

    if (currentStep >= steps) {
      clearInterval(interval);
      statusMessage.textContent = '✓ Training complete! Ready for backtesting.';
      statusMessage.style.color = '#3fb950';
      trainBtn.textContent = 'Training Complete';
      backtestBtn.disabled = false;
      isTraining = false;
    }
  }, updateInterval);
}

// Run backtest
function runBacktest() {
  const backtestBtn = document.getElementById('backtestBtn');
  backtestBtn.disabled = true;
  backtestBtn.textContent = 'Running Backtest...';

  setTimeout(() => {
    generatePerformanceMetrics();
    generateCharts();
    generateTradeHistory();
    generateTechnicalIndicators();

    // Show all results sections
    document.getElementById('metricsSection').style.display = 'block';
    document.getElementById('chartsSection').style.display = 'block';
    document.getElementById('tradesSection').style.display = 'block';
    document.getElementById('indicatorsSection').style.display = 'block';

    backtestBtn.textContent = 'Backtest Complete';
    isBacktestComplete = true;

    // Scroll to metrics
    document.getElementById('metricsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 2000);
}

// Generate performance metrics
function generatePerformanceMetrics() {
  const initialBalance = parseFloat(document.getElementById('initialBalance').value);
  const returnPct = (Math.random() * 30 + 15).toFixed(2); // 15-45% return
  const finalValue = initialBalance * (1 + returnPct / 100);
  const sharpeRatio = (Math.random() * 1.5 + 0.5).toFixed(2); // 0.5-2.0
  const maxDrawdown = -(Math.random() * 10 + 5).toFixed(2); // -5% to -15%
  const volatility = (Math.random() * 10 + 10).toFixed(2); // 10-20%
  const numTrades = Math.floor(Math.random() * 30 + 20); // 20-50 trades
  const winRate = (Math.random() * 20 + 55).toFixed(1); // 55-75%

  // Update UI
  const totalReturnEl = document.getElementById('totalReturn');
  totalReturnEl.textContent = '+' + returnPct + '%';
  totalReturnEl.classList.add('metric-positive');

  document.getElementById('sharpeRatio').textContent = sharpeRatio;
  
  const maxDrawdownEl = document.getElementById('maxDrawdown');
  maxDrawdownEl.textContent = maxDrawdown + '%';
  maxDrawdownEl.classList.add('metric-negative');

  document.getElementById('volatility').textContent = volatility + '%';
  document.getElementById('finalValue').textContent = '$' + finalValue.toLocaleString(undefined, { maximumFractionDigits: 0 });
  document.getElementById('numTrades').textContent = numTrades;
  document.getElementById('winRate').textContent = winRate + '%';
}

// Generate charts
function generateCharts() {
  const initialBalance = parseFloat(document.getElementById('initialBalance').value);
  const numDays = 120; // ~4 months of trading days
  
  // Generate portfolio value data
  const portfolioData = [];
  let currentValue = initialBalance;
  for (let i = 0; i <= numDays; i++) {
    const change = (Math.random() - 0.45) * 1000; // Slight upward bias
    currentValue += change;
    portfolioData.push(currentValue);
  }

  // Generate stock price data
  const priceData = [];
  let currentPrice = 150 + Math.random() * 50; // $150-200 starting price
  for (let i = 0; i <= numDays; i++) {
    const change = (Math.random() - 0.48) * 5; // Slight upward bias
    currentPrice += change;
    priceData.push(currentPrice);
  }

  const labels = Array.from({ length: numDays + 1 }, (_, i) => `Day ${i}`);

  // Portfolio chart
  const portfolioCtx = document.getElementById('portfolioChart').getContext('2d');
  if (portfolioChart) {
    portfolioChart.destroy();
  }
  portfolioChart = new Chart(portfolioCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Portfolio Value',
        data: portfolioData,
        borderColor: '#1fb8cd',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }, {
        label: 'Initial Balance',
        data: Array(numDays + 1).fill(initialBalance),
        borderColor: 'rgba(139, 148, 158, 0.5)',
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#e1e4e8'
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(26, 31, 46, 0.95)',
          titleColor: '#e1e4e8',
          bodyColor: '#e1e4e8',
          borderColor: '#1fb8cd',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += '$' + context.parsed.y.toLocaleString(undefined, { maximumFractionDigits: 0 });
              }
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          display: false,
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          },
          ticks: {
            color: '#8b949e'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          },
          ticks: {
            color: '#8b949e',
            callback: function(value) {
              return '$' + value.toLocaleString(undefined, { maximumFractionDigits: 0 });
            }
          }
        }
      }
    }
  });

  // Price chart
  const priceCtx = document.getElementById('priceChart').getContext('2d');
  if (priceChart) {
    priceChart.destroy();
  }
  priceChart = new Chart(priceCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Stock Price',
        data: priceData,
        borderColor: '#3fb950',
        backgroundColor: 'rgba(63, 185, 80, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#e1e4e8'
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(26, 31, 46, 0.95)',
          titleColor: '#e1e4e8',
          bodyColor: '#e1e4e8',
          borderColor: '#3fb950',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += '$' + context.parsed.y.toFixed(2);
              }
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          display: false,
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          },
          ticks: {
            color: '#8b949e'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          },
          ticks: {
            color: '#8b949e',
            callback: function(value) {
              return '$' + value.toFixed(2);
            }
          }
        }
      }
    }
  });
}

// Generate trade history
function generateTradeHistory() {
  const tbody = document.getElementById('tradesTableBody');
  tbody.innerHTML = '';

  const actions = ['Buy', 'Sell', 'Hold'];
  const numTrades = 25;
  const testStartDate = new Date(document.getElementById('testStart').value);
  const testEndDate = new Date(document.getElementById('testEnd').value);
  const daysDiff = Math.floor((testEndDate - testStartDate) / (1000 * 60 * 60 * 24));

  let lastAction = 'Buy';
  let lastPrice = 0;

  for (let i = 1; i <= numTrades; i++) {
    const action = i === 1 ? 'Buy' : (lastAction === 'Buy' ? (Math.random() > 0.3 ? 'Hold' : 'Sell') : (Math.random() > 0.3 ? 'Hold' : 'Buy'));
    const shares = action === 'Hold' ? 0 : Math.floor(Math.random() * 50 + 10);
    const price = 150 + Math.random() * 100;
    const dayOffset = Math.floor((i / numTrades) * daysDiff);
    const tradeDate = new Date(testStartDate);
    tradeDate.setDate(tradeDate.getDate() + dayOffset);
    
    let profitLoss = '--';
    let profitClass = '';
    
    if (action === 'Sell' && lastAction === 'Buy' && lastPrice > 0) {
      const pl = (price - lastPrice) * shares;
      profitLoss = (pl >= 0 ? '+$' : '-$') + Math.abs(pl).toFixed(2);
      profitClass = pl >= 0 ? 'profit-positive' : 'profit-negative';
    }

    if (action !== 'Hold') {
      lastAction = action;
      lastPrice = price;
    }

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${i}</td>
      <td><span class="action-${action.toLowerCase()}">${action}</span></td>
      <td>${shares || '--'}</td>
      <td>$${price.toFixed(2)}</td>
      <td>${tradeDate.toLocaleDateString()}</td>
      <td class="${profitClass}">${profitLoss}</td>
    `;
    tbody.appendChild(row);
  }
}

// Generate technical indicators
function generateTechnicalIndicators() {
  const basePrice = 150 + Math.random() * 50;
  
  document.getElementById('sma10').textContent = '$' + (basePrice * 0.98).toFixed(2);
  document.getElementById('sma30').textContent = '$' + (basePrice * 0.96).toFixed(2);
  document.getElementById('macd').textContent = (Math.random() * 4 - 2).toFixed(2);
  document.getElementById('rsi').textContent = (Math.random() * 40 + 30).toFixed(1);
  document.getElementById('bbUpper').textContent = '$' + (basePrice * 1.05).toFixed(2);
  document.getElementById('bbLower').textContent = '$' + (basePrice * 0.95).toFixed(2);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', init);