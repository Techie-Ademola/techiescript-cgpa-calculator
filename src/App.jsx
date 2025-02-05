import { useState, useEffect } from "react";
import { toast } from "sonner";
import swal from "sweetalert"; // Import SweetAlert
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import "./App.css";

const gradingSystem = [
  { min: 70, max: 100, grade: "A", points: 5 },
  { min: 60, max: 69, grade: "B", points: 4 },
  { min: 50, max: 59, grade: "C", points: 3 },
  { min: 45, max: 49, grade: "D", points: 2 },
  { min: 40, max: 44, grade: "E", points: 1 },
  { min: 0, max: 39, grade: "F", points: 0 },
];

function getGrade(score) {
  return gradingSystem.find(
    (range) => score >= range.min && score <= range.max
  );
}

export default function App() {
  const [firstSemesterCourses, setFirstSemesterCourses] = useState([
    { name: "", unit: "", score: "" },
  ]);
  const [secondSemesterCourses, setSecondSemesterCourses] = useState([
    { name: "", unit: "", score: "" },
  ]);
  const [results, setResults] = useState({
    first: { GPA: 0, totalGradePoints: 0, totalCreditUnits: 0 },
    second: { GPA: 0, totalGradePoints: 0, totalCreditUnits: 0 },
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [isFirstRowEditable, setIsFirstRowEditable] = useState(false); // Edit state
  const [isSecRowEditable, setIsSecRowEditable] = useState(false); // Edit state

  useEffect(() => {
    // Load courses from local storage on component mount
    const storedFirstSemesterCourses = JSON.parse(
      localStorage.getItem("firstSemesterCourses")
    ) || [{ name: "", unit: "", score: "" }];
    const storedSecondSemesterCourses = JSON.parse(
      localStorage.getItem("secondSemesterCourses")
    ) || [{ name: "", unit: "", score: "" }];
    setFirstSemesterCourses(storedFirstSemesterCourses);
    setSecondSemesterCourses(storedSecondSemesterCourses);

    if (storedFirstSemesterCourses) {
      if (storedFirstSemesterCourses.length > 1) {
        setIsFirstRowEditable(false);
      } else {
        setIsFirstRowEditable(true);

      }
    }

    if (storedSecondSemesterCourses) {
      if (storedSecondSemesterCourses.length > 1) {
        setIsSecRowEditable(false);
      } else {
        setIsSecRowEditable(true);

      }
    }
  }, []);

  const addCourse = (semester) => {
    toast.success("Row Added!");
    const newCourse = { name: "", unit: "", score: "" };
    if (semester === "first") {
      setIsFirstRowEditable(true);

      const newCourses = [...firstSemesterCourses, newCourse];
      setFirstSemesterCourses(newCourses);
      localStorage.setItem("firstSemesterCourses", JSON.stringify(newCourses)); // Save to local storage
    } else {
      setIsSecRowEditable(true);

      const newCourses = [...secondSemesterCourses, newCourse];
      setSecondSemesterCourses(newCourses);
      localStorage.setItem("secondSemesterCourses", JSON.stringify(newCourses)); // Save to local storage
    }
  };

  const editCourse = (semester) => {
    if (semester === "first") {
      setIsFirstRowEditable(!isFirstRowEditable);
      if (!isFirstRowEditable)
        toast.success("First Semester Rows Enabled!");

      if (isFirstRowEditable)
        toast.success("Saved!");
    } else if (semester === "second") {
      setIsSecRowEditable(!isSecRowEditable);
      if (!isSecRowEditable)
      toast.success("Second Semester Rows Enabled!");

      if (isSecRowEditable)
        toast.success("Saved!");
    }
  }

  const handleChange = (semester, index, field, value) => {
    if (semester === "first") {
      const updatedCourses = [...firstSemesterCourses];
      updatedCourses[index][field] = value;
      setFirstSemesterCourses(updatedCourses);
      localStorage.setItem(
        "firstSemesterCourses",
        JSON.stringify(updatedCourses)
      ); // Update local storage
    } else {
      const updatedCourses = [...secondSemesterCourses];
      updatedCourses[index][field] = value;
      setSecondSemesterCourses(updatedCourses);
      localStorage.setItem(
        "secondSemesterCourses",
        JSON.stringify(updatedCourses)
      ); // Update local storage
    }
  };

  const deleteCourse = (semester, index) => {
    if (semester === "first" && firstSemesterCourses.length > 1) {
      swal({
        title: `Confirm you want to delete ${firstSemesterCourses[index].name} data`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const updatedCourses = firstSemesterCourses.filter(
            (_, i) => i !== index
          );
          setFirstSemesterCourses(updatedCourses);
          localStorage.setItem(
            "firstSemesterCourses",
            JSON.stringify(updatedCourses)
          ); // Update local storage
        }
      });
    } else if (semester === "second" && secondSemesterCourses.length > 1) {
      swal({
        title: `Confirm you want to delete ${secondSemesterCourses[index].name} data`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const updatedCourses = secondSemesterCourses.filter(
            (_, i) => i !== index
          );
          setSecondSemesterCourses(updatedCourses);
          localStorage.setItem(
            "secondSemesterCourses",
            JSON.stringify(updatedCourses)
          ); // Update local storage
        }
      });
    } else {
      toast.error("You must have at least one course in the semester.");
    }
  };

  const calculateGPA = (semesterCourses) => {
    let totalGradePoints = 0;
    let totalCreditUnits = 0;

    semesterCourses.forEach((course) => {
      const { unit, score } = course;
      if (!unit || !score) return;
      const gradeInfo = getGrade(Number(score));
      const gradePoint = gradeInfo.points * Number(unit);
      totalGradePoints += gradePoint;
      totalCreditUnits += Number(unit);
    });

    return totalCreditUnits === 0
      ? 0
      : (totalGradePoints / totalCreditUnits).toFixed(2);
  };

  const calculateResults = () => {
    setResults({
      first: { GPA: 0, totalGradePoints: 0, totalCreditUnits: 0 },
      second: { GPA: 0, totalGradePoints: 0, totalCreditUnits: 0 },
    });
    
    setLoading(true); // Set loading to true
    setTimeout(() => {
      const firstGPA = calculateGPA(firstSemesterCourses);
      const secondGPA = calculateGPA(secondSemesterCourses);

      const totalQualityPoints =
        firstGPA * firstSemesterCourses.length +
        secondGPA * secondSemesterCourses.length;
      const totalCreditUnits =
        firstSemesterCourses.length + secondSemesterCourses.length;

      const CGPA =
        totalCreditUnits === 0
          ? 0
          : (totalQualityPoints / totalCreditUnits).toFixed(2);

      setResults({
        first: {
          GPA: firstGPA,
          totalGradePoints: firstGPA * firstSemesterCourses.length,
          totalCreditUnits: firstSemesterCourses.length,
        },
        second: {
          GPA: secondGPA,
          totalGradePoints: secondGPA * secondSemesterCourses.length,
          totalCreditUnits: secondSemesterCourses.length,
        },
        CGPA,
      });
      setLoading(false); // Reset loading to false after calculation
    }, 2000); // Simulate a 2-second loading time
  };

  return (
    <div className="container px-sm-4 pt-3">
      <div className="jumbotron pt-0 bg-dark">
      <div className="fit-content">
        <img src="./cgpa_logo_edited.png" alt="" />
      </div>
        {/* <h1 className="text-center font-weight-bold">CGPA Calculator</h1> */}
      </div>

      <div className="d-sm-flex justify-content-between align-items-center">
        <h5 className="mt-4 font-weight-bold">First Semester Courses</h5>
        {firstSemesterCourses.length && (
          <button
            onClick={() => editCourse("first")}
            style={{ background: "#343a40", color: "white" }}
            className="btn mt-2 d-block mx-auto mx-sm-0 mb-4 mb-sm-0 mt-4 mt-sm-0"
          >
          {
            !isFirstRowEditable ? 
            <>
            <i className="bi bi-pen"></i> Edit
            </> : 
            <>
            {/* <i className="bi bi-upload"></i>  */}
            Save Changes
            </>
          }
          </button>
        )}
      </div>
      {firstSemesterCourses.map((course, index) => (
        <div
          key={index}
          className={`${
            index === firstSemesterCourses.length - 1 ? "" : "border-bottom"
          } form-group row mt-2 pb-2`}
        >
          <div className="my-2 col-12 px-1 col-sm-5">
            <input
              type="text"
              placeholder="Course Code"
              value={course.name}
              onChange={(e) =>
                handleChange("first", index, "name", e.target.value)
              }
              disabled={!isFirstRowEditable}
              className="form-control"
            />
          </div>
          <div className="my-2 col-6 px-1 col-sm-3">
            <input
              type="number"
              placeholder="Course Unit"
              value={course.unit}
              onChange={(e) =>
                handleChange("first", index, "unit", e.target.value)
              }
              disabled={!isFirstRowEditable}
              className="form-control"
            />
          </div>
          <div className="my-2 col-4 px-1 col-sm-3">
            <input
              type="number"
              placeholder="Score"
              value={course.score}
              onChange={(e) =>
                handleChange("first", index, "score", e.target.value)
              }
              disabled={!isFirstRowEditable}
              className="form-control"
            />
          </div>
          <div className="my-2 col-1 px-2">
            <button
              onClick={() => deleteCourse("first", index)}
              className="btn btn-danger"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      ))}

      {firstSemesterCourses.length && (
        <div className="d-sm-flex justify-content-end align-items-center">
          <button
            onClick={() => addCourse("first")}
            style={{ background: "#343a40", color: "white" }}
            className="btn d-block mx-auto mx-sm-0 mb-4 mb-sm-0 mt-0"
          >
            <i className="bi bi-plus"></i> Add Course
          </button>
        </div>
      )}

      <div className="d-sm-flex justify-content-between align-items-center mt-5">
        <h5 className="mt-4 font-weight-bold">Second Semester Courses</h5>

        {secondSemesterCourses.length && (
          <button
            onClick={() => editCourse("second")}
            style={{ background: "#343a40", color: "white" }}
            className="btn mt-0 d-block mx-auto mx-sm-0 mb-4 mb-sm-0 mt-4 mt-sm-0"
          >
          {
            !isSecRowEditable ? 
            <>
            <i className="bi bi-pen"></i> Edit
            </> : 
            <>
            {/* <i className="bi bi-upload"></i>  */}
            Save Changes
            </>
          }
          </button>
        )}
      </div>

      {secondSemesterCourses.map((course, index) => (
        <div
          key={index}
          className={`${
            index === secondSemesterCourses.length - 1 ? "" : "border-bottom"
          } form-group row mt-2 pb-2`}
        >
          <div className="my-2 col-12 px-1 col-sm-5">
            <input
              type="text"
              placeholder="Course Code"
              value={course.name}
              onChange={(e) =>
                handleChange("second", index, "name", e.target.value)
              }
              disabled={!isSecRowEditable}
              className="form-control"
            />
          </div>
          <div className="my-2 col-6 px-1 col-sm-3">
            <input
              type="number"
              placeholder="Course Unit"
              value={course.unit}
              onChange={(e) =>
                handleChange("second", index, "unit", e.target.value)
              }
              disabled={!isSecRowEditable}
              className="form-control"
            />
          </div>
          <div className="my-2 col-4 px-1 col-sm-3">
            <input
              type="number"
              placeholder="Score"
              value={course.score}
              onChange={(e) =>
                handleChange("second", index, "score", e.target.value)
              }
              disabled={!isSecRowEditable}
              className="form-control"
            />
          </div>
          <div className="my-2 col-1 px-2">
            <button
              onClick={() => deleteCourse("second", index)}
              className="btn btn-danger"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      ))}

      {secondSemesterCourses.length && (
        <div className="d-sm-flex justify-content-end align-items-center">
          <button
            onClick={() => addCourse("second")}
            style={{ background: "#343a40", color: "white" }}
            className="btn d-block mx-auto mx-sm-0 mb-4 mb-sm-0 mt-0"
          >
            <i className="bi bi-plus"></i> Add Course
          </button>
        </div>
      )}

      <div className="w-100 pt-1 border-top mt-5 border-top">
        <button
          onClick={calculateResults}
          className="btn mt-4"
          style={{ background: "#343a40", color: "white" }}
        >
          {loading ? "Calculating..." : "Calculate GPA and CGPA"}
        </button>
      </div>

      {/* <!-- From Uiverse.io by Spacious74 -->  */}
      <div className="row pt-5">
        <div className="col-12 my-2 col-sm-6 col-md-4">
          <div className="outer">
            <div className="dot"></div>
            <div className="card">
              <div className="ray"></div>
              <div className="text">
                {results.first.GPA === 0
                  ? results.first.GPA.toFixed(2)
                  : results.first.GPA}
              </div>
              <div>First Semester GPA</div>
              <div className="line topl"></div>
              <div className="line leftl"></div>
              <div className="line bottoml"></div>
              <div className="line rightl"></div>
            </div>
          </div>
        </div>
        <div className="col-12 my-2 col-sm-6 col-md-4">
          <div className="outer">
            <div className="dot"></div>
            <div className="card">
              <div className="ray"></div>
              <div className="text">
                {results.second.GPA === 0
                  ? results.second.GPA.toFixed(2)
                  : results.second.GPA}
              </div>
              <div>Second Semester GPA</div>
              <div className="line topl"></div>
              <div className="line leftl"></div>
              <div className="line bottoml"></div>
              <div className="line rightl"></div>
            </div>
          </div>
        </div>
        <div className="col-12 my-2 col-md-4">
          <div className="outer">
            <div className="dot"></div>
            <div className="card">
              <div className="ray"></div>
              <div className="text">
                {results.CGPA !== null && results.CGPA !== undefined
                  ? results.CGPA
                  : "0.00"}
              </div>
              <div>Cumulative CGPA</div>
              <div className="line topl"></div>
              <div className="line leftl"></div>
              <div className="line bottoml"></div>
              <div className="line rightl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-4">
        <h2 className="font-weight-bold">First Semester GPA:</h2>
        <p className="text-lg">{results.first.GPA}</p>
      </div>

      <div className="mt-4">
        <h2 className="font-weight-bold">Second Semester GPA:</h2>
        <p className="text-lg">{results.second.GPA}</p>
      </div>

      <div className="mt-4">
        <h2 className="font-weight-bold">Cumulative CGPA:</h2>
        <p className="text-xl">{results.CGPA}</p>
      </div> */}

      <div className="author">
        Developed by <span>Techiescript 👨‍💻 </span>
      </div>
    </div>
  );
}
