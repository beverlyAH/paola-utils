module.exports = {
  /* Cohort-specific config and dates */
  COHORT_ID: 'seip2108',
  PRECOURSE_COHORT_START_DATE: '2021-06-14',
  FULL_TIME_COURSE_START_DATE: '2021-08-02',
  PART_TIME_COURSE_START_DATE: '2021-08-09',
  DEADLINES_FULL_TIME: {
    W1: ['6/28/2021', '7/5/2021', '7/12/2021'],
    W2: ['7/5/2021', '7/12/2021', '7/19/2021'],
    W3: ['7/12/2021', '7/19/2021', '7/25/2021'],
    W4: ['7/19/2021', '7/23/2021', '7/25/2021'],
    Final: ['7/19/2021', '7/23/2021', '7/25/2021'],
  },
  DEADLINES_PART_TIME: {
    W1: ['7/5/2021', '7/19/2021', '8/1/2021'],
    W2: ['7/5/2021', '7/19/2021', '8/1/2021'],
    W3: ['7/12/2021', '7/26/2021', '8/1/2021'],
    W4: ['7/19/2021', '7/26/2021', '8/1/2021'],
    Final: ['7/19/2021', '7/26/2021', '8/1/2021'],
  },

  /* Learn */
  LEARN_COHORT_ID: '2785',
  LEARN_API_COHORTS: 'https://learn-2.galvanize.com/api/v1/cohorts/',

  /* GitHub */
  GITHUB_ORG_NAME: 'hackreactor',
  GITHUB_STUDENT_TEAM: 'students-seip2108',
  GITHUB_API_USERS: 'https://api.github.com/users',
  GITHUB_API_TEAMS: 'https://api.github.com/orgs/hackreactor/teams',

  /* Google Sheets */
  DOC_ID_HRPTIV: '1CZTeyLgVP70DtU33RkbqlvbGSyYCkgxYxp4PaiPUtVo',
  SHEET_ID_HRPTIV_ROSTER: '1672855507',
  SHEET_ID_HRPTIV_NAUGHTY_LIST: '866788940',
  DOC_ID_PULSE: '1CV80ky8xCyRNH_wVm3m5lwSZY13dXJHGEyO51cLdClo',
  DOC_ID_CESP: '1X-LolbjCEyblQxLogsV6zMON_EgKZNu2C2c9JvsuH7U',
  SHEET_ID_CESP_MODULE_COMPLETION: '1744886664',
  SHEET_ID_CESP_ROSTER: '0',

  /* Slack */
  SLACK_TM_EMAILS: [
    'beverly.hernandez@galvanize.com',
    'daniel.rouse@galvanize.com',
    'eliza.drinker@galvanize.com',
    'steven.chung@galvanize.com',
    'jake.ascher@galvanize.com',
    'david.coleman@galvanize.com',
    'marco.castillo@galvanize.com',
  ],

  /* Salesforce */
  SFDC_OPPTY_RECORD_ID: '012j0000000qVAP',
  SFDC_FULL_TIME_COURSE_TYPE: '12 Week',
  SFDC_PART_TIME_COURSE_TYPE: '36 Week',
  SFDC_SELECT_QUERY: [
    'Id',
    'Student__c',
    'Student__r.Name',
    'Student__r.Email',
    'Student__r.Secondary_Email__c',
    'Campus_Formatted__c',
    'Student__r.Github_Username__c',
    'Course_Start_Date_Actual__c',
    'Product_Code__c',
    'StageName',
    'Separation_Status__c',
    'Separation_Type__c',
    'Separation_Reason__c',
    'Last_Day_Of_Attendance__c',
    'Last_Day_of_Attendance_Acronym__c',
    'Official_Withdrawal_Date__c',
    'Separation_Notes__c',
    'Student__r.Preferred_First_Name__c',
    'Student__r.Birthdate',
    'Student__r.Phone',
    'Student__r.MailingAddress',
    'Student__r.Emergency_Contact_Name__c',
    'Student__r.Emergency_Contact_Phone__c',
    'Student__r.Emergency_Contact_Relationship__c',
    'Student__r.Tshirt_Size__c',
    'Student__r.T_Shirt_Fit__c',
    'Student__r.Highest_Degree__c',
    'Student__r.gender__c',
    'Student__r.Race__c',
    'Student__r.EthnicityNew__c',
    'Student__r.Identify_as_LGBTQ__c',
    'Student__r.US_Veteran__c',
    'Student__r.Dependent_of_Veteran__c',
    'Student__r.US_Citizen_or_Permanent_Resident__c',
    'Student__r.Hoodie_Size__c',
    'Student__r.Address_While_in_School__c',
    'Student__r.Allergies__c',
    'Student__r.OtherAddress',
    'Student__r.Student_Funding_1__c',
    'Student__r.Student_Funding_1_Stage__c',
    'Payment_Option__c',
    'Student__r.Name_Pronunciation__c',
    'Student__r.Pronouns__c',
    'Student__r.Operating_System__c',
    'Student__r.Public_Birthday__c',
    'Student__r.Obligations_During_Course__c',
    'Student__r.Strengths__c',
    'Student__r.Other_Bootcamps_Applied_To__c',
    'Student__r.First_Choice_Bootcamp__c',
    'Student__r.Why_Hack_Reactor__c',
    'Student__r.Fun_Fact__c',
    'Student__r.Previous_Payment_Type__c',
    'Student__r.Self_Reported_Preparation__c',
    'Student__r.Alumni_Stage__c',
    'Student__r.Salary_prior_to_program__c',
    'Student__r.LinkedIn_Username__c',
    'Student__r.Age_at_Start__c',
    'Student__r.Student_Onboarding_Form_Completed_On__c',
  ].join(', '),
};
