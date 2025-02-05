// fetching api data from nasa
const API_KEY = "VJ0K79ylQMoXwcoEXbPkmYMSpQoISZDErvoqtt50";
const datePicker = document.getElementById("datePicker");
const fetchButton = document.getElementById("fetchButton");
const title = document.getElementById("title");
const date = document.getElementById("date");
const apodImage = document.getElementById("apodImage");
const apodVideo = document.getElementById("apodVideo");
const description = document.getElementById("description");

// function to fetch api data
async function fetchAPOD(selectedDate) {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // title & date update
        title.textContent = data.title;
        date.textContent = `Date: ${data.date}`;
        description.textContent = data.explanation;

        // image or video processing
        if (data.media_type === "image") {
            apodImage.src = data.url;
            apodImage.style.display = "block";
            apodVideo.style.display = "none";
        } else if (data.media_type === "video") {
            apodVideo.src = data.url;
            apodVideo.style.display = "block";
            apodImage.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching APOD data:", error);
        title.textContent = "Failed to load data";
    }
}

// api request when you click the button
fetchButton.addEventListener("click", () => {
    const selectedDate = datePicker.value;
    if (selectedDate) {
        fetchAPOD(selectedDate);
    } else {
        alert("Please select a date!");
    }
});

// today's image on page load
const today = new Date().toISOString().split("T")[0];
datePicker.value = today;
fetchAPOD(today);
