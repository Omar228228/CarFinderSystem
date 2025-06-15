import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import Header from './components/Header';
import Filters from './components/Filters';
import { surveyQuestions } from './components/surveyQuestions';
import CarDetails from './components/CarDetails';
import CarCard from './components/CarCard';
import applyFilters from './components/applyFilters';
import applySurveyFilters from './components/applySurveyFilters';
import removeInteractiveFilter from './components/removeInteractiveFilter';

function CarList() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [finalCars, setFinalCars] = useState([]);
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 80000,
        fuel: [],
        transmission: [],
        type: [],
    });

    const [showSurvey, setShowSurvey] = useState(false);
    const [surveyStep, setSurveyStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [surveyCompleted, setSurveyCompleted] = useState(false);
    const [interactiveFilters, setInteractiveFilters] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        axios.get('/api/cars')
            .then(res => {
                setCars(res.data);
                const initial = applyFilters(res.data, filters);
                setFilteredCars(initial);
                setFinalCars(initial);
            })
            .catch(err => console.error('Помилка при завантаженні автомобілів:', err));
    }, []);

    useEffect(() => {
        const updated = applyFilters(cars, filters);
        setFilteredCars(updated);

        if (surveyCompleted) {
            applySurveyFilters(answers, updated, setFinalCars, setInteractiveFilters);

        } else {
            setFinalCars(updated);
        }
    }, [filters, cars, surveyCompleted, answers]);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFilters(prev => {
            const updated = { ...prev };
            if (type === 'checkbox') {
                if (checked) {
                    updated[name].push(value);
                } else {
                    updated[name] = updated[name].filter(item => item !== value);
                }
            } else {
                updated[name] = Number(value);
            }
            return updated;
        });
    };

    const handleAnswerSelect = (key, value) => {
        const newAnswers = { ...answers, [key]: value };
        setAnswers(newAnswers);

        const remaining = surveyQuestions.filter(q => !newAnswers[q.key]);
        if (remaining.length > 0) {
            setSurveyStep(surveyQuestions.findIndex(q => q.key === remaining[0].key));
        } else {
            setSurveyCompleted(true);
            const base = applyFilters(cars, filters);
            setFilteredCars(base);
            applySurveyFilters(newAnswers, base, setFinalCars, setInteractiveFilters);

            setShowSurvey(false);
        }
    };

    const startSurvey = () => {
        if (Object.keys(answers).length === 0) {
            setSurveyStep(0);
            setShowSurvey(true);
            return;
        }

        const firstUnanswered = surveyQuestions.find(q => !answers[q.key]);

        if (firstUnanswered) {
            setSurveyStep(surveyQuestions.findIndex(q => q.key === firstUnanswered.key));
            setShowSurvey(true);
        } else {
            setSurveyCompleted(true);
            applySurveyFilters(answers, filteredCars, setFinalCars, setInteractiveFilters);

        }
    };

    const handleCarSelect = (car) => {
        setSelectedCar(car);
    };

    const closeCarDetails = () => {
        setSelectedCar(null);
    };

    return (
        <div className="app-container">
            <Header/>

            <div className="main-content-container">
                <div className="car-list-container">

                    <Filters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onStartSurvey={startSurvey}
                    />

                    <div className="main-content">
                        <div className="interactive-filters">
                            {interactiveFilters.map(filter => (
                                <div key={filter.key} className="interactive-filter">
                                    <span>{filter.value}</span>
                                    <button onClick={() =>
                                        removeInteractiveFilter({
                                            filterKey: filter.key,
                                            answers,
                                            setAnswers,
                                            setSurveyStep,
                                            setShowSurvey,
                                            cars,
                                            filters,
                                            setFilteredCars,
                                            setSurveyCompleted,
                                            setFinalCars,
                                            setInteractiveFilters
                                        })
                                    }>×</button>

                                </div>
                            ))}
                        </div>

                        {showSurvey && (
                            <div className="survey-questions-container">
                                <div className="survey-question">
                                    <h3>{surveyQuestions[surveyStep].question}</h3>
                                    <div className="survey-options">
                                        {surveyQuestions[surveyStep].options.map(option => (
                                            <button
                                                key={option}
                                                onClick={() => handleAnswerSelect(surveyQuestions[surveyStep].key, option)}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="cars-container">
                            {finalCars.length === 0 ? (
                                <p>Немає автомобілів для відображення.</p>
                            ) : (
                                finalCars.map(car => (
                                        <CarCard
                                            key={car._id}
                                            car={car}
                                            onSelect={handleCarSelect}
                                            surveyCompleted={surveyCompleted}
                                        />
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {selectedCar && (
                    <CarDetails
                        car={selectedCar}
                        onClose={closeCarDetails}
                    />
                )}
            </div>
        </div>
    );
}

export default CarList;