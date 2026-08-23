const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');

function closeMenu() {
  siteNav?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

menuButton?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

siteNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

document.querySelector('#year').textContent = new Date().getFullYear();

const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox?.querySelector('img');

document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = button.querySelector('img')?.alt || 'Customer installation';
    lightbox.showModal();
  });
});

lightbox?.querySelector('button').addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.querySelector('#quote-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = [data.get('first-name'), data.get('last-name')].filter(Boolean).join(' ');
  const body = [
    'Hello StackRack Canada,',
    '',
    'I would like to discuss a storage project.',
    '',
    `Name: ${name}`,
    `Company: ${data.get('company') || 'Not provided'}`,
    `Email: ${data.get('email') || 'Not provided'}`,
    `Phone: ${data.get('phone') || 'Not provided'}`,
    '',
    'Storage requirements:',
    data.get('message') || 'Not provided',
  ].join('\n');

  window.location.href =
    'mailto:sales@stackrackcanada.ca?subject=' +
    encodeURIComponent('StackRack project inquiry') +
    '&body=' +
    encodeURIComponent(body);
});
