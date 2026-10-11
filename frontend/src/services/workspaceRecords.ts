function dateFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

function dateHoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

export const workspaceCourses = [
  { id: 'cs201', code: 'CS 201', name: 'Data Structures & Algorithms', instructor: 'Dr. Asha Raman', learners: 32, assignments: 5, color: 'bg-[#E4F1E9] text-[#174C3C]' },
  { id: 'cs305', code: 'CS 305', name: 'Software Engineering', instructor: 'Prof. Daniel Kim', learners: 28, assignments: 3, color: 'bg-[#EAF0FA] text-[#365B91]' },
  { id: 'cs110', code: 'CS 110', name: 'Programming Fundamentals', instructor: 'Dr. Leena Shah', learners: 41, assignments: 4, color: 'bg-[#FBF0DD] text-[#936A22]' },
];

export const workspaceAssignments = [
  { id: 'a1', title: 'Sorting Algorithms & Complexity', course: 'CS 201', dueAt: dateFromNow(6), submitted: 24, total: 32, status: 'In review' },
  { id: 'a2', title: 'Graph Traversal Lab', course: 'CS 201', dueAt: dateFromNow(10), submitted: 19, total: 32, status: 'Open' },
  { id: 'a3', title: 'REST API Design', course: 'CS 305', dueAt: dateFromNow(3), submitted: 21, total: 28, status: 'In review' },
  { id: 'a4', title: 'Object-Oriented Programming', course: 'CS 110', dueAt: dateFromNow(-2), submitted: 38, total: 41, status: 'Closed' },
];

export const workspaceSubmissions = [
  { id: 'SUB-2048', learner: 'Priya Nair', assignment: 'Sorting Algorithms & Complexity', course: 'CS 201', submittedAt: dateHoursAgo(2), status: 'Needs review' },
  { id: 'SUB-2047', learner: 'Ethan Cole', assignment: 'REST API Design', course: 'CS 305', submittedAt: dateHoursAgo(5), status: 'Reviewed' },
  { id: 'SUB-2046', learner: 'Maya Chen', assignment: 'Graph Traversal Lab', course: 'CS 201', submittedAt: dateHoursAgo(19), status: 'Needs review' },
  { id: 'SUB-2045', learner: 'Noah Williams', assignment: 'Object-Oriented Programming', course: 'CS 110', submittedAt: dateHoursAgo(27), status: 'Reviewed' },
  { id: 'SUB-2044', learner: 'Sofia Patel', assignment: 'Sorting Algorithms & Complexity', course: 'CS 201', submittedAt: dateHoursAgo(42), status: 'Submitted' },
];

export const workspaceReports = [
  { id: 'RPT-1082', title: 'Sorting Algorithms & Complexity', course: 'CS 201', submissions: 24, createdAt: dateHoursAgo(2), status: 'Ready for review', overlap: 68 },
  { id: 'RPT-1081', title: 'REST API Design', course: 'CS 305', submissions: 21, createdAt: dateHoursAgo(21), status: 'Completed', overlap: 34 },
  { id: 'RPT-1080', title: 'Graph Traversal Lab', course: 'CS 201', submissions: 19, createdAt: dateHoursAgo(46), status: 'Completed', overlap: 22 },
];
