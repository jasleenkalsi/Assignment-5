async function fetchMarsPhotos() {
    const photosContainer = document.getElementById('photos');
    photosContainer.innerHTML = "<p>Loading photos...</p>";

    const apiKey = 'DEMO_KEY'; // Replace 'DEMO_KEY' with your NASA API key
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        displayPhotos(data.photos.slice(0, 6)); // Show only 6 photos
    } catch (error) {
        photosContainer.innerHTML = `<p>Error fetching photos: ${error.message}</p>`;
    }
}

function displayPhotos(photos) {
    const photosContainer = document.getElementById('photos');
    photosContainer.innerHTML = ''; // Clear loading text

    photos.forEach(photo => {
        const photoElement = document.createElement('div');
        photoElement.className = 'photo';
        photoElement.innerHTML = `
            <img src="${photo.img_src}" alt="Mars Rover Photo">
            <p>Rover: ${photo.rover.name}</p>
            <p>Date: ${photo.earth_date}</p>
        `;
        photosContainer.appendChild(photoElement);
    });
}

// Add event listener to button
document.getElementById('fetchPhotosButton').addEventListener('click', fetchMarsPhotos);
