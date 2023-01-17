import React from 'react';
import { useEffect, useState } from 'react';
import DATA from '../src/data.json';
import { ExternalLink } from 'react-external-link';
import Header from './components/Header';

function App() {
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.pageYOffset > 900) {
				setShowButton(true);
			} else {
				setShowButton(false);
			}
		});
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	/* SEARCH & FILTER SYSTEM BELOW */

	const [searchText, setSearchText] = useState('');
	const [jsonFile, setJsonFile] = useState(DATA);

	// exclude column list from filter
	const excludeColumns = ['id'];

	const handleChange = (value) => {
		setSearchText(value);
		filterData(value);
	};

	// filter records by search text
	const filterData = (value) => {
		const lowercasedValue = value.toLowerCase().trim();
		if (lowercasedValue === '') setJsonFile(DATA);
		else {
			const filteredData = DATA.filter((item) => {
				return Object.keys(item).some((key1) =>
					excludeColumns.includes(key1)
						? false
						: item[key1].toString().toLowerCase().includes(lowercasedValue)
				);
			});
			setJsonFile(filteredData);
		}
	};

	return (
		<div className="w-full md:max-w-[1640px] mx-auto h-[100%] flex flex-col justify-center">
			<div>
				<Header />
			</div>

			<input
				className="py-4 pl-4 md:w-[650px] w-[90%] block mx-auto my-10 text-black"
				type="text"
				placeholder="Search something (order id, invoice number, date) ..."
				value={searchText}
				onChange={(e) => handleChange(e.target.value)}
			/>

			<div>
				{jsonFile.map((eSale, key) => {
					return (
						<div key={key} className="py-2 my-2 mb-4">
							{searchText === '' ? (
								<></>
							) : (
								<div className="border border-[#88f387] p-3">
									<div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
										<div className="bg-black text-white p-3 lg:max-w-[500px] flex flex-col justify-center">
											{/* CLIENT INFO */}
											<h1 className="font-bold mb-1 py-3 uppercase">
												Client Details:
											</h1>
											<p className="py-2">{`Name: ${eSale.client_name}`}</p>
											<p className="py-2">{`Total amount of purchases done by this client so far: ${eSale.total_purchased_in_euros} €`}</p>
											<p className="py-2">{`Fiscal Number: ${eSale.client_fiscal_number}`}</p>
											<p className="py-2">{`Billing Address: ${eSale.client_billing_address}`}</p>
											<p className="py-2">{`Email: ${eSale.client_email}`}</p>
											<p className="py-2">{`Mobile: ${eSale.client_mobile_number}`}</p>

											{eSale.online_order_notes !== '' ? (
												<span className="py-4 inline mt-4">{`Client Requests: ${eSale.online_order_notes}`}</span>
											) : (
												<></>
											)}
											<hr />
											{eSale.client_notes !== '' ? (
												<span className="py-4 inline mt-4">{`Client Notes by STAFF: ${eSale.staff_client_notes}`}</span>
											) : (
												<></>
											)}
										</div>

										<div className="bg-white p-3 lg:w-[100%] lg:col-span-2">
											{/* SALE INFO */}
											<div>
												<p className="py-1 mb-2">{`Sale Channel: ${eSale.online_order_type}.`}</p>

												<div>
													<p>
														{eSale.online_order_id !== '' ? (
															<span className="py-1">{`Order ID: ${eSale.online_order_id}`}</span>
														) : (
															<></>
														)}
													</p>

													<p>
														{eSale.online_order_date !== '' ? (
															<p className=" py-1">{`Order Date: ${eSale.online_order_date}`}</p>
														) : (
															<></>
														)}
													</p>

													<p>
														{eSale.online_order_date !== '' ? (
															<p className=" py-1">{`Payment Confirmed: ${eSale.online_order_payment_date}`}</p>
														) : (
															<></>
														)}
													</p>

													<p>
														{eSale.online_order_amount_euros !== '' ? (
															<p className=" py-1">{`GRAND TOTAL: ${eSale.online_order_amount_euros} €`}</p>
														) : (
															<></>
														)}
													</p>

													<p>
														{eSale.online_order_amount_euros !== '' ? (
															<p className=" py-1">{`Invoice Number: ${eSale.online_order_invoice_number} `}</p>
														) : (
															<></>
														)}
													</p>
												</div>

												{/* LOOP NESTED INFO */}
												<div className="py-5">
													<h2 className="font-bold py-2 uppercase">
														List of Items Purchased:
													</h2>

													{eSale.online_order_details.map((item, id) => {
														return (
															<div key={id} className="py-3">
																<p>
																	<span
																		style={{
																			fontWeight: 'bold',
																			marginRight: '5px',
																		}}
																	>{`Item Type:`}</span>
																	{item.item_type}
																</p>
																<p>
																	<span
																		style={{
																			fontWeight: 'bold',
																			marginRight: '5px',
																		}}
																	>{`Item Name:`}</span>
																	{item.item_name}
																</p>

																{item.item_color !== '' ? (
																	<p>
																		<span className="mr-2 font-bold">{`Item Color:`}</span>
																		{item.item_color.toUpperCase()}
																	</p>
																) : (
																	<></>
																)}

																<p>
																	<span
																		style={{
																			fontWeight: 'bold',
																			marginRight: '5px',
																		}}
																	>{`Price Per Unit:`}</span>
																	{item.item_price} {`€`}
																</p>
																<p>
																	<span
																		style={{
																			fontWeight: 'bold',
																			marginRight: '5px',
																		}}
																	>{`Quantity Ordered:`}</span>
																	{item.item_quantity}
																</p>
																<p>
																	<span
																		style={{
																			fontWeight: 'bold',
																			marginRight: '5px',
																		}}
																	>{`Total amount:`}</span>
																	{item.grand_total} {`€`}
																</p>
																<hr className="mt-2" />
															</div>
														);
													})}
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					);
				})}

				<h5 className="font-bold mt-10">
					{jsonFile.length === 0 ? (
						<div className="bg-red-400 py-4 pl-4">
							<div className="text-2xl mb-2">
								<p className="py-2">UPS...No records found!</p>
								<p className="py-2">
									Try another search term OR ask a co-worker to help you!
								</p>
							</div>
						</div>
					) : (
						<></>
					)}
				</h5>

				{showButton && (
					<button onClick={scrollToTop} className="back-to-top">
						{' '}
						&#8679; {/* &#8679; is used to create the upward arrow */}
					</button>
				)}

				<footer className="text-center py-4 mt-14 mx-auto">
					<ExternalLink href="https://www.ankermake.com/" target="_blank">
						<p className="text-center">No Rights Reserved.</p>
						<p className="text-center"> Credits: Ankermake.</p>
					</ExternalLink>
				</footer>
			</div>
		</div>
	);
}

export default App;
