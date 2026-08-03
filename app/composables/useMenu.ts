import { ref, computed } from 'vue';

const isMenuOpen = ref<boolean>(false);

export function useMenu() {


  return {
    isMenuOpen,
  };
}