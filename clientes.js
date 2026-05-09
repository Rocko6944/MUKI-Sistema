document.addEventListener('DOMContentLoaded', () => {
  const CLIENTS_STORAGE_KEY = 'muki_clientes_registrados';
  const RESERVATIONS_STORAGE_KEY = 'muki_reservas_registradas';
  const seedClients = [
    {
      id: 'c1',
      nombre: 'Mariana Lopez Torres',
      telefono: '987654321',
      correo: 'mariana.lopez@email.com',
      documento: '45871236',
      visitas: 12,
      ultimaVisita: '2026-04-10',
      estado: 'Activo',
      origen: 'Facturacion',
      recompensaActual: '',
      historialRecompensas: []
    },
    {
      id: 'c1b',
      nombre: 'Luciana Vega Salazar',
      telefono: '988112233',
      correo: 'luciana.vega@email.com',
      documento: '48751234',
      visitas: 14,
      ultimaVisita: '2026-04-13',
      estado: 'Activo',
      origen: 'Facturacion',
      recompensaActual: 'Postre de cortesía',
      historialRecompensas: []
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
      origen: 'Facturacion',
      recompensaActual: '',
      historialRecompensas: []
    },
    {
      id: 'c3',
      nombre: 'Carlos Mendoza Rios',
      telefono: '944444444',
      correo: 'carlos.mendoza@email.com',
      documento: '72145689',
      visitas: 11,
      ultimaVisita: '2026-04-08',
      estado: 'Activo',
      origen: 'Facturacion',
      recompensaActual: '',
      historialRecompensas: []
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
      origen: 'Facturacion',
      recompensaActual: '',
      historialRecompensas: []
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
      origen: 'Manual',
      recompensaActual: '',
      historialRecompensas: []
    }
  ];
  const seedReservations = [
    {
      id: 'r1',
      cliente: 'Juan Perez',
      telefono: '987654321',
      correo: 'juan@email.com',
      fecha: '2026-04-12',
      hora: '20:00',
      personas: 2,
      estado: 'Confirmada',
      origen: 'Web',
      detalle: 'Cena de aniversario'
    },
    {
      id: 'r2',
      cliente: 'Maria Lopez',
      telefono: '912345678',
      correo: 'maria@email.com',
      fecha: '2026-04-12',
      hora: '19:00',
      personas: 4,
      estado: 'Pendiente',
      origen: 'Web',
      detalle: 'Solicitud de mesa tranquila'
    },
    {
      id: 'r3',
      cliente: 'Carlos Ruiz',
      telefono: '944444444',
      correo: 'carlos@email.com',
      fecha: '2026-04-11',
      hora: '18:00',
      personas: 3,
      estado: 'Atendida',
      origen: 'Web',
      detalle: 'Celebracion familiar'
    },
    {
      id: 'r4',
      cliente: 'Ana Torres',
      telefono: '933333333',
      correo: 'ana@email.com',
      fecha: '2026-04-10',
      hora: '21:00',
      personas: 2,
      estado: 'Cancelada',
      origen: 'Web',
      detalle: 'Aniversario de novios'
    }
  ];

  function readClients() {
    try {
      const stored = JSON.parse(localStorage.getItem(CLIENTS_STORAGE_KEY) || 'null');
      if (Array.isArray(stored) && stored.length) {
        const merged = [...stored];
        seedClients.forEach((seedClient) => {
          const exists = merged.some((client) => client.id === seedClient.id);
          if (!exists) {
            merged.push(seedClient);
          }
        });
        localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }
    } catch (error) {
      console.error('No se pudo leer clientes guardados', error);
    }
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(seedClients));
    return [...seedClients];
  }

  function writeClients() {
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clientsData));
  }

  function readReservations() {
    try {
      const stored = JSON.parse(localStorage.getItem(RESERVATIONS_STORAGE_KEY) || 'null');
      if (Array.isArray(stored) && stored.length) return stored;
    } catch (error) {
      console.error('No se pudo leer reservas guardadas', error);
    }
    localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(seedReservations));
    return [...seedReservations];
  }

  function writeReservations() {
    localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(reservationsData));
  }

  function formatVisitDate(dateValue) {
    if (!dateValue) return '-';
    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) return dateValue;
    return parsed.toLocaleDateString('es-PE');
  }

  function formatDateTime(dateValue) {
    if (!dateValue) return '-';
    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) return dateValue;
    return `${parsed.toLocaleDateString('es-PE')} ${parsed.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}`;
  }

  function getReservationStatusClass(status) {
    const statusMap = {
      Pendiente: 'clients-status clients-status--pending',
      Confirmada: 'clients-status clients-status--confirmed',
      Atendida: 'clients-status clients-status--attended',
      Cancelada: 'clients-status clients-status--cancelled'
    };
    return statusMap[status] || 'clients-status clients-status--inactive';
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

  function normalizeClientsRewardData() {
    clientsData = clientsData.map((client) => ({
      ...client,
      recompensaActual: client.recompensaActual || '',
      historialRecompensas: Array.isArray(client.historialRecompensas) ? client.historialRecompensas : []
    }));
  }

  let clientsData = readClients();
  let reservationsData = readReservations();
  let currentTab = 'clientes';
  let selectedClientId = null;
  let selectedReservationId = null;

  const clientsHub = document.getElementById('clients-hub');
  const clientsWorkspace = document.getElementById('clients-workspace');
  const btnVolverClientes = document.getElementById('btn-volver-clientes');
  const tabButtons = Array.from(document.querySelectorAll('.clients-tab'));
  const moduleButtons = Array.from(document.querySelectorAll('.clients-card__btn[data-module]'));
  const panes = {
    clientes: document.getElementById('pane-clientes'),
    reservas: document.getElementById('pane-reservas')
  };

  const clientsSearch = document.getElementById('clients-search');
  const clientsCategoryFilter = document.getElementById('clients-category-filter');
  const btnClearClients = document.getElementById('btn-clear-clients');
  const btnNewClient = document.getElementById('btn-new-client');
  const clientsTbody = document.getElementById('clients-tbody');
  const clientsEmpty = document.getElementById('clients-empty');
  const reservationsSearch = document.getElementById('reservations-search');
  const reservationsStatusFilter = document.getElementById('reservations-status-filter');
  const btnClearReservations = document.getElementById('btn-clear-reservations');
  const btnNewReservation = document.getElementById('btn-new-reservation');
  const reservationsTbody = document.getElementById('reservations-tbody');
  const reservationsEmpty = document.getElementById('reservations-empty');

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
  const btnDeleteClientDetail = document.getElementById('btn-delete-client-detail');
  const detailClientName = document.getElementById('detail-client-name');
  const detailClientDocument = document.getElementById('detail-client-document');
  const detailClientPhone = document.getElementById('detail-client-phone');
  const detailClientEmail = document.getElementById('detail-client-email');
  const detailClientVisits = document.getElementById('detail-client-visits');
  const detailClientCategory = document.getElementById('detail-client-category');
  const detailClientRewardInput = document.getElementById('detail-client-reward-input');
  const btnSaveClientReward = document.getElementById('btn-save-client-reward');
  const btnDeliverClientReward = document.getElementById('btn-deliver-client-reward');
  const detailClientRewardHint = document.getElementById('detail-client-reward-hint');
  const detailClientRewardHistory = document.getElementById('detail-client-reward-history');
  const detailClientLastVisit = document.getElementById('detail-client-last-visit');
  const detailClientStatus = document.getElementById('detail-client-status');
  const reservationModalOverlay = document.getElementById('reservation-modal-overlay');
  const reservationClientName = document.getElementById('reservation-client-name');
  const reservationPhone = document.getElementById('reservation-phone');
  const reservationEmail = document.getElementById('reservation-email');
  const reservationDate = document.getElementById('reservation-date');
  const reservationTime = document.getElementById('reservation-time');
  const reservationPeople = document.getElementById('reservation-people');
  const reservationNotes = document.getElementById('reservation-notes');
  const btnCancelReservation = document.getElementById('btn-cancel-reservation');
  const btnSaveReservation = document.getElementById('btn-save-reservation');
  const reservationDetailOverlay = document.getElementById('reservation-detail-overlay');
  const detailReservationName = document.getElementById('detail-reservation-name');
  const detailReservationPhone = document.getElementById('detail-reservation-phone');
  const detailReservationEmail = document.getElementById('detail-reservation-email');
  const detailReservationOrigin = document.getElementById('detail-reservation-origin');
  const detailReservationDate = document.getElementById('detail-reservation-date');
  const detailReservationTime = document.getElementById('detail-reservation-time');
  const detailReservationPeople = document.getElementById('detail-reservation-people');
  const detailReservationNotes = document.getElementById('detail-reservation-notes');
  const detailReservationStatus = document.getElementById('detail-reservation-status');
  const btnCloseReservationDetail = document.getElementById('btn-close-reservation-detail');
  const btnSaveReservationStatus = document.getElementById('btn-save-reservation-status');

  function renderClientsTable() {
    normalizeClientsRewardData();
    const term = clientsSearch.value.trim().toLowerCase();
    const selectedCategory = clientsCategoryFilter.value;

    const filtered = clientsData.filter((client) => {
      const haystack = [
        client.nombre,
        client.telefono,
        client.correo,
        client.documento
      ].join(' ').toLowerCase();

      const category = getClientCategory(client.visitas || 0).label;
      const matchesTerm = !term || haystack.includes(term);
      const matchesCategory = !selectedCategory || category === selectedCategory;
      return matchesTerm && matchesCategory;
    });

    clientsTbody.innerHTML = filtered.map((client) => `
      <tr>
        <td>${client.nombre}</td>
        <td>${client.telefono || '-'}</td>
        <td>${client.correo || '-'}</td>
        <td>${client.visitas || 0}</td>
        <td><span class="clients-category ${getClientCategory(client.visitas || 0).className}">${getClientCategory(client.visitas || 0).label}</span></td>
        <td><span class="clients-reward ${client.recompensaActual ? 'clients-reward--active' : ''}">${client.recompensaActual || '-'}</span></td>
        <td>${formatVisitDate(client.ultimaVisita)}</td>
        <td><span class="clients-status ${client.estado === 'Activo' ? 'clients-status--active' : 'clients-status--inactive'}">${client.estado}</span></td>
      </tr>
    `).join('');

    clientsEmpty.classList.toggle('hidden', filtered.length > 0);
  }

  function openClientDetail(client) {
    const category = getClientCategory(client.visitas || 0);
    const isGold = category.label === 'Oro';
    selectedClientId = client.id;
    detailClientName.textContent = client.nombre || '-';
    detailClientDocument.textContent = client.documento || '-';
    detailClientPhone.textContent = client.telefono || '-';
    detailClientEmail.textContent = client.correo || '-';
    detailClientVisits.textContent = `${client.visitas || 0}`;
    detailClientCategory.textContent = category.label;
    detailClientRewardInput.value = client.recompensaActual || '';
    detailClientRewardInput.disabled = !isGold;
    btnSaveClientReward.disabled = !isGold;
    btnDeliverClientReward.disabled = !isGold || !client.recompensaActual;
    detailClientRewardHint.textContent = isGold
      ? 'Puedes asignar una recompensa unica a este cliente. Cuando se entregue, sus visitas se reiniciaran automaticamente.'
      : 'Solo los clientes en categoria Oro pueden recibir una recompensa activa.';
    detailClientRewardHistory.innerHTML = (client.historialRecompensas || []).length
      ? client.historialRecompensas.map((reward) => `
        <div class="reward-history__item">
          <span class="reward-history__title">${reward.nombre}</span>
          <span class="reward-history__meta">Entregada el ${formatDateTime(reward.fechaEntrega)}</span>
        </div>
      `).join('')
      : '<div class="reward-history__empty">Todavia no se han entregado recompensas a este cliente.</div>';
    detailClientLastVisit.textContent = formatVisitDate(client.ultimaVisita);
    detailClientStatus.textContent = client.estado || '-';
    clientDetailOverlay.classList.remove('hidden');
  }

  function getFilteredReservations() {
    const term = reservationsSearch.value.trim().toLowerCase();
    const selectedStatus = reservationsStatusFilter.value;

    return reservationsData.filter((reservation) => {
      const haystack = [
        reservation.cliente,
        reservation.telefono,
        reservation.correo
      ].join(' ').toLowerCase();
      const matchesTerm = !term || haystack.includes(term);
      const matchesStatus = !selectedStatus || reservation.estado === selectedStatus;
      return matchesTerm && matchesStatus;
    });
  }

  function renderReservationsTable() {
    const filtered = getFilteredReservations();

    reservationsTbody.innerHTML = filtered.map((reservation) => `
      <tr>
        <td>${reservation.cliente}</td>
        <td>${reservation.telefono}</td>
        <td>${reservation.correo || '-'}</td>
        <td>${formatVisitDate(reservation.fecha)}</td>
        <td>${reservation.hora}</td>
        <td>${reservation.personas}</td>
        <td><span class="${getReservationStatusClass(reservation.estado)}">${reservation.estado}</span></td>
        <td>${reservation.origen}</td>
      </tr>
    `).join('');

    reservationsEmpty.classList.toggle('hidden', filtered.length > 0);
  }

  function resetReservationModal() {
    reservationClientName.value = '';
    reservationPhone.value = '';
    reservationEmail.value = '';
    reservationDate.value = '';
    reservationTime.value = '';
    reservationPeople.value = '';
    reservationNotes.value = '';
  }

  function openReservationModal() {
    resetReservationModal();
    reservationModalOverlay.classList.remove('hidden');
  }

  function openReservationDetail(reservation) {
    selectedReservationId = reservation.id;
    detailReservationName.textContent = reservation.cliente || '-';
    detailReservationPhone.textContent = reservation.telefono || '-';
    detailReservationEmail.textContent = reservation.correo || '-';
    detailReservationOrigin.textContent = reservation.origen || '-';
    detailReservationDate.textContent = formatVisitDate(reservation.fecha);
    detailReservationTime.textContent = reservation.hora || '-';
    detailReservationPeople.textContent = `${reservation.personas || 0}`;
    detailReservationNotes.textContent = reservation.detalle || '-';
    detailReservationStatus.value = reservation.estado || 'Pendiente';
    reservationDetailOverlay.classList.remove('hidden');
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

    if (tabName === 'reservas') {
      reservationsData = readReservations();
      renderReservationsTable();
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
  clientsCategoryFilter.addEventListener('change', renderClientsTable);

  btnClearClients.addEventListener('click', () => {
    clientsSearch.value = '';
    clientsCategoryFilter.value = '';
    renderClientsTable();
  });

  btnNewClient.addEventListener('click', openClientModal);
  btnCancelClient.addEventListener('click', () => {
    clientModalOverlay.classList.add('hidden');
  });

  btnCloseClientDetail.addEventListener('click', () => {
    selectedClientId = null;
    clientDetailOverlay.classList.add('hidden');
  });

  btnSaveClientReward.addEventListener('click', () => {
    if (!selectedClientId) return;
    const client = clientsData.find((item) => item.id === selectedClientId);
    if (!client) return;

    const category = getClientCategory(client.visitas || 0);
    if (category.label !== 'Oro') return;

    const rewardValue = detailClientRewardInput.value.trim();
    if (!rewardValue) {
      window.alert('Ingresa la recompensa que se dara al cliente.');
      detailClientRewardInput.focus();
      return;
    }

    client.recompensaActual = rewardValue;
    writeClients();
    renderClientsTable();
    openClientDetail(client);
  });

  btnDeliverClientReward.addEventListener('click', () => {
    if (!selectedClientId) return;
    const client = clientsData.find((item) => item.id === selectedClientId);
    if (!client || !client.recompensaActual) return;

    const confirmed = window.confirm(`¿Marcar "${client.recompensaActual}" como recompensa entregada para ${client.nombre}?`);
    if (!confirmed) return;

    client.historialRecompensas = Array.isArray(client.historialRecompensas) ? client.historialRecompensas : [];
    client.historialRecompensas.unshift({
      nombre: client.recompensaActual,
      fechaEntrega: new Date().toISOString()
    });
    client.recompensaActual = '';
    client.visitas = 0;
    writeClients();
    renderClientsTable();
    openClientDetail(client);
  });

  btnDeleteClientDetail.addEventListener('click', () => {
    if (!selectedClientId) return;
    const client = clientsData.find((item) => item.id === selectedClientId);
    if (!client) return;

    const confirmed = window.confirm(`¿Deseas eliminar a ${client.nombre}?`);
    if (!confirmed) return;

    clientsData = clientsData.filter((item) => item.id !== selectedClientId);
    writeClients();
    renderClientsTable();
    selectedClientId = null;
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
      origen: 'Manual',
      recompensaActual: '',
      historialRecompensas: []
    };

    clientsData.unshift(nuevoCliente);
    writeClients();
    renderClientsTable();
    clientModalOverlay.classList.add('hidden');
  });

  reservationsSearch.addEventListener('input', renderReservationsTable);
  reservationsStatusFilter.addEventListener('change', renderReservationsTable);

  btnClearReservations.addEventListener('click', () => {
    reservationsSearch.value = '';
    reservationsStatusFilter.value = '';
    renderReservationsTable();
  });

  btnNewReservation.addEventListener('click', openReservationModal);

  btnCancelReservation.addEventListener('click', () => {
    reservationModalOverlay.classList.add('hidden');
  });

  btnSaveReservation.addEventListener('click', () => {
    const cliente = reservationClientName.value.trim();
    const telefono = reservationPhone.value.trim();
    const fecha = reservationDate.value;
    const hora = reservationTime.value;
    const personas = parseInt(reservationPeople.value, 10);

    if (!cliente || !telefono || !fecha || !hora || !personas) {
      window.alert('Completa los datos obligatorios de la reserva.');
      return;
    }

    reservationsData.unshift({
      id: `r${Date.now()}`,
      cliente,
      telefono,
      correo: reservationEmail.value.trim(),
      fecha,
      hora,
      personas,
      detalle: reservationNotes.value.trim(),
      estado: 'Pendiente',
      origen: 'Manual'
    });

    writeReservations();
    renderReservationsTable();
    reservationModalOverlay.classList.add('hidden');
  });

  btnCloseReservationDetail.addEventListener('click', () => {
    selectedReservationId = null;
    reservationDetailOverlay.classList.add('hidden');
  });

  btnSaveReservationStatus.addEventListener('click', () => {
    if (!selectedReservationId) return;
    const reservation = reservationsData.find((item) => item.id === selectedReservationId);
    if (!reservation) return;

    reservation.estado = detailReservationStatus.value;
    writeReservations();
    renderReservationsTable();
    reservationDetailOverlay.classList.add('hidden');
    selectedReservationId = null;
  });

  clientsTbody.addEventListener('click', (event) => {
    const row = event.target.closest('tr');
    if (!row) return;
    const index = Array.from(clientsTbody.querySelectorAll('tr')).indexOf(row);
    const term = clientsSearch.value.trim().toLowerCase();
    const selectedCategory = clientsCategoryFilter.value;
    const filtered = clientsData.filter((client) => {
      const haystack = [
        client.nombre,
        client.telefono,
        client.correo,
        client.documento
      ].join(' ').toLowerCase();
      const category = getClientCategory(client.visitas || 0).label;
      const matchesTerm = !term || haystack.includes(term);
      const matchesCategory = !selectedCategory || category === selectedCategory;
      return matchesTerm && matchesCategory;
    });
    const client = filtered[index];
    if (!client) return;
    openClientDetail(client);
  });

  reservationsTbody.addEventListener('click', (event) => {
    const row = event.target.closest('tr');
    if (!row) return;
    const index = Array.from(reservationsTbody.querySelectorAll('tr')).indexOf(row);
    const reservation = getFilteredReservations()[index];
    if (!reservation) return;
    openReservationDetail(reservation);
  });

  renderClientsTable();
  renderReservationsTable();
});
