class AutocompleteInput extends HTMLElement {
	constructor() {
		super();

		this.shadow = this.attachShadow({ mode: "open" });
	}

	setQuery(event) {
		let e = new CustomEvent("inputChanged", {
			bubbles: true,
			detail: { inputValue: event.target.value },
			composed: true,
		});
		this.dispatchEvent(e);
	}

	get value() {
		return this.getAttribute("value");
	}

	static get observedAttributes() {
		return ["value"];
	}

	attributeChangedCallback(prop, oldValue, newValue) {
		this.render();
	}

	render() {
		this.shadow.innerHTML = `
			<style>
				input {
					width: 100%;
					height: 40px;
					border: none;

					display: block;
					padding: 8px;
					
					font-size: 14px;
					box-sizing: border-box;

					font-family: "Oxygen", sans-serif;
				}
				
				input:focus {
					outline: 0;
				}
			</style>
		
			<input
				type="text"
				placeholder="USD"
				value="${this.value}"
			/>`;

		this.shadow.querySelector("input").addEventListener("keyup", this.setQuery);

		this.shadow.querySelector("input").addEventListener("focus", () => {
			let e = new CustomEvent("visibilityChanged", {
				detail: { isVisible: true },
			});
			this.dispatchEvent(e);
		});

		document.addEventListener("click", (event) => {
			if (!event.target.matches("search-select")) {
				let e = new CustomEvent("visibilityChanged", {
					detail: { isVisible: false },
				});

				this.dispatchEvent(e);
			}
		});
	}

	connectedCallback() {
		this.render();
	}
}

module.exports = AutocompleteInput;
// customElements.define("autocomplete-input", AutocompleteInput);
