export const useFilesize = () => {
  const getSize = (filesize: number) => {
    let iteration = 0;

    while (filesize > 1024) {
      filesize /= 1024;
      iteration++;
    }

    return iteration == 1 ? `${filesize.toFixed(1)} KB` : `${filesize.toFixed(1)} MB`;
  }

  return {
    getSize
  }
}