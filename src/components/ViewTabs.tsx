import { Flex, Group, Tabs } from '@mantine/core';
import { IconPhoto, IconSettings, IconHelpSquare, IconChartBar } from '@tabler/icons-react';
import { GuessPage } from '../views/GuessPage';
import { TipsPage } from '../views/TipsPage';

export const ViewTabs = () => {
  return (
    <Tabs defaultValue="guess">        
      <Tabs.List>
        <Flex justify="space-between" w="100%" py="6px">
          <Group>
            <Tabs.Tab value="guess" leftSection={<IconPhoto size={12} />}>
              Guess
            </Tabs.Tab>
            <Tabs.Tab value="hints" leftSection={<IconHelpSquare size={12} />}>
              Hints
            </Tabs.Tab>
            <Tabs.Tab value="graphs" leftSection={<IconChartBar size={12} />}>
              Charts
            </Tabs.Tab>
          </Group>
          <Tabs.Tab value="settings" leftSection={<IconSettings size={12} />}>
            Settings
          </Tabs.Tab>
        </Flex>
      </Tabs.List>

      <Tabs.Panel value="guess">
        <GuessPage />
      </Tabs.Panel>
      <Tabs.Panel value="hints">
        <TipsPage />
      </Tabs.Panel>
      <Tabs.Panel value="graphs">
        TODO: Add global charts, personal charts for logged-in users
      </Tabs.Panel>
      <Tabs.Panel value="settings">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
}