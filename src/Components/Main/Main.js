import "./Main.css";
import { Info } from "../Info/Info";
import { useQuery, gql } from "@apollo/client";
import { LOAD_BUILDINGS } from "../../GraphQL/Queries";
import { useEffect, useState } from "react";
import {
  getNumOfFreeRoomsNow,
  getTotalMeetingsToday,
  getMeetingsRunningCurrently,
} from "../../helper";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AddMeeting } from "../AddMeeting/AddMeeting";
import { FreeRooms } from "../FreeRooms/FreeRooms";
import { Button } from "../Button/Button";

export const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstScreen />} />
        <Route path="form" element={<AddMeeting />} />
        <Route path="select-room" element={<FreeRooms />} />
      </Routes>
    </BrowserRouter>
  );
};

function FirstScreen() {
  const { loading, errors, data } = useQuery(LOAD_BUILDINGS, {
    context: {
      headers: {
        token: "ghohahhbscbkkh", // this header will reach the server
      },
    },
  });
  const [buildings, setBuildings] = useState(null);

  useEffect(() => {
    console.log(data);
    if (data) {
      setBuildings(data.Buildings);
    }
  }, [data]);
  const navigate = useNavigate();
  function handleButtonClick() {
    navigate("/form", { replace: true, state: buildings });
  }
  return (
    <div className="main-container">
      {!loading ? (
        buildings?.length ? (
          <>
            <Info heading={`Buildings`} title={buildings.length} />
            <Info
              heading={`Rooms`}
              title={`Total ${buildings
                .map(({ meetingRooms }) => meetingRooms.length)
                .reduce((a, b) => a + b)}`}
              subtitle={`Free Now ${getNumOfFreeRoomsNow(buildings)}`}
            />
            <Info
              heading={`Meetings`}
              title={`Total ${getTotalMeetingsToday(buildings)} today`}
              subtitle={`Total ${getMeetingsRunningCurrently(
                buildings
              )} going on now`}
            />
            <div className="button-container">
              <Button onClick={handleButtonClick}>Add a meeting</Button>
            </div>
          </>
        ) : (
          <div>No Buildings Found</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
