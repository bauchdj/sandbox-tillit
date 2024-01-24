const components = {
	header: title => { return {
		tag: 'header',
		children: [{
			tag: 'nav',
			className: 'navbar bg-body-tertiary',
			children: [{
				tag: 'a',
				className: 'navbar-brand',
				href: '',
				text: title // title used
			}, {
				tag: 'div',
				className: 'flex-fill'
			}, {
				tag: 'a',
				className: 'navbar-brand',
				href: '',
				children: [{
					tag: 'img',
					id: 'icon',
					className: 'bottomIcons',
					src: 'img/transaction_arrows.png'
				}]
			}]
		}]
	}}
}

components.login = {
	header: components.header("Login page"),

	form: {
		tag: 'form',
		action: 'login',
		method: 'post',
		onsubmit: 'handleFormSubmit(event)',
		children: [{
			tag: 'legend',
			text: 'Login'
		}, {
			tag: 'div',
			className: 'mb-2',
			children: [{
				tag: 'input',
				type: 'text',
				className: 'form-control',
				name: 'username',
				placeholder: 'Username',
				required: true,
				autocomplete: 'username',
				minlength: '2',
				maxlength: '30'
			}]
		}, {
			tag: 'div',
			className: 'mb-2',
			children: [{
				tag: 'input',
				type: 'password',
				className: 'form-control',
				name: 'password',
				placeholder: 'Password',
				required: true,
				autocomplete: 'current-password',
				pattern: '^(?=.*[a-zA-Z])(?=.*\\d).+$',
				minlength: '5',
				maxlength: '30'
			}, {
				tag: 'div',
				className: 'form-text',
				children: [{
					tag: 'div',
					children: [{
						tag: 'span',
						text: 'Must contain at least '
					}, {
						tag: 'b', // or 'strong' for semantic importance
						text: 'one letter'
					}, {
						tag: 'span',
						text: ' and '
					}, {
						tag: 'b', // or 'strong' for semantic importance
						text: 'one number'
					}]
				}, {
					tag: 'div',
					text: 'Guest login is guest and 2bemyguestlogin'
				}]
			}]
		}, {
			tag: 'div',
			className: 'flex-r',
			children: [{
				tag: 'button',
				type: 'submit',
				className: 'btn btn-primary norm-btn',
				text: 'Login'
			}, {
				tag: 'div',
				className: 'center-y',
				style: {
					margin: '0.3rem'
				},
				children: [{
					tag: 'input',
					type: 'checkbox',
					id: 'create-user-checkbox'
				}]
			}, {
				tag: 'div',
				className: 'center-y',
				text: 'Create new user'
			}]
		}]
	},

	footer: {
		tag: 'footer',
		children: [{
			tag: 'div',
			className: 'flex-r',
			children: []
		}]
	}
}


const bottomBtn = imgFilename => ({
	tag: 'div',
	className: 'center-x flex-1-0',
	onclick: event => {
		event.stopPropagation();
		console.log(event.target);
	},
	children: [{
		tag: 'img',
		id: imgFilename,
		className: 'bottomIcons',
		src: 'img/'+ imgFilename
	}],
	el: null // Placeholder for the DOM element
});

const cameraBtn = imgFilename => {
	const obj = bottomBtn(imgFilename);
	obj.onclick = event => {
		console.log("Camera boy");
		setupCamera(obj);
	};
	return obj;
};

components.login.footer.children[0].children.push(bottomBtn('home-button.png'), cameraBtn('camera-button.png'), bottomBtn('profile-button.png'));

components.login.content = {
	tag: 'div',
	id: 'content',
	children: [components.login.form]
};

components.login.body = {
	tag: 'div',
	id: 'body',
	children: [components.login.header, components.login.content, components.login.footer]
};

document.addEventListener('DOMContentLoaded', function() {
	jsl.dom.add(document.body, components.login.body);
});

