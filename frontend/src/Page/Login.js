import React, { useState } from "react";
import { Flex, Center, Input, Button, FormLabel, Stack, InputGroup, InputRightElement, Text, FormControl, Box } from "@chakra-ui/react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import Swal from "sweetalert2";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const handleShowPassword = () => setShow(!show);

	const handleSubmit = async () => {
		try {
			const response = await axios({
				method: "post",
				url: "/login",
				data: {
					email,
					password
				}
			});
			const { token } = response.data;

			localStorage.setItem("token", token);
			navigate("/");
		} catch (err) {
			Swal.fire({
				position: "center",
				icon: "error",
				text: "Email or Password invalid",
				confirmButtonColor: "#FC2947"
			});
			console.log(err.message);
		}
	};

	return (
		<Flex justify="flex-end" bgGradient="linear(to-l, blackAlpha.800,blackAlpha.400, blackAlpha.200)">
			<Flex w="40%" h="100vh" bg="orange.300" ml="2em">
				<Center>
					<Stack p="20" bg="teal.500" borderTopRightRadius={30} borderBottomRightRadius={30} boxShadow={"50px 0 0 teal"}>
						<Text fontSize={"4xl"} fontWeight={"bold"} textShadow={"2px 2px rgba(0,0,0,.4)"} textAlign={"center"} mb={"4"} color="whiteAlpha.900">
							L O G I N
						</Text>
						<FormControl isRequired>
							<FormLabel m="0" fontSize={"lg"} color="whiteAlpha.900">
								Email
							</FormLabel>
							<Input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" color="blackAlpha.800" bg="whiteAlpha.900" />
						</FormControl>

						<FormControl isRequired>
							<FormLabel pt="4" fontSize={"lg"} color="whiteAlpha.900">
								Password
							</FormLabel>
							<InputGroup size="md">
								<Input type={show ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} color="blackAlpha.800" maxLength={"16"} placeholder="Enter Password" mb="4" bg="whiteAlpha.900" />
								<InputRightElement width="4.5rem">
									<Button h="1.75rem" size="sm" bg="blackAlpha.700" color="whiteAlpha.900" onClick={handleShowPassword}>
										{show ? "Hide" : "Show"}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>

						<Button onClick={handleSubmit} color="whiteAlpha.900" bg="blackAlpha.700">
							Login
						</Button>

						<Text textAlign={"center"} color={"whiteAlpha.900"}>
							Don't have an account? {""}
							<Link to="/register">
								<Text as="span" fontWeight="bold">
									Register
								</Text>
							</Link>
						</Text>
						<Text as="u" textAlign={"center"} color={"whiteAlpha.900"}>
							<Link to="/" target="_blank">
								<Text as="span" fontWeight="bold">
									Homepage
								</Text>
							</Link>
						</Text>
					</Stack>
				</Center>
			</Flex>
		</Flex>
	);
}

export default Login;
