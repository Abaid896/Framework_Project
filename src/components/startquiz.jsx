import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios if you haven't already (`npm install axios`)
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StartQuiz = () => {
    // State to hold the categories, frameset data, and selected category
    const [categories, setCategories] = useState([]);
    const [frameset, setFrameset] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);  // To track selected category
  
    // Fetch Categories (on initial render)
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:7000/get/categories', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          setCategories(response.data.data);
          // Set default category as the first category
          if (response.data.data && response.data.data.length > 0) {
            setSelectedCategory(response.data.data[0].name); // Set the first category as default
          }
        } else {
          toast.error('Fetched Categories failed. Please try again.');
        }
      } catch (err) {
        console.error('Error during fetching categories:', err);
        toast.error('Fetched Categories failed. Please try again.');
      }
    };
  
    // Fetch Frameset for selected category
    const fetchFrameset = async (category) => {
      const categoryData = {
        category_name: category,
      };  
      try {
        const response = await axios.post('http://localhost:7000/get/flashcard/by/category', categoryData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          setFrameset(response.data.data);
        } else {
          toast.error('Fetched Frameset failed. Please try again.');
        }
      } catch (err) {
        console.error('Error during fetching frameset:', err);
        toast.error('Fetched Frameset failed. Please try again.');
      }
    };
  
    // Handle category click
    const handleCategoryClick = (categoryName) => {
      setSelectedCategory(categoryName); 
      fetchFrameset(categoryName);  
    };
  
    useEffect(() => {
      fetchCategories();
    }, []);
  
    useEffect(() => {
      if (selectedCategory) {
        fetchFrameset(selectedCategory);
      }
    }, [selectedCategory]); 


  return (
    <div className="App">
       <div>
        <ToastContainer autoClose={700}/>
        </div>

        <div className="row">
            {/* Categories Sidebar */}
            <div className="col-md-3">
              <ul className="list-quiz">
                Categories
                {categories && categories.length > 0 && categories.map((value, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      onClick={() => handleCategoryClick(value.name)} 
                      style={{
                        fontWeight: selectedCategory === value.name ? 'bold' : 'normal', 
                      }}
                    >
                      {value.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Display Frameset Titles and Descriptions */}
            <div className="col-md-9">
              {frameset && frameset.length > 0 ? (
                frameset.map((value, index) => (
                  <div className="frameset_div" key={index}>
                    <h2>{index + 1}. Title: {value.title}</h2>
                    <p>Description: {value.description}</p>
                    <a href={`/quiz/${value.set_id}`} className='btn'>Start Quiz</a>
                  </div>
                ))
              ) : (
                <p>No flashcards available for this category.</p>
              )}
            </div>
      </div>
  </div>
  );
};

export default StartQuiz;
