import React, { useState } from "react";
import { Box, Button, ButtonGroup, Flex, Stack, Text, Spacer, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Navbar() {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const navigate = new useNavigate();

	const handleButton = () => {
		if (token) {
			setToken(localStorage.removeItem("token"));
			// console.log("test");
			return navigate("/");
		} else {
			return navigate("/login");
		}
	};

	const buttonLoginLogout = () => {
		if (token) {
			return (
				<Button onClick={handleButton} color="blackAlpha.700" bg="orange.300" fontWeight="semibold" fontSize="xl">
					Logout
				</Button>
			);
		} else {
			return (
				<Button onClick={handleButton} color="blackAlpha.700" bg="orange.300" fontWeight="semibold" fontSize="xl">
					Login
				</Button>
			);
		}
	};

	return (
		<Box as="nav" bg="teal.500" py="6" position={"fixed"} zIndex={2} w="100%" boxShadow="0 4px 8px rgba(0,0,0,.4)">
			<Flex px="10" alignItems="center">
				<Box>
					<Center>
						<Stack>
							<ButtonGroup gap="8">
								<Text color="white" m="auto" fontWeight="semibold" fontSize="xl">
									<a href="/">Home</a>
								</Text>
								<Text color="white" m="auto" fontWeight="semibold" fontSize="xl">
									<a href="/addbook">AddBook</a>
								</Text>
							</ButtonGroup>
						</Stack>
					</Center>
				</Box>
				<Spacer />
				<ButtonGroup spacing="8">{buttonLoginLogout()}</ButtonGroup>
			</Flex>
		</Box>
	);
}
export default Navbar;
