import { ref, readonly, computed, effectScope } from 'vue';
import AccountApis from '@/apis/account';
import accountStorage from '@/services/accountStorage';
import { createGlobalState } from '@vueuse/core';

function useAccount() {
  const isLoading = ref(false);
  const account = ref(null);
  
  const setAccount = (data) => {
    account.value = Object.freeze(data);
  };

  return {
    setAccount,
    account: readonly(account),
    isLoading: readonly(isLoading),
  };
}

export default createGlobalState(useAccount);