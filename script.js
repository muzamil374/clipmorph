const BACKEND = https://clipmorph-server.onrender.com;

let unlockedClips = {}; // stores purchased clips

// OPEN CATEGORY
function openCategory(type) {
  document.getElementById("home").style.display = "none";
  document.getElementById("category").classList.remove("hidden");

  document.getElementById("title").innerText = type.toUpperCase();

  const grid = document.getElementById("clipGrid");
  grid.innerHTML = "Loading clips... 🔄";

  fetch(`${BACKEND}/clips/${type}`)
    .then(res => res.json())
    .then(data => {
      grid.innerHTML = "";

      data.clips.forEach(clip => {

        const isUnlocked = unlockedClips[clip.id];

        const card = document.createElement("div");
        card.className = "clipCard";

        card.innerHTML = `
          <div class="thumb">
            🎬
          </div>

          <div class="clipInfo">
            <h3>${clip.name}</h3>
            <p>₹${clip.price}</p>
          </div>

          ${
            isUnlocked
            ? `<a class="downloadBtn" href="${clip.url}" download>Download</a>`
            : `<button onclick="buyClip('${clip.id}', '${clip.price}', '${clip.url}')">Buy Now</button>`
          }
        `;

        grid.appendChild(card);
      });
    });
}

// GO HOME
function goHome() {
  document.getElementById("home").style.display = "block";
  document.getElementById("category").classList.add("hidden");
}

// LOCKED MSG
function lockMsg() {
  alert("Locked category 🔒 Add clips later!");
}

// BUY SYSTEM
function buyClip(id, price, url) {

  const options = {
    key: "PASTE KEY HERE",
    amount: price * 100,
    currency: "INR",
    name: "MorphClip Store",
    description: "Clip Purchase",

    handler: function () {

      alert("Payment Successful ✅ Download unlocked!");

      unlockedClips[id] = true;

      // reload current category
      location.reload();
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}