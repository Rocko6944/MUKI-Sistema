const notificationsSeed = [
  {
    id: 'ntf-001',
    type: 'alerta',
    severity: 'critical',
    message: 'Stock bajo: Tomate (2 kg restantes)',
    time: 'hace 10 min',
    detail: 'El stock de tomate descendio a 2 kg y ya se encuentra cerca del minimo configurado en inventario. Conviene revisar el consumo del dia y considerar una reposicion para evitar quiebres en cocina.',
    read: false
  },
  {
    id: 'ntf-002',
    type: 'alerta',
    severity: 'warning',
    message: 'Producto por agotarse: Pollo',
    time: 'hace 20 min',
    detail: 'El insumo pollo tiene stock disponible, pero el nivel actual ya esta proximo al punto critico. Se recomienda revisar compras pendientes o registrar una nueva compra para asegurar la produccion.',
    read: false
  },
  {
    id: 'ntf-003',
    type: 'sistema',
    severity: 'warning',
    message: 'Pedido eliminado por usuario',
    time: 'hace 30 min',
    detail: 'Se registro la eliminacion de un pedido dentro del modulo de ventas. Esta notificacion permite llevar trazabilidad operativa y revisar el motivo registrado por el usuario.',
    read: false
  },
  {
    id: 'ntf-004',
    type: 'sistema',
    severity: 'info',
    message: 'Compra registrada correctamente',
    time: 'hace 1 h',
    detail: 'Una compra fue registrada en el modulo de operaciones y ya impacto tanto en el historial de compras como en el stock de inventario. Puedes revisar el detalle desde el submodulo de compras.',
    read: true
  },
  {
    id: 'ntf-005',
    type: 'sistema',
    severity: 'info',
    message: 'Nuevo usuario registrado: Maria Lopez',
    time: 'hace 2 h',
    detail: 'El sistema genero un nuevo registro operativo asociado a Maria Lopez. Esta alerta informativa deja evidencia del movimiento dentro de la plataforma para futuras revisiones administrativas.',
    read: true
  }
];

const severityLabelMap = {
  critical: 'Critico',
  warning: 'Advertencia',
  info: 'Informativo'
};

const typeLabelMap = {
  alerta: 'Alerta operativa',
  sistema: 'Sistema'
};

function setupNotificationsPage() {
  const list = document.getElementById('notifications-list');
  const empty = document.getElementById('notifications-empty');
  const chipButtons = Array.from(document.querySelectorAll('#notification-filter-chips .notifications-chip'));
  const markAllReadButton = document.getElementById('mark-all-read');
  const detailModal = document.getElementById('notification-detail-modal');
  const detailCloseButton = document.getElementById('notification-detail-close');
  const detailTitle = document.getElementById('notification-detail-title');
  const detailType = document.getElementById('notification-detail-type');
  const detailSeverity = document.getElementById('notification-detail-severity');
  const detailTime = document.getElementById('notification-detail-time');
  const detailDescription = document.getElementById('notification-detail-description');

  if (!list || !empty || chipButtons.length === 0) {
    return;
  }

  let activeFilter = 'all';
  let notifications = notificationsSeed.map((item) => ({ ...item }));

  function getFilteredNotifications() {
    if (activeFilter === 'all') {
      return notifications;
    }

    return notifications.filter((item) => item.type === activeFilter);
  }

  function renderNotifications() {
    const filtered = getFilteredNotifications();
    list.innerHTML = '';

    if (filtered.length === 0) {
      list.classList.add('hidden');
      empty.classList.remove('hidden');
      return;
    }

    list.classList.remove('hidden');
    empty.classList.add('hidden');

    filtered.forEach((item) => {
      const article = document.createElement('button');
      article.type = 'button';
      article.className = `notification-item notification-item--${item.severity}${item.read ? ' is-read' : ''}`;
      article.innerHTML = `
        <span class="notification-item__indicator" aria-hidden="true"></span>
        <div class="notification-item__message">
          <p class="notification-item__text">${item.message}</p>
        </div>
        <span class="notification-item__status">${item.read ? 'Leida' : 'Nueva'}</span>
      `;
      article.addEventListener('click', () => openNotificationDetail(item.id));
      list.appendChild(article);
    });
  }

  function closeNotificationDetail() {
    detailModal?.classList.add('hidden');
    detailModal?.setAttribute('aria-hidden', 'true');
  }

  function openNotificationDetail(notificationId) {
    const target = notifications.find((item) => item.id === notificationId);
    if (!target) {
      return;
    }

    notifications = notifications.map((item) => (
      item.id === notificationId ? { ...item, read: true } : item
    ));

    if (detailTitle) detailTitle.textContent = target.message;
    if (detailType) detailType.textContent = typeLabelMap[target.type] || '-';
    if (detailSeverity) detailSeverity.textContent = severityLabelMap[target.severity] || '-';
    if (detailTime) detailTime.textContent = target.time;
    if (detailDescription) detailDescription.textContent = target.detail || target.message;

    detailModal?.classList.remove('hidden');
    detailModal?.setAttribute('aria-hidden', 'false');
    renderNotifications();
  }

  chipButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      chipButtons.forEach((chip) => chip.classList.toggle('active', chip === button));
      renderNotifications();
    });
  });

  markAllReadButton?.addEventListener('click', () => {
    notifications = notifications.map((item) => ({ ...item, read: true }));
    renderNotifications();
  });

  detailCloseButton?.addEventListener('click', closeNotificationDetail);
  detailModal?.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.closeDetail === 'true') {
      closeNotificationDetail();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && detailModal && !detailModal.classList.contains('hidden')) {
      closeNotificationDetail();
    }
  });

  renderNotifications();
}

document.addEventListener('DOMContentLoaded', setupNotificationsPage);
