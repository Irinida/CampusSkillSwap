const mongoose = require('mongoose');
const Student = require('./models/Student');
const Skill = require('./models/Skill');
const ExchangeRequest = require('./models/ExchangeRequest');
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campus_skillswap';
async function seed() {
  await mongoose.connect(uri);
  let students = await Student.find();
  if (students.length === 0) {
    students = await Student.insertMany([
      { name: 'Aarav Kumar', email: 'aarav@campus.edu', department: 'CSE', year: '2nd Year', teachSkill: 'SQL Basics', learnSkill: 'Canva Design' },
      { name: 'Meera Nair', email: 'meera@campus.edu', department: 'AI & DS', year: '3rd Year', teachSkill: 'Canva Design', learnSkill: 'Python' },
      { name: 'Rohan Das', email: 'rohan@campus.edu', department: 'IT', year: '2nd Year', teachSkill: 'Python', learnSkill: 'Public Speaking' },
      { name: 'Ananya Rao', email: 'ananya@campus.edu', department: 'ECE', year: '1st Year', teachSkill: 'Photography', learnSkill: 'Excel' },
      { name: 'Ishaan Patel', email: 'ishaan@campus.edu', department: 'CSE', year: '4th Year', teachSkill: 'Git/GitHub', learnSkill: 'Video Editing' }
    ]);
  }
  if (await Skill.countDocuments() === 0) {
    await Skill.insertMany([
      { studentName: students[0].name, studentId: students[0]._id, department: 'CSE', title: 'SQL Basics', category: 'Technology', level: 'Beginner', description: 'Learn SELECT, WHERE, JOIN and GROUP BY with friendly practice questions.', availableDay: 'Saturday', availableTime: '4:00 PM', exchangeFor: 'Canva poster design' },
      { studentName: students[1].name, studentId: students[1]._id, department: 'AI & DS', title: 'Canva Design', category: 'Design', level: 'Intermediate', description: 'Create clean posters, event creatives and social media graphics.', availableDay: 'Friday', availableTime: '3:30 PM', exchangeFor: 'Python basics' },
      { studentName: students[2].name, studentId: students[2]._id, department: 'IT', title: 'Python Starter Lab', category: 'Technology', level: 'Beginner', description: 'Variables, loops, functions and debugging through small examples.', availableDay: 'Wednesday', availableTime: '5:00 PM', exchangeFor: 'Public speaking tips' },
      { studentName: students[3].name, studentId: students[3]._id, department: 'ECE', title: 'Campus Photography', category: 'Creative', level: 'Intermediate', description: 'Composition, lighting and phone photography for campus events.', availableDay: 'Sunday', availableTime: '10:00 AM', exchangeFor: 'Excel formulas' },
      { studentName: students[4].name, studentId: students[4]._id, department: 'CSE', title: 'Git & GitHub', category: 'Technology', level: 'Intermediate', description: 'Commits, branches, pull requests and keeping project work organised.', availableDay: 'Tuesday', availableTime: '4:30 PM', exchangeFor: 'Video editing' },
      { studentName: students[0].name, studentId: students[0]._id, department: 'CSE', title: 'Excel Essentials', category: 'Productivity', level: 'Beginner', description: 'Useful formulas, sorting, filtering and charts for assignments.', availableDay: 'Monday', availableTime: '2:00 PM', exchangeFor: 'Resume feedback' },
      { studentName: students[1].name, studentId: students[1]._id, department: 'AI & DS', title: 'Presentation Polish', category: 'Communication', level: 'Advanced', description: 'Structure slides and explain technical projects with confidence.', availableDay: 'Thursday', availableTime: '4:00 PM', exchangeFor: 'SQL query practice' },
      { studentName: students[2].name, studentId: students[2]._id, department: 'IT', title: 'Public Speaking', category: 'Communication', level: 'Intermediate', description: 'Practise openings, clear delivery and handling presentation nerves.', availableDay: 'Friday', availableTime: '11:30 AM', exchangeFor: 'Python debugging' },
      { studentName: students[3].name, studentId: students[3]._id, department: 'ECE', title: 'Resume Review', category: 'Career', level: 'Intermediate', description: 'Make project bullets clearer and improve one-page student resumes.', availableDay: 'Saturday', availableTime: '12:00 PM', exchangeFor: 'Photography basics' },
      { studentName: students[4].name, studentId: students[4]._id, department: 'CSE', title: 'Video Editing Basics', category: 'Creative', level: 'Beginner', description: 'Trim clips, add captions and export a neat short project demo.', availableDay: 'Sunday', availableTime: '2:00 PM', exchangeFor: 'Git workflow help' }
    ]);
  }
  if (await ExchangeRequest.countDocuments() === 0) {
    const skills = await Skill.find().limit(5);
    const requestData = [
      { requesterName: 'Meera Nair', skillId: skills[0]._id, skillTitle: skills[0].title, skillOwner: skills[0].studentName, message: 'Could we practise JOINs using a small sample database?', offeredSkill: 'Canva poster design', preferredTime: 'Saturday after 4 PM', status: 'Pending' },
      { requesterName: 'Rohan Das', skillId: skills[1]._id, skillTitle: skills[1].title, skillOwner: skills[1].studentName, message: 'I want to make a poster for our club event.', offeredSkill: 'Python debugging', preferredTime: 'Friday 3:30 PM', status: 'Accepted' },
      { requesterName: 'Ananya Rao', skillId: skills[2]._id, skillTitle: skills[2].title, skillOwner: skills[2].studentName, message: 'I know a little Python and want to practise functions.', offeredSkill: 'Photography', preferredTime: 'Wednesday evening', status: 'Pending' },
      { requesterName: 'Ishaan Patel', skillId: skills[3]._id, skillTitle: skills[3].title, skillOwner: skills[3].studentName, message: 'Can you share a few composition exercises?', offeredSkill: 'Git/GitHub help', preferredTime: 'Sunday morning', status: 'Completed' },
      { requesterName: 'Aarav Kumar', skillId: skills[4]._id, skillTitle: skills[4].title, skillOwner: skills[4].studentName, message: 'I need help setting up branches for our team project.', offeredSkill: 'SQL practice', preferredTime: 'Tuesday 4:30 PM', status: 'Rejected' }
    ];
    await ExchangeRequest.insertMany(requestData);
  }
  console.log(`Seed complete: ${await Student.countDocuments()} students, ${await Skill.countDocuments()} skills, ${await ExchangeRequest.countDocuments()} requests.`);
  await mongoose.disconnect();
}
seed().catch(async (error) => { console.error('Seed failed:', error.message); await mongoose.disconnect(); process.exit(1); });
