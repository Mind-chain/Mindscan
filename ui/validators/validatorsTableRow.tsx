import { Td, Tr } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import { route } from 'nextjs-routes';

const ValidatorsTableRow = ({ data }: any) => {
  console.log(data);
  const dynamicHref = `/address/${data?.address}`;

  // const defaultHref = route({ pathname: `/address/${data.address}`, });


  return (
    <>
      <Tr>
        {/* <Td style={{ color: "#63b3ed" }} overflowX={'auto'} whiteSpace={'nowrap'}>
          {data?.address &&
            <Link href={`${dynamicHref}`}   >
              <Td >{data?.address}</Td>
            </Link>
          }
        </Td> */}
        <Td>
          <AddressEntity
            address={{ hash: data?.address }}
            noIcon
            display="inline-flex"
            maxW="100%"
            pt={2}
          />
        </Td>
        <Td>{data.stake}</Td>
        <Td>{data.rewards}</Td>
        <Td>{data.validatedBlocksCount}</Td>
        <Td>{data.validatedBlocksStatus}</Td>
      </Tr>
    </>
  );
};

export default ValidatorsTableRow;