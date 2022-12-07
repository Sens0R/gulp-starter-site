export function notification() {
  const notification = document.querySelector('[data-notification]');

  if (notification) {
    window.matchMedia('(orientation: landscape)').onchange = () => {
      if (!notification.classList.contains('closed'))
        notification.style.maxHeight = notification.scrollHeight + 'px';
    };

    const closeNotificationbutton = notification.querySelector('button');

    notification.style.maxHeight = notification.scrollHeight + 'px';

    closeNotificationbutton.setAttribute('aria-label', 'Close notification');
    closeNotificationbutton.addEventListener(
      'click',
      () => {
        notification.classList.add('closed');
        notification.style.maxHeight = 0 + 'px';
      },
      { once: true }
    );
  }
}
