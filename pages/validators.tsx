import { Box, Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PageTitle from 'ui/shared/Page/PageTitle';
import ValidatorsTableRow from 'ui/validators/validatorsTableRow';

interface ValidatorData {
  address: string;
  stake: string;
  rewards: string;
  validatedBlocksCount: string;
  validatedBlocksStatus: string;
}

const Validators = () => {
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
            <Thead style={{ background: 'rgb(35 36 37)' }}>
              <Tr whiteSpace={'nowrap'}>
              <Th>Rank</Th> 
                <Th style={{ color: '#63b3ed' }} fontWeight={700}>
                  Address
                </Th>
                <Th>Stake</Th>
                <Th>Rewards</Th>
                <Th>Validated Blocks Count</Th>
                <Th>Validated Blocks Status</Th>
               {/* Added Rank column */}
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