const components = {
	header: title => { return {
		tag: 'header',
		id: 'header',
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

createForm = () => ({
	tag: 'form',
	action: 'login',
	method: 'post',
	onsubmit: event => {
		event.preventDefault();

		components.login.body.el.remove();

		jsl.dom.add(document.body, components.home.body);
	},
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
			//minlength: '2',
			//maxlength: '30'
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
			//pattern: '^(?=.*[a-zA-Z])(?=.*\\d).+$',
			//minlength: '5',
			//maxlength: '30'
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
		}]
	}]
});

page = headerTitle => ({
	body: {
		tag: 'div',
		id: 'body',
		children: [
			components.header(headerTitle),
			{
				tag: 'div',
				id: 'content',
				children: []	
			}, {
				tag: 'footer',
				id: 'footer',
				children: [{
					tag: 'div',
					className: 'flex-r',
					children: []
				}]
			}
		]
	}
})

components.login = (() => {
	const obj = page('Login page');
	obj.body.children[1].children.push(createForm());
	return obj
})();

components.login.body.children[1].className = 'login';

components.login.body.children[2].children[0].children.push({ tag: 'div', text: 'Login footer'  });

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
});

const cameraBtn = imgFilename => {
	const obj = bottomBtn(imgFilename);
	obj.onclick = async (event) => {
		console.log("Camera boy");
		await setupCamera();
	};
	return obj;
};

components.home = page('Tillit');

components.home.body.children[1].className = 'home';

components.home.body.children[1].innerHTML = `
<table><tbody><tr>
    <td style="/* width: 100%; *//* height: 100%; *//* background: white; */flex-direction: column;/* justify-content: flex-start; *//* align-items: flex-start; */gap: 20px;/* display: inline-flex; */">
    <div style="width: 393px; height: 1px; position: relative; opacity: 0; background: #F5F5F5"></div>
    <div style="align-self: stretch; height: 43px; padding-left: 24px; padding-right: 24px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
        <div style="align-self: stretch; justify-content: space-between; align-items: flex-start; display: inline-flex">
            <div style="/* color: #2B2B2B; */font-size: 23px;font-family: Space Grotesk;font-weight: 700;word-wrap: break-word">$25.87</div>
            <div style="width: 20px; height: 20px; position: relative">
                <div style="width: 10.40px; height: 18px; left: 5.60px; top: 1px; position: absolute; background: #3E7F68"></div>
            </div>
        </div>
        <div style="align-self: stretch; justify-content: space-between; align-items: flex-end; display: inline-flex">
            <div style="height: 11px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                <div style="/* color: #666666; */font-size: 16px;font-family: Space Grotesk;font-weight: 500;word-wrap: break-word">Walmart</div>
                <div style="width: 4px; align-self: stretch; padding-top: 2px; justify-content: center; align-items: center; gap: 10px; display: flex">
                    <div style="width: 4px; height: 4px; background: #D9D9D9; border-radius: 9999px"></div>
                </div>
                <div style="width: 43px;align-self: stretch;/* color: #666666; */font-size: 12px;font-family: Space Grotesk;font-weight: 400;word-wrap: break-word">5 items</div>
            </div>
            <div style="/* color: #666666; */font-size: 12px;font-family: Space Grotesk;font-weight: 400;word-wrap: break-word">Jan 22, 2024</div>
        </div>
    </div>
    
</td>
</tr><tr>
    <td style="/* width: 100%; *//* height: 100%; *//* background: white; */flex-direction: column;/* justify-content: flex-start; *//* align-items: flex-start; */gap: 20px;/* display: inline-flex; */">
    <div style="width: 393px; height: 1px; position: relative; opacity: 0; background: #F5F5F5"></div>
    <div style="align-self: stretch; height: 43px; padding-left: 24px; padding-right: 24px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
        <div style="align-self: stretch; justify-content: space-between; align-items: flex-start; display: inline-flex">
            <div style="/* color: #2B2B2B; */font-size: 23px;font-family: Space Grotesk;font-weight: 700;word-wrap: break-word">$25.87</div>
            <div style="width: 20px; height: 20px; position: relative">
                <div style="width: 10.40px; height: 18px; left: 5.60px; top: 1px; position: absolute; background: #3E7F68"></div>
            </div>
        </div>
        <div style="align-self: stretch; justify-content: space-between; align-items: flex-end; display: inline-flex">
            <div style="height: 11px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                <div style="/* color: #666666; */font-size: 16px;font-family: Space Grotesk;font-weight: 500;word-wrap: break-word">Walmart</div>
                <div style="width: 4px; align-self: stretch; padding-top: 2px; justify-content: center; align-items: center; gap: 10px; display: flex">
                    <div style="width: 4px; height: 4px; background: #D9D9D9; border-radius: 9999px"></div>
                </div>
                <div style="width: 43px;align-self: stretch;/* color: #666666; */font-size: 12px;font-family: Space Grotesk;font-weight: 400;word-wrap: break-word">5 items</div>
            </div>
            <div style="/* color: #666666; */font-size: 12px;font-family: Space Grotesk;font-weight: 400;word-wrap: break-word">Jan 22, 2024</div>
        </div>
    </div>
    
</td>
</tr><tr>
    <td style="/* width: 100%; *//* height: 100%; *//* background: white; */flex-direction: column;/* justify-content: flex-start; *//* align-items: flex-start; */gap: 20px;/* display: inline-flex; */">
    <div style="width: 393px; height: 1px; position: relative; opacity: 0; background: #F5F5F5"></div>
    <div style="align-self: stretch; height: 43px; padding-left: 24px; padding-right: 24px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
        <div style="align-self: stretch; justify-content: space-between; align-items: flex-start; display: inline-flex">
            <div style="/* color: #2B2B2B; */font-size: 23px;font-family: Space Grotesk;font-weight: 700;word-wrap: break-word">$25.87</div>
            <div style="width: 20px; height: 20px; position: relative">
                <div style="width: 10.40px; height: 18px; left: 5.60px; top: 1px; position: absolute; background: #3E7F68"></div>
            </div>
        </div>
        <div style="align-self: stretch; justify-content: space-between; align-items: flex-end; display: inline-flex">
            <div style="height: 11px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                <div style="/* color: #666666; */font-size: 16px;font-family: Space Grotesk;font-weight: 500;word-wrap: break-word">Walmart</div>
                <div style="width: 4px; align-self: stretch; padding-top: 2px; justify-content: center; align-items: center; gap: 10px; display: flex">
                    <div style="width: 4px; height: 4px; background: #D9D9D9; border-radius: 9999px"></div>
                </div>
                <div style="width: 43px;align-self: stretch;/* color: #666666; */font-size: 12px;font-family: Space Grotesk;font-weight: 400;word-wrap: break-word">5 items</div>
            </div>
            <div style="/* color: #666666; */font-size: 12px;font-family: Space Grotesk;font-weight: 400;word-wrap: break-word">Jan 22, 2024</div>
        </div>
    </div>
    
</td>
</tr><tr>
    <td style="/* width: 100%; *//* height: 100%; *//* background: white; */flex-direction: column;/* justify-content: flex-start; *//* align-items: flex-start; */gap: 20px;/* display: inline-flex; */">
    <div style="width: 393px; height: 1px; position: relative; opacity: 0; background: #F5F5F5"></div>
    <div style="align-self: stretch; height: 43px; padding-left: 24px; padding-right: 24px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
        <div style="align-self: stretch; justify-content: space-between; align-items: flex-start; display: inline-flex">
            <div style="/* color: #2B2B2B; */font-size: 23px;font-family: Space Grotesk;font-weight: 700;word-wrap: break-word">$25.87</div>
            <div style="width: 20px; height: 20px; position: relative">
                <div style="width: 10.40px; height: 18px; left: 5.60px; top: 1px; position: absolute; background: #3E7F68"></div>
            </div>
        </div>
        <div style="align-self: stretch; justify-content: space-between; align-items: flex-end; display: inline-flex">
            <div style="height: 11px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                <div style="/* color: #666666; */font-size: 16px;font-family: Space Grotesk;font-weight: 500;word-wrap: break-word">Walmart</div>
                <div style="width: 4px; align-self: stretch; padding-top: 2px; justify-content: center; align-items: center; gap: 10px; display: flex">
                    <div style="width: 4px; height: 4px; background: #D9D9D9; border-radius: 9999px"></div>
                </div>
                <div style="width: 43px;align-self: stretch;/* color: #666666; */font-size: 12px;font-family: Space Grotesk;font-weight: 400;word-wrap: break-word">5 items</div>
            </div>
            <div style="/* color: #666666; */font-size: 12px;font-family: Space Grotesk;font-weight: 400;word-wrap: break-word">Jan 22, 2024</div>
        </div>
    </div>
    
</td>
</tr><tr>
    <td style="/* width: 100%; *//* height: 100%; *//* background: white; */flex-direction: column;/* justify-content: flex-start; *//* align-items: flex-start; */gap: 20px;/* display: inline-flex; */">
    <div style="width: 393px; height: 1px; position: relative; opacity: 0; background: #F5F5F5"></div>
    <div style="align-self: stretch; height: 43px; padding-left: 24px; padding-right: 24px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
        <div style="align-self: stretch; justify-content: space-between; align-items: flex-start; display: inline-flex">
            <div style="/* color: #2B2B2B; */font-size: 23px;font-family: Space Grotesk;font-weight: 700;word-wrap: break-word">$25.87</div>
            <div style="width: 20px; height: 20px; position: relative">
                <div style="width: 10.40px; height: 18px; left: 5.60px; top: 1px; position: absolute; background: #3E7F68"></div>
            </div>
        </div>
        <div style="align-self: stretch; justify-content: space-between; align-items: flex-end; display: inline-flex">
            <div style="height: 11px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                <div style="/* color: #666666; */font-size: 16px;font-family: Space Grotesk;font-weight: 500;word-wrap: break-word">Walmart</div>
                <div style="width: 4px; align-self: stretch; padding-top: 2px; justify-content: center; align-items: center; gap: 10px; display: flex">
                    <div style="width: 4px; height: 4px; background: #D9D9D9; border-radius: 9999px"></div>
                </div>
                <div style="width: 43px;align-self: stretch;/* color: #666666; */font-size: 12px;font-family: Space Grotesk;font-weight: 400;word-wrap: break-word">5 items</div>
            </div>
            <div style="/* color: #666666; */font-size: 12px;font-family: Space Grotesk;font-weight: 400;word-wrap: break-word">Jan 22, 2024</div>
        </div>
    </div>
    
</td>
</tr><tr>
    <td style="/* width: 100%; *//* height: 100%; *//* background: white; */flex-direction: column;/* justify-content: flex-start; *//* align-items: flex-start; */gap: 20px;/* display: inline-flex; */">
    <div style="width: 393px; height: 1px; position: relative; opacity: 0; background: #F5F5F5"></div>
    <div style="align-self: stretch; height: 43px; padding-left: 24px; padding-right: 24px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
        <div style="align-self: stretch; justify-content: space-between; align-items: flex-start; display: inline-flex">
            <div style="/* color: #2B2B2B; */font-size: 23px;font-family: Space Grotesk;font-weight: 700;word-wrap: break-word">$25.87</div>
            <div style="width: 20px; height: 20px; position: relative">
                <div style="width: 10.40px; height: 18px; left: 5.60px; top: 1px; position: absolute; background: #3E7F68"></div>
            </div>
        </div>
        <div style="align-self: stretch; justify-content: space-between; align-items: flex-end; display: inline-flex">
            <div style="height: 11px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                <div style="/* color: #666666; */font-size: 16px;font-family: Space Grotesk;font-weight: 500;word-wrap: break-word">Walmart</div>
                <div style="width: 4px; align-self: stretch; padding-top: 2px; justify-content: center; align-items: center; gap: 10px; display: flex">
                    <div style="width: 4px; height: 4px; background: #D9D9D9; border-radius: 9999px"></div>
                </div>
                <div style="width: 43px;align-self: stretch;/* color: #666666; */font-size: 12px;font-family: Space Grotesk;font-weight: 400;word-wrap: break-word">5 items</div>
            </div>
            <div style="/* color: #666666; */font-size: 12px;font-family: Space Grotesk;font-weight: 400;word-wrap: break-word">Jan 22, 2024</div>
        </div>
    </div>
    
</td>
</tr><tr>
    <td style="/* width: 100%; *//* height: 100%; *//* background: white; */flex-direction: column;/* justify-content: flex-start; *//* align-items: flex-start; */gap: 20px;/* display: inline-flex; */">
    <div style="width: 393px; height: 1px; position: relative; opacity: 0; background: #F5F5F5"></div>
    <div style="align-self: stretch; height: 43px; padding-left: 24px; padding-right: 24px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex">
        <div style="align-self: stretch; justify-content: space-between; align-items: flex-start; display: inline-flex">
            <div style="/* color: #2B2B2B; */font-size: 23px;font-family: Space Grotesk;font-weight: 700;word-wrap: break-word">$25.87</div>
            <div style="width: 20px; height: 20px; position: relative">
                <div style="width: 10.40px; height: 18px; left: 5.60px; top: 1px; position: absolute; background: #3E7F68"></div>
            </div>
        </div>
        <div style="align-self: stretch; justify-content: space-between; align-items: flex-end; display: inline-flex">
            <div style="height: 11px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                <div style="/* color: #666666; */font-size: 16px;font-family: Space Grotesk;font-weight: 500;word-wrap: break-word">Walmart</div>
                <div style="width: 4px; align-self: stretch; padding-top: 2px; justify-content: center; align-items: center; gap: 10px; display: flex">
                    <div style="width: 4px; height: 4px; background: #D9D9D9; border-radius: 9999px"></div>
                </div>
                <div style="width: 43px;align-self: stretch;/* color: #666666; */font-size: 12px;font-family: Space Grotesk;font-weight: 400;word-wrap: break-word">5 items</div>
            </div>
            <div style="/* color: #666666; */font-size: 12px;font-family: Space Grotesk;font-weight: 400;word-wrap: break-word">Jan 22, 2024</div>
        </div>
    </div>
    
</td>
</tr></tbody></table>
`

components.home.body.children[2].children[0].children.push(bottomBtn('home-button.png'), cameraBtn('camera-button.png'), bottomBtn('profile-button.png'));

document.addEventListener('DOMContentLoaded', function() {
	jsl.dom.add(document.body, components.login.body);
});

