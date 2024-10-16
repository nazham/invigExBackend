import { Request, Response } from "express";
import CentreLog from "../models/CentreLog";
import Centre, { ICentre } from "../models/ExamCentre";
import calculateResources from "../utils/resourceAllocator";

// Create CentreLog
export const createCentreLog = async (req: Request, res: Response) => {
  try {
    const { examDate, examCenterID, centreStatistics } = req.body;

    // Create the CentreLog with placeholder for resourceAllocation
    const centreLog = new CentreLog({
      examDate,
      examCenterID,
      centreStatistics,
      resourceAllocation: {
        roomsNeeded: 0, // Placeholder
        hallsNeeded: 0, // Placeholder
        invigilatorsNeeded: 0, // Placeholder
        totalStudents: 0, // Placeholder
      },
    });

    // Save the CentreLog document
    await centreLog.save();

    res.status(201).json(centreLog);

    // Trigger the resource allocation calculation (asynchronous call)
    calculateAndUpdateResourceAllocation(centreLog._id as string);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

// Function to calculate resource allocation and update the CentreLog
const calculateAndUpdateResourceAllocation = async (centreLogID: string) => {
  try {
    // Find the CentreLog by ID, and populate examCenterID with related Centre data
    const centreLog = await CentreLog.findById(centreLogID)
      .populate("examCenterID")
      .populate("subjectID");

    if (!centreLog) {
      console.error("CentreLog not found");
      return;
    }

    // Type assertion for the populated centreLog
    const centre = centreLog.examCenterID as unknown as ICentre; // <-- Assert the type

    // // Calculate total students
    // const totalStudents = centreLog.centreStatistics.reduce(
    //   (sum: number, stat: any) => sum + stat.appliedStudentsCount,
    //   0
    // );

    // //resource calculation
    // const { roomsNeeded, hallsNeeded, invigilatorsNeeded, students_remaining } =
    //   calculateResources(
    //     centre.totalHalls,
    //     centre.totalRooms,
    //     centre.roomCapacity,
    //     centre.hallCapacity,
    //     totalStudents
    //   );

    // // Update the CentreLog with calculated resource allocation
    // await CentreLog.findByIdAndUpdate(centreLogID, {
    //   resourceAllocation: {
    //     roomsNeeded,
    //     hallsNeeded,
    //     invigilatorsNeeded,
    //     totalStudents,
    //   },
    // });

    console.log(`Resource allocation updated for CentreLog ID: ${centreLogID}`);
  } catch (error) {
    console.error("Error calculating resource allocation:", error);
  }
};

// Read all CentreLogs
export const getAllCentreLogs = async (req: Request, res: Response) => {
  try {
    const centreLogs = await CentreLog.find().populate("examCenterID");
    res.status(200).json(centreLogs);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error retrieving exam centre Logs", error });
  }
};

// Read CentreLog by ID
export const getCentreLogById = async (req: Request, res: Response) => {
  try {
    const centreLog = await CentreLog.findById(req.params.id)
      .populate("examCenterID")
      .populate("centreStatistics.subjectID");
    if (!centreLog) {
      return res.status(404).json({ error: "CentreLog not found" });
    }
    res.status(200).json(centreLog);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error retrieving exam centre Log", error });
  }
};

// Update CentreLog
export const updateCentreLog = async (req: Request, res: Response) => {
  try {
    const updatedCentreLog = await CentreLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCentreLog) {
      return res.status(404).json({ error: "CentreLog not found" });
    }
    res.status(200).json(updatedCentreLog);
  } catch (error) {
    res.status(400).json({ message: "Error updating exam centre Log", error });
  }
};

// Delete CentreLog
export const deleteCentreLog = async (req: Request, res: Response) => {
  try {
    const deletedCentreLog = await CentreLog.findByIdAndDelete(req.params.id);
    if (!deletedCentreLog) {
      return res.status(404).json({ error: "CentreLog not found" });
    }
    res.status(200).json({ message: "CentreLog deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting exam centre Log", error });
  }
};
