// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GradingSystem {
    IERC20 public demo;
    IERC20 public presentation;
    IERC20 public essay;
    IERC20 public executable;
    IERC20 public OScontribution;
    IERC20 public feedback;

    mapping (address => string) public courseGrade;
    mapping(address => uint) public passedTasks; // Mapping to keep track of graded students
    mapping(IERC20 => uint) public minYes;

    event GradeUpdated(address indexed student, uint256 grade);
    event CoursePassed(address indexed student);

    constructor(
        IERC20 _demo,
        IERC20 _presentation,
        IERC20 _essay,
        IERC20 _executable,
        IERC20 _OScontribution,
        IERC20 _feedback
    ) {
        demo = _demo;
        presentation = _presentation;
        essay = _essay;
        executable = _executable;
        OScontribution = _OScontribution;
        feedback = _feedback;
        minYes[demo] = 8;
        minYes[essay] = 8;
        minYes[presentation] = 8;
        minYes[executable] = 8;
        minYes[OScontribution] = 2;
        minYes[feedback] = 4;
    }

    function updateGrade(address student, uint256 grade, IERC20 task) external {
        // Transfer tokens from the grader's account to the student's account
        uint256 tokenAmount = grade;
        task.transferFrom(msg.sender, student, tokenAmount);
        emit GradeUpdated(student, grade);

        // Update the passedTasks mapping for the student
        if (grade >= minYes[task]) {
            passedTasks[student]++;
        }

        courseGrade[student] = 'F';

        // Check if the student has passed more than 5 tasks, and if so, emit an event
        if (presentation.balanceOf(student) >= minYes[presentation] && demo.balanceOf(student) >= minYes[demo] && passedTasks[student] == 3) {
            courseGrade[student] = 'E';
        } else if (presentation.balanceOf(student) >= minYes[presentation] && demo.balanceOf(student) >= minYes[demo] && passedTasks[student] == 4) {
            courseGrade[student] = 'C';
        } else if (presentation.balanceOf(student) >= minYes[presentation] && demo.balanceOf(student) >= minYes[demo] && passedTasks[student] == 5) {
            courseGrade[student] = 'A';
        }

    }
    
    // Function to retrieve grade for a student
    function getGradeTask(address student, IERC20 task) external view returns (uint256) {
        // Get the balance of the student's account as the grade (assuming 18 decimals)
        return task.balanceOf(student);
    }

    function getGradeCourse(address student) external view returns (string memory) {
        return courseGrade[student];
    }

}
