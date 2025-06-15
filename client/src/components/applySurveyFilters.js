import { surveyQuestions } from './surveyQuestions';

export default function applySurveyFilters(allAnswers, baseList, setFinalCars, setInteractiveFilters) {
    const scores = baseList.map(car => {
        let relevance = 0;

        surveyQuestions.forEach(q => {
            const userAnswer = allAnswers[q.key];
            if (!userAnswer) return;

            let matchScore = 0;

            switch (q.key) {
                case 'purpose':
                    matchScore = car.purpose === userAnswer ? 1 : 0;
                    break;

                case 'power':
                    const carPower = typeof car.enginePower === 'number' ? car.enginePower : 0;
                    if (userAnswer === 'Слабкий') {
                        matchScore = carPower <= 100 ? 1 : (carPower <= 150 ? 0.5 : 0);
                    } else if (userAnswer === 'Нормальний') {
                        matchScore = carPower > 100 && carPower <= 200 ? 1 : (carPower <= 250 ? 0.5 : 0);
                    } else if (userAnswer === 'Сильний') {
                        matchScore = carPower > 200 ? 1 : (carPower > 150 ? 0.5 : 0);
                    }
                    break;

                case 'consumption':
                    if (userAnswer === 'Економний автомобіль') {
                        matchScore = car.consumption <= 5 ? 1 : (car.consumption <= 6.5 ? 0.5 : 0);
                    } else if (userAnswer === 'Середній автомобіль') {
                        matchScore = car.consumption > 5 && car.consumption <= 8 ? 1 : (car.consumption <= 9.5 ? 0.5 : 0);
                    } else if (userAnswer === 'Неекономний автомобіль') {
                        matchScore = car.consumption > 8 ? 1 : (car.consumption > 6.5 ? 0.5 : 0);
                    }
                    break;

                case 'safety':
                    const desiredSafety = parseInt(userAnswer);
                    matchScore = car.crashTestRating >= desiredSafety ? 1 : (car.crashTestRating >= desiredSafety - 1 ? 0.5 : 0);
                    break;

                case 'size':
                    if (userAnswer === 'Компактний') {
                        matchScore = car.dimensions === 'Компактний' ? 1 : (['Середній', 'Звичайний'].includes(car.dimensions) ? 0.5 : 0);
                    } else if (userAnswer === 'Звичайний') {
                        matchScore = ['Середній', 'Звичайний'].includes(car.dimensions) ? 1 : (['Компактний', 'Великий'].includes(car.dimensions) ? 0.5 : 0);
                    } else if (userAnswer === 'Великий') {
                        matchScore = car.dimensions === 'Великий' ? 1 : (['Середній', 'Звичайний'].includes(car.dimensions) ? 0.5 : 0);
                    }
                    break;

                case 'seats':
                    matchScore = parseInt(car.seats) === parseInt(userAnswer) ? 1 : (Math.abs(parseInt(car.seats) - parseInt(userAnswer)) <= 1 ? 0.5 : 0);
                    break;

                case 'trunk':
                    matchScore = userAnswer === 'Так' ? (car.trunkVolume >= 450 ? 1 : (car.trunkVolume >= 300 ? 0.5 : 0)) : 1;
                    break;

                case 'comfort':
                    matchScore = car.comfort === userAnswer ? 1 : 0;
                    break;

                default:
                    break;
            }

            relevance += q.weight * matchScore;
        });

        return { ...car, relevance: relevance.toFixed(2) };
    });

    const sorted = scores.sort((a, b) => b.relevance - a.relevance);
    setFinalCars(sorted);

    setInteractiveFilters(
        Object.entries(allAnswers).map(([key, value]) => ({ key, value }))
    );
}
