'use client';
import { useState } from 'react';
import emailjs from 'emailjs-com';

const SERVICE_ID = 'service_fldaemi';
const TEMPLATE_ID = 'template_hztcnpn';
const USER_ID = 'ico2GEHB2xewXzEpA';

const ContactPage =() =>  {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    emailjs.send(SERVICE_ID, TEMPLATE_ID, form, USER_ID)
      .then(() => {
        setStatus('Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setStatus('Failed to send message. Try again.');
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="message"
          placeholder="Your message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded min-h-[100px]"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
        {status && <p className="text-sm text-gray-600 mt-2">{status}</p>}
      </form>
    </div>
  );
}

export default ContactPage
