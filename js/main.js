// Wait for page to load
document.addEventListener("DOMContentLoaded", function () {
  // ========== THEME MANAGER ==========
  class ThemeManager {
    constructor() {
      this.toggle = document.getElementById("theme-toggle");
      this.logo = document.getElementById("logo-img");
      this.icon = document.querySelector(".theme-icon");

      this.loadSavedTheme();
      this.toggle.addEventListener("click", () => this.switchTheme());
    }

    loadSavedTheme() {
      if (localStorage.getItem("theme") === "dark") {
        this.setDark();
      }
    }

    switchTheme() {
      if (document.body.classList.contains("dark-theme")) {
        this.setLight();
      } else {
        this.setDark();
      }
    }

    setDark() {
      document.body.classList.add("dark-theme");
      this.logo.src = "./assets/images/logo-dark-theme.svg";
      this.icon.src = "./assets/images/icon-sun.svg";
      localStorage.setItem("theme", "dark");
    }

    setLight() {
      document.body.classList.remove("dark-theme");
      this.logo.src = "./assets/images/logo-light-theme.svg";
      this.icon.src = "./assets/images/icon-moon.svg";
      localStorage.setItem("theme", "light");
    }
  }

  // ========== CHARACTER COUNTER ==========
  class CharacterCounter {
    constructor() {
      // Settings
      this.maxChars = 5000;
      this.defaultLimit = 300;
      this.wordsPerMinute = 200;
      this.showAllLetters = false;
      this.updateTimer = null;

      // Get elements
      this.textarea = document.getElementById("text-input");
      this.charCount = document.getElementById("char-count");
      this.wordCount = document.getElementById("word-count");
      this.sentenceCount = document.getElementById("sentence-count");
      this.readingTime = document.querySelector(".reading-time p");
      this.excludeSpaces = document.getElementById("exclude-space");
      this.limitCheckbox = document.getElementById("character-limit");
      this.limitInput = document.getElementById("limit-input");
      this.densityMessage = document.getElementById("letter-density-message");
      this.barHolder = document.getElementById("bar-holder");
      this.seeMoreBtn = document.getElementById("see-more-btn");
      this.warning = document.getElementById("char-limit-warning");

      // Set up events and run initial update
      this.setupEvents();
      this.update();
    }

    setupEvents() {
      // When user types (with small delay for performance)
      this.textarea.addEventListener("input", () => {
        clearTimeout(this.updateTimer);
        this.updateTimer = setTimeout(() => this.update(), 200);
      });

      // Checkbox changes
      this.excludeSpaces.addEventListener("change", () => this.update());

      this.limitCheckbox.addEventListener("change", () => {
        this.limitInput.disabled = !this.limitCheckbox.checked;
        this.limitInput.classList.toggle("active", this.limitCheckbox.checked);
        if (this.limitCheckbox.checked && !this.limitInput.value) {
          this.limitInput.value = 300;
        }
        this.update();
      });

      this.limitInput.addEventListener("input", () => this.update());

      // See more button
      this.seeMoreBtn.addEventListener("click", () => {
        this.showAllLetters = !this.showAllLetters;
        this.updateLetterDensity();
      });
    }

    update() {
      const text = this.textarea.value;

      this.updateCharCount(text);
      const wordCount = this.updateWordCount(text);
      this.updateSentenceCount(text);
      this.updateReadingTime(wordCount);
      this.updateLetterDensity();
      this.checkLimit(text);
    }

    // ===== COUNTING METHODS =====

    updateCharCount(text) {
      let count = text.length;

      // If excluding spaces, remove all whitespace and count
      if (this.excludeSpaces.checked) {
        count = text.replace(/\s/g, "").length;
      }

      this.charCount.textContent = count < 10 ? "0" + count : count;
    }

    updateWordCount(text) {
      // Split by whitespace to get words
      const words = text.trim().split(/\s+/);
      // If text is empty, count is 0, otherwise it's the array length
      const count = text.trim() === "" ? 0 : words.length;

      this.wordCount.textContent = count < 10 ? "0" + count : count;
      return count; // Return for reading time
    }

    updateSentenceCount(text) {
      const cleanText = text.replace(/(Mr|Mrs|Ms|Dr|Prof|Sr|Jr)\./gi, "$1");

      const sentences = cleanText
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 0);
      const count = sentences.length;

      this.sentenceCount.textContent = count < 10 ? "0" + count : count;
    }

    updateReadingTime(wordCount) {
      let time = "0 minutes";

      if (wordCount > 0) {
        const minutes = Math.ceil(wordCount / this.wordsPerMinute);
        if (minutes === 1) {
          time = "1 minute";
        } else {
          time = "~" + minutes + " minutes";
        }
      }

      this.readingTime.textContent = "Approx. reading time: " + time;
    }

    updateLetterDensity() {
      const text = this.textarea.value;

      // Count each letter
      const counts = {};
      let total = 0;

      for (let i = 0; i < text.length; i++) {
        const char = text[i].toUpperCase();
        if (char >= "A" && char <= "Z") {
          counts[char] = (counts[char] || 0) + 1;
          total++;
        }
      }

      // No letters? Show message
      if (total === 0) {
        this.densityMessage.style.display = "block";
        this.barHolder.style.display = "none";
        this.seeMoreBtn.style.display = "none";
        return;
      }

      this.densityMessage.style.display = "none";
      this.barHolder.style.display = "block";

      // Convert to array and sort
      const letters = [];
      for (const letter in counts) {
        letters.push({ letter: letter, count: counts[letter] });
      }
      letters.sort((a, b) => b.count - a.count);

      // Show top 5 or all
      const toShow = this.showAllLetters ? letters : letters.slice(0, 5);

      // Update button
      if (letters.length > 5) {
        this.seeMoreBtn.style.display = "flex";
        this.seeMoreBtn.querySelector("span").textContent = this.showAllLetters
          ? "see less"
          : "see more";
        this.seeMoreBtn.classList.toggle("expanded", this.showAllLetters);
      } else {
        this.seeMoreBtn.style.display = "none";
      }

      // Build bars
      this.barHolder.innerHTML = "";
      for (let i = 0; i < toShow.length; i++) {
        const pct = ((toShow[i].count / total) * 100).toFixed(2);
        const bar = document.createElement("div");
        bar.className = "count-bar";
        bar.innerHTML =
          '<p class="letter-label">' +
          toShow[i].letter +
          "</p>" +
          '<div class="progress-bar">' +
          '<div class="progress-fill" style="width:' +
          pct +
          '%"></div>' +
          "</div>" +
          '<p class="letter-percentage">' +
          toShow[i].count +
          " (" +
          pct +
          "%)</p>";
        this.barHolder.appendChild(bar);
      }
    }

    checkLimit(text) {
      // No limit enabled? Clear warnings
      if (!this.limitCheckbox.checked) {
        this.textarea.style.borderColor = "";
        this.textarea.style.boxShadow = "";
        this.warning.textContent = "";
        this.textarea.maxLength = this.maxChars;
        return;
      }

      // Enforce limit from input or default to 300
      const limit = parseInt(this.limitInput.value) || 300;
      this.textarea.maxLength = limit;

      if (text.length >= limit) {
        this.textarea.style.borderColor = "#FE8159";
        this.textarea.style.boxShadow = "0 0 8px rgba(254, 129, 89, 0.5)";
        this.warning.textContent =
          "Limit reached! Your text exceeds " + limit + " characters.";
      } else {
        this.textarea.style.borderColor = "";
        this.textarea.style.boxShadow = "";
        this.warning.textContent = "";
      }
    }
  }

  // ========== START THE APP ==========
  new ThemeManager();
  new CharacterCounter();
});
