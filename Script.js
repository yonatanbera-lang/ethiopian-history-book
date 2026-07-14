// የተቀመጡ ታሪኮችን አሳይ
displayStories();

function saveStory() {

    const title = document.getElementById("title").value.trim();
    const story = document.getElementById("story").value.trim();
    const imageInput = document.getElementById("image");

    if (title === "" || story === "") {
        alert("እባክዎ ርዕሱን እና ታሪኩን ያስገቡ።");
        return;
    }

    const reader = new FileReader();

    if (imageInput.files.length > 0) {

        reader.onload = function(e) {

            saveData(title, story, e.target.result);

        };

        reader.readAsDataURL(imageInput.files[0]);

    } else {

        saveData(title, story, "");

    }

}

function saveData(title, story, image) {

    let stories = JSON.parse(localStorage.getItem("stories")) || [];

    stories.unshift({
        title: title,
        story: story,
        image: image
    });

    localStorage.setItem("stories", JSON.stringify(stories));

    document.getElementById("title").value = "";
    document.getElementById("story").value = "";
    document.getElementById("image").value = "";

    displayStories();

}

function displayStories() {

    const stories = JSON.parse(localStorage.getItem("stories")) || [];

    const container = document.getElementById("stories");

    container.innerHTML = "";

    stories.forEach(item => {

        const card = document.createElement("div");
        card.className = "story";

        card.innerHTML = `
            ${item.image ? `<img src="${item.image}" alt="Story Image">` : ""}
            <h3>${item.title}</h3>
            <p>${item.story}</p>
        `;

        container.appendChild(card);

    });

}
