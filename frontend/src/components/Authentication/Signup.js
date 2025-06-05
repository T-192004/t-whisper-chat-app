import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react"
import {useNavigate} from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [Show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const postDetails = (pic) => {
    setLoading(true);

    if (pic === undefined) {
        toast({
            title: "Please Select an Image!",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: 'bottom',
        });
        setLoading(false); // important to stop loader
        return;
    }

    if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
        const data = new FormData();
        data.append("file", pic);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "dxkjmlrfk");

        fetch("https://api.cloudinary.com/v1_1/dxkjmlrfk/image/upload", {
            method: "post",
            body: data,
        })
        .then((res) => res.json())
        .then((dataJson) => {
            setPic(dataJson.url.toString());
            console.log(dataJson);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            toast({
                title: "Image Upload Failed!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
        });
    } else {
        toast({
            title: "Please Select a JPEG or PNG image!",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: 'bottom',
        });
        setLoading(false);
    }
    };

    const sumbitHandler = async () => {
        setLoading(true);
        if(!name || !email || !password || !confirmPassword) {
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

        if(password !== confirmPassword) {
            toast({
                title: "Passwords Do not Match",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/register`,
                    {name, email, password, pic},
                    config
            );
            toast({
                title: "Registrations Successfully!",
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
     <FormControl id="first-name" isRequired>
         <FormLabel>
            Name
         </FormLabel>
         <Input 
            type='text'
            placeholder='Enter Your Name' 
            onChange={e => setName(e.target.value)} 

        />
     </FormControl>
     <FormControl id="email" isRequired>
         <FormLabel>
            Email
         </FormLabel>
         <Input 
            type='email'
            placeholder='Enter Your email' 
            onChange={e => setEmail(e.target.value)} 

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
                onChange={e => setPassword(e.target.value)} 
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size="sm" onClick={() => setShow(!Show)}>
                    {Show? "Hide" : "Show"}
                </Button>
            </InputRightElement>
         </InputGroup>
         
     </FormControl>
     <FormControl id="confirm-password" isRequired>
         <FormLabel>
            Confirm Password
         </FormLabel>
         <InputGroup>
            <Input 
                type={Show ? "text" :"password"}
                placeholder='Enter Your paaword' 
                onChange={e => setConfirmPassword(e.target.value)} 
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size="sm" onClick={() => setShow(!Show)}>
                    {Show? "Hide" : "Show"}
                </Button>
            </InputRightElement>
         </InputGroup>
         
     </FormControl>
     <FormControl id="pic" isRequired>
         <FormLabel>
            Upload your Pic
         </FormLabel>
         <Input 
            type='file'
            placeholder='Enter Your pic' 
            accept='image/*'
            onChange={e => postDetails(e.target.files[0])} 

        />
     </FormControl>
     <Button
        colorScheme='blue'
        width='100%'
        style={{marginTop: 15}}
        onClick={sumbitHandler}
        isLoading={loading}
    >
        Sign Up
    </Button>
     </VStack>
   )
}

export default Signup
