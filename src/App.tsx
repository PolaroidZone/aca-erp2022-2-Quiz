import React, {useEffect, useState} from 'react'
import quizData from './quizData.json'
import Congratulations from './components/Congratulations'
import { query ,getDocs, collection, addDoc } from 'firebase/firestore'
import { DocumentData } from 'firebase/firestore/lite';
import {db} from './firebase/config'
import NavBar from "./components/NavBar"
import SideNavL from "./components/SideNavL"
import SideNavR from "./components/SideNavR"

import './App.css'
import './styles/Container.css'


//settingd the question type 
type Question = {
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
  const [quizQuestions, setQuizQuestions] = useState<DocumentData[]>([])


  //setting json questions to firebase questions
  useEffect(() => {
    const saveQuizQuestions = async () => {
      const quizQuestionsCollectionRef = collection(db, 'quizQuestions')
    
      // Create a query to get all documents from the collection
      const quizQuestionsQuery = query(quizQuestionsCollectionRef)
    
      try {
        // Get the query snapshot
        const querySnapshot = await getDocs(quizQuestionsQuery);
        const questionsExist = !querySnapshot.empty;
    
        // If the collection is empty, save the quiz questions
        if (!questionsExist) {
          for (const question of quizData) {
            try {
              await addDoc(quizQuestionsCollectionRef, question)
              console.log('Question saved:', question)
            } catch (error) {
              console.error('Error saving question:', error)
            }
          }
        } else {
          console.log('Quiz questions already exist in the database.')
        }
      } catch (error) {
        console.error('Error getting squiz questions:', error)
      }
    }
    
    saveQuizQuestions()
  }, [])

  //getting questions form firebase
  useEffect(() => {
    const getQuizQuestions = async () => {
      const quizQuestionsCollectionRef = collection(db, 'quizQuestions')
      try {
        const querySnapshot = await getDocs(quizQuestionsCollectionRef)
        const questions = querySnapshot.docs.map((doc) => doc.data() as Question)
        setQuizQuestions(questions)
      } catch (error) {
        console.error('Error getting quiz questions:', error)
      }
    }
    getQuizQuestions()
  }, [])

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
            <div className="character-con">
              <div className="charecter">
                  <div className="char-indicator"></div>
                  <div className="char-main">
                      <img src="" alt="" />
                      <h1>Shuri</h1>
                  </div>
                </div>
            </div>
          </div>
          <div className="quiz-box">
            <div className="hero-name">
              <div className="heroname-container">
                <h1 className="hero-name-main">Iron</h1>  
                <h1 className="hero-name-last">Man</h1>
              </div>
              <div className="hero-name-botton">
                <div className="line-1"></div>
                <div className="line-2"></div>
              </div>
            </div>
            {currentQuestion < quizQuestions.length ? (
              <div className="quiz-question">
                
                <h2>{quizQuestions[currentQuestion].question}</h2>
                <div className="quiz-options">
                  <ul>
                    {quizQuestions[currentQuestion].answers.map((answer: Answer, index: number) => (
                      <li key={index} onClick={() => handleAnswerClick(answer.correct)}>
                        <div className="option">
                          <p>{answer.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Congratulations score={score} totalQuestions={quizQuestions.length} />
            )}
          </div>
          <div className="side-nac-main-con">
            <div className="Char-image">
              <img src="" alt="" />
            </div>
            <SideNavR/>
          </div>
          
        </div>
    </div>
  )
}

export default App;
