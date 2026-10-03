import React from "react";

/* Shared by the apartment detail and amenities pages. The class names are the
   template's original "pets" ones, so each page's existing styles still apply. */
export default function FamilySection() {
  return (
    <section data-section="light" className="pets">
      <div className="wrapper_pets">
        <div className="pets_heading">
          <h2 className="h2 pets_h">
            For You.
            <br />
            For{" "}
            <span data-scribble="5" className="scribble-wrap">
              Family.
            </span>
          </h2>
        </div>

        <div className="pets_ill">
          <div className="box_pets" role="img" aria-label="Two armchairs and a side table with two cups of chai" />
          <div className="p_pets">
            <div className="p_gen black">
              A home planned around the people you share it with. Every bedroom
              is a quiet corner of its own, the living room has space for
              festivals and Sunday lunches, and the balcony is made for evening
              chai. From a child's first steps to your parents' morning walk,
              the home keeps everyone close while giving each person room to
              breathe.
            </div>
          </div>
        </div>

        <div className="pet_boxes">
          <div className="pet_box">
            <div className="pet_title">A room for everyone</div>
            <div className="pet_desc">
              Well-planned bedrooms give every member of the family privacy and
              rest, all under one roof.
            </div>
          </div>
          <div className="pet_box">
            <div className="pet_title">Space to come together</div>
            <div className="pet_desc">
              An open living and dining area sized for festivals, family dinners
              and guests who stay a little longer.
            </div>
          </div>
          <div className="pet_box">
            <div className="pet_title">Easy for every age</div>
            <div className="pet_desc">
              Power back-up, filtered water, intercom and lifts keep daily life
              simple, from toddlers to grandparents.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
