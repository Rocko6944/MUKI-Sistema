document.addEventListener('DOMContentLoaded', () => {
  const CLIENTS_STORAGE_KEY = 'muki_clientes_registrados';
  const seedClients = [
    {
      id: 'c1',
      nombre: 'Mariana Lopez Torres',
      telefono: '987654321',
      correo: 'mariana.lopez@email.com',
      documento: '45871236',
      visitas: 5,
      ultimaVisita: '2026-04-10',
      estado: 'Activo',
      origen: 'Facturacion'
    },
    {
      id: 'c2',
      nombre: 'Inversiones Gastronomicas Andinas S.A.C.',
      telefono: '985221144',
      correo: 'facturacion@andinas.pe',
      documento: '10458712361',
      visitas: 3,
      ultimaVisita: '2026-04-12',
      estado: 'Activo',
      origen: 'Facturacion'
    },
    {
      id: 'c3',
      nombre: 'Carlos Mendoza Rios',
      telefono: '944444444',
      correo: 'carlos.mendoza@email.com',
      documento: '72145689',
      visitas: 2,
      ultimaVisita: '2026-04-08',
      estado: 'Activo',
      origen: 'Facturacion'
    },
    {
      id: 'c4',
      nombre: 'Comercial Del Puerto E.I.R.L.',
      telefono: '955555555',
      correo: 'ventas@delpuerto.pe',
      documento: '20605487991',
      visitas: 1,
      ultimaVisita: '2026-04-05',
      estado: 'Activo',
      origen: 'Facturacion'
    },
    {
      id: 'c5',
      nombre: 'Cliente ocasional sin comprobante',
      telefono: '933333333',
      correo: 'sinvisitas@email.com',
      documento: '',
      visitas: 0,
      ultimaVisita: '',
      estado: 'Inactivo',
      origen: 'Manual'
    }
  ];

  function readClients() {
    try {
      const stored = JSON.parse(localStorage.getItem(CLIENTS_STORAGE_KEY) || 'null');
      if (Array.isArray(stored) && stored.length) return stored;
    } catch (error) {
      console.error('No se pudo leer clientes guardados', error);
    }
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(seedClients));
    return [...seedClients];
  }

  function writeClients() {
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clientsData));
  }

  function formatVisitDate(dateValue) {
    if (!dateValue) return '-';
    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) return dateValue;
    return parsed.toLocaleDateString('es-PE');
  }

  function getClientCategory(visitas) {
    if (visitas > 10) {
      return { label: 'Oro', className: 'clients-category--oro' };
    }
    if (visitas >= 5) {
      return { label: 'Plata', className: 'clients-category--plata' };
    }
    return { label: 'Cobre', className: 'clients-category--cobre' };
  }

  let clientsData = readClients();
  let currentTab = 'clientes';

  const clientsHub = document.getElementById('clients-hub');
  const clientsWorkspace = document.getElementById('clients-workspace');
  const btnVolverClientes = document.getElementById('btn-volver-clientes');
  const tabButtons = Array.from(document.querySelectorAll('.clients-tab'));
  const moduleButtons = Array.from(document.querySelectorAll('.clients-card__btn[data-module]'));
  const panes = {
    clientes: document.getElementById('pane-clientes'),
    reservas: document.getElementById('pane-reservas'),
    historial: document.getElementById('pane-historial')
  };

  const clientsSearch = document.getElementById('clients-search');
  const clientsStatus = document.getElementById('clients-status');
  const btnClearClients = document.getElementById('btn-clear-clients');
  const btnNewClient = document.getElementById('btn-new-client');
  const clientsTbody = document.getElementById('clients-tbody');
  const clientsEmpty = document.getElementById('clients-empty');

  const clientModalOverlay = document.getElementById('client-modal-overlay');
  const clientName = document.getElementById('client-name');
  const clientPhone = document.getElementById('client-phone');
  const clientEmail = document.getElementById('client-email');
  const clientDocument = document.getElementById('client-document');
  const clientStatus = document.getElementById('client-status');
  const btnCancelClient = document.getElementById('btn-cancel-client');
  const btnSaveClient = document.getElementById('btn-save-client');
  const clientDetailOverlay = document.getElementById('client-detail-overlay');
  const btnCloseClientDetail = document.getElementById('btn-close-client-detail');
  const detailClientName = document.getElementById('detail-client-name');
  const detailClientDocument = document.getElementById('detail-client-document');
  const detailClientPhone = document.getElementById('detail-client-phone');
  const detailClientEmail = document.getElementById('detail-client-email');
  const detailClientVisits = document.getElementById('detail-client-visits');
  const detailClientCategory = document.getElementById('detail-client-category');
  const detailClientLastVisit = document.getElementById('detail-client-last-visit');
  const detailClientStatus = document.getElementById('detail-client-status');

  function renderClientsTable() {
    const term = clientsSearch.value.trim().toLowerCase();
    const selectedStatus = clientsStatus.value;

    const filtered = clientsData.filter((client) => {
      const haystack = [
        client.nombre,
        client.telefono,
        client.correo,
        client.documento
      ].join(' ').toLowerCase();

      const matchesTerm = !term || haystack.includes(term);
      const matchesStatus = !selectedStatus || client.estado === selectedStatus;
      return matchesTerm && matchesStatus;
    });

    clientsTbody.innerHTML = filtered.map((client) => `
      <tr>
        <td>${client.nombre}</td>
        <td>${client.telefono || '-'}</td>
        <td>${client.correo || '-'}</td>
        <td>${client.visitas || 0}</td>
        <td><span class="clients-category ${getClientCategory(client.visitas || 0).className}">${getClientCategory(client.visitas || 0).label}</span></td>
        <td>${formatVisitDate(client.ultimaVisita)}</td>
        <td><span class="clients-status ${client.estado === 'Activo' ? 'clients-status--active' : 'clients-status--inactive'}">${client.estado}</span></td>
      </tr>
    `).join('');

    clientsEmpty.classList.toggle('hidden', filtered.length > 0);
  }

  function openClientDetail(client) {
    const category = getClientCategory(client.visitas || 0);
    detailClientName.textContent = client.nombre || '-';
    detailClientDocument.textContent = client.documento || '-';
    detailClientPhone.textContent = client.telefono || '-';
    detailClientEmail.textContent = client.correo || '-';
    detailClientVisits.textContent = `${client.visitas || 0}`;
    detailClientCategory.textContent = category.label;
    detailClientLastVisit.textContent = formatVisitDate(client.ultimaVisita);
    detailClientStatus.textContent = client.estado || '-';
    clientDetailOverlay.classList.remove('hidden');
  }

  function showWorkspace(tabName) {
    currentTab = tabName;
    clientsHub.classList.add('hidden');
    clientsWorkspace.classList.remove('hidden');

    tabButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.tab === tabName);
    });

    Object.entries(panes).forEach(([key, pane]) => {
      pane.classList.toggle('hidden', key !== tabName);
    });

    if (tabName === 'clientes') {
      clientsData = readClients();
      renderClientsTable();
    }
  }

  function resetClientModal() {
    clientName.value = '';
    clientPhone.value = '';
    clientEmail.value = '';
    clientDocument.value = '';
    clientStatus.value = 'Activo';
  }

  function openClientModal() {
    resetClientModal();
    clientModalOverlay.classList.remove('hidden');
  }

  moduleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      showWorkspace(button.dataset.module);
    });
  });

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      showWorkspace(button.dataset.tab);
    });
  });

  btnVolverClientes.addEventListener('click', () => {
    clientsWorkspace.classList.add('hidden');
    clientsHub.classList.remove('hidden');
  });

  clientsSearch.addEventListener('input', renderClientsTable);
  clientsStatus.addEventListener('change', renderClientsTable);

  btnClearClients.addEventListener('click', () => {
    clientsSearch.value = '';
    clientsStatus.value = '';
    renderClientsTable();
  });

  btnNewClient.addEventListener('click', openClientModal);
  btnCancelClient.addEventListener('click', () => {
    clientModalOverlay.classList.add('hidden');
  });

  btnCloseClientDetail.addEventListener('click', () => {
    clientDetailOverlay.classList.add('hidden');
  });

  btnSaveClient.addEventListener('click', () => {
    const nombre = clientName.value.trim();
    if (!nombre) {
      window.alert('Debes ingresar el nombre del cliente.');
      clientName.focus();
      return;
    }

    const nuevoCliente = {
      id: `c${Date.now()}`,
      nombre,
      telefono: clientPhone.value.trim(),
      correo: clientEmail.value.trim(),
      documento: clientDocument.value.trim(),
      visitas: 0,
      ultimaVisita: '',
      estado: clientStatus.value,
      origen: 'Manual'
    };

    clientsData.unshift(nuevoCliente);
    writeClients();
    renderClientsTable();
    clientModalOverlay.classList.add('hidden');
  });

  clientsTbody.addEventListener('click', (event) => {
    const row = event.target.closest('tr');
    if (!row) return;
    const index = Array.from(clientsTbody.querySelectorAll('tr')).indexOf(row);
    const term = clientsSearch.value.trim().toLowerCase();
    const selectedStatus = clientsStatus.value;
    const filtered = clientsData.filter((client) => {
      const haystack = [
        client.nombre,
        client.telefono,
        client.correo,
        client.documento
      ].join(' ').toLowerCase();
      const matchesTerm = !term || haystack.includes(term);
      const matchesStatus = !selectedStatus || client.estado === selectedStatus;
      return matchesTerm && matchesStatus;
    });
    const client = filtered[index];
    if (!client) return;
    openClientDetail(client);
  });

  renderClientsTable();
});
