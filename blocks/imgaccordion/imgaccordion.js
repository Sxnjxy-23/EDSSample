export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const [imageColumn, contentColumn] = row.children;
  if (!imageColumn || !contentColumn) return;

  row.classList.add('imgaccordion-layout');
  imageColumn.classList.add('imgaccordion-image');
  contentColumn.classList.add('imgaccordion-content');

  const items = contentColumn.querySelector(':scope > ul, :scope > ol');
  if (!items) return;

  items.classList.add('imgaccordion-items');
  [...items.children].forEach((item, index) => {
    if (item.tagName !== 'LI') return;

    const question = item.firstElementChild;
    if (!question) return;

    const summary = document.createElement('summary');
    summary.className = 'imgaccordion-question';
    if (question.tagName === 'P') {
      summary.append(...question.childNodes);
      question.remove();
    } else {
      summary.append(question);
    }

    const answer = document.createElement('div');
    answer.className = 'imgaccordion-answer';
    while (item.firstChild) answer.append(item.firstChild);

    const details = document.createElement('details');
    details.className = 'imgaccordion-item';
    if (index === 0) details.open = true;
    details.append(summary, answer);
    item.replaceChildren(details);
  });
}
