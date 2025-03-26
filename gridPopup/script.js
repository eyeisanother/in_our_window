document.addEventListener("DOMContentLoaded", function () {
    const { createClient } = window.supabase;

    if (!createClient) {
        console.error("Supabase library not loaded correctly.");
        return;
    }

    const supabaseUrl = 'https://vsuqgxrckqnxtdctjsgb.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzdXFneHJja3FueHRkY3Rqc2diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNTQzODUsImV4cCI6MjA1NzczMDM4NX0.B1r3g13LEg87b5_37wkuTFuPPSVA81U-rIbXn_BI4og';

    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Supabase Client:', supabase);

    const tableName = 'uploads_metadata';
    const closePopup = document.getElementById("closePopup");
    if (closePopup) {
        closePopup.addEventListener("click", () => {
            document.getElementById("popup").style.display = "none";
        });
    }

    let selectedSquares = []; // Keep track of selected squares

    function createGrid(imageUrl) {
        console.log("Creating grid...");
        console.log('Image URL: ', imageUrl);
        const gridContainer = document.getElementById("gridContainer");
        if (!gridContainer) {
            console.error("gridContainer not found!");
            return;
        }

        gridContainer.innerHTML = ""; // Clears the previous grid

        const gridSize = 5; // 5x5 grid
        const squareSize = 100 / gridSize; // Size of the squares in the grid

        for (let i = 0; i < gridSize * gridSize; i++) {
            const square = document.createElement("div");
            square.classList.add("grid-square");

            // Square size
            square.style.width = `${squareSize}%`;
            square.style.height = `${squareSize}%`;

            // Square position
            square.style.position = 'absolute';
            square.style.top = `${Math.floor(i / gridSize) * squareSize}%`;
            square.style.left = `${(i % gridSize) * squareSize}%`;

            // Square background colour
            square.style.backgroundColor = "transparent";

            square.addEventListener("click", () => {
                square.classList.toggle("selected");
                if (square.classList.contains("selected")) {
                    selectedSquares.push(square);
                } else {
                    selectedSquares = selectedSquares.filter(s => s !== square);
                }
            });

            gridContainer.appendChild(square);
        }

        addPromptBox(); // Call for prompt box

        // Save the image to use later
        window.currentImageUrl = imageUrl;
    }

    function showGridAfterSuccess(imageUrl) {
        const successAlert = document.getElementById("success-alert");
        successAlert.classList.add("show");

        setTimeout(() => {
            successAlert.classList.remove("show"); // Hides the alert
            console.log('Selected Image URL: ', imageUrl);
            openGridPopup(imageUrl);
            addPromptBox();
        }, 2000);
    }

    function openGridPopup(imageUrl) {
        console.log("Opening popup");
        console.log('Image URL: ', imageUrl);
        const popup = document.getElementById("popup");
        if (popup) {
            popup.style.display = "block";
            createGrid(imageUrl); // Passes the image on
            addPromptBox(); // Call for prompt box
        } else {
            console.error(" Popup element not found");
        }
    }

    function addPromptBox() {
        const popup = document.getElementById("popup");
        if (popup) {
            const existingPromptBox = popup.querySelector("#prompt-box");
            if (existingPromptBox) {
                return; 
            }

            const promptBox = document.createElement("div");
            promptBox.id = "prompt-box";
            promptBox.style.position = "absolute";
            promptBox.style.top = "20px";
            promptBox.style.left = "50%";
            promptBox.style.transform = "translateX(-50%)";
            promptBox.style.fontSize = "24px";
            promptBox.style.fontWeight = "bold";
            promptBox.style.zIndex = "1";
            promptBox.classList.add("prompt-text");

            const prompts = [
                "Authorise your perception:\nSelect the boxes that feel most familiar.",
                "Authorise your perception:\nSelect the boxes that feel most private.",
                "Authorise your perception:\nSelect the boxes that feel most expressive.",
                "Authorise your perception:\nSelect the boxes that feel out of place.",
                "Authorise your perception:\nSelect the boxes where there is repetition.",
                "Authorise your perception:\nSelect the boxes that caught your eye.",
                "Authorise your perception:\nSelect the boxes that feel most quiet.",
                "Authorise your perception:\nSelect the boxes that feel most unique.",
                "Authorise your perception:\nSelect the boxes that feel most comfortable.",
                "Authorise your perception:\nSelect the boxes that feel most uncomfortable.",
                "Authorise your perception:\nSelect the boxes that feel most energised.",
                "Authorise your perception:\nSelect the boxes that feel most beautiful."
            ];

            const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
            promptBox.textContent = randomPrompt;

            const refreshButton = document.createElement("button");
            refreshButton.textContent = "\u21BB";
            refreshButton.style.marginLeft = "20px";
            promptBox.style.marginTop = "50px";
            refreshButton.style.zIndex = "2"; //  Puts the button is on top of the prompt box
            refreshButton.style.backgroundColor = "#FFFEF5";
            refreshButton.style.color = "blue";
            refreshButton.addEventListener("click", () => {
                const newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
                promptBox.removeChild(refreshButton);
                promptBox.textContent = newPrompt;
                promptBox.appendChild(refreshButton);
            });

            promptBox.appendChild(refreshButton);

            popup.appendChild(promptBox);
        }
    }

    const confirmButton = document.getElementById("confirm-button");
    if (confirmButton) {
        confirmButton.addEventListener("click", () => {
            const gridContainer = document.getElementById("gridContainer");
            const image = new Image();
            image.crossOrigin = "anonymous";
            image.src = window.currentImageUrl;
            image.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = gridContainer.offsetWidth;
                canvas.height = gridContainer.offsetHeight;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                const pixelatedCanvas = document.createElement("canvas");
                pixelatedCanvas.width = canvas.width;
                pixelatedCanvas.height = canvas.height;
                const pixelatedCtx = pixelatedCanvas.getContext("2d");
                const pixelSize = 10; 

                const gridSquares = document.querySelectorAll('.grid-square');
                const selectedSquares = [...document.querySelectorAll('.grid-square.selected')];

                // Randomly decide whether to pixelate the selected or the unselected squares
                const pixelateSelected = Math.random() < 0.5;

                for (let x = 0; x < canvas.width; x += pixelSize) {
                    for (let y = 0; y < canvas.height; y += pixelSize) {
                        const square = Array.from(gridSquares).find(square => {
                            const rect = square.getBoundingClientRect();
                            const gridRect = gridContainer.getBoundingClientRect();
                            return rect.left - gridRect.left <= x && x <= rect.right - gridRect.left && rect.top - gridRect.top <= y && y <= rect.bottom - gridRect.top;
                        });

                        if (square) {
                            const isSelected = selectedSquares.includes(square);
                            if ((pixelateSelected && isSelected) || (!pixelateSelected && !isSelected)) {
                                const pixelColor = ctx.getImageData(x, y, 1, 1).data;
                                pixelatedCtx.fillStyle = `rgb(${pixelColor[0]}, ${pixelColor[1]}, ${pixelColor[2]})`;
                                pixelatedCtx.fillRect(x, y, pixelSize, pixelSize);
                            } else {
                                pixelatedCtx.drawImage(canvas, x, y, pixelSize, pixelSize, x, y, pixelSize, pixelSize);
                            }
                        }
                    }
                }
                gridContainer.innerHTML = "";
                gridContainer.appendChild(pixelatedCanvas);

                const pixelatedImageData = pixelatedCanvas.toDataURL();
                const pixelatedImageUrl = pixelatedImageData;

                const bucketName = 'uploads';
                const folderName = 'pixelated';
                const fileName = `${folderName}/${Math.random().toString(36).substr(2, 9)}.png`;
                const fileData = pixelatedImageData.split(',')[1];

                uploadPixelatedImage(bucketName, folderName, fileName, fileData, pixelatedCanvas);

                // Close the popup page
                setTimeout(() => {
                    document.getElementById('popup').style.display = 'none';
                }, 3000);
            };
            image.onerror = () => {
                console.error("Failed to load image.");
            };
        });
    }

    function uploadPixelatedImage(bucketName, folderName, fileName, fileData, pixelatedCanvas) {
        const pixelatedImageData = pixelatedCanvas.toDataURL('image/png');
        const byteString = atob(pixelatedImageData.split(',')[1]);
        const mimeString = pixelatedImageData.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });

        supabase.storage.from(bucketName).upload(fileName, blob, {
            contentType: 'image/png',
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
                alert('Error uploading pixelated image: ' + error.message);
            });
    }

    // To let it be accessible from outside
    window.openGridPopup = openGridPopup;
    window.showGridAfterSuccess = showGridAfterSuccess;
});
