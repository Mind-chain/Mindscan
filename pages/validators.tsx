import { Box, Table, Thead, Tbody, Tr, Th, useColorMode } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PageTitle from 'ui/shared/Page/PageTitle';
import ValidatorsTableRow from 'ui/validators/validatorsTableRow';

interface ValidatorData {
  address: string;
  name: string;
  stake: string;
  rewards: string;
  validatedBlocksCount: string;
  validatedBlocksStatus: string;
}

const Validators = () => {
  const { colorMode } = useColorMode(); // Get the current color mode
  const [validatorData, setValidatorData] = useState<ValidatorData[] | any>();

  useEffect(() => {
    fetch('https://mainnet.mindscan.info/valdata')
      .then((res) => res.json())
      .then((data) => setValidatorData(data))
      .catch((error) => {
        console.error('Error fetching validator data:', error);
      });
  }, []);

  // Sorting validatorData based on validatedBlocksCount
  const sortedValidators = validatorData?.sort((a: ValidatorData, b: ValidatorData) => {
    return parseInt(b.validatedBlocksCount) - parseInt(a.validatedBlocksCount);
  });

  return (
    <>
      <PageTitle title={`Validators`} />
      <Box>
        <div style={{ overflow: 'auto' }}>
          <Table variant="simple" minWidth="950px" size="xs">
            <Thead style={{ background: colorMode === 'dark' ? 'gray.800' : 'gray.100' }}>
              <Tr whiteSpace={'nowrap'}>
              <Th>Node Moniker</Th>
                <Th>Rank</Th> 
                <Th style={{ color: colorMode === 'dark' ? 'white' : 'black' }} fontWeight={700}>
                  Address
                </Th>
                <Th>Stake</Th>
                <Th>Rewards</Th> 
                <Th>Total porduced Blocks</Th>
                <Th>Node Status</Th>
                {/* <Th>Name</Th> New column for displaying name */}
              </Tr>
            </Thead>
            <Tbody overflowX="auto">
              {sortedValidators?.map((data: ValidatorData, index: number) => {
                const rank = index + 1;
                let rankTag = '';
                let highlightStyle = {};

                if (rank <= 3) {
                  if (rank === 1) rankTag = '[1st]';
                  else if (rank === 2) rankTag = '[2nd]';
                  else if (rank === 3) rankTag = '[3rd]';
                  highlightStyle = { background: '#ffff0085' }; // Highlighting for top positions
                }

                return (
                  <ValidatorsTableRow
                     rankTag={rankTag}
                    key={data.address}
                    data={data}
                    index={index} // Passing index to ValidatorsTableRow
                    highlightStyle={highlightStyle}
                    
                  />
                );
              })}
            </Tbody>
          </Table>
        </div>
      </Box>
    </>
  );
};

export default Validators;
