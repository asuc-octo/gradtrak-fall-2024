import React from 'react';
import { Flex, Text, Button } from '@radix-ui/themes';

function Header() {
  return (
    <Flex className="header">
      {/* Logo or Title */}
      <Text className="header-title" size="5" style={{ fontWeight: 'bold' }}>
        BerkeleyTime
      </Text>

      {/* Navigation or Buttons */}
      <Flex gap="16px">
        <Button className="header-button">
          Catalog
        </Button>
        <Button className="header-button">
          Scheduler
        </Button>
        <Button variant="solid" className="header-button">
          Grades
        </Button>
        <Button variant="solid" className="header-button">
          Enrollment
        </Button>
        <Button variant="solid" className="header-button">
          About
        </Button>
        <Button variant="solid" className="login-button">
          Log In
        </Button>
      </Flex>
    </Flex>
  );
}

export default Header;