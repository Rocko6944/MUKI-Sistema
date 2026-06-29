document.addEventListener('DOMContentLoaded', () => {
  const CLIENTS_STORAGE_KEY = 'muki_clientes_registrados';
  const MENU_STORAGE_KEY = 'muki_carta_landing';
  const menuCategories = ['Platos', 'Bebidas'];
  const defaultMenuItems = [
    { id: 'menu-001', categoria: 'Platos', nombre: 'Ceviche a lo Muki', precio: 45, fotografia: 'Images/logoSinFondo.png', descripcion: 'Pesca fresca, leche de tigre de la casa, camote y cancha.' },
    { id: 'menu-002', categoria: 'Platos', nombre: 'Lomo Saltado', precio: 39, fotografia: 'Images/logoSinFondo.png', descripcion: 'Lomo salteado al wok con papas doradas y arroz.' },
    { id: 'menu-003', categoria: 'Platos', nombre: 'Chaufa a lo Muki', precio: 38, fotografia: 'Images/logoSinFondo.png', descripcion: 'Arroz chaufa con toque de la casa y verduras salteadas.' },
    { id: 'menu-004', categoria: 'Bebidas', nombre: 'Pisco Sour', precio: 23, fotografia: 'Images/logoSinFondo.png', descripcion: 'Coctel clasico preparado al momento.' },
    { id: 'menu-005', categoria: 'Bebidas', nombre: 'Chicha morada', precio: 8, fotografia: 'Images/logoSinFondo.png', descripcion: 'Refresco natural de maiz morado y especias.' }
  ];
  const salesTransactions = [
    { ventaId: 'V001', fecha: '2026-04-10', producto: 'Ceviche a lo Muki', categoria: 'Plato', tipo: 'plato', cantidad: 2, total: 90, metodoPago: 'Efectivo', mozo: 'Juan Perez' },
    { ventaId: 'V001', fecha: '2026-04-10', producto: 'Pisco Sour', categoria: 'Bebida', tipo: 'bebida', cantidad: 3, total: 45, metodoPago: 'Efectivo', mozo: 'Juan Perez' },
    { ventaId: 'V002', fecha: '2026-04-10', producto: 'Lomo Saltado', categoria: 'Plato', tipo: 'plato', cantidad: 2, total: 78, metodoPago: 'Tarjeta', mozo: 'Camila Rojas' },
    { ventaId: 'V003', fecha: '2026-04-11', producto: 'Aji de Gallina', categoria: 'Plato', tipo: 'plato', cantidad: 2, total: 60, metodoPago: 'Yape / Plin', mozo: 'Camila Rojas' },
    { ventaId: 'V004', fecha: '2026-04-11', producto: 'Chicha morada', categoria: 'Bebida', tipo: 'bebida', cantidad: 4, total: 32, metodoPago: 'Efectivo', mozo: 'Juan Perez' },
    { ventaId: 'V005', fecha: '2026-04-12', producto: 'Chaufa a lo Muki', categoria: 'Plato', tipo: 'plato', cantidad: 3, total: 114, metodoPago: 'Tarjeta', mozo: 'Pablo Gomez' },
    { ventaId: 'V006', fecha: '2026-04-12', producto: 'Limonada de hierbabuena', categoria: 'Bebida', tipo: 'bebida', cantidad: 3, total: 30, metodoPago: 'Yape / Plin', mozo: 'Pablo Gomez' },
    { ventaId: 'V007', fecha: '2026-04-13', producto: 'Ceviche a lo Muki', categoria: 'Plato', tipo: 'plato', cantidad: 4, total: 180, metodoPago: 'Efectivo', mozo: 'Juan Perez' },
    { ventaId: 'V008', fecha: '2026-04-13', producto: 'Pisco Sour', categoria: 'Bebida', tipo: 'bebida', cantidad: 5, total: 75, metodoPago: 'Tarjeta', mozo: 'Camila Rojas' },
    { ventaId: 'V009', fecha: '2026-04-14', producto: 'Pulpo a la parrilla', categoria: 'Plato', tipo: 'plato', cantidad: 2, total: 116, metodoPago: 'Transferencia', mozo: 'Pablo Gomez' },
    { ventaId: 'V010', fecha: '2026-04-14', producto: 'Cafe pasado', categoria: 'Bebida', tipo: 'bebida', cantidad: 6, total: 54, metodoPago: 'Yape / Plin', mozo: 'Pablo Gomez' },
    { ventaId: 'V011', fecha: '2026-04-15', producto: 'Lomo Saltado', categoria: 'Plato', tipo: 'plato', cantidad: 3, total: 117, metodoPago: 'Efectivo', mozo: 'Juan Perez' },
    { ventaId: 'V012', fecha: '2026-04-15', producto: 'Arroz con mariscos', categoria: 'Plato', tipo: 'plato', cantidad: 2, total: 84, metodoPago: 'Tarjeta', mozo: 'Camila Rojas' },
    { ventaId: 'V013', fecha: '2026-04-16', producto: 'Ceviche a lo Muki', categoria: 'Plato', tipo: 'plato', cantidad: 3, total: 135, metodoPago: 'Yape / Plin', mozo: 'Camila Rojas' },
    { ventaId: 'V013', fecha: '2026-04-16', producto: 'Pisco Sour', categoria: 'Bebida', tipo: 'bebida', cantidad: 2, total: 30, metodoPago: 'Yape / Plin', mozo: 'Camila Rojas' }
  ];
  const cashMovements = [
    { id: 'C001', fecha: '2026-04-10', tipo: 'Venta', metodo: 'Efectivo', monto: 135, turno: 'Manana', usuario: 'Cajero 1' },
    { id: 'C002', fecha: '2026-04-10', tipo: 'Egreso', metodo: 'Efectivo', monto: 20, turno: 'Manana', usuario: 'Cajero 1' },
    { id: 'C003', fecha: '2026-04-11', tipo: 'Venta', metodo: 'Tarjeta', monto: 60, turno: 'Tarde', usuario: 'Cajero 2' },
    { id: 'C004', fecha: '2026-04-11', tipo: 'Ingreso', metodo: 'Yape / Plin', monto: 100, turno: 'Tarde', usuario: 'Cajero 2' },
    { id: 'C005', fecha: '2026-04-12', tipo: 'Venta', metodo: 'Tarjeta', monto: 144, turno: 'Noche', usuario: 'Cajero 3' },
    { id: 'C006', fecha: '2026-04-12', tipo: 'Egreso', metodo: 'Efectivo', monto: 35, turno: 'Noche', usuario: 'Cajero 3' },
    { id: 'C007', fecha: '2026-04-13', tipo: 'Venta', metodo: 'Efectivo', monto: 255, turno: 'Manana', usuario: 'Cajero 1' },
    { id: 'C008', fecha: '2026-04-13', tipo: 'Ingreso', metodo: 'Transferencia', monto: 80, turno: 'Manana', usuario: 'Cajero 1' },
    { id: 'C009', fecha: '2026-04-14', tipo: 'Venta', metodo: 'Transferencia', monto: 170, turno: 'Tarde', usuario: 'Cajero 2' },
    { id: 'C010', fecha: '2026-04-14', tipo: 'Egreso', metodo: 'Efectivo', monto: 45, turno: 'Tarde', usuario: 'Cajero 2' },
    { id: 'C011', fecha: '2026-04-15', tipo: 'Venta', metodo: 'Efectivo', monto: 117, turno: 'Noche', usuario: 'Cajero 3' },
    { id: 'C012', fecha: '2026-04-15', tipo: 'Ingreso', metodo: 'Yape / Plin', monto: 60, turno: 'Noche', usuario: 'Cajero 3' },
    { id: 'C013', fecha: '2026-04-16', tipo: 'Venta', metodo: 'Yape / Plin', monto: 165, turno: 'Manana', usuario: 'Cajero 1' },
    { id: 'C014', fecha: '2026-04-16', tipo: 'Egreso', metodo: 'Efectivo', monto: 25, turno: 'Manana', usuario: 'Cajero 1' }
  ];
  const inventoryItems = [
    { id: 'I001', insumo: 'Tomate', categoria: 'Verduras', stockActual: 15, unidad: 'kg', stockMinimo: 5, consumo: 10, unidadConsumo: 'kg', estado: 'Normal' },
    { id: 'I002', insumo: 'Pollo', categoria: 'Carnes', stockActual: 3, unidad: 'kg', stockMinimo: 5, consumo: 12, unidadConsumo: 'kg', estado: 'Bajo stock' },
    { id: 'I003', insumo: 'Aceite vegetal', categoria: 'Secos', stockActual: 0, unidad: 'L', stockMinimo: 2, consumo: 8, unidadConsumo: 'L', estado: 'Sin stock' },
    { id: 'I004', insumo: 'Coca Cola', categoria: 'Bebidas', stockActual: 100, unidad: 'unid', stockMinimo: 20, consumo: 50, unidadConsumo: 'unid', estado: 'Normal' },
    { id: 'I005', insumo: 'Arroz', categoria: 'Secos', stockActual: 5, unidad: 'kg', stockMinimo: 5, consumo: 5, unidadConsumo: 'kg', estado: 'Bajo stock' },
    { id: 'I006', insumo: 'Limon', categoria: 'Verduras', stockActual: 0, unidad: 'kg', stockMinimo: 6, consumo: 9, unidadConsumo: 'kg', estado: 'Sin stock' },
    { id: 'I007', insumo: 'Chicha morada', categoria: 'Bebidas', stockActual: 4, unidad: 'L', stockMinimo: 6, consumo: 7, unidadConsumo: 'L', estado: 'Bajo stock' },
    { id: 'I008', insumo: 'Detergente cocina', categoria: 'Limpieza', stockActual: 8, unidad: 'unid', stockMinimo: 2, consumo: 2, unidadConsumo: 'unid', estado: 'Normal' }
  ];
  const inventoryConsumptionByDay = [
    { fecha: '2026-04-10', consumo: 28 },
    { fecha: '2026-04-11', consumo: 42 },
    { fecha: '2026-04-12', consumo: 31 },
    { fecha: '2026-04-13', consumo: 78 },
    { fecha: '2026-04-14', consumo: 36 },
    { fecha: '2026-04-15', consumo: 48 },
    { fecha: '2026-04-16', consumo: 33 }
  ];
  const purchaseRecords = [
    { id: 'P001', fecha: '2026-05-01', proveedor: 'Distribuidora Sol', total: 2100, metodoPago: 'Transferencia', usuario: 'Pedro Gomez' },
    { id: 'P002', fecha: '2026-05-01', proveedor: 'Mercado Central', total: 1450, metodoPago: 'Efectivo', usuario: 'Pedro Gomez' },
    { id: 'P003', fecha: '2026-04-30', proveedor: 'Carnes del Sur', total: 3200, metodoPago: 'Tarjeta de Credito', usuario: 'Maria Lopez' },
    { id: 'P004', fecha: '2026-04-29', proveedor: 'Bebidas SA', total: 850, metodoPago: 'Yape / Plin', usuario: 'Pedro Gomez' },
    { id: 'P005', fecha: '2026-04-28', proveedor: 'Abarrotes del Sur', total: 980, metodoPago: 'Transferencia', usuario: 'Carlos Ruiz' },
    { id: 'P006', fecha: '2026-04-27', proveedor: 'Distribuidora Sol', total: 3400, metodoPago: 'Transferencia', usuario: 'Maria Lopez' },
    { id: 'P007', fecha: '2026-04-26', proveedor: 'Mercado Central', total: 1180, metodoPago: 'Efectivo', usuario: 'Carlos Ruiz' },
    { id: 'P008', fecha: '2026-04-25', proveedor: 'Carnes del Sur', total: 2040, metodoPago: 'Tarjeta de Credito', usuario: 'Pedro Gomez' },
    { id: 'P009', fecha: '2026-04-12', proveedor: 'Mercado Central', total: 460, metodoPago: 'Efectivo', usuario: 'Pedro Gomez' },
    { id: 'P010', fecha: '2026-04-15', proveedor: 'Bebidas SA', total: 320, metodoPago: 'Transferencia', usuario: 'Maria Lopez' }
  ];

  function readStoredClients() {
    try {
      const stored = JSON.parse(localStorage.getItem(CLIENTS_STORAGE_KEY) || '[]');
      return Array.isArray(stored) ? stored : [];
    } catch (error) {
      return [];
    }
  }

  function getClientCategory(visitas) {
    if (visitas > 10) return 'Oro';
    if (visitas >= 5) return 'Plata';
    return 'Cobre';
  }

  const adminHub = document.getElementById('admin-hub');
  const adminWorkspace = document.getElementById('admin-workspace');
  const btnVolverAdmin = document.getElementById('btn-volver-admin');
  const moduleButtons = Array.from(document.querySelectorAll('.admin-card__btn[data-module]'));
  const tabs = Array.from(document.querySelectorAll('.admin-tab'));
  const panes = Array.from(document.querySelectorAll('.admin-pane'));

  const salesDateFrom = document.getElementById('sales-date-from');
  const salesDateTo = document.getElementById('sales-date-to');
  const salesTypeFilter = document.getElementById('sales-type-filter');
  const salesWaiterFilter = document.getElementById('sales-waiter-filter');
  const salesPaymentFilter = document.getElementById('sales-payment-filter');
  const btnApplySalesFilters = document.getElementById('btn-apply-sales-filters');
  const btnExportSalesReport = document.getElementById('btn-export-sales-report');

  const salesLineChart = document.getElementById('sales-line-chart');
  const salesLineLabels = document.getElementById('sales-line-labels');
  const salesBestDay = document.getElementById('sales-best-day');
  const salesTopProduct = document.getElementById('sales-top-product');
  const salesBars = document.getElementById('sales-bars');
  const salesReportTbody = document.getElementById('sales-report-tbody');
  const salesReportEmpty = document.getElementById('sales-report-empty');
    const metricBalanceIncomeCash = document.getElementById('metric-balance-income-cash');
  const metricBalanceIncomeCard = document.getElementById('metric-balance-income-card');
  const metricBalanceIncomeYape = document.getElementById('metric-balance-income-yape');
  const metricBalanceIncomeTransfer = document.getElementById('metric-balance-income-transfer');
  const metricBalanceExpenseCash = document.getElementById('metric-balance-expense-cash');
  const metricBalanceExpenseCard = document.getElementById('metric-balance-expense-card');
  const metricBalanceExpenseYape = document.getElementById('metric-balance-expense-yape');
  const metricBalanceExpenseTransfer = document.getElementById('metric-balance-expense-transfer');
  const metricBalanceIncome = document.getElementById('metric-balance-income');
  const metricBalanceExpenses = document.getElementById('metric-balance-expenses');
  const metricBalanceProfit = document.getElementById('metric-balance-profit');
  const cashDateFrom = document.getElementById('cash-date-from');
  const cashDateTo = document.getElementById('cash-date-to');
  const cashShiftFilter = document.getElementById('cash-shift-filter');
  const cashUserFilter = document.getElementById('cash-user-filter');
  const btnApplyCashFilters = document.getElementById('btn-apply-cash-filters');
  const btnExportCashReport = document.getElementById('btn-export-cash-report');
  const cashLineChart = document.getElementById('cash-line-chart');
  const cashLineLabels = document.getElementById('cash-line-labels');
  const cashPeakDay = document.getElementById('cash-peak-day');
  const cashReportTbody = document.getElementById('cash-report-tbody');
  const cashReportEmpty = document.getElementById('cash-report-empty');
  const exportModalOverlay = document.getElementById('export-modal-overlay');
  const exportSummaryRange = document.getElementById('export-summary-range');
  const exportSummaryType = document.getElementById('export-summary-type');
  const exportSummaryWaiter = document.getElementById('export-summary-waiter');
  const exportSummaryPayment = document.getElementById('export-summary-payment');
  const exportFormatChips = document.getElementById('export-format-chips');
  const btnCancelExport = document.getElementById('btn-cancel-export');
  const btnConfirmExport = document.getElementById('btn-confirm-export');
  const cashExportModalOverlay = document.getElementById('cash-export-modal-overlay');
  const cashExportSummaryRange = document.getElementById('cash-export-summary-range');
  const cashExportSummaryShift = document.getElementById('cash-export-summary-shift');
  const cashExportSummaryUser = document.getElementById('cash-export-summary-user');
  const cashExportFormatChips = document.getElementById('cash-export-format-chips');
  const btnCancelCashExport = document.getElementById('btn-cancel-cash-export');
  const btnConfirmCashExport = document.getElementById('btn-confirm-cash-export');
  const inventoryCategoryFilter = document.getElementById('inventory-category-filter');
  const inventoryStatusFilter = document.getElementById('inventory-status-filter');
  const inventoryDateFrom = document.getElementById('inventory-date-from');
  const inventoryDateTo = document.getElementById('inventory-date-to');
  const btnApplyInventoryFilters = document.getElementById('btn-apply-inventory-filters');
  const btnExportInventoryReport = document.getElementById('btn-export-inventory-report');
  const metricInventoryTotal = document.getElementById('metric-inventory-total');
  const metricInventoryLow = document.getElementById('metric-inventory-low');
  const metricInventoryEmpty = document.getElementById('metric-inventory-empty');
  const metricInventoryConsumption = document.getElementById('metric-inventory-consumption');
  const inventoryLineChart = document.getElementById('inventory-line-chart');
  const inventoryLineLabels = document.getElementById('inventory-line-labels');
  const inventoryPeakDay = document.getElementById('inventory-peak-day');
  const inventoryReportTbody = document.getElementById('inventory-report-tbody');
  const inventoryReportEmpty = document.getElementById('inventory-report-empty');
  const inventoryExportModalOverlay = document.getElementById('inventory-export-modal-overlay');
  const inventoryExportSummaryCategory = document.getElementById('inventory-export-summary-category');
  const inventoryExportSummaryStatus = document.getElementById('inventory-export-summary-status');
  const inventoryExportSummaryRange = document.getElementById('inventory-export-summary-range');
  const inventoryExportFormatChips = document.getElementById('inventory-export-format-chips');
  const btnCancelInventoryExport = document.getElementById('btn-cancel-inventory-export');
  const btnConfirmInventoryExport = document.getElementById('btn-confirm-inventory-export');
  const purchasesReportDateFrom = document.getElementById('purchases-report-date-from');
  const purchasesReportDateTo = document.getElementById('purchases-report-date-to');
  const purchasesReportProvider = document.getElementById('purchases-report-provider');
  const purchasesReportMethod = document.getElementById('purchases-report-method');
  const btnApplyPurchasesFilters = document.getElementById('btn-apply-purchases-filters');
  const btnExportPurchasesReport = document.getElementById('btn-export-purchases-report');
  const metricPurchasesCount = document.getElementById('metric-purchases-count');
  const metricPurchasesTotal = document.getElementById('metric-purchases-total');
  const metricPurchasesAverage = document.getElementById('metric-purchases-average');
  const metricPurchasesTopProvider = document.getElementById('metric-purchases-top-provider');
  const purchasesReportTbody = document.getElementById('purchases-report-tbody');
  const purchasesReportEmpty = document.getElementById('purchases-report-empty');
  const purchasesExportModalOverlay = document.getElementById('purchases-export-modal-overlay');
  const purchasesExportSummaryRange = document.getElementById('purchases-export-summary-range');
  const purchasesExportSummaryProvider = document.getElementById('purchases-export-summary-provider');
  const purchasesExportSummaryMethod = document.getElementById('purchases-export-summary-method');
  const purchasesExportFormatChips = document.getElementById('purchases-export-format-chips');
  const btnCancelPurchasesExport = document.getElementById('btn-cancel-purchases-export');
  const btnConfirmPurchasesExport = document.getElementById('btn-confirm-purchases-export');
  const clientsReportCategoryFilter = document.getElementById('clients-report-category-filter');
  const clientsReportRewardFilter = document.getElementById('clients-report-reward-filter');
  const clientsReportDateFrom = document.getElementById('clients-report-date-from');
  const clientsReportDateTo = document.getElementById('clients-report-date-to');
  const btnApplyClientsFilters = document.getElementById('btn-apply-clients-filters');
  const btnExportClientsReport = document.getElementById('btn-export-clients-report');
  const metricClientsTotal = document.getElementById('metric-clients-total');
  const metricClientsFrequent = document.getElementById('metric-clients-frequent');
  const metricClientsRewards = document.getElementById('metric-clients-rewards');
  const clientsReportTbody = document.getElementById('clients-report-tbody');
  const clientsReportEmpty = document.getElementById('clients-report-empty');
  const clientsReportSummary = document.getElementById('clients-report-summary');
  const clientsExportModalOverlay = document.getElementById('clients-export-modal-overlay');
  const clientsExportSummaryCategory = document.getElementById('clients-export-summary-category');
  const clientsExportSummaryReward = document.getElementById('clients-export-summary-reward');
  const clientsExportSummaryRange = document.getElementById('clients-export-summary-range');
  const clientsExportFormatChips = document.getElementById('clients-export-format-chips');
  const btnCancelClientsExport = document.getElementById('btn-cancel-clients-export');
  const btnConfirmClientsExport = document.getElementById('btn-confirm-clients-export');
  const menuCategoryChips = document.getElementById('menu-category-chips');
  const menuManagerList = document.getElementById('menu-manager-list');
  const menuManagerEmpty = document.getElementById('menu-manager-empty');
  const btnAddMenuItem = document.getElementById('btn-add-menu-item');
  const menuItemModalOverlay = document.getElementById('menu-item-modal-overlay');
  const menuItemModalTitle = document.getElementById('menu-item-modal-title');
  const menuItemForm = document.getElementById('menu-item-form');
  const menuItemId = document.getElementById('menu-item-id');
  const menuItemCategory = document.getElementById('menu-item-category');
  const menuItemName = document.getElementById('menu-item-name');
  const menuItemPrice = document.getElementById('menu-item-price');
  const menuItemPhoto = document.getElementById('menu-item-photo');
  const menuItemPhotoPreview = document.getElementById('menu-item-photo-preview');
  const menuItemDescription = document.getElementById('menu-item-description');
  const btnCancelMenuItem = document.getElementById('btn-cancel-menu-item');

  let currentAdminTab = 'ventas';
  let selectedType = '';
  let selectedPayment = '';
  let selectedExportFormat = 'Excel';
  let selectedCashExportFormat = 'Excel';
  let selectedInventoryCategory = '';
  let selectedInventoryStatus = '';
  let selectedInventoryExportFormat = 'Excel';
  let selectedPurchasesExportFormat = 'Excel';
  let selectedClientsCategory = '';
  let selectedClientsReward = '';
  let selectedMenuCategory = '';
  let selectedClientsExportFormat = 'Excel';
  let menuItems = readMenuItems();
  let currentMenuPhoto = '';

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizeMenuCategory(category) {
    return category === 'Bebidas' || category === 'Bebida' ? 'Bebidas' : 'Platos';
  }

  function normalizeMenuItem(item) {
    return {
      id: item.id || `menu-${Date.now()}`,
      categoria: normalizeMenuCategory(item.categoria),
      nombre: item.nombre || '',
      precio: Number(item.precio) || 0,
      fotografia: item.fotografia || '',
      descripcion: item.descripcion || ''
    };
  }
  function readMenuItems() {
    try {
      const stored = JSON.parse(localStorage.getItem(MENU_STORAGE_KEY) || 'null');
      return Array.isArray(stored) && stored.length ? stored.map(normalizeMenuItem) : defaultMenuItems.map(normalizeMenuItem);
    } catch (error) {
      return defaultMenuItems.map(normalizeMenuItem);
    }
  }

  function saveMenuItems() {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menuItems));
  }
  function formatCurrency(value) {
    return `S/ ${value.toFixed(2)}`;
  }

  function formatShortDate(value) {
    const date = new Date(`${value}T00:00:00`);
    return date.toLocaleDateString('es-PE');
  }

  function getFilteredSales() {
    return salesTransactions.filter((item) => {
      const matchesFrom = !salesDateFrom.value || item.fecha >= salesDateFrom.value;
      const matchesTo = !salesDateTo.value || item.fecha <= salesDateTo.value;
      const matchesType = !selectedType || item.tipo === selectedType;
      const matchesWaiter = !salesWaiterFilter.value || item.mozo === salesWaiterFilter.value;
      const matchesPayment = !selectedPayment || item.metodoPago === selectedPayment;
      return matchesFrom && matchesTo && matchesType && matchesWaiter && matchesPayment;
    });
  }

  function renderSalesLineChart(filtered) {
    const grouped = filtered.reduce((acc, item) => {
      acc[item.fecha] = (acc[item.fecha] || 0) + item.total;
      return acc;
    }, {});

    const entries = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
    salesLineLabels.innerHTML = entries.map(([date]) => `<span>${formatShortDate(date)}</span>`).join('');

    if (!entries.length) {
      salesLineChart.innerHTML = '';
      salesBestDay.textContent = 'Dia con mayor venta: -';
      return;
    }

    const values = entries.map(([, total]) => total);
    const maxValue = Math.max(...values, 1);
    const width = 520;
    const height = 210;
    const paddingX = 28;
    const paddingY = 24;
    const usableWidth = width - paddingX * 2;
    const usableHeight = height - paddingY * 2;

    const points = entries.map(([date, total], index) => {
      const x = entries.length === 1 ? width / 2 : paddingX + (usableWidth * index) / (entries.length - 1);
      const y = height - paddingY - (total / maxValue) * usableHeight;
      return { x, y, date, total };
    });

    const polylinePoints = points.map((point) => `${point.x},${point.y}`).join(' ');
    const areaPoints = `${paddingX},${height - paddingY} ${polylinePoints} ${points[points.length - 1].x},${height - paddingY}`;
    const bestDay = entries.reduce((best, current) => (current[1] > best[1] ? current : best));
    salesBestDay.textContent = `Dia con mayor venta: ${formatShortDate(bestDay[0])}`;

    salesLineChart.innerHTML = `
      <polygon points="${areaPoints}" fill="rgba(213, 175, 52, 0.12)"></polygon>
      <polyline points="${polylinePoints}" fill="none" stroke="#c7a021" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline>
      ${points.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="5.5" fill="#d5af34" stroke="#ffffff" stroke-width="2"></circle>`).join('')}
    `;
  }

  function renderSalesBars(filtered) {
    const grouped = filtered.reduce((acc, item) => {
      acc[item.producto] = (acc[item.producto] || 0) + item.cantidad;
      return acc;
    }, {});

    const entries = Object.entries(grouped)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    if (!entries.length) {
      salesBars.innerHTML = '';
      salesTopProduct.textContent = 'Producto mas vendido: -';
      return;
    }

    const maxValue = Math.max(...entries.map(([, quantity]) => quantity), 1);
    salesTopProduct.textContent = `Producto mas vendido: ${entries[0][0]}`;
    salesBars.innerHTML = entries.map(([product, quantity]) => `
      <div class="sales-bar">
        <span class="sales-bar__label">${product}</span>
        <div class="sales-bar__track">
          <div class="sales-bar__fill" style="width: ${(quantity / maxValue) * 100}%"></div>
        </div>
        <span class="sales-bar__value">${quantity}</span>
      </div>
    `).join('');
  }

  function isWithinBalanceDateRange(item) {
    const matchesFrom = !cashDateFrom.value || item.fecha >= cashDateFrom.value;
    const matchesTo = !cashDateTo.value || item.fecha <= cashDateTo.value;
    return matchesFrom && matchesTo;
  }

  function getBalanceSales() {
    return salesTransactions.filter(isWithinBalanceDateRange);
  }

  function getBalancePurchases() {
    return purchaseRecords.filter(isWithinBalanceDateRange);
  }

  function normalizePaymentMethod(method) {
    if (method === 'Tarjeta de Credito') return 'Tarjeta';
    if (method === 'Yape' || method === 'Plin') return 'Yape / Plin';
    return method;
  }

  function groupAmountsByMethod(items) {
    return items.reduce((acc, item) => {
      const method = normalizePaymentMethod(item.metodoPago);
      acc[method] = (acc[method] || 0) + item.total;
      return acc;
    }, {});
  }

  function getBalanceMetrics() {
    const sales = getBalanceSales();
    const purchases = getBalancePurchases();
    const incomeByMethod = groupAmountsByMethod(sales);
    const expensesByMethod = groupAmountsByMethod(purchases);
    const incomeTotal = sales.reduce((sum, item) => sum + item.total, 0);
    const expensesTotal = purchases.reduce((sum, item) => sum + item.total, 0);

    return {
      income: {
        cash: incomeByMethod.Efectivo || 0,
        card: incomeByMethod.Tarjeta || 0,
        yape: incomeByMethod['Yape / Plin'] || 0,
        transfer: incomeByMethod.Transferencia || 0,
        total: incomeTotal
      },
      expenses: {
        cash: expensesByMethod.Efectivo || 0,
        card: expensesByMethod.Tarjeta || 0,
        yape: expensesByMethod['Yape / Plin'] || 0,
        transfer: expensesByMethod.Transferencia || 0,
        total: expensesTotal
      },
      profit: incomeTotal - expensesTotal,
      purchases
    };
  }

  function renderCashBalanceReport() {
    const metrics = getBalanceMetrics();
    metricBalanceIncomeCash.textContent = formatCurrency(metrics.income.cash);
    metricBalanceIncomeCard.textContent = formatCurrency(metrics.income.card);
    metricBalanceIncomeYape.textContent = formatCurrency(metrics.income.yape);
    metricBalanceIncomeTransfer.textContent = formatCurrency(metrics.income.transfer);
    metricBalanceExpenseCash.textContent = formatCurrency(metrics.expenses.cash);
    metricBalanceExpenseCard.textContent = formatCurrency(metrics.expenses.card);
    metricBalanceExpenseYape.textContent = formatCurrency(metrics.expenses.yape);
    metricBalanceExpenseTransfer.textContent = formatCurrency(metrics.expenses.transfer);
    metricBalanceIncome.textContent = formatCurrency(metrics.income.total);
    metricBalanceExpenses.textContent = formatCurrency(metrics.expenses.total);
    metricBalanceProfit.textContent = formatCurrency(metrics.profit);
    metricBalanceProfit.classList.toggle('admin-metric__value--red', metrics.profit < 0);
    metricBalanceProfit.classList.toggle('admin-metric__value--green', metrics.profit >= 0);
  }

  function renderSalesTable(filtered) {
    salesReportTbody.innerHTML = filtered.map((item) => `
      <tr>
        <td>${formatShortDate(item.fecha)}</td>
        <td>${item.producto}</td>
        <td>${item.categoria}</td>
        <td>${item.cantidad}</td>
        <td>${formatCurrency(item.total)}</td>
        <td>${item.mozo || '-'}</td>
        <td>${item.metodoPago}</td>
      </tr>
    `).join('');

    salesReportEmpty.classList.toggle('hidden', filtered.length > 0);
  }

  function renderSalesWaiterOptions() {
    const selectedWaiter = salesWaiterFilter.value;
    const waiters = Array.from(new Set(salesTransactions.map((item) => item.mozo).filter(Boolean))).sort((a, b) => a.localeCompare(b));
    salesWaiterFilter.innerHTML = '<option value="">Todos los mozos</option>' + waiters.map((waiter) => `<option value="${waiter}">${waiter}</option>`).join('');
    salesWaiterFilter.value = waiters.includes(selectedWaiter) ? selectedWaiter : '';
  }

  function renderSalesReport() {
    renderSalesWaiterOptions();
    const filtered = getFilteredSales();
    renderSalesLineChart(filtered);
    renderSalesBars(filtered);
    renderSalesTable(filtered);
  }

  function getFilteredCashMovements() {
    const selectedUser = cashUserFilter.value;
    return cashMovements.filter((item) => {
      const matchesFrom = !cashDateFrom.value || item.fecha >= cashDateFrom.value;
      const matchesTo = !cashDateTo.value || item.fecha <= cashDateTo.value;
      const matchesShift = !cashShiftFilter.value || item.turno === cashShiftFilter.value;
      const matchesUser = !selectedUser || item.usuario === selectedUser;
      return matchesFrom && matchesTo && matchesShift && matchesUser;
    });
  }

  function renderCashLineChart(filtered) {
    const grouped = filtered.reduce((acc, item) => {
      if (!acc[item.fecha]) {
        acc[item.fecha] = { ingresos: 0, egresos: 0 };
      }
      if (item.tipo === 'Egreso') {
        acc[item.fecha].egresos += item.monto;
      } else {
        acc[item.fecha].ingresos += item.monto;
      }
      return acc;
    }, {});

    const entries = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
    cashLineLabels.innerHTML = entries.map(([date]) => `<span>${formatShortDate(date)}</span>`).join('');

    if (!entries.length) {
      cashLineChart.innerHTML = '';
      cashPeakDay.textContent = 'Dia con mayor ingreso: -';
      return;
    }

    const maxValue = Math.max(
      ...entries.flatMap(([, values]) => [values.ingresos, values.egresos]),
      1
    );

    const width = 520;
    const height = 230;
    const paddingX = 26;
    const paddingY = 24;
    const usableWidth = width - paddingX * 2;
    const usableHeight = height - paddingY * 2;
    const groupWidth = usableWidth / Math.max(entries.length, 1);
    const barWidth = Math.min(22, Math.max(10, groupWidth * 0.24));
    const barGap = Math.max(6, groupWidth * 0.08);

    const peakDay = entries.reduce((best, current) => (current[1].ingresos > best[1].ingresos ? current : best));
    cashPeakDay.textContent = `Dia con mayor ingreso: ${formatShortDate(peakDay[0])}`;

    cashLineChart.innerHTML = `
      ${entries.map(([date, values], index) => {
        const groupStartX = paddingX + groupWidth * index;
        const baseX = groupStartX + groupWidth / 2;
        const ingresoHeight = (values.ingresos / maxValue) * usableHeight;
        const egresoHeight = (values.egresos / maxValue) * usableHeight;
        const ingresoY = height - paddingY - ingresoHeight;
        const egresoY = height - paddingY - egresoHeight;
        const ingresoX = baseX - barGap / 2 - barWidth;
        const egresoX = baseX + barGap / 2;
        return `
          <rect class="cash-bar--income" x="${ingresoX}" y="${ingresoY}" width="${barWidth}" height="${ingresoHeight}" rx="4"></rect>
          <rect class="cash-bar--expense" x="${egresoX}" y="${egresoY}" width="${barWidth}" height="${egresoHeight}" rx="4"></rect>
        `;
      }).join('')}
    `;
  }

  function renderCashTable(filtered) {
    cashReportTbody.innerHTML = filtered.map((item) => `
      <tr>
        <td>${formatShortDate(item.fecha)}</td>
        <td>${item.tipo}</td>
        <td>${item.metodo}</td>
        <td>${formatCurrency(item.monto)}</td>
        <td>${item.turno}</td>
        <td>${item.usuario}</td>
      </tr>
    `).join('');

    cashReportEmpty.classList.toggle('hidden', filtered.length > 0);
  }

  function renderCashReport() {
    const filtered = getFilteredCashMovements();
    renderCashBalanceReport();
    renderCashLineChart(filtered);
    renderCashTable(filtered);
  }

  function getFilteredInventoryItems() {
    return inventoryItems.filter((item) => {
      const matchesCategory = !selectedInventoryCategory || item.categoria === selectedInventoryCategory;
      const matchesStatus = !selectedInventoryStatus || item.estado === selectedInventoryStatus;
      return matchesCategory && matchesStatus;
    });
  }

  function getFilteredInventoryConsumption() {
    return inventoryConsumptionByDay.filter((item) => {
      const matchesFrom = !inventoryDateFrom.value || item.fecha >= inventoryDateFrom.value;
      const matchesTo = !inventoryDateTo.value || item.fecha <= inventoryDateTo.value;
      return matchesFrom && matchesTo;
    });
  }

  function renderInventoryMetrics(filteredItems, filteredConsumption) {
    const total = filteredItems.length;
    const low = filteredItems.filter((item) => item.estado === 'Bajo stock').length;
    const empty = filteredItems.filter((item) => item.estado === 'Sin stock').length;
    const consumptionTotal = filteredConsumption.reduce((sum, item) => sum + item.consumo, 0);

    metricInventoryTotal.textContent = `${total}`;
    metricInventoryLow.textContent = `${low}`;
    metricInventoryEmpty.textContent = `${empty}`;
    metricInventoryConsumption.textContent = `${consumptionTotal} unidades`;
  }

  function renderInventoryChart(filteredConsumption) {
    inventoryLineLabels.innerHTML = filteredConsumption.map((item) => `<span>${formatShortDate(item.fecha)}</span>`).join('');

    if (!filteredConsumption.length) {
      inventoryLineChart.innerHTML = '';
      inventoryPeakDay.textContent = 'Dia con mayor consumo: -';
      return;
    }

    const maxValue = Math.max(...filteredConsumption.map((item) => item.consumo), 1);
    const width = 520;
    const height = 210;
    const paddingX = 28;
    const paddingY = 24;
    const usableWidth = width - paddingX * 2;
    const usableHeight = height - paddingY * 2;

    const points = filteredConsumption.map((item, index) => {
      const x = filteredConsumption.length === 1 ? width / 2 : paddingX + (usableWidth * index) / (filteredConsumption.length - 1);
      const y = height - paddingY - (item.consumo / maxValue) * usableHeight;
      return { x, y, ...item };
    });

    const polylinePoints = points.map((point) => `${point.x},${point.y}`).join(' ');
    const areaPoints = `${paddingX},${height - paddingY} ${polylinePoints} ${points[points.length - 1].x},${height - paddingY}`;
    const peakDay = filteredConsumption.reduce((best, current) => (current.consumo > best.consumo ? current : best));
    inventoryPeakDay.textContent = `Dia con mayor consumo: ${formatShortDate(peakDay.fecha)}`;

    inventoryLineChart.innerHTML = `
      <polygon points="${areaPoints}" fill="rgba(213, 175, 52, 0.12)"></polygon>
      <polyline points="${polylinePoints}" fill="none" stroke="#c7a021" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline>
      ${points.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="5.5" fill="#d5af34" stroke="#ffffff" stroke-width="2"></circle>`).join('')}
    `;
  }

  function renderInventoryTable(filteredItems) {
    inventoryReportTbody.innerHTML = filteredItems.map((item) => `
      <tr>
        <td>${item.insumo}</td>
        <td>${item.categoria}</td>
        <td>${item.stockActual} ${item.unidad}</td>
        <td>${item.stockMinimo} ${item.unidad}</td>
        <td>${item.consumo} ${item.unidadConsumo}</td>
        <td>${item.estado}</td>
      </tr>
    `).join('');

    inventoryReportEmpty.classList.toggle('hidden', filteredItems.length > 0);
  }

  function renderInventoryReport() {
    const filteredItems = getFilteredInventoryItems();
    const filteredConsumption = getFilteredInventoryConsumption();
    renderInventoryMetrics(filteredItems, filteredConsumption);
    renderInventoryChart(filteredConsumption);
    renderInventoryTable(filteredItems);
  }

  function getFilteredPurchaseRecords() {
    return purchaseRecords.filter((item) => {
      const matchesFrom = !purchasesReportDateFrom.value || item.fecha >= purchasesReportDateFrom.value;
      const matchesTo = !purchasesReportDateTo.value || item.fecha <= purchasesReportDateTo.value;
      const matchesProvider = !purchasesReportProvider.value || item.proveedor === purchasesReportProvider.value;
      const matchesMethod = !purchasesReportMethod.value || item.metodoPago === purchasesReportMethod.value;
      return matchesFrom && matchesTo && matchesProvider && matchesMethod;
    });
  }

  function renderPurchasesMetrics(filtered) {
    const totalPurchases = filtered.length;
    const totalAmount = filtered.reduce((sum, item) => sum + item.total, 0);
    const averageAmount = totalPurchases ? totalAmount / totalPurchases : 0;
    const groupedProviders = filtered.reduce((acc, item) => {
      acc[item.proveedor] = (acc[item.proveedor] || 0) + item.total;
      return acc;
    }, {});
    const topProvider = Object.entries(groupedProviders).sort((a, b) => b[1] - a[1])[0];

    metricPurchasesCount.textContent = `${totalPurchases} pedidos`;
    metricPurchasesTotal.textContent = formatCurrency(totalAmount);
    metricPurchasesAverage.textContent = formatCurrency(averageAmount);
    metricPurchasesTopProvider.textContent = topProvider ? `${topProvider[0]} (${formatCurrency(topProvider[1])})` : '-';
  }

  function renderPurchasesTable(filtered) {
    purchasesReportTbody.innerHTML = filtered.map((item) => `
      <tr>
        <td>${formatShortDate(item.fecha)}</td>
        <td>${item.proveedor}</td>
        <td>${formatCurrency(item.total)}</td>
        <td>${item.metodoPago}</td>
        <td>${item.usuario}</td>
      </tr>
    `).join('');

    purchasesReportEmpty.classList.toggle('hidden', filtered.length > 0);
  }
  function renderPurchasesReport() {
    const filtered = getFilteredPurchaseRecords();
    renderPurchasesMetrics(filtered);
    renderPurchasesTable(filtered);
  }

  function getFilteredClientsReport() {
    const clients = readStoredClients();
    return clients.filter((client) => {
      const category = getClientCategory(client.visitas || 0);
      const lastVisit = client.ultimaVisita ? new Date(client.ultimaVisita).toISOString().slice(0, 10) : '';
      const hasReward = Boolean(client.recompensaActual);
      const matchesCategory = !selectedClientsCategory || category === selectedClientsCategory;
      const matchesReward = !selectedClientsReward || (selectedClientsReward === 'con' ? hasReward : !hasReward);
      const matchesFrom = !clientsReportDateFrom.value || (lastVisit && lastVisit >= clientsReportDateFrom.value);
      const matchesTo = !clientsReportDateTo.value || (lastVisit && lastVisit <= clientsReportDateTo.value);
      return matchesCategory && matchesReward && matchesFrom && matchesTo;
    });
  }

  function renderClientsMetrics(filtered) {
    const frequent = filtered.filter((client) => (client.visitas || 0) >= 5).length;
    const rewards = filtered.filter((client) => client.recompensaActual).length;
    metricClientsTotal.textContent = `${filtered.length}`;
    metricClientsFrequent.textContent = `${frequent}`;
    metricClientsRewards.textContent = `${rewards}`;
  }

  function renderClientsTable(filtered) {
    clientsReportTbody.innerHTML = filtered.map((client) => {
      const category = getClientCategory(client.visitas || 0);
      const lastVisit = client.ultimaVisita ? formatShortDate(new Date(client.ultimaVisita).toISOString().slice(0, 10)) : '-';
      return `
        <tr>
          <td>${client.nombre}</td>
          <td>${client.telefono || '-'}</td>
          <td>${category}</td>
          <td>${client.visitas || 0}</td>
          <td>${lastVisit}</td>
          <td>${client.recompensaActual || '-'}</td>
          <td>${client.estado || '-'}</td>
        </tr>
      `;
    }).join('');

    clientsReportEmpty.classList.toggle('hidden', filtered.length > 0);
  }

  function renderClientsSummary(filtered) {
    if (!filtered.length) {
      clientsReportSummary.textContent = 'Top clientes: -';
      return;
    }

    const topClients = [...filtered]
      .sort((a, b) => (b.visitas || 0) - (a.visitas || 0))
      .slice(0, 3)
      .map((client) => `${client.nombre} (${getClientCategory(client.visitas || 0)})`);

    clientsReportSummary.textContent = `Top clientes: ${topClients.join(', ')}`;
  }

  function renderClientsReport() {
    const filtered = getFilteredClientsReport();
    renderClientsMetrics(filtered);
    renderClientsTable(filtered);
    renderClientsSummary(filtered);
  }

  function getMenuCategories() {
    return menuCategories;
  }

  function renderMenuCategoryControls() {
    const categories = getMenuCategories();
    menuCategoryChips.innerHTML = '<button class="admin-chip" type="button" data-category="">Todas</button>' + categories.map((category) => (
      `<button class="admin-chip" type="button" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`
    )).join('');
    setActiveChip(menuCategoryChips, selectedMenuCategory, 'category');
  }

  function getFilteredMenuItems() {
    return menuItems.filter((item) => !selectedMenuCategory || item.categoria === selectedMenuCategory);
  }

  function renderMenuManager() {
    renderMenuCategoryControls();
    const filtered = getFilteredMenuItems();
    menuManagerEmpty.classList.toggle('hidden', filtered.length > 0);

    if (!filtered.length) {
      menuManagerList.innerHTML = '';
      return;
    }

    const grouped = filtered.reduce((acc, item) => {
      const category = item.categoria || 'Sin categoria';
      acc[category] = acc[category] || [];
      acc[category].push(item);
      return acc;
    }, {});

    menuManagerList.innerHTML = Object.entries(grouped).map(([category, items]) => `
      <article class="admin-menu-category">
        <div class="admin-menu-category__header">
          <h3>${escapeHtml(category)}</h3>
          <span>${items.length} productos</span>
        </div>
        <div class="admin-menu-items">
          ${items.map((item) => `
            <div class="admin-menu-item">
              <div class="admin-menu-item__photo">
                ${item.fotografia ? `<img src="${escapeHtml(item.fotografia)}" alt="${escapeHtml(item.nombre)}">` : '<span>Sin foto</span>'}
              </div>
              <div class="admin-menu-item__body">
                <div class="admin-menu-item__top">
                  <strong>${escapeHtml(item.nombre)}</strong>
                  <span>${formatCurrency(Number(item.precio) || 0)}</span>
                </div>
                <p>${escapeHtml(item.descripcion || 'Sin descripcion')}</p>
              </div>
              <button class="btn-limpiar admin-menu-item__edit" type="button" data-menu-id="${escapeHtml(item.id)}">Editar</button>
            </div>
          `).join('')}
        </div>
      </article>
    `).join('');
  }

  function openMenuItemModal(item = null) {
    const isEditing = Boolean(item);
    menuItemModalTitle.textContent = isEditing ? 'Editar producto' : 'Agregar producto';
    menuItemId.value = item?.id || '';
    menuItemCategory.value = normalizeMenuCategory(item?.categoria || selectedMenuCategory || 'Platos');
    menuItemName.value = item?.nombre || '';
    menuItemPrice.value = item?.precio ?? '';
    currentMenuPhoto = item?.fotografia || '';
    menuItemPhoto.value = '';
    menuItemPhotoPreview.innerHTML = currentMenuPhoto ? `<img src="${escapeHtml(currentMenuPhoto)}" alt="Imagen del producto">` : 'Sin imagen adjunta';
    menuItemDescription.value = item?.descripcion || '';
    renderMenuCategoryControls();
    menuItemModalOverlay.classList.remove('hidden');
    menuItemName.focus();
  }

  function closeMenuItemModal() {
    menuItemModalOverlay.classList.add('hidden');
    menuItemForm.reset();
    menuItemId.value = '';
  }

  function saveMenuItemFromForm() {
    const id = menuItemId.value || `menu-${Date.now()}`;
    const payload = {
      id,
      categoria: menuItemCategory.value.trim() || 'Sin categoria',
      nombre: menuItemName.value.trim(),
      precio: parseFloat(menuItemPrice.value) || 0,
      fotografia: currentMenuPhoto,
      descripcion: menuItemDescription.value.trim()
    };

    if (!payload.nombre) {
      menuItemName.focus();
      return;
    }

    const index = menuItems.findIndex((item) => item.id === id);
    if (index >= 0) {
      menuItems[index] = payload;
    } else {
      menuItems.push(payload);
    }

    saveMenuItems();
    selectedMenuCategory = payload.categoria;
    renderMenuManager();
    closeMenuItemModal();
  }
  function setActiveChip(group, value, attr) {
    Array.from(group.querySelectorAll('.admin-chip')).forEach((chip) => {
      chip.classList.toggle('active', chip.dataset[attr] === value);
    });
  }

  function openExportModal() {
    const from = salesDateFrom.value ? formatShortDate(salesDateFrom.value) : '-';
    const to = salesDateTo.value ? formatShortDate(salesDateTo.value) : '-';
    exportSummaryRange.textContent = `${from} - ${to}`;
    exportSummaryType.textContent = selectedType ? (selectedType === 'plato' ? 'Platos' : 'Bebidas') : 'Todos';
    exportSummaryWaiter.textContent = salesWaiterFilter.value || 'Todos';
    exportSummaryPayment.textContent = selectedPayment || 'Todos';
    selectedExportFormat = 'Excel';
    setActiveChip(exportFormatChips, selectedExportFormat, 'format');
    exportModalOverlay.classList.remove('hidden');
  }

  function openCashExportModal() {
    const from = cashDateFrom.value ? formatShortDate(cashDateFrom.value) : '-';
    const to = cashDateTo.value ? formatShortDate(cashDateTo.value) : '-';
    cashExportSummaryRange.textContent = `${from} - ${to}`;
    cashExportSummaryShift.textContent = cashShiftFilter.value || 'Todos';
    cashExportSummaryUser.textContent = cashUserFilter.value || 'Todos';
    selectedCashExportFormat = 'Excel';
    setActiveChip(cashExportFormatChips, selectedCashExportFormat, 'format');
    cashExportModalOverlay.classList.remove('hidden');
  }

  function openInventoryExportModal() {
    const from = inventoryDateFrom.value ? formatShortDate(inventoryDateFrom.value) : '-';
    const to = inventoryDateTo.value ? formatShortDate(inventoryDateTo.value) : '-';
    inventoryExportSummaryCategory.textContent = selectedInventoryCategory || 'Todos';
    inventoryExportSummaryStatus.textContent = selectedInventoryStatus || 'Todos';
    inventoryExportSummaryRange.textContent = `${from} - ${to}`;
    selectedInventoryExportFormat = 'Excel';
    setActiveChip(inventoryExportFormatChips, selectedInventoryExportFormat, 'format');
    inventoryExportModalOverlay.classList.remove('hidden');
  }

  function openPurchasesExportModal() {
    const from = purchasesReportDateFrom.value ? formatShortDate(purchasesReportDateFrom.value) : '-';
    const to = purchasesReportDateTo.value ? formatShortDate(purchasesReportDateTo.value) : '-';
    purchasesExportSummaryRange.textContent = `${from} - ${to}`;
    purchasesExportSummaryProvider.textContent = purchasesReportProvider.value || 'Todos';
    purchasesExportSummaryMethod.textContent = purchasesReportMethod.value || 'Todos';
    selectedPurchasesExportFormat = 'Excel';
    setActiveChip(purchasesExportFormatChips, selectedPurchasesExportFormat, 'format');
    purchasesExportModalOverlay.classList.remove('hidden');
  }

  function openClientsExportModal() {
    const from = clientsReportDateFrom.value ? formatShortDate(clientsReportDateFrom.value) : '-';
    const to = clientsReportDateTo.value ? formatShortDate(clientsReportDateTo.value) : '-';
    clientsExportSummaryCategory.textContent = selectedClientsCategory || 'Todos';
    clientsExportSummaryReward.textContent = selectedClientsReward === 'con' ? 'Con recompensa' : selectedClientsReward === 'sin' ? 'Sin recompensa' : 'Todos';
    clientsExportSummaryRange.textContent = `${from} - ${to}`;
    selectedClientsExportFormat = 'Excel';
    setActiveChip(clientsExportFormatChips, selectedClientsExportFormat, 'format');
    clientsExportModalOverlay.classList.remove('hidden');
  }

  function showAdminWorkspace(tabName) {
    currentAdminTab = tabName;
    adminHub.classList.add('hidden');
    adminWorkspace.classList.remove('hidden');

    tabs.forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    panes.forEach((pane) => {
      pane.classList.toggle('hidden', pane.id !== `pane-${tabName}`);
    });

    if (tabName === 'ventas') {
      renderSalesReport();
    }

    if (tabName === 'caja') {
      renderCashReport();
    }

    if (tabName === 'inventario') {
      renderInventoryReport();
    }

    if (tabName === 'compras') {
      renderPurchasesReport();
    }

    if (tabName === 'clientes') {
      renderClientsReport();
    }

    if (tabName === 'carta') {
      renderMenuManager();
    }
  }

  moduleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      showAdminWorkspace(button.dataset.module);
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      showAdminWorkspace(tab.dataset.tab);
    });
  });

  btnVolverAdmin.addEventListener('click', () => {
    adminWorkspace.classList.add('hidden');
    adminHub.classList.remove('hidden');
  });

  salesTypeFilter.addEventListener('change', () => {
    selectedType = salesTypeFilter.value;
    renderSalesReport();
  });

  salesPaymentFilter.addEventListener('change', () => {
    selectedPayment = salesPaymentFilter.value;
    renderSalesReport();
  });

  salesWaiterFilter.addEventListener('change', renderSalesReport);
  btnApplySalesFilters.addEventListener('click', renderSalesReport);

  btnExportSalesReport.addEventListener('click', openExportModal);


  cashShiftFilter.addEventListener('change', renderCashReport);
  cashUserFilter.addEventListener('change', renderCashReport);
  btnApplyCashFilters.addEventListener('click', renderCashReport);
  btnExportCashReport.addEventListener('click', openCashExportModal);
  inventoryCategoryFilter.addEventListener('change', () => {
    selectedInventoryCategory = inventoryCategoryFilter.value;
  });

  inventoryStatusFilter.addEventListener('change', () => {
    selectedInventoryStatus = inventoryStatusFilter.value;
  });

  btnApplyInventoryFilters.addEventListener('click', renderInventoryReport);
  btnExportInventoryReport.addEventListener('click', openInventoryExportModal);
  btnApplyPurchasesFilters.addEventListener('click', renderPurchasesReport);
  btnExportPurchasesReport.addEventListener('click', openPurchasesExportModal);
  clientsReportCategoryFilter.addEventListener('change', () => {
    selectedClientsCategory = clientsReportCategoryFilter.value;
  });

  clientsReportRewardFilter.addEventListener('change', () => {
    selectedClientsReward = clientsReportRewardFilter.value;
  });

  btnApplyClientsFilters.addEventListener('click', renderClientsReport);
  btnExportClientsReport.addEventListener('click', openClientsExportModal);

  menuCategoryChips.addEventListener('click', (event) => {
    const chip = event.target.closest('.admin-chip');
    if (!chip) return;
    selectedMenuCategory = chip.dataset.category;
    renderMenuManager();
  });

  menuManagerList.addEventListener('click', (event) => {
    const editButton = event.target.closest('[data-menu-id]');
    if (!editButton) return;
    const item = menuItems.find((menuItem) => menuItem.id === editButton.dataset.menuId);
    if (item) openMenuItemModal(item);
  });


  menuItemPhoto.addEventListener('change', () => {
    const file = menuItemPhoto.files && menuItemPhoto.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      currentMenuPhoto = String(reader.result || '');
      menuItemPhotoPreview.innerHTML = currentMenuPhoto ? `<img src="${escapeHtml(currentMenuPhoto)}" alt="Imagen del producto">` : 'Sin imagen adjunta';
    });
    reader.readAsDataURL(file);
  });
  btnAddMenuItem.addEventListener('click', () => openMenuItemModal());
  btnCancelMenuItem.addEventListener('click', closeMenuItemModal);
  menuItemForm.addEventListener('submit', (event) => {
    event.preventDefault();
    saveMenuItemFromForm();
  });

  exportFormatChips.addEventListener('click', (event) => {
    const chip = event.target.closest('.admin-chip');
    if (!chip) return;
    selectedExportFormat = chip.dataset.format;
    setActiveChip(exportFormatChips, selectedExportFormat, 'format');
  });

  btnCancelExport.addEventListener('click', () => {
    exportModalOverlay.classList.add('hidden');
  });

  btnConfirmExport.addEventListener('click', () => {
    window.alert(`Reporte de ventas listo para exportar en ${selectedExportFormat}.`);
    exportModalOverlay.classList.add('hidden');
  });

  cashExportFormatChips.addEventListener('click', (event) => {
    const chip = event.target.closest('.admin-chip');
    if (!chip) return;
    selectedCashExportFormat = chip.dataset.format;
    setActiveChip(cashExportFormatChips, selectedCashExportFormat, 'format');
  });

  btnCancelCashExport.addEventListener('click', () => {
    cashExportModalOverlay.classList.add('hidden');
  });

  btnConfirmCashExport.addEventListener('click', () => {
    window.alert(`Reporte de caja listo para exportar en ${selectedCashExportFormat}.`);
    cashExportModalOverlay.classList.add('hidden');
  });

  inventoryExportFormatChips.addEventListener('click', (event) => {
    const chip = event.target.closest('.admin-chip');
    if (!chip) return;
    selectedInventoryExportFormat = chip.dataset.format;
    setActiveChip(inventoryExportFormatChips, selectedInventoryExportFormat, 'format');
  });

  btnCancelInventoryExport.addEventListener('click', () => {
    inventoryExportModalOverlay.classList.add('hidden');
  });

  btnConfirmInventoryExport.addEventListener('click', () => {
    window.alert(`Reporte de inventario listo para exportar en ${selectedInventoryExportFormat}.`);
    inventoryExportModalOverlay.classList.add('hidden');
  });

  purchasesExportFormatChips.addEventListener('click', (event) => {
    const chip = event.target.closest('.admin-chip');
    if (!chip) return;
    selectedPurchasesExportFormat = chip.dataset.format;
    setActiveChip(purchasesExportFormatChips, selectedPurchasesExportFormat, 'format');
  });

  btnCancelPurchasesExport.addEventListener('click', () => {
    purchasesExportModalOverlay.classList.add('hidden');
  });

  btnConfirmPurchasesExport.addEventListener('click', () => {
    window.alert(`Reporte de compras listo para exportar en ${selectedPurchasesExportFormat}.`);
    purchasesExportModalOverlay.classList.add('hidden');
  });

  clientsExportFormatChips.addEventListener('click', (event) => {
    const chip = event.target.closest('.admin-chip');
    if (!chip) return;
    selectedClientsExportFormat = chip.dataset.format;
    setActiveChip(clientsExportFormatChips, selectedClientsExportFormat, 'format');
  });

  btnCancelClientsExport.addEventListener('click', () => {
    clientsExportModalOverlay.classList.add('hidden');
  });

  btnConfirmClientsExport.addEventListener('click', () => {
    window.alert(`Reporte de clientes listo para exportar en ${selectedClientsExportFormat}.`);
    clientsExportModalOverlay.classList.add('hidden');
  });

  salesDateFrom.value = '2026-04-10';
  salesDateTo.value = '2026-04-16';
  cashDateFrom.value = '2026-04-10';
  cashDateTo.value = '2026-04-16';
  inventoryDateFrom.value = '2026-04-10';
  inventoryDateTo.value = '2026-04-16';
  purchasesReportDateFrom.value = '2026-04-25';
  purchasesReportDateTo.value = '2026-05-01';
  clientsReportDateFrom.value = '2026-04-04';
  clientsReportDateTo.value = '2026-04-16';
  renderSalesReport();
  renderCashReport();
  renderInventoryReport();
  renderPurchasesReport();
  renderClientsReport();
  renderMenuManager();
});
