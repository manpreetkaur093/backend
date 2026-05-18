import { useEffect, useState } from "react";
import "../styles/common.css";

function Questions() {
  const [questions, setQuestions] = useState([]);

  // Permanent default questions (always shown)
  const defaultQuestions = [
    {
      id: "d1",
      title: "Tell me about yourself",
      description:
        "Give a concise professional introduction covering your education, experience, skills, and career goals.",
    },
    {
      id: "d2",
      title: "What are your strengths and weaknesses?",
      description:
        "Highlight relevant strengths with examples and discuss one weakness with how you are improving it.",
    },
    {
      id: "d3",
      title: "Why do you want to work here?",
      description:
        "Show that you researched the company and connect their values or mission with your goals.",
    },
    {
      id: "d4",
      title: "Describe a challenge you faced and how you solved it",
      description:
        "Use the STAR method (Situation, Task, Action, Result) to explain your problem-solving skills.",
    },
    {
      id: "d5",
      title: "Where do you see yourself in 5 years?",
      description:
        "Talk about career growth, learning goals, and long-term professional ambitions.",
    },
    {
      id: "d6",
      title: "Why should we hire you?",
      description:
        "Explain what makes you unique and how your skills can add value to the company.",
    },
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          "https://interview-backend-3n8v.onrender.com/questions",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        let apiQuestions = [];

        if (res.ok) {
          apiQuestions = await res.json();
        }

        // Merge + avoid duplicates (optional safety)
        const merged = [...defaultQuestions, ...apiQuestions];

        setQuestions(merged);
      } catch (error) {
        console.error(error);

        // If API fails → still show defaults
        setQuestions(defaultQuestions);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="page">
      <div className="card" style={{ width: "600px" }}>
        <h2 className="title">Interview Questions</h2>

        {questions.length === 0 ? (
          <p>No questions found</p>
        ) : (
          questions.map((q) => (
            <div key={q.id} className="question-card">
              <h3>{q.title}</h3>
              <p>{q.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Questions;