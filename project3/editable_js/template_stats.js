/**
 * STATS VIEW - STUDENTS IMPLEMENT
 * Show aggregate statistics and insights - good for understanding the big picture
 */

let myMap = null;

function showStats(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Calculate meaningful statistics from the dataset
  // - Present insights visually
  // - Show distributions, averages, counts, etc.
  // - Help users understand patterns in the data
  /*html*/

    const filteredData = data.filter(
        establishment =>
                establishment.inspection_results !== "------");

    const totalEstablishments = filteredData.length;    
    
    const cities = {};
    filteredData.forEach(function(establishment) {
        const city = establishment.city.toUpperCase();
        cities[city] = (cities[city] || 0) + 1;
    });

    const uniqueCities = Object.keys(cities).length;

    //filters for establishments that are complaint
    const compliant = filteredData.filter(establishment => {
        return (establishment.inspection_results).includes("Compliant") && !(establishment.inspection_results).includes("Non-Compliant");});
    
    const complianceRate = Math.round(((compliant.length / totalEstablishments) * 100))

    const compliantCities = {};
        compliant.forEach(function(establishment) {
        const city = establishment.city.toUpperCase();
        compliantCities[city] = (compliantCities[city] || 0) + 1;
    });

    const mostCompliantCity = Object.entries(compliantCities).sort((a, b) => b[1] - a[1])[0][0];
    
    //filters for non-compliant establishments
    const nonCompliant = filteredData.filter(establishment => {
        return !(establishment.inspection_results).includes("Compliant") || (establishment.inspection_results).includes("Non-Compliant");});
    console.log('nonCompliant', nonCompliant.length)
    const nonCompliantCities = {};
    nonCompliant.forEach(establishment => {
        const city = (establishment.city || "Unknown").toUpperCase();
        nonCompliantCities[city] = (nonCompliantCities[city] || 0) + 1;
    });

     const leastCompliantCity = Object.entries(nonCompliantCities).sort((a, b) => b[1] - a[1])[0][0];

  
    return `
                <h2 class="view-title">Statistics View</h2>
                <p>> ACCESSING CONTAINMENT BREACH MONITORING SYSTEM...</p>
                <p>> WARNING: MULTIPLE ANOMALIES DETECTED</p>
                <div id="restaurant-map" class="map-container">
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">${totalEstablishments}</div>
                        <div class="stat-label">Documented Anomalies</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-number">${uniqueCities}</div>
                        <div class="stat-label">Cities Under Observation</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-number">${complianceRate}%</div>
                        <div class="stat-label">Containment Success Rate</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-number">${mostCompliantCity}</div>
                        <div class="stat-label">Highest Secured SCP Concentration</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-number">${leastCompliantCity}</div>
                        <div class="stat-label">Highest Risk Index</div>
                    </div>
                </div>

            </div>
            `;
}

//Asked ChatGPT to help me with making an export function to use in script.js file
export function createMyMap(data) {
    // Step 1: Check if Leaflet is available
    if (typeof L === 'undefined') {
        alert('Leaflet.js not available. Check console.');
        return;
    }
    
    try {
        const el = document.getElementById('restaurant-map');
        if (!el) return;

        //Clear existing map
        if (myMap) {
            myMap.remove();
            myMap = null;
        }

        const filteredData = data.filter(
        establishment =>
                establishment.inspection_results !== "------");

        const nonCompliant = filteredData.filter(establishment => {
        return !(establishment.inspection_results).includes("Compliant") || (establishment.inspection_results).includes("Non-Compliant");});
        console.log('nonCompliant', nonCompliant.length)

        // Create the map
        myMap = L.map(el).setView([38.9897, -76.9378], 12);

        // Step 4: Add map tiles (provided)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(myMap);
        
        // Step 5: Adds marker for non compliant establishments

         nonCompliant.forEach(establishment => {
            const result = establishment.geocoded_column_1;
            if (result) {
                console.log(establishment.establishment_id)
                const [lng, lat] = establishment.geocoded_column_1.coordinates;
                const marker = L.circle([lat, lng], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 150})
                const popupContent = `SCP-${establishment.establishment_id}: ${establishment.name}`;
                marker.bindPopup(popupContent).addTo(myMap);

                //implement helper function that determines status and pin color.
            }
        });

        
        console.log('Map created successfully!');
        
    } catch (error) {
        console.error('Map creation failed:', error);
    }
}

export default showStats