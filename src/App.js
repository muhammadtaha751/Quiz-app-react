import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";


// const questions = [
//   {
//     title: 'What is HTML ?',
//     options: ['Hypertext Text Markup Language', 'Hypertext textup Markup Language', 'Hypertext markup Markup Language', 'Hypertext markup  Language'],
//     correctAnswer: 'Hypertext Text Markup Language',
//   },
//   {
//     title: 'What is CSS ?',
//     options: ['Cast style sheet', 'card style sheet', 'cascading style sheet', 'cascading sheet style'],
//     correctAnswer: 'cascading style sheet',
//   },
//   {
//     title: 'what is js ?',
//     options: ['java science', 'java', 'javaworld', 'javascript'],
//     correctAnswer: 'javascript',
//   },
//   {
//     title: 'Capital city of pakistan ?',
//     options: ['Karachi', 'Lahore', 'Islamabad', 'Peshawar'],
//     correctAnswer: 'Islamabad',
//   },
//   {
//     title: 'Tallest building in the world ?',
//     options: ['Burj al khalifa', 'Burj al arab', 'clock tower', 'Hilton'],
//     correctAnswer: 'Burj al khalifa',
//   },
//   {
//     title: 'Paris is famous for ?',
//     options: ['Buildings', 'Arcitecture', 'Eiffel tower', 'Sceneries'],
//     correctAnswer: 'Eiffel tower',
//   },
//   {
//     title: 'In which year Pakistan won the odi worldcup ?',
//     options: ['1990', '1992', '2000', '2003'],
//     correctAnswer: '1992',
//   },
//   {
//     title: 'In which year Pakistan won the t20i world cup ?',
//     options: ['2001', '2007', '2009', '2011'],
//     correctAnswer: '2009',
//   },
//   {
//     title: 'In which year Pakistan won the champions trophy ?',
//     options: ['2010', '2017', '2019', '2020'],
//     correctAnswer: '2017',
//   },
//   {
//     title: 'Pakistan is located in ?',
//     options: ['Asia', 'Europe', 'Middle East', 'Africa'],
//     correctAnswer: 'Asia',
//   },
// ]



function App() {
  const [questions, setQuestions] = useState([])
  const [questionNum, setQuestionNum] = useState(0)
  const [selectedQuestion, setSelectedQuestion] = useState()
  const [marks, setMarks] = useState(0)
  const [finish, setFinish] = useState(false)


  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple')
      .then(res => res.json())
      .then(res => {
        const ques = res.results
        const newQuestions = ques.map(item => {
          item.incorrect_answers.push(item.correct_answer)
          item.incorrect_answers = shuffle(item.incorrect_answer)
          return item
        })
        setQuestions(newQuestions)
      })
  }, [])

  function shuffle(array){
    let currenrtIndex = array.length, randomIndex;

    while(currenrtIndex > 0){
      randomIndex = Math.floor(Math.random()*currenrtIndex);
      currenrtIndex--;
      [array[currenrtIndex], array[randomIndex]] =[
        array[randomIndex], array[currenrtIndex]
      ];
    }
    return array;
  }

  if (!questions.length) {
    return <div>...loading</div>
  }
  function nextQuestion() {

    // if (selectedQuestion === null) {
    //   alert('please choose an option')
    //   return;
    // }

    let tempQues = questionNum
    tempQues++
    setQuestionNum(tempQues)

    ans();
    setSelectedQuestion(null)
  }
  function ans() {
    if (selectedQuestion === questions[questionNum].correct_answer) {
      let temMark = marks
      temMark++
      setMarks(temMark)
    }
  }

  function submit() {
    if (selectedQuestion === null) {
      alert('please choose an option')
      return;
    }
    ans();
    setFinish(true)
  }

  function updateScore(e) {
    const answer = e.target.value
    setSelectedQuestion(answer)
  }

  function restart() {
    setFinish(false)
    setQuestionNum(0)
    setMarks(0)
  }

  const options = questions[questionNum].incorrect_answers
  return (
    <div className="App">
      <header className="App-header">
        {!finish
          ?
          <div>
            <h4>Q{questionNum + 1} {questions[questionNum].question} </h4>
            {options.map(function (item) {
              return <div>
                <input onChange={updateScore} type='radio' value={item} checked={selectedQuestion === item} />
                {item}
              </div>
            })}
            {
              questionNum < questions.length - 1 &&
              <button onClick={nextQuestion}>Next</button>
            }
            {
              questionNum === questions.length - 1 &&
              <button onClick={submit}>Submit</button>
            }
          </div>
          :
          <div>
            <p>
              you got the {marks} out of 10
            </p>
            <button onClick={restart}>restart</button>
          </div>
        }
      </header>
    </div>
  );
}

export default App;
