<script>
  import axios from 'axios';
  import { currentUser } from '../../store/store';
	export let name;

  function signIn (e) {
    e.preventDefault();
    const ele = e.target

    const body = {
      username: ele.name.value,
      password: ele.password.value,
      gender: 1
    };

    let req;
    try {
      axios.post(ele.action,body ,{
        withCredentials: true,
      })
      .then(res => {
        $currentUser = {...res.data.data};
      })
      .catch(err => console.error(err) );
    } catch (e) {
      console.error(e);
    }
    return false;
  }

</script>

<main>

{#if !$currentUser}
  <form action="http://localhost:60809/v1/users/session" method="post"
    on:submit={e => signIn(e) } >
    <input type="text" name="name" placeholder="user name"/>
    <input type="password" name="password" placeholder="password"/>
    <button type="submit">Sign in</button>
  </form>
{:else}
  <nav>Hello {$currentUser.username}!! </nav>
{/if}
  
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>