// Carrousel zonder bibliotheek: de browser regelt het vegen (scroll-snap),
// dit script houdt alleen de teller en de pijlknoppen bij.
// Markup: [data-carrousel] met daarin [data-spoor] > [data-dia], plus optioneel
// [data-huidig], [data-vorige] en [data-volgende].
document.querySelectorAll<HTMLElement>('[data-carrousel]').forEach((carrousel) => {
  const spoor = carrousel.querySelector<HTMLElement>('[data-spoor]');
  const dias = carrousel.querySelectorAll<HTMLElement>('[data-dia]');
  const huidig = carrousel.querySelector<HTMLElement>('[data-huidig]');
  const vorige = carrousel.querySelector<HTMLButtonElement>('[data-vorige]');
  const volgende = carrousel.querySelector<HTMLButtonElement>('[data-volgende]');
  if (!spoor || !dias.length) return;

  const actieveIndex = () => {
    // Aan het eind van het spoor kan de laatste dia niet meer naar links schuiven
    if (spoor.scrollLeft + spoor.clientWidth >= spoor.scrollWidth - 4) return dias.length - 1;
    const links = spoor.getBoundingClientRect().left;
    let beste = 0;
    let afstand = Infinity;
    dias.forEach((dia, i) => {
      const d = Math.abs(dia.getBoundingClientRect().left - links);
      if (d < afstand) {
        afstand = d;
        beste = i;
      }
    });
    return beste;
  };

  const bijwerken = () => {
    const i = actieveIndex();
    if (huidig) huidig.textContent = String(i + 1).padStart(2, '0');
    if (vorige) vorige.disabled = i === 0;
    if (volgende) volgende.disabled = i === dias.length - 1;
  };

  const ga = (stap: number) => {
    const doel = dias[Math.min(dias.length - 1, Math.max(0, actieveIndex() + stap))];
    spoor.scrollTo({ left: doel.offsetLeft - spoor.offsetLeft, behavior: 'smooth' });
  };

  vorige?.addEventListener('click', () => ga(-1));
  volgende?.addEventListener('click', () => ga(1));
  let wacht: number | undefined;
  spoor.addEventListener('scroll', () => {
    window.clearTimeout(wacht);
    wacht = window.setTimeout(bijwerken, 60);
  });
  bijwerken();
});
