
export default function decorate(block) {
  const content = [...block.children];

  block.classList.add('hero');

  content.forEach((row) => {
    row.classList.add('hero-row');
  });
}
