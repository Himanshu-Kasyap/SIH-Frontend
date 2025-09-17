/**
 * Weather Integration for Kisan Sahayak Dashboard
 * Integrates with OpenWeatherMap API via Python backend
 */

class WeatherManager {
    constructor() {
        // Determine API base URL based on environment
        this.apiBaseUrl = this.getApiBaseUrl();
        this.defaultLocation = { lat: 28.6139, lon: 77.2090 }; // Delhi as default
        this.weatherData = null;
        this.isLoading = false;
        
        // Initialize weather on page load
        this.init();
    }

    getApiBaseUrl() {
        // Check if we're in production (deployed on Render)
        if (window.location.hostname.includes('render.com') || 
            window.location.hostname.includes('onrender.com')) {
            // Use the production Python service URL
            return 'https://smart-india-hackathon-ml.onrender.com';
        }
        
        // Development URLs
        if (window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1') {
            return 'http://localhost:8000';
        }
        
        // Default fallback
        return 'http://localhost:8000';
    }

    async init() {
        try {
            // Try to get user's location first
            await this.getUserLocation();
            
            // Load weather data
            await this.loadWeatherData();
            
            // Update UI
            this.updateWeatherUI();
            
            // Set up periodic updates (every 10 minutes)
            setInterval(() => {
                this.loadWeatherData();
            }, 10 * 60 * 1000);
            
        } catch (error) {
            console.error('Weather initialization failed:', error);
            this.showWeatherError();
        }
    }

    async getUserLocation() {
        // Always use default location (Delhi) instead of requesting user location
        console.log('Using default location (Delhi):', this.defaultLocation);
        return Promise.resolve(this.defaultLocation);
    }

    async loadWeatherData() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showWeatherLoading();

        try {
            const { lat, lon } = this.defaultLocation;
            const response = await fetch(`${this.apiBaseUrl}/weather/${lat}/${lon}`);
            
            if (!response.ok) {
                throw new Error(`Weather API error: ${response.status}`);
            }
            
            this.weatherData = await response.json();
            console.log('Weather data loaded:', this.weatherData);
            
            // Update UI with new data
            this.updateWeatherUI();
            
        } catch (error) {
            console.error('Failed to load weather data:', error);
            this.showWeatherError();
        } finally {
            this.isLoading = false;
        }
    }

    updateWeatherUI() {
        if (!this.weatherData) return;

        try {
            // Update main weather display
            this.updateMainWeather();
            
            // Update weather details
            this.updateWeatherDetails();
            
            // Update weather alerts
            this.updateWeatherAlerts();
            
            // Update forecast (if available)
            this.updateForecast();
            
        } catch (error) {
            console.error('Error updating weather UI:', error);
        }
    }

    updateMainWeather() {
        const { main, weather } = this.weatherData;
        
        // Update temperature
        const tempElement = document.querySelector('.weather-main .temp');
        if (tempElement) {
            tempElement.textContent = `${Math.round(main.temp)}°C`;
        }
        
        // Update condition
        const conditionElement = document.querySelector('.weather-main .condition');
        if (conditionElement && weather && weather[0]) {
            conditionElement.textContent = this.capitalizeFirst(weather[0].description);
        }
        
        // Update weather icon
        const iconElement = document.querySelector('.weather-main-icon');
        if (iconElement && weather && weather[0]) {
            const iconClass = this.getWeatherIconClass(weather[0].main, weather[0].icon);
            iconElement.className = `fas ${iconClass} weather-main-icon`;
        }
    }

    updateWeatherDetails() {
        const { main, wind } = this.weatherData;
        
        // Update humidity
        const humidityElement = document.querySelector('.detail-item:first-child span');
        if (humidityElement) {
            humidityElement.textContent = `Humidity: ${main.humidity}%`;
        }
        
        // Update wind speed
        const windElement = document.querySelector('.detail-item:last-child span');
        if (windElement) {
            const windSpeed = Math.round(wind.speed * 3.6); // Convert m/s to km/h
            windElement.textContent = `Wind: ${windSpeed} km/h`;
        }
    }

    updateWeatherAlerts() {
        const { main, weather } = this.weatherData;
        const alertElement = document.querySelector('.weather-alert span');
        
        if (!alertElement) return;
        
        // Generate weather-based alerts
        let alertMessage = '';
        
        if (weather && weather[0]) {
            const condition = weather[0].main.toLowerCase();
            const temp = main.temp;
            
            if (condition.includes('rain')) {
                alertMessage = 'Rain expected - protect crops and plan indoor activities';
            } else if (condition.includes('storm') || condition.includes('thunder')) {
                alertMessage = 'Thunderstorm warning - secure equipment and livestock';
            } else if (temp > 35) {
                alertMessage = 'High temperature alert - ensure adequate irrigation';
            } else if (temp < 10) {
                alertMessage = 'Cold weather - protect sensitive crops from frost';
            } else if (main.humidity > 80) {
                alertMessage = 'High humidity - monitor for fungal diseases';
            } else {
                alertMessage = 'Weather conditions are favorable for farming activities';
            }
        }
        
        alertElement.textContent = alertMessage;
        
        // Update alert icon based on severity
        const alertIcon = document.querySelector('.weather-alert i');
        if (alertIcon) {
            if (alertMessage.includes('warning') || alertMessage.includes('alert')) {
                alertIcon.className = 'fas fa-exclamation-triangle';
                alertElement.parentElement.style.color = '#f59e0b';
            } else {
                alertIcon.className = 'fas fa-info-circle';
                alertElement.parentElement.style.color = '#10b981';
            }
        }
    }

    updateForecast() {
        // For now, we'll simulate forecast data since we only have current weather
        // In a real implementation, you'd call a separate forecast endpoint
        const { main } = this.weatherData;
        
        const forecastItems = document.querySelectorAll('.forecast-item');
        
        if (forecastItems.length >= 2) {
            // Tomorrow's forecast (simulated)
            const tomorrowTemp = Math.round(main.temp + (Math.random() - 0.5) * 6);
            forecastItems[0].querySelector('.temp').textContent = `${tomorrowTemp}°C`;
            
            // Day 3 forecast (simulated)
            const day3Temp = Math.round(main.temp + (Math.random() - 0.5) * 8);
            if (forecastItems[1]) {
                forecastItems[1].querySelector('.temp').textContent = `${day3Temp}°C`;
            }
        }
    }

    showWeatherLoading() {
        const tempElement = document.querySelector('.weather-main .temp');
        const conditionElement = document.querySelector('.weather-main .condition');
        
        if (tempElement) tempElement.textContent = 'Loading...';
        if (conditionElement) conditionElement.textContent = 'Fetching weather data';
    }

    showWeatherError() {
        const tempElement = document.querySelector('.weather-main .temp');
        const conditionElement = document.querySelector('.weather-main .condition');
        const alertElement = document.querySelector('.weather-alert span');
        
        if (tempElement) tempElement.textContent = '--°C';
        if (conditionElement) conditionElement.textContent = 'Weather unavailable';
        if (alertElement) alertElement.textContent = 'Unable to fetch weather data. Please check your connection.';
        
        // Show error styling
        const alertIcon = document.querySelector('.weather-alert i');
        if (alertIcon) {
            alertIcon.className = 'fas fa-exclamation-triangle';
            alertElement.parentElement.style.color = '#ef4444';
        }
    }

    getWeatherIconClass(condition, iconCode) {
        const conditionLower = condition.toLowerCase();
        
        // Map weather conditions to Font Awesome icons
        const iconMap = {
            'clear': 'fa-sun',
            'clouds': 'fa-cloud',
            'rain': 'fa-cloud-rain',
            'drizzle': 'fa-cloud-drizzle',
            'thunderstorm': 'fa-bolt',
            'snow': 'fa-snowflake',
            'mist': 'fa-smog',
            'fog': 'fa-smog',
            'haze': 'fa-smog'
        };
        
        // Check if it's night time (icon code ends with 'n')
        const isNight = iconCode && iconCode.endsWith('n');
        
        if (conditionLower.includes('clear')) {
            return isNight ? 'fa-moon' : 'fa-sun';
        }
        
        return iconMap[conditionLower] || 'fa-cloud-sun';
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Public method to refresh weather data
    async refresh() {
        await this.loadWeatherData();
    }

    // Public method to update location
    async updateLocation(lat, lon) {
        this.defaultLocation = { lat, lon };
        await this.loadWeatherData();
    }
}

// Initialize weather manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on a page with weather elements
    if (document.querySelector('.weather-card')) {
        window.weatherManager = new WeatherManager();
        
        // Add click handler for weather card to refresh data
        const weatherCard = document.querySelector('.weather-card');
        if (weatherCard) {
            weatherCard.addEventListener('click', () => {
                if (window.weatherManager) {
                    window.weatherManager.refresh();
                }
            });
            
            // Add visual feedback for clickable weather card
            weatherCard.style.cursor = 'pointer';
            weatherCard.title = 'Click to refresh weather data';
        }
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeatherManager;
}