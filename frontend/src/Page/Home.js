import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "../axios";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Image, Button, Spacer } from "@chakra-ui/react";

function Home() {
	const [book, setBook] = useState([]);
	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchBook = async () => {
			try {
				const book = await axios({
					method: "get",
					url: "/books"
				});
				setBook(book.data.books);
				// console.log(test.id);
			} catch (err) {
				console.log(err);
			}
		};
		fetchBook();
		// console.log(book);
	}, []);

	const handleDelete = async (id) => {
		const result = await Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!"
		});

		try {
			if (result.isConfirmed) {
				await axios({
					method: "delete",
					url: `/books/${id}`,
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				Swal.fire("Deleted book!", "", "success");
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Navbar />
			<TableContainer p="10" pt="32">
				<Table variant="striped" colorScheme="gray">
					<Thead>
						<Tr>
							<Th fontSize="md">Title</Th>
							<Th fontSize="md">Author</Th>
							<Th fontSize="md">Publisher</Th>
							<Th fontSize="md">Year</Th>
							<Th fontSize="md">Pages</Th>
							<Th fontSize="md">Image</Th>
							{localStorage.getItem("token") && (
								<>
									<Th>Action</Th>
								</>
							)}
						</Tr>
					</Thead>
					<Tbody>
						{book.map((book, index) => {
							// console.log(book.image);
							return (
								<Tr key={index}>
									<Td>{book.title}</Td>
									<Td>{book.author}</Td>
									<Td>{book.publisher}</Td>
									<Td>{book.year}</Td>
									<Td>{book.pages}</Td>
									<Td>
										<Image src={`http://localhost:8000/${book.image}`} boxSize="100px" objectFit="cover" />
									</Td>
									{localStorage.getItem("token") && (
										<Td>
											<Link to={`/books/${book.id}`}>
												<Button w="20" value={book.id} color="white" bg="whatsapp.500">
													Update
												</Button>
											</Link>
											<Spacer />

											<Button w="20" mt="2" onClick={() => handleDelete(book.id)} color="white" bg="red.500">
												Delete
											</Button>
										</Td>
									)}
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
}

export default Home;
