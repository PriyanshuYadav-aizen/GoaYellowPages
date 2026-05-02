import { useState } from "react";
import { FAQ } from "../../types";

interface BusinessFAQProps {
  faq: FAQ[];
  businessId: string;
}

const BusinessFAQ = ({ faq }: BusinessFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faq || faq.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No FAQ Available
          </h3>
          <p className="text-gray-600">
            This business hasn't added any frequently asked questions yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="font-borel text-[48px] leading-[72px] font-normal text-[rgb(34,34,34)] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-gray-600">
            If you can't find an answer that you're looking for, feel free to drop us a line.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#"
              className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 transition-colors"
            >
              About the company
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 transition-colors"
            >
              Contact support
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 transition-colors"
            >
              Visit help center
            </a>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {faq.map((item, index) => (
            <div key={index} className="rounded-xl bg-gray-100">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
              >
                <span className="text-base md:text-lg font-semibold text-gray-900">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openIndex === index && (
                <div id={`faq-panel-${index}`} className="px-5 pb-5 text-gray-700">
                  <p className="leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessFAQ;
