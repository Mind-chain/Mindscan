import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import useApiQuery from 'lib/api/useApiQuery';
import getQueryParamString from 'lib/router/getQueryParamString';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import PageTitle from 'ui/shared/Page/PageTitle';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import Link from 'next/link';
import ValidatorsTableRow from 'ui/validators/validatorsTableRow';



interface ValidatorData {
  address: string,
  stake: string,
  rewards: string,
  validatedBlocksCount: string,
  validatedBlocksStatus: string,

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

  return (
    <>
      <PageTitle title={`Validators`} />
      <Box>
        <div style={{ overflow: 'auth' }}>
          <Table variant="simple" minWidth="950px" size="xs">
            <Thead style={{ background: 'rgb(35 36 37)' }}>
              <Tr whiteSpace={'nowrap'}>
                <Th style={{ color: "#63b3ed" }} fontWeight={700}>Address</Th>
                <Th  >Stake</Th>
                <Th  >Rewards</Th>
                <Th>Validated Blocks Count</Th>
                <Th>Validated Blocks Status</Th>
              </Tr>
            </Thead>
            <Tbody overflowX="auto">
              {validatorData?.map((data: ValidatorData) => {
                return <>
                  <ValidatorsTableRow data={data} />
                </>;
              })}
            </Tbody>
          </Table>
        </div>
      </Box>
    </>
  );
};

export default Validators;