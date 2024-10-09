import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState("light"); // light or dark theme

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      category: "General",
      questions: [
        {
          question: "What is this website about?",
          answer:
            "This website offers a variety of services and information to help users navigate and achieve their goals more effectively.",
        },
        {
          question: "How can I contact support?",
          answer:
            "You can reach our support team via email at support@example.com or call us at (123) 456-7890.",
        },
      ],
    },
    {
      category: "Account",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "To create an account, click on the 'Sign Up' button at the top right corner and follow the registration process.",
        },
        {
          question: "I forgot my password. What should I do?",
          answer:
            "Click on the 'Forgot Password' link on the login page and follow the instructions to reset your password.",
        },
      ],
    },
    {
      category: "Billing",
      questions: [
        {
          question: "What payment methods are accepted?",
          answer:
            "We accept all major credit cards, PayPal, and direct bank transfers.",
        },
        {
          question: "Can I get a refund?",
          answer:
            "Refunds are provided based on our refund policy. You can read more about it on our Refund Policy page.",
        },
      ],
    },
  ];

  const filteredFaq = faqData.map((category) => ({
    ...category,
    questions: category.questions.filter((q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <div className={theme}>
      <Header />
      <div className="faq-container">
        <div className="faq-header">
          <h1>Frequently Asked Questions</h1>
          <div className="faq-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for a question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="theme-toggle">
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </div>
        </div>

        {filteredFaq.map(
          (category, categoryIndex) =>
            category.questions.length > 0 && (
              <div key={categoryIndex} className="faq-category">
                <h2>{category.category}</h2>
                {category.questions.map((item, index) => (
                  <div key={index} className="faq-item">
                    <div
                      className="faq-question"
                      onClick={() => toggleAnswer(`${categoryIndex}-${index}`)}
                    >
                      <h3>{item.question}</h3>
                      <span>
                        {activeIndex === `${categoryIndex}-${index}` ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    </div>
                    {activeIndex === `${categoryIndex}-${index}` && (
                      <div className="faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
        )}
      </div>
      <Footer />

      <style jsx>{`
        .faq-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          background-color: var(--bg-color);
          color: var(--text-color);
        }

        .faq-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }

        h1 {
          margin-bottom: 20px;
          text-align: center;
        }

        .faq-search {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 5px;
          width: 100%;
          max-width: 400px;
        }

        .search-icon {
          margin-right: 10px;
        }

        input {
          border: none;
          width: 100%;
          font-size: 1rem;
        }

        .theme-toggle {
          margin-left: 20px;
        }

        .faq-category {
          margin-bottom: 40px;
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          padding: 15px;
          background-color: var(--question-bg);
          border-radius: 5px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          transition: background-color 0.3s ease;
        }

        .faq-question:hover {
          background-color: var(--question-hover-bg);
        }

        .faq-answer {
          padding: 15px;
          background-color: var(--answer-bg);
          border-left: 3px solid var(--primary-color);
          animation: slideDown 0.3s ease;
        }

        .faq-answer p {
          margin: 0;
        }

        h2 {
          margin-bottom: 15px;
        }

        h3 {
          margin: 0;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Light Theme */
        .light {
          --bg-color: #ffffff;
          --text-color: #333;
          --question-bg: #f7f7f7;
          --question-hover-bg: #e0e0e0;
          --answer-bg: #ffffff;
          --primary-color: #007bff;
        }

        /* Dark Theme */
        .dark {
          --bg-color: #1e1e1e;
          --text-color: #f0f0f0;
          --question-bg: #333;
          --question-hover-bg: #444;
          --answer-bg: #292929;
          --primary-color: #ffc107;
        }
      `}</style>
    </div>
  );
};

export default Faq;
