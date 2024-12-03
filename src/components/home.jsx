import React, { useState } from 'react';
import './style.css';

const Home = () => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className='home-page'>
         <img src="../images/banner.jpg" alt="" width="100%"/>
         
      <div className="container">
        <div className="row">
          <div className='heading'>
            <h2>Challenge Your Mind with Fun and Interactive Quizzes!</h2>
            <p>A selection of quiz categories like</p>
          </div>
          <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                  <div className='flip-card-bg'>
                    Question 1
                  </div>
                  <div>
                    <p>What is 7 + 5?</p>
                    <div class="mydict">
                      <div>
                        <label>
                          <input type="radio" name="radio" checked=""/>
                          <span>11</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>12</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>13</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>14</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='btn-outer'>
                    <a className='btn' href="">Skip</a>
                    <a className='btn' href="">Submit</a>
                  </div>
                </div>
              <div className="flip-card-back">
                  <div className='flip-card-bg'>
                    Answer 1
                  </div>
                  <div>
                    <p>12</p>
                  </div>
              </div>
            </div>
          </div>
          <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                
              <div className='flip-card-bg'>
                  Question 2
                </div>
                <div>
                    <p>Which animal is known as the "King of the Jungle"?</p>
                    <div class="mydict">
                      <div>
                        <label>
                          <input type="radio" name="radio" checked=""/>
                          <span>Elephant</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>Tiger</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>Lion</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>Giraffe</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='btn-outer'>
                    <a className='btn' href="">Skip</a>
                    <a className='btn' href="">Submit</a>
                  </div>
              </div>
              <div className="flip-card-back">
              <div className='flip-card-bg'>
                    Answer 2
                  </div>
                  <div>
                    <p>Lion</p>
                  </div>
              </div>
            </div>
          </div>
          <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
              <div className='flip-card-bg'>
                  Question 4
                </div>
                <div>
                    <p>Which shape has 4 equal sides?</p>
                    <div class="mydict">
                      <div>
                        <label>
                          <input type="radio" name="radio" checked=""/>
                          <span>Rectangle</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>Triangle</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>Square</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>Circle</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='btn-outer'>
                    <a className='btn' href="">Skip</a>
                    <a className='btn' href="">Submit</a>
                  </div>
              </div>
              <div className="flip-card-back">
              <div className='flip-card-bg'>
                    Answer 3
                  </div>
                  <div>
                    <p>Square</p>
                  </div>
              </div>
            </div>
          </div>
          <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className='flip-card-bg'>
                    Question 4
                  </div>
                  <div>
                    <p>What do plants need to grow?</p>
                    <div class="mydict">
                      <div>
                        <label>
                          <input type="radio" name="radio" checked=""/>
                          <span>Ice</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>Sand</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>Water</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>Rocks</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='btn-outer'>
                    <a className='btn' href="">Skip</a>
                    <a className='btn' href="">Submit</a>
                  </div>
              </div>
              <div className="flip-card-back">
                <div className='flip-card-bg'>
                    Answer 4
                  </div>
                  <div>
                    <p>Water</p>
                  </div>
              </div>
            </div>
          </div>
          <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
               
              <div className='flip-card-bg'>
                  Question 5
                </div>
                <div>
                    <p> Which month comes after May?</p>
                    <div class="mydict">
                      <div>
                        <label>
                          <input type="radio" name="radio" checked=""/>
                          <span>April</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>June</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>March</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>July</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='btn-outer'>
                    <a className='btn' href="">Skip</a>
                    <a className='btn' href="">Submit</a>
                  </div>
              </div>
              <div className="flip-card-back">
              <div className='flip-card-bg'>
                    Answer 5
                  </div>
                  <div>
                    <p>June</p>
                  </div>
              </div>
            </div>
          </div>
          <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
              <div className='flip-card-bg'>
                  Question 6
                </div>
                <div>
                    <p>How many days are in a week?</p>
                    <div class="mydict">
                      <div>
                        <label>
                          <input type="radio" name="radio" checked=""/>
                          <span>5</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>6</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>7</span>
                        </label>
                        <label>
                          <input type="radio" name="radio"/>
                          <span>8</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='btn-outer'>
                    <a className='btn' href="">Skip</a>
                    <a className='btn' href="">Submit</a>
                  </div>
              </div>
              <div className="flip-card-back">
                
              <div className='flip-card-bg'>
                    Answer 6
                  </div>
                  <div>
                    <p>7</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div className='bg-color'>
      <div className="container">
          <div className="row">
              <div className='heading'>
                <h2>Challenge Your Mind with Fun and Interactive Quizzes!</h2>
                <p>Explore different quiz categories, flip cards, and discover how much you really know!"</p>
              </div>
              <ul className='step-list'>
                <li className='green'>
                  <h3>Step 1</h3>
                  <p>Choose your quiz category</p>
                </li>
                <li className='purple'>
                  <h3>Step 2</h3>
                  <p>Flip the cards to reveal the question</p>
                </li>
                <li className='yellow'>
                  <h3>Step 3</h3>
                  <p>Guess the correct answer before the time runs out!</p>
                </li>
                <li className='red'>
                  <h3>Step 4</h3>
                  <p>Check your score and move on to the next challenge.</p>
                </li>
              </ul>
          </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
