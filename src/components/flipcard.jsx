

// export default FlipCard;
import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios if you haven't already (`npm install axios`)
import useToken from "../useToken";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FlipCard = () => {
  const token = useToken();
  const new_token = token.token;

  // State to track questions and form fields
  const [questions, setQuestions] = useState([
    { id: 1, questionText: '', options: ['', '', '', ''], answer: '' },
  ]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  // Add more question handler
  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      questionText: '',
      options: ['', '', '', ''],
      answer: '',
    };
    setQuestions([...questions, newQuestion]);  // Add new question to the state
  };

  // Handle input changes for question, options, and answer
  const handleChange = (index, field, value, optionIndex = null) => {
    const updatedQuestions = [...questions];

    if (optionIndex !== null) {
      // Update the specific option value
      updatedQuestions[index].options[optionIndex] = value;
    } else if (field === 'answer') {
      // Update the answer (which is the selected option index)
      updatedQuestions[index].answer = value;
    } else {
      // Update the question text
      updatedQuestions[index].questionText = value;
    }

    setQuestions(updatedQuestions);  // Update state with new values
  };

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload on submit

    // Prepare the data to send to the API
    const data = {
      title: title,
      description: description,
      category: category,
      flashcards: questions.map((question) => ({
        question: question.questionText,
        answer: question.answer,
        options: question.options,
      })),
    };

    try {
      const response = await axios.post('http://localhost:7000/add/flashcard', data, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization' : `Bearer ${new_token}`
        },
      });

      toast.success('Quiz Added Successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error('Error creating flashcard set:', error);
    }
  };

  return (
    <div className="flipcard-page">
        <div>
          <ToastContainer autoClose={700}/>
      </div>

      <div className="container">
        <h2>Quiz Form</h2>
        <p>Add your flashcard set</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* Render dynamic questions */}
          {questions.map((question, index) => (
            <div key={question.id} className="add-question">
              {/* Question input */}
              <div>
                <label>Question</label>
                <input
                  type="text"
                  value={question.questionText}
                  onChange={(e) => handleChange(index, 'questionText', e.target.value)}
                />
              </div>

              {/* Options for each question */}
              <div className="option-div">
                {question.options.map((option, optionIndex) => (
                  <div className="div-break" key={optionIndex}>
                    <div className="option">
                      <input
                        type="radio"
                        id={`option${optionIndex + 1}-${question.id}`}
                        name={`question${question.id}`}
                        value={option} // Set radio value as option
                        // checked={question.answer === option} // Mark as selected if it's the correct answer
                        onChange={() => handleChange(index, 'answer', option)} // Update answer when selected
                      />
                      <div>
                        <label htmlFor={`option${optionIndex + 1}-${question.id}`}>
                          Option {optionIndex + 1}
                        </label>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleChange(index, 'options', e.target.value, optionIndex)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Button to add more questions */}
          <button type="button" className="add-btn" onClick={handleAddQuestion}>
            Add More +
          </button>

          {/* Submit button for the form */}
          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FlipCard;
