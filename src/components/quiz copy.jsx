import React, { useState, useEffect } from 'react';
import { json, useParams } from 'react-router-dom';  
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StartQuiz = () => {

  const { set_id } = useParams();  
  const [quizData, setQuizData] = useState(null); 
  const [loading, setLoading] = useState(true);  
  const [flippedCard, setFlippedCard] = useState(null);
  const [selectedOption, setSelectedOption] = useState({}); 

  // Fetch quiz data when page loads
  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true); 
      try {
        const set_data ={
          set_id : set_id
        }

        const response = await axios.post('http://localhost:7000/start/flashcard/quiz', set_data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          setQuizData(response.data.data); 
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      } finally {
        setLoading(false);  
      }
    };

    fetchQuizData();
  }, [set_id]);  

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  if (!quizData) {
    return <div>Quiz not found.</div>;  
  }


  const handleCardClick = (index, cardId) => {
    setFlippedCard(flippedCard === index ? null : index); // Toggle card flip

    // After card flip, send a request with both set_id and card_id
    const postData = {
      set_id: set_id,
      card_id: cardId,
    };

    // Sending the POST request when a card is flipped
    axios.post('http://localhost:7000/check/answer', postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.data) {
        console.log("response.data--- "+JSON.stringify(response.data));
        toast.error('You have verified the answer. This question is not worth any points.');
      } else {
        toast.error('Incorrect answer, try again!');
      }
    })
    .catch((error) => {
      console.error('Error checking answer:', error);
      toast.error('Error checking the answer.');
    });
  };


  const handleOptionChange = (cardId, option) => {
    setSelectedOption({
      ...selectedOption,
      [cardId]: option, // Store selected option for this card
    });
  };

  const handleSubmitAnswer = (cardId, selectedOption) => {
    if (!selectedOption) {
      toast.error('Please select an option!');
      return;
    }

    const postData = {
      set_id: set_id,
      card_id: cardId,
      provided_answer: selectedOption,
    };

    // Sending the POST request with the selected answer
    axios.post('http://localhost:7000/submit/answer', postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.data) {
        toast.success('Answer Submitted Successfully!');
      } else {
        toast.error('Incorrect answer, try again!');
      }
    })
    .catch((error) => {
      console.error('Error submitting answer:', error);
      toast.error('Error submitting answer.');
    });
  };

  const handleSkipAnswer = (cardId) => {
 

    const postData = {
      set_id: set_id,
      card_id: cardId
    };

    // Sending the POST request with the selected answer
    axios.post('http://localhost:7000/skip/answer', postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.data) {
        toast.success('Answer Skipped Successfully!');
      } else {
        toast.error('Incorrect answer, try again!');
      }
    })
    .catch((error) => {
      console.error('Error skipping answer:', error);
      toast.error('Error skipping answer.');
    });
  };


  return (
    <div className="App">
    <div>
      <ToastContainer autoClose={700} />
    </div>

    <div className="flashcard-container">
      <div>
        <div className="flashcard-set">
          <h1>{quizData.title.charAt(0).toUpperCase() + quizData.title.slice(1)}</h1>
          <p>{quizData.description.charAt(0).toUpperCase() + quizData.description.slice(1)}</p>

          {quizData.flashcards.map((flashcard, index) => (
            <div
              key={flashcard.card_id} // Use card_id as key
              className={`flashcard ${flippedCard === index ? 'flipped' : ''}`}
            >
              <div className="flashcard-inner">
                {/* Front side - Question and Options */}
                <div className="flashcard-front">
                  <h3>{flashcard.question}</h3>
                  <ul>
                    {flashcard.options.map((option, idx) => (
                      <li key={idx}>
                        <input
                          type="radio"
                          id={`option-${flashcard.card_id}-${idx}`}
                          name={`flashcard-${flashcard.card_id}`}
                          value={option[0]} // Use option text as value
                          onChange={() => handleOptionChange(flashcard.card_id, option[0])}
                          checked={selectedOption[flashcard.card_id] === option[0]} // Check if this option is selected
                        />
                        <label htmlFor={`option-${flashcard.card_id}-${idx}`}>{option[0]}</label>
                      </li>
                    ))}
                  </ul>

                  {/* Submit Answer Button */}
                  <button
                    className="btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card flip
                      handleSubmitAnswer(flashcard.card_id, selectedOption[flashcard.card_id]);
                    }}
                  >
                    Submit Answer
                  </button>

                  {/* Submit Answer Button */}
                  <button
                    className="btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card flip
                      handleSkipAnswer(flashcard.card_id);
                    }}
                  >
                    Skip Answer
                  </button>

                  {/* Flip Card Button */}
                  <button
                    className="btn"
                    onClick={() => handleCardClick(index,flashcard.card_id)} // Flip card when clicked
                  >
                    Flip Card
                  </button>
                </div>

                {/* Back side - Answer */}
                <div className="flashcard-back">
                  <h3>Answer:</h3>
                  <p>{flashcard.answer}</p>

                  <button
                    className="btn"
                    onClick={() => handleCardClick(index,flashcard.card_id)} // Flip card when clicked
                  >
                    Flip Card
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default StartQuiz;
