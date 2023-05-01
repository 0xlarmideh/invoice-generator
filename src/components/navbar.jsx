import { Paragraph } from "./Typography"
import { Icon } from '@iconify/react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
      <Paragraph title="Invoice" />
      <Icon icon="material-symbols:menu" />
    </nav>
  );
}

export default Navbar