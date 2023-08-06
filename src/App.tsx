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

import hulk from "./images/Spider-man.png"

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


  // //setting json questions to firebase questions
  // useEffect(() => {
  //   const saveQuizQuestions = async () => {
  //     const quizQuestionsCollectionRef = collection(db, 'quizQuestions')
    
  //     // Create a query to get all documents from the collection
  //     const quizQuestionsQuery = query(quizQuestionsCollectionRef)
    
  //     try {
  //       // Get the query snapshot
  //       const querySnapshot = await getDocs(quizQuestionsQuery);
  //       const questionsExist = !querySnapshot.empty;
    
  //       // If the collection is empty, save the quiz questions
  //       if (!questionsExist) {
  //         for (const question of quizData) {
  //           try {
  //             await addDoc(quizQuestionsCollectionRef, question)
  //             console.log('Question saved:', question)
  //           } catch (error) {
  //             console.error('Error saving question:', error)
  //           }
  //         }
  //       } else {
  //         console.log('Quiz questions already exist in the database.')
  //       }
  //     } catch (error) {
  //       console.error('Error getting squiz questions:', error)
  //     }
  //   }
    
  //   saveQuizQuestions()
  // }, [])

  const getQuizQuestions = async (superhero: string) => {
    const quizQuestionsCollectionRef = collection(db, 'quizQuestions');
    try {
      const querySnapshot = await getDocs(quizQuestionsCollectionRef);
      const questions = querySnapshot.docs
        .map((doc) => doc.data() as Question)
        .filter((question) => question.superhero === superhero);
      setQuizQuestions(questions);
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
            <SuperheroNavigation superheroes={['Iron Man', 'Spider-Man', 'Shuri']} onSuperheroSelect={getQuizQuestions} />
          </div>
          <div className="quiz-box">
            {currentQuestion < quizQuestions.length ? (
              <Quiz
              superhero="Iron Man" // Replace this with the selected superhero name
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
              <img src={hulk} alt="" />
            </div>
            <SideNavR/>
          </div>
          
        </div>
    </div>
  )
}

export default App;
