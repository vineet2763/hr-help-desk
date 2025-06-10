// In-memory storage (for demo only)
let queries = [];
let leaves = [];
let suggestions = [];

// Handle Query/Complaint Form
document.getElementById('queryForm').onsubmit = function(e) {
  e.preventDefault();
  queries.push({
    name: document.getElementById('staffName').value,
    dept: document.getElementById('staffDept').value,
    type: document.getElementById('queryType').value,
    msg: document.getElementById('queryMsg').value,
    solved: false
  });
  this.reset();
  showTab('queries');
};

// ...existing code...

let supports = [];

// Handle Required Support Form
document.getElementById('supportForm').onsubmit = function(e) {
  e.preventDefault();
  supports.push({
    name: document.getElementById('supportName').value,
    type: document.getElementById('supportType').value,
    msg: document.getElementById('supportMsg').value,
    status: 'Pending'
  });
  this.reset();
  showTab('supports');
};

// Update showTab function to handle supports
function showTab(tab) {
  const dashboard = document.getElementById('dashboardContent');
  if (tab === 'queries') {
    dashboard.innerHTML = `<h3>Queries & Complaints</h3>` + queries.map((q, i) => `
      <div class="item">
        <b>${q.type}</b> by ${q.name} (${q.dept}):<br>
        ${q.msg}<br>
        Status: <span style="color:${q.solved ? 'green':'red'}">${q.solved ? 'Solved':'Not Solved'}</span>
        <button onclick="toggleSolved(${i})">${q.solved ? 'Mark Unsolved':'Mark Solved'}</button>
      </div>
    `).join('') || '<p>No queries or complaints yet.</p>';
  } else if (tab === 'supports') {
    dashboard.innerHTML = `<h3>Required Support</h3>` + supports.map((s, i) => `
      <div class="item">
        <b>${s.type}</b> by ${s.name}:<br>
        ${s.msg}<br>
        Status: <span>${s.status}</span>
        <button onclick="approveSupport(${i})">Mark as Solved</button>
        <button onclick="rejectSupport(${i})">Mark as Unsolved</button>
      </div>
    `).join('') || '<p>No support requests yet.</p>';
  } else if (tab === 'suggestions') {
    dashboard.innerHTML = `<h3>Suggestions</h3>` + suggestions.map(s =>
      `<div class="item"><b>${s.name}:</b> ${s.msg}</div>`
    ).join('') || '<p>No suggestions yet.</p>';
  }
}
window.showTab = showTab;

// Support status handlers
window.approveSupport = function(idx) {
  supports[idx].status = 'Solved';
  showTab('supports');
};
window.rejectSupport = function(idx) {
  supports[idx].status = 'Unsolved';
  showTab('supports');
};

// Show supports tab by default
showTab('supports');

// Handle Suggestion Form
document.getElementById('suggestionForm').onsubmit = function(e) {
  e.preventDefault();
  suggestions.push({
    name: document.getElementById('suggestionName').value,
    msg: document.getElementById('suggestionMsg').value
  });
  this.reset();
  showTab('suggestions');
};

// Dashboard Tabs
function showTab(tab) {
  const dashboard = document.getElementById('dashboardContent');
  if (tab === 'queries') {
    dashboard.innerHTML = `<h3>Queries & Complaints</h3>` + queries.map((q, i) => `
      <div class="item">
        <b>${q.type}</b> by ${q.name} (${q.dept}):<br>
        ${q.msg}<br>
        Status: <span style="color:${q.solved ? 'green':'red'}">${q.solved ? 'Solved':'Not Solved'}</span>
        <button onclick="toggleSolved(${i})">${q.solved ? 'Mark Unsolved':'Mark Solved'}</button>
      </div>
    `).join('') || '<p>No queries or complaints yet.</p>';
  } else if (tab === 'leaves') {
    dashboard.innerHTML = `<h3>Leave Requests</h3>` + leaves.map((l, i) => `
      <div class="item">
        <b>${l.name}</b> requested leave on ${l.date}<br>
        Reason: ${l.reason}<br>
        Status: <span>${l.status}</span>
        <button onclick="approveLeave(${i})">Approve</button>
        <button onclick="rejectLeave(${i})">Reject</button>
      </div>
    `).join('') || '<p>No leave requests yet.</p>';
  } else if (tab === 'suggestions') {
    dashboard.innerHTML = `<h3>Suggestions</h3>` + suggestions.map(s =>
      `<div class="item"><b>${s.name}:</b> ${s.msg}</div>`
    ).join('') || '<p>No suggestions yet.</p>';
  }
}
window.showTab = showTab;

// Toggle Solved/Unsolved for Queries
window.toggleSolved = function(idx) {
  queries[idx].solved = !queries[idx].solved;
  showTab('queries');
};

// Approve/Reject Leave
window.approveLeave = function(idx) {
  leaves[idx].status = 'Approved';
  showTab('leaves');
};
window.rejectLeave = function(idx) {
  leaves[idx].status = 'Rejected';
  showTab('leaves');
};

// Show queries tab by default
showTab('queries');