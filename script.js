document.addEventListener('DOMContentLoaded', () => {
  // Menutup accordion FAQ lain saat salah satu FAQ dibuka (Accordion Effect)
  const detailsElements = document.querySelectorAll('details');

  detailsElements.forEach((targetDetail) => {
    targetDetail.addEventListener('click', () => {
      detailsElements.forEach((detail) => {
        if (detail !== targetDetail) {
          detail.removeAttribute('open');
        }
      });
    });
  });
});