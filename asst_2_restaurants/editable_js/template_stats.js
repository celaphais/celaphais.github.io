/**
 * STATS VIEW - STUDENTS IMPLEMENT
 * Show aggregate statistics and insights - good for understanding the big picture
 */
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

    const nonCompliantCities = {};
    nonCompliant.forEach(establishment => {
        const city = (establishment.city || "Unknown").toUpperCase();
        nonCompliantCities[city] = (nonCompliantCities[city] || 0) + 1;
    });

     const leastCompliantCity = Object.entries(nonCompliantCities).sort((a, b) => b[1] - a[1])[0][0];

  
    return `
                <h2 class="view-title">📈 Statistics View</h2>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">${totalEstablishments}</div>
                        <div class="stat-label">Total Establishments</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-number">${uniqueCities}</div>
                        <div class="stat-label">Cities Inspected</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-number">${complianceRate}%</div>
                        <div class="stat-label">Total County Compliance Rate</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-number">${mostCompliantCity}</div>
                        <div class="stat-label">Most Compliant City</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-number">${leastCompliantCity}</div>
                        <div class="stat-label">Least Compliant City</div>
                    </div>
                </div>
            `;
}

export default showStats