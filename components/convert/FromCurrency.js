class FromCurrency extends HTMLElement {
	constructor() {
		super();

		this.shadow = this.attachShadow({ mode: "open" });
	}

	get currency() {
		return this.getAttribute("currency");
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
			.from-block {
				box-sizing: border-box;
				width: 100%;
				padding: 36px;
                margin-bottom: 1px;
				background-color: #5876ff;
				color: white;
				border-radius: 8px 8px 0 0;
			}

			input {
				font-size: 24px;
				width: 276px;
				border: none;
				border-bottom: 1px solid white;
				font-family: "Oxygen", sans-serif;
				background-color: #5876ff;
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

		<div class="from-block">
            <input value="${this.value}" />
			<span>${this.currency}</span>
		</div>`;

		this.shadow.querySelector("input").addEventListener("keyup", this.setQuery);
	}

	connectedCallback() {
		this.render();
	}
}

module.exports = FromCurrency;
