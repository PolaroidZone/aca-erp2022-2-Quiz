import React, {useEffect, useState} from 'react'
import quizData from './quizData.json'
import Congratulations from './components/Congratulations'
import { query ,getDocs, collection, addDoc } from 'firebase/firestore'
import { DocumentData } from 'firebase/firestore/lite';
import {db} from './firebase/config'
import NavBar from "./components/NavBar"
import SideNavL from "./components/SideNavL"
import SideNavR from "./components/SideNavR"
import SuperheroNavigation from "./components/SuperheroNavigationProps"
import Quiz  from './components/Quiz';

//Splash Art
import spiderMan from './images/Spider-man.png'
import hulk from'./images/hulk.png'
import blackWidow from'./images/black widow.png'
import ironMan from './images/Iron man.png'
import starLord from './images/start lord.png'

//thubnail art
import ironArt from './images/nano-iron-man.png'
import spiderArt from './images/Spider-Man-in-Avengers-Endgame.png'
import widowArt from './images/avengers-endgame-black-widow.png'
import hulkArt from './images/hulk-endgame.png'
import starArt from './images/star-lord.png'


import './App.css'
import './styles/Container.css'



//settingd the question type 
type Question = {
  superhero: string;
  question: string
  answers: Answer[]
}

//setting the Answer type
type Answer = {
  text: string
  correct: boolean
}


function App() {
  
  //use satate to monitor the score
  const [score, setScore] = useState(0)
  //use state to monitor questions
  const [currentQuestion, setCurrentQuestion] = useState(0)
  //use state to monitor uploading of quize questions to firebase
  // const [quizQuestions, setQuizQuestions] = useState<DocumentData[]>([])

  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [selectedSuperhero, setSelectedSuperhero] = useState('Iron Man');
  const [heroImg, selectedHeroImg] = useState(ironMan)//changing the images


  const getQuizQuestions = async (superhero: string) => {
    const quizQuestionsCollectionRef = collection(db, 'quizQuestions');
    try {
      const querySnapshot = await getDocs(quizQuestionsCollectionRef);
      const questions = querySnapshot.docs
        .map((doc) => doc.data() as Question)
        .filter((question) => question.superhero === superhero);
      setQuizQuestions(questions);
      setSelectedSuperhero(superhero)

      if (superhero == 'Iron Man'){
        selectedHeroImg(ironMan)
      } else if (superhero == 'Spider-Man'){
        selectedHeroImg(spiderMan)
      } else if (superhero == 'Black Widow'){
        selectedHeroImg(blackWidow)
      } else if (superhero == 'Hulk') {
        selectedHeroImg(hulk)
      } else if(superhero == 'Star Lord') {
        selectedHeroImg(starLord)
      } 
      
    } catch (error) {
      console.error('Error getting quiz questions:', error);
    }
  };


  //getting questions form firebase
  // Update the useEffect to format the data correctly
useEffect(() => {
  const getQuizQuestions = async (superhero: string) => {
    const quizQuestionsCollectionRef = collection(db, 'quizQuestions');
    try {
      const querySnapshot = await getDocs(quizQuestionsCollectionRef);
      const questions = querySnapshot.docs
        .map((doc) => doc.data() as Question)
        .filter((question) => question.superhero === superhero);
      setQuizQuestions(questions);
      setSelectedSuperhero(superhero)
      setCurrentQuestion(0); // Reset currentQuestion to 0 when a new superhero is selected
    } catch (error) {
      console.error('Error getting quiz questions:', error);
    }
  };

  // Call getQuizQuestions when the component mounts to fetch questions for the initial superhero (e.g., "Iron Man")
  getQuizQuestions('Iron Man');
}, []);

  //click handle for answring
  const handleAnswerClick = (correct: boolean) => {
    if (correct) {
      setScore((prevScore) => prevScore + 1)
    }
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setCurrentQuestion(quizQuestions.length) // Set the currentQuestion to the last question index
    }
  }

  return (
    <div className="App">
      <NavBar/>
        <div className="container">
          <div className="side-nac-main-con">
            <SideNavL/>
            <SuperheroNavigation superheroes={['Iron Man', 'Spider-Man', 'Black Widow', 'Hulk', 'Star Lord']} onSuperheroSelect={getQuizQuestions} />
          </div>
          <div className="quiz-box">
            {currentQuestion < quizQuestions.length ? (
              <Quiz
              superhero={selectedSuperhero} // Replace this with the selected superhero name
              questions={quizQuestions}
              currentQuestion={currentQuestion}
              handleAnswerClick={handleAnswerClick}
            />
            ) : (
              <Congratulations score={score} totalQuestions={quizQuestions.length} />
            )}
          </div>
          <div className="side-nac-main-con">
            <div className="Char-image">
              <div></div>
              <img src={heroImg} alt="" />
            </div>
            <SideNavR/>
          </div>
          
        </div>
    </div>
  )
}

export default App;
