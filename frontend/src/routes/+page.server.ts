import { EMAIL_KEY } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import client, { type ClientResponse, type MailDataRequired } from '@sendgrid/mail';

export const actions: Actions = {
    reachOut: async ({ cookies, request }) => {
        const data = await request.formData();
        const name = data.get('name');
        const subject = data.get('subject');
        const email = data.get('email');
        const linkedin = data.get('linkedin');
        const message = data.get('message');
        const to = "dfntlynotace@gmail.com"
        const from = "avishkakavinda@proton.me"
        const emailSubject = "New message from " + name;

        if (!name || !email || !message || !linkedin || !subject) {
            return fail(422, {
                name: name.toString() || '',
                email: email.toString() || '',
                message: message.toString() || '',
                linkedin: linkedin.toString() || '',
                subject: subject || '',
                error: "Please fill all the fields!"
            });
        }

        client.setApiKey(EMAIL_KEY as string);
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
            html: content,
        };

        try {
            const response: [ClientResponse, {}] = await client.send(msg as MailDataRequired);
            return { message: 'Your email has been sent!' }
        } catch (error) {
            console.log(error);
            return fail(422, {
                error: "Something went wrong!"
            });
        }
    }
};