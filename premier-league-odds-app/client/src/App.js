import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import DetailsTable from './DetailsTable';


function App() {
  const [clickedMatchIndex, setClickedMatchIndex] = useState(-1); // Initialize with -1 to indicate no match is clicked initially
  const [matches, setMatches] = useState([]);
  const tableData = [];

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual API key from the-odds-api.com
    const apiKey = 'copy-paste-your-number-in-here';
    const apiUrl = `https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?apiKey=${apiKey}&regions=eu`;

    axios
      .get(apiUrl)
      .then((response) => {
        setMatches(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  matches.forEach((match, index) => {
    const { home_team, away_team, bookmakers } = match;
    let highestHomePrice = 0;
    let highestAwayPrice = 0;
    let highestDrawPrice = 0;

    // find the highest value for each outcome comparing all markets
    bookmakers.forEach((bookmaker) => {
      bookmaker.markets.forEach((market) => {
        if (market.key === 'h2h') {
          market.outcomes.forEach((outcome) => {
            if (outcome.name === home_team) {
              highestHomePrice = Math.max(highestHomePrice, outcome.price);
            } else if (outcome.name === away_team) {
              highestAwayPrice = Math.max(highestAwayPrice, outcome.price);
            } else if (outcome.name === 'Draw') {
              highestDrawPrice = Math.max(highestDrawPrice, outcome.price);
            }
          });
        }
      });
    });

    tableData.push({
      home_team,
      away_team,
      highestHomePrice,
      highestAwayPrice,
      highestDrawPrice,
    });
  });

  const handleMatchClick = (index) => {
    // Toggle the visibility by checking the current state
    setClickedMatchIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr className='headCells-of-main-table'>
            <th colSpan="2">Match</th>
            <th colSpan="3">Outcomes</th>
          </tr>
          <tr>
            <th>Home</th>
            <th>Away</th>
            <th>1</th>
            <th>2</th>
            <th>X</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((match, index) => (
            <React.Fragment key={index}>
              <tr
                key={index}
                className={index === clickedMatchIndex ? 'selected-match' : ''}
                style={{
                  backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff',
                  transition: 'background-color 0.65s',
                }}
                onClick={() => handleMatchClick(index)}
              >
                <td className='cell-of-teams'>{match.home_team}</td>
                <td className='cell-of-teams'>{match.away_team}</td>
                <td className='cell-of-teams'>{match.highestHomePrice}</td>
                <td className='cell-of-teams'>{match.highestAwayPrice}</td>
                <td className='cell-of-teams'>{match.highestDrawPrice}</td>
              </tr>
              <DetailsTable
                match={matches[index]}
                index={index}
                clickedIndex={clickedMatchIndex}
                highestHomePrice={match.highestHomePrice}
                highestAwayPrice={match.highestAwayPrice}
                highestDrawPrice={match.highestDrawPrice}
              />
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
