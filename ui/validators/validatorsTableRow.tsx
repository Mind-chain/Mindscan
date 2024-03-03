import { Td, Tr, useColorMode } from '@chakra-ui/react';
import React from 'react';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';

const ValidatorsTableRow = ({ data, index, rankTag }: any) => {
  const { colorMode } = useColorMode(); // Get the current color mode
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

  const nameToShow = data.name || "Unknown"; // If name is empty, show "Unknown"

  return (
    <>
      <Tr>
      <Td color={colorMode === 'dark' ? 'white' : 'black'}>{nameToShow}</Td>
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
        {/* <Td color={colorMode === 'dark' ? 'white' : 'black'}>{nameToShow}</Td> Displaying the name with appropriate text color */}
      </Tr>
    </>
  );
};

export default ValidatorsTableRow;
