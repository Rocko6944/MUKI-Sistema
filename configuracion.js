const USERS_STORAGE_KEY = 'mukiSettingsUsers';
const TABLE_MAP_STORAGE_KEY = 'mukiSettingsTableMap';
const CATEGORIES_STORAGE_KEY = 'mukiSettingsCategories';

const permissionCatalog = [
  { key: 'ventas', title: 'Modulo Ventas', description: 'Acceso al historial, pedidos y cobros.' },
  { key: 'caja', title: 'Caja', description: 'Abrir caja, registrar movimientos y cierre.' },
  { key: 'operaciones', title: 'Modulo Operaciones', description: 'Inventario, compras e insumos.' },
  { key: 'clientes', title: 'Modulo Clientes', description: 'Clientes, reservas y fidelizacion.' },
  { key: 'administracion', title: 'Modulo Administracion', description: 'Reportes y control gerencial.' },
  { key: 'emitirComprobante', title: 'Emitir comprobante', description: 'Generar boletas, facturas o notas.' },
  { key: 'cerrarCaja', title: 'Cerrar caja', description: 'Permitir cierre y arqueo de caja.' },
  { key: 'gestionarUsuarios', title: 'Gestionar usuarios', description: 'Crear usuarios, editar datos y credenciales.' },
  { key: 'configurarMesas', title: 'Configurar mesas', description: 'Editar pisos, layout y ubicacion del salon.' }
];

const rolePermissions = {
  Administrador: permissionCatalog.reduce((acc, item) => ({ ...acc, [item.key]: true }), {}),
  Cajero: {
    ventas: true,
    caja: true,
    operaciones: false,
    clientes: true,
    administracion: false,
    emitirComprobante: true,
    cerrarCaja: true,
    gestionarUsuarios: false,
    configurarMesas: false
  },
  Mozo: {
    ventas: true,
    caja: false,
    operaciones: false,
    clientes: true,
    administracion: false,
    emitirComprobante: false,
    cerrarCaja: false,
    gestionarUsuarios: false,
    configurarMesas: false
  },
  Operaciones: {
    ventas: false,
    caja: false,
    operaciones: true,
    clientes: false,
    administracion: true,
    emitirComprobante: false,
    cerrarCaja: false,
    gestionarUsuarios: false,
    configurarMesas: true
  }
};

const usersSeed = [
  {
    id: 'usr-001',
    nombre: 'Maria Lopez',
    rol: 'Administrador',
    usuario: 'mlopez',
    contrasena: 'Admin2026',
    telefono: '987654321',
    estado: 'Activo',
    permisos: { ...rolePermissions.Administrador }
  },
  {
    id: 'usr-002',
    nombre: 'Juan Perez',
    rol: 'Cajero',
    usuario: 'jperez',
    contrasena: 'Caja2026',
    telefono: '955112233',
    estado: 'Activo',
    permisos: { ...rolePermissions.Cajero }
  },
  {
    id: 'usr-003',
    nombre: 'Camila Rojas',
    rol: 'Mozo',
    usuario: 'crojas',
    contrasena: 'Salon2026',
    telefono: '944221199',
    estado: 'Activo',
    permisos: { ...rolePermissions.Mozo }
  },
  {
    id: 'usr-004',
    nombre: 'Pedro Gomez',
    rol: 'Operaciones',
    usuario: 'pgomez',
    contrasena: 'Ops2026',
    telefono: '933118877',
    estado: 'Inactivo',
    permisos: { ...rolePermissions.Operaciones }
  }
];

const categoriesSeed = [
  { id: 'cat-001', nombre: 'Fondos', tipo: 'Producto', descripcion: 'Platos principales de cocina.', estado: 'Activa' },
  { id: 'cat-002', nombre: 'Cocteles', tipo: 'Producto', descripcion: 'Bebidas y preparaciones de barra.', estado: 'Activa' },
  { id: 'cat-003', nombre: 'Verduras', tipo: 'Insumo', descripcion: 'Insumos frescos para cocina.', estado: 'Activa' },
  { id: 'cat-004', nombre: 'Carnes', tipo: 'Insumo', descripcion: 'Proteinas y cortes para produccion.', estado: 'Activa' }
];

const tableMapSeed = {
  floorCount: 1,
  activeFloor: 1,
  tables: [
    { id: 'tb-001', floor: 1, name: 'Mesa 1', capacity: 4, status: 'Libre', x: 14, y: 18 },
    { id: 'tb-002', floor: 1, name: 'Mesa 2', capacity: 2, status: 'Libre', x: 38, y: 16 },
    { id: 'tb-003', floor: 1, name: 'Mesa 3', capacity: 6, status: 'Reservada', x: 63, y: 20 },
    { id: 'tb-004', floor: 1, name: 'Mesa 4', capacity: 4, status: 'Ocupada', x: 23, y: 52 }
  ]
};

function safeParse(value, fallback) {
  try {
    return JSON.parse(value) || fallback;
  } catch {
    return fallback;
  }
}

function loadUsers() {
  const stored = safeParse(localStorage.getItem(USERS_STORAGE_KEY), []);
  return stored.length ? stored : usersSeed.map((item) => ({ ...item, permisos: { ...item.permisos } }));
}

function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function loadCategories() {
  const stored = safeParse(localStorage.getItem(CATEGORIES_STORAGE_KEY), []);
  return stored.length ? stored : categoriesSeed.map((item) => ({ ...item }));
}

function saveCategories(categories) {
  localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
}

function loadMap() {
  const stored = safeParse(localStorage.getItem(TABLE_MAP_STORAGE_KEY), null);
  if (stored && Array.isArray(stored.tables)) {
    return stored;
  }
  return {
    floorCount: tableMapSeed.floorCount,
    activeFloor: tableMapSeed.activeFloor,
    tables: tableMapSeed.tables.map((item) => ({ ...item }))
  };
}

function saveMap(mapState) {
  localStorage.setItem(TABLE_MAP_STORAGE_KEY, JSON.stringify(mapState));
}

function setupSettingsPage() {
  const page = document.querySelector('.settings-page');
  if (!page) {
    return;
  }

  let users = loadUsers();
  let categories = loadCategories();
  let mapState = loadMap();
  let activeTab = 'usuarios';
  let selectedUserId = '';
  let selectedTableId = '';
  let selectedCategoryId = '';
  let dragState = null;

  const userSearch = document.getElementById('settings-user-search');
  const roleFilter = document.getElementById('settings-role-filter');
  const statusFilter = document.getElementById('settings-status-filter');
  const clearFiltersButton = document.getElementById('settings-clear-filters');
  const newUserButton = document.getElementById('settings-new-user');
  const usersTbody = document.getElementById('settings-users-tbody');
  const userForm = document.getElementById('settings-user-form');
  const editorTitle = document.getElementById('settings-editor-title');
  const permissionsGrid = document.getElementById('settings-permissions-grid');
  const resetUserButton = document.getElementById('settings-reset-user');
  const tabs = Array.from(document.querySelectorAll('.settings-tab'));
  const panes = {
    usuarios: document.getElementById('settings-pane-usuarios'),
    mesas: document.getElementById('settings-pane-mesas'),
    categorias: document.getElementById('settings-pane-categorias')
  };

  const floorCountDisplay = document.getElementById('settings-floor-count-display');
  const floorTabs = document.getElementById('settings-floor-tabs');
  const mapCanvas = document.getElementById('settings-map-canvas');
  const addTableButton = document.getElementById('settings-add-table');
  const resetMapButton = document.getElementById('settings-reset-map');
  const addFloorButton = document.getElementById('settings-add-floor');
  const tableForm = document.getElementById('settings-table-form');

  const categorySearch = document.getElementById('settings-category-search');
  const categoryTypeFilter = document.getElementById('settings-category-type-filter');
  const clearCategoriesButton = document.getElementById('settings-clear-categories');
  const newCategoryButton = document.getElementById('settings-new-category');
  const categoriesTbody = document.getElementById('settings-categories-tbody');
  const categoryForm = document.getElementById('settings-category-form');
  const categoryEditorTitle = document.getElementById('settings-category-editor-title');
  const resetCategoryButton = document.getElementById('settings-reset-category');

  const userFields = {
    id: document.getElementById('settings-user-id'),
    nombre: document.getElementById('settings-name'),
    rol: document.getElementById('settings-role'),
    usuario: document.getElementById('settings-username'),
    contrasena: document.getElementById('settings-password'),
    telefono: document.getElementById('settings-phone'),
    estado: document.getElementById('settings-user-status')
  };

  const categoryFields = {
    id: document.getElementById('settings-category-id'),
    nombre: document.getElementById('settings-category-name'),
    tipo: document.getElementById('settings-category-type'),
    descripcion: document.getElementById('settings-category-description'),
    estado: document.getElementById('settings-category-status')
  };

  const tableFields = {
    id: document.getElementById('settings-table-id'),
    name: document.getElementById('settings-table-name'),
    capacity: document.getElementById('settings-table-capacity'),
    floor: document.getElementById('settings-table-floor'),
    status: document.getElementById('settings-table-status'),
    x: document.getElementById('settings-table-x'),
    y: document.getElementById('settings-table-y'),
    deleteButton: document.getElementById('settings-delete-table')
  };

  function renderPermissions(permissions = rolePermissions.Administrador) {
    permissionsGrid.innerHTML = '';

    permissionCatalog.forEach((permission) => {
      const label = document.createElement('label');
      label.className = 'settings-permission';
      label.innerHTML = `
        <input type="checkbox" data-permission="${permission.key}" ${permissions[permission.key] ? 'checked' : ''}>
        <div class="settings-permission__text">
          <span class="settings-permission__title">${permission.title}</span>
          <span class="settings-permission__desc">${permission.description}</span>
        </div>
      `;
      permissionsGrid.appendChild(label);
    });
  }

  function collectPermissions() {
    const permissions = {};
    permissionsGrid.querySelectorAll('input[data-permission]').forEach((input) => {
      permissions[input.dataset.permission] = input.checked;
    });
    return permissions;
  }

  function resetUserForm(role = 'Administrador') {
    selectedUserId = '';
    editorTitle.textContent = 'Nuevo usuario';
    userFields.id.value = '';
    userFields.nombre.value = '';
    userFields.rol.value = role;
    userFields.usuario.value = '';
    userFields.contrasena.value = '';
    userFields.telefono.value = '';
    userFields.estado.value = 'Activo';
    renderPermissions(rolePermissions[role] || rolePermissions.Administrador);
    renderUsersTable();
  }

  function fillUserForm(user) {
    selectedUserId = user.id;
    editorTitle.textContent = `Editar usuario: ${user.nombre}`;
    userFields.id.value = user.id;
    userFields.nombre.value = user.nombre;
    userFields.rol.value = user.rol;
    userFields.usuario.value = user.usuario;
    userFields.contrasena.value = user.contrasena;
    userFields.telefono.value = user.telefono || '';
    userFields.estado.value = user.estado;
    renderPermissions(user.permisos || rolePermissions[user.rol] || rolePermissions.Administrador);
    renderUsersTable();
  }

  function buildSuggestedCredentials() {
    const normalized = userFields.nombre.value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '.').replace(/^\.+|\.+$/g, '');
    if (!selectedUserId) {
      if (!userFields.usuario.value.trim()) {
        userFields.usuario.value = normalized || `usuario.${Date.now().toString().slice(-4)}`;
      }
      if (!userFields.contrasena.value.trim()) {
        const rolePrefix = (userFields.rol.value || 'Rol').slice(0, 3).toUpperCase();
        userFields.contrasena.value = `${rolePrefix}${new Date().getFullYear()}!`;
      }
    }
  }

  function getFilteredUsers() {
    const term = userSearch.value.trim().toLowerCase();
    const role = roleFilter.value;
    const status = statusFilter.value;

    return users.filter((user) => {
      const matchTerm = !term || [user.nombre, user.rol, user.usuario].some((value) => String(value).toLowerCase().includes(term));
      const matchRole = !role || user.rol === role;
      const matchStatus = !status || user.estado === status;
      return matchTerm && matchRole && matchStatus;
    });
  }

  function renderUsersTable() {
    const filtered = getFilteredUsers();
    usersTbody.innerHTML = '';

    filtered.forEach((user) => {
      const tr = document.createElement('tr');
      if (user.id === selectedUserId) {
        tr.classList.add('is-active');
      }

      tr.innerHTML = `
        <td>${user.nombre}</td>
        <td>${user.rol}</td>
        <td>${user.usuario}</td>
        <td><span class="settings-badge ${user.estado === 'Activo' ? 'settings-badge--active' : 'settings-badge--inactive'}">${user.estado}</span></td>
      `;
      tr.addEventListener('click', () => fillUserForm(user));
      usersTbody.appendChild(tr);
    });
  }

  function buildUserId() {
    return `usr-${Date.now()}`;
  }

  function saveUser(event) {
    event.preventDefault();
    const userPayload = {
      id: userFields.id.value || buildUserId(),
      nombre: userFields.nombre.value.trim(),
      rol: userFields.rol.value,
      usuario: userFields.usuario.value.trim(),
      contrasena: userFields.contrasena.value.trim(),
      telefono: userFields.telefono.value.trim(),
      estado: userFields.estado.value,
      permisos: collectPermissions()
    };

    if (!userPayload.nombre || !userPayload.usuario || !userPayload.contrasena) {
      return;
    }

    const existingIndex = users.findIndex((user) => user.id === userPayload.id);
    if (existingIndex >= 0) {
      users.splice(existingIndex, 1, userPayload);
    } else {
      users.unshift(userPayload);
    }

    saveUsers(users);
    fillUserForm(userPayload);
  }

  function renderFloorTabs() {
    floorTabs.innerHTML = '';
    tableFields.floor.innerHTML = '';
    floorCountDisplay.value = `${mapState.floorCount} ${mapState.floorCount === 1 ? 'piso' : 'pisos'}`;

    for (let floor = 1; floor <= mapState.floorCount; floor += 1) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `settings-floor-tab${mapState.activeFloor === floor ? ' active' : ''}`;
      button.textContent = `Piso ${floor}`;
      button.addEventListener('click', () => {
        mapState.activeFloor = floor;
        saveMap(mapState);
        renderFloorTabs();
        renderMap();
        fillTableForm(getCurrentFloorTables()[0] || null);
      });
      floorTabs.appendChild(button);

      const option = document.createElement('option');
      option.value = String(floor);
      option.textContent = `Piso ${floor}`;
      tableFields.floor.appendChild(option);
    }
  }

  function getCurrentFloorTables() {
    return mapState.tables.filter((table) => table.floor === mapState.activeFloor);
  }

  function clampPosition(value) {
    return Math.max(0, Math.min(90, Number(value) || 0));
  }

  function fillTableForm(table) {
    if (!table) {
      selectedTableId = '';
      tableFields.id.value = '';
      tableFields.name.value = '';
      tableFields.capacity.value = '';
      tableFields.floor.value = String(mapState.activeFloor);
      tableFields.status.value = 'Libre';
      tableFields.x.value = '';
      tableFields.y.value = '';
      return;
    }

    selectedTableId = table.id;
    tableFields.id.value = table.id;
    tableFields.name.value = table.name;
    tableFields.capacity.value = table.capacity;
    tableFields.floor.value = String(table.floor);
    tableFields.status.value = table.status;
    tableFields.x.value = table.x;
    tableFields.y.value = table.y;
    renderMap();
  }

  function renderMap() {
    mapCanvas.innerHTML = '';

    getCurrentFloorTables().forEach((table) => {
      const node = document.createElement('button');
      node.type = 'button';
      node.className = `settings-table-node${table.id === selectedTableId ? ' is-active' : ''}`;
      node.style.left = `${table.x}%`;
      node.style.top = `${table.y}%`;
      node.dataset.id = table.id;
      node.innerHTML = `
        <span class="settings-table-node__name">${table.name}</span>
        <span class="settings-table-node__meta">${table.capacity} personas</span>
      `;

      node.addEventListener('click', () => fillTableForm(table));
      node.addEventListener('pointerdown', (event) => {
        dragState = {
          id: table.id,
          rect: mapCanvas.getBoundingClientRect(),
          offsetX: event.clientX,
          offsetY: event.clientY
        };
        node.setPointerCapture(event.pointerId);
      });

      node.addEventListener('pointermove', (event) => {
        if (!dragState || dragState.id !== table.id) {
          return;
        }

        const relativeX = ((event.clientX - dragState.rect.left) / dragState.rect.width) * 100;
        const relativeY = ((event.clientY - dragState.rect.top) / dragState.rect.height) * 100;
        const x = clampPosition(relativeX - 6);
        const y = clampPosition(relativeY - 6);
        node.style.left = `${x}%`;
        node.style.top = `${y}%`;
      });

      node.addEventListener('pointerup', (event) => {
        if (!dragState || dragState.id !== table.id) {
          return;
        }

        const relativeX = ((event.clientX - dragState.rect.left) / dragState.rect.width) * 100;
        const relativeY = ((event.clientY - dragState.rect.top) / dragState.rect.height) * 100;
        table.x = clampPosition(relativeX - 6);
        table.y = clampPosition(relativeY - 6);
        saveMap(mapState);
        fillTableForm(table);
        dragState = null;
      });

      mapCanvas.appendChild(node);
    });
  }

  function buildTableId() {
    return `tb-${Date.now()}`;
  }

  function addFloor() {
    mapState.floorCount += 1;
    mapState.activeFloor = mapState.floorCount;
    saveMap(mapState);
    renderFloorTabs();
    renderMap();
    fillTableForm(getCurrentFloorTables()[0] || null);
  }

  function addTable() {
    const nextNumber = mapState.tables.length + 1;
    const newTable = {
      id: buildTableId(),
      floor: mapState.activeFloor,
      name: `Mesa ${nextNumber}`,
      capacity: 4,
      status: 'Libre',
      x: 12,
      y: 14
    };

    mapState.tables.push(newTable);
    saveMap(mapState);
    renderMap();
    fillTableForm(newTable);
  }

  function saveTable(event) {
    event.preventDefault();

    if (!tableFields.id.value) {
      return;
    }

    const table = mapState.tables.find((item) => item.id === tableFields.id.value);
    if (!table) {
      return;
    }

    table.name = tableFields.name.value.trim() || table.name;
    table.capacity = Math.max(1, Number(tableFields.capacity.value) || 1);
    table.floor = Number(tableFields.floor.value) || mapState.activeFloor;
    table.status = tableFields.status.value;
    table.x = clampPosition(tableFields.x.value);
    table.y = clampPosition(tableFields.y.value);
    mapState.activeFloor = table.floor;

    saveMap(mapState);
    renderFloorTabs();
    renderMap();
    fillTableForm(table);
  }

  function deleteTable() {
    if (!selectedTableId) {
      return;
    }
    mapState.tables = mapState.tables.filter((table) => table.id !== selectedTableId);
    saveMap(mapState);
    renderMap();
    fillTableForm(getCurrentFloorTables()[0] || null);
  }

  function resetMap() {
    mapState = {
      floorCount: tableMapSeed.floorCount,
      activeFloor: tableMapSeed.activeFloor,
      tables: tableMapSeed.tables.map((item) => ({ ...item }))
    };
    saveMap(mapState);
    renderFloorTabs();
    renderMap();
    fillTableForm(getCurrentFloorTables()[0] || null);
  }

  function resetCategoryForm() {
    selectedCategoryId = '';
    categoryEditorTitle.textContent = 'Nueva categoria';
    categoryFields.id.value = '';
    categoryFields.nombre.value = '';
    categoryFields.tipo.value = 'Producto';
    categoryFields.descripcion.value = '';
    categoryFields.estado.value = 'Activa';
    renderCategoriesTable();
  }

  function fillCategoryForm(category) {
    selectedCategoryId = category.id;
    categoryEditorTitle.textContent = `Editar categoria: ${category.nombre}`;
    categoryFields.id.value = category.id;
    categoryFields.nombre.value = category.nombre;
    categoryFields.tipo.value = category.tipo;
    categoryFields.descripcion.value = category.descripcion;
    categoryFields.estado.value = category.estado;
    renderCategoriesTable();
  }

  function getFilteredCategories() {
    const term = categorySearch.value.trim().toLowerCase();
    const type = categoryTypeFilter.value;

    return categories.filter((category) => {
      const matchTerm = !term || [category.nombre, category.tipo, category.descripcion].some((value) => String(value).toLowerCase().includes(term));
      const matchType = !type || category.tipo === type;
      return matchTerm && matchType;
    });
  }

  function renderCategoriesTable() {
    const filtered = getFilteredCategories();
    categoriesTbody.innerHTML = '';

    filtered.forEach((category) => {
      const tr = document.createElement('tr');
      if (category.id === selectedCategoryId) {
        tr.classList.add('is-active');
      }

      tr.innerHTML = `
        <td>${category.nombre}</td>
        <td>${category.tipo}</td>
        <td>${category.descripcion}</td>
        <td><span class="settings-badge ${category.estado === 'Activa' ? 'settings-badge--active-soft' : 'settings-badge--inactive'}">${category.estado}</span></td>
      `;
      tr.addEventListener('click', () => fillCategoryForm(category));
      categoriesTbody.appendChild(tr);
    });
  }

  function buildCategoryId() {
    return `cat-${Date.now()}`;
  }

  function saveCategory(event) {
    event.preventDefault();

    const categoryPayload = {
      id: categoryFields.id.value || buildCategoryId(),
      nombre: categoryFields.nombre.value.trim(),
      tipo: categoryFields.tipo.value,
      descripcion: categoryFields.descripcion.value.trim(),
      estado: categoryFields.estado.value
    };

    if (!categoryPayload.nombre) {
      return;
    }

    const existingIndex = categories.findIndex((item) => item.id === categoryPayload.id);
    if (existingIndex >= 0) {
      categories.splice(existingIndex, 1, categoryPayload);
    } else {
      categories.unshift(categoryPayload);
    }

    saveCategories(categories);
    fillCategoryForm(categoryPayload);
  }

  function switchTab(tab) {
    activeTab = tab;
    tabs.forEach((button) => button.classList.toggle('active', button.dataset.tab === tab));
    Object.entries(panes).forEach(([key, pane]) => pane.classList.toggle('hidden', key !== tab));
  }

  tabs.forEach((button) => {
    button.addEventListener('click', () => switchTab(button.dataset.tab));
  });

  renderPermissions(rolePermissions.Administrador);
  resetUserForm('Administrador');
  renderUsersTable();
  resetCategoryForm();
  renderCategoriesTable();

  userSearch.addEventListener('input', renderUsersTable);
  roleFilter.addEventListener('change', renderUsersTable);
  statusFilter.addEventListener('change', renderUsersTable);
  userFields.nombre.addEventListener('blur', buildSuggestedCredentials);
  userFields.rol.addEventListener('change', () => {
    if (!selectedUserId) {
      renderPermissions(rolePermissions[userFields.rol.value] || rolePermissions.Administrador);
      buildSuggestedCredentials();
    }
  });
  clearFiltersButton.addEventListener('click', () => {
    userSearch.value = '';
    roleFilter.value = '';
    statusFilter.value = '';
    renderUsersTable();
  });

  newUserButton.addEventListener('click', () => resetUserForm('Administrador'));
  resetUserButton.addEventListener('click', () => resetUserForm(userFields.rol.value || 'Administrador'));
  userForm.addEventListener('submit', saveUser);

  renderFloorTabs();
  renderMap();
  fillTableForm(getCurrentFloorTables()[0] || null);

  categorySearch.addEventListener('input', renderCategoriesTable);
  categoryTypeFilter.addEventListener('change', renderCategoriesTable);
  clearCategoriesButton.addEventListener('click', () => {
    categorySearch.value = '';
    categoryTypeFilter.value = '';
    renderCategoriesTable();
  });
  newCategoryButton.addEventListener('click', resetCategoryForm);
  resetCategoryButton.addEventListener('click', resetCategoryForm);
  categoryForm.addEventListener('submit', saveCategory);

  addFloorButton.addEventListener('click', addFloor);
  addTableButton.addEventListener('click', addTable);
  resetMapButton.addEventListener('click', resetMap);
  tableForm.addEventListener('submit', saveTable);
  tableFields.deleteButton.addEventListener('click', deleteTable);
}

document.addEventListener('DOMContentLoaded', setupSettingsPage);
