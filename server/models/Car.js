const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    price: Number,
    type: String,            // Наприклад, "Седан"
    fuel: String,            // Наприклад, "Бензин"
    transmission: String,    // Наприклад, "Автоматична"
    image: String,
    purpose: String,         // Наприклад, "Для подорожей"
    seats: Number,           // Кількість місць
    consumption: Number,     // Витрата пального (л/100 км)
    drive: String,           // Тип приводу (наприклад, "Передній")
    comfort: String,         // Рівень комфорту (наприклад, "Високий")
    enginePower: Number,     // Потужність двигуна (к.с.)
    crashTestRating: Number, // Рейтинг безпеки (наприклад, 5)
    dimensions: String,      // Розміри (наприклад, "Звичайний")
    trunkVolume: Number      // Обʼєм багажника (літри)
});

module.exports = mongoose.model('Car', carSchema);
