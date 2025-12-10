// Color Palette
const colors = {
    primary: '#1E3A8A',
    primaryLight: '#3B82F6',
    positive: '#10B981',
    negative: '#EF4444',
    warning: '#F97316',
    neutral: '#64748B',
    revenue: '#3B82F6',
    expense: '#F87171',
    text: '#F8FAFC',
    textSecondary: '#94A3B8'
};

const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];

// Navigation
function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    if (element) element.classList.add('active');
    setTimeout(() => initCharts(pageId), 50);
}

function initCharts(pageId) {
    if (pageId === 'page1') initPage1Charts();
    else if (pageId === 'page2') initPage2Charts();
    else if (pageId === 'page3') initPage3Charts();
    else if (pageId === 'page4') initPage4Charts();
}

// Common chart options
const chartTextStyle = { color: colors.textSecondary };
const axisLineStyle = { lineStyle: { color: '#334155' } };
const splitLineStyle = { lineStyle: { color: '#334155' } };

// ==================== PAGE 1: TỔNG QUAN TÀI CHÍNH ====================
function initPage1Charts() {
    // Chart 1.1: Stacked Bar - Cơ cấu Tài sản
    var c1 = echarts.init(document.getElementById('chart1_1'));
    c1.setOption({
        tooltip: { trigger: 'axis' },
        legend: { data: ['Tiền', 'Phải thu', 'Tồn kho', 'TSCĐ', 'TS khác'], textStyle: chartTextStyle, bottom: 0 },
        grid: { top: 30, bottom: 60, left: 50, right: 20 },
        xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'], axisLabel: chartTextStyle, axisLine: axisLineStyle },
        yAxis: { type: 'value', axisLabel: { ...chartTextStyle, formatter: '{value} Tỷ' }, splitLine: splitLineStyle },
        series: [
            { name: 'Tiền', type: 'bar', stack: 'total', data: [38, 40, 39, 42.8], itemStyle: { color: colors.primaryLight } },
            { name: 'Phải thu', type: 'bar', stack: 'total', data: [22, 25, 26, 28.3], itemStyle: { color: colors.warning } },
            { name: 'Tồn kho', type: 'bar', stack: 'total', data: [15, 16, 15, 14], itemStyle: { color: '#8B5CF6' } },
            { name: 'TSCĐ', type: 'bar', stack: 'total', data: [180, 182, 185, 188], itemStyle: { color: colors.primary } },
            { name: 'TS khác', type: 'bar', stack: 'total', data: [10, 11, 12, 12.4], itemStyle: { color: colors.neutral } }
        ]
    });

    // Chart 1.2: Stacked Bar - Cơ cấu Nguồn vốn
    var c2 = echarts.init(document.getElementById('chart1_2'));
    c2.setOption({
        tooltip: { trigger: 'axis' },
        legend: { data: ['Phải trả NB', 'Vay NH', 'Vay DH', 'Nợ khác', 'VCSH'], textStyle: chartTextStyle, bottom: 0 },
        grid: { top: 30, bottom: 60, left: 50, right: 20 },
        xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'], axisLabel: chartTextStyle, axisLine: axisLineStyle },
        yAxis: { type: 'value', axisLabel: { ...chartTextStyle, formatter: '{value} Tỷ' }, splitLine: splitLineStyle },
        series: [
            { name: 'Phải trả NB', type: 'bar', stack: 'total', data: [42, 44, 46, 45.2], itemStyle: { color: colors.negative } },
            { name: 'Vay NH', type: 'bar', stack: 'total', data: [25, 28, 30, 32], itemStyle: { color: colors.expense } },
            { name: 'Vay DH', type: 'bar', stack: 'total', data: [35, 36, 38, 40], itemStyle: { color: colors.warning } },
            { name: 'Nợ khác', type: 'bar', stack: 'total', data: [8, 7, 8, 8.2], itemStyle: { color: colors.neutral } },
            { name: 'VCSH', type: 'bar', stack: 'total', data: [155, 159, 163, 160.1], itemStyle: { color: colors.positive } }
        ]
    });

    // Chart 1.3: Donut - Tỷ trọng Tài sản
    var c3 = echarts.init(document.getElementById('chart1_3'));
    c3.setOption({
        tooltip: { trigger: 'item', formatter: '{b}: {c} Tỷ ({d}%)' },
        series: [{
            type: 'pie', radius: ['50%', '75%'], center: ['50%', '50%'],
            label: { color: colors.text, formatter: '{b}\n{d}%' },
            data: [
                { value: 99.1, name: 'TS Ngắn hạn', itemStyle: { color: colors.primaryLight } },
                { value: 186.4, name: 'TS Dài hạn', itemStyle: { color: colors.primary } }
            ]
        }]
    });

    // Chart 1.4: Donut - Tỷ trọng Nguồn vốn
    var c4 = echarts.init(document.getElementById('chart1_4'));
    c4.setOption({
        tooltip: { trigger: 'item', formatter: '{b}: {c} Tỷ ({d}%)' },
        series: [{
            type: 'pie', radius: ['50%', '75%'], center: ['50%', '50%'],
            label: { color: colors.text, formatter: '{b}\n{d}%' },
            data: [
                { value: 125.4, name: 'Nợ phải trả', itemStyle: { color: colors.negative } },
                { value: 160.1, name: 'Vốn CSH', itemStyle: { color: colors.positive } }
            ]
        }]
    });

    // Gauge Charts
    createGauge('gauge1_1', 1.72, 2.5, 1.5, 'Current Ratio');
    createGauge('gauge1_2', 1.25, 2, 1.0, 'Quick Ratio');
    createGauge('gauge1_3', 0.78, 3, 2.0, 'D/E Ratio', true);

    // Chart 1.5: Line - Xu hướng Tài sản & Nợ
    var c5 = echarts.init(document.getElementById('chart1_5'));
    c5.setOption({
        tooltip: { trigger: 'axis' },
        legend: { data: ['Tổng Tài sản', 'Tổng Nợ', 'Vốn CSH'], textStyle: chartTextStyle, bottom: 0 },
        grid: { top: 40, bottom: 60, left: 60, right: 30 },
        xAxis: { type: 'category', data: months, axisLabel: chartTextStyle, axisLine: axisLineStyle },
        yAxis: { type: 'value', name: 'Tỷ VNĐ', nameTextStyle: chartTextStyle, axisLabel: chartTextStyle, splitLine: splitLineStyle },
        series: [
            { name: 'Tổng Tài sản', type: 'line', smooth: true, data: [265, 268, 270, 274, 276, 278, 280, 282, 283, 284, 285, 285.5], lineStyle: { width: 3 }, itemStyle: { color: colors.primaryLight }, areaStyle: { opacity: 0.1 } },
            { name: 'Tổng Nợ', type: 'line', smooth: true, data: [118, 119, 120, 121, 122, 123, 123, 124, 124, 125, 125, 125.4], lineStyle: { width: 3 }, itemStyle: { color: colors.negative } },
            { name: 'Vốn CSH', type: 'line', smooth: true, data: [147, 149, 150, 153, 154, 155, 157, 158, 159, 159, 160, 160.1], lineStyle: { width: 3 }, itemStyle: { color: colors.positive } }
        ]
    });
}

function createGauge(id, value, max, threshold, title, inverse = false) {
    var g = echarts.init(document.getElementById(id));
    let color = inverse ? (value <= threshold ? colors.positive : colors.negative) : (value >= threshold ? colors.positive : colors.negative);
    g.setOption({
        series: [{
            type: 'gauge', startAngle: 200, endAngle: -20, min: 0, max: max,
            progress: { show: true, width: 20, itemStyle: { color: color } },
            axisLine: { lineStyle: { width: 20, color: [[1, '#334155']] } },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            pointer: { show: false },
            anchor: { show: false },
            detail: { offsetCenter: [0, '30%'], formatter: value.toFixed(2), fontSize: 28, fontWeight: 'bold', color: color },
            data: [{ value: value }]
        }]
    });
}

// ==================== PAGE 2: KẾT QUẢ KINH DOANH ====================
function initPage2Charts() {
    // Chart 2.1: Waterfall P&L
    var c1 = echarts.init(document.getElementById('chart2_1'));
    c1.setOption({
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { top: 30, bottom: 80, left: 60, right: 30 },
        xAxis: {
            type: 'category', data: ['Doanh thu', 'Giảm trừ', 'DT thuần', 'Giá vốn', 'LN Gộp', 'CP Bán hàng', 'CP QLDN', 'LN HĐ', 'Chi phí TC', 'Thu nhập khác', 'LN trước thuế', 'Thuế', 'LN sau thuế'],
            axisLabel: { ...chartTextStyle, rotate: 30, interval: 0 }, axisLine: axisLineStyle
        },
        yAxis: { type: 'value', axisLabel: { ...chartTextStyle, formatter: '{value}' }, splitLine: splitLineStyle },
        series: [
            {
                name: 'Placeholder', type: 'bar', stack: 'a', itemStyle: { color: 'transparent' },
                data: [0, 50, 0, 48.5, 0, 14.5, 11.5, 0, 9, 7.5, 0, 8.5, 0]
            },
            {
                name: 'Positive', type: 'bar', stack: 'a', itemStyle: { color: colors.positive },
                data: [50, '-', 48.5, '-', 14.5, '-', '-', 9, '-', 1.5, 8.5, '-', 6.8], label: { show: true, position: 'top', color: colors.text, formatter: p => p.value !== '-' ? p.value + ' Tỷ' : '' }
            },
            {
                name: 'Negative', type: 'bar', stack: 'a', itemStyle: { color: colors.negative },
                data: ['-', 1.5, '-', 34, '-', 3, 2.5, '-', 1.5, '-', '-', 1.7, '-'], label: { show: true, position: 'bottom', color: colors.text, formatter: p => p.value !== '-' ? '-' + p.value : '' }
            },
            {
                name: 'Total', type: 'bar', stack: 'a', itemStyle: { color: colors.primary },
                data: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
            }
        ]
    });

    // Chart 2.2: Stacked Column - DT theo Dịch vụ
    var c2 = echarts.init(document.getElementById('chart2_2'));
    c2.setOption({
        tooltip: { trigger: 'axis' },
        legend: { data: ['Container 20\'', 'Container 40\'', 'Vận tải', 'Khác'], textStyle: chartTextStyle, bottom: 0 },
        grid: { top: 30, bottom: 60, left: 50, right: 20 },
        xAxis: { type: 'category', data: months, axisLabel: chartTextStyle, axisLine: axisLineStyle },
        yAxis: { type: 'value', axisLabel: chartTextStyle, splitLine: splitLineStyle },
        series: [
            { name: 'Container 20\'', type: 'bar', stack: 'a', data: [12, 13, 14, 13, 14, 15, 14, 16, 15, 14, 15, 15.2], itemStyle: { color: '#3B82F6' } },
            { name: 'Container 40\'', type: 'bar', stack: 'a', data: [15, 16, 17, 16, 17, 18, 17, 19, 18, 17, 18, 18.5], itemStyle: { color: '#0EA5E9' } },
            { name: 'Vận tải', type: 'bar', stack: 'a', data: [9, 9, 10, 9, 10, 10, 10, 11, 10, 10, 10, 10.8], itemStyle: { color: '#8B5CF6' } },
            { name: 'Khác', type: 'bar', stack: 'a', data: [3, 3, 4, 3, 4, 4, 4, 4, 4, 4, 4, 4], itemStyle: { color: colors.neutral } }
        ]
    });

    // Chart 2.3: Combo - Thực hiện vs Kế hoạch
    var c3 = echarts.init(document.getElementById('chart2_3'));
    c3.setOption({
        tooltip: { trigger: 'axis' },
        legend: { data: ['Thực tế', 'Kế hoạch'], textStyle: chartTextStyle, bottom: 0 },
        grid: { top: 30, bottom: 60, left: 50, right: 20 },
        xAxis: { type: 'category', data: months, axisLabel: chartTextStyle, axisLine: axisLineStyle },
        yAxis: { type: 'value', name: 'Tỷ VNĐ', nameTextStyle: chartTextStyle, axisLabel: chartTextStyle, splitLine: splitLineStyle },
        series: [
            { name: 'Thực tế', type: 'bar', data: [39, 41, 45, 41, 45, 47, 45, 50, 47, 45, 47, 48.5], itemStyle: { color: colors.primaryLight } },
            { name: 'Kế hoạch', type: 'line', data: [40, 40, 42, 42, 45, 45, 45, 48, 48, 48, 48, 47.7], lineStyle: { width: 3, type: 'dashed' }, itemStyle: { color: colors.warning } }
        ]
    });

    // Chart 2.4: Treemap - Cơ cấu Chi phí
    var c4 = echarts.init(document.getElementById('chart2_4'));
    c4.setOption({
        tooltip: {},
        series: [{
            type: 'treemap', roam: false, nodeClick: false,
            breadcrumb: { show: false },
            label: { show: true, formatter: '{b}\n{c} Tỷ', color: '#fff', fontSize: 11 },
            data: [
                {
                    name: 'Giá vốn', value: 34, itemStyle: { color: colors.negative },
                    children: [
                        { name: 'Nhân công', value: 12, itemStyle: { color: '#DC2626' } },
                        { name: 'Nhiên liệu', value: 8, itemStyle: { color: '#EF4444' } },
                        { name: 'Thuê ngoài', value: 10, itemStyle: { color: '#F87171' } },
                        { name: 'Khấu hao', value: 4, itemStyle: { color: '#FCA5A5' } }
                    ]
                },
                { name: 'CP Bán hàng', value: 3, itemStyle: { color: colors.warning } },
                {
                    name: 'CP QLDN', value: 2.5, itemStyle: { color: colors.neutral },
                    children: [
                        { name: 'Lương QL', value: 1.2 },
                        { name: 'Điện nước', value: 0.8 },
                        { name: 'Khác', value: 0.5 }
                    ]
                },
                { name: 'CP Tài chính', value: 1.5, itemStyle: { color: colors.primary } }
            ]
        }]
    });

    // Chart 2.5: Horizontal Bar - Top 10 Chi phí
    var c5 = echarts.init(document.getElementById('chart2_5'));
    c5.setOption({
        tooltip: { trigger: 'axis' },
        grid: { top: 10, bottom: 20, left: 120, right: 60 },
        xAxis: { type: 'value', axisLabel: { ...chartTextStyle, formatter: '{value} Tỷ' }, splitLine: splitLineStyle },
        yAxis: { type: 'category', data: ['Khác', 'Điện nước', 'Lương QL', 'Khấu hao', 'CP Bán hàng', 'CP Tài chính', 'Nhiên liệu', 'Thuê ngoài', 'Nhân công'].reverse(), axisLabel: chartTextStyle, axisLine: axisLineStyle },
        series: [{
            type: 'bar', data: [12, 10, 8, 4, 3, 2.5, 1.5, 1.2, 0.8].reverse(),
            itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: colors.negative }, { offset: 1, color: colors.warning }]) },
            label: { show: true, position: 'right', formatter: '{c} Tỷ', color: colors.text }
        }]
    });

    // Chart 2.6: Line - Xu hướng Chi phí
    var c6 = echarts.init(document.getElementById('chart2_6'));
    c6.setOption({
        tooltip: { trigger: 'axis' },
        legend: { data: ['Giá vốn', 'CP Bán hàng', 'CP QLDN', 'CP Tài chính'], textStyle: chartTextStyle, bottom: 0 },
        grid: { top: 30, bottom: 60, left: 50, right: 20 },
        xAxis: { type: 'category', data: months, axisLabel: chartTextStyle, axisLine: axisLineStyle },
        yAxis: { type: 'value', axisLabel: chartTextStyle, splitLine: splitLineStyle },
        series: [
            { name: 'Giá vốn', type: 'line', smooth: true, data: [28, 29, 31, 29, 32, 33, 31, 35, 33, 31, 33, 34], itemStyle: { color: colors.negative } },
            { name: 'CP Bán hàng', type: 'line', smooth: true, data: [2.5, 2.6, 2.8, 2.6, 2.8, 2.9, 2.8, 3.1, 2.9, 2.8, 2.9, 3], itemStyle: { color: colors.warning } },
            { name: 'CP QLDN', type: 'line', smooth: true, data: [2.2, 2.3, 2.4, 2.3, 2.4, 2.5, 2.4, 2.6, 2.5, 2.4, 2.5, 2.5], itemStyle: { color: colors.neutral } },
            { name: 'CP Tài chính', type: 'line', smooth: true, data: [1.2, 1.3, 1.4, 1.3, 1.4, 1.5, 1.4, 1.6, 1.5, 1.4, 1.5, 1.5], itemStyle: { color: colors.primary } }
        ]
    });

    // Chart 2.7: Combo - Margin %
    var c7 = echarts.init(document.getElementById('chart2_7'));
    c7.setOption({
        tooltip: { trigger: 'axis' },
        legend: { data: ['Doanh thu', 'Gross Margin %', 'Operating Margin %', 'Net Margin %'], textStyle: chartTextStyle, bottom: 0 },
        grid: { top: 40, bottom: 60, left: 60, right: 60 },
        xAxis: { type: 'category', data: months, axisLabel: chartTextStyle, axisLine: axisLineStyle },
        yAxis: [
            { type: 'value', name: 'Tỷ VNĐ', nameTextStyle: chartTextStyle, axisLabel: chartTextStyle, splitLine: splitLineStyle },
            { type: 'value', name: '%', nameTextStyle: chartTextStyle, axisLabel: { ...chartTextStyle, formatter: '{value}%' }, max: 35, splitLine: { show: false } }
        ],
        series: [
            { name: 'Doanh thu', type: 'bar', data: [39, 41, 45, 41, 45, 47, 45, 50, 47, 45, 47, 48.5], itemStyle: { color: colors.primaryLight }, opacity: 0.6 },
            { name: 'Gross Margin %', type: 'line', yAxisIndex: 1, data: [28, 28.5, 29, 28.2, 29, 29.5, 28.8, 30, 29.5, 29, 29.5, 29.9], itemStyle: { color: colors.positive }, lineStyle: { width: 2 } },
            { name: 'Operating Margin %', type: 'line', yAxisIndex: 1, data: [17, 17.2, 17.8, 17, 17.5, 18, 17.5, 18.5, 18, 17.5, 18, 18.5], itemStyle: { color: colors.warning }, lineStyle: { width: 2 } },
            { name: 'Net Margin %', type: 'line', yAxisIndex: 1, data: [12.5, 12.8, 13.2, 12.5, 13, 13.5, 13, 14, 13.5, 13, 13.5, 14], itemStyle: { color: colors.primaryLight }, lineStyle: { width: 2 } }
        ]
    });
}

// ==================== PAGE 3: LƯU CHUYỂN TIỀN TỆ ====================
function initPage3Charts() {
    // Chart 3.1: Waterfall Cash Flow
    var c1 = echarts.init(document.getElementById('chart3_1'));
    c1.setOption({
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { top: 30, bottom: 80, left: 60, right: 30 },
        xAxis: {
            type: 'category', data: ['Tồn đầu', 'Thu DV', 'Thu PT cũ', 'Thu khác', 'Chi NCC', 'Chi Lương', 'Chi VH', 'Chi khác', 'Chi ĐT', 'Vay NH', 'Trả nợ', 'Tồn cuối'],
            axisLabel: { ...chartTextStyle, rotate: 30, interval: 0 }, axisLine: axisLineStyle
        },
        yAxis: { type: 'value', axisLabel: { ...chartTextStyle, formatter: '{value}' }, splitLine: splitLineStyle },
        series: [
            {
                name: 'Base', type: 'bar', stack: 'a', itemStyle: { color: 'transparent' },
                data: [0, 38.5, 68.5, 83.5, 90.8, 78.3, 72.3, 62.3, 57.3, 52.3, 57.3, 0]
            },
            {
                name: 'Thu', type: 'bar', stack: 'a', itemStyle: { color: colors.positive },
                data: [38.5, 30, 15, 7.3, '-', '-', '-', '-', '-', 5, '-', 42.8], label: { show: true, position: 'top', color: colors.text, fontSize: 10 }
            },
            {
                name: 'Chi', type: 'bar', stack: 'a', itemStyle: { color: colors.negative },
                data: ['-', '-', '-', '-', 12.5, 6, 10, 5, 5, '-', 4.5, '-'], label: { show: true, position: 'bottom', color: colors.text, fontSize: 10 }
            }
        ]
    });

    // Chart 3.2: Bar - Top 10 Khoản Thu
    var c2 = echarts.init(document.getElementById('chart3_2'));
    c2.setOption({
        tooltip: { trigger: 'axis' },
        grid: { top: 10, bottom: 20, left: 140, right: 60 },
        xAxis: { type: 'value', axisLabel: chartTextStyle, splitLine: splitLineStyle },
        yAxis: { type: 'category', data: ['Thu khác', 'Thu PT KH C', 'Thu PT KH B', 'Thu PT KH A', 'DV Kho bãi', 'DV Vận tải', 'DV Container 20\'', 'DV Container 40\''].reverse(), axisLabel: chartTextStyle, axisLine: axisLineStyle },
        series: [{
            type: 'bar', data: [18.5, 12.0, 8.5, 5.5, 3.2, 2.0, 1.5, 1.1].reverse(),
            itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: colors.positive }, { offset: 1, color: '#34D399' }]) },
            label: { show: true, position: 'right', formatter: '{c} Tỷ', color: colors.text }
        }]
    });

    // Chart 3.3: Bar - Top 10 Khoản Chi
    var c3 = echarts.init(document.getElementById('chart3_3'));
    c3.setOption({
        tooltip: { trigger: 'axis' },
        grid: { top: 10, bottom: 20, left: 140, right: 60 },
        xAxis: { type: 'value', axisLabel: chartTextStyle, splitLine: splitLineStyle },
        yAxis: { type: 'category', data: ['Chi khác', 'Kiểm định TB', 'Phí cầu bến', 'Trả nợ gốc', 'Tiền điện', 'Chi phí HĐ', 'Thanh toán lương', 'Thuê xe đầu kéo', 'Thuê sà lan'].reverse(), axisLabel: chartTextStyle, axisLine: axisLineStyle },
        series: [{
            type: 'bar', data: [12.5, 8.2, 6.0, 5.0, 4.5, 3.2, 2.8, 2.5, 3.3].reverse(),
            itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: colors.negative }, { offset: 1, color: colors.warning }]) },
            label: { show: true, position: 'right', formatter: '{c} Tỷ', color: colors.text }
        }]
    });

    // Chart 3.4: Area - Xu hướng Tiền tồn
    var c4 = echarts.init(document.getElementById('chart3_4'));
    c4.setOption({
        tooltip: { trigger: 'axis' },
        legend: { data: ['Tiền gửi', 'Tiền mặt', 'Ngưỡng tối thiểu'], textStyle: chartTextStyle, bottom: 0 },
        grid: { top: 30, bottom: 60, left: 50, right: 20 },
        xAxis: { type: 'category', data: months, axisLabel: chartTextStyle, axisLine: axisLineStyle },
        yAxis: { type: 'value', axisLabel: chartTextStyle, splitLine: splitLineStyle },
        series: [
            { name: 'Tiền gửi', type: 'line', stack: 'cash', areaStyle: { opacity: 0.6 }, smooth: true, data: [30, 31, 32, 31, 33, 34, 32, 36, 35, 34, 36, 36.4], itemStyle: { color: colors.primaryLight } },
            { name: 'Tiền mặt', type: 'line', stack: 'cash', areaStyle: { opacity: 0.6 }, smooth: true, data: [5, 5.2, 5.5, 5.3, 5.8, 6, 5.5, 6.2, 6, 5.8, 6.2, 6.4], itemStyle: { color: colors.warning } },
            { name: 'Ngưỡng tối thiểu', type: 'line', data: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25], lineStyle: { type: 'dashed', color: colors.negative }, itemStyle: { color: colors.negative } }
        ]
    });

    // Chart 3.5: Column - Thu vs Chi
    var c5 = echarts.init(document.getElementById('chart3_5'));
    c5.setOption({
        tooltip: { trigger: 'axis' },
        legend: { data: ['Thu', 'Chi', 'Net Cash Flow'], textStyle: chartTextStyle, bottom: 0 },
        grid: { top: 30, bottom: 60, left: 50, right: 50 },
        xAxis: { type: 'category', data: months, axisLabel: chartTextStyle, axisLine: axisLineStyle },
        yAxis: [
            { type: 'value', axisLabel: chartTextStyle, splitLine: splitLineStyle },
            { type: 'value', axisLabel: chartTextStyle, splitLine: { show: false } }
        ],
        series: [
            { name: 'Thu', type: 'bar', data: [42, 44, 48, 44, 50, 52, 48, 55, 52, 50, 52, 52.3], itemStyle: { color: colors.positive } },
            { name: 'Chi', type: 'bar', data: [40, 42, 45, 43, 47, 49, 46, 52, 49, 48, 50, 48], itemStyle: { color: colors.negative } },
            { name: 'Net Cash Flow', type: 'line', yAxisIndex: 1, data: [2, 2, 3, 1, 3, 3, 2, 3, 3, 2, 2, 4.3], lineStyle: { width: 3 }, itemStyle: { color: colors.warning } }
        ]
    });
}

// ==================== PAGE 4: PHÂN TÍCH CÔNG NỢ ====================
function initPage4Charts() {
    // Chart 4.1: Combo - Phải thu vs Phải trả
    var c1 = echarts.init(document.getElementById('chart4_1'));
    c1.setOption({
        tooltip: { trigger: 'axis' },
        legend: { data: ['Phải thu', 'Phải trả', 'Net Position'], textStyle: chartTextStyle, bottom: 0 },
        grid: { top: 40, bottom: 60, left: 60, right: 60 },
        xAxis: { type: 'category', data: months, axisLabel: chartTextStyle, axisLine: axisLineStyle },
        yAxis: [
            { type: 'value', name: 'Tỷ VNĐ', nameTextStyle: chartTextStyle, axisLabel: chartTextStyle, splitLine: splitLineStyle },
            { type: 'value', axisLabel: chartTextStyle, splitLine: { show: false } }
        ],
        series: [
            { name: 'Phải thu', type: 'bar', data: [22, 23, 24, 23, 25, 26, 25, 27, 26, 26, 27, 28.3], itemStyle: { color: colors.primaryLight } },
            { name: 'Phải trả', type: 'bar', data: [42, 43, 44, 43, 45, 46, 45, 47, 46, 46, 46, 45.2], itemStyle: { color: colors.negative } },
            { name: 'Net Position', type: 'line', yAxisIndex: 1, data: [-20, -20, -20, -20, -20, -20, -20, -20, -20, -20, -19, -16.9], lineStyle: { width: 3 }, itemStyle: { color: colors.warning } }
        ]
    });

    // Chart 4.2: Bar - Top 10 KH Nợ
    var c2 = echarts.init(document.getElementById('chart4_2'));
    c2.setOption({
        tooltip: { trigger: 'axis' },
        grid: { top: 10, bottom: 20, left: 100, right: 60 },
        xAxis: { type: 'value', axisLabel: chartTextStyle, splitLine: splitLineStyle },
        yAxis: { type: 'category', data: ['KH J', 'KH I', 'KH H', 'KH G', 'KH F', 'KH E', 'KH D', 'KH C', 'KH B', 'KH A'], axisLabel: chartTextStyle, axisLine: axisLineStyle },
        series: [{
            type: 'bar',
            data: [
                { value: 0.8, itemStyle: { color: colors.positive } },
                { value: 1.2, itemStyle: { color: colors.positive } },
                { value: 1.5, itemStyle: { color: colors.positive } },
                { value: 1.8, itemStyle: { color: colors.warning } },
                { value: 2.2, itemStyle: { color: colors.warning } },
                { value: 2.8, itemStyle: { color: colors.warning } },
                { value: 3.2, itemStyle: { color: colors.negative } },
                { value: 4.0, itemStyle: { color: colors.negative } },
                { value: 4.8, itemStyle: { color: colors.negative } },
                { value: 6.0, itemStyle: { color: colors.negative } }
            ],
            label: { show: true, position: 'right', formatter: '{c} Tỷ', color: colors.text }
        }]
    });

    // Chart 4.3: Donut - Cơ cấu Phải thu
    var c3 = echarts.init(document.getElementById('chart4_3'));
    c3.setOption({
        tooltip: { trigger: 'item', formatter: '{b}: {c} Tỷ ({d}%)' },
        legend: { orient: 'vertical', left: 'left', textStyle: chartTextStyle },
        series: [{
            type: 'pie', radius: ['40%', '70%'], center: ['60%', '50%'],
            label: { color: colors.text, formatter: '{d}%' },
            data: [
                { value: 18.5, name: 'Trong hạn', itemStyle: { color: colors.positive } },
                { value: 5.2, name: '1-30 ngày', itemStyle: { color: '#FCD34D' } },
                { value: 2.8, name: '31-60 ngày', itemStyle: { color: colors.warning } },
                { value: 1.8, name: '>60 ngày', itemStyle: { color: colors.negative } }
            ]
        }]
    });

    // Chart 4.4: Treemap - Phải trả theo Nhóm
    var c4 = echarts.init(document.getElementById('chart4_4'));
    c4.setOption({
        tooltip: {},
        series: [{
            type: 'treemap', roam: false, nodeClick: false,
            breadcrumb: { show: false },
            label: { show: true, formatter: '{b}\n{c} Tỷ', color: '#fff', fontSize: 11 },
            data: [
                {
                    name: 'Vận hành', value: 23.5, itemStyle: { color: colors.negative },
                    children: [
                        { name: 'Sà lan', value: 12.5 },
                        { name: 'Xe đầu kéo', value: 8.2 },
                        { name: 'Phí cầu bến', value: 2.8 }
                    ]
                },
                { name: 'Nhân sự', value: 6.5, itemStyle: { color: colors.warning } },
                {
                    name: 'Cố định', value: 5.2, itemStyle: { color: colors.primaryLight },
                    children: [
                        { name: 'Tiền điện', value: 3.2 },
                        { name: 'Bảo vệ', value: 2.0 }
                    ]
                },
                { name: 'Bảo trì', value: 5.0, itemStyle: { color: colors.neutral } },
                { name: 'Đầu tư', value: 5.0, itemStyle: { color: colors.positive } }
            ]
        }]
    });

    // Chart 4.5: Bar - Top 15 Phải trả
    var c5 = echarts.init(document.getElementById('chart4_5'));
    c5.setOption({
        tooltip: { trigger: 'axis' },
        grid: { top: 10, bottom: 20, left: 140, right: 60 },
        xAxis: { type: 'value', axisLabel: chartTextStyle, splitLine: splitLineStyle },
        yAxis: { type: 'category', data: ['Chi khác', 'Bảo vệ', 'Sửa chữa', 'Phí cầu bến', 'Tiền điện', 'TC Cảng', 'Lương', 'Xe đầu kéo', 'Sà lan'].reverse(), axisLabel: chartTextStyle, axisLine: axisLineStyle },
        series: [{
            type: 'bar', data: [12.5, 8.2, 6.5, 4.5, 3.2, 2.8, 2.5, 2.0, 3.0].reverse(),
            itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: colors.negative }, { offset: 1, color: colors.warning }]) },
            label: { show: true, position: 'right', formatter: '{c} Tỷ', color: colors.text }
        }]
    });

    // Chart 4.6: Stacked Bar - Aging Phải thu
    var c6 = echarts.init(document.getElementById('chart4_6'));
    c6.setOption({
        tooltip: { trigger: 'axis' },
        legend: { data: ['0-30 ngày', '31-60 ngày', '61-90 ngày', '>90 ngày'], textStyle: chartTextStyle, bottom: 0 },
        grid: { top: 30, bottom: 60, left: 50, right: 20 },
        xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'], axisLabel: chartTextStyle, axisLine: axisLineStyle },
        yAxis: { type: 'value', axisLabel: chartTextStyle, splitLine: splitLineStyle },
        series: [
            { name: '0-30 ngày', type: 'bar', stack: 'a', data: [15, 16, 17, 18.5], itemStyle: { color: colors.positive } },
            { name: '31-60 ngày', type: 'bar', stack: 'a', data: [4, 4.5, 5, 5.2], itemStyle: { color: '#FCD34D' } },
            { name: '61-90 ngày', type: 'bar', stack: 'a', data: [2, 2.2, 2.5, 2.8], itemStyle: { color: colors.warning } },
            { name: '>90 ngày', type: 'bar', stack: 'a', data: [1, 1.3, 1.5, 1.8], itemStyle: { color: colors.negative } }
        ]
    });

    // Chart 4.7: Stacked Bar - Aging Phải trả
    var c7 = echarts.init(document.getElementById('chart4_7'));
    c7.setOption({
        tooltip: { trigger: 'axis' },
        legend: { data: ['0-30 ngày', '31-60 ngày', '61-90 ngày', '>90 ngày'], textStyle: chartTextStyle, bottom: 0 },
        grid: { top: 30, bottom: 60, left: 50, right: 20 },
        xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'], axisLabel: chartTextStyle, axisLine: axisLineStyle },
        yAxis: { type: 'value', axisLabel: chartTextStyle, splitLine: splitLineStyle },
        series: [
            { name: '0-30 ngày', type: 'bar', stack: 'a', data: [26, 27, 28, 28.5], itemStyle: { color: colors.positive } },
            { name: '31-60 ngày', type: 'bar', stack: 'a', data: [7, 7.5, 8, 8.2], itemStyle: { color: '#FCD34D' } },
            { name: '61-90 ngày', type: 'bar', stack: 'a', data: [4, 4.5, 4.8, 5], itemStyle: { color: colors.warning } },
            { name: '>90 ngày', type: 'bar', stack: 'a', data: [3, 3.2, 3.4, 3.5], itemStyle: { color: colors.negative } }
        ]
    });
}

// Initialize on load
window.addEventListener('load', function () {
    initPage1Charts();
});

// Resize handler
window.addEventListener('resize', function () {
    document.querySelectorAll('.chart-container').forEach(function (el) {
        var chart = echarts.getInstanceByDom(el);
        if (chart) chart.resize();
    });
});
