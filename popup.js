let currentIndex = 0;
let hintsArray = [];

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const url = tabs[0].url;
  const match = url.match(/problems\/([a-z0-9\-]+)\//);

  if (match && match[1]) {
    const problemSlug = match[1];

    fetch(chrome.runtime.getURL("hints.json"))
      .then(response => response.json())
      .then(hints => {
        hintsArray = hints[problemSlug] || ["No hint available for this problem."];
        currentIndex = 0;
        document.getElementById("hintText").innerText = hintsArray[currentIndex];
      });
  } else {
    document.getElementById("hintText").innerText = "Not on a LeetCode problem page.";
  }
});

document.getElementById("nextHint").addEventListener("click", () => {
  if (currentIndex < hintsArray.length - 1) {
    currentIndex++;
    document.getElementById("hintText").innerText = hintsArray[currentIndex];
  } else {
    document.getElementById("hintText").innerText = "That's the final hint!";
  }
});
