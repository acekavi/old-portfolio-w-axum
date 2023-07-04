import { E as EMAIL_KEY } from './private-f8066d57.js';
import { f as fail } from './handler-5880edf8.js';
import client from '@sendgrid/mail';

const actions = {
  reachOut: async ({ cookies, request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const subject = data.get("subject");
    const email = data.get("email");
    const linkedin = data.get("linkedin");
    const message = data.get("message");
    const to = "dfntlynotace@gmail.com";
    const from = "avishkakavinda@proton.me";
    const emailSubject = "New message from " + name;
    if (!name || !email || !message || !linkedin || !subject) {
      return fail(422, {
        name: name?.toString() || "",
        email: email?.toString() || "",
        message: message?.toString() || "",
        linkedin: linkedin?.toString() || "",
        subject: subject?.toString() || "",
        error: "Please fill all the fields!"
      });
    }
    client.setApiKey(EMAIL_KEY);
    const content = `
            <strong>Name:</strong> ${name.toString()}<br/>
            <strong>Email:</strong> ${email.toString()}<br/>
            <strong>Subject:</strong> ${subject.toString()}<br/>
            <strong>Linkedin:</strong> https://www.linkedin.com/in/${linkedin.toString()}<br/>
            <strong>Message:</strong> ${message.toString()}<br/>
        `;
    const msg = {
      to,
      from,
      subject: emailSubject,
      // text: 'and easy to do anywhere, even with Node.js',
      html: content
    };
    try {
      const response = await client.send(msg);
      return { message: "Your email has been sent!" };
    } catch (error) {
      console.log(error);
      return fail(422, {
        error: "Something went wrong!"
      });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 3;
const component = async () => (await import('./_page.svelte-6801a886.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/3.ed493cec.js","_app/immutable/chunks/scheduler.2790c315.js","_app/immutable/chunks/index.6fb2ffa8.js","_app/immutable/chunks/Icon.1a6649c9.js","_app/immutable/chunks/index.d8780abe.js","_app/immutable/chunks/forms.d64db6df.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.8444298e.js","_app/immutable/chunks/index.78cae565.js","_app/immutable/chunks/Avatar.a6c1305c.js","_app/immutable/chunks/config.23e6fb4d.js"];
const stylesheets = ["_app/immutable/assets/3.bd5a2185.css","_app/immutable/assets/Icon.4f1e9ba5.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-124ba7cd.js.map
