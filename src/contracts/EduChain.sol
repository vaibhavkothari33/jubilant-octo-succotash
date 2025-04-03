// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract EduChain is Ownable, ReentrancyGuard {
    struct Course {
        uint256 id;
        string title;
        string description;
        address instructor;
        uint256 price;
        string ipfsHash; // For course content
        bool isActive;
        uint256 createdAt;
    }

    struct Student {
        address studentAddress;
        uint256[] enrolledCourses;
        mapping(uint256 => bool) hasCompleted;
        mapping(uint256 => uint256) progress;
    }

    // Events
    event CourseCreated(uint256 indexed courseId, string title, address instructor);
    event CourseEnrolled(uint256 indexed courseId, address student);
    event CourseCompleted(uint256 indexed courseId, address student);
    event ProgressUpdated(uint256 indexed courseId, address student, uint256 progress);

    // State variables
    uint256 private courseCounter;
    mapping(uint256 => Course) public courses;
    mapping(address => Student) public students;
    mapping(address => bool) public instructors;

    constructor() Ownable(msg.sender) {}

    // Modifiers
    modifier onlyInstructor() {
        require(instructors[msg.sender], "Not an instructor");
        _;
    }

    modifier courseExists(uint256 _courseId) {
        require(courses[_courseId].id != 0, "Course does not exist");
        _;
    }

    // Functions
    function registerInstructor() external {
        instructors[msg.sender] = true;
    }

    function createCourse(
        string memory _title,
        string memory _description,
        uint256 _price,
        string memory _ipfsHash
    ) external onlyInstructor {
        courseCounter++;
        courses[courseCounter] = Course({
            id: courseCounter,
            title: _title,
            description: _description,
            instructor: msg.sender,
            price: _price,
            ipfsHash: _ipfsHash,
            isActive: true,
            createdAt: block.timestamp
        });

        emit CourseCreated(courseCounter, _title, msg.sender);
    }

    function enrollInCourse(uint256 _courseId) external payable courseExists(_courseId) {
        Course storage course = courses[_courseId];
        require(course.isActive, "Course is not active");
        require(msg.value >= course.price, "Insufficient payment");
        
        Student storage student = students[msg.sender];
        student.enrolledCourses.push(_courseId);
        
        emit CourseEnrolled(_courseId, msg.sender);
    }

    function updateProgress(uint256 _courseId, uint256 _progress) external courseExists(_courseId) {
        require(_progress <= 100, "Progress cannot exceed 100%");
        Student storage student = students[msg.sender];
        require(student.progress[_courseId] < _progress, "Progress cannot be decreased");
        
        student.progress[_courseId] = _progress;
        
        if (_progress == 100) {
            student.hasCompleted[_courseId] = true;
            emit CourseCompleted(_courseId, msg.sender);
        }
        
        emit ProgressUpdated(_courseId, msg.sender, _progress);
    }

    function getEnrolledCourses(address _student) external view returns (uint256[] memory) {
        return students[_student].enrolledCourses;
    }

    function getCourseProgress(address _student, uint256 _courseId) external view returns (uint256) {
        return students[_student].progress[_courseId];
    }

    function withdrawFunds() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
} 