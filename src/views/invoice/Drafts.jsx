import React from 'react'
import { useSelector } from 'react-redux';

import { Icon } from '@iconify/react';
import { Paragraph } from '../../components/typography/Typography';

const Drafts = ({onOpen, onSelectvalue, onDelete, isOpen}) => {
  const { drafts } = useSelector((state) => state.drafts);

  return (
    <div>
      {drafts?.length ? (
        <div className=" mb-4 text-text ">
          <div>
            <div
              className="flex justify-between w-full border-b-[1px] cursor-pointer items-center pb-4 mb-4 "
              onClick={onOpen}
            >
              <Paragraph title="Drafts" />

              <Icon
                icon="material-symbols:keyboard-arrow-up"
                width="24"
                rotate={isOpen ? 2 : 0}
              />
            </div>
            {isOpen && (
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {drafts.map((item, index) => {
                  return (
                    <div key={index} className="relative">
                      <div
                        className="px-4 py-6 hover:bg-black hover:text-white hover:cursor-pointer hover:transition-all hover:duration-700 hover:scale-[1.08] text-left h-full border-2 rounded-[4px]"
                        onClick={() => {
                          onSelectvalue(item);
                        }}
                      >
                        <p className="font-regular text-[16px] w-max  ">
                          {`Invoice: ${item.invoiceNumber}`}
                        </p>
                        <p>Client: {item.clientName} </p>
                      </div>
                      <div
                        className="absolute hover:scale-[1.3] hover:cursor-pointer right-[-18px] top-[-14px]"
                        onClick={() => onDelete(item)}
                      >
                        <Icon icon="typcn:delete" color="red" width="36" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Drafts