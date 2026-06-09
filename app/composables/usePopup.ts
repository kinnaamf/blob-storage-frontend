export const usePopup = () => {
  const openedPopupIdx = ref<number | null>(null)

  const openPopup = (idx: number) => {
    if (openedPopupIdx.value === idx) {
      openedPopupIdx.value = null
    } else openedPopupIdx.value = idx
  }

  return {
    openedPopupIdx,
    openPopup,
  }
}