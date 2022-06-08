import moment from "moment";

export const isMeetingHappeningAtTime = (
  { date, startTime, endTime },
  time
) => {
  const startDateTime = moment(
    `${date} ${startTime}`,
    "DD/MM/YYYY HH:mm"
  ).valueOf();
  const endDateTime = moment(
    `${date} ${endTime}`,
    "DD/MM/YYYY HH:mm"
  ).valueOf();

  return time > startDateTime && time < endDateTime;
};

export const checkIfRoomIsFree = (meetingRoom, currentDateTime) => {
  return !meetingRoom.meetings.filter((meeting) =>
    isMeetingHappeningAtTime(meeting, currentDateTime)
  ).length;
};

export const getNumOfFreeRoomsNow = (buildings) => {
  const now = moment().format("DD/MM/YYYY HH:mm");
  return buildings
    .map(
      (b) =>
        b.meetingRooms.filter((room) => checkIfRoomIsFree(room, now)).length
    )
    .reduce((a, b) => a + b);
};

export const isMeetingToday = (meeting) => {
  const today = moment().format("DD/MM/YYYY");
  console.log({ today, meeting });
  return meeting.date === today;
};

export const isMeetingCoinciding = (
  { date, startTime, endTime },
  passedStartTime,
  passedEndTime
) => {
  const startDateTime = moment(
    `${date} ${startTime}`,
    "DD/MM/YYYY HH:mm"
  ).valueOf();
  const endDateTime = moment(
    `${date} ${endTime}`,
    "DD/MM/YYYY HH:mm"
  ).valueOf();
  return !(
    (passedStartTime < startDateTime && passedEndTime < startDateTime) ||
    (passedStartTime > endDateTime && passedEndTime > endDateTime)
  );
};

export const isMeetingHappeningNow = (meeting) => {
  const now = moment().format("DD/MM/YYYY HH:mm");
  return isMeetingHappeningAtTime(meeting, now);
};

export const getTotalMeetingsToday = (buildings) => {
  let meetings = [];
  buildings.forEach(({ meetingRooms }) => {
    for (let room of meetingRooms) {
      meetings = [...meetings, ...room.meetings];
    }
  });
  console.log(meetings);
  return meetings.filter(isMeetingToday).length;
};

export const getMeetingsRunningCurrently = (buildings) => {
  let meetings = [];
  buildings.forEach(({ meetingRooms }) => {
    for (let room of meetingRooms) {
      meetings = [...meetings, room.meetings];
    }
  });
  return meetings.filter(isMeetingHappeningNow).length;
};

export const generateRandomIntId = (max = 10000000, min = 10) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isRoomFreeForTime = (
  meetingRoom,
  { date, startTime, endTime }
) => {
  const meetingsHappeningAtDate = meetingRoom.meetings.filter(
    (meeting) => meeting.date === date
  );
  const passedStartTime = moment(
    `${date} ${startTime}`,
    "DD/MM/YYYY HH:mm"
  ).valueOf();
  const passedEndTime = moment(
    `${date} ${endTime}`,
    "DD/MM/YYYY HH:mm"
  ).valueOf();
  if (!meetingsHappeningAtDate.length) {
    return true;
  } else {
    const coincidingMeetings = meetingRoom.meetings.filter((meeting) => {
      return isMeetingCoinciding(meeting, passedStartTime, passedEndTime);
    });
    return !coincidingMeetings.length;
  }
};
