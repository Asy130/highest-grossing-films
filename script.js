const dataUrl = 'https://raw.githubusercontent.com/Asy130/highest-grossing-films/main/data.json';

let movies = [];

fetch(dataUrl)
    .then(response => response.json())
    .then(data => {
        movies = data;
        populateTable(movies);
    })
    .catch(error => console.error('Error:', error));

function populateTable(data) {
    const tableBody = document.getElementById('movieTableBody');

    tableBody.innerHTML = '';
    data.forEach(movie => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.release_year}</td>
            <td>${movie.director}</td>
            <td>${movie.box_office}</td>
            <td>${movie.country}</td>
        `;
        tableBody.appendChild(row);
    });
}

function sortTable(columnIndex) {
    let sortedMovies = [...movies];

    switch (columnIndex) {
        case 0: // Title
            sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 1: // Year
            sortedMovies.sort((a, b) => a.release_year - b.release_year);
            break;
        case 3: // Box Office
            sortedMovies.sort((a, b) => parseInt(a.box_office.replace(/,/g, '')) - parseInt(b.box_office.replace(/,/g, '')));
            break;
        default:
            console.error('Invalid column index');
            return;
    }

    populateTable(sortedMovies);
}

// Function to filter data based on search input
function filterData(searchTerm) {
    const filteredMovies = movies.filter(movie => {
        const movieInfo = `${movie.title} ${movie.director} ${movie.country}`.toLowerCase();
        return movieInfo.includes(searchTerm.toLowerCase());
    });

    populateTable(filteredMovies);
}

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    if (searchTerm) {
        filterData(searchTerm);
    } else {
        populateTable(movies); // Show all data if search input is empty
    }
});