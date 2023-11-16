import React, { useState } from 'react';
import './feedback.css';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = ({ onClose }) => {
  const questions = [
    'Question 1: How often does the teacher incorporate different teaching methods, such as lectures, group activities, and multimedia resources?',
    'Question 2: How would you rate the teacher\'s ability to maintain a positive and organized classroom environment?',
    'Question 3: How effectively does the teacher communicate complex concepts to students?',
    'Question 4: To what extent do students seem engaged and interested in the class?',
    'Question 5: How well does the teacher provide timely and constructive feedback on student work?',
    'Question 6: How well does the teacher adjust their teaching approach based on student needs and understanding?',
    'Question 7: How accessible is the teacher outside of class for questions and clarification?',
    'Question 8: To what extent does the teacher incorporate innovative teaching methods or technologies?',
    'Question 9: How inclusive is the teacher in addressing the diverse needs of students in the classroom?',
    'Question 10: How passionate does the teacher appear about the subject matter?',
  ];

  const options = {
    0: ['Rarely', 'Occasionally', 'Frequently'],
    1: ['Poor', 'Average', 'Excellent'],
    2: ['Not effectively', 'Moderately effective', 'Highly effective'],
    3: ['Not at all', 'Somewhat', 'Very much'],
    4: ['Rarely or never', 'Sometimes', 'Consistently'],
    5: ['Rarely', 'Occasionally', 'Frequently'],
    6: ['Not accessible', 'Moderately accessible', 'Highly accessible'],
    7: ['Rarely or never', 'Sometimes', 'Consistently'],
    8: ['Not inclusive', 'Moderately inclusive', 'Highly inclusive'],
    9: ['Not at all', 'Somewhat', 'Very much'],
  };
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(new Array(questions.length).fill(null));
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedFeedback = [...feedback];
    updatedFeedback[questionIndex] = optionIndex;
    setFeedback(updatedFeedback);
  };
  const handleClearAll = () => {
    setFeedback(new Array(questions.length).fill(null));
    setFormSubmitted(false);
  };
  const handleSubmit = () => {
    if (feedback.includes(null)) {
      setFormSubmitted(true);
      return;
    }

    // Process and store the feedback data as needed
    console.log('Feedback submitted:', feedback);

    // Send feedback data to the server
    fetch('http://localhost:3001/api/submit-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Server response:', data);
        // Close the feedback form or handle the response as needed
        navigate("/dashboard");
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors if necessary
      });
      navigate("/dashboard");
  };

  return (
    <div className='feedback-main'>
      <div className="feedback-form">
        <h2>Teacher Feedback</h2>
        <form>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className={`feedback-question-box ${formSubmitted && feedback[questionIndex] === null ? 'empty-feedback' : ''}`}>
              <p>
                {question}{' '}
                <span className="Star" style={{ color: 'red' }}>*</span>
                
              </p>
              {options[questionIndex].map((option, optionIndex) => (
                <label key={optionIndex} className='feedback-radio'>
                  <input
                    type="radio"
                    value={optionIndex}
                    checked={feedback[questionIndex] === optionIndex}
                    onChange={() => handleOptionChange(questionIndex, optionIndex)}
                  />
                  <span className="checkmark"></span>
                  {option}
                </label>
              ))}
            </div>
          ))}
          {formSubmitted && feedback.includes(null) && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              Please provide feedback for all questions.
            </div>
          )}
          <div className='feedback-buttons'>
            <button type="button" onClick={handleSubmit}>
              Submit Feedback
            </button>
            <button type="button" onClick={handleClearAll} className='clear'>
                Clear All
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
