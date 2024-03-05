import { Grid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { route } from 'nextjs-routes';
import config from 'configs/app';
import blockIcon from 'icons/block.svg';
import clockIcon from 'icons/clock-light.svg';
import gasIcon from 'icons/gas.svg';
import txIcon from 'icons/transactions.svg';
import walletIcon from 'icons/wallet.svg';
import rocket from 'icons/rocket.svg';
import star from 'icons/star_outline.svg';
import coin from 'icons/token.svg';
import useApiQuery from 'lib/api/useApiQuery';
import { HOMEPAGE_STATS } from 'stubs/stats';

import StatsGasPrices from './StatsGasPrices';
import StatsItem from './StatsItem';
import { token } from 'mocks/address/address';

const hasGasTracker = config.UI.homepage.showGasTracker;
const hasAvgBlockTime = config.UI.homepage.showAvgBlockTime;

const Stats = () => {
  const [latestBlock, setLatestBlock] = useState<number | null>(null);
  const [totalLockedCoins, setTotalLockedCoins] = useState<string>("Loading..."); // State for total locked coins
  const [currentBlockEpoch, setCurrentBlockEpoch] = useState<string>("Loading..."); // State for current block epoch
  const [Currentactivevaliidators, setCurrentactivevaliidators] = useState<string>("Loading...");
  const fetchLatestBlock = async () => {
    try {
      const response = await fetch('https://mainnet.mindscan.info/rpc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: [],
          id: 1,
        }),
      });
      const data = await response.json();
      setLatestBlock(parseInt((data as { result: string }).result, 16)); // Assert the type of data
    } catch (error) {
      console.error('Error fetching latest block:', error);
    }
  };

  const fetchTotalLockedCoins = async () => {
    try {
      const response = await fetch('https://mainnet.mindscan.info/chaindata');
      const data: any = await response.json(); // explicitly typed as any
      setTotalLockedCoins(data.totalStakedAmount); // Set total locked coins
    } catch (error) {
      console.error('Error fetching total locked coins:', error);
    }
  };
  

  

  const fetchtotalactivevalidators = async () => {
    try {
      const response = await fetch('https://mainnet.mindscan.info/chaindata');
      const data: any = await response.json();
      setCurrentactivevaliidators(data.totalValidatorAddresses); // Set current block epoch
    } catch (error) {
      console.error('Error fetching total validators:', error);
    }
  };

  const fetchCurrentBlockEpoch = async () => {
    try {
      const response = await fetch('https://mainnet.mindscan.info/chaindata');
      const data: any = await response.json();
      setCurrentBlockEpoch(data.currentBlockEpoch); // Set current block epoch
    } catch (error) {
      console.error('Error fetching current block epoch:', error);
    }
  };

  useEffect(() => {
    fetchLatestBlock(); // Fetch latest block on initial render only
    fetchTotalLockedCoins(); // Fetch total locked coins on initial render only
    fetchCurrentBlockEpoch(); // Fetch current block epoch on initial render only
    fetchtotalactivevalidators();
    const intervalId = setInterval(() => {
      fetchLatestBlock();
      fetchTotalLockedCoins();
      fetchCurrentBlockEpoch();
      fetchtotalactivevalidators();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const { data, isPlaceholderData, isError } = useApiQuery('homepage_stats', {
    queryOptions: {
      placeholderData: HOMEPAGE_STATS,
    },
  });

  if (isError) {
    return null;
  }

  let content;

  const lastItemTouchStyle = { gridColumn: { base: 'span 2', lg: 'unset' } };

  let itemsCount = 6; // Increment itemsCount for new item
  !hasGasTracker && itemsCount--;
  !hasAvgBlockTime && itemsCount--;

  if (data) {
    !data.gas_prices && itemsCount--;
    const isOdd = Boolean(itemsCount % 2);
    const gasLabel = hasGasTracker && data.gas_prices ? <StatsGasPrices gasPrices={ data.gas_prices }/> : null;

    content = (
      <>
        <StatsItem
          icon={ blockIcon }
          title="Total blocks"
          value={ latestBlock !== null ? latestBlock.toLocaleString() : "Loading..." }
          url={ route({ pathname: '/blocks' }) }
          isLoading={ isPlaceholderData }
        />
        { hasAvgBlockTime && (
          <StatsItem
            icon={ clockIcon }
            title="Average block time"
            value={ `${ (data.average_block_time / 1000).toFixed(1) } s` }
            isLoading={ isPlaceholderData }
          />
        ) }
        <StatsItem
          icon={ txIcon }
          title="Total transactions"
          value={ Number(data.total_transactions).toLocaleString() }
          url={ route({ pathname: '/txs' }) }
          isLoading={ isPlaceholderData }
        />
        <StatsItem
          icon={ walletIcon }
          title="Wallet addresses"
          value={ Number(data.total_addresses).toLocaleString() }
          _last={ isOdd ? lastItemTouchStyle : undefined }
          isLoading={ isPlaceholderData }
        />
        { hasGasTracker && data.gas_prices && (
          <StatsItem
            icon={ gasIcon }
            title="Gas tracker"
            value={ `${ Number(data.gas_prices.average).toLocaleString() } Gwei` }
            _last={ isOdd ? lastItemTouchStyle : undefined }
            tooltipLabel={ gasLabel }
            isLoading={ isPlaceholderData }
          />
        ) }
        <StatsItem
          icon={ coin }
          title="Total Locked Coins"
          value={ totalLockedCoins } // Render total locked coins
          //url={ route({ pathname: '/blocks' }) }
          isLoading={ isPlaceholderData }
        />
        <StatsItem
          icon={ star }
          title="Current Block Epoch"
          value={ currentBlockEpoch } // Render current block epoch
          isLoading={ isPlaceholderData }
        />
             <StatsItem
          icon={ rocket }
          title="Total Active Validators"
          value={ Currentactivevaliidators } 
          isLoading={ isPlaceholderData }
        />
      </>
    );
  }

  return (
    <Grid
      gridTemplateColumns={{ lg: `repeat(${ itemsCount }, 1fr)`, base: '1fr 1fr' }}
      gridTemplateRows={{ lg: 'none', base: undefined }}
      gridGap="10px"
      marginTop="24px"
    >
      { content }
    </Grid>

  );
};

export default Stats;
