
/**
 * CARD VIEW - PROVIDED AS EXAMPLE
 * Display data as browsable cards - good for comparing individual items
 */

//Name
//Category
//Establishment
//

//Prompted chatGPT on how best to go about making a helper function that determines which corresponding emoji to use. I was given code similar to this although I have modified it for my chosen database
function getInspectionEmoji(result) {
  if (!result) return "📋"; 

  if (result.includes("Non-Compliant")) return "❌";
  if (result.includes("Compliant")) return "✅";
  if (result.includes("Critical Violation")) return "☣️";
  if (result.includes("Facility Closed")) return "❌";
  if (result.includes("Compliance Schedule - Outstanding")) return "⚠️";
  if (result.includes("Compliance Schedule - Completed")) return "📋";

  return "📋"; 
}

function showCards(data) {

  const filteredData = data.filter(
        establishment =>
                establishment.inspection_results !== "------");
  
  const cardHTML = filteredData
    .map(
       /*html*/ 
      (establishment) => `
                <div class="restaurant-card">
                    <h3>${establishment.name}</h3>
                    <p><strong>Category:</strong> ${establishment.category}</p>
                    <p><strong>Inspection Results:</strong> ${establishment.inspection_results} ${getInspectionEmoji(establishment.inspection_results)}</p>
                    <p><strong>Cooking Practices:</strong> ${establishment.cooking_time_and_temperature}</p>
                    <p><strong>Food Cooling Practices:</strong> ${establishment.cooling_time_and_temperature}</p>
                    <p><strong>Food Sourcing:</strong> ${establishment.food_from_approved_source}</p>
                    <p><strong>Food Reheating Protocols:</strong> ${establishment.reheating_time_and_temperature}</p>
                </div>
            `
    )
    .join("");
     /*html*/ 
  return `
                <h2 class="view-title">🃏 Card View</h2>
                <p class="view-description">Browse Establishments as individual cards - perfect for comparing options</p>
                <div class="card-grid">
                    ${cardHTML}
                </div>
            `;
}



export default showCards;