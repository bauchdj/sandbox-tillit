function setupCamera() {
    document.getElementById('cameraButton').addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.createElement('video');
            document.body.appendChild(video);
            video.srcObject = stream;
            await video.play();

            const canvas = document.getElementById('photoCanvas');
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Stop the video stream
            stream.getTracks().forEach(track => track.stop());

            // Convert canvas content to a data URL
            const imageDataUrl = canvas.toDataURL('image/png');

            // Now, you can upload imageDataUrl to your application
            console.log('Image Data URL:', imageDataUrl);

            // Remove the video element
            document.body.removeChild(video);
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    });
}