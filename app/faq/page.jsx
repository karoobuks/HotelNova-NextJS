export const metadata = {
  title: 'Frequently Asked Questions - HotelNova',
  description: 'Answers to common questions about booking, check-in, cancellations, and more.',
};

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I make a reservation at HotelNova?",
      answer: "You can book a room directly on our website by browsing available properties, selecting your preferred dates, and confirming the reservation with your account.",
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can cancel or modify bookings from your profile under 'Booking History'. Policies may vary depending on the room type and cancellation window.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit cards, debit cards, and digital payments. All transactions are secured and encrypted.",
    },
    {
      question: "Is breakfast included in the room rate?",
      answer: "This depends on the room. Please check the room details before booking. Rooms with breakfast included will be clearly marked.",
    },
    {
      question: "Do I need an account to book?",
      answer: "Yes, having an account allows you to manage bookings, view your booking history, leave reviews, and receive special offers.",
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our support team at support@hotelnova.com or via the contact form on our Help page. We typically respond within 24 hours.",
    },
  ];

  return (
    <section className="min-h-screen bg-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <details key={idx} className="bg-white rounded-xl shadow-md p-6 group transition-all duration-200">
              <summary className="cursor-pointer flex justify-between items-center font-semibold text-lg text-blue-700">
                <span>{faq.question}</span>
                <svg
                  className="w-5 h-5 text-blue-600 transform group-open:rotate-180 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          Still have questions? Contact us at <a href="mailto:support@hotelnova.com" className="text-blue-600 underline">support@hotelnova.com</a>
        </div>
      </div>
    </section>
  );
}
