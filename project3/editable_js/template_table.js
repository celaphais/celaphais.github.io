
/**
 * TABLE VIEW - STUDENTS IMPLEMENT
 * Display data in sortable rows - good for scanning specific information
 */
function showTable(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Show data in a table format
  // - Include all important fields
  // - Make it easy to scan and compare
  // - Consider adding sorting functionality
  /*html*/ 
    const filteredData = data.filter(
        establishment =>
                establishment.inspection_results !== "------");

    let tableHTML = "";
    filteredData.forEach(function(establishment) {
        tableHTML += `
            <tr>
                <td><strong>SCP-${establishment.establishment_id}</strong></td>
                <td>${establishment.name}</td>
                <td>${establishment.inspection_results}</td>
                <td>${establishment.inspection_type}</td>
                <td>${establishment.inspection_date.split('T')[0]}</td>
           </tr>
        `;
    });
  /*html*/ 
  return `
                <h2 class="view-title">Table View</h2>
                <div>
                <table class ="restaurant-table">
                    <thead>
                        <tr>
                            <th>Identifier</th>
                            <th>Call Sign</th>
                            <th>Inspection Protocol</th>
                            <th>Inspection Type</th>
                            <th>Inspection Date</th>
                        </tr>
                    </thead>
                <tbody>
                     ${tableHTML}
                </tbody>
                </div>
            `;
}

export default showTable;