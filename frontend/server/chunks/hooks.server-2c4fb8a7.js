import { A as API_URL } from './private-f8066d57.js';
import { r as redirect } from './handler-5880edf8.js';

const handle = async ({ event, resolve }) => {
  const session = event.cookies.get("session");
  const id = event.cookies.get("id");
  const current_url = event.url.pathname;
  let options = {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (session && id) {
    options.headers = {
      ...options.headers,
      authorization: session.toString()
    };
    const response = await fetch(`${API_URL}/user/${event.cookies.get("id")}`, options);
    let currentUser = await response.json();
    if (!response.ok) {
      event.cookies.delete("session");
      event.cookies.delete("id");
    }
    if (currentUser) {
      event.locals.user = {
        id: currentUser.id,
        username: currentUser.username,
        email: currentUser.email,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        is_active: currentUser.is_active,
        is_superuser: currentUser.is_superuser ? currentUser.is_superuser : false
      };
    }
    if (current_url.includes("/admin") && !currentUser.is_superuser) {
      throw redirect(302, "/user");
    }
  } else {
    if (current_url.includes("/user") || current_url.includes("/admin")) {
      throw redirect(302, "/");
    }
  }
  return resolve(event);
};

export { handle };
//# sourceMappingURL=hooks.server-2c4fb8a7.js.map
