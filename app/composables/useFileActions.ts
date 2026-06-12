import type { SharedLinkFile } from "~/types/file";

export const useFileActions = () => {
  const fileStore = useFileStore();

  const { openedPopupIdx, openPopup } = usePopup()

  const copiedFileId = ref<string | null>(null)

  const previewFile = (file: any) => {
    const fileUrl = file.url || URL.createObjectURL(file);
    window.open(fileUrl, '_blank');

    openedPopupIdx.value = null;

    console.log(openedPopupIdx.value);
  }

  const downloadFile = (file: any) => {
    const fileUrl = file.url || URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    openedPopupIdx.value = null;


  }

  const deleteFile = (file: any) => {
    if (confirm('Are you sure you want to delete this file?')) {
      fileStore.uploadedFiles = fileStore.uploadedFiles.filter(f => f.name !== file.name);
    }

    openedPopupIdx.value = null;
  }

  const copyLink = async (file: SharedLinkFile) => {
    try {
      const baseUrl = window.location.origin

      const shareToken = file.id || 'random-share-token'
      const fullShareUrl = `${ baseUrl }/share/${ shareToken }`

      await navigator.clipboard.writeText(fullShareUrl)

      copiedFileId.value = file.id

      setTimeout(() => {
        copiedFileId.value = null
      }, 4000)
    } catch (e) {
      console.error(e)
    }

    openedPopupIdx.value = null;

    console.log(openedPopupIdx.value);
  }

  return {
    previewFile,
    downloadFile,
    deleteFile,
    copyLink,
  }
}