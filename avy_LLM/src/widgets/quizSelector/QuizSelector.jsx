import React, { useState } from 'react';
import s from './QuizSelector.module.css';
import temporaryImage from '../../assets/images/AVY-transparent-PNG.png';
import ModalWindow from '../modalWindow/ModalWindow';
import AddChallengeForm from '../addChallengeForm/AddChallengeForm';

const quizzes = [
    { id: 'quiz1', label: 'Quiz' },
    { id: 'quiz2', label: 'OrderQuest' },
    { id: 'quiz3', label: 'ConstructaWord Quest' },
    // { id: 'quiz4', label: 'FillMaster Puzzles' },
];

export default function QuizSelector({ moduleId }) {
    const [selectedQuiz, setSelectedQuiz] = useState();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleQuizClick = (quizId) => () => {
        setSelectedQuiz(quizId);
        setIsModalOpen(true)
    };

    return (
        <div>
            <div className={s.quizSelectorWrapper}>
                {quizzes.map((quiz) => (
                    <div
                        key={quiz.id}
                        className={s.quizSelectorCard}
                        onClick={handleQuizClick(quiz.id)}
                    >
                        <p>{quiz.label}</p>
                        <img src={temporaryImage} alt="" />
                    </div>
                ))}
            </div>
            <ModalWindow
                title={"Create Quiz"}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <AddChallengeForm moduleId={moduleId} challengeType={selectedQuiz} setIsModalOpen={setIsModalOpen}/>
            </ModalWindow>
        </div>
    );
}
