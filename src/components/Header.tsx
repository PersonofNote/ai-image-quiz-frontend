import { useState } from 'react';
import cx from 'clsx';
import {
  Avatar,
  Burger,
  Container,
  Group,
  Menu,
  Tabs,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import {IconRobot} from '@tabler/icons-react';
import { Flex } from '@mantine/core';

const user = {
  name: 'Sample User',
  email: 'sample@email.dev',
  image: '',
};

const tabs = [
  'Home',
  //'Tips',
  //'Stats',
  //'Leaderboard'
];

export const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  return (
      <Container className={classes.header}>
        <Flex justify="space-between">
          <Group>
            <IconRobot size={32} stroke={1.5} />
            <Tabs
              defaultValue="Home"
              variant="outline"
              visibleFrom="sm"
              classNames={{
                root: classes.tabs,
                list: classes.tabsList,
                tab: classes.tab,
              }}
            >
              <Tabs.List>{items}</Tabs.List>
            </Tabs>
          </Group>
          <Group justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group gap={7}>
                  <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {user.name}
                  </Text>
                  
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item color="red">
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        </Flex>
      </Container>
  
  );
}