import { gql } from "@apollo/client";

export const LOAD_BUILDINGS = gql`
  query {
    Buildings {
      name
      id
      meetingRooms {
        id
        name
        floor
        meetings {
          id
          title
          date
          startTime
          endTime
        }
      }
    }
  }
`;

export const GET_MEETING_ROOMS = gql`
  {
    MeetingRooms {
      id
      name
      floor
      building {
        id
      }
      meetings {
        id
        title
        date
        startTime
        endTime
      }
    }
  }
`;
