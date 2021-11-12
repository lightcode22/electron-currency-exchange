class ToCurrency extends HTMLElement {
	constructor() {
		super();

		this.shadow = this.attachShadow({ mode: "open" });
	}

	get value() {
		if (isNaN(this.getAttribute("value"))) {
			return "~";
		} else {
			return parseFloat(Number(this.getAttribute("value")).toFixed(2));
		}
	}

	setQuery(event) {
		let e = new CustomEvent("inputChanged", {
			bubbles: true,
			detail: { inputValue: event.target.value },
			composed: true,
		});

		this.dispatchEvent(e);
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
			.to-block {
				box-sizing: border-box;
				width: 100%;
				padding: 36px;
				background-color: #3459f4;
				color: white;
				border-radius: 0 0 8px 8px;
			}

			input {
				font-size: 24px;
				width: 270px;
				border: none;
				border-bottom: 1px solid white;
				font-family: "Oxygen", sans-serif;
				background-color: #3459f4;
				color: white;
			}

			input:focus {
				outline: none;
			}

			span {
				display: inline-block;
				width: 40px;
				text-align: right;
			}
		</style>
		
		<div class="to-block">
			<input value="${this.value}" />
			<span>EUR</span>
		</div>`;

		this.shadow.querySelector("input").addEventListener("keyup", this.setQuery);
	}

	connectedCallback() {
		this.render();
	}
}

module.exports = ToCurrency;
