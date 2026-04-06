function openCategory(type) {
  document.getElementById("home").style.display = "none";
  document.getElementById("category").classList.remove("hidden");

  document.getElementById("title").innerText = type.toUpperCase();

  const grid = document.getElementById("clipGrid");
  grid.innerHTML = "Loading...";

  // TEMP DEMO (replace with backend later)
  setTimeout(() => {
    grid.innerHTML = `
      <div class="clip">
        <video src="server/clips/${type}/rdy1.mp4" controls></video>
        <p>₹15</p>
        <button onclick="buy()">BUY</button>
      </div>
    `;
  }, 500);
}

function goHome() {
  document.getElementById("home").style.display = "block";
  document.getElementById("category").classList.add("hidden");
}

function lockMsg() {
  alert("This category is locked 🔒 Add clips first!");
}

function buy() {
  alert("Payment system will connect with backend next 🔥");
}