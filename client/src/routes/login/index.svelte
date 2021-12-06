<script context="module">
  import { session } from '$app/stores';

  export async function load({ session }) {
    if(session.user) {
      return {
        status: 302,
        redirect: '/',
      };
    }


    return {};
  }

</script>

<script>
  import axios from 'axios';
  import { currentUser } from '../../store/store';

  let id = '', password = '';

  async function signIn (e) {
    e.preventDefault();
    const ele = e.target

    const body = {
      username: ele.name.value,
      password: ele.password.value,
      gender: 1
    };

    const response = await axios.post(ele.action,body ,{ withCredentials: true,});

    return false;
  }

</script>
