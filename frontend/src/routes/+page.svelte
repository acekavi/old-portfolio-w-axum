<script lang="ts">
	let username = 'admin'
	let password = 'admins123'
    interface LoginResponse {
        result: result
    }
    interface result {
        success: boolean,
        username: string
    }
	
	async function doPost () {
		const res = await fetch('http://127.0.0.1:3000/api/login', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			}),
            headers: {
                'Content-Type': 'application/json'
            },
		})
		
		const json : LoginResponse = await res.json()
        console.log(json.result.username)
	}
</script>

<button on:click={doPost}>Login</button>
<h2>Main Page</h2>