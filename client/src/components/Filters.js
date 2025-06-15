import React from 'react';

const Filters = ({
    filters,
    onFilterChange,
    onStartSurvey,
    fuelTypes = ['Дизель', 'Бензин', 'Електро', 'Гібрид'],
    transmissionTypes = ['Механічна', 'Автоматична'],
    carTypes = ['Седан', 'Кросовер', 'Купе', 'Хетчбек', 'Мінівен']
}) => {
    return (
        <div className="filters">
            <h3>Фільтрація</h3>
            <div>
                <label>Ціна (від)</label>
                <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={onFilterChange}
                />
            </div>
            <div>
                <label>Ціна (до)</label>
                <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={onFilterChange}
                />
            </div>
            <div>
                <h4>Тип пального</h4>
                {fuelTypes.map(f => (
                    <label key={f}>
                        <input
                            type="checkbox"
                            name="fuel"
                            value={f}
                            checked={filters.fuel.includes(f)}
                            onChange={onFilterChange}
                        /> {f}
                    </label>
                ))}
            </div>
            <div>
                <h4>Трансмісія</h4>
                {transmissionTypes.map(t => (
                    <label key={t}>
                        <input
                            type="checkbox"
                            name="transmission"
                            value={t}
                            checked={filters.transmission.includes(t)}
                            onChange={onFilterChange}
                        /> {t}
                    </label>
                ))}
            </div>
            <div>
                <h4>Тип автомобіля</h4>
                {carTypes.map(t => (
                    <label key={t}>
                        <input
                            type="checkbox"
                            name="type"
                            value={t}
                            checked={filters.type.includes(t)}
                            onChange={onFilterChange}
                        /> {t}
                    </label>
                ))}
            </div>

            <button onClick={onStartSurvey}>
                Фільтрування
            </button>
        </div>
    );
};

export default Filters;