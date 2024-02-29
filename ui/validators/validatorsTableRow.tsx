import { Td, Tr } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import { route } from 'nextjs-routes';

const ValidatorsTableRow = ({ data, index, rankTag }: any) => {
  const dynamicHref = `/address/${data?.address}`;
  const rank = index + 1; // Index starts from 0, so add 1 to get the rank

  let rankEmoji = ''; // Emoji for the rank

  // Define emojis for the top 3 ranks
  if (rank === 1) {
    rankEmoji = '🥇';
  } else if (rank === 2) {
    rankEmoji = '🥈';
  } else if (rank === 3) {
    rankEmoji = '🥉';
  }

  return (
    <>
      <Tr>
        <Td>
          {rankEmoji} {rankTag}
        </Td>
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