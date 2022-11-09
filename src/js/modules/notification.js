export function notification() {
  const notification = document.querySelector('[data-notification]');

  if (notification) {
    window.matchMedia('(orientation: landscape)').onchange = () => {
      if (!notification.classList.contains('closed'))
        notification.style.maxHeight = notification.scrollHeight + 'px';
    };

    const closeNotificationBtn = notification.querySelector('button');

    notification.style.maxHeight = notification.scrollHeight + 'px';

    closeNotificationBtn.setAttribute('aria-label', 'Close notification');
    closeNotificationBtn.addEventListener(
      'click',
      () => {
        notification.classList.add('closed');
        notification.style.maxHeight = 0 + 'px';
      },
      { once: true }
    );
  }
}
