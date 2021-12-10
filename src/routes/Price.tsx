import { useQuery } from "react-query";
import styled, { keyframes } from "styled-components";
import { fetchCoinTickers } from "../api";

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface PriceProps {
  coinId: string;
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const cardAnimation = keyframes`
 0% {
    transform: translateY(-100px);
    opacity: 0;
  }

  10% {
    transform: translateY(45px);
    opacity: 0;
  }

  100% {
    transform: translate(0);
    opacity: 1;
  }
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  animation: ${cardAnimation} 0.5s linear forwards;
`;

const OverviewItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const InfoTitle = styled.div`
  font-size: 17px;
  margin: 5px 0px;
`;

const PriceInfo = styled.div<{ isPlus?: Boolean }>`
  font-size: 20px;
  margin: 5px 0px;
  color: ${(props) => (props.isPlus ? "lightgreen" : "red")};
`;

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(
    ["priceInfo", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <Container>
      {isLoading ? (
        "Loading price..."
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <InfoTitle>Market Cap:</InfoTitle>
              <PriceInfo isPlus={true}>
                ${data?.quotes.USD.market_cap}
              </PriceInfo>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <InfoTitle>Price:</InfoTitle>
              <PriceInfo isPlus={true}>
                ${data?.quotes.USD.price.toFixed(2)}
              </PriceInfo>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <InfoTitle>High Price:</InfoTitle>
              <PriceInfo isPlus={true}>
                ${data?.quotes.USD.ath_price.toFixed(2)}
              </PriceInfo>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <InfoTitle>Percent Change(24h):</InfoTitle>
              <PriceInfo>{data?.quotes.USD.percent_change_24h}%</PriceInfo>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <InfoTitle>Percent Change(12h):</InfoTitle>
              <PriceInfo isPlus={true}>
                {data?.quotes.USD.percent_change_12h}%
              </PriceInfo>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <InfoTitle>Percent Change(6h):</InfoTitle>
              <PriceInfo>{data?.quotes.USD.percent_change_6h}%</PriceInfo>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <InfoTitle>Percent Change(1h):</InfoTitle>
              <PriceInfo isPlus={true}>
                {data?.quotes.USD.percent_change_1h}%
              </PriceInfo>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <InfoTitle>Percent Change(30m):</InfoTitle>
              <PriceInfo isPlus={true}>
                {data?.quotes.USD.percent_change_30m}%
              </PriceInfo>
            </OverviewItem>
          </Overview>
        </>
      )}
    </Container>
  );
}

export default Price;
