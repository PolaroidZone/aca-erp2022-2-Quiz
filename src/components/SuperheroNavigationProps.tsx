import React from 'react';

type SuperheroNavigationProps = {
  superheroes: string[];
  onSuperheroSelect: (superhero: string) => void;
};

const SuperheroNavigation: React.FC<SuperheroNavigationProps> = ({ superheroes, onSuperheroSelect }) => {
  return (
    <div className="character-con">
      {superheroes.map((superhero) => (
        <div key={superhero} className="charecter">
          <div className="char-indicator"></div>
          <div className="char-main" onClick={() => onSuperheroSelect(superhero)}>
            <img src="" alt="" />
            <h1>{superhero}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuperheroNavigation;
