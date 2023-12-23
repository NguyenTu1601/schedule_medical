import AccountApis from '@/apis/account';
import useAccount from '@/compositions/useAccount';
import { ElNotification } from 'element-plus';
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
      .then((res) => {
        if (res.result === 1) {
          ElNotification({
            title: 'Success',
            message: res.message,
            type: 'success',
          });
          if (res.content[0].roleID === 2) {
            router.push('/manager/plan-doctor')
          }
          if (res.content[0].roleID === 0) {
            router.push('/manager/user')
          }
          if (res.content[0].roleID === 3) {
            router.push('/manager/doctor')
          }
          if (res.content[0].roleID === 1) {
            router.push('/')
          }
        }
        else {
          ElNotification({
            title: 'Error',
            message: res.message,
            type: 'error',
          });
        }

      })
      .then(setAccount)
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
