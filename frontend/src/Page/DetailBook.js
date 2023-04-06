import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import { Flex, Heading, Image, Text, VStack, Stack, Box } from "@chakra-ui/react";
import Swal from "sweetalert2";

function DetailBook() {
	const [book, setBook] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const dataBook = async () => {
			try {
				const result = await axios({
					method: "get",
					url: `/books/${id}`
				});
				if (result.data.book === null) {
					navigate(
						"/",
						Swal.fire({
							position: "center",
							icon: "error",
							title: "Sorry ...",
							text: "Book Not Found!",
							confirmButtonColor: "#FC2947"
						})
					);
				}
				setBook(result.data.book);
			} catch (err) {
				console.log(err);
			}
		};
		dataBook();
	}, []);

	return (
		<>
			{book.id && (
				<>
					<Navbar />
					<Flex alignItems="center" justifyContent="center" h="100vh" pt="12">
						<VStack>
							<Box>
								<Heading textAlign="center" mb="4">
									{book.title} ({book.year})
								</Heading>
								<Image src={`http://localhost:8000/${book.image}`} alt="Image" boxSize={300} mx="auto" borderRadius="12" objectFit="cover" />
								<Box mt="4">
									<Text ms="4">
										Author: <Text as="b">{book.author}</Text>
										<br />
										Publisher: <Text as="b">{book.publisher}</Text>
										<br />
										Page: <Text as="b">{book.pages}</Text>
									</Text>
								</Box>
							</Box>
						</VStack>
					</Flex>
				</>
			)}
		</>
	);
}

export default DetailBook;
