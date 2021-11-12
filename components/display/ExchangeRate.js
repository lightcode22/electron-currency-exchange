class ExchangeRate extends HTMLElement {
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

	get fullName() {
		return this.getAttribute("fullName");
	}

	static get observedAttributes() {
		return ["rate", "currency"];
	}

	attributeChangedCallback(prop, oldValue, newValue) {
		this.render();
	}

	async render() {
		let country;

		const matchList = await fetch("http://country.io/currency.json").then(
			(res) => res.json()
		);

		// ANG is for Netherlands Antillean Guilder
		// Netherlands - nl
		if (this.currency.slice(0, 2) === "AN") {
			country = "nl";
		} else {
			country = Object.keys(matchList)
				.find((key) => key === this.currency.slice(0, 2))
				.toLowerCase();
		}

		this.shadow.innerHTML = `
		<style>
			.exchange-rate {
				height: 96px;
				width: 100%;

				margin-top: 80px;
				padding: 0 20px;

				background-color: #5271f9;
				color: white;

				border-radius: 8px;

				box-sizing: border-box;

				display: flex;
				align-items: center;
			}

			

			.flag {
				width: 46px;
				height: 46px;

				background-color: white;
				background: url('https://flagcdn.com/${country}.svg') no-repeat;
				background-size: cover;
				background-position: center center;

				box-sizing: border-box;

				border: 1px solid lightgray;
				border-radius: 50%;

				display: inline-block;
			}

			.name {
				width: 150px;
				padding-left: 20px;
				box-sizing: border-box;
				display: inline-block;
			}

			.name span {
				display: block;
			}

			.short {
				display: inline-block;
				font-size: 16px;
				font-weight: 700;
				margin-bottom: 4px;
			}

			.full {
				font-size: 13px;
			}

			.display {
				font-size: 32px;
				text-align: right;
				width: 150px;
				display: inline-block;
			}

			.display span {
				font-size: 16px;
				font-weight: 700px;
			}
		</style>
		
		<div class="exchange-rate">
			<div class="flag"></div>

			<div class="name">
				<span class="short">${this.currency}</span>
				<span class="full">${this.fullName}</span>
			</div>


			<div class="display">${
				(1 / this.rate).toFixed(2) <= 0.01
					? (1 / this.rate).toFixed(3)
					: (1 / this.rate).toFixed(2)
			}
				<span>€</span>
			</div>
		</div>`;
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define("exchange-rate", ExchangeRate);
