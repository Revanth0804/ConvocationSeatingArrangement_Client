import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";


const AdminDashboardContainer = styled.main`
  line-height: 1.8;
  padding: 20px;`
;

const Select = styled.select`
  margin-left: 2%;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
  background-color: #fff;
  color: #05445e;
  font-size: 16px;
  cursor: pointer;

  &:focus {
    border-color: #05445e;
    outline: none;
  }

  option {
    padding: 10px;
    background-color: #fff;
    color: #05445e;
  }

  option:hover {
    background-color: #eafaf1;
  }`
;

const Section = styled.section`
  margin: 20px 0;`
;

const Heading = styled.h2`
  text-align: center;
  color: #05445e;`
;

const Card = styled.div`
  background-color: ${({ bgcolor }) => bgcolor || "#f7f9fa"};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;`
;

const SubHeading = styled.h4`
  margin-bottom: 15px;`
;

const Input = styled.input`
  margin-left: 2%;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;`
;

const Button = styled.button`
  margin-top: 1%;
  margin-left: 2%;
  padding: 10px 15px;
  width: ${({ wide }) => (wide ? "200px" : "auto")};
  background-color: ${({ primary }) => (primary ? "#05445e" : "#e74c3c")};
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ primary }) => (primary ? "#189ab4" : "#c0392b")};
  }`
;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;`
;

const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid #0b0202;
  text-align: left;
  background-color: #05445e;
  color: white;`
;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #0b0202;
  text-align: left;`
;

const StatusMessage = styled.p`
  margin-top: 10px;
  font-weight: bold;
  color: #05445e;`
;


const AdminDashboard = () => {
  const [seatingData, setSeatingData] = useState([]);
  const [statusMessage, setStatusMessage] = useState("Waiting to add students...");
  const [editStudent, setEditStudent] = useState(null);
  const [newSeatNumber, setNewSeatNumber] = useState("");
  const [newSeries, setNewSeries] = useState("");
  const [newStudent, setNewStudent] = useState({
    registration_number: "",
    name: "",
    department: "",
    year: "",
    seat_number: "",
  });

  const [entriesPerPage, setEntriesPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedData, setDisplayedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const api_url = "https://server-u9ga.onrender.com/Student";


  useEffect(() => {
    axios
      .get(api_url)
      .then((response) => {
        setSeatingData(response.data);
        setStatusMessage("Data loaded successfully.");
      })
      .catch((error) => {
        setStatusMessage(`Error fetching data: ${error.message}`);
      });
  }, []);

 
  useEffect(() => {
    const filteredData = seatingData.filter((student) => {
      const matchesSearch =
        student.registration_number
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.seat_number.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        selectedDepartment === "" || student.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    setDisplayedData(filteredData.slice(startIndex, endIndex));
  }, [seatingData, entriesPerPage, currentPage, searchQuery, selectedDepartment]);

  const handleEdit = (student) => {
    setEditStudent(student);
    setNewSeatNumber(student.seat_number);
  };

  const handleSave = () => {
    if (!newSeatNumber) {
      setStatusMessage("Seat number cannot be empty!");
      return;
    }

    const updatedStudent = { ...editStudent, seat_number: newSeatNumber };

    axios
      .put(`${api_url}/${editStudent.id}`, updatedStudent)
      .then(() => {
        const updatedSeatingData = seatingData.map((student) =>
          student.id === editStudent.id ? updatedStudent : student
        );
        setSeatingData(updatedSeatingData);
        setEditStudent(null);
        setNewSeatNumber("");
        setStatusMessage("Seat number updated successfully.");
      })
      .catch((error) => {
        setStatusMessage(`Error updating data: ${error.message}`);
      });
  };

  const handleCancel = () => {
    setEditStudent(null);
    setNewSeatNumber("");
  };

  const handleDelete = (id) => {
    axios
      .delete(`${api_url}/${id}`)
      .then(() => {
        const updatedSeatingData = seatingData.filter(
          (student) => student.id !== id
        );
        setSeatingData(updatedSeatingData);
        setStatusMessage("Student deleted successfully.");
      })
      .catch((error) => {
        setStatusMessage(`Error deleting data: ${error.message}`);
      });
  };

  const handleAddStudent = () => {
    const seat_number = `${newSeries}${newSeatNumber}`;

    if (
      !newStudent.registration_number ||
      !newStudent.name ||
      !newStudent.department ||
      !newStudent.year ||
      !seat_number
    ) {
      setStatusMessage("All fields are required to add a new student!");
      return;
    }

    if (newSeatNumber < 1 || newSeatNumber > 20) {
      setStatusMessage("Seat number must be between 1 and 20!");
      return;
    }

    const isSeatNumberExists = seatingData.some(
      (student) => student.seat_number === seat_number
    );

    if (isSeatNumberExists) {
      setStatusMessage("Seat number already exists!");
      return;
    }

    const studentData = {
      ...newStudent,
      seat_number,
    };

    axios
      .post(api_url, studentData)
      .then((response) => {
        setSeatingData([...seatingData, response.data]);
        setNewStudent({
          registration_number: "",
          name: "",
          department: "",
          year: "",
          seat_number: "",
        });
        setNewSeries("");
        setNewSeatNumber("");
        setStatusMessage("New student added successfully.");
      })
      .catch((error) => {
        setStatusMessage(`Error adding student: ${error.message}`);
      });
  };

  const handleEntriesPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setEntriesPerPage(value);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(seatingData.length / entriesPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <AdminDashboardContainer>
      <Section>
        <Card bgcolor="#f0f8ff">
          <Heading>Add New Student</Heading>
          <div>
            {/* Add New Student Form */}
            <Input
              type="text"
              placeholder="Registration Number"
              value={newStudent.registration_number}
              onChange={(e) =>
                setNewStudent({ ...newStudent, registration_number: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Name"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
            />
            <Select
              value={newStudent.department}
              onChange={(e) =>
                setNewStudent({ ...newStudent, department: e.target.value })
              }
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Electronics">Electronics</option>
            </Select>
            <Select
              value={newStudent.year}
              onChange={(e) =>
                setNewStudent({ ...newStudent, year: e.target.value })
              }
            >
              <option value="">Select Year</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </Select>

            <Select
              value={newSeries}
              onChange={(e) => setNewSeries(e.target.value)}
            >
              <option value="">Select Seat Series</option>
              <option value="A" disabled>A</option>
              <option value="B" disabled>B</option>
              <option value="C" disabled>C</option>
              <option value="D" disabled>D</option>
              <option value="E" disabled>E</option>
              <option value="F" disabled>F</option>
              <option value="G" disabled>G</option>
              <option value="H" disabled>H</option>
              <option value="I">I</option>
              <option value="J">J</option>
            </Select>

            <Input
              type="number"
              placeholder="Seat Number"
              value={newSeatNumber}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (value >= 1 && value <= 20) {
                  setNewSeatNumber(value);
                }
              }}
              min="1"
              max="20"
            />
            <Button onClick={handleAddStudent} primary wide>
              Add Student
            </Button>
            <StatusMessage>{statusMessage}</StatusMessage>
          </div>
        </Card>
      </Section>

      {/* Manage Seats Section */}
      <Section>
        <Card bgcolor="#eafaf1">
          <Heading>Manage Seats</Heading>
          <div>
            {/* Search Input */}
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Department Filter */}
            <Select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Electronics">Electronics</option>
            </Select>

            {/* Entries Per Page */}
            <Select
              value={entriesPerPage}
              onChange={handleEntriesPerPageChange}
            >
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={150}>150</option>
              <option value={200}>200</option>
            </Select>

            <StatusMessage>Status: {statusMessage}</StatusMessage>
            <Table>
              {/* Table Code Remains Unchanged */}
              <thead>
                <tr>
                  <TableHeader>Reg. No.</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Department</TableHeader>
                  <TableHeader>Year</TableHeader>
                  <TableHeader>Seat No.</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((student) => (
                  <tr key={student.id}>
                    <TableCell>{student.registration_number}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>
                      {editStudent && editStudent.id === student.id ? (
                        <Input
                          type="text"
                          value={newSeatNumber}
                          onChange={(e) => setNewSeatNumber(e.target.value)}
                        />
                      ) : (
                        student.seat_number
                      )}
                    </TableCell>
                    <TableCell>
                      {editStudent && editStudent.id === student.id ? (
                        <>
                          <Button onClick={handleSave}>Save</Button>
                          <Button onClick={handleCancel}>Cancel</Button>
                        </>
                      ) : (
                        <Button onClick={() => handleEdit(student)}>Edit</Button>
                      )}
                      <Button onClick={() => handleDelete(student.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div>
              <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </Button>
              <Button
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(seatingData.length / entriesPerPage)}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      </Section>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
