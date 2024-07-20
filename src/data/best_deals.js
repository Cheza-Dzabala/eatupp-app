import food1 from '../images/food/food1.png';
import food2 from '../images/food/food2.png';

class Deal {
	// Generate a constructor for the Deal class, Fields should be PercentageOff, ProductName, ProductImage, ProductPrice, ProductDescription, ProductCategory, Deal Duration
	constructor(
		percentageOff,
		productName,
		productImage,
		productPrice,
		productDescription,
		productCategory,
		dealDuration,
		dealId
	) {
		this.percentageOff = percentageOff;
		this.productName = productName;
		this.productImage = productImage;
		this.productPrice = productPrice;
		this.productDescription = productDescription;
		this.productCategory = productCategory;
		this.dealDuration = dealDuration;
		this.id = dealId;
	}
}

const Deal1 = new Deal(
	'16%',
	'Chickpea Soup',
	food1,
	'Mk 4,300.00',
	'A delicious soup made with chickpeas and spices',
	'Oriental Food',
	'4 Days',
	1
);

const Deal2 = new Deal(
	'10%',
	'Masala Briyanni',
	food2,
	'Mk 8,300.00',
	'Masala brew with excellent meat',
	'Indian',
	'2 Days',
	2
);

export const BestDealData = [Deal1, Deal2];
