/**
 * CATEGORY VIEW - STUDENTS IMPLEMENT
 * Group data by categories - good for understanding relationships and patterns
 */

function showCategories(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Group data by a meaningful category (cuisine, neighborhood, price, etc.)
  // - Show items within each group
  // - Make relationships between groups clear
  // - Consider showing group statistics

const filteredData = data.filter(
        establishment =>
                establishment.inspection_results !== "------");
  
const groupedByCity = filteredData.reduce((groups, establishment) => {
  const city = (establishment.city).toUpperCase();
  if (!groups[city]) {
    groups[city] = [];
  }
  groups[city].push(establishment);
  return groups;
}, {});

//Asked google's AI how to sort objects alphabetically by key
const sortedCities = Object.keys(groupedByCity).sort()

//sorts establishments in each city category alphabetically
const categories = sortedCities.map(establishment => {

  //Asked ChatGPT how to sort objects alphabetically by key
  const establishments = groupedByCity[establishment].slice().sort((a, b) =>
    (a.name).localeCompare(b.name)
  );

  const itemRows = establishments.map(est => {
    const researcher = est.owner;
    //const emoji = getInspectionEmoji(result);

    /*html*/

    return `
      <div class="category-item">
        <span>
          <strong>SCP-${est.establishment_id}</strong>: ${est.name}
        </span>
        <span>
        Documented on ${(est.inspection_date).split('T')[0]} by ${researcher}
        </span>
      </div>
    `;
  }).join("");

  
  return `
    <section class="category-section">
      <h3 class="category-header">${establishment} (${establishments.length})</h3>
      <div class="category-items">
        ${itemRows}
      </div>
    </section>
  `;
}).join("");
  /*html*/

  return `
                <h2 class="view-title">Category View</h2>
                <div>
                ${categories}
                </div>
            `;
}

export default showCategories;