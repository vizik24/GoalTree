export function FAQ({ title, faqs }) {
  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      {faqs.map((faq, index) => (
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold">{faq.question}</div>
          <div className="collapse-content text-sm">{faq.answer}</div>
        </div>
      ))}
    </div>
  );
}
