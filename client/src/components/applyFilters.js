const applyFilters = (carList, currentFilters) => {
    return carList.filter(car => {
        return (
            car.price >= currentFilters.minPrice &&
            car.price <= currentFilters.maxPrice &&
            (currentFilters.fuel.length === 0 || currentFilters.fuel.includes(car.fuel)) &&
            (currentFilters.transmission.length === 0 || currentFilters.transmission.includes(car.transmission)) &&
            (currentFilters.type.length === 0 || currentFilters.type.includes(car.type))
        );
    });
};

export default applyFilters;
