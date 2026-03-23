import { useState } from 'react';
import {
  HelpCircle, ChevronDown, ChevronUp, MessageSquare,
  BookOpen, Phone, Mail
} from 'lucide-react';

const faqs = [
  {
    q: 'How do I add a new product to the warehouse?',
    a: 'Open the "Product Warehouse" menu in the sidebar, then click the "Add Product" button in the upper right corner. Fill in the product details including name, stock, price, and category, and save.',
  },
  {
    q: 'How do I update order status?',
    a: 'Open the "Order Management" page, find the order you want to update, and click the "Detail" button on that order row. In the detail page, you can change the status to Processing, Shipped, or Completed.',
  },
  {
    q: 'What does the "Critical Stock" indicator mean?',
    a: 'Critical Stock means the amount of product stock is below 10% of the maximum capacity set. Restock immediately to avoid running out of product when orders come in.',
  },
  {
    q: 'How do I read the Sales Analytics charts?',
    a: 'The Sales Analytics page shows monthly revenue trends in a bar chart, and order volume trends in a line chart. The bottom section shows the proportion of sales per product type in indicator bars.',
  },
  {
    q: 'Is my data safe on AgriConnect?',
    a: 'Yes, all your data is encrypted using industry standards (AES-256). Our servers are located in Indonesia and satisfy ISO 27001 security standards. We do not share your data with third parties without permission.',
  },
  {
    q: 'How do I contact the support team?',
    a: 'You can contact our team via email at support@agriconnect.id or via WhatsApp at +62 800-AGRI-CONNECT (Monday–Friday, 08:00–17:00 WIB). We usually respond within 1×24 hours.',
  },
];

const guides = [
  { icon: '🌾', title: 'Getting Started with AgriConnect', desc: 'Complete guide for initial account setup and store profile configuration.' },
  { icon: '📦', title: 'Managing Warehouse Inventory', desc: 'Effective ways to manage stocks, product categories, and low stock alerts.' },
  { icon: '🛒', title: 'Processing Incoming Orders', desc: 'Workflow from order received to shipping to the buyer.' },
  { icon: '📊', title: 'Understanding Sales Reports', desc: 'How to read trend charts and use data for business decisions.' },
];

const FarmerHelp = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-slate-800">Help & Guides</h2>
        <p className="text-xs text-slate-500 mt-0.5">Find answers and learn how to use AgriConnect</p>
      </div>

      {/* Quick Guide */}
      <div className="bg-white rounded-[6px] border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={15} className="text-emerald-600" />
          <h3 className="text-sm font-semibold text-slate-800">Quick Guide</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {guides.map((g) => (
            <div
              key={g.title}
              className="flex items-start gap-3 p-3 border border-slate-100 rounded-[6px] hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <span className="text-xl leading-none mt-0.5">{g.icon}</span>
              <div>
                <p className="text-xs font-semibold text-slate-800">{g.title}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-[6px] border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle size={15} className="text-blue-600" />
          <h3 className="text-sm font-semibold text-slate-800">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-slate-100 rounded-[6px] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs font-semibold text-slate-800 pr-4">{faq.q}</span>
                {openFaq === i
                  ? <ChevronUp size={14} className="text-slate-400 flex-shrink-0" />
                  : <ChevronDown size={14} className="text-slate-400 flex-shrink-0" />
                }
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 border-t border-slate-100">
                  <p className="text-xs text-slate-600 leading-relaxed pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 rounded-[6px] border border-emerald-200 p-5">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare size={15} className="text-emerald-700" />
          <h3 className="text-sm font-semibold text-emerald-800">Still need help?</h3>
        </div>
        <p className="text-xs text-emerald-700 mb-4">Our support team is ready to help you every working day.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:support@agriconnect.id"
            className="flex items-center gap-2 bg-white text-emerald-700 text-xs font-semibold px-4 py-2.5 rounded-[6px] border border-emerald-200 hover:bg-emerald-50 transition-colors"
          >
            <Mail size={13} />
            support@agriconnect.id
          </a>
          <a
            href="tel:+6280082746"
            className="flex items-center gap-2 bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-[6px] hover:bg-emerald-700 transition-colors"
          >
            <Phone size={13} />
            +62 800-AGRI
          </a>
        </div>
      </div>
    </div>
  );
};

export default FarmerHelp;
