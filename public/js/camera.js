async function setupCamera() {

components.popup = {
	camera: {
		tag: 'div',
		className: 'overlay',
		children: [{
			tag: 'video',
			//className: ''
		}, {
			tag: 'canvas',
			//className: ''
		}]
	}
};

jsl.dom.add(document.body, components.popup.camera);

const overlay = components.popup.camera.el;
const video = components.popup.camera.children[0].el;
const canvas = components.popup.camera.children[1].el;

function initElement() {
	if (navigator.mediaDevices === undefined) {
		navigator.mediaDevices = {};
	}

	if (navigator.mediaDevices.getUserMedia === undefined) {
		navigator.mediaDevices.getUserMedia = function (constraints) {

			const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

			if (!getUserMedia) {
				return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
			}

			return new Promise(function (resolve, reject) {
				getUserMedia.call(navigator, constraints, resolve, reject);
			})
		}
	}
}

function onDownloadPhoto() {
	canvas.toBlob(function (blob) {
		const link = document.createElement('a');
		link.download = 'photo.jpg';
		link.setAttribute('href', URL.createObjectURL(blob));
		link.dispatchEvent(new MouseEvent('click'));

	}, 'image/jpeg', 1);
}

function onTakeAPhoto() {
    canvas.getContext('2d').drawImage(video, 0, 0, video.width, video.height);

    // Replace buttons
    overlay.innerHTML = '';

    const imgElement = document.createElement('img');
    imgElement.src = canvas.toDataURL('image/png');
    overlay.appendChild(imgElement);

    // Save button
    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.className = 'overlay-button left-button';
    saveButton.addEventListener('click', () => {
        onDownloadPhoto();
    });
    overlay.appendChild(saveButton);

    // Retake button
    const retakeButton = document.createElement('button');
    retakeButton.innerText = 'Retake Photo';
    retakeButton.className = 'overlay-button middle-button';
    retakeButton.addEventListener('click', () => {
        initEvent();
    });
    overlay.appendChild(retakeButton);

    // Close button
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.className = 'overlay-button right-button';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(components.popup.camera.el);
    });
    overlay.appendChild(closeButton);
}

function onLoadVideo() {
    video.setAttribute('width', this.videoWidth);
    video.setAttribute('height', this.videoHeight);
    canvas.setAttribute('width', this.videoWidth);
    canvas.setAttribute('height', this.videoHeight);
    video.play();
}

function onMediaStream(stream) {
    if ('srcObject' in video) {
		video.srcObject = stream;
	} else {
		// TODO May need to remove this. Don't know what edge case this is...
		if (window.location.protocol != 'https:' && window.location.protocol != 'file:') {
			window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
		}
		video.src = window.URL.createObjectURL(stream);
	}

    // Take picture
    const takeButton = document.createElement('button');
    takeButton.innerText = 'Take Photo';
    takeButton.className = 'overlay-button left-button';
    takeButton.addEventListener('click', () => {
        onTakeAPhoto();
    });
    overlay.appendChild(takeButton);

    // Close button
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.className = 'overlay-button right-button';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(components.popup.camera.el);
    });
    overlay.appendChild(closeButton);

    // Add video to overlay
    overlay.appendChild(video);

    video.addEventListener('loadedmetadata', onLoadVideo);
}

function onMediaError(err) {
	console.error(err.name + ': ' + err.message);
}

function initEvent() {
    overlay.innerHTML = '';

    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(onMediaStream)
        .catch(onMediaError);
}

initElement();
initEvent();

}

/*
async function setupCamera() {
	// Array to store captured images
	const capturedImages = [];

	try {
		const stream = await navigator.mediaDevices.getUserMedia({ video: true });
		const video = document.createElement('video');
		document.body.appendChild(video);
		video.srcObject = stream;
		await video.play();

		// Delay for 2 seconds
		await new Promise(resolve => setTimeout(resolve, 1500));

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
}
*/
