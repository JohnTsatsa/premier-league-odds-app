// MatchTable.js
import React from 'react';

function DetailsTable({ index, match, highestHomePrice, clickedIndex, highestAwayPrice, highestDrawPrice }) {
  const { home_team, away_team, bookmakers } = match;

  const isExpanded = index === clickedIndex;
  const tableClassName = isExpanded ? 'expanded-table show' : 'expanded-table';

  return (
    <td className='expanded-table' colSpan="8">
      <div className={tableClassName}>
        <table className="table-that-expanded">
          <thead>
            <tr>
              <th>Bookmaker</th>
              <th>{home_team}</th>
              <th>{away_team}</th>
              <th>Draw</th>
            </tr>
          </thead>
          <tbody>
            {bookmakers.map((bookmaker) => (
              <tr key={bookmaker.key}>
                <td className="cell-of-bookmaker-title">
                  <a
                    href={`https://www.google.gr/search?q=${encodeURIComponent(bookmaker.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {bookmaker.title}
                  </a>
                </td>
                {bookmaker.markets.map((market) => (
                  <React.Fragment key={market.key}>
                    {market.key === 'h2h' && (
                      <>
                        <td col='8' className={`cell-of-outcomes ${market.outcomes.find((outcome) => outcome.name === home_team)?.price === highestHomePrice ? 'green-cell' : ''}`}>
                          {market.outcomes.find((outcome) => outcome.name === home_team)?.price || '-'}
                        </td>
                        <td className={`cell-of-outcomes ${market.outcomes.find((outcome) => outcome.name === away_team)?.price === highestAwayPrice ? 'green-cell' : ''}`}>
                          {market.outcomes.find((outcome) => outcome.name === away_team)?.price || '-'}
                        </td>
                        <td className={`cell-of-outcomes ${market.outcomes.find((outcome) => outcome.name === 'Draw')?.price === highestDrawPrice ? 'green-cell' : ''}`}>
                          {market.outcomes.find((outcome) => outcome.name === 'Draw')?.price || '-'}
                        </td>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </td>
  );
}

export default DetailsTable;
