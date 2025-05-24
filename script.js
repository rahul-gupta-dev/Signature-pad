// Change title when page loads
document.title = "✍️ Sign Your Name | Rahul Gupta";

let i = 0;
const text = "📝 Create Your Signature";
const speed = 100;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("dynamic-text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

window.onload = function () {
  typeWriter();

  const canvas = document.getElementById("signature-pad");
  const ctx = canvas.getContext("2d");

  const signaturePad = new SignaturePad(canvas, {
    backgroundColor: "#f0f0f0",
    penColor: "#000",
  });

  // Resize canvas
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  let placeholderVisible = true;

  // Draw placeholder
  const drawPlaceholder = () => {
    ctx.fillStyle = "#aaa";
    ctx.font = "16px Arial";
    ctx.fillText("Draw your signature here...", 20, canvas.height / 2);
    placeholderVisible = true;
  };

  drawPlaceholder();

  // Clear only the placeholder when user starts drawing the first time
  canvas.addEventListener("mousedown", () => {
    if (placeholderVisible && signaturePad.isEmpty()) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      placeholderVisible = false;
    }
  });

  // Clear button
  window.clearSignature = () => {
    signaturePad.clear();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlaceholder();
  };

  window.downloadSignature = () => {
    if (signaturePad.isEmpty() || placeholderVisible) {
      alert("Please provide a signature first!");
      return;
    }

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    const tempCtx = tempCanvas.getContext("2d");

    tempCtx.fillStyle = "#fff";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);

    const link = document.createElement("a");
    link.href = tempCanvas.toDataURL("image/jpeg");
    link.download = "signature.jpg";
    link.click();
  };
};
