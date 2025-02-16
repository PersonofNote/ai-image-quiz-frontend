import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

export const Sidebar = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer overlay={false} opened={opened} onClose={close} title="Authentication">
        Tips for spotting AI generated images
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
};