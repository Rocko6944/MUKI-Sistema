document.addEventListener('DOMContentLoaded', () => {
  const CLIENTS_STORAGE_KEY = 'muki_clientes_registrados';
  const cajaInventoryItems = [
    { id: 1, nombre: 'Tomate', categoria: 'Verduras', unidad: 'kg' },
    { id: 2, nombre: 'Aceite vegetal', categoria: 'Secos', unidad: 'L' },
    { id: 3, nombre: 'Pollo', categoria: 'Carnes', unidad: 'kg' },
    { id: 4, nombre: 'Pimiento rojo', categoria: 'Verduras', unidad: 'kg' },
    { id: 5, nombre: 'Chicha morada', categoria: 'Bebidas', unidad: 'L' },
    { id: 6, nombre: 'Detergente cocina', categoria: 'Limpieza', unidad: 'unid' },
    { id: 7, nombre: 'Arroz', categoria: 'Secos', unidad: 'kg' },
    { id: 8, nombre: 'Limon', categoria: 'Verduras', unidad: 'kg' }
  ];
  const TABLE_MAP_STORAGE_KEY = 'mukiSettingsTableMap';
  const ventasData = [
    {
      id: '#MK1001',
      mesa: 'M-03',
      total: 133,
      estado: 'En proceso',
      fecha: '24/10/24 20:30',
      comensales: 2,
      mozo: 'Camila Rojas',
      items: [
        { nombre: 'Ceviche a lo Muki', cantidad: 1, precio: 45, nota: '' },
        { nombre: 'Chaufa a lo Muki', cantidad: 1, precio: 38, nota: '' },
        { nombre: 'Pisco Sour (litro)', cantidad: 1, precio: 50, nota: 'Bajo en azucar' }
      ]
    },
    {
      id: '#MK1002',
      mesa: 'M-01',
      total: 48,
      estado: 'Cobrada',
      fecha: '24/10/24 20:15',
      comensales: 2,
      mozo: 'Camila Rojas',
      items: [
        { nombre: 'Arroz con mariscos', cantidad: 1, precio: 25, nota: '' },
        { nombre: 'Pisco Sour', cantidad: 1, precio: 23, nota: '' }
      ]
    },
    {
      id: '#MK1003',
      mesa: 'M-05',
      total: 64,
      estado: 'En proceso',
      fecha: '24/10/24 19:55',
      comensales: 3,
      mozo: 'Camila Rojas',
      items: [
        { nombre: 'Lomo Saltado', cantidad: 1, precio: 39, nota: '' },
        { nombre: 'Chicha morada', cantidad: 1, precio: 8, nota: '' },
        { nombre: 'Pie de limon', cantidad: 1, precio: 17, nota: '' }
      ]
    }
  ];

  const defaultTableMap = {
    floors: [
      { id: 1, name: 'Balcon' },
      { id: 2, name: 'Terraza' },
      { id: 3, name: 'Salon 1' },
      { id: 4, name: 'Salon 2' }
    ],
    tables: [
      { id: 'tb-001', floor: 1, name: 'Mesa 1', status: 'Libre' },
      { id: 'tb-002', floor: 1, name: 'Mesa 2', status: 'Libre' },
      { id: 'tb-003', floor: 2, name: 'Mesa 3', status: 'Reservada' },
      { id: 'tb-004', floor: 3, name: 'Mesa 4', status: 'Ocupada' },
      { id: 'tb-005', floor: 3, name: 'Mesa 5', status: 'Libre' },
      { id: 'tb-006', floor: 4, name: 'Mesa 6', status: 'Libre' }
    ]
  };

  let ambientesData = [];
  let mesasData = [];

  function readTableMapConfig() {
    try {
      const stored = JSON.parse(localStorage.getItem(TABLE_MAP_STORAGE_KEY) || 'null');
      return stored && Array.isArray(stored.tables) ? stored : defaultTableMap;
    } catch (error) {
      return defaultTableMap;
    }
  }

  function normalizeMesaStatus(status) {
    const statusMap = {
      libre: 'libre',
      reservada: 'proceso',
      ocupada: 'ocupada'
    };
    return statusMap[String(status || '').toLowerCase()] || 'libre';
  }

  function refreshConfiguredTables() {
    const tableMap = readTableMapConfig();
    const maxFloor = tableMap.tables.reduce((max, table) => Math.max(max, Number(table.floor) || 1), 1);
    const floors = Array.isArray(tableMap.floors) ? tableMap.floors : [];

    ambientesData = Array.from({ length: Math.max(4, Number(tableMap.floorCount) || 0, maxFloor) }, (_, index) => {
      const id = index + 1;
      const configured = floors.find((floor) => Number(floor.id) === id);
      const fallback = defaultTableMap.floors[index];
      return {
        id,
        name: (configured && configured.name) || (fallback && fallback.name) || `Ambiente ${id}`
      };
    });

    mesasData = tableMap.tables.map((table) => {
      const ambienteId = Number(table.floor) || 1;
      const ambiente = ambientesData.find((item) => item.id === ambienteId) || ambientesData[0];
      return {
        id: table.id,
        name: table.name,
        status: normalizeMesaStatus(table.status),
        ambienteId,
        ambienteName: ambiente ? ambiente.name : 'Ambiente 1',
        capacity: table.capacity || 4,
        reference: ambiente ? `${ambiente.name} - ${table.name}` : table.name
      };
    });
  }

  refreshConfiguredTables();

  const productosData = [
    { id: 'p1', name: 'Ceviche a lo Muki', price: 45, category: 'platos', description: 'Pescado fresco, leche de tigre, choclo y camote.' },
    { id: 'p2', name: 'Chaufa a lo Muki', price: 38, category: 'platos', description: 'Arroz salteado al wok con pollo, tortilla y sillao.' },
    { id: 'p3', name: 'Lomo Saltado', price: 39, category: 'platos', description: 'Lomo fino salteado con papas crocantes y arroz.' },
    { id: 'p4', name: 'Arroz con mariscos', price: 42, category: 'platos', description: 'Arroz cremoso con mix de mariscos y culantro.' },
    { id: 'p5', name: 'Pulpo a la parrilla', price: 58, category: 'platos', description: 'Pulpo grillado con pure de papas nativas.' },
    { id: 'b1', name: 'Pisco Sour', price: 15, category: 'bebidas', description: 'Coctel clasico con pisco, limon y clara.' },
    { id: 'b2', name: 'Chicha morada', price: 8, category: 'bebidas', description: 'Bebida tradicional de maiz morado y frutas.' },
    { id: 'b3', name: 'Limonada de hierbabuena', price: 10, category: 'bebidas', description: 'Refrescante y ligera, preparada al momento.' },
    { id: 'b4', name: 'Copa de vino', price: 22, category: 'bebidas', description: 'Seleccion de la casa para maridar con la carta.' },
    { id: 'b5', name: 'Cafe pasado', price: 9, category: 'bebidas', description: 'Cafe suave de origen peruano.' }
  ];

  const clientesFacturacion = {
    '45871236': {
      nombre: 'Mariana Lopez Torres',
      documento: '45871236',
      direccion: 'Av. Primavera 245, Surco'
    },
    '10458712361': {
      nombre: 'Inversiones Gastronomicas Andinas S.A.C.',
      documento: '10458712361',
      direccion: 'Jr. Los Olivos 580, Miraflores'
    },
    '72145689': {
      nombre: 'Carlos Mendoza Rios',
      documento: '72145689',
      direccion: 'Calle Los Ficus 113, San Borja'
    },
    '20605487991': {
      nombre: 'Comercial Del Puerto E.I.R.L.',
      documento: '20605487991',
      direccion: 'Av. La Marina 890, Callao'
    }
  };

  function readRegisteredClients() {
    try {
      const stored = JSON.parse(localStorage.getItem(CLIENTS_STORAGE_KEY) || '[]');
      return Array.isArray(stored) ? stored : [];
    } catch (error) {
      return [];
    }
  }

  function writeRegisteredClients(clients) {
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
  }

  function registerBilledClientVisit(tipoComprobante, cliente) {
    if (!cliente || !cliente.documento) return;
    if (!['boleta', 'factura'].includes(tipoComprobante)) return;

    const now = new Date();
    const storedClients = readRegisteredClients();
    const existingIndex = storedClients.findIndex((item) => item.documento === cliente.documento);
    const visitDate = now.toISOString();

    if (existingIndex >= 0) {
      storedClients[existingIndex] = {
        ...storedClients[existingIndex],
        nombre: cliente.nombre || storedClients[existingIndex].nombre,
        documento: cliente.documento,
        estado: 'Activo',
        visitas: (storedClients[existingIndex].visitas || 0) + 1,
        ultimaVisita: visitDate,
        origen: 'Facturacion'
      };
    } else {
      storedClients.unshift({
        id: `c${Date.now()}`,
        nombre: cliente.nombre || 'Cliente facturado',
        telefono: '',
        correo: '',
        documento: cliente.documento,
        visitas: 1,
        ultimaVisita: visitDate,
        estado: 'Activo',
        origen: 'Facturacion'
      });
    }

    writeRegisteredClients(storedClients);
  }

  let selectedMesa = null;
  let selectedAmbienteId = null;
  let currentAmbienteName = '';
  let currentMesaReference = '';
  let currentWaiterName = '';
  let pedido = [];
  let selectedVentaId = null;
  let currentTotal = 0;
  let currentSubtotal = 0;
  let currentIgv = 0;
  let selectedBillingLineId = '';
  let selectedPayment = 'efectivo';
  let cajaAbierta = false;
  let montoInicialCaja = 0;
  let movimientos = [];
  let ventasCobradasCaja = [];
  let productosEliminados = [];
  let modalType = 'ingreso';
  let selectedProduct = null;
  let currentVentaId = null;
  let currentOrderMode = 'salon';
  let currentTakeawayMode = 'Recojo en tienda';

  const viewHistorial = document.getElementById('view-historial');
  const viewMesas = document.getElementById('view-mesas');
  const viewCaja = document.getElementById('view-caja');
  const viewCheckout = document.getElementById('view-checkout');
  const viewApertura = document.getElementById('view-apertura');
  const viewCajaTurno = document.getElementById('view-caja-turno');

  const tabHistorial = document.getElementById('tab-historial');
  const tabCaja = document.getElementById('tab-caja');

  const historialTbody = document.getElementById('historial-tbody');
  const historialSearch = document.getElementById('historial-search');
  const historialStatus = document.getElementById('historial-status');
  const historialRange = document.getElementById('historial-range');
  const btnLimpiarHistorial = document.getElementById('btn-limpiar-historial');
  const btnParaLlevar = document.getElementById('btn-para-llevar');
  const btnNuevaVenta = document.getElementById('btn-nueva-venta');
  const ventaDetail = document.getElementById('venta-detail');
  const ventaDetailContent = document.getElementById('venta-detail-content');
  const ventaDetailClose = document.getElementById('venta-detail-close');
  const btnCerrarVenta = document.getElementById('btn-cerrar-venta');

  const mesasGrid = document.getElementById('mesas-grid');
  const ambienteSelector = document.getElementById('ambiente-selector');
  const detailName = document.getElementById('detail-name');
  const detailStatus = document.getElementById('detail-status');
  const detailWaiter = document.getElementById('detail-waiter');
  const btnIniciar = document.getElementById('btn-iniciar-pedido');
  const btnVolverHistorial = document.getElementById('btn-volver-historial');
  const btnVolverMesas = document.getElementById('btn-volver-mesas');

  const productosGrid = document.getElementById('productos-grid');
  const pedidoItems = document.getElementById('pedido-items');
  const pedidoTotal = document.getElementById('pedido-total-valor');
  const pedidoMesa = document.getElementById('pedido-mesa');
  const pedidoMozo = document.getElementById('pedido-mozo');
  const searchInput = document.getElementById('search-producto');
  const filterCat = document.getElementById('filter-categoria');
  const btnLimpiar = document.getElementById('btn-limpiar');
  const btnEnviar = document.getElementById('btn-enviar-cocina');
  const productosSubtitle = document.getElementById('productos-subtitle');

  const checkoutItems = document.getElementById('checkout-items');
  const checkoutSubtotal = document.getElementById('checkout-subtotal');
  const checkoutIgv = document.getElementById('checkout-igv');
  const checkoutTotal = document.getElementById('checkout-total');
  const btnEliminarProducto = document.getElementById('btn-eliminar-producto');
  const btnAgregarProducto = document.getElementById('btn-agregar-producto');
  const btnCerrarCuenta = document.getElementById('btn-cerrar-cuenta');
  const btnComprobante = document.getElementById('btn-comprobante');
  const btnEmitirComprobante = document.getElementById('btn-emitir-comprobante');
  const btnCancelar = document.getElementById('btn-cancelar-checkout');

  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalMonto = document.getElementById('modal-monto');
  const modalDesc = document.getElementById('modal-desc');
  const egresoProductMode = document.getElementById('egreso-product-mode');
  const egresoProductSearch = document.getElementById('egreso-product-search');
  const egresoProductList = document.getElementById('egreso-product-list');
  const egresoProductManual = document.getElementById('egreso-product-manual');
  const egresoProductUnit = document.getElementById('egreso-product-unit');
  const egresoProductQuantity = document.getElementById('egreso-product-quantity');
  const egresoInventoryField = document.getElementById('egreso-inventory-field');
  const egresoManualField = document.getElementById('egreso-manual-field');
  const egresoFields = Array.from(document.querySelectorAll('.modal-egreso-field'));
  const modalConfirm = document.getElementById('modal-confirm');
  const modalCancel = document.getElementById('modal-cancel');

  const productModalOverlay = document.getElementById('product-modal-overlay');
  const productModalName = document.getElementById('product-modal-name');
  const productModalQuantity = document.getElementById('product-modal-quantity');
  const productModalNote = document.getElementById('product-modal-note');
  const productModalConfirm = document.getElementById('product-modal-confirm');
  const productModalCancel = document.getElementById('product-modal-cancel');
  const takeawayModalOverlay = document.getElementById('takeaway-modal-overlay');
  const takeawayModalCancel = document.getElementById('takeaway-modal-cancel');
  const takeawayOptions = Array.from(document.querySelectorAll('.takeaway-option'));

  const deleteProductModalOverlay = document.getElementById('delete-product-modal-overlay');
  const deleteProductSelect = document.getElementById('delete-product-select');
  const deleteProductReason = document.getElementById('delete-product-reason');
  const btnDeleteProductConfirm = document.getElementById('btn-delete-product-confirm');
  const btnDeleteProductCancel = document.getElementById('btn-delete-product-cancel');

  const paymentModalOverlay = document.getElementById('payment-modal-overlay');
  const paymentSubtotal = document.getElementById('payment-subtotal');
  const paymentIgv = document.getElementById('payment-igv');
  const paymentTip = document.getElementById('payment-tip');
  const paymentGrandTotal = document.getElementById('payment-grand-total');
  const paymentRemaining = document.getElementById('payment-remaining');
  const paymentLines = document.getElementById('payment-lines');
  const btnAddPaymentLine = document.getElementById('btn-add-payment-line');
  const btnConfirmarCobro = document.getElementById('btn-confirmar-cobro');
  const btnCancelarCobro = document.getElementById('btn-cancelar-cobro');

  const billingModalOverlay = document.getElementById('billing-modal-overlay');
  const billingSplitLines = document.getElementById('billing-split-lines');
  const btnAddBillingSplit = document.getElementById('btn-add-billing-split');
  const billingSubtotal = document.getElementById('billing-subtotal');
  const billingIgv = document.getElementById('billing-igv');
  const billingTotal = document.getElementById('billing-total');
  const billingRemaining = document.getElementById('billing-remaining');
  const billingCloseRemaining = document.getElementById('billing-close-remaining');
  const btnBillingConfirm = document.getElementById('btn-billing-confirm');
  const btnBillingCancel = document.getElementById('btn-billing-cancel');
  const closeCajaModalOverlay = document.getElementById('close-caja-modal-overlay');
  const btnConfirmCloseCaja = document.getElementById('btn-confirm-close-caja');
  const btnCancelCloseCaja = document.getElementById('btn-cancel-close-caja');

  function formatCurrency(value) {
    return `S/ ${Number(value).toFixed(2)}`;
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }


  function populateEgresoProductList() {
    egresoProductList.innerHTML = cajaInventoryItems.map((item) => (
      `<option value="${item.nombre}"></option>`
    )).join('');
  }

  function getSelectedEgresoInventoryItem() {
    const term = egresoProductSearch.value.trim().toLowerCase();
    return cajaInventoryItems.find((item) => item.nombre.toLowerCase() === term) || null;
  }

  function updateEgresoProductMode() {
    const isOther = egresoProductMode.value === 'otros';
    egresoInventoryField.classList.toggle('hidden', isOther);
    egresoManualField.classList.toggle('hidden', !isOther);
    egresoProductSearch.required = !isOther;
    egresoProductManual.required = isOther;

    if (isOther) {
      egresoProductUnit.disabled = false;
      egresoProductSearch.value = '';
      return;
    }

    egresoProductManual.value = '';
    const selectedItem = getSelectedEgresoInventoryItem();
    egresoProductUnit.disabled = true;
    egresoProductUnit.value = selectedItem ? selectedItem.unidad : 'kg';
  }

  function resetMovimientoModal(type) {
    modalMonto.value = '';
    modalDesc.value = '';
    egresoProductMode.value = 'inventario';
    egresoProductSearch.value = '';
    egresoProductManual.value = '';
    egresoProductUnit.value = 'kg';
    egresoProductQuantity.value = '';
    egresoFields.forEach((field) => field.classList.toggle('hidden', type !== 'egreso'));
    if (type === 'egreso') updateEgresoProductMode();
  }

  function getEgresoProductPayload() {
    if (modalType !== 'egreso') return null;
    const isOther = egresoProductMode.value === 'otros';
    const inventoryItem = isOther ? null : getSelectedEgresoInventoryItem();
    const productName = isOther ? egresoProductManual.value.trim() : (inventoryItem ? inventoryItem.nombre : egresoProductSearch.value.trim());
    const unit = egresoProductUnit.value;
    const quantity = parseFloat(egresoProductQuantity.value) || 0;

    return {
      source: isOther ? 'otros' : 'inventario',
      inventoryId: inventoryItem ? inventoryItem.id : null,
      productName,
      unit,
      quantity
    };
  }

  function buildEgresoDescription(product) {
    if (!product || !product.productName) return modalDesc.value.trim() || 'Egreso registrado';
    const quantityLabel = product.quantity > 0 ? ` - ${product.quantity} ${product.unit}` : ` - ${product.unit}`;
    const base = `${product.productName}${quantityLabel}`;
    const description = modalDesc.value.trim();
    return [base, description].filter(Boolean).join(' | ');
  }
  function getActiveWaiterName() {
    const profile = typeof getCurrentUserProfile === 'function' ? getCurrentUserProfile() : {};
    return profile.nombre || profile.usuario || 'Mozo de turno';
  }

  function getMesaActiveVenta(mesa) {
    return ventasData.find((venta) => {
      if (venta.estado !== 'En proceso' || venta.mesa === 'Para llevar') return false;
      const sameMesa = venta.mesa === mesa.name || normalizeMesaCode(venta.mesa) === normalizeMesaCode(mesa.name);
      const sameAmbiente = !venta.ambiente || venta.ambiente === mesa.ambienteName;
      return sameMesa && sameAmbiente;
    });
  }

  function getMesaWaiterName(mesa) {
    const activeVenta = getMesaActiveVenta(mesa);
    return activeVenta?.mozo || '';
  }

  function setWaiterLabel(element, waiterName) {
    if (!element) return;
    element.textContent = waiterName ? `Mozo: ${waiterName}` : 'Mozo: -';
  }
  function getPedidoSubtotal(items = pedido) {
    return items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  }

  function getNextVentaId() {
    const maxId = ventasData.reduce((max, venta) => {
      const numeric = parseInt(String(venta.id).replace(/\D/g, ''), 10) || 0;
      return Math.max(max, numeric);
    }, 1000);
    return `#MK${maxId + 1}`;
  }

  function normalizeMesaCode(rawMesa) {
    const mesa = String(rawMesa || '').trim();
    if (/^M-\d+$/i.test(mesa)) {
      return mesa.toUpperCase();
    }
    const match = mesa.match(/(\d+)/);
    if (match) {
      return `M-${String(match[1]).padStart(2, '0')}`;
    }
    return mesa;
  }

  function buildVentaItemsFromPedido() {
    return pedido.map((item) => ({
      nombre: item.name,
      cantidad: item.qty,
      precio: item.price,
      nota: item.note || ''
    }));
  }

  function loadPedidoFromVenta(venta) {
    pedido = venta.items.map((item, index) => ({
      id: `${venta.id}-${index}`,
      name: item.nombre,
      price: item.precio,
      qty: item.cantidad,
      note: item.nota || ''
    }));
    currentOrderMode = venta.mesa === 'Para llevar' ? 'llevar' : 'salon';
    currentTakeawayMode = venta.canal || 'Recojo en tienda';
    currentAmbienteName = venta.ambiente || '';
    currentMesaReference = venta.mesa || '';
    currentWaiterName = venta.mozo || getActiveWaiterName();
    pedidoMesa.textContent = venta.mesa === 'Para llevar'
      ? `Pedido para llevar - ${currentTakeawayMode}`
      : (venta.ambiente ? `${venta.ambiente} - ${venta.mesa}` : `Mesa ${venta.mesa}`);
    currentVentaId = venta.id;
    setWaiterLabel(pedidoMozo, currentWaiterName);
    renderPedido();
  }

  function getPedidoReference() {
    return currentOrderMode === 'llevar'
      ? 'Para llevar'
      : (currentMesaReference || normalizeMesaCode(pedidoMesa.textContent));
  }

  function syncVentaFromPedido() {
    const subtotal = getPedidoSubtotal();
    const now = new Date();
    const ventaPayload = {
      mesa: getPedidoReference(),
      canal: currentOrderMode === 'llevar' ? currentTakeawayMode : 'Salon',
      ambiente: currentOrderMode === 'llevar' ? '' : currentAmbienteName,
      mozo: currentWaiterName || getActiveWaiterName(),
      total: subtotal,
      estado: 'En proceso',
      fecha: `${now.toLocaleDateString('es-PE')} ${now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}`,
      comensales: 2,
      items: buildVentaItemsFromPedido()
    };

    if (currentVentaId) {
      const existingVenta = ventasData.find((venta) => venta.id === currentVentaId);
      if (existingVenta) {
        Object.assign(existingVenta, ventaPayload);
        return existingVenta;
      }
    }

    const nuevaVenta = {
      id: getNextVentaId(),
      ...ventaPayload
    };
    ventasData.unshift(nuevaVenta);
    currentVentaId = nuevaVenta.id;
    return nuevaVenta;
  }

  function openCheckoutForVenta(venta) {
    loadPedidoFromVenta(venta);
    hideAllViews();
    viewCheckout.classList.remove('hidden');
    renderCheckout();
  }

  function getPaymentMethodsOptions() {
    return `
      <option value="Efectivo">Efectivo</option>
      <option value="Tarjeta">Tarjeta</option>
      <option value="Transferencia">Transferencia</option>
      <option value="Yape">Yape</option>
      <option value="Plin">Plin</option>
    `;
  }

  function getTipValue() {
    return parseFloat(paymentTip.value.replace(/[^0-9.]/g, '')) || 0;
  }

  function getPaymentGrandTotalValue() {
    return currentSubtotal + currentIgv + getTipValue();
  }

  function getAssignedPaymentsTotal() {
    return Array.from(paymentLines.querySelectorAll('.payment-line__amount')).reduce((sum, input) => {
      return sum + (parseFloat(input.value.replace(/[^0-9.]/g, '')) || 0);
    }, 0);
  }

  function updatePaymentSummary() {
    const totalFinal = getPaymentGrandTotalValue();
    const assigned = getAssignedPaymentsTotal();
    const remaining = Math.max(0, totalFinal - assigned);
    paymentGrandTotal.textContent = formatCurrency(totalFinal);
    paymentRemaining.textContent = formatCurrency(remaining);
    btnConfirmarCobro.disabled = totalFinal <= 0 || Math.abs(totalFinal - assigned) > 0.009;
  }

  function bindPaymentLineEvents(line) {
    const amountInput = line.querySelector('.payment-line__amount');
    const removeButton = line.querySelector('.payment-line__remove');
    amountInput.addEventListener('input', updatePaymentSummary);
    removeButton.addEventListener('click', () => {
      if (paymentLines.children.length === 1) {
        amountInput.value = '';
        line.querySelector('.payment-line__method').value = 'Efectivo';
      } else {
        line.remove();
      }
      updatePaymentSummary();
    });
  }

  function addPaymentLine(method = 'Efectivo', amount = '') {
    const line = document.createElement('div');
    line.className = 'payment-line';
    line.innerHTML = `
      <select class="payment-line__method">${getPaymentMethodsOptions()}</select>
      <input type="text" class="payment-input payment-line__amount" placeholder="S/ 0.00" value="${amount}">
      <button type="button" class="btn-limpiar payment-line__remove">Quitar</button>
    `;
    line.querySelector('.payment-line__method').value = method;
    paymentLines.appendChild(line);
    bindPaymentLineEvents(line);
    updatePaymentSummary();
  }

  function openPaymentModal() {
    paymentSubtotal.textContent = formatCurrency(currentSubtotal);
    paymentIgv.textContent = formatCurrency(currentIgv);
    paymentTip.value = '';
    paymentLines.innerHTML = '';
    addPaymentLine('Efectivo', Number(currentTotal).toFixed(2));
    paymentModalOverlay.classList.remove('hidden');
    updatePaymentSummary();
  }

  function getBillingTypeOptions() {
    return `
      <option value="nota_venta">Nota de venta</option>
      <option value="boleta">Boleta</option>
      <option value="factura">Factura</option>
    `;
  }

  function getBillingIgvRate() {
    return currentSubtotal > 0 ? currentIgv / currentSubtotal : 0;
  }

  function parseMoneyInput(input) {
    return parseFloat(input.value.replace(/[^0-9.]/g, '')) || 0;
  }

  function getBillingLineValues(line) {
    const subtotal = parseMoneyInput(line.querySelector('.billing-split__subtotal'));
    const igv = subtotal * getBillingIgvRate();
    const total = subtotal + igv;
    return { subtotal, igv, total };
  }

  function getBillingAssignedTotal() {
    return Array.from(billingSplitLines.querySelectorAll('.billing-split-line')).reduce((sum, line) => {
      return sum + getBillingLineValues(line).total;
    }, 0);
  }

  function getBillingGeneratedTotal() {
    return Array.from(billingSplitLines.querySelectorAll('.billing-split-line.generated')).reduce((sum, line) => {
      return sum + (parseFloat(line.dataset.generatedTotal) || 0);
    }, 0);
  }

  function getSelectedBillingLine() {
    return selectedBillingLineId ? billingSplitLines.querySelector(`[data-billing-line-id="${selectedBillingLineId}"]`) : null;
  }

  function updateBillingLineDetails(line) {
    const values = getBillingLineValues(line);
    line.querySelector('.billing-split__igv').textContent = formatCurrency(values.igv);
    line.querySelector('.billing-split__total').textContent = formatCurrency(values.total);
    line.dataset.total = values.total.toFixed(2);
  }

  function updateBillingSummary() {
    Array.from(billingSplitLines.querySelectorAll('.billing-split-line')).forEach(updateBillingLineDetails);
    const assigned = getBillingAssignedTotal();
    const generated = getBillingGeneratedTotal();
    const selectedLine = getSelectedBillingLine();
    const selectedValues = selectedLine ? getBillingLineValues(selectedLine) : { total: 0 };
    const remaining = currentTotal - assigned;
    const closeRemaining = Math.max(0, currentTotal - generated);

    billingSubtotal.textContent = formatCurrency(currentSubtotal);
    billingIgv.textContent = formatCurrency(currentIgv);
    billingTotal.textContent = formatCurrency(currentTotal);
    billingRemaining.textContent = formatCurrency(remaining);
    billingCloseRemaining.textContent = formatCurrency(closeRemaining);
    btnBillingConfirm.disabled = !selectedLine || selectedLine.classList.contains('generated') || selectedValues.total <= 0;
  }

  function selectBillingLine(line) {
    selectedBillingLineId = line.dataset.billingLineId;
    Array.from(billingSplitLines.querySelectorAll('.billing-split-line')).forEach((item) => {
      item.classList.toggle('selected', item === line);
    });
    updateBillingSummary();
  }

  function fillBillingLineClient(line, cliente, documento = '') {
    line.dataset.clientName = cliente?.nombre || '';
    line.dataset.clientDocument = cliente?.documento || documento;
    line.dataset.clientAddress = cliente?.direccion || '';
    line.querySelector('.billing-split__client').textContent = cliente?.nombre || (documento ? 'Cliente no encontrado' : 'Cliente: -');
  }

  function bindBillingSplitEvents(line) {
    const documentInput = line.querySelector('.billing-split__document');
    const subtotalInput = line.querySelector('.billing-split__subtotal');
    const searchButton = line.querySelector('.billing-split__search');
    const removeButton = line.querySelector('.billing-split__remove');

    line.addEventListener('click', (event) => {
      if (event.target.closest('.billing-split__remove')) return;
      selectBillingLine(line);
    });
    subtotalInput.addEventListener('input', updateBillingSummary);
    documentInput.addEventListener('input', () => fillBillingLineClient(line, null, documentInput.value.trim()));
    searchButton.addEventListener('click', () => {
      const documento = documentInput.value.trim();
      fillBillingLineClient(line, clientesFacturacion[documento] || null, documento);
      selectBillingLine(line);
    });
    removeButton.addEventListener('click', () => {
      if (line.classList.contains('generated')) return;
      if (billingSplitLines.children.length === 1) {
        line.querySelector('.billing-split__type').value = 'nota_venta';
        documentInput.value = '';
        subtotalInput.value = Number(currentSubtotal).toFixed(2);
        fillBillingLineClient(line, null);
        selectBillingLine(line);
      } else {
        const wasSelected = selectedBillingLineId === line.dataset.billingLineId;
        line.remove();
        if (wasSelected) {
          const nextLine = billingSplitLines.querySelector('.billing-split-line:not(.generated)') || billingSplitLines.querySelector('.billing-split-line');
          if (nextLine) selectBillingLine(nextLine);
        }
      }
      updateBillingSummary();
    });
  }

  function addBillingSplitLine(subtotal = '') {
    const line = document.createElement('div');
    line.className = 'billing-split-line';
    line.dataset.billingLineId = `billing-${Date.now()}-${billingSplitLines.children.length}`;
    line.innerHTML = `
      <select class="payment-line__method billing-split__type">${getBillingTypeOptions()}</select>
      <input type="text" class="payment-input billing-split__document" placeholder="DNI / RUC">
      <button type="button" class="btn-limpiar billing-split__search">Buscar</button>
      <input type="text" class="payment-input billing-split__subtotal" placeholder="Consumo sin IGV" value="${subtotal}">
      <div class="billing-split__detail"><span>IGV</span><strong class="billing-split__igv">S/ 0.00</strong></div>
      <div class="billing-split__detail"><span>Total</span><strong class="billing-split__total">S/ 0.00</strong></div>
      <span class="billing-split__client">Cliente: -</span>
      <span class="billing-split__status">Pendiente</span>
      <button type="button" class="btn-limpiar billing-split__remove">Quitar</button>
    `;
    billingSplitLines.appendChild(line);
    bindBillingSplitEvents(line);
    selectBillingLine(line);
    updateBillingSummary();
  }

  function getBillingLinePayload(line) {
    const documento = line.querySelector('.billing-split__document').value.trim();
    const values = getBillingLineValues(line);
    return {
      tipo: line.querySelector('.billing-split__type').value,
      documento,
      nombre: line.dataset.clientName || (documento ? 'Cliente facturado' : ''),
      direccion: line.dataset.clientAddress || '',
      subtotal: values.subtotal,
      igv: values.igv,
      monto: values.total
    };
  }

  function openBillingModal() {
    selectedBillingLineId = '';
    billingSplitLines.innerHTML = '';
    addBillingSplitLine(Number(currentSubtotal).toFixed(2));
    updateBillingSummary();
    billingModalOverlay.classList.remove('hidden');
  }
  function getCajaMetrics() {
    let totalVendido = 0;
    let totalEfectivo = 0;
    let totalTarjeta = 0;
    let totalTransferencia = 0;
    let totalYape = 0;
    let totalPlin = 0;
    let totalIngresos = 0;
    let totalEgresos = 0;

    movimientos.forEach((movimiento) => {
      if (movimiento.tipo === 'venta') {
        totalVendido += movimiento.monto;
        if (movimiento.metodo === 'Efectivo') totalEfectivo += movimiento.monto;
        if (movimiento.metodo === 'Tarjeta') totalTarjeta += movimiento.monto;
        if (movimiento.metodo === 'Transferencia') totalTransferencia += movimiento.monto;
        if (movimiento.metodo === 'Yape') totalYape += movimiento.monto;
        if (movimiento.metodo === 'Plin') totalPlin += movimiento.monto;
      }
      if (movimiento.tipo === 'ingreso') totalIngresos += movimiento.monto;
      if (movimiento.tipo === 'egreso') totalEgresos += Math.abs(movimiento.monto);
    });

    return {
      totalVendido,
      totalEfectivo,
      totalTarjeta,
      totalTransferencia,
      totalYape,
      totalPlin,
      totalIngresos,
      totalEgresos,
      totalEsperado: montoInicialCaja + totalIngresos - totalEgresos,
      efectivoFinal: montoInicialCaja + totalIngresos + totalEfectivo - totalEgresos
    };
  }

  function openCloseCajaModal() {
    closeCajaModalOverlay.classList.remove('hidden');
  }

  function buildReportSection(title, bodyHtml) {
    return `
      <section class="ticket-section">
        <h3>${escapeHtml(title)}</h3>
        ${bodyHtml}
      </section>
    `;
  }

  function buildVentasReport() {
    const aggregate = new Map();
    const bebidas = ['pisco', 'chicha', 'limonada', 'vino', 'cafe'];

    ventasCobradasCaja.forEach((venta) => {
      venta.items.forEach((item) => {
        const existing = aggregate.get(item.nombre) || {
          nombre: item.nombre,
          categoria: bebidas.some((keyword) => item.nombre.toLowerCase().includes(keyword)) ? 'Bebida' : 'Plato',
          cantidad: 0,
          total: 0
        };
        existing.cantidad += item.cantidad;
        existing.total += item.cantidad * item.precio;
        aggregate.set(item.nombre, existing);
      });
    });

    if (!aggregate.size) {
      return buildReportSection('Productos vendidos', '<p>No hay productos cobrados en esta caja.</p>');
    }

    const rows = Array.from(aggregate.values()).map((item) => `
      <tr>
        <td>${escapeHtml(item.nombre)}</td>
        <td>${escapeHtml(item.categoria)}</td>
        <td>${item.cantidad}</td>
        <td>${formatCurrency(item.total)}</td>
      </tr>
    `).join('');

    return buildReportSection('Productos vendidos', `
      <table class="ticket-table">
        <thead><tr><th>Producto</th><th>Tipo</th><th>Cant.</th><th>Total</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `);
  }

  function buildDeletedProductsReport() {
    if (!productosEliminados.length) {
      return buildReportSection('Productos eliminados', '<p>No se registraron productos eliminados.</p>');
    }

    const rows = productosEliminados.map((item) => `
      <tr>
        <td>${escapeHtml(item.hora)}</td>
        <td>${escapeHtml(item.mesa)}</td>
        <td>${escapeHtml(item.nombre)} x${item.cantidad}</td>
        <td>${escapeHtml(item.motivo)}</td>
      </tr>
    `).join('');

    return buildReportSection('Productos eliminados', `
      <table class="ticket-table">
        <thead><tr><th>Hora</th><th>Mesa</th><th>Producto</th><th>Motivo</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `);
  }

  function buildMovementsReport(tipo) {
    const title = tipo === 'ingreso' ? 'Ingresos' : 'Egresos';
    const filtered = movimientos.filter((movimiento) => movimiento.tipo === tipo);

    if (!filtered.length) {
      return buildReportSection(title, `<p>No hay ${title.toLowerCase()} registrados.</p>`);
    }

    const rows = filtered.map((movimiento) => `
      <tr>
        <td>${escapeHtml(movimiento.hora)}</td>
        <td>${escapeHtml(movimiento.descripcion || '-')}</td>
        <td>${formatCurrency(Math.abs(movimiento.monto))}</td>
        <td>${escapeHtml(movimiento.usuario)}</td>
      </tr>
    `).join('');

    return buildReportSection(title, `
      <table class="ticket-table">
        <thead><tr><th>Hora</th><th>Detalle</th><th>Monto</th><th>Usuario</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `);
  }

  function buildPaymentMethodsReport(metrics) {
    return buildReportSection('Resumen metodos de cobro', `
      <table class="ticket-table">
        <tbody>
          <tr><td>Efectivo</td><td>${formatCurrency(metrics.totalEfectivo)}</td></tr>
          <tr><td>Tarjeta</td><td>${formatCurrency(metrics.totalTarjeta)}</td></tr>
          <tr><td>Transferencia</td><td>${formatCurrency(metrics.totalTransferencia)}</td></tr>
          <tr><td>Yape</td><td>${formatCurrency(metrics.totalYape)}</td></tr>
          <tr><td>Plin</td><td>${formatCurrency(metrics.totalPlin)}</td></tr>
          <tr><td>Total vendido</td><td>${formatCurrency(metrics.totalVendido)}</td></tr>
        </tbody>
      </table>
    `);
  }

  function buildCashFinalReport(metrics) {
    return buildReportSection('Calculo de efectivo final', `
      <table class="ticket-table">
        <tbody>
          <tr><td>Monto inicial</td><td>${formatCurrency(montoInicialCaja)}</td></tr>
          <tr><td>Ingresos</td><td>${formatCurrency(metrics.totalIngresos)}</td></tr>
          <tr><td>Egresos</td><td>${formatCurrency(metrics.totalEgresos)}</td></tr>
          <tr><td>Ventas en efectivo</td><td>${formatCurrency(metrics.totalEfectivo)}</td></tr>
          <tr><td>Efectivo final estimado</td><td>${formatCurrency(metrics.efectivoFinal)}</td></tr>
          <tr><td>Total esperado sin ventas</td><td>${formatCurrency(metrics.totalEsperado)}</td></tr>
        </tbody>
      </table>
    `);
  }

  function printCloseCajaReports(selectedReports) {
    const metrics = getCajaMetrics();
    const sections = [];

    if (selectedReports.includes('productosVendidos')) sections.push(buildVentasReport());
    if (selectedReports.includes('productosEliminados')) sections.push(buildDeletedProductsReport());
    if (selectedReports.includes('ingresos')) sections.push(buildMovementsReport('ingreso'));
    if (selectedReports.includes('egresos')) sections.push(buildMovementsReport('egreso'));
    if (selectedReports.includes('metodosCobro')) sections.push(buildPaymentMethodsReport(metrics));
    if (selectedReports.includes('efectivoFinal')) sections.push(buildCashFinalReport(metrics));

    const printWindow = window.open('', '_blank', 'width=420,height=720');
    if (!printWindow) {
      window.alert('No se pudo abrir la vista de impresion. Revisa si el navegador bloqueo la ventana.');
      return false;
    }

    const now = new Date();
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Cierre de caja</title>
        <style>
          body { font-family: Inter, Arial, sans-serif; padding: 16px; color: #111; }
          .ticket-header { text-align: center; margin-bottom: 16px; }
          .ticket-header h1 { font-size: 18px; margin: 0 0 6px; }
          .ticket-header p { margin: 0; font-size: 12px; color: #555; }
          .ticket-section { margin-bottom: 18px; }
          .ticket-section h3 { font-size: 14px; margin: 0 0 8px; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
          .ticket-section p { font-size: 12px; margin: 0; }
          .ticket-table { width: 100%; border-collapse: collapse; font-size: 12px; }
          .ticket-table th, .ticket-table td { text-align: left; padding: 4px 0; border-bottom: 1px dotted #ddd; vertical-align: top; }
          .ticket-table th:last-child, .ticket-table td:last-child { text-align: right; }
        </style>
      </head>
      <body>
        <div class="ticket-header">
          <h1>Cierre de caja</h1>
          <p>Mukialom Restaurante</p>
          <p>${escapeHtml(now.toLocaleDateString('es-PE'))} ${escapeHtml(now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }))}</p>
        </div>
        ${sections.join('')}
        <script>
          window.onload = function () {
            window.print();
          };
        <\/script>
      </body>
      </html>
    `);
    printWindow.document.close();
    return true;
  }

  function openDeleteProductModal() {
    deleteProductSelect.innerHTML = '';

    pedido.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = `${item.name} x${item.qty} - ${formatCurrency(item.price * item.qty)}`;
      deleteProductSelect.appendChild(option);
    });

    deleteProductReason.value = '';
    deleteProductModalOverlay.classList.remove('hidden');
  }

  function removeCurrentVentaIfEmpty() {
    if (pedido.length || !currentVentaId) return;

    const ventaIndex = ventasData.findIndex((venta) => venta.id === currentVentaId);
    if (ventaIndex >= 0) {
      ventasData.splice(ventaIndex, 1);
    }

    if (selectedVentaId === currentVentaId) {
      selectedVentaId = null;
      ventaDetail.classList.add('hidden');
    }

    currentVentaId = null;
    renderHistorial();
  }

  function hideAllViews() {
    [viewHistorial, viewMesas, viewCaja, viewCheckout, viewApertura, viewCajaTurno].forEach((view) => view.classList.add('hidden'));
  }

  function showHistorial() {
    hideAllViews();
    viewHistorial.classList.remove('hidden');
  }

  function getFilteredVentas() {
    const term = historialSearch.value.trim().toLowerCase();
    const status = historialStatus.value;

    return ventasData.filter((venta) => {
      const locationLabel = getVentaLocationLabel(venta).toLowerCase();
      const matchesTerm = !term || venta.id.toLowerCase().includes(term) || locationLabel.includes(term);
      const matchesStatus = !status || venta.estado === status;
      return matchesTerm && matchesStatus;
    });
  }

  function getVentaLocationLabel(venta) {
    if (venta.mesa === 'Para llevar') return 'Para llevar';
    return venta.ambiente ? `${venta.ambiente} - ${venta.mesa}` : venta.mesa;
  }

  function renderVentaDetail(venta) {
    const subtotal = venta.items.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);
    const isTakeaway = venta.mesa === 'Para llevar';
    const locationLabel = getVentaLocationLabel(venta);
    const headerLabel = isTakeaway ? 'Pedido para llevar' : locationLabel;
    const itemsHtml = venta.items.map((item) => `
      <div class="venta-detail__item">
        <div>
          <strong>${item.nombre}</strong>
          ${item.nota ? `<p class="venta-detail__note">${item.nota}</p>` : ''}
        </div>
        <span>${item.cantidad} x ${formatCurrency(item.precio)}</span>
      </div>
    `).join('');

    ventaDetailContent.innerHTML = `
      <div class="venta-detail__summary">
        <h4>${venta.id} - ${headerLabel}</h4>
        <p>${isTakeaway ? 'Tipo de pedido' : 'Mesa'}: ${isTakeaway ? 'Para llevar' : locationLabel}</p>
        ${isTakeaway ? `<p>Canal: ${venta.canal || 'Recojo en tienda'}</p>` : ''}
        ${venta.mozo ? `<p>Mozo: ${escapeHtml(venta.mozo)}</p>` : ''}
        <p>Comensales: ${venta.comensales}</p>
        <p>Estado: ${venta.estado}</p>
      </div>
      <div class="venta-detail__items">${itemsHtml}</div>
      <div class="venta-detail__totals">
        <div><span>Subtotal:</span><span>${formatCurrency(subtotal)}</span></div>
        <div class="venta-detail__total"><span>Total:</span><span>${formatCurrency(venta.total)}</span></div>
      </div>
    `;

    btnCerrarVenta.disabled = venta.estado !== 'En proceso';
    ventaDetail.classList.remove('hidden');
  }

  function renderHistorial() {
    const ventas = getFilteredVentas();
    historialTbody.innerHTML = '';

    ventas.forEach((venta) => {
      const tr = document.createElement('tr');
      const statusClass = venta.estado === 'En proceso' ? 'status-pill--proceso' : 'status-pill--cobrada';
      tr.className = `historial-row${selectedVentaId === venta.id ? ' selected' : ''}`;
      tr.innerHTML = `
        <td>${venta.id}</td>
        <td>${getVentaLocationLabel(venta)}</td>
        <td>${formatCurrency(venta.total)}</td>
        <td>${escapeHtml(venta.mozo || '-')}</td>
        <td><span class="status-pill ${statusClass}">${venta.estado}</span></td>
        <td>${venta.fecha}</td>
      `;
      tr.addEventListener('click', () => {
        selectedVentaId = venta.id;
        renderHistorial();
        renderVentaDetail(venta);
      });
      historialTbody.appendChild(tr);
    });

    if (!ventas.length) {
      const empty = document.createElement('tr');
      empty.innerHTML = '<td colspan="6" class="historial-empty">No se encontraron ventas.</td>';
      historialTbody.appendChild(empty);
    }

    if (!ventas.some((venta) => venta.id === selectedVentaId)) {
      selectedVentaId = null;
      ventaDetail.classList.add('hidden');
    }
  }

  function resetMesaDetail(message = 'Selecciona un ambiente') {
    selectedMesa = null;
    detailName.textContent = message;
    detailStatus.textContent = 'El mapa de mesas aparecera aqui.';
    setWaiterLabel(detailWaiter, '');
    btnIniciar.textContent = 'Iniciar pedido';
    btnIniciar.disabled = true;
  }

  function renderAmbientes() {
    ambienteSelector.innerHTML = '';
    ambientesData.forEach((ambiente) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `ambiente-option${selectedAmbienteId === ambiente.id ? ' active' : ''}`;
      button.textContent = ambiente.name;
      button.addEventListener('click', () => selectAmbiente(ambiente.id));
      ambienteSelector.appendChild(button);
    });
  }

  function renderMesas() {
    mesasGrid.innerHTML = '';

    if (!selectedAmbienteId) {
      mesasGrid.innerHTML = '<div class="mesas-empty">Selecciona un ambiente para ver sus mesas.</div>';
      resetMesaDetail('Selecciona un ambiente');
      return;
    }

    const filteredMesas = mesasData.filter((mesa) => mesa.ambienteId === selectedAmbienteId);
    filteredMesas.forEach((mesa) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `mesa-card mesa-card--square mesa-card--${mesa.status}${selectedMesa && selectedMesa.id === mesa.id ? ' selected' : ''}`;
      card.textContent = mesa.name;
      card.addEventListener('click', () => selectMesa(mesa));
      mesasGrid.appendChild(card);
    });

    if (!filteredMesas.length) {
      mesasGrid.innerHTML = '<div class="mesas-empty">Este ambiente aun no tiene mesas configuradas.</div>';
      resetMesaDetail('Sin mesas');
      return;
    }

    if (!selectedMesa || selectedMesa.ambienteId !== selectedAmbienteId) {
      selectMesa(filteredMesas[0], false);
    }
  }

  function selectAmbiente(ambienteId) {
    selectedAmbienteId = ambienteId;
    selectedMesa = null;
    renderAmbientes();
    renderMesas();
  }

  function selectMesa(mesa, shouldRender = true) {
    selectedMesa = mesa;
    currentAmbienteName = mesa.ambienteName;
    currentMesaReference = mesa.name;
    detailName.textContent = `${mesa.ambienteName} - ${mesa.name}`;
    const statusMap = { libre: 'Libre', ocupada: 'Ocupada', proceso: 'Reservada' };
    detailStatus.innerHTML = `Estado: <span class="dot dot--${mesa.status}"></span> ${statusMap[mesa.status]}`;
    const shouldShowWaiter = ['ocupada', 'proceso'].includes(mesa.status);
    setWaiterLabel(detailWaiter, shouldShowWaiter ? getMesaWaiterName(mesa) : '');
    btnIniciar.textContent = mesa.status === 'ocupada' ? 'Mesa ocupada' : 'Iniciar pedido';
    btnIniciar.disabled = mesa.status === 'ocupada';
    if (shouldRender) renderMesas();
  }

  function openProductModal(producto) {
    selectedProduct = producto;
    productModalName.textContent = `${producto.name} - ${formatCurrency(producto.price)}`;
    productModalQuantity.value = '1';
    productModalNote.value = '';
    productModalOverlay.classList.remove('hidden');
  }

  function renderProductos(filter = '', category = '') {
    productosGrid.innerHTML = '';
    let filtered = productosData;

    if (category) {
      filtered = filtered.filter((producto) => producto.category === category);
    }

    if (filter) {
      filtered = filtered.filter((producto) => {
        const haystack = `${producto.name} ${producto.description}`.toLowerCase();
        return haystack.includes(filter.toLowerCase());
      });
    }

    if (!category) {
      productosSubtitle.textContent = 'Todos los platos y bebidas disponibles';
    } else {
      productosSubtitle.textContent = category === 'platos' ? 'Platos disponibles' : 'Bebidas disponibles';
    }

    filtered.forEach((producto) => {
      const card = document.createElement('article');
      card.className = 'producto-card';
      card.innerHTML = `
        <div class="producto-card__top">
          <h4 class="producto-card__name">${producto.name}</h4>
          <span class="producto-card__price">${formatCurrency(producto.price)}</span>
        </div>
        <p class="producto-card__description">${producto.description}</p>
        <button type="button" class="producto-card__btn">Agregar</button>
      `;
      card.querySelector('.producto-card__btn').addEventListener('click', () => openProductModal(producto));
      productosGrid.appendChild(card);
    });

    if (!filtered.length) {
      productosGrid.innerHTML = '<div class="productos-empty">No hay productos para los filtros seleccionados.</div>';
    }
  }

  function addToPedido(producto, cantidad, nota) {
    pedido.push({
      id: `${producto.id}-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      name: producto.name,
      price: producto.price,
      qty: cantidad,
      note: nota.trim()
    });
    renderPedido();
  }

  function renderPedido() {
    pedidoItems.innerHTML = '';
    let total = 0;

    pedido.forEach((item) => {
      total += item.price * item.qty;
      const row = document.createElement('div');
      row.className = 'pedido-item';
      row.innerHTML = `
        <div class="pedido-item__main">
          <div class="pedido-item__meta">
            <span class="pedido-item__name">${item.name}</span>
            ${item.note ? `<p class="pedido-item__note">${item.note}</p>` : ''}
          </div>
          <span class="pedido-item__price">${formatCurrency(item.price * item.qty)}</span>
        </div>
        <div class="pedido-item__footer">
          <span class="pedido-item__qty">Cantidad: ${item.qty}</span>
          <div class="pedido-item__actions">
            <button type="button" data-action="minus" data-id="${item.id}">-</button>
            <button type="button" data-action="plus" data-id="${item.id}">+</button>
            <button type="button" data-action="remove" data-id="${item.id}">Eliminar</button>
          </div>
        </div>
      `;
      pedidoItems.appendChild(row);
    });

    pedidoTotal.textContent = formatCurrency(total);

    if (currentVentaId && pedido.length) {
      const venta = syncVentaFromPedido();
      if (selectedVentaId === venta.id) {
        renderVentaDetail(venta);
      }
      renderHistorial();
    }

    pedidoItems.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        const item = pedido.find((pedidoItem) => pedidoItem.id === button.dataset.id);
        if (!item) return;

        if (button.dataset.action === 'plus') item.qty += 1;
        if (button.dataset.action === 'minus') item.qty = Math.max(1, item.qty - 1);
        if (button.dataset.action === 'remove') pedido = pedido.filter((pedidoItem) => pedidoItem.id !== item.id);
        renderPedido();
      });
    });
  }

  function renderCheckout() {
    checkoutItems.innerHTML = '';
    let subtotal = 0;

    pedido.forEach((item) => {
      subtotal += item.price * item.qty;
      const row = document.createElement('div');
      row.className = 'checkout-item';
      row.innerHTML = `
        <span class="checkout-item__name">
          <span>${item.name} x${item.qty}</span>
          <span class="checkout-item__dots"></span>
        </span>
        <span class="checkout-item__price">${formatCurrency(item.price * item.qty)}</span>
      `;
      checkoutItems.appendChild(row);
      if (item.note) {
        const noteRow = document.createElement('div');
        noteRow.className = 'checkout-note';
        noteRow.textContent = item.note;
        checkoutItems.appendChild(noteRow);
      }
    });

    const igv = Math.round(subtotal * 0.18 * 100) / 100;
    currentSubtotal = subtotal;
    currentIgv = igv;
    currentTotal = subtotal + igv;
    checkoutSubtotal.textContent = formatCurrency(currentSubtotal);
    checkoutIgv.textContent = formatCurrency(currentIgv);
    checkoutTotal.textContent = formatCurrency(currentTotal);
    btnEliminarProducto.disabled = pedido.length === 0;
  }

  function renderCajaTurno() {
    const metrics = getCajaMetrics();

    document.getElementById('caja-total-vendido').textContent = `(${formatCurrency(metrics.totalVendido)})`;
    document.getElementById('caja-efectivo').textContent = `(${formatCurrency(metrics.totalEfectivo)})`;
    document.getElementById('caja-tarjeta').textContent = `(${formatCurrency(metrics.totalTarjeta)})`;
    document.getElementById('caja-yape').textContent = `(${formatCurrency(metrics.totalYape + metrics.totalPlin)})`;

    const tbody = document.getElementById('movimientos-tbody');
    tbody.innerHTML = '';
    movimientos.forEach((movimiento) => {
      const tr = document.createElement('tr');
      const badgeClass = movimiento.tipo === 'venta' ? 'badge--venta' : movimiento.tipo === 'ingreso' ? 'badge--ingreso' : 'badge--egreso';
      tr.innerHTML = `
        <td>${movimiento.hora}</td>
        <td><span class="badge ${badgeClass}">${movimiento.tipo}</span></td>
        <td>${movimiento.metodo}</td>
        <td>${formatCurrency(Math.abs(movimiento.monto))}</td>
        <td>${escapeHtml(movimiento.descripcion || '-')}</td>
        <td>${movimiento.usuario}</td>
      `;
      tbody.appendChild(tr);
    });

    document.getElementById('cs-monto-inicial').textContent = formatCurrency(montoInicialCaja);
    document.getElementById('cs-ingresos').textContent = formatCurrency(metrics.totalIngresos);
    document.getElementById('cs-egresos').textContent = formatCurrency(metrics.totalEgresos);
    document.getElementById('cs-esperado').textContent = formatCurrency(metrics.totalEsperado);
  }

  historialSearch.addEventListener('input', renderHistorial);
  historialStatus.addEventListener('change', renderHistorial);
  historialRange.addEventListener('change', renderHistorial);

  btnLimpiarHistorial.addEventListener('click', () => {
    historialSearch.value = '';
    historialStatus.value = '';
    historialRange.value = 'este-mes';
    selectedVentaId = null;
    ventaDetail.classList.add('hidden');
    renderHistorial();
  });

  btnNuevaVenta.addEventListener('click', () => {
    refreshConfiguredTables();
    currentOrderMode = 'salon';
    selectedAmbienteId = null;
    selectedMesa = null;
    currentAmbienteName = '';
    currentMesaReference = '';
    currentWaiterName = '';
    hideAllViews();
    viewMesas.classList.remove('hidden');
    renderAmbientes();
    renderMesas();
  });

  btnParaLlevar.addEventListener('click', () => {
    takeawayModalOverlay.classList.remove('hidden');
  });

  ventaDetailClose.addEventListener('click', () => {
    selectedVentaId = null;
    ventaDetail.classList.add('hidden');
    renderHistorial();
  });

  btnCerrarVenta.addEventListener('click', () => {
    if (!selectedVentaId) return;
    const venta = ventasData.find((item) => item.id === selectedVentaId);
    if (!venta || venta.estado !== 'En proceso') return;
    openCheckoutForVenta(venta);
  });

  btnVolverHistorial.addEventListener('click', showHistorial);

  btnIniciar.addEventListener('click', () => {
    if (!selectedMesa || selectedMesa.status === 'ocupada') return;
    currentOrderMode = 'salon';
    currentAmbienteName = selectedMesa.ambienteName;
    currentMesaReference = selectedMesa.name;
    currentWaiterName = getActiveWaiterName();
    pedidoMesa.textContent = selectedMesa.reference;
    setWaiterLabel(pedidoMozo, currentWaiterName);
    currentVentaId = null;
    pedido = [];
    renderPedido();
    hideAllViews();
    viewCaja.classList.remove('hidden');
    renderProductos();
  });

  btnVolverMesas.addEventListener('click', () => {
    hideAllViews();
    if (currentOrderMode === 'llevar') {
      viewHistorial.classList.remove('hidden');
    } else {
      viewMesas.classList.remove('hidden');
    }
  });

  searchInput.addEventListener('input', () => renderProductos(searchInput.value, filterCat.value));
  filterCat.addEventListener('change', () => renderProductos(searchInput.value, filterCat.value));
  btnLimpiar.addEventListener('click', () => {
    searchInput.value = '';
    filterCat.value = '';
    renderProductos();
  });

  productModalCancel.addEventListener('click', () => {
    productModalOverlay.classList.add('hidden');
    selectedProduct = null;
  });

  takeawayModalCancel.addEventListener('click', () => {
    takeawayModalOverlay.classList.add('hidden');
  });

  takeawayOptions.forEach((button) => {
    button.addEventListener('click', () => {
      currentOrderMode = 'llevar';
      currentTakeawayMode = button.dataset.mode || 'Recojo en tienda';
      currentWaiterName = getActiveWaiterName();
      currentVentaId = null;
      pedido = [];
      pedidoMesa.textContent = `Pedido para llevar - ${currentTakeawayMode}`;
      setWaiterLabel(pedidoMozo, currentWaiterName);
      searchInput.value = '';
      filterCat.value = '';
      renderPedido();
      takeawayModalOverlay.classList.add('hidden');
      hideAllViews();
      viewCaja.classList.remove('hidden');
      renderProductos();
    });
  });

  productModalConfirm.addEventListener('click', () => {
    if (!selectedProduct) return;
    const cantidad = Math.max(1, parseInt(productModalQuantity.value, 10) || 1);
    const nota = productModalNote.value;
    addToPedido(selectedProduct, cantidad, nota);
    productModalOverlay.classList.add('hidden');
    selectedProduct = null;
  });

  btnEnviar.addEventListener('click', () => {
    if (!pedido.length) return;
    const venta = syncVentaFromPedido();
    selectedVentaId = venta.id;
    renderHistorial();
    hideAllViews();
    viewCheckout.classList.remove('hidden');
    renderCheckout();
  });

  btnAgregarProducto.addEventListener('click', () => {
    hideAllViews();
    viewCaja.classList.remove('hidden');
    renderProductos(searchInput.value, filterCat.value);
  });

  btnEliminarProducto.addEventListener('click', () => {
    if (!pedido.length) return;
    openDeleteProductModal();
  });

  paymentTip.addEventListener('input', updatePaymentSummary);

  btnAddPaymentLine.addEventListener('click', () => {
    addPaymentLine();
  });

  btnCerrarCuenta.addEventListener('click', () => {
    openPaymentModal();
  });

  btnEmitirComprobante.addEventListener('click', () => {
    openBillingModal();
  });

  btnAddBillingSplit.addEventListener('click', () => {
    const assignedSubtotal = Array.from(billingSplitLines.querySelectorAll('.billing-split-line')).reduce((sum, line) => {
      return sum + parseMoneyInput(line.querySelector('.billing-split__subtotal'));
    }, 0);
    const remainingSubtotal = Math.max(0, currentSubtotal - assignedSubtotal);
    addBillingSplitLine(remainingSubtotal ? remainingSubtotal.toFixed(2) : '');
  });


  btnConfirmarCobro.addEventListener('click', () => {
    const venta = currentVentaId ? ventasData.find((item) => item.id === currentVentaId) : null;
    const now = new Date();
    const totalFinal = getPaymentGrandTotalValue();
    const assigned = getAssignedPaymentsTotal();
    if (Math.abs(totalFinal - assigned) > 0.009) return;

    Array.from(paymentLines.querySelectorAll('.payment-line')).forEach((line) => {
      const method = line.querySelector('.payment-line__method').value;
      const amount = parseFloat(line.querySelector('.payment-line__amount').value.replace(/[^0-9.]/g, '')) || 0;
      if (amount <= 0) return;
      movimientos.push({
        hora: now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
        tipo: 'venta',
        metodo: method,
        monto: amount,
        descripcion: `Cobro de ${venta ? `${venta.id} - ${getVentaLocationLabel(venta)}` : 'venta'}`,
        usuario: 'Juan Perez'
      });
    });

    if (venta) {
      venta.estado = 'Cobrada';
      venta.fecha = `${now.toLocaleDateString('es-PE')} ${now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}`;
      venta.total = totalFinal;
      ventasCobradasCaja.push({
        id: venta.id,
        mesa: getVentaLocationLabel(venta),
        total: venta.total,
        items: venta.items.map((item) => ({ ...item }))
      });
    }
    paymentModalOverlay.classList.add('hidden');
    pedido = [];
    currentVentaId = null;
    currentWaiterName = '';
    currentAmbienteName = '';
    currentMesaReference = '';
    renderPedido();
    renderHistorial();
    showHistorial();
  });

  btnComprobante.addEventListener('click', () => {
    btnComprobante.textContent = 'Pre cuenta generada';
    setTimeout(() => {
      btnComprobante.textContent = 'Imprimir pre cuenta';
    }, 1200);
  });

  btnDeleteProductCancel.addEventListener('click', () => {
    deleteProductModalOverlay.classList.add('hidden');
  });

  btnDeleteProductConfirm.addEventListener('click', () => {
    const productId = deleteProductSelect.value;
    const reason = deleteProductReason.value.trim();

    if (!productId) {
      window.alert('Selecciona un producto para eliminar.');
      return;
    }

    if (!reason) {
      window.alert('Debes detallar el motivo de eliminacion.');
      deleteProductReason.focus();
      return;
    }

    const removedItem = pedido.find((item) => item.id === productId);
    if (removedItem) {
      const now = new Date();
      productosEliminados.push({
        hora: now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
        mesa: pedidoMesa.textContent,
        nombre: removedItem.name,
        cantidad: removedItem.qty,
        motivo: reason
      });
    }

    pedido = pedido.filter((item) => item.id !== productId);
    deleteProductModalOverlay.classList.add('hidden');

    renderPedido();
    removeCurrentVentaIfEmpty();
    renderCheckout();

    if (!pedido.length) {
      hideAllViews();
      viewCaja.classList.remove('hidden');
      renderProductos(searchInput.value, filterCat.value);
    }
  });

  btnCancelar.addEventListener('click', () => {
    hideAllViews();
    viewCaja.classList.remove('hidden');
  });

  btnCancelarCobro.addEventListener('click', () => {
    paymentModalOverlay.classList.add('hidden');
  });

  btnBillingConfirm.addEventListener('click', () => {
    const selectedLine = getSelectedBillingLine();
    if (!selectedLine || selectedLine.classList.contains('generated')) return;

    const comprobante = getBillingLinePayload(selectedLine);
    if (comprobante.monto <= 0) return;

    const venta = currentVentaId ? ventasData.find((item) => item.id === currentVentaId) : null;
    const now = new Date();
    const clienteFacturado = comprobante.documento ? {
      nombre: comprobante.nombre || 'Cliente facturado',
      documento: comprobante.documento,
      direccion: comprobante.direccion || ''
    } : null;

    registerBilledClientVisit(comprobante.tipo, clienteFacturado);

    if (venta) {
      venta.comprobantes = Array.isArray(venta.comprobantes) ? venta.comprobantes : [];
      venta.comprobantes.push({
        ...comprobante,
        numero: `${venta.id}-C${String(venta.comprobantes.length + 1).padStart(2, '0')}`,
        fecha: now.toISOString()
      });
      venta.facturacionPendiente = Math.max(0, currentTotal - (venta.comprobantes || []).reduce((sum, item) => sum + (item.monto || 0), 0));
      venta.facturacionEstado = venta.facturacionPendiente <= 0.009 ? 'Completada' : 'Parcial';
    }

    selectedLine.classList.add('generated');
    selectedLine.dataset.generatedTotal = comprobante.monto.toFixed(2);
    selectedLine.querySelector('.billing-split__status').textContent = 'Emitido';
    selectedLine.querySelectorAll('input, select, button').forEach((control) => {
      if (!control.classList.contains('billing-split__remove')) control.disabled = true;
    });

    const nextLine = billingSplitLines.querySelector('.billing-split-line:not(.generated)');
    if (nextLine) selectBillingLine(nextLine);
    updateBillingSummary();

    btnBillingConfirm.textContent = 'Comprobante generado';
    setTimeout(() => {
      btnBillingConfirm.textContent = 'Generar seleccionado';
    }, 1200);
  });

  btnBillingCancel.addEventListener('click', () => {
    billingModalOverlay.classList.add('hidden');
  });

  tabHistorial.addEventListener('click', () => {
    tabHistorial.classList.add('active');
    tabCaja.classList.remove('active');
    showHistorial();
  });

  tabCaja.addEventListener('click', () => {
    tabCaja.classList.add('active');
    tabHistorial.classList.remove('active');
    hideAllViews();
    if (cajaAbierta) {
      viewCajaTurno.classList.remove('hidden');
    } else {
      viewApertura.classList.remove('hidden');
      const now = new Date();
      document.getElementById('apertura-fecha').textContent = `${now.toLocaleDateString('es-PE')} ${now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}`;
    }
  });

  document.getElementById('btn-abrir-caja').addEventListener('click', () => {
    const raw = document.getElementById('monto-inicial').value.replace(/[^0-9.]/g, '');
    montoInicialCaja = parseFloat(raw) || 0;
    cajaAbierta = true;
    movimientos = [];
    ventasCobradasCaja = [];
    productosEliminados = [];
    hideAllViews();
    viewCajaTurno.classList.remove('hidden');
    renderCajaTurno();
  });

  document.getElementById('btn-registrar-ingreso').addEventListener('click', () => {
    modalType = 'ingreso';
    modalTitle.textContent = 'Registrar ingreso';
    resetMovimientoModal('ingreso');
    modalOverlay.classList.remove('hidden');
  });

  document.getElementById('btn-registrar-egreso').addEventListener('click', () => {
    modalType = 'egreso';
    modalTitle.textContent = 'Registrar egreso';
    populateEgresoProductList();
    resetMovimientoModal('egreso');
    modalOverlay.classList.remove('hidden');
  });

  egresoProductMode.addEventListener('change', updateEgresoProductMode);
  egresoProductSearch.addEventListener('input', updateEgresoProductMode);
  modalCancel.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
  });

  modalConfirm.addEventListener('click', () => {
    const raw = modalMonto.value.replace(/[^0-9.]/g, '');
    const monto = parseFloat(raw) || 0;
    if (monto <= 0) return;

    const egresoProduct = getEgresoProductPayload();
    if (modalType === 'egreso' && (!egresoProduct || !egresoProduct.productName || (egresoProduct.source === 'inventario' && !egresoProduct.inventoryId))) {
      const target = egresoProductMode.value === 'otros' ? egresoProductManual : egresoProductSearch;
      target.focus();
      return;
    }

    const now = new Date();
    movimientos.push({
      hora: now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
      tipo: modalType,
      metodo: modalType === 'ingreso' ? 'Ingreso' : 'Egreso',
      monto: modalType === 'egreso' ? -monto : monto,
      descripcion: modalType === 'egreso' ? buildEgresoDescription(egresoProduct) : (modalDesc.value.trim() || 'Sin descripcion'),
      producto: egresoProduct,
      usuario: 'Juan Perez'
    });

    modalOverlay.classList.add('hidden');
    renderCajaTurno();
  });

  document.getElementById('btn-cerrar-caja').addEventListener('click', () => {
    openCloseCajaModal();
  });

  btnCancelCloseCaja.addEventListener('click', () => {
    closeCajaModalOverlay.classList.add('hidden');
  });

  btnConfirmCloseCaja.addEventListener('click', () => {
    const selectedReports = Array.from(closeCajaModalOverlay.querySelectorAll('.report-option__input:checked'))
      .map((input) => input.value);

    if (!selectedReports.length) {
      window.alert('Selecciona al menos un reporte para imprimir.');
      return;
    }

    const printed = printCloseCajaReports(selectedReports);
    if (!printed) return;

    closeCajaModalOverlay.classList.add('hidden');
    cajaAbierta = false;
    movimientos = [];
    ventasCobradasCaja = [];
    productosEliminados = [];
    montoInicialCaja = 0;
    hideAllViews();
    viewApertura.classList.remove('hidden');
    document.getElementById('monto-inicial').value = '';
  });

  renderHistorial();
  renderAmbientes();
  renderMesas();
  renderPedido();
  showHistorial();
});
