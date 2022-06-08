import "./AddMeeting.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";

export const AddMeeting = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [building, setBuilding] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const [buildings, setBuildings] = useState(null);

  useEffect(() => {
    if (state?.length) {
      setBuildings(state);
    }
  }, [state]);

  useEffect(() => {
    if (buildings?.length) {
      console.log({ buildings });
      setBuilding(buildings[0].id);
    }
  }, [buildings]);

  function handleSelectChange(e) {
    setBuilding(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(startTime, endTime, moment(startTime).format("HH:mm"));
    navigate("/select-room", {
      replace: true,
      state: {
        date: moment(startTime).format("DD/MM/YYYY"),
        startTime: moment(startTime).format("HH:mm"),
        endTime: moment(endTime).format("HH:mm"),
        building: Number(building),
        title,
      },
    });
  }

  return (
    <div className="form-container">
      {buildings?.length ? (
        <form onSubmit={handleFormSubmit}>
          <div className="input-container">
            <div className="input-label">Enter meeting title</div>
            <input
              type="text"
              placeholder="Meeting Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="datetime-container">
            <div className="datetime-label">Select Start Time</div>
            <DateTimePicker onChange={setStartTime} value={startTime} />
          </div>
          <div className="datetime-container">
            <div className="datetime-label">Select End Time</div>
            <DateTimePicker onChange={setEndTime} value={endTime} />
          </div>
          <select
            name="Buildings"
            id="buildings"
            onChange={handleSelectChange}
            value={building}
          >
            {buildings.map(({ name, id }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>
          <div className="button-container">
            <input type="submit" value="Next" />
          </div>
        </form>
      ) : null}
    </div>
  );
};
