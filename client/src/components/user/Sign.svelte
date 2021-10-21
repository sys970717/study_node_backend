<script>
  import axios from 'axios';
	export let name;

  function signIn (e) {
    e.preventDefault();
const ele  =e.target


    const body = {
      name: ele.name.value,
      password: ele.password.value,
      gender: 1
    };

    console.log(typeof ele.action);
    console.log(typeof body)

    let req;
    try {

      axios.post(ele.action,body ,{
        withCredentials: true,
      })
      .then(res => {
        console.log(res)
        req = res.data
      })
      .catch(err => console.error(err) );

      console.log(req);

      
      return false;
    } catch (e) {
      console.log('fail')
      console.error(e);
      return false;
    }
    

    return false;
  }

</script>

<main>
  <form action="http://localhost:60809/v1/users/session" method="post"
    on:submit={e => signIn(e) } >
    <input type="text" name="name" placeholder="user name"/>
    <input type="password" name="password" placeholder="password"/>
    <button type="submit">Sign in</button>
  </form>
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