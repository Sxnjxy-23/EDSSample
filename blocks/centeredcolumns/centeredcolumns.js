export default function decorate(block) {
  const firstRow = block.firstElementChild;
  if (firstRow) {
    block.classList.add(`centeredcolumns-${firstRow.children.length}-cols`);
  }

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const picture = col.querySelector('picture');
      if (picture) {
        const pictureWrapper = picture.closest('div');
        if (pictureWrapper && pictureWrapper.children.length === 1) {
          pictureWrapper.classList.add('centeredcolumns-img-col');
        }
      }
    });
  });
}
