import { FaTwitter, FaGithub } from 'react-icons/fa';
import { Flex, Icon, Link } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Flex position="fixed" bottom="4" right="4" gap="4">
          <Link href="https://twitter.com/olllayor" isExternal>
            <Icon as={FaTwitter} w={10} h={6} mr={5} color="blue.400" />
          </Link>
          <Link href="https://github.com/olllayor/try-on" isExternal>
            <Icon as={FaGithub} w={10} h={6} mr={150} color="gray.600" />
          </Link>
        </Flex>
  )
}
