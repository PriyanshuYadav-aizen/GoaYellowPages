import { useState } from "react";
import { FAQ } from "../../types";

interface BusinessFAQProps {
  faq: FAQ[];
  businessId: string;
}

const BusinessFAQ = ({ faq }: BusinessFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faq || faq.length === 0) {
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-3xl">?</div>
        <h3 className="text-xl font-bold text-neutral-900">No FAQ available</h3>
        <p className="mt-2 text-neutral-600">This business has not added frequently asked questions yet.</p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card">
      <div className="border-b border-neutral-100 p-6">
        <h2 className="font-display text-2xl font-bold text-neutral-900">Frequently Asked Questions</h2>
        <p className="mt-1 text-sm text-neutral-500">Helpful answers before you visit or call.</p>
      </div>
      <div>
        {faq.map((item, index) => {
          const open = openIndex === index;
          return (
            <div key={index} className="border-b border-neutral-100 last:border-b-0">
              <button
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={open}
              >
                <span className="font-semibold text-neutral-900">{item.question}</span>
                <span className="text-2xl leading-none text-primary-500">{open ? "−" : "+"}</span>
              </button>
              <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 leading-relaxed text-neutral-600">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BusinessFAQ;
