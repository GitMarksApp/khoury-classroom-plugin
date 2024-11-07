import Button from "@/components/Button";

import "./styles.css";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SelectedClassroomContext } from "@/contexts/selectedClassroom";
import { Table, TableCell, TableRow } from "@/components/Table";
import { FaChevronLeft } from "react-icons/fa6";
import { getAssignmentIndirectNav } from "@/api/assignments";
import { getStudentWorks } from "@/api/student_works";

const Assignment: React.FC = () => {
  const location = useLocation();
  const [assignment, setAssignment] = useState<IAssignmentOutline>();
  const [studentWorks, setStudentAssignment] = useState<IStudentWork[]>([]);
  const { selectedClassroom } = useContext(SelectedClassroomContext);
  const { id } = useParams();

  useEffect(() => {
    // check if assignment has been passed through
    if (location.state) {
      setAssignment(location.state.assignment);
      const a: IAssignmentOutline = location.state.assignment;

      // sync student assignments
      if (selectedClassroom !== null && selectedClassroom !== undefined) {
        (async () => {
          try {
            const studentWorks = await getStudentWorks(
              selectedClassroom.id,
              a.id
            );
            if (studentWorks !== null && studentWorks !== undefined) {
              setStudentAssignment(studentWorks);
            }
          } catch (error) {
            console.error("Could not get assignment: ", error);
          }
        })();
      }
    } else {
      console.log("Fetching assignment from backend");
      // fetch the assignment from backend
      if (id && selectedClassroom !== null && selectedClassroom !== undefined) {
        (async () => {
          try {
            const fetchedAssignment = await getAssignmentIndirectNav(
              selectedClassroom.id,
              +id
            );
            if (fetchedAssignment !== null && fetchedAssignment !== undefined) {
              setAssignment(fetchedAssignment);
              const studentWorks = await getStudentWorks(
                selectedClassroom.id,
                fetchedAssignment.id
              );
              if (studentWorks !== null && studentWorks !== undefined) {
                setStudentAssignment(studentWorks);
              }
            }
          } catch (error) {
            console.error("Could not get assignment: ", error);
          }
        })();
      }
    }
  }, [selectedClassroom]);

  return (
    <div className="Assignment">
      {assignment && (
        <>
          <div className="Assignment__head">
            <div className="Assignment__title">
              <FaChevronLeft />
              <h2>{assignment.name}</h2>
            </div>
            <div className="Assignment__dates">
              <span>
                Due Date:{" "}
                {assignment.main_due_data
                  ? assignment.main_due_data.toString()
                  : "N/A"}
              </span>
            </div>
          </div>

          <div className="Assignment__externalButtons">
            <Button href="" variant="secondary">
              View in Github Classroom
            </Button>
            <Button href="" variant="secondary">
              View Starter Code
            </Button>
            <Button href="" variant="secondary">
              View Rubric
            </Button>
          </div>

          <h2>Metrics</h2>
          <div>Metrics go here</div>
          <h2 style={{ marginBottom: 0 }}>Student Assignments</h2>
          <Table cols={3}>
            <TableRow style={{ borderTop: "none" }}>
              <TableCell>Student Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Commit</TableCell>
            </TableRow>
            {studentWorks &&
              studentWorks.length > 0 &&
              studentWorks.map((sa, i) => (
                <TableRow key={i} className="Assignment__submission">
                  <TableCell>{sa.contributors.join(", ")}</TableCell>
                  <TableCell>Passing</TableCell>
                  <TableCell>12 Sep, 11:34pm</TableCell>
                </TableRow>
              ))}
          </Table>
        </>
      )}
    </div>
  );
};

export default Assignment;
