import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToken from "../useToken";



const StartQuiz = () => {
  const { set_id } = useParams();  
  const [quizData, setQuizData] = useState(null); 
  const [loading, setLoading] = useState(true);  
  const [flippedCard, setFlippedCard] = useState(null);
  const [selectedOption, setSelectedOption] = useState({}); 
  const [removedCards, setRemovedCards] = useState([]); // Track removed cards
  const [flippingInProgress, setFlippingInProgress] = useState(false); // Track if a card is being flipped
  const [statistics, setStatistics] = useState(null);  // New state to store statistics

  const token = useToken();

  useEffect(() => {
    // Fetch quiz data when page loads
    const fetchQuizData = async () => {
      setLoading(true);
      try {
        const set_data = { set_id: set_id };
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
  }, [set_id]); // Only depend on set_id to fetch quiz data once
  
  useEffect(() => {
    // Fetch statistics when all cards are removed
    if (removedCards.length === quizData?.flashcards.length && quizData) {
      const fetchStatistics = async () => {
        try {
          const param ={
            set_id : set_id
          }
          axios.post('http://localhost:7000/display/grade', param, {
            headers: {
              'Content-Type': 'application/json',
               'Authorization': `Bearer ${token.token}`
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setStatistics(response.data.data); 
              toast.success('Please Check your Report');
            } else {
              toast.error('Incorrect answer, try again!');
            }
          });
        
        } catch (error) {
          console.error('Error fetching statistics:', error);
          toast.error('Error fetching statistics.');
        }
      };
  
      fetchStatistics();
    }
  }, [removedCards, quizData, set_id]); // Run this when removedCards or quizData changes

  


  if (loading) {
    return <div>Loading quiz...</div>;
  }

  if (!quizData) {
    return <div>Quiz not found.</div>;  
  }

  // Handle the flip of the card and automatically flip the next card
  const handleCardClick = (index, cardId) => {
    // Prevent flipping if the card is already removed or if another card is being flipped
    if (removedCards.includes(cardId) || flippingInProgress) return;

    setFlippingInProgress(true); // Set flag to prevent flipping other cards
    setFlippedCard(index); // Flip the current card

    // Automatically flip the next card after a delay or immediately
    setTimeout(() => {
      const nextCardIndex = index + 1;
      // Check if there is a next card to flip
      if (nextCardIndex < quizData.flashcards.length) {
        setFlippedCard(nextCardIndex); // Flip the next card
      }
      setFlippingInProgress(false); // Allow flipping of other cards
    }, 1500); // Delay for a smoother flip effect (1.5 seconds)

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
        toast.error('You have verified the answer. This question is not worth any points.');
      } else {
        toast.error('Incorrect answer, try again!');
      }

      // After 3 seconds, mark the card as removed
      setTimeout(() => {
        setRemovedCards((prevRemovedCards) => [...prevRemovedCards, cardId]);
      }, 3000); // Delay removal for 3 seconds
    })
    .catch((error) => {
      console.error('Error checking answer:', error);
      toast.error('Error checking the answer.');
      setFlippingInProgress(false); // Allow flipping of other cards even if there's an error
    });
  };

  // Store the selected option for each card
  const handleOptionChange = (cardId, option) => {
    setSelectedOption({
      ...selectedOption,
      [cardId]: option, // Store selected option for this card
    });
  };

  // Handle the answer submission
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

      // Mark the card as removed after it's submitted
      setRemovedCards((prevRemovedCards) => [...prevRemovedCards, cardId]);
    })
    .catch((error) => {
      console.error('Error submitting answer:', error);
      toast.error('Error submitting answer.');
    });
  };

  // Handle the skip action
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

      // Mark the card as removed after it's skipped
      setRemovedCards((prevRemovedCards) => [...prevRemovedCards, cardId]);
    })
    .catch((error) => {
      console.error('Error skipping answer:', error);
      toast.error('Error skipping answer.');
    });
  };

  // Check if all cards are removed
  const allCardsRemoved = removedCards.length === quizData.flashcards.length;

  return (
    <div className="App">
      <div>
        <ToastContainer autoClose={700} />
      </div>

      <div className="flashcard-container">
          <div className="flashcard-set">
            <h1>{quizData.title.charAt(0).toUpperCase() + quizData.title.slice(1)}</h1>
            <p>{quizData.description.charAt(0).toUpperCase() + quizData.description.slice(1)}</p>
            <div className='flashcard-list'>
              {/* Render only the flashcards that are not removed */}
              {quizData.flashcards.filter(flashcard => !removedCards.includes(flashcard.card_id)).map((flashcard, index) => (
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

                      {/* Skip Answer Button */}
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
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card flip
                          handleCardClick(index, flashcard.card_id);
                        }}
                      >
                        Check Answer
                      </button>
                    </div>

                    {/* Back side - Answer */}
                    <div className="flashcard-back">
                      <h3>Answer:</h3>
                      <p>{flashcard.answer}</p>

                      <button
                        className="btn"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card flip
                          handleCardClick(index, flashcard.card_id);
                        }}
                      >
                       Check Question
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>

      {/* Show grade and rating when all cards are removed */}
        {allCardsRemoved && statistics && (
          <div className="grade-rating">
            <h2>Result</h2> 
            {/* <h3>Rating: 5/5</h3>   */}
            <div className='aresult'>
              <p><strong> Total Questions:</strong> {statistics.total_questions}</p>
              <p><strong> Total Done:</strong> {statistics.total_done}</p>
              <p><strong> Correct Answer:</strong> {statistics.correct_answer}</p>
              <p><strong> Total Marks:</strong> {statistics.total_marks}</p>
          </div>
          </div>
        )}
    </div>
  );
};

export default StartQuiz;
