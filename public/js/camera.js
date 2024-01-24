function setupCamera(buttonObject) {
    // Ensure buttonObject.el is a DOM element
    if (buttonObject.el === null) {
        console.error('Invalid button element:', buttonObject);
        return;
    }

    // Array to store captured images
    const capturedImages = [];

    // Use buttonObject.el instead of document.getElementById('cameraButton')
    buttonObject.el.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.createElement('video');
            document.body.appendChild(video);
            video.srcObject = stream;
            await video.play();

            // Delay for 2 seconds
            await new Promise(resolve => setTimeout(resolve, 2000));

            const canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Stop the video stream
            stream.getTracks().forEach(track => track.stop());

            // Convert canvas content to a data URL
            const imageDataUrl = canvas.toDataURL('image/png');

            // Save the image data to the array
            capturedImages.push(imageDataUrl);

            // Create a modal overlay to display the captured image
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);

            const imgElement = document.createElement('img');
            imgElement.src = imageDataUrl;
            overlay.appendChild(imgElement);

            // Add a save button to the left of the overlay
            const saveButton = document.createElement('button');
            saveButton.innerText = 'Save';
            saveButton.className = 'overlay-button left-button';
            saveButton.addEventListener('click', () => {
                // Save the image data to your application's storage or process it accordingly
                console.log('Image saved:', imageDataUrl);
                document.body.removeChild(overlay);
            });
            overlay.appendChild(saveButton);

            // Add a close button to the right of the overlay
            const closeButton = document.createElement('button');
            closeButton.innerText = 'Close';
            closeButton.className = 'overlay-button right-button';
            closeButton.addEventListener('click', () => {
                document.body.removeChild(overlay);
            });
            overlay.appendChild(closeButton);

            // Remove the video and canvas elements
            document.body.removeChild(video);
            document.body.removeChild(canvas);
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    });
}
