export function anchorScroll(location: Location) {
  setTimeout(() => {
    const hash = location.hash.replace('#', '');
    const element = document.getElementById(hash);
    element?.scrollIntoView();
  }, 0);
}
