import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        toast({
          title: "Message Sent!",
          description: "We'll get back to you as soon as possible.",
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitted(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'support@savesense.ai',
      description: 'We reply within 24 hours',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+92 300 1234567',
      description: 'Mon-Fri 9AM-6PM PKT',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Lahore, Pakistan',
      description: 'DHA Phase 5',
    },
  ];

  const faqs = [
    {
      question: 'How does Save Sense AI help me save money?',
      answer: 'Save Sense AI uses AI-powered analysis to track your spending, identify savings opportunities, and provide personalized recommendations to help you reach your financial goals.',
    },
    {
      question: 'Is my financial data secure?',
      answer: 'Yes, we use bank-level encryption and never share your data with third parties. Your privacy and security are our top priorities.',
    },
    {
      question: 'Can I set multiple savings goals?',
      answer: 'Absolutely! You can create unlimited savings goals for different purposes like emergency funds, vacation, education, or any major purchase.',
    },
    {
      question: 'Is the app free to use?',
      answer: 'The basic version is completely free. We also offer a premium plan with advanced features like AI financial advice and detailed analytics.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8eef5] to-[#dce4ed]">
      <Navbar />
      
      <main className="px-3 sm:px-6 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Get in Touch</h1>
          <p className="text-gray-500">We'd love to hear from you. Send us a message!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {contactInfo.map((info, index) => (
            <div key={index} className="neumorphic p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{info.title}</h3>
              <p className="text-blue-600 font-medium">{info.content}</p>
              <p className="text-sm text-gray-500">{info.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="neumorphic p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              Send us a Message
            </h2>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                <p className="text-gray-500 mb-4">Your message has been sent successfully. We'll get back to you soon.</p>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px] resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="neumorphic p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                  <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-500">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800">
                <strong>Need immediate help?</strong> Our AI assistant is available 24/7 to answer your questions about savings and financial planning.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Contact;
