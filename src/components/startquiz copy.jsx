import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios if you haven't already (`npm install axios`)
import useToken from "../useToken";
import CharacterCard from "../CharacterCard";
import * as CatData from "../data.jsx";
import * as utils from "../helper_data";
import { v4 as uuidv4 } from "uuid";



const StartQuiz = () => {
  const [filteredContacts, setFilteredContacts] = useState([]);

  const [contacts, setContacts] = useState([]);

  const handleCatClick = (id) => {
    setFilteredContacts(
      filteredContacts.map((contact) =>
        contact.id === id
          ? { ...contact, imageId: Math.random() * 10000000000 }
          : contact
      )
    );
  };

  const handleSearchText = (e) => {
    if (e.target.value !== "") {
      setFilteredContacts(
        contacts.filter((contact) =>
          contact.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else setFilteredContacts(contacts);
  };

  const handleAddCat = () => {
    let newCat = createNewCat();

    setContacts((cats) => [...cats, newCat]);

    // let winner = utils.battle(contacts[0], contacts[1]);

    // console.log(winner);
  };

  function createNewCat() {
    let countries = CatData.countires;
    let countiesCount = CatData.countires.length - 1;
    let randomCountry = countries[utils.getRandomInt(countiesCount)];

    let attack = Math.random() * 3 + 1;
    let defense = Math.random() * 3 + 1;
    let speed = Math.random() * 3 + 1;

    let rank = Math.round((attack + defense + speed) * (100 / 12));

    let cat = {
      name: utils.projectname(),
      id: uuidv4(),
      created: Date.now(),
      attack: attack,
      defense: speed,
      speed: defense,
      rank: rank,
      country: {
        name: randomCountry.name,
        code: randomCountry.code,
        lat: randomCountry.lat,
        lng: randomCountry.lng
      }
    };

    return cat;
  }

  useEffect(() => {
    // Update the document title using the browser API

    let countries = CatData.countires;
    let countiesCount = CatData.countires.length - 1;

    let preloadedCats = [];

    for (let i = 1; i <= 15; i++) {
      let newCat = createNewCat();
      preloadedCats.push(newCat);
    }

    setContacts(preloadedCats);
  }, []);

  useEffect(() => {
    // Update the document title using the browser API
    const sorted = [...contacts].sort((a, b) => {
      return b.created - a.created;
    });
    setFilteredContacts(sorted);
  }, [contacts]); 


  
  return (
    <div className="App">
      <div className='row'>
        <div className='col-md-3'>
            <ul className='list-quiz'>
              <li>
                <a href="">General Knowledge</a>
              </li>
              <li>
                <a href="">Mathematics</a>
              </li>
              <li>
                <a href="">Science</a>
              </li>
              <li>
                <a href="">English</a>
              </li>
              <li>
                <a href="">Nature Knowledge</a>
              </li>
              <li>
                <a href="">Physics</a>
              </li>
            </ul>
        </div>
        <div className='col-md-9'>
        {/* <div style={{ fontSize: "1em" }}>
          <label>search </label>
          <input
            onChange={handleSearchText}
            type="text"
            style={{ fontSize: "1em" }}
          ></input>
        </div> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexFlow: "wrap",
            justifyContent: "center"
          }}
        >
          {filteredContacts.map((c, index) => (
            <CharacterCard
              key={c.id}
              catData={c}
              onChangeImage={handleCatClick}
            />
          ))}
        </div>
        </div>
        </div>
  </div>
  );
};

export default StartQuiz;
