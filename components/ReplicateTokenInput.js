import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
export default function ReplicateTokenInput({ token, onTokenChange }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const savedToken = localStorage.getItem('replicateApiToken');
        if (savedToken) {
            onTokenChange(savedToken);
        }
    }, [onTokenChange]);

    const handleClick = () => setShow(!show);

    const handleTokenChange = (e) => {
        const newToken = e.target.value;
        onTokenChange(newToken);
        localStorage.setItem('replicateApiToken', newToken);
    };

    return (
        <InputGroup>
            <Input
                placeholder="Enter your Replicate API token"
                value={token}
                onChange={handleTokenChange}
                type={show ? 'text' : 'password'} // Toggle input type based on show state
            />
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
    );
};