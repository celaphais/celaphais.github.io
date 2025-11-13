
/**
 * CARD VIEW - PROVIDED AS EXAMPLE
 * Display data as browsable cards - good for comparing individual items
 */

//Name
//Category
//Establishment
//

//Prompted chatGPT on how best to go about making a helper function that determines which corresponding emoji to use. I was given code similar to this although I have modified it for my chosen database
function getObjectClass(result) {
  if (!result) return "ARCHON"; 

  if (result.includes("Non-Compliant")) return "APOLLYON";
  if (result.includes("Compliant")) return "SAFE";
  if (result.includes("Critical Violation")) return "THAUMIEL";
  if (result.includes("Facility Closed")) return "DECOMMISSIONED";
  if (result.includes("Compliance Schedule - Outstanding")) return "KETER";
  if (result.includes("Compliance Schedule - Completed")) return "EUCLID";

  return " ███████"; 
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
                    <h3>SCP-${establishment.establishment_id}</h3>
                    <p><strong>Identification:</strong> ${establishment.name}</p>
                    <p><strong>Object Class:</strong> ${getObjectClass(establishment.inspection_results)}</p>
                    <p><strong>Inspection Protocol:</strong> ${establishment.inspection_results}</p>
                    </div>
            `
    )
    .join("");
     /*html*/ 
  return `
                <h2 class="view-title">Card View</h2>
                <p>> Prince George County Dossier</p>
                <div class="card-grid">
                    ${cardHTML}
                </div>
            `;
}



export default showCards;