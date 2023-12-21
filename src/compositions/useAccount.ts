import { ref, readonly, computed, effectScope } from 'vue';
import AccountApis from '@/apis/account';
import accountStorage from '@/services/accountStorage';
import { createGlobalState } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';

function useAccount() {
  const isLoading = ref(false);
  const account = ref(null);

  const route = useRoute()
  const router = useRouter()

  const setAccount = (data) => {
    account.value = Object.freeze(data);
  };

  async function getAccount() {
    await AccountApis.getProfile().then(res => {
      if (res.result === 3) {
        router.push('/login')
      } else {
        account.value = res.content[0]
      }
    }).catch(err => {
      console.log(err)
    })
  }
  const removeAccount = () => {
    if (account.value) {
      setAccount(null);
      return accountStorage.removeToken();
    }
  };
  return {
    setAccount,
    account: readonly(account),
    isLoading: readonly(isLoading),
    getAccount,
    removeAccount
  };
}

export default createGlobalState(useAccount);