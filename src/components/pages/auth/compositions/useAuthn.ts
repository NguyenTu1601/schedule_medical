import AccountApis from '@/apis/account';
import useAccount from '@/compositions/useAccount';
import { useRouter } from 'vue-router';

export default function useAuthn() {
  const router = useRouter();
  const { setAccount } = useAccount();

  const login = (username: string, password: string) => {
    const form = {
      username: username,
      password: password,
    };

    return AccountApis.login(form)
      .then((account) => {
        console.log(account.content)
        if (account.content[0].roleID === 2) {
          router.push('/manager/plan-doctor')
        }
      })
      .then(setAccount);
  };

  const signup = ({ username, email, password }) => {
    return AccountApis.signUp({
      username: username,
      email: email,
      password: password,
    });
  };


  return {
    login,
    signup,
  };
}
