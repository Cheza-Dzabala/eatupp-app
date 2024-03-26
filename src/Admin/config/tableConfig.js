const baseURL = process.env.REACT_APP_API_URL;
export const tableOptions = (onRowClick) => {
	return {
		elevation: 0,
		rowsPerPage: 5,
		// select table row
		onRowClick: onRowClick,
	};
};

export const viewOrderTableHeaders = [
	{
		name: 'image',
		label: 'image',
		options: {
			customBodyRender: (value, tableMeta, updateValue) => {
				return (
					<img
						src={value}
						className="image-on-table"
						alt="item"
						style={{ width: '100px' }}
					/>
				);
			},
		},
	},

	{
		name: 'name',
		label: 'Name',
	},

	{
		name: 'unitPrice',
		label: 'Unit Price',
		options: {
			customBodyRender: (value, tableMeta, updateValue) => {
				return (
					<p>
						{Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'MWK',
						}).format(value)}
					</p>
				);
			},
		},
	},
	{
		name: 'quantity',
		label: 'quantity',
	},
	{
		name: 'total',
		label: 'total',
		options: {
			customBodyRender: (value, tableMeta, updateValue) => {
				return (
					<p>
						{Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'MWK',
						}).format(value)}
					</p>
				);
			},
		},
	},
];

export const menuTableHeaders = [
	{
		name: 'id',
		label: 'id',
	},
	{
		name: 'image',
		label: 'image',
	},
	{
		name: 'name',
		label: 'Name',
	},
	{
		name: 'description',
		label: 'Description',
	},
	{
		name: 'itemCount',
		label: 'item count',
	},
];

export const viewMenuItemsTableHeaders = [
	{
		name: 'id',
		label: 'Item id',
	},
	{
		name: 'name',
		label: 'Name',
	},
	{
		name: 'description',
		label: 'Description',
	},
	{
		name: 'image',
		label: 'Image',
		options: {
			customBodyRender: (value, tableMeta, updateValue) => {
				return (
					<img
						src={`${value}`}
						className="image-on-table"
						alt="item"
						style={{ width: '100px' }}
					/>
				);
			},
		},
	},
];
