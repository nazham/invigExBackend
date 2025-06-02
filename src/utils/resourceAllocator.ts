//the sum of appliedStudentsCount in the same session(AM/PM) with different subjectCodes(characters before "-")

interface SubjectID {
  _id: string;
  subjectCode: string;
  name: string;
  examType: string;
}

export interface CentreStatistics {
  subjectID: SubjectID;
  appliedStudentsCount: number;
  session: "AM" | "PM";
}

// The input array with session and subject information
const centreStatistics: CentreStatistics[] = [
  {
    subjectID: {
      _id: "66faf6315afc775e34f97b9e",
      subjectCode: "032S-i",
      name: "Mathematics",
      examType: "GCE OL",
    },
    appliedStudentsCount: 139,
    session: "AM",
  },
{
    subjectID: {
      _id: "66faf6315afc775e34f97b9e",
      subjectCode: "032E-i",
      name: "Mathematics",
      examType: "GCE OL",
    },
    appliedStudentsCount: 1,
    session: "AM",
  },
{
    subjectID: {
      _id: "66faf6315afc775e34f97b9e",
      subjectCode: "032S-ii",
      name: "Mathematics",
      examType: "GCE OL",
    },
    appliedStudentsCount: 139,
    session: "PM",
  },
{
    subjectID: {
      _id: "66faf6315afc775e34f97b9e",
      subjectCode: "032E-ii",
      name: "Mathematics",
      examType: "GCE OL",
    },
    appliedStudentsCount: 1,
    session: "PM",
  },
];

// Helper function to extract subjectCode prefix (characters before "-")
function getSubjectCodePrefix(subjectCode: string): string {
  // Special case for ART subject as allocation differs
  if (subjectCode !== "043S-ii") {
    return subjectCode.split("-")[0];
  }
  return subjectCode;
}

// Main function to sum appliedStudentsCount by session and subjectCode prefix
function sumBySessionAndSubjectPrefix(data: CentreStatistics[]) {
  // An object to store sums per session
  const sessionSums: Record<string, Record<string, number>> = {};

  data.forEach(({ session, subjectID, appliedStudentsCount }) => {
    const subjectCodePrefix = getSubjectCodePrefix(subjectID.subjectCode);

    // Initialize session in sessionSums if it doesn't exist
    if (!sessionSums[session]) {
      sessionSums[session] = {};
    }

    // Add appliedStudentsCount for unique subjectCode prefix
    if (!sessionSums[session][subjectCodePrefix]) {
      sessionSums[session][subjectCodePrefix] = 0;
    }

    if (sessionSums[session][subjectCodePrefix] === 0) {
      sessionSums[session][subjectCodePrefix] += appliedStudentsCount;
    }
  });

  console.log("Session Sums: ", sessionSums);
  return sessionSums;
}

// Updated function to calculate resource allocation
export default function calculateResources(
  hall_available: number,
  room_available: number,
  room_capacity: number,
  hall_capacity: number,
  data: CentreStatistics[]
) {
  // 043-ii capacities
  const specialHallCapacity = 60;
  const specialRoomCapacity = 15;

  // Get sessionSums
  const sessionSums = sumBySessionAndSubjectPrefix(data);

  // Variables to store the maximum requirements across all sessions
  let maxHallsNeeded = 0;
  let maxRoomsNeeded = 0;
  let maxInvigilatorsNeeded = 0;

  // Iterate over each session in sessionSums
  for (const session in sessionSums) {
    const subjectsInSession = sessionSums[session];

    let studentsInSession = 0;
    let specialStudentCount = 0;

    // Check if `043S-ii` exists in the current session
    if (subjectsInSession["043S-ii"]) {
      specialStudentCount = subjectsInSession["043S-ii"];
      delete subjectsInSession["043S-ii"];
    }

    // Sum the students for other subjects
    studentsInSession = Object.values(subjectsInSession).reduce(
      (acc, count) => acc + count,
      0
    );

    // Step 4: Calculate resources for `043S-ii` (1 invigilator per 15 students)
    let hallsNeededForSpecial = 0;
    let roomsNeededForSpecial = 0;
    let invigilatorsNeededForSpecial = 0;
    let studentsRemainingForSpecial = specialStudentCount;

    if (specialStudentCount > 0) {
      if (hall_available > 0) {
        // Calculate the maximum students halls can accommodate without exceeding hall_available
        hallsNeededForSpecial = Math.min(
          hall_available,
          Math.ceil(specialStudentCount / specialHallCapacity)
        );

        // Calculate remaining students after allocating them to halls
        studentsRemainingForSpecial -=
          hallsNeededForSpecial * specialHallCapacity;
      }

      if (studentsRemainingForSpecial > 0) {
        roomsNeededForSpecial = Math.ceil(
          studentsRemainingForSpecial / specialRoomCapacity
        );
      }
      // Ensure that studentsRemainingForSpecial is non-negative
      studentsRemainingForSpecial = Math.max(studentsRemainingForSpecial, 0);

      invigilatorsNeededForSpecial = Math.ceil(specialStudentCount / 15);
    }

    // console.log("Hall needed for 043   :", hallsNeededForSpecial);
    // console.log("room needed for 043   :", roomsNeededForSpecial);
    // console.log("inv needed for 043    :", invigilatorsNeededForSpecial);
    // console.log("stu remaining for 043 :", studentsRemainingForSpecial);
    // console.log("--------------------------");

    // Step 5: Calculate resources for other subjects (1 invigilator per 20/25 students)
    let hallsNeededForOthers = 0;
    let roomsNeededForOthers = 0;
    let invigilatorsNeededForOthers = 0;
    let temp_halls = hall_available - hallsNeededForSpecial;

    let studentsRemainingForOthers =
      studentsInSession - temp_halls * hall_capacity;

    hallsNeededForOthers = temp_halls > 0 ? temp_halls : 0;

    if (studentsRemainingForOthers > 0) {
      roomsNeededForOthers = Math.ceil(
        studentsRemainingForOthers / room_capacity
      );
    }

    invigilatorsNeededForOthers = Math.ceil(
      (hallsNeededForOthers * hall_capacity) / 25 +
        (roomsNeededForOthers * room_capacity) / 20
    );

    // Step 6: Sum up the totals for this session
    let tempTotalHalls = hallsNeededForSpecial + hallsNeededForOthers;
    let tempTotalRooms = roomsNeededForSpecial + roomsNeededForOthers;
    let tempTotalInv =
      invigilatorsNeededForSpecial + invigilatorsNeededForOthers;

    maxHallsNeeded = Math.max(tempTotalHalls, maxHallsNeeded);
    maxRoomsNeeded = Math.max(tempTotalRooms, maxRoomsNeeded);
    maxInvigilatorsNeeded = Math.max(tempTotalInv, maxInvigilatorsNeeded);

    // console.log("halls needed 4 others  :", hallsNeededForOthers);
    // console.log("room needed 4 others   :", roomsNeededForOthers);
    // console.log("inv needed 4 others    :", invigilatorsNeededForOthers);
    // console.log("stu remaining 4 others :", studentsRemainingForOthers);

    // console.log("***********************");

    // console.log("total halls needed     :", maxHallsNeeded);
    // console.log("total rooms needed     :", maxRoomsNeeded);
    // console.log("total inv needed     :", maxInvigilatorsNeeded);

    // console.log("=========================");
  }

  // Step 7: Output the result
  console.log(
    `Total Halls needed: ${maxHallsNeeded} (Available: ${hall_available})\n` +
      `Total Rooms needed: ${maxRoomsNeeded} (Available: ${room_available})\n` +
      `Total Invigilators needed: ${maxInvigilatorsNeeded} \n`
  );

  return {
    hallsNeeded: maxHallsNeeded,
    roomsNeeded: maxRoomsNeeded,
    invigilatorsNeeded: maxInvigilatorsNeeded,
  };
}

const hall_available = 1;
const room_available = 4;
const room_capacity = 20;
const hall_capacity = 75;

// Test the function with actual data

// calculateResources(
//   hall_available,
//   room_available,
//   room_capacity,
//   hall_capacity,
//   centreStatistics
// );
