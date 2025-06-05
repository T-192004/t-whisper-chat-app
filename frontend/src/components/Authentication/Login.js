import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react"
import {useNavigate} from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [Show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const sumbitHandler = async () => {
        setLoading(true);
        if( !email || !password) {
            toast({
                title: "Please Fill all the field!",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }
        try {
                    const config = {
                        headers: {
                            "Content-type": "application/json",
                        },
                    };
                    console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);

                    const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`,
                            {email, password},
                            config
                    );
                    toast({
                        title: "Login Successfully!",
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                        position: 'bottom',
                    });
                    localStorage.setItem("userInfoChatApp", JSON.stringify(data));
                    setLoading(false);
                    navigate("/chats");
                } catch (err) {
                    toast({
                        title: "Error Occured!",
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                        position: 'bottom',
                    });
                    console.log(err);
                    setLoading(false);
                }
    }
    return (
        <VStack spacing='5px' >
        <FormControl id="email" isRequired>
            <FormLabel>
                Email
            </FormLabel>
            <Input 
                type='email'
                placeholder='Enter Your email'
                onChange={e => setEmail(e.target.value)} 
                value={email}
            />
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>
                Password
            </FormLabel>
            <InputGroup>
                <Input 
                    type={Show ? "text" :"password"}
                    placeholder='Enter Your paaword' 
                    value={password}
                    onChange={e => setPassword(e.target.value)} 
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size="sm" onClick={() => setShow(!Show)}>
                        {Show? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
            
        </FormControl>
        <Button
            colorScheme='blue'
            width='100%'
            style={{marginTop: 15}}
            onClick={sumbitHandler}
            isLoading={loading}
        >
            Login
        </Button>
        <Button
            variant='solid'
            colorScheme='red'
            w='100%'
            onClick={()=>{
                setEmail("guest@example.com");
                setPassword('123456');
            }}
        >
            Get Guest User Credentials
        </Button>
        </VStack>
        )
}
export default Login
