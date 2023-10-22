export interface Graduate {
  id: number;
  lastname: string;
  firstname: string;
  graduation_year: number;
  school_name: string;
  reputation?: number;
}

export const data: Graduate[] = [
  {
    id: 1,
    firstname: "John",
    lastname: "Smith",
    graduation_year: 2020,
    school_name: "Harvard University",
    reputation: 85,
  },
  {
    id: 2,
    firstname: "Jane",
    lastname: "Doe",
    graduation_year: 2019,
    school_name: "Stanford University",
    reputation: 85,
  },
  {
    id: 3,
    firstname: "Jason",
    lastname: "Sun",
    graduation_year: 2015,
    school_name: "University of Waterloo",
    reputation: 85,
  },
  {
    id: 4,
    firstname: "Robert",
    lastname: "Johnson",
    graduation_year: 2020,
    school_name: "Princeton University",
    reputation: 85,
  },
  {
    id: 5,
    firstname: "Sarah",
    lastname: "Davis",
    graduation_year: 2019,
    school_name: "MIT",
    reputation: 85,
  },
  {
    id: 6,
    firstname: "Michael",
    lastname: "Miller",
    graduation_year: 2021,
    school_name: "Columbia University",
    reputation: 85,
  },
  {
    id: 7,
    firstname: "Elizabeth",
    lastname: "Taylor",
    graduation_year: 2012,
    school_name: "University of Waterloo",
    reputation: 85,
  },
  {
    id: 8,
    firstname: "William",
    lastname: "Jones",
    graduation_year: 2020,
    school_name: "University of Pennsylvania",
    reputation: 85,
  },
  {
    id: 9,
    firstname: "Jessica",
    lastname: "Anderson",
    graduation_year: 2021,
    school_name: "Duke University",
    reputation: 85,
  },
  {
    id: 10,
    firstname: "David",
    lastname: "Wilson",
    graduation_year: 2019,
    school_name: "University of Waterloo",
    reputation: 85,
  },
];
