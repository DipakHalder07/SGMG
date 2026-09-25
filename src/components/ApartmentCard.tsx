import React from "react";
import { Link } from "react-router-dom";
import ApartmentCardSlider from "./ApartmentCardSlider";
import PillButton from "./PillButton";
import { ApartmentUnit } from "../data/apartmentsData";

export interface ApartmentCardProps {
  apartment: ApartmentUnit;
  linkPrefix?: string;
}

export default function ApartmentCard({
  apartment,
  linkPrefix = "/apartments-cards",
}: ApartmentCardProps) {
  const photos =
    apartment.gallery && apartment.gallery.length > 0
      ? apartment.gallery
      : [apartment.coverImage];

  const detailUrl = `${linkPrefix}/${apartment.id}`;

  return (
    <div role="listitem" className="apartment_item w-dyn-item">
      <ApartmentCardSlider
        photos={photos}
        apartId={apartment.id}
        apartName={apartment.name}
        status={apartment.status}
        beds={apartment.beds}
        baths={apartment.baths}
        sqft={apartment.sqft}
      />

      {/* Content Below Image */}
      <div className="content_apart">
        <div className="apart_title_line">
          <div className="apartment_title">
            <Link to={detailUrl} className="apart_title">
              {apartment.name}
            </Link>
          </div>
          <div className="price_box">
            <div className="icon_price">
              <img src="/assets/icons/price-icon.png" alt="$" className="image" />
            </div>
            <div className="price_txt">{apartment.priceFormatted}</div>
            <div className="mnth_txt">/month</div>
          </div>
        </div>

        <div className="explore_button">
          <PillButton
            text="Explore Details"
            to={detailUrl}
            textBoxClassName="apartments_button"
          />
        </div>
      </div>
    </div>
  );
}
