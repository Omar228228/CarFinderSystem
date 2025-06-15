import applyFilters from './applyFilters';
import { surveyQuestions } from './surveyQuestions';

export default function removeInteractiveFilter({
    filterKey,
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
}) {
    const updatedAnswers = { ...answers };
    delete updatedAnswers[filterKey];
    setAnswers(updatedAnswers);

    const questionIndex = surveyQuestions.findIndex(q => q.key === filterKey);
    if (questionIndex !== -1) {
        setSurveyStep(questionIndex);
        setShowSurvey(true);
    }

    const baseFilteredCars = applyFilters(cars, filters);
    setFilteredCars(baseFilteredCars);

    if (Object.keys(updatedAnswers).length === 0) {
        setSurveyCompleted(false);
        setFinalCars(baseFilteredCars.map(({ relevance, ...car }) => car));
        setInteractiveFilters([]);
        return;
    }

    const recalculatedCars = baseFilteredCars.map(car => {
        let relevanceScore = 0;

        surveyQuestions.forEach(question => {
            const answer = updatedAnswers[question.key];
            if (!answer) return;

            let isMatch = false;
            switch (question.key) {
                case 'purpose':
                    isMatch = car.purpose === answer;
                    break;
                case 'power':
                    if (answer === 'Слабкий') isMatch = car.power <= 100;
                    else if (answer === 'Нормальний') isMatch = car.power > 100 && car.power <= 200;
                    else if (answer === 'Сильний') isMatch = car.power > 200;
                    break;
                case 'consumption':
                    if (answer === 'Економний автомобіль') isMatch = car.consumption <= 5;
                    else if (answer === 'Середній автомобіль') isMatch = car.consumption > 5 && car.consumption <= 8;
                    else if (answer === 'Неекономний автомобіль') isMatch = car.consumption > 8;
                    break;
                case 'safety':
                    isMatch = car.crashTestRating >= parseInt(answer);
                    break;
                case 'size':
                    if (answer === 'Компактний') isMatch = car.dimensions === 'Компактний';
                    else if (answer === 'Звичайний') isMatch = ['Середній', 'Звичайний'].includes(car.dimensions);
                    else if (answer === 'Великий') isMatch = car.size === 'Великий';
                    break;
                case 'seats':
                    isMatch = parseInt(car.seats) === parseInt(answer);
                    break;
                case 'trunk':
                    isMatch = answer === 'Так' ? car.trunkVolume >= 450 : true;
                    break;
                case 'comfort':
                    isMatch = car.comfort === answer;
                    break;
                default:
                    break;
            }

            if (isMatch) relevanceScore += question.weight;
        });

        return { ...car, relevance: relevanceScore.toFixed(2) };
    });

    const sortedCars = [...recalculatedCars].sort(
        (a, b) => parseFloat(b.relevance) - parseFloat(a.relevance)
    );

    setFinalCars(sortedCars);
    setInteractiveFilters(
        Object.entries(updatedAnswers).map(([key, value]) => ({
            key,
            value,
            label: surveyQuestions.find(q => q.key === key)?.question
        }))
    );
}
