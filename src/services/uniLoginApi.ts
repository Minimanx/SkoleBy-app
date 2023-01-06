export const getSchoolData = (email: string) => {
  const matchedSchool = schoolData.find(i => i.schoolEmail === email)
  if (!matchedSchool) return 'No school associated with that email'
  return matchedSchool
}

const schoolData = [
  {
    schoolName: 'KEA',
    schoolEmail: 'kea@kea.dk',
    schoolPassword: '1234',
    teachers: [
      {
        teacherName: 'Gandalf the Grey',
        teacherEmail: 'gandalf@lotr.com',
        teacherPassword: '1234',
      },
      {
        teacherName: 'Saruman the Wise',
        teacherEmail: 'saruman@lotr.com',
        teacherPassword: '1234',
      },
      {
        teacherName: 'Tom Bombadil',
        teacherEmail: 'tom@lotr.com',
        teacherPassword: '1234',
      },
    ],
    classes: [
      {
        className: '3.V',
        students: [
          {
            studentName: 'Frodo Baggins',
            studentEmail: 'frodo@lotr.com',
            studentPassword: '1234',
          },
          {
            studentName: 'Samwise Gamgee',
            studentEmail: 'samwise@lotr.com',
            studentPassword: '1234',
          },
          {
            studentName: 'Pippin Took',
            studentEmail: 'pippin@lotr.com',
            studentPassword: '1234',
          },
          {
            studentName: 'Merry Brandybuck',
            studentEmail: 'merry@lotr.com',
            studentPassword: '1234',
          },
        ],
      },
      {
        className: '4.X',
        students: [
          {
            studentName: 'Aragorn',
            studentEmail: 'aragorn@lotr.com',
            studentPassword: '1234',
          },
          {
            studentName: 'Legolas',
            studentEmail: 'legolas@lotr.com',
            studentPassword: '1234',
          },
          {
            studentName: 'Gimli',
            studentEmail: 'gimli@lotr.com',
            studentPassword: '1234',
          },
          {
            studentName: 'Boromir',
            studentEmail: 'boromir@lotr.com',
            studentPassword: '1234',
          },
        ],
      },
      {
        className: '5.Y',
        students: [
          {
            studentName: 'Lurtz',
            studentEmail: 'lurtz@lotr.com',
            studentPassword: '1234',
          },
          {
            studentName: 'Gothmog',
            studentEmail: 'gothmog@lotr.com',
            studentPassword: '1234',
          },
          {
            studentName: 'Balrog',
            studentEmail: 'balrog@lotr.com',
            studentPassword: '1234',
          },
          {
            studentName: 'Shelob',
            studentEmail: 'shelob@lotr.com',
            studentPassword: '1234',
          },
        ],
      },
    ],
  },
]
