import React from 'react';



type SuperheroNavigationProps = {
  superheroes: { name: string; image: string }[];
  onSuperheroSelect: (superhero: string) => void;
};

const SuperheroNavigation: React.FC<SuperheroNavigationProps> = ({ superheroes, onSuperheroSelect }) => {
  return (
    <div className="character-con">
    {superheroes.map((superhero) => (
      <div key={superhero.name} className="charecter" onClick={() => onSuperheroSelect(superhero.name)}>
        <div className="char-indicator"></div>
        <div className="char-main">
          <img src={superhero.image} alt={superhero.name} />
          <h1>{superhero.name}</h1>
        </div>
      </div>
    ))}
  </div>
  );
};

export default SuperheroNavigation;
