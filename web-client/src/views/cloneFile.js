/**
 * clones a file
 *
 * @param {file} file the file to clone
 * @returns {file} the cloned file
 */
export const cloneFile = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    const onLoad = () => {
      reader.removeEventListener('load', onLoad);
      resolve(
        new File([reader.result], file.name, {
          type: file.type,
        }),
      );
    };

    reader.readAsArrayBuffer(file);
    reader.addEventListener('load', onLoad);
    reader.addEventListener('error', () => {
      reject();
    });
  });
