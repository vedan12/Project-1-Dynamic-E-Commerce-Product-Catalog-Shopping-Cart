import { useState } from 'react';
import { CircleCheck, Mail, MapPin, Phone } from 'lucide-react';

export function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">Contact Us</h1>
      <p className="mt-3 max-w-xl text-ink-600">
        Questions about an order, sizing, or bulk kit purchases for your
        club? Send us a message and we'll get back within a day.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_320px]">
        {sent ? (
          <div className="flex flex-col items-start rounded-2xl border border-ink-100 bg-white p-8 shadow-card">
            <CircleCheck className="h-10 w-10 text-emerald-500" aria-hidden />
            <h2 className="mt-3 font-display text-xl font-semibold text-ink-900">Message sent</h2>
            <p className="mt-1 text-ink-500">Thanks for reaching out — we'll reply to your email soon.</p>
            <button
              onClick={() => setSent(false)}
              className="mt-5 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
            <label htmlFor="name" className="block text-xs font-medium text-ink-500">Name</label>
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
            />

            <label htmlFor="c-email" className="mt-4 block text-xs font-medium text-ink-500">Email</label>
            <input
              id="c-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 h-10 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 text-sm focus:border-ink-900 focus:outline-none"
            />

            <label htmlFor="message" className="mt-4 block text-xs font-medium text-ink-500">Message</label>
            <textarea
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
              className="mt-1 w-full rounded-lg border border-ink-200 bg-sand-50 px-3 py-2 text-sm focus:border-ink-900 focus:outline-none"
            />

            <button
              type="submit"
              className="mt-5 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-ink-900 transition hover:bg-brand-400 active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        )}

        <div className="space-y-5 text-sm text-ink-600">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 text-brand-600" aria-hidden />
            <span>support@thalaforareason.example</span>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5 text-brand-600" aria-hidden />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-brand-600" aria-hidden />
            <span>Ranchi, Jharkhand, India</span>
          </div>
        </div>
      </div>
    </main>
  );
}
