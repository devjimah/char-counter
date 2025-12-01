// Wait for the page to fully load before running the code
document.addEventListener("DOMContentLoaded", function () {
  // ===================================
  // GET ALL THE ELEMENTS WE NEED
  // ===================================

  // ===================================
  // THEME SWITCHING FUNCTION
  // ===================================

  function setupThemeToggle() {
    // Get the theme toggle checkbox
    const themeToggle = document.getElementById("theme-toggle");
    const logoImg = document.getElementById("logo-img");
    const themeIcon = document.querySelector(".theme-icon");

    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
      themeToggle.checked = true;
      updateThemeAssets(true);
    }

    // Listen for theme toggle changes
    themeToggle.addEventListener("change", function () {
      if (themeToggle.checked) {
        // Switch to dark theme
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
        updateThemeAssets(true);
      } else {
        // Switch to light theme
        document.body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
        updateThemeAssets(false);
      }
    });

    // Helper function to update logo and icon
    function updateThemeAssets(isDark) {
      if (isDark) {
        // Dark theme assets
        logoImg.src = "./assets/images/logo-dark-theme.svg";
        themeIcon.src = "./assets/images/icon-sun.svg";
      } else {
        // Light theme assets
        logoImg.src = "./assets/images/logo-light-theme.svg";
        themeIcon.src = "./assets/images/icon-moon.svg";
      }
    }
  }

  // Call this function when page loads (add inside DOMContentLoaded)
  setupThemeToggle();

  // The textarea where users type
  const textInput = document.getElementById("text-input");

  // The number displays
  const charCountDisplay = document.getElementById("char-count");
  const wordCountDisplay = document.getElementById("word-count");
  const sentenceCountDisplay = document.getElementById("sentence-count");
  const readingTimeDisplay = document.querySelector(".reading-time p");

  // The checkboxes
  const excludeSpaceCheckbox = document.getElementById("exclude-space");
  const limitCheckbox = document.getElementById("character-limit");
  const limitInput = document.getElementById("limit-input");

  // Letter density section
  const letterDensityMessage = document.getElementById(
    "letter-density-message"
  );
  const barHolder = document.getElementById("bar-holder");
  const seeMoreBtn = document.getElementById("see-more-btn");

  // Accessibility: Character limit warning element
  const charLimitWarning = document.getElementById("char-limit-warning");

  // ===================================
  // SETTINGS
  // ===================================

  const DEFAULT_LIMIT = 300; // Default character limit
  const MAX_CHARACTERS = 5000; // Maximum allowed characters
  const READING_SPEED = 200; // Average words per minute
  let showAllLetters = false; // Track if showing all letters or top 5

  // ===================================
  // MAIN FUNCTION - UPDATES EVERYTHING
  // ===================================

  function updateEverything() {
    // Get the text from the textarea
    const text = textInput.value;

    // --- COUNT CHARACTERS ---
    let characterCount = text.length;

    // If "Exclude Spaces" is checked, remove spaces before counting
    if (excludeSpaceCheckbox.checked) {
      let textWithoutSpaces = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] !== " " && text[i] !== "\n" && text[i] !== "\t") {
          textWithoutSpaces += text[i];
        }
      }
      characterCount = textWithoutSpaces.length;
    }

    // Show the character count (with leading zero if needed)
    charCountDisplay.textContent =
      characterCount < 10 ? `0${characterCount}` : characterCount;

    // --- COUNT WORDS ---
    let wordCount = 0;

    if (text.trim().length > 0) {
      // Split by whitespace and filter out empty strings
      wordCount = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
    }

    // Show the word count
    wordCountDisplay.textContent = wordCount < 10 ? `0${wordCount}` : wordCount;

    // --- COUNT SENTENCES ---
    let sentenceCount = 0;

    // Count periods, exclamation marks, and question marks
    for (let i = 0; i < text.length; i++) {
      if (text[i] === "." || text[i] === "!" || text[i] === "?") {
        sentenceCount++;
      }
    }

    // Show the sentence count
    sentenceCountDisplay.textContent =
      sentenceCount < 10 ? `0${sentenceCount}` : sentenceCount;

    // --- CALCULATE READING TIME ---
    let readingTime = "0 minutes";

    if (wordCount > 0) {
      const minutes = Math.ceil(wordCount / READING_SPEED);

      if (minutes < 1) {
        readingTime = "< 1 minute";
      } else if (minutes === 1) {
        readingTime = "1 minute";
      } else {
        readingTime = `~${minutes} minutes`;
      }
    }

    readingTimeDisplay.textContent = `Approx. reading time: ${readingTime}`;

    // --- UPDATE LETTER DENSITY ---
    updateLetterDensity(text);

    // --- CHECK CHARACTER LIMIT ---
    checkCharacterLimit(text.length);
  }

  // ===================================
  // LETTER DENSITY FUNCTION
  // ===================================

  function updateLetterDensity(text) {
    // Count how many times each letter appears
    const letterCounts = {};
    let totalLetters = 0;

    // Go through each character
    for (let i = 0; i < text.length; i++) {
      const char = text[i].toUpperCase();

      // Only count letters A-Z
      if (char >= "A" && char <= "Z") {
        if (letterCounts[char]) {
          letterCounts[char]++;
        } else {
          letterCounts[char] = 1;
        }
        totalLetters++;
      }
    }

    // If no letters, show the message
    if (totalLetters === 0) {
      letterDensityMessage.style.display = "block";
      barHolder.style.display = "none";
      seeMoreBtn.style.display = "none";
      return;
    }

    // Hide message and show bars
    letterDensityMessage.style.display = "none";
    barHolder.style.display = "block";

    // Find the top letters sorted by frequency
    const letterArray = [];
    for (const letter in letterCounts) {
      letterArray.push({
        letter: letter,
        count: letterCounts[letter],
      });
    }

    // Sort by count (highest first)
    letterArray.sort(function (a, b) {
      return b.count - a.count;
    });

    // Determine how many to show
    const lettersToShow = showAllLetters
      ? letterArray
      : letterArray.slice(0, 5);

    // Show/hide "see more" button
    if (letterArray.length > 5) {
      seeMoreBtn.style.display = "flex";
      const btnText = seeMoreBtn.querySelector("span:first-child");
      btnText.textContent = showAllLetters ? "see less" : "see more";

      if (showAllLetters) {
        seeMoreBtn.classList.add("expanded");
      } else {
        seeMoreBtn.classList.remove("expanded");
      }
    } else {
      seeMoreBtn.style.display = "none";
    }

    // Clear old bars
    barHolder.innerHTML = "";

    // Create new bars
    for (let i = 0; i < lettersToShow.length; i++) {
      const letter = lettersToShow[i].letter;
      const count = lettersToShow[i].count;
      const percentage = ((count / totalLetters) * 100).toFixed(2);

      // Create the bar HTML
      const barDiv = document.createElement("div");
      barDiv.className = "count-bar";
      barDiv.innerHTML = `
        <p class="letter-label">${letter}</p>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${percentage}%"></div>
        </div>
        <p class="letter-percentage">${count} (${percentage}%)</p>
      `;

      barHolder.appendChild(barDiv);
    }
  }

  // ===================================
  // CHARACTER LIMIT WARNING
  // ===================================

  function checkCharacterLimit(currentLength) {
    // Only show warnings if the limit checkbox is checked
    if (!limitCheckbox.checked) {
      textInput.style.borderColor = "";
      textInput.style.boxShadow = "";
      charLimitWarning.textContent = "";
      textInput.maxLength = MAX_CHARACTERS;
      return;
    }

    // Get custom limit or use default
    const customLimit = parseInt(limitInput.value) || DEFAULT_LIMIT;
    const actualLimit = Math.min(customLimit, MAX_CHARACTERS);
    textInput.maxLength = actualLimit;

    const remaining = actualLimit - currentLength;

    // At or over the limit - RED warning
    if (remaining <= 0) {
      textInput.style.borderColor = "#FE8159";
      textInput.style.boxShadow = "0 0 8px rgba(254, 129, 89, 0.5)";
      charLimitWarning.textContent = `ⓘ Limit reached! Your text exceeds ${actualLimit} characters.`;
    }
    // Plenty of space left - normal
    else {
      textInput.style.borderColor = "";
      textInput.style.boxShadow = "";
      charLimitWarning.textContent = "";
    }
  }

  // ===================================
  // EVENT LISTENERS
  // ===================================

  // Enable/disable limit input based on checkbox
  limitCheckbox.addEventListener("change", function () {
    limitInput.disabled = !limitCheckbox.checked;
    if (limitCheckbox.checked && !limitInput.value) {
      limitInput.value = DEFAULT_LIMIT;
    }
    updateEverything();
  });

  // Update when limit input changes
  limitInput.addEventListener("input", function () {
    if (limitCheckbox.checked) {
      updateEverything();
    }
  });

  // Update when user types
  textInput.addEventListener("input", updateEverything);

  // Update when checkboxes change
  excludeSpaceCheckbox.addEventListener("change", updateEverything);

  // "See more" button toggle
  seeMoreBtn.addEventListener("click", function () {
    showAllLetters = !showAllLetters;
    updateEverything();
  });

  // Run once when page loads
  updateEverything();
});
