import Navbar from "../Components/Navbar";
import { Flex, Input, Button, FormLabel, Stack, Heading, FormControl, HStack, Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import Swal from "sweetalert2";

function UpdateBook() {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [publisher, setPublisher] = useState("");
	const [year, setYear] = useState(0);
	const [pages, setPages] = useState(0);
	const [image, setImage] = useState(null);
	const token = localStorage.getItem("token");

	const { id } = useParams();

	useEffect(() => {
		const dataBook = async () => {
			try {
				const book = await axios({
					method: "get",
					url: `/books/${id}`
				});
				// console.log(book.data.book.author);
				setTitle(book.data.book.title);
				setAuthor(book.data.book.author);
				setPublisher(book.data.book.publisher);
				setYear(book.data.book.year);
				setPages(book.data.book.pages);
				// console.log(test.id);
			} catch (err) {
				console.log(err);
			}
		};
		dataBook();
		// console.log(book);
	}, []);

	const handleSubmit = async () => {
		try {
			await axios({
				method: "put",
				url: `/books/${id}`,
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`
				},
				data: {
					title,
					author,
					publisher,
					year,
					pages,
					image
				}
			});
			// console.log(res.data);
			Swal.fire({
				position: "center",
				icon: "success",
				text: " Update Book success",
				timer: 1500,
				showConfirmButton: false
			});

			// window.location.reload();
		} catch (err) {
			Swal.fire({
				position: "center",
				icon: "error",
				title: "Failed to Add or Create Book !",
				text: err.message,
				confirmButtonColor: "#FC2947"
			});

			console.log(err);
		}
	};

	return (
		<>
			<Navbar />
			<Stack>
				<Flex justify="center" h="100vh" align="center" pt="16">
					<Box align="center">
						<Heading color="blackAlpha.700" mb="6">
							Update Book
						</Heading>
						<HStack gap="12" textAlign="center" bg="orange.300" p="20" borderRadius="24" boxShadow="0 0 0 10px #319795">
							<Stack gap="4">
								<FormControl isRequired>
									<FormLabel color="whiteAlpha.900" textAlign="center">
										Title
									</FormLabel>
									<Input type="text" value={title} autoComplete="off" onChange={(e) => setTitle(e.target.value)} color="blackAlpha.800" bg="whiteAlpha.900" />
								</FormControl>

								<FormControl>
									<FormLabel color="whiteAlpha.900" textAlign="center">
										Author
									</FormLabel>
									<Input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} color="blackAlpha.800" bg="whiteAlpha.900" />
								</FormControl>

								<FormControl>
									<FormLabel color="whiteAlpha.900" textAlign="center">
										Publisher
									</FormLabel>
									<Input value={publisher} onChange={(e) => setPublisher(e.target.value)} color="blackAlpha.800" bg="whiteAlpha.900" />
								</FormControl>
							</Stack>
							<Stack gap="4" pl="12" borderLeft="2px solid #319795">
								<Flex w="48" gap="6">
									<FormControl>
										<FormLabel color="whiteAlpha.900" textAlign="center">
											Year
										</FormLabel>
										<Input type="number" value={year} textAlign="center" onChange={(e) => setYear(e.target.value)} maxLength="5" color="blackAlpha.800" bg="whiteAlpha.900" />
									</FormControl>

									<FormControl>
										<FormLabel color="whiteAlpha.900" textAlign="center">
											Page
										</FormLabel>
										<Input type="number" value={pages} textAlign="center" onChange={(e) => setPages(e.target.value)} color="blackAlpha.800" bg="whiteAlpha.900" />
									</FormControl>
								</Flex>
								<FormControl>
									<FormLabel color="whiteAlpha.900" textAlign="center">
										Image
									</FormLabel>
									<Input type="file" color="blackAlpha.800" bg="whiteAlpha.900" onChange={(e) => setImage(e.target.files[0])} pt="1" />
								</FormControl>
								<Box align="end" pr="4">
									<Button onClick={handleSubmit} type="reset" color="whiteAlpha.900" bg="blackAlpha.700">
										Submit
									</Button>
								</Box>
							</Stack>
						</HStack>
					</Box>
				</Flex>
			</Stack>
		</>
	);
}

export default UpdateBook;
