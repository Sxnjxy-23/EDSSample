function createField({
  name, label, type = 'text', required = false,
}) {
  const field = document.createElement('div');
  field.className = 'contactform-field';

  const controlId = `contactform-${name}`;
  const controlLabel = document.createElement('label');
  controlLabel.className = 'contactform-label';
  controlLabel.htmlFor = controlId;
  controlLabel.textContent = label;

  let control;
  if (type === 'textarea') {
    control = document.createElement('textarea');
    control.rows = 5;
  } else {
    control = document.createElement('input');
    control.type = type;
  }

  control.id = controlId;
  control.name = name;
  control.placeholder = label;
  control.required = required;
  field.append(controlLabel, control);
  return field;
}

function moveContent(source, target) {
  while (source.firstChild) target.append(source.firstChild);
}

function moveTitleContent(source, target) {
  while (source.firstChild) {
    const child = source.firstChild;
    if (child.nodeName === 'P') {
      target.append(...child.childNodes);
      child.remove();
    } else {
      target.append(child);
    }
  }
}

export default function decorate(block) {
  const layout = document.createElement('div');
  layout.className = 'contactform-layout';

  const cards = document.createElement('aside');
  cards.className = 'contactform-cards';
  cards.setAttribute('aria-label', 'Contact information');

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const titleCell = cells.shift();
    if (!titleCell) return;

    const card = document.createElement('article');
    card.className = 'contactform-card';

    const cardHeading = document.createElement('div');
    cardHeading.className = 'contactform-card-heading';

    const media = row.querySelector('picture, img');
    if (media) {
      const icon = document.createElement('span');
      icon.className = 'contactform-card-icon';
      media.remove();
      let parent = media.parentElement;
      while (parent && parent !== row
        && ['P', 'DIV'].includes(parent.tagName)
        && !parent.textContent.trim()
        && parent.children.length === 0) {
        const emptyParent = parent;
        parent = parent.parentElement;
        emptyParent.remove();
      }
      icon.append(media);
      cardHeading.append(icon);
    }

    const title = document.createElement('h2');
    title.className = 'contactform-card-title';
    moveTitleContent(titleCell, title);
    if (title.textContent.trim()) {
      cardHeading.append(title);
    }
    if (cardHeading.childElementCount) card.append(cardHeading);

    if (cells.length) {
      const details = document.createElement('div');
      details.className = 'contactform-card-details';
      cells.forEach((cell) => moveContent(cell, details));
      card.append(details);
    }

    cards.append(card);
  });

  const form = document.createElement('form');
  form.className = 'contactform-form';

  const heading = document.createElement('h2');
  heading.className = 'contactform-heading';
  heading.textContent = 'If you have any questions, please contact us';

  const fields = document.createElement('div');
  fields.className = 'contactform-fields';
  fields.append(
    createField({ name: 'name', label: 'Name', required: true }),
    createField({ name: 'phone', label: 'Phone', type: 'tel' }),
    createField({
      name: 'email', label: 'Email', type: 'email', required: true,
    }),
    createField({ name: 'subject', label: 'Subject' }),
    createField({
      name: 'message', label: 'Message', type: 'textarea', required: true,
    }),
  );

  const submit = document.createElement('button');
  submit.className = 'contactform-submit';
  submit.type = 'submit';
  submit.textContent = 'Submit Request';

  const status = document.createElement('p');
  status.className = 'contactform-status';
  status.setAttribute('role', 'status');
  status.hidden = true;

  form.append(heading, fields, submit, status);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = 'This form is for display only. Submissions are not configured.';
    status.hidden = false;
  });

  if (cards.childElementCount) {
    layout.append(cards, form);
  } else {
    layout.classList.add('contactform-layout-no-cards');
    layout.append(form);
  }
  block.replaceChildren(layout);
}
