import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OfferCard from "../../widgets/offerCard/OfferCard";
import s from "./MarketplacePage.module.css";
import FilterBar from "../../widgets/filterBar/FilterBar";
import { useGetUserDetailsQuery } from "../../services/authService";
import { setCredentials } from "../../store/slice/userSlice";

const POLLING_INTERVAL = 1800000;

function MarketplacePage() {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: POLLING_INTERVAL,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  const offerList = useSelector((state) => state.offer.list);
  const filteredOffers = offerList.filter(({ filteredByPrice, filteredByCompanies, filteredByCategory }) => filteredByPrice && filteredByCompanies && filteredByCategory)
  return (
    <>{isFetching ? <p>Loading...</p> :
    <div className={s.marketplaceWrapper}>
      <FilterBar />
      <div className={s.offerListContainer}>
        {
        filteredOffers.length > 0
        ? filteredOffers.map(
          (item) => <OfferCard key={item.id} {...item} />)
        : <p>No matches</p>
        }
      </div>
    </div>}</>
  );
}

export default MarketplacePage;
