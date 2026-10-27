
  const matchaDialog = document.getElementById("matchaDialog");
  const matchaYes = document.getElementById("matchaYes");
  const matchaNo = document.getElementById("matchaNo");
  const matchaClose = document.getElementById("matchaClose");

  function dismissMatchaDialog() {
    matchaDialog.style.display = "none";
  }

  matchaNo.addEventListener("click", dismissMatchaDialog);
  matchaClose.addEventListener("click", dismissMatchaDialog);

  matchaYes.addEventListener("click", function () {
    // Browsers generally only allow scripts to close
    // tabs that were opened by JavaScript.
    window.close();

    // If the browser blocks closing, keep the page usable.
    matchaDialog.innerHTML = `
      <div class="matcha-card">
        <p class="matcha-label">MATCHA LOVER DETECTED</p>
        <h2>Looks like coffee isn't your thing!</h2>
        <p class="matcha-description">
          This tab cannot be closed automatically by the browser.
          You can close it using your browser's close button.
        </p>
        <button class="matcha-yes"
          onclick="document.getElementById('matchaDialog').style.display='none'">
          Stay on this website
        </button>
      </div>
    `;
  });
