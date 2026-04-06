const BACKEND = https://clipmorph-backend.onrender.com;
const KEY = rzp_test_SaDlpGdtt3ve1B;

 function openPanel(type){
price = 15;
}

if(type === "green"){
clips = ["green/gt1.mp4","green/gt2.mp4","green/gt3.mp4"];
price = 19;
}

clips.forEach(file=>{

const div = document.createElement("div");
div.className = "clip";

div.innerHTML = `
<p>${file}</p>
<button onclick="buy('${file}',${price})">Buy ₹${price}</button>
`;

clipsDiv.appendChild(div);
});
}

async function buy(file,price){

const res = await fetch(BACKEND+"/create-order",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({amount:price,file})
});

const data = await res.json();

var options={
key:KEY,
amount:data.amount,
currency:"INR",
order_id:data.id,

handler: async function(response){

const verify = await fetch(BACKEND+"/verify",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({...response,file})
});

const result = await verify.json();

if(result.success){
window.location = BACKEND + result.download;
}else{
alert("Payment Failed");
}
}
};

new Razorpay(options).open();
}