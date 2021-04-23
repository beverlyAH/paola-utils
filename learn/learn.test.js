require('dotenv').config();
const fetch = require('node-fetch');
const { LEARN_API_COHORTS } = require('../constants');

const {
  getAllStudentsInCohort,
  validateStudentEnrollment,
  validateStudentEnrollmentByID,
  addStudentToCohort,
  removeStudentFromCohort,
  removeStudentFromCohortByID,
  createNewCohort,
  addTagsToStudent,
  getAllTagsFromStudent,
  removeTagFromStudent,
  removeAllTagsFromStudent,
} = require('.');

const TEST_LEARN_COHORT_ID = 2024;
const TEST_STUDENT = {
  id: 52763,
  first_name: 'Paola',
  last_name: 'Precourse',
  email: 'paola@galvanize.com',
};
const headers = {
  Authorization: `Bearer ${process.env.LEARN_TOKEN}`,
  'Content-Type': 'application/json',
};

const getStudents = async () => {
  const response = await fetch(
    `${LEARN_API_COHORTS}/${TEST_LEARN_COHORT_ID}/users`,
    { headers },
  );
  return response.json();
};

const addStudent = async () => {
  const response = await fetch(
    `${LEARN_API_COHORTS}/${TEST_LEARN_COHORT_ID}/users`,
    { method: 'POST', body: JSON.stringify(TEST_STUDENT), headers },
  );
  const json = await response.json();
  return json;
};

beforeAll(async () => {
  const students = await getStudents();
  const activeStudent = students.find(
    (student) => student.email === TEST_STUDENT.email,
  );
  if (activeStudent) {
    await fetch(
      `${LEARN_API_COHORTS}/${TEST_LEARN_COHORT_ID}/users/${activeStudent.id}`,
      { method: 'DELETE', headers },
    );
  }
});

describe('getAllStudentsInCohort', () => {
  test('Should expect an array of students', async () => {
    const testStudents = await getStudents();
    const students = await getAllStudentsInCohort(TEST_LEARN_COHORT_ID);
    expect(students).toHaveLength(testStudents.length);
  });

  test('Should expect an error if the cohortId provided is invalid', async () => {
    const students = await getAllStudentsInCohort(0);
    expect(students).toBe('The requested resource could not be found');
  });
});

describe('addStudentToCohort', () => {
  test('Should expect an ok status if successfully added student to cohort', async () => {
    const status = await addStudentToCohort(TEST_LEARN_COHORT_ID, TEST_STUDENT);
    expect(status).toBe('ok');
  });

  test('Should expect an already-exists status if student already exists in cohort', async () => {
    const status = await addStudentToCohort(TEST_LEARN_COHORT_ID, TEST_STUDENT);
    expect(status).toBe('already-exists');
  });

  test('Should expect an error if the cohortId provided is invalid', async () => {
    const status = await addStudentToCohort(0, TEST_STUDENT);
    expect(status).toBe('The requested resource could not be found');
  });

  test('Should expect an error if the student parameters are invalid', async () => {
    const status = await addStudentToCohort(TEST_LEARN_COHORT_ID, { name: 'paola' });
    expect(status).toContain('Validation Error');
  });
});

describe('validateStudentEnrollment', () => {
  test('Should expect a student object if student is in cohort', async () => {
    const expectedProps = [
      'id',
      'uid',
      'first_name',
      'last_name',
      'email',
      'roles',
      'tags',
    ];
    const student = await validateStudentEnrollment(TEST_LEARN_COHORT_ID, TEST_STUDENT.email);
    const actualProps = Object.keys(student);
    expect(expectedProps).toEqual(actualProps);
  });

  test('Should expect an error if student is not found in cohort', async () => {
    const status = await validateStudentEnrollment(TEST_LEARN_COHORT_ID, '***@test.com');
    expect(status).toBe('No active student found with provided email.');
  });

  test('Should expect an error if the cohortId provided is invalid', async () => {
    const status = await validateStudentEnrollment(0, TEST_STUDENT.email);
    expect(status).toBe('The requested resource could not be found');
  });
});

describe('validateStudentEnrollmentByID', () => {
  test('Should expect a student object if student is in cohort', async () => {
    const expectedProps = [
      'id',
      'uid',
      'first_name',
      'last_name',
      'email',
      'roles',
      'tags',
    ];
    const student = await validateStudentEnrollmentByID(TEST_LEARN_COHORT_ID, TEST_STUDENT.id);
    const actualProps = Object.keys(student);
    expect(expectedProps).toEqual(actualProps);
  });

  test('Should expect an error if student is not found in cohort', async () => {
    const status = await validateStudentEnrollmentByID(TEST_LEARN_COHORT_ID, 0);
    expect(status).toBe('No active student found with provided ID.');
  });

  test('Should expect an error if the cohortId provided is invalid', async () => {
    const status = await validateStudentEnrollmentByID(0, TEST_STUDENT.id);
    expect(status).toBe('The requested resource could not be found');
  });
});

describe('removeStudentFromCohort', () => {
  test('Should expect an ok status if successfully removed student from cohort', async () => {
    const status = await removeStudentFromCohort(TEST_LEARN_COHORT_ID, TEST_STUDENT.email);
    expect(status).toBe('ok');
  });

  test('Should expect an error if student is not found in cohort', async () => {
    const status = await removeStudentFromCohort(TEST_LEARN_COHORT_ID, TEST_STUDENT.email);
    expect(status).toBe('No active student found with provided email.');
  });

  test('Should expect an error if the cohortId provided is invalid', async () => {
    const status = await removeStudentFromCohort(0, TEST_STUDENT.email);
    expect(status).toBe('The requested resource could not be found');
  });
});

describe('removeStudentFromCohortByID', () => {
  test('Should expect an ok status if successfully removed student from cohort', async () => {
    await addStudent();
    const status = await removeStudentFromCohortByID(TEST_LEARN_COHORT_ID, TEST_STUDENT.id);
    expect(status).toBe('ok');
  });

  test('Should expect an error if student is not found in cohort', async () => {
    const status = await removeStudentFromCohortByID(TEST_LEARN_COHORT_ID, TEST_STUDENT.id);
    expect(status).toBe('No active student found with provided ID.');
  });

  test('Should expect an error if the cohortId provided is invalid', async () => {
    const status = await removeStudentFromCohortByID(0, TEST_STUDENT.id);
    expect(status).toBe('The requested resource could not be found');
  });
});

const makeTag = (name, color) => ({ name, color });

describe('addTagsToStudent', () => {
  test('Should expect a 200 status if tags are successfully added.', async () => {
    await addStudent();
    const testTags = [makeTag('Pretty Cool', 'gray'), makeTag('Paola', 'red')];
    const status = await addTagsToStudent(TEST_LEARN_COHORT_ID, TEST_STUDENT.id, ...testTags);
    expect(status).toBe(200);
  });

  test('Should expect tags to be added to student', async () => {
    await addStudent();
    const testTag = makeTag('Find this tag.', 'green');
    await addTagsToStudent(TEST_LEARN_COHORT_ID, TEST_STUDENT.id, testTag);
    const students = await getStudents();
    const student = students.find(
      (person) => person.id === TEST_STUDENT.id,
    );
    const hasTag = student.tags.some(
      (tag) => tag.name === 'Find this tag.',
    );

    expect(hasTag).toBe(true);
  });

  test('Should expect an error if non-approved colors are used.', async () => {
    await addStudent();
    const wrongColor = makeTag('This won\'t work.', '#f5fffa');
    const status = await addTagsToStudent(TEST_LEARN_COHORT_ID, TEST_STUDENT.id, wrongColor);
    expect(status).toBe('The current resource was invalid');
  });

  test('Should expect an error if student is not found in cohort', async () => {
    const testTag = makeTag('No students here.', 'orange');
    const status = await addTagsToStudent(TEST_LEARN_COHORT_ID, 0, testTag);
    expect(status).toBe('The requested resource could not be found');
  });

  test('Should expect an error if the cohortId provided is invalid', async () => {
    const testTag = makeTag('Wrong cohort', 'blue');
    const status = await addTagsToStudent(0, TEST_STUDENT.id, testTag);
    expect(status).toBe('The requested resource could not be found');
  });
});

describe('getAllTagsFromStudent', () => {
  test('Should expect tags if tags are successfully retrieved.', async () => {
    await addStudent();
    const tags = await getAllTagsFromStudent(TEST_LEARN_COHORT_ID, TEST_STUDENT.id);
    expect(Array.isArray(tags)).toBe(true);
  });

  test('Should expect tags if they exist on student object', async () => {
    await addStudent();
    await removeAllTagsFromStudent(TEST_LEARN_COHORT_ID, TEST_STUDENT.id);
    const testTags = [makeTag('Pretty Cool', 'gray'), makeTag('Paola', 'red')];
    await addTagsToStudent(TEST_LEARN_COHORT_ID, TEST_STUDENT.id, ...testTags);
    const tags = await getAllTagsFromStudent(TEST_LEARN_COHORT_ID, TEST_STUDENT.id);
    expect(tags.length).toEqual(2);
  });

  test('Should expect an error if the cohortId provided is invalid', async () => {
    const status = await getAllTagsFromStudent(0, TEST_STUDENT.id);
    expect(status).toBe('The requested resource could not be found');
  });

  test('Should expect an error if student is not found in cohort', async () => {
    const status = await getAllTagsFromStudent(TEST_LEARN_COHORT_ID, 0);
    expect(status).toBe('The requested resource could not be found');
  });
});

describe('removeTagFromStudent', () => {
  test('Should expect a 200 status if tag successfully removed.', async () => {
    const tags = await getAllTagsFromStudent(TEST_LEARN_COHORT_ID, TEST_STUDENT.id);
    const status = await removeTagFromStudent(TEST_LEARN_COHORT_ID, TEST_STUDENT.id, tags[0].id);
    expect(status).toBe(200);
  });

  test('Should expect tag to be removed from student.', async () => {
    await addStudent();
    await removeAllTagsFromStudent(TEST_LEARN_COHORT_ID, TEST_STUDENT.id);
    const testTags = [makeTag('Pretty Cool', 'gray'), makeTag('Paola', 'red')];
    await addTagsToStudent(TEST_LEARN_COHORT_ID, TEST_STUDENT.id, ...testTags);
    const tags = await getAllTagsFromStudent(TEST_LEARN_COHORT_ID, TEST_STUDENT.id);
    const firstTag = tags[0];
    await removeTagFromStudent(TEST_LEARN_COHORT_ID, TEST_STUDENT.id, firstTag.id);
    const tagsAgain = await getAllTagsFromStudent(TEST_LEARN_COHORT_ID, TEST_STUDENT.id);
    const newFirstTag = tagsAgain[0];
    expect(firstTag).not.toMatchObject(newFirstTag);
  });

  test('Should expect an error if the cohortId provided is invalid', async () => {
    const status = await removeTagFromStudent(0, TEST_STUDENT.id);
    expect(status).toBe('The requested resource could not be found');
  });

  test('Should expect an error if student is not found in cohort', async () => {
    const status = await removeTagFromStudent(TEST_LEARN_COHORT_ID, 0);
    expect(status).toBe('The requested resource could not be found');
  });
});

// TODO: Mock this test to not create a cohort in Learn Prod
// describe('createNewCohort', () => {
//   test('Should expect a 200 status if successfull', async () => {
//     const body = {
//       name: 'Paola Test Cohort (FROM API TEST)',
//       product_type: 'SEI Precourse',
//       label: '20-06-SEI-PRE',
//       campus_name: 'Remote',
//       starts_on: '2020-10-10',
//       ends_on: '2021-01-10',
//     };
//     const status = await createNewCohort(body);
//     expect(status).toBe(200);
//   });
//
//   test('Should return an error if the cohortId provided is invalid', async () => {
//     const students = await createNewCohort(0);
//     expect(students).toContain('Validation Error');
//   });
// });
