import React from 'react';

function CarCard({ car, onSelect, surveyCompleted }) {
    return (
        <div className="car-card" onClick={() => onSelect(car)}>
            <img
                src={car.image || '/default-car-image.jpg'}
                alt={`${car.brand} ${car.model} ${car.year}`}
                className="car-image"
            />
            <h3>{car.brand} {car.model} <i>{car.year}</i></h3>
            <div className="car-info">
                <div className="info-row">
                    <span className="info-label">Ціна:</span>
                    <span>${car.price}</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Тип:</span>
                    <span>{car.type}</span>
                </div>
                <div className="info-row">
                    <img src="/fuel.png" alt="Пальне" className="info-icon" />
                    <span>{car.fuel}</span>
                </div>
                <div className="info-row">
                    <img src="/gears.png" alt="Трансмісія" className="info-icon" />
                    <span>{car.transmission}</span>
                </div>
                <div className="info-row">
                    <img src="/seat.png" alt="Крісла" className="info-icon" />
                    <span>{car.seats}</span>
                </div>
                <div className="info-row">
                    <img src="/consumption.png" alt="Споживання" className="info-icon" />
                    <span>{car.consumption} л/100км</span>
                </div>
                {surveyCompleted && (
                    <div className="info-row">
                        <img src="/relevance.png" alt="Релевантність" className="info-icon" />
                        <span>{car.relevance}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CarCard;
