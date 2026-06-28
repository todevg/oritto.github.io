const body = document.body;
const navigationToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('#site-nav');
const enquiryDialog = document.querySelector('#enquiry-dialog');
let dialogTrigger = null;

function closeNavigation() {
  if (!navigation || !navigationToggle) return;
  navigation.classList.remove('open');
  navigationToggle.setAttribute('aria-expanded', 'false');
}

function initializeNavigation() {
  if (navigationToggle && navigation) {
    navigationToggle.addEventListener('click', () => {
      const isOpen = navigation.classList.toggle('open');
      navigationToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeNavigation();
    });
  }

  document.addEventListener('click', (event) => {
    document.querySelectorAll('.nav-disclosure[open]').forEach((details) => {
      if (!details.contains(event.target)) details.removeAttribute('open');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeNavigation();
    document.querySelectorAll('.nav-disclosure[open]').forEach((details) => details.removeAttribute('open'));
    if (enquiryDialog?.open) enquiryDialog.close();
  });

  const currentPage = body.dataset.page;
  const currentLink = document.querySelector(`[data-nav="${currentPage}"]`);
  if (currentLink?.tagName === 'A') currentLink.setAttribute('aria-current', 'page');
  if (currentLink?.tagName === 'DETAILS') currentLink.classList.add('current');
}

function initializeDialog() {
  if (!enquiryDialog) return;

  document.querySelectorAll('[data-dialog-open]').forEach((button) => {
    button.addEventListener('click', () => {
      dialogTrigger = button;
      enquiryDialog.showModal();
    });
  });

  enquiryDialog.querySelector('[data-dialog-close]')?.addEventListener('click', () => enquiryDialog.close());
  enquiryDialog.addEventListener('click', (event) => {
    if (event.target === enquiryDialog) enquiryDialog.close();
  });
  enquiryDialog.addEventListener('close', () => dialogTrigger?.focus());
}

function normalize(value) {
  return value.trim().toLowerCase();
}

function initializeProductFilters() {
  const productSearch = document.querySelector('#product-search');
  const productCards = [...document.querySelectorAll('[data-product-card]')];
  const filterButtons = [...document.querySelectorAll('[data-product-filter]')];
  const resultCount = document.querySelector('#product-result-count');
  const emptyState = document.querySelector('#product-empty-state');
  if (!productSearch || productCards.length === 0) return;

  productSearch.value = new URLSearchParams(window.location.search).get('q') || '';
  let activeFilter = 'all';

  function applyFilters() {
    const query = normalize(productSearch.value);
    let visibleCount = 0;

    productCards.forEach((card) => {
      const searchableText = normalize(`${card.dataset.name} ${card.dataset.tags} ${card.textContent}`);
      const matchesQuery = query === '' || searchableText.includes(query);
      const matchesFilter = activeFilter === 'all' || card.dataset.tags.split(' ').includes(activeFilter);
      const isVisible = matchesQuery && matchesFilter;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (resultCount) resultCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'category' : 'categories'} shown`;
    if (emptyState) emptyState.hidden = visibleCount !== 0;
  }

  productSearch.addEventListener('input', applyFilters);
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.productFilter;
      filterButtons.forEach((candidate) => candidate.setAttribute('aria-pressed', String(candidate === button)));
      applyFilters();
    });
  });

  applyFilters();
}

function initializeCurrentYear() {
  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
}

initializeNavigation();
initializeDialog();
initializeProductFilters();
initializeCurrentYear();
