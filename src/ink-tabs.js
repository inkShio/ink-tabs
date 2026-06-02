export default class InkTabs {
	constructor(selector, options = {}) {
		this.selector = selector;
		this.options = {
			defaultTab: 0,
			scroll: false,
			offset: 0,
			hash: false,
			a11y: true,
			classNames: {
				container: 'ink-tabs',
				nav: 'ink-tabs__nav',
				item: 'ink-tabs__item',
				itemActive: 'active',
				button: 'ink-tabs__button',
				buttonActive: 'active',
				content: 'ink-tabs__content',
				panel: 'ink-tabs__panel',
				panelActive: 'active'
			},
			isChanged: () => { },
			...options,
		};

		this.tabs = document.querySelectorAll(this.selector);

		if (this.tabs.length > 0) {
			this.tabs.forEach(tab => this.init(tab));
		}
	}

	init(tab) {
		const nav = tab.querySelector(`.${this.options.classNames.nav}`);
		const buttons = nav.querySelectorAll(`.${this.options.classNames.button}`);
		const content = tab.querySelector(`.${this.options.classNames.content}`);
		const panels = content.querySelectorAll(`:scope > .${this.options.classNames.panel}`);

		this.setDefaultTab(tab, buttons, panels);
		this.bindEvents(tab, buttons, panels);
	}

	bindEvents(tab, buttons, panels) {
		buttons.forEach((button, index) => {
			button.addEventListener('click', (event) => {
				event.preventDefault();

				const link = button.dataset.tabLink;
				const target = button.dataset.tabLinkTarget;

				if (link) {
					window.open(link, target || '_self');
				} else {
					this.activateTab(tab, index, button, buttons, panels);
					this.handleHash(index, button);

					if (typeof this.options.isChanged === 'function') {
						this.options.isChanged(tab);
					}
				}
			});
		});

		if (this.options.hash) {
			window.addEventListener('hashchange', () => {
				this.handleHashChange(tab, buttons, panels);
			});
			this.handleHashChange(tab, buttons, panels);
		}
	}

	setDefaultTab(tab, buttons, panels) {
		let defaultIndex;

		if (typeof this.options.defaultTab === 'number') {
			defaultIndex = this.options.defaultTab;
		} else if (typeof this.options.defaultTab === 'string') {
			const targetButton = [...buttons].find(btn => btn.dataset.tabTarget === this.options.defaultTab);
			defaultIndex = targetButton ? [...buttons].indexOf(targetButton) : 0;
		} else {
			defaultIndex = 0;
		}

		if (this.options.a11y) {
			buttons.forEach((button, i) => {
				button.setAttribute('role', 'tab');
				button.setAttribute('aria-selected', 'false');
				button.setAttribute('tabindex', '-1');

				if (!button.dataset.tabTarget) {
					const customID = Math.random().toString(16).slice(2);

					button.setAttribute('id', `inktab_button-${customID}`);
					button.setAttribute('aria-controls', `inktab_panel-${customID}`);
					panels[i].setAttribute('id', `inktab_panel-${customID}`);
					panels[i].setAttribute('aria-labelledby', `inktab_button-${customID}`);
				} else {
					const targetID = button.dataset.tabTarget;

					button.setAttribute('id', targetID);
					button.setAttribute('aria-controls', `inktab_panel-${targetID}`);
					panels[i].setAttribute('id', `inktab_panel-${targetID}`);
					panels[i].setAttribute('aria-labelledby', targetID);
				}
			});

			panels.forEach((panel, i) => {
				panel.setAttribute('tabindex', '-1');
			});
		}

		this.activateTab(null, defaultIndex, buttons[defaultIndex], buttons, panels);

		if (typeof this.options.isChanged === 'function') {
			this.options.isChanged(tab);
		}
	}

	activateTab(tab, index, clickedButton, buttons, panels) {
		if (clickedButton.classList.contains(this.options.classNames.buttonActive)) return;

		buttons.forEach((button, i) => {
			button.classList.remove(this.options.classNames.buttonActive);
			button.closest(`.${this.options.classNames.item}`).classList.remove(this.options.classNames.itemActive);

			if (this.options.a11y) {
				button.setAttribute('aria-selected', 'false');
				button.setAttribute('tabindex', '-1');
			}
		});

		panels.forEach((panel, i) => {
			panel.classList.remove(this.options.classNames.panelActive);

			if (this.options.a11y) {
				panel.setAttribute('tabindex', '-1');
			}
		});

		clickedButton.classList.add(this.options.classNames.buttonActive);
		clickedButton.closest(`.${this.options.classNames.item}`).classList.add(this.options.classNames.itemActive);
		panels[index].classList.add(this.options.classNames.panelActive);

		if (this.options.a11y) {
			clickedButton.setAttribute('aria-selected', 'true');
			clickedButton.removeAttribute('tabindex');
			panels[index].removeAttribute('tabindex');
		}

		this.handleScroll(tab);
		this.handleFetch(index, clickedButton, panels);
	}

	handleScroll(tab) {
		if (this.options.scroll && tab) {
			const tabTop = tab.getBoundingClientRect().top;
			const scrollTop = document.documentElement.scrollTop;
			const offset = this.options.offset;

			window.scrollTo({
				top: tabTop + scrollTop - offset,
				behavior: 'smooth',
			});
		}
	}

	handleHash(index, clickedButton) {
		if (this.options.hash) {
			let hash = clickedButton.dataset.tabTarget;

			if (!hash) hash = `tab-${index + 1}`;
			window.location.hash = hash;
		}
	}

	handleHashChange(tab, buttons, panels) {
		const hash = window.location.hash.substring(1);

		if (hash) {
			let targetButton = [...buttons].find(btn => btn.dataset.tabTarget === hash);

			if (!targetButton) {
				const index = parseInt(hash.split('-')[1]);
				targetButton = buttons[index - 1];
			}

			if (targetButton) {
				const index = [...buttons].indexOf(targetButton);
				this.activateTab(null, index, targetButton, buttons, panels);

				if (typeof this.options.isChanged === 'function') {
					this.options.isChanged(tab);
				}
			}
		} else {
			this.setDefaultTab(null, buttons, panels);
		}
	}

	handleFetch(index, clickedButton, panels) {
		const url = clickedButton.dataset.tabLoad;
		const selector = clickedButton.dataset.tabChunk;

		if (url) {
			fetch(url)
				.then((response) => response.text())
				.then((data) => {
					if (selector) {
						const parser = new DOMParser();
						const doc = parser.parseFromString(data, 'text/html');
						const element = doc.querySelector(selector);

						if (element) {
							panels[index].innerHTML = element.innerHTML;
						} else {
							console.error(`Element with selector '${selector}' not found in fetched content from '${url}'.`);
						}
					} else {
						panels[index].innerHTML = data;
					}
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
					panels[index].innerHTML = 'Error loading content.';
				});
		}
	}
}
