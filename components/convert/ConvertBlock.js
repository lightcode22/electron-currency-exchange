customElements.define(
	"from-currency",
	require("./components/convert/FromCurrency")
);
customElements.define(
	"to-currency",
	require("./components/convert/ToCurrency")
);

class ConvertBlock extends HTMLElement {
	constructor() {
		super();

		this.shadow = this.attachShadow({ mode: "open" });
	}

	get rate() {
		return this.getAttribute("rate");
	}

	get currency() {
		return this.getAttribute("currency");
	}

	static get observedAttributes() {
		return ["rate", "currency"];
	}

	attributeChangedCallback(prop, oldValue, newValue) {
		this.render();
	}

	render() {
		this.shadow.innerHTML = `
		<style>
			.convert-block {
				box-sizing: border-box;
				width: 100%;
				margin: 40px 0 0;
			}
		</style>
		
		<div class="convert-block">
			<from-currency currency="${this.currency}" value="1"></from-currency>
			<to-currency value="${1 / this.rate}"></to-currency>
		</div>`;

		const fromCurrency = this.shadow.querySelector("from-currency");
		const toCurrency = this.shadow.querySelector("to-currency");

		fromCurrency.addEventListener("inputChanged", (event) => {
			toCurrency.setAttribute("value", event.detail.inputValue / this.rate);
		});

		toCurrency.addEventListener("inputChanged", (event) => {
			fromCurrency.setAttribute("value", event.detail.inputValue * this.rate);
		});
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define("convert-block", ConvertBlock);
