document.addEventListener('DOMContentLoaded', () => {
  // Accordion effect untuk FAQ
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