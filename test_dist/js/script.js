(function () {

	let jsonData = null;

	function init() {
		readJson();
	}

	// get data from json
	function readJson(sorting) {
		let sortingOrder = sorting;
		if (!sortingOrder) {
			sortingOrder = "index";
		}

		// original task json url
		// $.getJSON("https://api.jsonbin.io/b/5cae9a54fb42337645ebcad3"

		$.getJSON("js/products.json",
			function (data) {
				jsonData = data;
				populateProducts(jsonData, sortingOrder);
			});
	}

	// get products data
	function populateProducts(jsonObj, sortingOrder) {
		let products = jsonObj;
		const productsContainer = $(".js-products");
		let sorting = sortingOrder;

		//low to high
		if (sorting === "price-low") {
			products.sort(sort_by('price', true,
				function (a) {
					return parseFloat(a.slice(1));
				}));
		}

		//high to low
		if (sorting === "price-high") {

			products.sort(sort_by('price', false,
				function (a) {
					return parseFloat(a.slice(1));
				}));
		}

		// build products grid
		for (let i = 0; i < products.length; i++) {

			// storing data from json
			let productName = products[i]["productName"];
			let productImage = products[i]["productImage"];
			let price = products[i]["price"];
			let isSale = products[i]["isSale"];
			let isExclusive = products[i]["isExclusive"];
			let sizeArray = products[i]["size"];

			// creating a single product block element
			const singleProductContainer = $("<div class='column product-item'>");
			const imagesPath = "images/products/";

			productsContainer.append(singleProductContainer);

			singleProductContainer.html(
				"<a href='#'>" +
				"<div>" +
				"<div class='product-image'>" +
				"<img src='" +
				imagesPath +
				productImage +
				"' alt='" +
				productName +
				"'>" +
				"</div>");

			// label Sale items
			if (isSale) {
				singleProductContainer.append(
					"<div class='label--sale'>Sale</div>"
				).addClass("filter-sale");
			}

			// label Exclusive items
			if (isExclusive) {
				singleProductContainer.append(
					"<div class='label--exclusive'>Exclusive</div>"
				).addClass("filter-exclusive");
			}

			// empty label to keep the height of product blocks
			if (!isSale && !isExclusive) {
				singleProductContainer.append(
					"<div class='label--empty'>&nbsp;</div>"
				)
			}

			singleProductContainer.append(
				"<div class='product-info'>" +
				"<h4>" +
				productName +
				"</h4>" +
				"<div class='product-price'>" +
				price +
				"</div>" +
				"</div>" +
				"</div>" +
				"</a>"
			);

			// filter by sizes - add class names
			for (let j = 0; j < sizeArray.length; j++) {
				let size = sizeArray[j].toLowerCase();

				singleProductContainer.addClass(size);
			}

		}
	}

	// filter products
	function filterProducts() {
		// on select change
		$("#js-filter").change(function () {
			// get the filter value
			let filterValue = $(this).val();
			// get a list of all products
			let productItems = $(".js-products").children();

			// hide everything..
			productItems.hide();

			// ..and show only filtered results
			if (filterValue) {
				// filtering based on a class name, used for boolean values and sizes
				$('.' + filterValue).show();

				// showing sorted json - prices desc, asc
				if (filterValue === "filter-price-low") {
					readJson("price-low")
				}

				if (filterValue === "filter-price-high") {
					readJson("price-high")
				}
			} else {
				// show all products if there are no filters applied
				productItems.show();
			}

		});
	}

	// helper function - sorting
	// http://stackoverflow.com/questions/979256/how-to-sort-an-array-of-javascript-objects
	let sort_by = function (field, reverse, primer) {
		let key = function (x) {
			return primer ? primer(x[field]) : x[field]
		};

		return function (a, b) {
			let A = key(a), B = key(b);
			return ((A < B) ? -1 : ((A > B) ? 1 : 0)) * [-1, 1][+!!reverse];
		}
	};

	// global init
	$(document).ready(function () {
		init();
		filterProducts();
	});

})();