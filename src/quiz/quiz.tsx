import React, { useEffect, useState } from 'react';
import * as questions from '../questions.json';

const Quiz = () => {
	const [currentQues, setCurrentQues] = useState(0);
	const [nextQues, setNextQues] = useState<string>('');
	const [selectedValue, setSelectedValue] = useState<boolean>();
	const [score, setScore] = useState<any>(0);
	const [maxScore, setMaxScore] = useState<any>(0);
	const [quesDiff, setQuesDiff] = useState(0);

	const options = (a: any, b: any) => {
		// merge the possible outcome options
		if (!a.includes(b)) {
			a.push(b);

			// shuffle the options arrary
			let currentIndex = a.length, randomIndex;
			while (currentIndex != 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;
				[a[currentIndex], a[randomIndex]] = [
					a[randomIndex], a[currentIndex]];
			}

		}
		return a;
	}

	const selectedOption = (e: any) => {
		// set the option selected by user
		if (questions[currentQues].correct_answer == e) {
			setNextQues(questions[currentQues].correct_answer);
			setScore(score + 1);
		}
		else {
			setNextQues(e);
		}
		setSelectedValue(true);
	}

	const nextQuestion = () => {
		// if it's the last question
		if (currentQues < 18) {
			setCurrentQues(currentQues + 1);
		}
		else {
			setCurrentQues(0);
			setScore(0);
		}
		setNextQues('');
		setSelectedValue(false);
	}

	useEffect(() => {
		// set maximum score the user gained the maxium score
		if (score > maxScore) {
			setMaxScore(score);
		}
		// set question difficulty
		if(questions[currentQues]?.difficulty === 'easy') {
			setQuesDiff(1);
		}
		if(questions[currentQues]?.difficulty === 'medium') {
			setQuesDiff(2);
		}
		if(questions[currentQues]?.difficulty === 'hard') {
			setQuesDiff(3);
		}
	}, [score, currentQues]);

	const renderLessThanCondition = () => {
		let stars = [];
		for(let i=0; i<quesDiff; i++) {
			stars.push(<div style={{ display: 'inline-block', marginRight: '10px' }} key={i}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg></div>);
		}
		return stars;
	};

	return (
		<>
			{/* Header */}
			<header>
				{/* Progress Bar */}
				<div style={{ height: '10px', marginBottom: '10px' }}>
					<div style={{ background: 'grey', height: '10px', width: `${(currentQues / 19) * 100}%`, display: 'inline-block', float: 'left' }}></div>
				</div>
				Question No. {currentQues + 1}
			</header>
			<div>
				{/* Questions Count */}
				<h3>Question {questions[currentQues]?.category}</h3>
				{/* Question Difficulty */}
				<div>
					{/* function to render the stars according to the question difficulty */}
					{renderLessThanCondition().map(currStar => currStar)}
				</div>
				{/* Question Title */}
				<h1>{questions[currentQues]?.question}</h1>
				{/* Question Answer */}
				{currentQues >= 0 && <>{options(questions[currentQues]?.incorrect_answers, questions[currentQues]?.correct_answer).map((x: any, index: number) => {
					return <button key={index} className={`${x == nextQues ? 'active' : ''}`} onClick={() => selectedOption(x)}>{x}</button>
				})}</>}
				{selectedValue && <>{(nextQues == questions[currentQues]?.correct_answer) ? <p>Correct!</p> : <p>Sorry, Please try again!</p>}</>}
				{nextQues && <button onClick={nextQuestion}>Next Question</button>}
				{/* Score */}
				<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
					<span>
						Score: {Math.round((score / 20) * 100)}%
					</span>
					<span>
						MaxScore: {Math.round((maxScore / 20) * 100)}%
					</span>
				</div>
			</div>
		</>
	)
}

export default Quiz;