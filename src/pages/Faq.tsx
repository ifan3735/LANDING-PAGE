import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      category: "General",
      questions: [
        {
          question: "What is this website about?",
          answer: "This website offers a variety of services and information to help users navigate and achieve their goals more effectively."
        },
        {
          question: "How can I contact support?",
          answer: "You can reach our support team via email at support@example.com or call us at (123) 456-7890."
        }
      ]
    },
    {
      category: "Account",
      questions: [
        {
          question: "How do I create an account?",
          answer: "To create an account, click on the 'Sign Up' button at the top right corner and follow the registration process."
        },
        {
          question: "I forgot my password. What should I do?",
          answer: "Click on the 'Forgot Password' link on the login page and follow the instructions to reset your password."
        }
      ]
    },
    {
      category: "Billing",
      questions: [
        {
          question: "What payment methods are accepted?",
          answer: "We accept all major credit cards, PayPal, and direct bank transfers."
        },
        {
          question: "Can I get a refund?",
          answer: "Refunds are provided based on our refund policy. You can read more about it on our Refund Policy page."
        }
      ]
    }
  ];

  return (
    <div>
      <Header />
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>

        {faqData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="faq-category">
            <h2>{category.category}</h2>
            {category.questions.map((item, index) => (
              <div key={index} className="faq-item">
                <div
                  className="faq-question"
                  onClick={() => toggleAnswer(`${categoryIndex}-${index}`)}
                >
                  <h3>{item.question}</h3>
                  <span>{activeIndex === `${categoryIndex}-${index}` ? "-" : "+"}</span>
                </div>
                {activeIndex === `${categoryIndex}-${index}` && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Footer />
      <style jsx>{`
        .faq-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .faq-category {
          margin-bottom: 40px;
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          padding: 10px;
          background-color: #f7f7f7;
          border-radius: 5px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
        }

        .faq-answer {
          padding: 10px;
          background-color: #fff;
          border-left: 3px solid #007bff;
        }

        .faq-answer p {
          margin: 0;
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
        }

        h2 {
          margin-bottom: 15px;
        }

        h3 {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default Faq;
