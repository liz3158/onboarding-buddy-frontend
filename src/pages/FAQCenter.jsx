import React, { useState } from "react";
 import { useTranslation } from "react-i18next";
 import { MdAdd, MdRemove } from "react-icons/md";
 import image from "../assets/images/background.png";
 import "./FAQCenter.scss";
 
 const FAQCenter = () => {
   const { t } = useTranslation();
   const [openId, setOpenId] = useState(null); // << solo‑open controller
 
   const sections = [
     {
       title: t("faq_cat_onboarding"),
       items: [
         { id: 1, q: t("faq_q1"),  a: t("faq_a1")  },
         { id: 2, q: t("faq_q2"),  a: t("faq_a2")  },
         { id: 3, q: t("faq_q3"),  a: t("faq_a3")  },
       ],
     },
     {
       title: t("faq_cat_privacy"),
       items: [
         { id: 4, q: t("faq_q4"),  a: t("faq_a4")  },
         { id: 5, q: t("faq_q5"),  a: t("faq_a5")  },
         { id: 6, q: t("faq_q6"),  a: t("faq_a6")  },
       ],
     },
     {
       title: t("faq_cat_support"),
       items: [
         { id: 7, q: t("faq_q7"),  a: t("faq_a7")  },
         { id: 8, q: t("faq_q8"),  a: t("faq_a8")  },
         { id: 9, q: t("faq_q9"),  a: t("faq_a9")  },
       ],
     },
     {
       title: t("faq_cat_general"),
       items: [
         { id: 10, q: t("faq_q10"), a: t("faq_a10") },
         { id: 11, q: t("faq_q11"), a: t("faq_a11") },
         { id: 12, q: t("faq_q12"), a: t("faq_a12") },
       ],
     },
   ];
 
   const toggle = (id) => setOpenId(openId === id ? null : id);
 
   return (
     <section className="faq-center">
       <h2 className="heading">{t("faq_center_title")}</h2>
       <p className="sub">{t("faq_center_sub")}</p>
 
       <div className="grid">
         {sections.map(({ title, items }) => (
           <div key={title} className="section">
             <h3 className="section-title">{title}</h3>
 
             {items.map(({ id, q, a }) => (
               <FAQItem
                 key={id}
                 open={openId === id}
                 onToggle={() => toggle(id)}
                 question={q}
                 answer={a}
               />
             ))}
           </div>
         ))}
       </div>
     </section>
   );
 };
 
 const FAQItem = ({ question, answer, open, onToggle }) => (
   <div className={`faq-item ${open ? "open" : ""}`}>
     <button className="faq-toggle" onClick={onToggle}>
       <span>{question}</span>
       {open ? (
         <MdRemove size={18} className="icon open" />
       ) : (
         <MdAdd size={18} className="icon" />
       )}
     </button>
     {open && <p className="faq-answer">{answer}</p>}
   </div>
 );
 
 export default FAQCenter;