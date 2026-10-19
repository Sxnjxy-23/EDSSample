function createField({
  name, label, type = 'text', required = false, wide = false,
}) {
  const field = document.createElement('div');
  field.className = `contactform-field${wide ? ' contactform-field-wide' : ''}`;

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

export default function decorate(block) {
  const form = document.createElement('form');
  form.className = 'contactform-form';

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
      name: 'message', label: 'Message', type: 'textarea', required: true, wide: true,
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

  form.append(fields, submit, status);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = 'This form is for display only. Submissions are not configured.';
    status.hidden = false;
  });

  block.replaceChildren(form);
}
