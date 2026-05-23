export const useFilesize = () => {
  const getSize = (filesize: number) => {
    const units = ['KB', 'MB', 'GB']
    let iteration = 0

    if (filesize === 0) {
      return {
        fileSize: 0,
        storageUnit: 'B'
      }
    }

    while (filesize >= 1024 && iteration < units.length - 1) {
      filesize /= 1024
      iteration++
    }

    const formattedSize = iteration === 0
      ? filesize
      : Math.round(filesize * 10) / 10

    return {
      fileSize: formattedSize,
      storageUnit: units[iteration - 1],
    }
  }

  return {
    getSize
  }
}