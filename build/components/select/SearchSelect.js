customElements.define(
	"autocomplete-input",
	require("./components/select/Autocomplete-input")
);
customElements.define(
	"autocomplete-dropdown",
	require("./components/select/Autocomplete-dropdown")
);

class SearchSelect extends HTMLElement {
	constructor() {
		super();

		// hard-coded because the list will probably not change over time
		// less requests, less API calls
		this.currenciesList = {
			AED: "United Arab Emirates Dirham",
			AFN: "Afghan Afghani",
			ALL: "Albanian Lek",
			AMD: "Armenian Dram",
			ANG: "Netherlands Antillean Guilder",
			AOA: "Angolan Kwanza",
			ARS: "Argentine Peso",
			AUD: "Australian Dollar",
			AWG: "Aruban Florin",
			AZN: "Azerbaijani Manat",
			BAM: "Bosnia-Herzegovina Convertible Mark",
			BBD: "Barbadian Dollar",
			BDT: "Bangladeshi Taka",
			BGN: "Bulgarian Lev",
			BHD: "Bahraini Dinar",
			BIF: "Burundian Franc",
			BMD: "Bermudan Dollar",
			BND: "Brunei Dollar",
			BOB: "Bolivian Boliviano",
			BRL: "Brazilian Real",
			BSD: "Bahamian Dollar",
			BTC: "Bitcoin",
			BTN: "Bhutanese Ngultrum",
			BWP: "Botswanan Pula",
			BYN: "New Belarusian Ruble",
			BYR: "Belarusian Ruble",
			BZD: "Belize Dollar",
			CAD: "Canadian Dollar",
			CDF: "Congolese Franc",
			CHF: "Swiss Franc",
			CLF: "Chilean Unit of Account (UF)",
			CLP: "Chilean Peso",
			CNY: "Chinese Yuan",
			COP: "Colombian Peso",
			CRC: "Costa Rican Colón",
			CUC: "Cuban Convertible Peso",
			CUP: "Cuban Peso",
			CVE: "Cape Verdean Escudo",
			CZK: "Czech Republic Koruna",
			DJF: "Djiboutian Franc",
			DKK: "Danish Krone",
			DOP: "Dominican Peso",
			DZD: "Algerian Dinar",
			EGP: "Egyptian Pound",
			ERN: "Eritrean Nakfa",
			ETB: "Ethiopian Birr",
			EUR: "Euro",
			FJD: "Fijian Dollar",
			FKP: "Falkland Islands Pound",
			GBP: "British Pound Sterling",
			GEL: "Georgian Lari",
			GGP: "Guernsey Pound",
			GHS: "Ghanaian Cedi",
			GIP: "Gibraltar Pound",
			GMD: "Gambian Dalasi",
			GNF: "Guinean Franc",
			GTQ: "Guatemalan Quetzal",
			GYD: "Guyanaese Dollar",
			HKD: "Hong Kong Dollar",
			HNL: "Honduran Lempira",
			HRK: "Croatian Kuna",
			HTG: "Haitian Gourde",
			HUF: "Hungarian Forint",
			IDR: "Indonesian Rupiah",
			ILS: "Israeli New Sheqel",
			IMP: "Manx pound",
			INR: "Indian Rupee",
			IQD: "Iraqi Dinar",
			IRR: "Iranian Rial",
			ISK: "Icelandic Króna",
			JEP: "Jersey Pound",
			JMD: "Jamaican Dollar",
			JOD: "Jordanian Dinar",
			JPY: "Japanese Yen",
			KES: "Kenyan Shilling",
			KGS: "Kyrgystani Som",
			KHR: "Cambodian Riel",
			KMF: "Comorian Franc",
			KPW: "North Korean Won",
			KRW: "South Korean Won",
			KWD: "Kuwaiti Dinar",
			KYD: "Cayman Islands Dollar",
			KZT: "Kazakhstani Tenge",
			LAK: "Laotian Kip",
			LBP: "Lebanese Pound",
			LKR: "Sri Lankan Rupee",
			LRD: "Liberian Dollar",
			LSL: "Lesotho Loti",
			LTL: "Lithuanian Litas",
			LVL: "Latvian Lats",
			LYD: "Libyan Dinar",
			MAD: "Moroccan Dirham",
			MDL: "Moldovan Leu",
			MGA: "Malagasy Ariary",
			MKD: "Macedonian Denar",
			MMK: "Myanma Kyat",
			MNT: "Mongolian Tugrik",
			MOP: "Macanese Pataca",
			MRO: "Mauritanian Ouguiya",
			MUR: "Mauritian Rupee",
			MVR: "Maldivian Rufiyaa",
			MWK: "Malawian Kwacha",
			MXN: "Mexican Peso",
			MYR: "Malaysian Ringgit",
			MZN: "Mozambican Metical",
			NAD: "Namibian Dollar",
			NGN: "Nigerian Naira",
			NIO: "Nicaraguan Córdoba",
			NOK: "Norwegian Krone",
			NPR: "Nepalese Rupee",
			NZD: "New Zealand Dollar",
			OMR: "Omani Rial",
			PAB: "Panamanian Balboa",
			PEN: "Peruvian Nuevo Sol",
			PGK: "Papua New Guinean Kina",
			PHP: "Philippine Peso",
			PKR: "Pakistani Rupee",
			PLN: "Polish Zloty",
			PYG: "Paraguayan Guarani",
			QAR: "Qatari Rial",
			RON: "Romanian Leu",
			RSD: "Serbian Dinar",
			RUB: "Russian Ruble",
			RWF: "Rwandan Franc",
			SAR: "Saudi Riyal",
			SBD: "Solomon Islands Dollar",
			SCR: "Seychellois Rupee",
			SDG: "Sudanese Pound",
			SEK: "Swedish Krona",
			SGD: "Singapore Dollar",
			SHP: "Saint Helena Pound",
			SLL: "Sierra Leonean Leone",
			SOS: "Somali Shilling",
			SRD: "Surinamese Dollar",
			STD: "São Tomé and Príncipe Dobra",
			SVC: "Salvadoran Colón",
			SYP: "Syrian Pound",
			SZL: "Swazi Lilangeni",
			THB: "Thai Baht",
			TJS: "Tajikistani Somoni",
			TMT: "Turkmenistani Manat",
			TND: "Tunisian Dinar",
			TOP: "Tongan Paʻanga",
			TRY: "Turkish Lira",
			TTD: "Trinidad and Tobago Dollar",
			TWD: "New Taiwan Dollar",
			TZS: "Tanzanian Shilling",
			UAH: "Ukrainian Hryvnia",
			UGX: "Ugandan Shilling",
			USD: "United States Dollar",
			UYU: "Uruguayan Peso",
			UZS: "Uzbekistan Som",
			VEF: "Venezuelan Bolívar Fuerte",
			VND: "Vietnamese Dong",
			VUV: "Vanuatu Vatu",
			WST: "Samoan Tala",
			XAF: "CFA Franc BEAC",
			XAG: "Silver (troy ounce)",
			XAU: "Gold (troy ounce)",
			XCD: "East Caribbean Dollar",
			XDR: "Special Drawing Rights",
			XOF: "CFA Franc BCEAO",
			XPF: "CFP Franc",
			YER: "Yemeni Rial",
			ZAR: "South African Rand",
			ZMK: "Zambian Kwacha (pre-2013)",
			ZMW: "Zambian Kwacha",
			ZWL: "Zimbabwean Dollar",
		};

		this.query = "";
		this.results = [];
		this.visibility = false;
		this.currency = "USD";
		this.country = "us";
		this.shadow = this.attachShadow({ mode: "open" });
	}

	filterMethod(options, query) {
		this.results = [];

		for (const [key, value] of Object.entries(this.currenciesList)) {
			if (value.toLowerCase().includes(query.toLowerCase())) {
				this.results.push(`${value} (${key})`);
			}
		}
	}

	async render() {
		this.shadow.innerHTML = `
			<style>
				.search-select {
					position: absolute;
					left: 12px;
					right: 12px;
					padding: 0 12px;
					background: white;
					border: 1px solid lightgray;
					border-radius: 20px;
					box-sizing: border-box;
					overflow: hidden;
				}
			</style>

			<div class="search-select">
				<autocomplete-input value="United States Dollar (USD)">
				</autocomplete-input>

				<autocomplete-dropdown results="${this.results}" visibility="${this.visibility}">
				</autocomplete-dropdown>
			</div>`;

		const inputElement = this.shadow.querySelector("autocomplete-input");

		inputElement.addEventListener("visibilityChanged", (event) => {
			this.visibility = event.detail.isVisible;

			this.shadow
				.querySelector("autocomplete-dropdown")
				.setAttribute("visibility", this.visibility);
		});

		inputElement.addEventListener("inputChanged", (event) => {
			this.query = event.detail.inputValue;

			this.filterMethod(this.currenciesList, this.query);

			this.shadow
				.querySelector("autocomplete-dropdown")
				.setAttribute("results", this.results);
		});

		this.shadow
			.querySelector("autocomplete-dropdown")
			.addEventListener("dropdownPicked", (event) => {
				const fullCurrencyName = event.detail.option.slice(0, -6);

				this.currency = Object.keys(this.currenciesList).find(
					(key) => this.currenciesList[key] === fullCurrencyName
				);

				inputElement.setAttribute("value", event.detail.option);

				let e = new CustomEvent("currencyChanged", {
					detail: { currency: this.currency, fullName: fullCurrencyName },
				});
				this.dispatchEvent(e);
			});
	}

	connectedCallback() {
		for (const [key, value] of Object.entries(this.currenciesList)) {
			this.results.push(`${value} (${key})`);
		}

		this.render();
	}
}

customElements.define("search-select", SearchSelect);
