import React from 'react';
import './CarDetails.css'; // CSS файл для стилізації

const CarDetails = ({ car, onClose }) => {
    if (!car) return null;

    return (
        <div className="car-details-container">
            <div className="car-details-header">
                <h2>{car.brand} {car.model} ({car.year})</h2>
                <button onClick={onClose} className="close-button">×</button>
            </div>
            <div className="car-details-content">
                <div className="car-details-image">
                    <img
                        src={car.image || '/default-car-image.jpg'}
                        alt={`${car.brand} ${car.model}`}
                    />
                </div>
                <div className="car-details-info">
                    <div className="info-section">
                        <h3>Основні характеристики</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Ціна:</span>
                                <span>${car.price}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Тип:</span>
                                <span>{car.type}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Пальне:</span>
                                <span>{car.fuel}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Трансмісія:</span>
                                <span>{car.transmission}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Кількість місць:</span>
                                <span>{car.seats}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Витрата палива:</span>
                                <span>{car.consumption} л/100км</span>
                            </div>
                        </div>
                    </div>

                    <div className="info-section">
                        <h3>Додаткові характеристики</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Призначення:</span>
                                <span>{car.purpose}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Потужність:</span>
                                <span>{car.enginePower} к.с.</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Рейтинг безпеки:</span>
                                <span>{car.crashTestRating}/5</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Розмір:</span>
                                <span>{car.dimensions}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Об'єм багажника:</span>
                                <span>{car.trunkVolume} л</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Рівень комфорту:</span>
                                <span>{car.comfort}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;