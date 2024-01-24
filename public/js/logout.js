function logout(event) {
	const xhr = new XMLHttpRequest();
	xhr.open('POST', '/logout', true);

	xhr.onreadystatechange = () => {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status >= 200 && xhr.status < 300) {
				console.log('Logout successful');
				localStorage.removeItem('user');
				jsl.dom.add(document.querySelector("#content"), components.login.content)
			} else {
				console.error('Logout failed:', xhr.statusText);
			}
		}
	};

	xhr.onerror = () => {
		console.error('Network error during logout');
	};

	xhr.send();
}

