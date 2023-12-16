import { Paragraph } from "../typography/Typography"
import { Icon } from '@iconify/react';

const Navbar = ({onClick}) => {
  return (
    <nav className="flex justify-between items-center text-[16px] mb-[3rem] ">
      <p className="text-blue font-semibold tracking-tighter text-[20px]">INVOICE</p>
      <Icon icon="material-symbols:menu" width={28} onClick={onClick} />
    </nav>
  );
}

export default Navbar