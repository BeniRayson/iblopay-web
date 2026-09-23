export var MOCK_AGENTS = [
    { agentId: 'AGT-001', agentName: 'Jean-Pierre Hakizimana', superAgentId: 'SA-001', superAgentName: 'Alphonse Niyonzima' },
    { agentId: 'AGT-002', agentName: 'Marie-Claire Ndayishimiye', superAgentId: 'SA-001', superAgentName: 'Alphonse Niyonzima' },
    { agentId: 'AGT-003', agentName: 'Pierre Ciza', superAgentId: 'SA-001', superAgentName: 'Alphonse Niyonzima' },
    { agentId: 'AGT-004', agentName: 'Anastasie Habimana', superAgentId: 'SA-002', superAgentName: 'Emmanuel Rwasa' },
    { agentId: 'AGT-005', agentName: 'David Mbonimpa', superAgentId: 'SA-002', superAgentName: 'Emmanuel Rwasa' },
    { agentId: 'AGT-006', agentName: 'Jacqueline Ntakirutimana', superAgentId: 'SA-002', superAgentName: 'Emmanuel Rwasa' },
    { agentId: 'AGT-007', agentName: 'Christophe Bigirimana', superAgentId: 'SA-003', superAgentName: 'Sylvie Mpundu' },
    { agentId: 'AGT-008', agentName: 'Béatrice Kamwenubusa', superAgentId: 'SA-003', superAgentName: 'Sylvie Mpundu' },
    { agentId: 'AGT-009', agentName: 'Gérard Manirakiza', superAgentId: 'SA-004', superAgentName: 'Pascal Nkurunziza' },
    { agentId: 'AGT-010', agentName: 'Odette Sindayigaya', superAgentId: 'SA-004', superAgentName: 'Pascal Nkurunziza' },
    { agentId: 'AGT-011', agentName: 'Fabien Ndikumana', superAgentId: 'SA-005', superAgentName: 'Marguerite Barancira' },
    { agentId: 'AGT-012', agentName: 'Patricia Nyabenda', superAgentId: 'SA-005', superAgentName: 'Marguerite Barancira' },
];
export var MOCK_SUPER_AGENTS = [
    { superAgentId: 'SA-001', superAgentName: 'Alphonse Niyonzima' },
    { superAgentId: 'SA-002', superAgentName: 'Emmanuel Rwasa' },
    { superAgentId: 'SA-003', superAgentName: 'Sylvie Mpundu' },
    { superAgentId: 'SA-004', superAgentName: 'Pascal Nkurunziza' },
    { superAgentId: 'SA-005', superAgentName: 'Marguerite Barancira' },
];
var sourceTypes = ['DEPOSIT', 'WITHDRAWAL', 'PAYMENT_NFC', 'TRANSFER'];
var paymentModes = ['AGENT', 'USSD', 'MOBILE_APP', 'NFC'];
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomItem(arr) {
    var idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
}
function generateTransactionRef(index) {
    var prefixes = ['TXN', 'PAY', 'DEP', 'WTH'];
    var prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    return "".concat(prefix, "-").concat(String(2024000 + index).padStart(7, '0'));
}
function formatDate(date) {
    return date.toISOString();
}
function daysAgo(days) {
    var d = new Date();
    d.setDate(d.getDate() - days);
    d.setHours(randomInt(8, 20), randomInt(0, 59), randomInt(0, 59));
    return d;
}
export function generateMockCommissions(count) {
    if (count === void 0) { count = 200; }
    var commissions = [];
    for (var i = 0; i < count; i++) {
        var agent = randomItem(MOCK_AGENTS);
        var sourceType = randomItem(sourceTypes);
        var paymentMode = randomItem(paymentModes);
        var amount = randomInt(5000, 500000);
        var rate = parseFloat((Math.random() * 1.5 + 0.25).toFixed(2));
        var commissionType = Math.random() > 0.6 ? 'SUPER_AGENT_COMMISSION' : 'AGENT_COMMISSION';
        var statusRand = Math.random();
        var status_1 = statusRand > 0.9 ? 'FAILED' : statusRand > 0.3 ? 'CREDITED' : 'PENDING';
        var createdDate = daysAgo(randomInt(0, 90));
        var creditedDate = status_1 === 'CREDITED' ? new Date(createdDate.getTime() + randomInt(1, 5) * 86400000) : null;
        commissions.push({
            commissionId: "COM-".concat(String(i + 1).padStart(4, '0')),
            transactionId: "TXN-ID-".concat(String(1000 + i)),
            transactionReference: generateTransactionRef(i),
            agentId: agent.agentId,
            agentName: agent.agentName,
            superAgentId: agent.superAgentId,
            superAgentName: agent.superAgentName,
            amount: amount,
            rate: rate,
            commissionType: commissionType,
            status: status_1,
            sourceType: sourceType,
            paymentMode: paymentMode,
            createdAt: formatDate(createdDate),
            creditedAt: creditedDate ? formatDate(creditedDate) : null,
        });
    }
    // Sort by createdAt descending
    return commissions.sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); });
}
export var MOCK_COMMISSIONS = generateMockCommissions(200);
// Pre-computed dashboard KPIs
export function computeDashboardKpis(commissions) {
    var totalCommissions = commissions.reduce(function (sum, c) { return sum + c.amount; }, 0);
    var totalPending = commissions.filter(function (c) { return c.status === 'PENDING'; }).reduce(function (sum, c) { return sum + c.amount; }, 0);
    var totalCredited = commissions.filter(function (c) { return c.status === 'CREDITED'; }).reduce(function (sum, c) { return sum + c.amount; }, 0);
    var transactionCount = commissions.length;
    var averageRate = commissions.length > 0
        ? commissions.reduce(function (sum, c) { return sum + c.rate; }, 0) / commissions.length
        : 0;
    return { totalCommissions: totalCommissions, totalPending: totalPending, totalCredited: totalCredited, transactionCount: transactionCount, averageRate: averageRate };
}
// Pre-compute data for charts
export function getCommissionTrendData(days) {
    var now = new Date();
    var labels = [];
    var agentValues = [];
    var superAgentValues = [];
    var _loop_1 = function (i) {
        var date = new Date(now);
        date.setDate(date.getDate() - i);
        var label = date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
        labels.push(label);
        var dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);
        var dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);
        var dayCommissions = MOCK_COMMISSIONS.filter(function (c) {
            var d = new Date(c.createdAt);
            return d >= dayStart && d <= dayEnd;
        });
        agentValues.push(dayCommissions.filter(function (c) { return c.commissionType === 'AGENT_COMMISSION'; }).reduce(function (s, c) { return s + c.amount; }, 0));
        superAgentValues.push(dayCommissions.filter(function (c) { return c.commissionType === 'SUPER_AGENT_COMMISSION'; }).reduce(function (s, c) { return s + c.amount; }, 0));
    };
    for (var i = days - 1; i >= 0; i--) {
        _loop_1(i);
    }
    return { labels: labels, agentValues: agentValues, superAgentValues: superAgentValues };
}
export function getCommissionTypeBreakdown() {
    var agentComms = MOCK_COMMISSIONS.filter(function (c) { return c.commissionType === 'AGENT_COMMISSION'; });
    var superAgentComms = MOCK_COMMISSIONS.filter(function (c) { return c.commissionType === 'SUPER_AGENT_COMMISSION'; });
    return [
        { type: 'AGENT_COMMISSION', amount: agentComms.reduce(function (s, c) { return s + c.amount; }, 0), count: agentComms.length },
        { type: 'SUPER_AGENT_COMMISSION', amount: superAgentComms.reduce(function (s, c) { return s + c.amount; }, 0), count: superAgentComms.length },
    ];
}
export function getCommissionStatusBreakdown() {
    var statuses = ['PENDING', 'CREDITED', 'FAILED'];
    return statuses.map(function (s) {
        var filtered = MOCK_COMMISSIONS.filter(function (c) { return c.status === s; });
        return { status: s, amount: filtered.reduce(function (sum, c) { return sum + c.amount; }, 0), count: filtered.length };
    });
}
// Generate leaderboard data
export function getAgentLeaderboard() {
    var now = new Date();
    var currentPeriodStart = new Date(now);
    currentPeriodStart.setDate(currentPeriodStart.getDate() - 30);
    var previousPeriodStart = new Date(currentPeriodStart);
    previousPeriodStart.setDate(previousPeriodStart.getDate() - 30);
    var agentMap = new Map();
    for (var _i = 0, MOCK_COMMISSIONS_1 = MOCK_COMMISSIONS; _i < MOCK_COMMISSIONS_1.length; _i++) {
        var c = MOCK_COMMISSIONS_1[_i];
        var createdDate = new Date(c.createdAt);
        if (!agentMap.has(c.agentId)) {
            agentMap.set(c.agentId, { currentTotal: 0, prevTotal: 0, count: 0, totalRate: 0 });
        }
        var entry = agentMap.get(c.agentId);
        entry.count++;
        entry.totalRate += c.rate;
        if (createdDate >= currentPeriodStart) {
            entry.currentTotal += c.amount;
        }
        else if (createdDate >= previousPeriodStart) {
            entry.prevTotal += c.amount;
        }
    }
    return Array.from(agentMap.entries())
        .map(function (_a) {
        var agentId = _a[0], data = _a[1];
        var agent = MOCK_AGENTS.find(function (a) { return a.agentId === agentId; });
        var trend = data.currentTotal > data.prevTotal ? 'up' : data.currentTotal < data.prevTotal ? 'down' : 'stable';
        return {
            agentId: agentId,
            agentName: (agent === null || agent === void 0 ? void 0 : agent.agentName) || agentId,
            totalCommissions: data.currentTotal,
            transactionCount: data.count,
            averageRate: data.count > 0 ? parseFloat((data.totalRate / data.count).toFixed(2)) : 0,
            trend: trend,
            previousPeriodTotal: data.prevTotal,
        };
    })
        .sort(function (a, b) { return b.totalCommissions - a.totalCommissions; });
}
export function getSuperAgentLeaderboard() {
    var now = new Date();
    var currentPeriodStart = new Date(now);
    currentPeriodStart.setDate(currentPeriodStart.getDate() - 30);
    var previousPeriodStart = new Date(currentPeriodStart);
    previousPeriodStart.setDate(previousPeriodStart.getDate() - 30);
    var saMap = new Map();
    for (var _i = 0, MOCK_COMMISSIONS_2 = MOCK_COMMISSIONS; _i < MOCK_COMMISSIONS_2.length; _i++) {
        var c = MOCK_COMMISSIONS_2[_i];
        // Only count SUPER_AGENT_COMMISSION for super agent leaderboard
        if (c.commissionType !== 'SUPER_AGENT_COMMISSION')
            continue;
        var createdDate = new Date(c.createdAt);
        if (!saMap.has(c.superAgentId)) {
            saMap.set(c.superAgentId, { currentTotal: 0, prevTotal: 0, count: 0, totalRate: 0 });
        }
        var entry = saMap.get(c.superAgentId);
        entry.count++;
        entry.totalRate += c.rate;
        if (createdDate >= currentPeriodStart) {
            entry.currentTotal += c.amount;
        }
        else if (createdDate >= previousPeriodStart) {
            entry.prevTotal += c.amount;
        }
    }
    // If no super agent commissions exist, create entries from agent data
    if (saMap.size === 0) {
        for (var _a = 0, MOCK_COMMISSIONS_3 = MOCK_COMMISSIONS; _a < MOCK_COMMISSIONS_3.length; _a++) {
            var c = MOCK_COMMISSIONS_3[_a];
            if (!saMap.has(c.superAgentId)) {
                saMap.set(c.superAgentId, { currentTotal: 0, prevTotal: 0, count: 0, totalRate: 0 });
            }
            var entry = saMap.get(c.superAgentId);
            entry.count++;
            entry.totalRate += c.rate;
            var createdDate = new Date(c.createdAt);
            if (createdDate >= currentPeriodStart) {
                entry.currentTotal += c.amount;
            }
            else if (createdDate >= previousPeriodStart) {
                entry.prevTotal += c.amount;
            }
        }
    }
    return Array.from(saMap.entries())
        .map(function (_a) {
        var superAgentId = _a[0], data = _a[1];
        var sa = MOCK_SUPER_AGENTS.find(function (a) { return a.superAgentId === superAgentId; });
        var trend = data.currentTotal > data.prevTotal ? 'up' : data.currentTotal < data.prevTotal ? 'down' : 'stable';
        return {
            agentId: superAgentId,
            agentName: (sa === null || sa === void 0 ? void 0 : sa.superAgentName) || superAgentId,
            totalCommissions: data.currentTotal,
            transactionCount: data.count,
            averageRate: data.count > 0 ? parseFloat((data.totalRate / data.count).toFixed(2)) : 0,
            trend: trend,
            previousPeriodTotal: data.prevTotal,
        };
    })
        .sort(function (a, b) { return b.totalCommissions - a.totalCommissions; });
}
// Get hierarchy data
export function getAgentHierarchy() {
    return MOCK_SUPER_AGENTS.map(function (sa) {
        var agents = MOCK_AGENTS.filter(function (a) { return a.superAgentId === sa.superAgentId; });
        var agentSummaries = agents.map(function (agent) {
            var commissions = MOCK_COMMISSIONS.filter(function (c) { return c.agentId === agent.agentId; });
            return {
                agentId: agent.agentId,
                agentName: agent.agentName,
                totalCommissions: commissions.reduce(function (s, c) { return s + c.amount; }, 0),
                transactionCount: commissions.length,
                commissions: commissions,
            };
        });
        var totalCommissions = agentSummaries.reduce(function (s, a) { return s + a.totalCommissions; }, 0);
        return {
            superAgentId: sa.superAgentId,
            superAgentName: sa.superAgentName,
            totalCommissions: totalCommissions,
            agents: agentSummaries,
        };
    });
}
//# sourceMappingURL=commission-mock.data.js.map