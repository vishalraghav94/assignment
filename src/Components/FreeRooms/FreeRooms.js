import "./FreeRooms.css";
import { Info } from "../Info/Info";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Button } from "../Button/Button";
import { GET_MEETING_ROOMS } from "../../GraphQL/Queries";
import { ADD_MEETING } from "../../GraphQL/Mutations";
import { generateRandomIntId, isRoomFreeForTime } from "../../helper";
import { useNavigate } from "react-router-dom";

export const FreeRooms = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [
    makeMutation,
    { data: mutatedData, loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_MEETING, {
    context: {
      headers: {
        token: "ghohahhbscbkkh", // this header will reach the server
      },
    },
  });
  const [meetingRooms, setMeetingRooms] = useState(null);
  const [selectedMeetingRoom, setSelectedMeetingRoom] = useState(null);
  const { loading, errors, data } = useQuery(GET_MEETING_ROOMS, {
    context: {
      headers: {
        token: "ghohahhbscbkkh", // this header will reach the server
      },
    },
  });

  async function submitForm(e) {
    makeMutation({
      variables: {
        ...state,
        meetingRoomId: selectedMeetingRoom,
        id: generateRandomIntId(),
      },
    })
      .then((res) => {
        alert("Meeting Created");
        navigate("/");
      })
      .catch(alert);
  }

  function handleMeetingRoomClick(e) {
    console.log(e.target.getAttribute("data-id"));
    setSelectedMeetingRoom(Number(e.target.getAttribute("data-id")));
  }

  useEffect(() => {
    if (state?.building && data?.MeetingRooms) {
      console.log({ state });
      const meetingRoomsInBuilding = data.MeetingRooms.filter(
        (mR) => mR.building.id === state.building
      );
      console.log(state.building, meetingRoomsInBuilding);
      setMeetingRooms(meetingRoomsInBuilding);
    }
  }, [state, data]);

  return (
    <div className="free-rooms-container">
      <h3 className="free-room-container-heading">
        Please select one of the free rooms
      </h3>
      <div onClick={handleMeetingRoomClick}>
        {!loading ? (
          meetingRooms?.filter((meetingRoom) =>
            isRoomFreeForTime(meetingRoom, state)
          )?.length ? (
            meetingRooms
              .filter((meetingRoom) => isRoomFreeForTime(meetingRoom, state))
              .map(({ floor, name, id }) => (
                <Info
                  title={`Building ${state?.building}`}
                  key={id}
                  subtitle={`Floor ${floor}`}
                  heading={name}
                  data-id={id}
                  style={{
                    cursor: "pointer",
                    background: selectedMeetingRoom === id ? "green" : "white",
                  }}
                />
              ))
          ) : (
            <div>No Free Rooms Found</div>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="button-container">
        <Button disabled={!selectedMeetingRoom} onClick={submitForm}>
          {mutationLoading ? "Creating Meeting..." : "Save"}
        </Button>
      </div>
    </div>
  );
};
