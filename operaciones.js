document.addEventListener('DOMContentLoaded', () => {
  const inventoryData = [
    { id: 1, nombre: 'Tomate', categoria: 'Verduras', stock: 15, unidad: 'kg', vencimiento: '2026-05-14', estado: 'Normal', actualizacion: '10:30 AM', stockMinimo: 5, precioReferencial: 3.5, observacion: '' },
    { id: 2, nombre: 'Aceite vegetal', categoria: 'Secos', stock: 2, unidad: 'L', vencimiento: '', estado: 'Bajo stock', actualizacion: '09:15 AM', stockMinimo: 4, precioReferencial: 12.9, observacion: 'Uso diario en cocina caliente.' },
    { id: 3, nombre: 'Pollo', categoria: 'Carnes', stock: 0, unidad: 'kg', vencimiento: '2026-05-10', estado: 'Sin stock', actualizacion: '08:00 AM', stockMinimo: 8, precioReferencial: 14.8, observacion: 'Coordinar reposicion con proveedor principal.' },
    { id: 4, nombre: 'Pimiento rojo', categoria: 'Verduras', stock: 6, unidad: 'kg', vencimiento: '2026-05-13', estado: 'Normal', actualizacion: '09:40 AM', stockMinimo: 3, precioReferencial: 4.2, observacion: '' },
    { id: 5, nombre: 'Chicha morada', categoria: 'Bebidas', stock: 4, unidad: 'L', vencimiento: '2026-05-12', estado: 'Bajo stock', actualizacion: '09:05 AM', stockMinimo: 6, precioReferencial: 5.5, observacion: '' },
    { id: 6, nombre: 'Detergente cocina', categoria: 'Limpieza', stock: 8, unidad: 'unid', vencimiento: '', estado: 'Normal', actualizacion: '08:55 AM', stockMinimo: 2, precioReferencial: 9.5, observacion: '' },
    { id: 7, nombre: 'Arroz', categoria: 'Secos', stock: 18, unidad: 'kg', vencimiento: '', estado: 'Normal', actualizacion: '07:50 AM', stockMinimo: 10, precioReferencial: 4.8, observacion: '' },
    { id: 8, nombre: 'Limon', categoria: 'Verduras', stock: 0, unidad: 'kg', vencimiento: '2026-05-11', estado: 'Sin stock', actualizacion: '10:05 AM', stockMinimo: 6, precioReferencial: 2.9, observacion: 'Reponer para barra y cocina.' }
  ];
  const stockAdjustments = [
    {
      id: 1,
      tipo: 'Consumo operativo',
      itemId: 2,
      nombre: 'Aceite vegetal',
      cantidad: 0.8,
      unidad: 'L',
      area: 'Frituras',
      detalle: 'Uso en mise en place de cocina caliente.',
      hora: '09:20 AM'
    },
    {
      id: 2,
      tipo: 'Merma',
      itemId: 1,
      nombre: 'Tomate',
      cantidad: 1.2,
      unidad: 'kg',
      area: 'Preparacion',
      detalle: 'Producto golpeado durante el lavado.',
      hora: '10:00 AM'
    }
  ];
  const purchasesData = [
    { id: 1, fecha: '2026-05-09', proveedor: 'Mercado Central', total: 470, metodoPago: 'Efectivo', estadoPago: 'Pagado', usuario: 'Mukialom' },
    { id: 2, fecha: '2026-05-09', proveedor: 'Proveedor Carnes', total: 350, metodoPago: 'Transferencia', estadoPago: 'Pagado', usuario: 'Mukialom' },
    { id: 3, fecha: '2026-05-08', proveedor: 'Bebidas SA', total: 80, metodoPago: 'Yape / Plin', estadoPago: 'Pendiente', usuario: 'Admin' },
    { id: 4, fecha: '2026-05-08', proveedor: 'Bebidas SA', total: 120, metodoPago: 'Yape / Plin', estadoPago: 'Pendiente', usuario: 'Admin' },
    { id: 5, fecha: '2026-05-08', proveedor: 'Proveedor Carnes', total: 120, metodoPago: 'Efectivo', estadoPago: 'Pagado', usuario: 'Mukialom' },
    { id: 6, fecha: '2026-05-07', proveedor: 'Abarrotes del Sur', total: 150, metodoPago: 'Yape / Plin', estadoPago: 'Pagado', usuario: 'Admin' },
    { id: 7, fecha: '2026-05-07', proveedor: 'Bebidas SA', total: 350, metodoPago: 'Transferencia', estadoPago: 'Pendiente', usuario: 'Admin' },
    { id: 8, fecha: '2026-05-06', proveedor: 'Proveedor Carnes', total: 120, metodoPago: 'Yape / Plin', estadoPago: 'Pendiente', usuario: 'Admin' }
  ];
  const recipesData = [
    {
      id: 1,
      nombre: 'Ceviche a lo Muki',
      tipo: 'Plato',
      categoria: 'Marino',
      estado: 'Activo',
      observacion: '',
      ingredientes: [
        { inventoryId: 1, cantidad: 0.18, unidad: 'kg' },
        { inventoryId: 8, cantidad: 0.08, unidad: 'kg' }
      ]
    },
    {
      id: 2,
      nombre: 'Pisco Sour',
      tipo: 'Bebida',
      categoria: 'Cocteles',
      estado: 'Activo',
      observacion: '',
      ingredientes: [
        { inventoryId: 8, cantidad: 0.02, unidad: 'kg' },
        { inventoryId: 2, cantidad: 0.05, unidad: 'L' }
      ]
    },
    {
      id: 3,
      nombre: 'Lomo Saltado',
      tipo: 'Plato',
      categoria: 'Criollo',
      estado: 'Activo',
      observacion: '',
      ingredientes: [
        { inventoryId: 1, cantidad: 0.12, unidad: 'kg' },
        { inventoryId: 4, cantidad: 0.09, unidad: 'kg' }
      ]
    },
    {
      id: 4,
      nombre: 'Inka Cola',
      tipo: 'Bebida',
      categoria: 'Gaseosas',
      estado: 'Activo',
      observacion: 'Bebida sin preparacion adicional.',
      ingredientes: [
        { inventoryId: 5, cantidad: 0.25, unidad: 'L' }
      ]
    }
  ];

  const opsHub = document.getElementById('ops-hub');
  const opsWorkspace = document.getElementById('ops-workspace');
  const btnVolverHub = document.getElementById('btn-volver-hub');
  const moduleButtons = document.querySelectorAll('.ops-card__btn');
  const tabs = document.querySelectorAll('.ops-tab');
  const panes = document.querySelectorAll('.ops-pane');
  const inventoryTbody = document.getElementById('inventory-tbody');
  const inventoryAlertsList = document.getElementById('inventory-alerts-list');
  const inventorySearch = document.getElementById('inventory-search');
  const inventoryCategory = document.getElementById('inventory-category');
  const inventoryStatus = document.getElementById('inventory-status');
  const metricTotal = document.getElementById('metric-total');
  const metricLow = document.getElementById('metric-low');
  const metricEmpty = document.getElementById('metric-empty');
  const inventoryModalOverlay = document.getElementById('inventory-modal-overlay');
  const inventoryModalTitle = document.getElementById('inventory-modal-title');
  const inventoryModalSubtitle = document.getElementById('inventory-modal-subtitle');
  const btnAddInsumo = document.getElementById('btn-add-insumo');
  const btnRefreshStock = document.getElementById('btn-refresh-stock');
  const btnSaveInsumo = document.getElementById('btn-save-insumo');
  const btnCancelInsumo = document.getElementById('btn-cancel-insumo');
  const btnDeleteInsumo = document.getElementById('btn-delete-insumo');
  const insumoName = document.getElementById('insumo-name');
  const insumoCategory = document.getElementById('insumo-category');
  const insumoUnit = document.getElementById('insumo-unit');
  const insumoStock = document.getElementById('insumo-stock');
  const insumoMinStock = document.getElementById('insumo-min-stock');
  const insumoPrice = document.getElementById('insumo-price');
  const insumoExpiration = document.getElementById('insumo-expiration');
  const insumoObservation = document.getElementById('insumo-observation');
  const stockAdjustmentModalOverlay = document.getElementById('stock-adjustment-modal-overlay');
  const stockAdjustmentType = document.getElementById('stock-adjustment-type');
  const stockAdjustmentItem = document.getElementById('stock-adjustment-item');
  const stockAdjustmentQuantity = document.getElementById('stock-adjustment-quantity');
  const stockAdjustmentArea = document.getElementById('stock-adjustment-area');
  const stockAdjustmentNote = document.getElementById('stock-adjustment-note');
  const stockAdjustmentHistory = document.getElementById('stock-adjustment-history');
  const btnCancelStockAdjustment = document.getElementById('btn-cancel-stock-adjustment');
  const btnSaveStockAdjustment = document.getElementById('btn-save-stock-adjustment');
  const purchasesSearch = document.getElementById('purchases-search');
  const purchasesDateFrom = document.getElementById('purchases-date-from');
  const purchasesDateTo = document.getElementById('purchases-date-to');
  const purchasesPaymentStatus = document.getElementById('purchases-payment-status');
  const purchasesTbody = document.getElementById('purchases-tbody');
  const purchasesEmpty = document.getElementById('purchases-empty');
  const purchasesCount = document.getElementById('purchases-count');
  const purchasesTotalPaid = document.getElementById('purchases-total-paid');
  const purchasesTotalPending = document.getElementById('purchases-total-pending');
  const purchasesListView = document.getElementById('purchases-list-view');
  const purchasesFormView = document.getElementById('purchases-form-view');
  const btnNewPurchase = document.getElementById('btn-new-purchase');
  const purchaseFormDateLabel = document.getElementById('purchase-form-date-label');
  const purchaseProvider = document.getElementById('purchase-provider');
  const purchaseDate = document.getElementById('purchase-date');
  const purchasePaymentMethod = document.getElementById('purchase-payment-method');
  const purchasePaymentState = document.getElementById('purchase-payment-status');
  const purchaseItemsTbody = document.getElementById('purchase-items-tbody');
  const btnAddPurchaseItem = document.getElementById('btn-add-purchase-item');
  const purchaseSubtotal = document.getElementById('purchase-subtotal');
  const purchaseTotal = document.getElementById('purchase-total');
  const btnSubmitPurchase = document.getElementById('btn-submit-purchase');
  const btnCancelPurchase = document.getElementById('btn-cancel-purchase');
  const recipesListView = document.getElementById('recipes-list-view');
  const recipesFormView = document.getElementById('recipes-form-view');
  const recipesSearch = document.getElementById('recipes-search');
  const recipesTypeFilter = document.getElementById('recipes-type-filter');
  const recipesCategoryFilter = document.getElementById('recipes-category-filter');
  const btnNewRecipe = document.getElementById('btn-new-recipe');
  const recipesTbody = document.getElementById('recipes-tbody');
  const recipesSummaryList = document.getElementById('recipes-summary-list');
  const recipesEmpty = document.getElementById('recipes-empty');
  const recipesActiveCount = document.getElementById('recipes-active-count');
  const recipesPlatesCount = document.getElementById('recipes-plates-count');
  const recipesDrinksCount = document.getElementById('recipes-drinks-count');
  const recipeFormTitle = document.getElementById('recipe-form-title');
  const recipeFormSubtitle = document.getElementById('recipe-form-subtitle');
  const recipeName = document.getElementById('recipe-name');
  const recipeType = document.getElementById('recipe-type');
  const recipeCategory = document.getElementById('recipe-category');
  const recipeStatus = document.getElementById('recipe-status');
  const recipeNotes = document.getElementById('recipe-notes');
  const recipeItemsTbody = document.getElementById('recipe-items-tbody');
  const btnAddRecipeItem = document.getElementById('btn-add-recipe-item');
  const recipeCostTotal = document.getElementById('recipe-cost-total');
  const recipeIngredientCount = document.getElementById('recipe-ingredient-count');
  const btnSaveRecipe = document.getElementById('btn-save-recipe');
  const btnCancelRecipe = document.getElementById('btn-cancel-recipe');
  let selectedInventoryId = null;
  let inventoryModalMode = 'create';
  let purchaseDraftItems = [];
  let currentOpsTab = 'inventario';
  let selectedRecipeId = null;
  let recipeDraftItems = [];

  function getStatusClass(estado) {
    if (estado === 'Sin stock') return 'inventory-status--empty';
    if (estado === 'Bajo stock') return 'inventory-status--low';
    return 'inventory-status--normal';
  }

  function deriveStatus(stock) {
    if (stock <= 0) return 'Sin stock';
    if (stock <= 5) return 'Bajo stock';
    return 'Normal';
  }

  function resetInventoryModal() {
    insumoName.value = '';
    insumoCategory.value = 'Verduras';
    insumoUnit.value = 'kg';
    insumoStock.value = '';
    insumoMinStock.value = '';
    insumoPrice.value = '';
    insumoExpiration.value = '';
    insumoObservation.value = '';
  }

  function formatExpirationDate(value) {
    if (!value) return '<span class="inventory-expiration--empty">No aplica</span>';
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  function formatCurrency(value) {
    return `S/ ${Number(value).toFixed(2)}`;
  }

  function formatShortDate(value) {
    if (!value) return '-';
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  function formatLongDate(value) {
    if (!value) return '';
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  function getInventoryEstimatedCost(inventoryId) {
    const item = getInventoryById(inventoryId);
    return item?.precioReferencial || 0;
  }

  function getAdjustmentBadgeClass(tipo) {
    if (tipo === 'Merma') return 'stock-adjustment__entry-badge--merma';
    if (tipo === 'Producto malogrado') return 'stock-adjustment__entry-badge--malogrado';
    return 'stock-adjustment__entry-badge--consumo';
  }

  function populateAdjustmentItems() {
    stockAdjustmentItem.innerHTML = '';
    inventoryData
      .slice()
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
      .forEach((item) => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `${item.nombre} (${item.stock} ${item.unidad})`;
        stockAdjustmentItem.appendChild(option);
      });
  }

  function renderStockAdjustmentHistory() {
    stockAdjustmentHistory.innerHTML = '';

    if (!stockAdjustments.length) {
      stockAdjustmentHistory.innerHTML = '<div class="stock-adjustment__empty">Aun no se registran ajustes manuales.</div>';
      return;
    }

    stockAdjustments.slice(0, 6).forEach((entry) => {
      const card = document.createElement('article');
      card.className = 'stock-adjustment__entry';
      card.innerHTML = `
        <div class="stock-adjustment__entry-top">
          <span class="stock-adjustment__entry-title">${entry.nombre}</span>
          <span class="stock-adjustment__entry-badge ${getAdjustmentBadgeClass(entry.tipo)}">${entry.tipo}</span>
        </div>
        <p class="stock-adjustment__entry-meta">-${entry.cantidad} ${entry.unidad} | ${entry.area} | ${entry.hora}</p>
        <p class="stock-adjustment__entry-note">${entry.detalle}</p>
      `;
      stockAdjustmentHistory.appendChild(card);
    });
  }

  function openStockAdjustmentModal() {
    populateAdjustmentItems();
    renderStockAdjustmentHistory();
    stockAdjustmentType.value = 'Consumo operativo';
    stockAdjustmentQuantity.value = '';
    stockAdjustmentArea.value = '';
    stockAdjustmentNote.value = '';
    stockAdjustmentModalOverlay.classList.remove('hidden');
  }

  function openCreateInventoryModal() {
    inventoryModalMode = 'create';
    selectedInventoryId = null;
    inventoryModalTitle.textContent = 'Agregar insumo';
    inventoryModalSubtitle.textContent = 'Registrar nuevo producto en inventario';
    btnSaveInsumo.textContent = 'Guardar insumo';
    btnDeleteInsumo.classList.add('hidden');
    resetInventoryModal();
    inventoryModalOverlay.classList.remove('hidden');
  }

  function openEditInventoryModal(item) {
    inventoryModalMode = 'edit';
    selectedInventoryId = item.id;
    inventoryModalTitle.textContent = 'Editar insumo';
    inventoryModalSubtitle.textContent = 'Modificar informacion del producto';
    btnSaveInsumo.textContent = 'Guardar cambios';
    btnDeleteInsumo.classList.remove('hidden');
    insumoName.value = item.nombre;
    insumoCategory.value = item.categoria;
    insumoUnit.value = item.unidad;
    insumoStock.value = item.stock;
    insumoMinStock.value = item.stockMinimo ?? '';
    insumoPrice.value = item.precioReferencial ?? '';
    insumoExpiration.value = item.vencimiento || '';
    insumoObservation.value = item.observacion || '';
    inventoryModalOverlay.classList.remove('hidden');
  }

  function getFilteredInventory() {
    const searchTerm = inventorySearch.value.trim().toLowerCase();
    const category = inventoryCategory.value;
    const status = inventoryStatus.value;

    return inventoryData.filter((item) => {
      const matchesSearch = !searchTerm || `${item.nombre} ${item.categoria}`.toLowerCase().includes(searchTerm);
      const matchesCategory = !category || item.categoria === category;
      const matchesStatus = !status || item.estado === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  function renderMetrics() {
    metricTotal.textContent = inventoryData.length;
    metricLow.textContent = inventoryData.filter((item) => item.estado === 'Bajo stock').length;
    metricEmpty.textContent = inventoryData.filter((item) => item.estado === 'Sin stock').length;
  }

  function renderAlerts(items) {
    const alerts = items.filter((item) => item.estado !== 'Normal');
    inventoryAlertsList.innerHTML = '';

    if (!alerts.length) {
      inventoryAlertsList.innerHTML = '<div class="inventory-empty">No hay alertas activas por ahora.</div>';
      return;
    }

    alerts.forEach((item) => {
      const card = document.createElement('article');
      const statusClass = getStatusClass(item.estado).replace('inventory-status', 'inventory-alert__dot');
      card.className = 'inventory-alert';
      card.innerHTML = `
        <div class="inventory-alert__top">
          <span class="inventory-alert__dot ${statusClass}"></span>
          <span class="inventory-alert__title">${item.nombre}</span>
        </div>
        <p class="inventory-alert__meta">${item.estado} | ${item.stock} ${item.unidad} disponibles</p>
        <p class="inventory-alert__meta">Actualizado ${item.actualizacion}</p>
      `;
      inventoryAlertsList.appendChild(card);
    });
  }

  function renderInventoryTable() {
    const items = getFilteredInventory();
    inventoryTbody.innerHTML = '';

    if (!items.length) {
      inventoryTbody.innerHTML = '<tr><td colspan="7" class="inventory-empty">No se encontraron insumos con los filtros seleccionados.</td></tr>';
      renderAlerts([]);
      renderMetrics();
      return;
    }

    items.forEach((item) => {
      const row = document.createElement('tr');
      row.className = selectedInventoryId === item.id ? 'selected' : '';
      row.innerHTML = `
        <td>${item.nombre}</td>
        <td>${item.categoria}</td>
        <td>${item.stock} ${item.unidad}</td>
        <td>${item.unidad}</td>
        <td>${formatExpirationDate(item.vencimiento)}</td>
        <td><span class="inventory-status ${getStatusClass(item.estado)}">${item.estado}</span></td>
        <td>${item.actualizacion}</td>
      `;
      row.addEventListener('click', () => openEditInventoryModal(item));
      inventoryTbody.appendChild(row);
    });

    renderAlerts(items);
    renderMetrics();
  }

  function getFilteredPurchases() {
    const term = purchasesSearch.value.trim().toLowerCase();
    const dateFrom = purchasesDateFrom.value;
    const dateTo = purchasesDateTo.value;
    const paymentStatus = purchasesPaymentStatus.value;

    return purchasesData.filter((purchase) => {
      const matchesTerm = !term || purchase.proveedor.toLowerCase().includes(term);
      const matchesFrom = !dateFrom || purchase.fecha >= dateFrom;
      const matchesTo = !dateTo || purchase.fecha <= dateTo;
      const matchesStatus = !paymentStatus || purchase.estadoPago === paymentStatus;
      return matchesTerm && matchesFrom && matchesTo && matchesStatus;
    });
  }

  function getPurchaseStatusClass(status) {
    return status === 'Pagado' ? 'purchases-payment-status--paid' : 'purchases-payment-status--pending';
  }

  function renderPurchases() {
    const purchases = getFilteredPurchases();
    purchasesTbody.innerHTML = '';

    let totalPaid = 0;
    let totalPending = 0;

    purchases.forEach((purchase) => {
      if (purchase.estadoPago === 'Pagado') totalPaid += purchase.total;
      if (purchase.estadoPago === 'Pendiente') totalPending += purchase.total;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${formatShortDate(purchase.fecha)}</td>
        <td>${purchase.proveedor}</td>
        <td><span class="purchases-total">${formatCurrency(purchase.total)}</span></td>
        <td>${purchase.metodoPago}</td>
        <td><span class="purchases-payment-status ${getPurchaseStatusClass(purchase.estadoPago)}">${purchase.estadoPago}</span></td>
        <td>${purchase.usuario}</td>
      `;
      purchasesTbody.appendChild(row);
    });

    purchasesCount.textContent = purchases.length;
    purchasesTotalPaid.textContent = formatCurrency(totalPaid);
    purchasesTotalPending.textContent = formatCurrency(totalPending);
    purchasesEmpty.classList.toggle('hidden', purchases.length > 0);
  }

  function calculateRecipeCost(recipe) {
    return recipe.ingredientes.reduce((sum, ingredient) => {
      return sum + ((getInventoryEstimatedCost(ingredient.inventoryId) || 0) * (Number(ingredient.cantidad) || 0));
    }, 0);
  }

  function renderRecipesMetrics() {
    recipesActiveCount.textContent = recipesData.filter((recipe) => recipe.estado === 'Activo').length;
    recipesPlatesCount.textContent = recipesData.filter((recipe) => recipe.tipo === 'Plato').length;
    recipesDrinksCount.textContent = recipesData.filter((recipe) => recipe.tipo === 'Bebida').length;
  }

  function renderRecipesSummary() {
    recipesSummaryList.innerHTML = '';
    recipesData.slice(0, 4).forEach((recipe) => {
      const summary = document.createElement('article');
      summary.className = 'recipes-summary-item';
      summary.innerHTML = `
        <div class="recipes-summary-item__title">${recipe.nombre}</div>
        <p class="recipes-summary-item__meta">${recipe.ingredientes.length} insumos configurados</p>
        <p class="recipes-summary-item__meta">Costo estimado ${formatCurrency(calculateRecipeCost(recipe))}</p>
      `;
      recipesSummaryList.appendChild(summary);
    });
  }

  function getFilteredRecipes() {
    const term = recipesSearch.value.trim().toLowerCase();
    const type = recipesTypeFilter.value;
    const category = recipesCategoryFilter.value;

    return recipesData.filter((recipe) => {
      const matchesTerm = !term || recipe.nombre.toLowerCase().includes(term);
      const matchesType = !type || recipe.tipo === type;
      const matchesCategory = !category || recipe.categoria === category;
      return matchesTerm && matchesType && matchesCategory;
    });
  }

  function getRecipeStatusClass(status) {
    return status === 'Activo' ? 'recipes-status--active' : 'recipes-status--inactive';
  }

  function renderRecipesTable() {
    const recipes = getFilteredRecipes();
    recipesTbody.innerHTML = '';

    recipes.forEach((recipe) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${recipe.nombre}</td>
        <td>${recipe.tipo}</td>
        <td>${recipe.categoria}</td>
        <td><span class="recipes-cost">${formatCurrency(calculateRecipeCost(recipe))}</span></td>
        <td><span class="recipes-status ${getRecipeStatusClass(recipe.estado)}">${recipe.estado}</span></td>
        <td>${recipe.ingredientes.length}</td>
      `;
      row.addEventListener('click', () => openEditRecipeView(recipe));
      recipesTbody.appendChild(row);
    });

    recipesEmpty.classList.toggle('hidden', recipes.length > 0);
    renderRecipesMetrics();
    renderRecipesSummary();
  }

  function showRecipesListView() {
    recipesFormView.classList.add('hidden');
    recipesListView.classList.remove('hidden');
    btnVolverHub.textContent = 'Volver';
  }

  function createRecipeDraftItem() {
    const inventoryItem = inventoryData[0];
    return {
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      inventoryId: inventoryItem ? inventoryItem.id : null,
      cantidad: 0.1,
      unidad: inventoryItem ? inventoryItem.unidad : 'kg'
    };
  }

  function getRecipeDraftCost() {
    return recipeDraftItems.reduce((sum, item) => sum + ((getInventoryEstimatedCost(item.inventoryId) || 0) * (Number(item.cantidad) || 0)), 0);
  }

  function updateRecipeDraftTotals() {
    recipeCostTotal.textContent = formatCurrency(getRecipeDraftCost());
    recipeIngredientCount.textContent = String(recipeDraftItems.length);
  }

  function renderRecipeDraft() {
    recipeItemsTbody.innerHTML = '';

    recipeDraftItems.forEach((item) => {
      const cost = (getInventoryEstimatedCost(item.inventoryId) || 0) * (Number(item.cantidad) || 0);
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <select data-field="inventoryId" data-id="${item.id}">
            ${inventoryData.map((inventoryOption) => `<option value="${inventoryOption.id}" ${inventoryOption.id === item.inventoryId ? 'selected' : ''}>${inventoryOption.nombre}</option>`).join('')}
          </select>
        </td>
        <td><input type="number" min="0.01" step="0.01" value="${item.cantidad}" data-field="cantidad" data-id="${item.id}"></td>
        <td><select data-field="unidad" data-id="${item.id}">${getUnitOptions(item.unidad)}</select></td>
        <td><span class="recipes-item-cost">${formatCurrency(cost)}</span></td>
        <td><button type="button" class="recipes-item-remove" data-action="remove" data-id="${item.id}">Quitar</button></td>
      `;
      recipeItemsTbody.appendChild(row);
    });

    recipeItemsTbody.querySelectorAll('select, input').forEach((field) => {
      const eventName = field.tagName === 'SELECT' ? 'change' : 'input';
      field.addEventListener(eventName, () => {
        const draftItem = recipeDraftItems.find((draft) => draft.id === field.dataset.id);
        if (!draftItem) return;

        if (field.dataset.field === 'inventoryId') {
          const inventoryItem = getInventoryById(field.value);
          draftItem.inventoryId = Number(field.value);
          if (inventoryItem) {
            draftItem.unidad = inventoryItem.unidad;
          }
          renderRecipeDraft();
          return;
        }

        if (field.dataset.field === 'cantidad') {
          draftItem.cantidad = parseFloat(field.value) || 0;
        } else {
          draftItem.unidad = field.value;
        }

        const row = field.closest('tr');
        if (row) {
          const costCell = row.querySelector('.recipes-item-cost');
          if (costCell) {
            costCell.textContent = formatCurrency((getInventoryEstimatedCost(draftItem.inventoryId) || 0) * (Number(draftItem.cantidad) || 0));
          }
        }
        updateRecipeDraftTotals();
      });
    });

    recipeItemsTbody.querySelectorAll('[data-action="remove"]').forEach((button) => {
      button.addEventListener('click', () => {
        recipeDraftItems = recipeDraftItems.filter((draft) => draft.id !== button.dataset.id);
        if (!recipeDraftItems.length) {
          recipeDraftItems.push(createRecipeDraftItem());
        }
        renderRecipeDraft();
      });
    });

    updateRecipeDraftTotals();
  }

  function openNewRecipeView() {
    selectedRecipeId = null;
    recipeFormTitle.textContent = 'Nueva receta';
    recipeFormSubtitle.textContent = 'Define los insumos y cantidades que se descontaran automaticamente en cada venta.';
    recipeName.value = '';
    recipeType.value = 'Plato';
    recipeCategory.value = 'Marino';
    recipeStatus.value = 'Activo';
    recipeNotes.value = '';
    recipeDraftItems = [createRecipeDraftItem()];
    recipesListView.classList.add('hidden');
    recipesFormView.classList.remove('hidden');
    btnVolverHub.textContent = 'Volver';
    renderRecipeDraft();
  }

  function openEditRecipeView(recipe) {
    selectedRecipeId = recipe.id;
    recipeFormTitle.textContent = 'Editar receta';
    recipeFormSubtitle.textContent = 'Ajusta la composicion del producto para mantener el descuento automatico de insumos.';
    recipeName.value = recipe.nombre;
    recipeType.value = recipe.tipo;
    recipeCategory.value = recipe.categoria;
    recipeStatus.value = recipe.estado;
    recipeNotes.value = recipe.observacion || '';
    recipeDraftItems = recipe.ingredientes.map((ingredient, index) => ({
      id: `${recipe.id}-${index}-${Date.now()}`,
      inventoryId: ingredient.inventoryId,
      cantidad: ingredient.cantidad,
      unidad: ingredient.unidad
    }));
    recipesListView.classList.add('hidden');
    recipesFormView.classList.remove('hidden');
    btnVolverHub.textContent = 'Volver';
    renderRecipeDraft();
  }

  function showPurchaseListView() {
    purchasesFormView.classList.add('hidden');
    purchasesListView.classList.remove('hidden');
    btnVolverHub.textContent = 'Volver';
  }

  function createPurchaseDraftItem() {
    const item = inventoryData[0];
    return {
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      inventoryId: item ? item.id : null,
      cantidad: 1,
      unidad: item ? item.unidad : 'kg',
      precioUnitario: item?.precioReferencial || 0
    };
  }

  function getUnitOptions(selectedUnit) {
    const units = ['kg', 'L', 'unidades', 'paq'];
    return units.map((unit) => `<option value="${unit}" ${unit === selectedUnit ? 'selected' : ''}>${unit}</option>`).join('');
  }

  function getInventoryById(id) {
    return inventoryData.find((item) => item.id === Number(id));
  }

  function getPurchaseDraftTotal() {
    return purchaseDraftItems.reduce((sum, item) => sum + ((Number(item.cantidad) || 0) * (Number(item.precioUnitario) || 0)), 0);
  }

  function updatePurchaseDraftTotals() {
    const total = getPurchaseDraftTotal();
    purchaseSubtotal.textContent = formatCurrency(total);
    purchaseTotal.textContent = formatCurrency(total);
  }

  function renderPurchaseDraft() {
    purchaseItemsTbody.innerHTML = '';

    purchaseDraftItems.forEach((item) => {
      const inventoryItem = getInventoryById(item.inventoryId) || inventoryData[0];
      const subtotal = (Number(item.cantidad) || 0) * (Number(item.precioUnitario) || 0);
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <select data-field="inventoryId" data-id="${item.id}">
            ${inventoryData.map((inventoryOption) => `<option value="${inventoryOption.id}" ${inventoryOption.id === item.inventoryId ? 'selected' : ''}>${inventoryOption.nombre}</option>`).join('')}
          </select>
        </td>
        <td><input type="number" min="0.1" step="0.1" value="${item.cantidad}" data-field="cantidad" data-id="${item.id}"></td>
        <td><select data-field="unidad" data-id="${item.id}">${getUnitOptions(item.unidad)}</select></td>
        <td><input type="number" min="0" step="0.01" value="${item.precioUnitario}" data-field="precioUnitario" data-id="${item.id}"></td>
        <td><span class="purchases-item-subtotal">${formatCurrency(subtotal)}</span></td>
        <td><button type="button" class="purchases-item-remove" data-action="remove" data-id="${item.id}">Quitar</button></td>
      `;
      purchaseItemsTbody.appendChild(row);
    });

    purchaseItemsTbody.querySelectorAll('select, input').forEach((field) => {
      const eventName = field.tagName === 'SELECT' ? 'change' : 'input';
      field.addEventListener(eventName, () => {
        const draftItem = purchaseDraftItems.find((draft) => draft.id === field.dataset.id);
        if (!draftItem) return;

        if (field.dataset.field === 'inventoryId') {
          const inventoryItem = getInventoryById(field.value);
          draftItem.inventoryId = Number(field.value);
          if (inventoryItem) {
            draftItem.unidad = inventoryItem.unidad;
            if (!draftItem.precioUnitario) {
              draftItem.precioUnitario = inventoryItem.precioReferencial || 0;
            }
          }
          renderPurchaseDraft();
          return;
        } else if (field.dataset.field === 'cantidad' || field.dataset.field === 'precioUnitario') {
          draftItem[field.dataset.field] = parseFloat(field.value) || 0;
        } else {
          draftItem[field.dataset.field] = field.value;
        }

        const row = field.closest('tr');
        if (row) {
          const subtotalCell = row.querySelector('.purchases-item-subtotal');
          if (subtotalCell) {
            const subtotal = (Number(draftItem.cantidad) || 0) * (Number(draftItem.precioUnitario) || 0);
            subtotalCell.textContent = formatCurrency(subtotal);
          }
        }
        updatePurchaseDraftTotals();
      });
    });

    purchaseItemsTbody.querySelectorAll('[data-action="remove"]').forEach((button) => {
      button.addEventListener('click', () => {
        purchaseDraftItems = purchaseDraftItems.filter((draft) => draft.id !== button.dataset.id);
        if (!purchaseDraftItems.length) {
          purchaseDraftItems.push(createPurchaseDraftItem());
        }
        renderPurchaseDraft();
      });
    });

    updatePurchaseDraftTotals();
  }

  function openNewPurchaseView() {
    purchasesListView.classList.add('hidden');
    purchasesFormView.classList.remove('hidden');
    btnVolverHub.textContent = 'Volver';
    purchaseProvider.value = '';
    purchaseDate.value = '2026-05-09';
    purchasePaymentMethod.value = 'Transferencia';
    purchasePaymentState.value = 'Pagado';
    purchaseFormDateLabel.textContent = formatLongDate(purchaseDate.value);
    purchaseDraftItems = [createPurchaseDraftItem()];
    renderPurchaseDraft();
  }

  function showWorkspace(tabName) {
    currentOpsTab = tabName;
    opsHub.classList.add('hidden');
    opsWorkspace.classList.remove('hidden');
    tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.tab === tabName));
    panes.forEach((pane) => pane.classList.toggle('hidden', pane.id !== `pane-${tabName}`));
    btnVolverHub.textContent = 'Volver';
    if (tabName !== 'compras') {
      showPurchaseListView();
    }
    if (tabName !== 'insumos') {
      showRecipesListView();
    }
  }

  moduleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      showWorkspace(button.dataset.module);
      if (button.dataset.module === 'inventario') {
        renderInventoryTable();
      }
      if (button.dataset.module === 'insumos') {
        renderRecipesTable();
      }
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      showWorkspace(tab.dataset.tab);
      if (tab.dataset.tab === 'inventario') {
        renderInventoryTable();
      }
      if (tab.dataset.tab === 'insumos') {
        renderRecipesTable();
      }
    });
  });

  btnVolverHub.addEventListener('click', () => {
    if (!opsWorkspace.classList.contains('hidden') && currentOpsTab === 'compras' && !purchasesFormView.classList.contains('hidden')) {
      showPurchaseListView();
      return;
    }

    if (!opsWorkspace.classList.contains('hidden') && currentOpsTab === 'insumos' && !recipesFormView.classList.contains('hidden')) {
      showRecipesListView();
      return;
    }

    opsWorkspace.classList.add('hidden');
    opsHub.classList.remove('hidden');
  });

  inventorySearch.addEventListener('input', renderInventoryTable);
  inventoryCategory.addEventListener('change', renderInventoryTable);
  inventoryStatus.addEventListener('change', renderInventoryTable);
  purchasesSearch.addEventListener('input', renderPurchases);
  purchasesDateFrom.addEventListener('change', renderPurchases);
  purchasesDateTo.addEventListener('change', renderPurchases);
  purchasesPaymentStatus.addEventListener('change', renderPurchases);
  btnNewPurchase.addEventListener('click', openNewPurchaseView);
  btnCancelPurchase.addEventListener('click', showPurchaseListView);
  btnAddPurchaseItem.addEventListener('click', () => {
    purchaseDraftItems.push(createPurchaseDraftItem());
    renderPurchaseDraft();
  });
  purchaseDate.addEventListener('change', () => {
    purchaseFormDateLabel.textContent = formatLongDate(purchaseDate.value);
  });
  recipesSearch.addEventListener('input', renderRecipesTable);
  recipesTypeFilter.addEventListener('change', renderRecipesTable);
  recipesCategoryFilter.addEventListener('change', renderRecipesTable);
  btnNewRecipe.addEventListener('click', openNewRecipeView);
  btnCancelRecipe.addEventListener('click', showRecipesListView);
  btnAddRecipeItem.addEventListener('click', () => {
    recipeDraftItems.push(createRecipeDraftItem());
    renderRecipeDraft();
  });

  btnRefreshStock.addEventListener('click', () => {
    openStockAdjustmentModal();
  });

  btnAddInsumo.addEventListener('click', () => {
    openCreateInventoryModal();
  });

  btnCancelInsumo.addEventListener('click', () => {
    inventoryModalOverlay.classList.add('hidden');
    selectedInventoryId = null;
    renderInventoryTable();
  });

  btnSaveInsumo.addEventListener('click', () => {
    const nombre = insumoName.value.trim();
    const categoria = insumoCategory.value;
    const stock = parseFloat(insumoStock.value);
    const unidad = insumoUnit.value;
    const stockMinimo = parseFloat(insumoMinStock.value);
    const precioReferencial = parseFloat(insumoPrice.value);
    const vencimiento = insumoExpiration.value;
    const observacion = insumoObservation.value.trim();

    if (!nombre) {
      window.alert('Ingresa el nombre del insumo.');
      insumoName.focus();
      return;
    }

    if (!Number.isFinite(stockMinimo) || stockMinimo < 0) {
      window.alert('Ingresa un stock minimo valido.');
      insumoMinStock.focus();
      return;
    }

    const stockValue = Number.isFinite(stock) ? stock : 0;
    const now = new Date();
    const payload = {
      nombre,
      categoria,
      stock: stockValue,
      unidad,
      estado: deriveStatus(stockValue),
      actualizacion: now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
      stockMinimo,
      precioReferencial: Number.isFinite(precioReferencial) ? precioReferencial : null,
      vencimiento,
      observacion
    };

    if (inventoryModalMode === 'edit' && selectedInventoryId !== null) {
      const item = inventoryData.find((inventoryItem) => inventoryItem.id === selectedInventoryId);
      if (item) {
        Object.assign(item, payload);
      }
    } else {
      inventoryData.unshift({
        id: Date.now(),
        ...payload
      });
    }

    inventoryModalOverlay.classList.add('hidden');
    selectedInventoryId = null;
    inventoryModalMode = 'create';
    renderInventoryTable();
  });

  btnDeleteInsumo.addEventListener('click', () => {
    if (selectedInventoryId === null) return;
    const item = inventoryData.find((inventoryItem) => inventoryItem.id === selectedInventoryId);
    if (!item) return;

    const confirmed = window.confirm(`Se eliminara el insumo "${item.nombre}". Deseas continuar?`);
    if (!confirmed) return;

    const itemIndex = inventoryData.findIndex((inventoryItem) => inventoryItem.id === selectedInventoryId);
    if (itemIndex >= 0) {
      inventoryData.splice(itemIndex, 1);
    }

    inventoryModalOverlay.classList.add('hidden');
    selectedInventoryId = null;
    inventoryModalMode = 'create';
    renderInventoryTable();
  });

  btnCancelStockAdjustment.addEventListener('click', () => {
    stockAdjustmentModalOverlay.classList.add('hidden');
  });

  btnSaveStockAdjustment.addEventListener('click', () => {
    const itemId = Number(stockAdjustmentItem.value);
    const tipo = stockAdjustmentType.value;
    const cantidad = parseFloat(stockAdjustmentQuantity.value);
    const area = stockAdjustmentArea.value.trim();
    const detalle = stockAdjustmentNote.value.trim();
    const item = inventoryData.find((inventoryItem) => inventoryItem.id === itemId);

    if (!item) {
      window.alert('Selecciona un insumo valido.');
      return;
    }

    if (!Number.isFinite(cantidad) || cantidad <= 0) {
      window.alert('Ingresa una cantidad valida para descontar.');
      stockAdjustmentQuantity.focus();
      return;
    }

    if (!area) {
      window.alert('Ingresa el area o referencia del ajuste.');
      stockAdjustmentArea.focus();
      return;
    }

    if (!detalle) {
      window.alert('Detalla el motivo del ajuste.');
      stockAdjustmentNote.focus();
      return;
    }

    item.stock = Math.max(0, Number((item.stock - cantidad).toFixed(2)));
    item.estado = deriveStatus(item.stock);
    item.actualizacion = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });

    stockAdjustments.unshift({
      id: Date.now(),
      tipo,
      itemId: item.id,
      nombre: item.nombre,
      cantidad,
      unidad: item.unidad,
      area,
      detalle,
      hora: item.actualizacion
    });

    stockAdjustmentModalOverlay.classList.add('hidden');
    renderInventoryTable();
  });

  btnSubmitPurchase.addEventListener('click', () => {
    const proveedor = purchaseProvider.value.trim();
    const fecha = purchaseDate.value;
    const metodoPago = purchasePaymentMethod.value;
    const estadoPago = purchasePaymentState.value;

    if (!proveedor) {
      window.alert('Ingresa el nombre del proveedor.');
      purchaseProvider.focus();
      return;
    }

    if (!fecha) {
      window.alert('Selecciona la fecha de la compra.');
      purchaseDate.focus();
      return;
    }

    const validItems = purchaseDraftItems.filter((item) => item.inventoryId && item.cantidad > 0);
    if (!validItems.length) {
      window.alert('Agrega al menos un insumo a la compra.');
      return;
    }

    const total = getPurchaseDraftTotal();
    purchasesData.unshift({
      id: Date.now(),
      fecha,
      proveedor,
      total,
      metodoPago,
      estadoPago,
      usuario: 'Mukialom'
    });

    showPurchaseListView();
    renderPurchases();
  });

  btnSaveRecipe.addEventListener('click', () => {
    const nombre = recipeName.value.trim();
    const tipo = recipeType.value;
    const categoria = recipeCategory.value;
    const estado = recipeStatus.value;
    const observacion = recipeNotes.value.trim();

    if (!nombre) {
      window.alert('Ingresa el nombre de la receta.');
      recipeName.focus();
      return;
    }

    const ingredientes = recipeDraftItems
      .filter((item) => item.inventoryId && item.cantidad > 0)
      .map((item) => ({
        inventoryId: Number(item.inventoryId),
        cantidad: Number(item.cantidad) || 0,
        unidad: item.unidad
      }));

    if (!ingredientes.length) {
      window.alert('Agrega al menos un insumo a la receta.');
      return;
    }

    const payload = { nombre, tipo, categoria, estado, observacion, ingredientes };

    if (selectedRecipeId !== null) {
      const recipe = recipesData.find((item) => item.id === selectedRecipeId);
      if (recipe) {
        Object.assign(recipe, payload);
      }
    } else {
      recipesData.unshift({
        id: Date.now(),
        ...payload
      });
    }

    showRecipesListView();
    renderRecipesTable();
  });

  renderInventoryTable();
  purchasesDateFrom.value = '2026-05-06';
  purchasesDateTo.value = '2026-05-09';
  renderPurchases();
  showPurchaseListView();
  renderRecipesTable();
  showRecipesListView();
});
