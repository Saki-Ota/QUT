// Sets the text to regular style.
function setTextRegular() {
    const text = document.getElementById("changingText");
    text.setAttribute("style", "font-style: normal; font-weight: normal");
}

// Sets the text to italic style.
function setTextItalic() {
    const text = document.getElementById("changingText");
    text.setAttribute("style", "font-style: italic; font-weight: normal");
}

// Sets the text to bold style.
function setTextBold() {
    const text = document.getElementById("changingText");
    text.setAttribute("style", "font-style: normal; font-weight: bold");
}

// Sets the background colour.
function setBackgroundColour(colour) {
    document.body.setAttribute("style", `background-color:${colour}`);
}

function enableButton() {
    document.getElementById("colourSelect").disabled = false;
    document.getElementById("enableButton").disabled = true;
    document.getElementById("disableButton").disabled = false;
}

function disableButton() {
    document.getElementById("colourSelect").disabled = true;
    document.getElementById("enableButton").disabled = false;
    document.getElementById("disableButton").disabled = true;
}

async function getActivityIdea() {
//   fetch("https://bored.api.lewagon.com/api/activity/")
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//         document.getElementById("ideaDiv").textContent = `${data.activity}`
//     });
  try {
    const response = await fetch('https://bored.api.lewagon.com/api/activity/');
    const data = await response.json();
    document.getElementById("ideaDiv").textContent = data.activity;
  }catch{
    console.error("Error fetching activity idea", error);
  }
}

window.onload = function () {
  document
    .getElementById("regularButton")
    .addEventListener("click", setTextRegular);
  document
    .getElementById("italicButton")
    .addEventListener("click", setTextItalic);
  document.getElementById("boldButton").addEventListener("click", setTextBold);

  //Change background colour
  document
    .getElementById("colourSelect")
    .addEventListener("change", function (event) {
      const colour = event.target.value;
      setBackgroundColour(colour);
    });

    // Enable and disaable buttons 
    document
      .getElementById("enableButton")
      .addEventListener("click", enableButton);
    document
      .getElementById("disableButton")
      .addEventListener("click", disableButton);

    // Show idea
    document.getElementById("ideaButton")
    .addEventListener("click", getActivityIdea)
};



