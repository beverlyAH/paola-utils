const fetch = require('node-fetch');
const { LEARN_API_COHORTS } = require('../constants');

const headers = {
  Authorization: `Bearer ${process.env.LEARN_TOKEN}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

// ------------------------------
// Learn API Integrations
// ------------------------------

// Read all students in a cohort
exports.getAllStudentsInCohort = async (cohortId) => {
  try {
    const response = await fetch(
      `${LEARN_API_COHORTS}/${cohortId}/users`,
      { headers },
    );
    const json = await response.json();
    if (json.error || json.message) throw new Error(json.error || json.message);
    return json;
  } catch (error) {
    return error.message;
  }
};

// Write a student to a cohort
exports.addStudentToCohort = async (cohortId, student) => {
  try {
    const response = await fetch(
      `${LEARN_API_COHORTS}/${cohortId}/users`,
      { method: 'POST', body: JSON.stringify(student), headers },
    );
    const json = await response.json();
    if (json.error || json.message) throw new Error(json.error || json.message);
    return json.status;
  } catch (error) {
    return error.message;
  }
};

// Validate that a student is enrolled in a cohort
exports.validateStudentEnrollment = async (cohortId, email) => {
  try {
    const students = await exports.getAllStudentsInCohort(cohortId);
    if (!Array.isArray(students)) throw new Error(students);
    const activeStudent = students.find((student) => student.email === email);
    if (!activeStudent) throw new Error('No active student found with provided email.');
    return activeStudent;
  } catch (error) {
    return error.message;
  }
};

// Validate that a student is enrolled in a cohort
exports.validateStudentEnrollmentByID = async (cohortId, id) => {
  try {
    const students = await exports.getAllStudentsInCohort(cohortId);
    if (!Array.isArray(students)) throw new Error(students);
    const activeStudent = students.find((student) => student.id === id);
    if (!activeStudent) throw new Error('No active student found with provided ID.');
    return activeStudent;
  } catch (error) {
    return error.message;
  }
};

// Delete a student from a cohort
exports.removeStudentFromCohort = async (cohortId, email) => {
  try {
    const students = await exports.getAllStudentsInCohort(cohortId);
    if (!Array.isArray(students)) throw new Error(students);
    const activeStudent = students.find((student) => student.email === email);
    if (!activeStudent) throw new Error('No active student found with provided email.');
    const response = await fetch(
      `${LEARN_API_COHORTS}/${cohortId}/users/${activeStudent.id}`,
      { method: 'DELETE', headers },
    );
    const json = await response.json();
    if (json.error || json.message) throw new Error(json.error || json.message);
    return json.status;
  } catch (error) {
    return error.message;
  }
};

exports.removeStudentFromCohortByID = async (cohortId, id) => {
  try {
    const response = await fetch(
      `${LEARN_API_COHORTS}/${cohortId}/users/${id}`,
      { method: 'DELETE', headers },
    );
    const json = await response.json();
    if (json.error || json.message || json.status === '404') {
      throw new Error(json.error || json.message
        || 'No active student found with provided ID.');
    }
    return json.status;
  } catch (error) {
    return error.message;
  }
};

// Write a new cohort
exports.createNewCohort = async (options) => {
  try {
    const response = await fetch(
      `${LEARN_API_COHORTS}`,
      { method: 'POST', body: JSON.stringify(options), headers },
    );
    const json = await response.json();
    if (json.error || json.message) throw new Error(json.error || json.message);
    return response.status;
  } catch (error) {
    return error.message;
  }
};

// Tag management
exports.addTagsToStudent = async (cohortId, id, ...tags) => {
  const body = { tags };
  try {
    const response = await fetch(
      `${LEARN_API_COHORTS}/${cohortId}/users/${id}/tags`,
      { method: 'POST', body: JSON.stringify(body), headers },
    );
    const json = await response.json();
    if (json.error || json.message) throw new Error(json.error || json.message);
    return response.status;
  } catch (error) {
    return error.message;
  }
};

exports.getAllTagsFromStudent = async (cohortId, id) => {
  try {
    const response = await fetch(
      `${LEARN_API_COHORTS}/${cohortId}/users/${id}/tags`,
      { method: 'GET', headers },
    );
    const json = await response.json();
    if (json.error || json.message) throw new Error(json.error || json.message);
    return json;
  } catch (error) {
    return error.message;
  }
};

exports.removeTagFromStudent = async (cohortId, id, tagId) => {
  try {
    const response = await fetch(
      `${LEARN_API_COHORTS}/${cohortId}/users/${id}/tags/${tagId}`,
      { method: 'DELETE', headers },
    );
    const json = await response.json();
    if (json.error || json.message) throw new Error(json.error || json.message);
    return response.status;
  } catch (error) {
    return error.message;
  }
};

exports.removeAllTagsFromStudent = async (cohortId, id) => {
  try {
    const tags = await this.getAllTagsFromStudent(cohortId, id);
    Promise.all(tags.map(
      (tag) => this.removeTagFromStudent(cohortId, id, tag.id),
    ))
      .then(
        (data) => 'All tags removed.',
      )
      .catch(
        (error) => error,
      );
  } catch (error) {
    return error;
  }
};

exports.getAllTagsFromCohort = async (cohortId) => {
  try {
    const response = await fetch(
      `${LEARN_API_COHORTS}/${cohortId}/tags`,
      { method: 'GET', headers },
    );
    const json = await response.json();
    if (json.error || json.message) throw new Error(json.error || json.message);
    return json;
  } catch (error) {
    return error.message;
  }
};
