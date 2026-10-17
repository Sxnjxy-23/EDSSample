export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const [content, visual] = row.children;
  if (!content || !visual) return;

  content.classList.add('welcome-features-content');
  visual.classList.add('welcome-features-visual');

  const featureList = content.querySelector(':scope > ul');
  if (featureList) {
    featureList.classList.add('welcome-features-list');

    [...featureList.children].forEach((feature) => {
      feature.classList.add('welcome-features-item');
    });
  }
}