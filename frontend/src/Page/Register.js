import React, { useState, useEffect } from "react";
import { Flex, Center, Input, Button, FormLabel, Stack, InputGroup, InputRightElement, Text, FormControl } from "@chakra-ui/react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Swal from "sweetalert2";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const handleShowPassword = () => setShow(!show);
	const [confirmShow, setConfirmShow] = useState(false);
	const handleShowConfirmPassword = () => setConfirmShow(!confirmShow);

	const handleSubmit = async () => {
		if (password !== confirmPassword) {
			return;
		}

		try {
			if (name === "" || email === "" || password === "") {
				Swal.fire({
					position: "center",
					icon: "error",
					title: "Register Failed !",
					text: "Check your information and make sure that is valid",
					confirmButtonColor: "#FC2947"
				});
			} else {
				await axios({
					method: "post",
					url: "/register",
					data: {
						name,
						email,
						password
					}
				});
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Register Success",
					showConfirmButton: false,
					timer: 1500
				});
				setTimeout(() => {
					navigate("/login");
				}, 2500);
				// navigate("/login");
			}
		} catch (err) {
			Swal.fire({
				position: "center",
				icon: "error",
				title: "Register Failed !",
				text: err.message,
				confirmButtonColor: "#FC2947"
			});
			console.log(err.message);
		}
	};

	return (
		<Flex justify="flex-end" bgGradient="linear(to-l, blackAlpha.800,blackAlpha.400, blackAlpha.200)">
			<Flex w="40%" h="100vh" bg="orange.300">
				<Center>
					<Stack py="12" px="24" bg="teal.500" borderTopRightRadius={30} borderBottomRightRadius={30} boxShadow={"50px 0 0 teal"}>
						<Text fontSize={"4xl"} fontWeight={"bold"} textShadow={"2px 2px rgba(0,0,0,.4)"} textAlign={"center"} mb={"4"} color="whiteAlpha.900">
							R E G I S T E R
						</Text>

						<FormControl isRequired>
							<FormLabel fontSize={"lg"} color="whiteAlpha.900">
								Name
							</FormLabel>
							<Input type="text" onChange={(e) => setName(e.target.value)} placeholder="Sample Name" color="blackAlpha.800" bg="whiteAlpha.900" />
						</FormControl>

						<FormControl isRequired>
							<FormLabel fontSize={"lg"} color="whiteAlpha.900">
								Email
							</FormLabel>
							<Input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" color="blackAlpha.800" bg="whiteAlpha.900" />
						</FormControl>

						<FormControl isRequired>
							<FormLabel fontSize={"lg"} color="whiteAlpha.900">
								Password
							</FormLabel>
							<InputGroup size="md">
								<Input type={show ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} color="blackAlpha.800" maxLength={"16"} placeholder="Enter Password" bg="whiteAlpha.900" />
								<InputRightElement width="4.5rem">
									<Button h="1.75rem" size="sm" bg="blackAlpha.700" color="whiteAlpha.900" onClick={handleShowPassword}>
										{show ? "Hide" : "Show"}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>

						<FormControl isRequired>
							<FormLabel fontSize={"lg"} color="whiteAlpha.900">
								Confirm Password
							</FormLabel>
							<InputGroup size="md" mb="4">
								<Input type={confirmShow ? "text" : "password"} onChange={(e) => setConfirmPassword(e.target.value)} color="blackAlpha.800" maxLength={"16"} placeholder="Confirm Password" bg="whiteAlpha.900" />
								<InputRightElement width="4.5rem">
									<Button h="1.75rem" size="sm" bg="blackAlpha.700" color="whiteAlpha.900" onClick={handleShowConfirmPassword}>
										{confirmShow ? "Hide" : "Show"}
									</Button>
								</InputRightElement>
							</InputGroup>
							{password !== confirmPassword && (
								<Text fontSize="md" color="red.600" mt="-2" ms="2" fontWeight="semibold">
									Password doesn't match
								</Text>
							)}
						</FormControl>

						<Button isDisabled={password !== confirmPassword} onClick={handleSubmit} color="whiteAlpha.900" bg="blackAlpha.700">
							Register
						</Button>

						<Text textAlign={"center"} color={"whiteAlpha.900"}>
							Already have an account? {""}
							<a href="/login">
								<b>Login</b>
							</a>
						</Text>
					</Stack>
				</Center>
			</Flex>
		</Flex>
	);
}

export default Register;
