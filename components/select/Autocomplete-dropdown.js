class AutocompleteDropdown extends HTMLElement {
	constructor() {
		super();

		this.shadow = this.attachShadow({ mode: "open" });
	}

	get results() {
		return this.getAttribute("results").split(",");
	}

	get visibility() {
		return this.getAttribute("visibility");
	}

	set visibility(val) {
		return this.setAttribute("visibility", val);
	}

	static get observedAttributes() {
		return ["results", "visibility"];
	}

	attributeChangedCallback(prop, oldValue, newValue) {
		this.render();
	}

	render() {
		this.shadow.innerHTML = `
			<style>
				.hidden {
					display: none;
				}

				.autocomplete-dropdown {
					position: absolute;
					top: 100%;
					left: 0;
					width: 100%;
					box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
					background-color: #fff;
					box-sizing: border-box;
				}

				.autocomplete-search-results-list {
					list-style: none;
					margin: 0;
					padding: 8px 0 16px;
					
					border-top: 1px solid lightgray;
  					max-height: 0;

					overflow: hidden;
					overflow-y: auto;

					animation: enlarge 0.25s forwards;
				}

				@keyframes enlarge {
					to {
						max-height: 10em;
					}
				}

				.autocomplete-search-result {
					font-size: 14px;

					padding: 8px 12px;
					cursor: pointer;
			
					height: 36px;

					box-sizing: border-box;
				}

				.autocomplete-search-result:hover {
					background-color: #fbfbfb;
					font-weight: 500;
				}
			</style>

         
            <ul class="autocomplete-search-results-list ${
							this.visibility === "true" ? "" : "hidden"
						}">
				${this.results
					.map((r) => '<li class="autocomplete-search-result">' + r + "</li>")
					.join("")}
            </ul>`;

		for (let item of this.shadow.querySelectorAll("li")) {
			item.addEventListener("click", (event) => {
				let e = new CustomEvent("dropdownPicked", {
					detail: {
						option: event.target.innerHTML,
					},
				});

				this.dispatchEvent(e);

				this.visibility = "hidden";
			});
		}
	}

	connectedCallback() {
		this.render();
	}
}

module.exports = AutocompleteDropdown;
// customElements.define("autocomplete-dropdown", AutocompleteDropdown);
