//the sum of appliedStudentsCount in the same session(AM/PM) with different subjectCodes(characters before "-")

interface SubjectID {
    _id: string;
    subjectCode: string;
    name: string;
    examType: string;
  }
  
  interface CentreStatistics {
    subjectID: SubjectID;
    appliedStudentsCount: number;
    session: "AM" | "PM";
  }
  
  // The input array with session and subject information
  const centreStatistics: CentreStatistics[] = [
    {
      subjectID: {
        _id: "66faf5825afc775e34f97b97",
        subjectCode: "040S-i,ii",
        name: "Mathematics",
        examType: "GCE OL",
      },
      appliedStudentsCount: 27,
      session: "AM",
    },
    {
      subjectID: {
        _id: "66faf6315afc775e34f97b9e",
        subjectCode: "043S-i",
        name: "Mathematics",
        examType: "GCE OL",
      },
      appliedStudentsCount: 44,
      session: "AM",
    },
    {
      subjectID: {
        _id: "66faf6315afc775e34f97b9e",
        subjectCode: "043S-iii",
        name: "Mathematics",
        examType: "GCE OL",
      },
      appliedStudentsCount: 44,
      session: "AM",
    },
    {
      subjectID: {
        _id: "66faf6315afc775e34f97b9e",
        subjectCode: "044S-i,ii",
        name: "Mathematics",
        examType: "GCE OL",
      },
      appliedStudentsCount: 27,
      session: "AM",
    },
    {
      subjectID: {
        _id: "66faf6315afc775e34f97b9e",
        subjectCode: "043S-ii",
        name: "Mathematics",
        examType: "GCE OL",
      },
      appliedStudentsCount: 44,
      session: "PM",
    },
    {
      subjectID: {
        _id: "66faf6315afc775e34f97b9e",
        subjectCode: "050S-i,ii",
        name: "Mathematics",
        examType: "GCE OL",
      },
      appliedStudentsCount: 22,
      session: "PM",
    },
  ];
  
  // Helper function to extract subjectCode prefix (characters before "-")
  function getSubjectCodePrefix(subjectCode: string): string {
  
    //specail case for ART subject as allocation differs
    if (subjectCode !== "043S-ii") {
      return subjectCode.split("-")[0];
    }
    return subjectCode;
  }
  
  // Main function to sum appliedStudentsCount by session and subjectCode prefix
  function sumBySessionAndSubjectPrefix(data: CentreStatistics[]): number {
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
  
    console.log(sessionSums);
  
    // Now sum all values for each session
    const totalSums: Record<string, number> = {};
    for (const session in sessionSums) {
      totalSums[session] = Object.values(sessionSums[session]).reduce(
        (acc, count) => acc + count,
        0
      );
    }
  
    // Return the maximum sum between AM and PM
    return Math.max(totalSums["AM"] || 0, totalSums["PM"] || 0);
  }
  
  const maxSum = sumBySessionAndSubjectPrefix(centreStatistics);
  console.log(maxSum);
  
  // ----------------------------------------------------------------------------------------------------
  
  const hall_available = 1;
  const room_available = 4;
  const room_capacity = 20;
  const hall_capacity = 75;
  const stu_count = maxSum;
  
  export default function calculateResources(
    hall_available: number,
    room_available: number,
    room_capacity: number,
    hall_capacity: number,
    stu_count: number
  ) {
    let hallsNeeded: number;
    let roomsNeeded: number;
    let invigilatorsNeeded: number;
  
    // Calculate how many students remain after filling halls
    let students_remaining = stu_count - hall_available * hall_capacity;
  
    // Determine how many halls are needed (use available halls)
    hallsNeeded = hall_available > 0 ? hall_available : 0;
  
    // If there are students remaining after allocating halls, calculate the rooms needed
    if (students_remaining > 0) {
      roomsNeeded = Math.ceil(students_remaining / room_capacity);
  
      students_remaining -= room_available * room_capacity;
    } else {
      roomsNeeded = 0;
    }
  
    // Ensure remaining students count is non-negative
    students_remaining = Math.max(students_remaining, 0);
  
    // Calculate invigilators needed (based on hall and room capacity)
    invigilatorsNeeded = Math.ceil(
      (hallsNeeded * hall_capacity) / 25 + (roomsNeeded * room_capacity) / 20
    );
  
    // Output the result
    console.log(
      `Halls needed: ${hallsNeeded} (Available: ${hall_available})\n` +
        `Rooms needed: ${roomsNeeded} (Available: ${room_available})\n` +
        `Invigilators needed: ${invigilatorsNeeded}\n` +
        `Remaining students unallocated: ${students_remaining} (All students: ${stu_count})`
    );
  
    return {
      hallsNeeded,
      roomsNeeded,
      invigilatorsNeeded,
      students_remaining,
    };
  }
  
  // Test the function
  calculateResources(
    hall_available,
    room_available,
    room_capacity,
    hall_capacity,
    stu_count
  );
  