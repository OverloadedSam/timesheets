const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Role = require('./models/role');
const User = require('./models/user');
const Timesheet = require('./models/timesheet');
const Task = require('./models/task');

dotenv.config();

const dataRoles = [
  { _id: '63e21a9b60fbc9e5a763c5df', roleId: 0, roleName: 'admin' },
  { _id: '63e21ac060fbc9e5a763c5e1', roleId: 1, roleName: 'manager' },
  { _id: '63e21ac760fbc9e5a763c5e3', roleId: 2, roleName: 'employee' },
];

const dataUsers = [
  {
    _id: '63e221de94127d8c26e7695b',
    name: 'Admin Sam',
    email: 'sam@email.com',
    password: '123',
    role: '63e21a9b60fbc9e5a763c5df',
  },
  {
    _id: '63e231ecead95df793de72a9',
    name: 'Manu',
    email: 'manu@email.com',
    password: '123',
    role: '63e21ac060fbc9e5a763c5e1',
  },
  {
    _id: '63e64936d9b88dacab82d09a',
    name: 'Mark',
    email: 'mark@email.com',
    password: '123',
    role: '63e21ac060fbc9e5a763c5e1',
  },
  {
    _id: '63e2968aeb155b6a3eb36a81',
    name: 'Mayank',
    email: 'mayank@email.com',
    password: '123',
    role: '63e21ac060fbc9e5a763c5e1',
  },
  {
    _id: '63e65138a7370410237edbba',
    name: 'Ethan',
    email: 'ethan@email.com',
    password: '123',
    role: '63e21ac760fbc9e5a763c5e3',
    reportsTo: '63e231ecead95df793de72a9',
  },
  {
    _id: '63e65138a7370410237edbbb',
    name: 'Eric',
    email: 'eric@email.com',
    password: '123',
    role: '63e21ac760fbc9e5a763c5e3',
    reportsTo: '63e231ecead95df793de72a9',
  },
  {
    _id: '63e65138a7370410237edbbc',
    name: 'Esha',
    email: 'esha@email.com',
    password: '123',
    role: '63e21ac760fbc9e5a763c5e3',
    reportsTo: '63e231ecead95df793de72a9',
  },
  {
    _id: '63e65138a7370410237edbbd',
    name: 'Eshawar',
    email: 'eshwar@email.com',
    password: '123',
    role: '63e21ac760fbc9e5a763c5e3',
    reportsTo: '63e64936d9b88dacab82d09a',
  },
  {
    _id: '63e65138a7370410237edbbe',
    name: 'Eshita',
    email: 'eshita@email.com',
    password: '123',
    role: '63e21ac760fbc9e5a763c5e3',
    reportsTo: '63e64936d9b88dacab82d09a',
  },
  {
    _id: '63e65138a7370410237edbbf',
    name: 'Ekansh',
    email: 'ekansh@email.com',
    password: '123',
    role: '63e21ac760fbc9e5a763c5e3',
    reportsTo: '63e64936d9b88dacab82d09a',
  },
  {
    _id: '63e65138a7370410237edbc0',
    name: 'Ekta',
    email: 'ekta@email.com',
    password: '123',
    role: '63e21ac760fbc9e5a763c5e3',
    reportsTo: '63e64936d9b88dacab82d09a',
  },
  {
    _id: '63e65138a7370410237edbc1',
    name: 'Ellie',
    email: 'ellie@email.com',
    password: '123',
    role: '63e21ac760fbc9e5a763c5e3',
    reportsTo: '63e2968aeb155b6a3eb36a81',
  },
  {
    _id: '63e65138a7370410237edbc2',
    name: 'Emily',
    email: 'emily@email.com',
    password: '123',
    role: '63e21ac760fbc9e5a763c5e3',
    reportsTo: '63e2968aeb155b6a3eb36a81',
  },
  {
    _id: '63e65138a7370410237edbc3',
    name: 'Elsa',
    email: 'elsa@email.com',
    password: '123',
    role: '63e21ac760fbc9e5a763c5e3',
    reportsTo: '63e2968aeb155b6a3eb36a81',
  },
  {
    _id: '63e65138a7370410237edbc4',
    name: 'Eden',
    email: 'eden@email.com',
    password: '123',
    role: '63e21ac760fbc9e5a763c5e3',
  },
];

const dataTimesheets = [
  {
    _id: '63e655df149020897457110a',
    projectName: 'Apex',
    date: '2023-01-01',
    tasks: ['63e65bcf4433ad4855f7765d', '63e65bcf4433ad4855f7765e'],
    employee: '63e221de94127d8c26e7695b',
  },
  {
    _id: '63e655df149020897457110b',
    projectName: 'Synergy',
    date: '2023-01-01',
    tasks: [
      '63e65bcf4433ad4855f7765f',
      '63e65bcf4433ad4855f77660',
      '63e65bcf4433ad4855f77661',
    ],
    employee: '63e221de94127d8c26e7695b',
  },
  {
    _id: '63e655df149020897457110c',
    projectName: 'Illuminate',
    date: '2023-01-01',
    tasks: ['63e65bcf4433ad4855f77662'],
    employee: '63e221de94127d8c26e7695b',
  },
  {
    _id: '63e655df149020897457110d',
    projectName: 'Empower',
    date: '2023-01-02',
    tasks: ['63e65bcf4433ad4855f77663'],
    employee: '63e231ecead95df793de72a9',
  },
  {
    _id: '63e655df149020897457110e',
    projectName: 'Propel',
    date: '2023-01-02',
    tasks: [
      '63e65bcf4433ad4855f77664',
      '63e65bcf4433ad4855f77665',
      '63e65bcf4433ad4855f77666',
      '63e65bcf4433ad4855f77667',
    ],
    employee: '63e231ecead95df793de72a9',
  },
  {
    _id: '63e655df149020897457110f',
    projectName: 'Brainstorm',
    date: '2023-01-02',
    tasks: ['63e65bcf4433ad4855f77668'],
    employee: '63e231ecead95df793de72a9',
  },
  {
    _id: '63e655df1490208974571110',
    projectName: 'Innovate',
    date: '2023-01-03',
    tasks: [
      '63e65bcf4433ad4855f77669',
      '63e65bcf4433ad4855f7766a',
      '63e65bcf4433ad4855f7766b',
      '63e65bcf4433ad4855f7766c',
    ],
    employee: '63e64936d9b88dacab82d09a',
  },
  {
    _id: '63e655df1490208974571111',
    projectName: 'Thrive',
    date: '2023-01-03',
    tasks: ['63e65bcf4433ad4855f7766d'],
    employee: '63e64936d9b88dacab82d09a',
  },
  {
    _id: '63e655df1490208974571112',
    projectName: 'Elevate',
    date: '2023-01-03',
    tasks: ['63e65bcf4433ad4855f7766e'],
    employee: '63e64936d9b88dacab82d09a',
  },
  {
    _id: '63e655df1490208974571113',
    projectName: 'Transform',
    date: '2023-01-04',
    tasks: [
      '63e65bcf4433ad4855f7766f',
      '63e65bcf4433ad4855f77670',
      '63e65bcf4433ad4855f77671',
    ],
    employee: '63e2968aeb155b6a3eb36a81',
  },
  {
    _id: '63e655df1490208974571114',
    projectName: 'Flourish',
    date: '2023-01-04',
    tasks: [
      '63e65bcf4433ad4855f77672',
      '63e65bcf4433ad4855f77673',
      '63e65bcf4433ad4855f77674',
    ],
    employee: '63e2968aeb155b6a3eb36a81',
  },
  {
    _id: '63e655df1490208974571115',
    projectName: 'Prodigy',
    date: '2023-01-04',
    tasks: ['63e65bcf4433ad4855f77675'],
    employee: '63e2968aeb155b6a3eb36a81',
  },
  {
    _id: '63e655df1490208974571116',
    projectName: 'Spark',
    date: '2023-01-05',
    tasks: ['63e65bcf4433ad4855f77676', '63e65bcf4433ad4855f77677'],
    employee: '63e65138a7370410237edbba',
  },
  {
    _id: '63e655df1490208974571117',
    projectName: 'Excel',
    date: '2023-01-05',
    tasks: [
      '63e65bcf4433ad4855f77678',
      '63e65bcf4433ad4855f77679',
      '63e65bcf4433ad4855f7767a',
      '63e65bcf4433ad4855f7767b',
    ],
    employee: '63e65138a7370410237edbba',
  },
  {
    _id: '63e655df1490208974571118',
    projectName: 'Mobilize',
    date: '2023-01-05',
    tasks: [
      '63e65bcf4433ad4855f7767c',
      '63e65bcf4433ad4855f7767d',
      '63e65bcf4433ad4855f7767e',
      '63e65bcf4433ad4855f7767f',
    ],
    employee: '63e65138a7370410237edbba',
  },
  {
    _id: '63e655df1490208974571119',
    projectName: 'Blossom',
    date: '2023-01-06',
    tasks: ['63e65bcf4433ad4855f77680', '63e65bcf4433ad4855f77681'],
    employee: '63e65138a7370410237edbbb',
  },
  {
    _id: '63e655df149020897457111a',
    projectName: 'Nexus',
    date: '2023-01-06',
    tasks: [
      '63e65bcf4433ad4855f77682',
      '63e65bcf4433ad4855f77683',
      '63e65bcf4433ad4855f77684',
      '63e65bcf4433ad4855f77685',
    ],
    employee: '63e65138a7370410237edbbb',
  },
  {
    _id: '63e655df149020897457111b',
    projectName: 'Horizon',
    date: '2023-01-06',
    tasks: [
      '63e65bcf4433ad4855f77686',
      '63e65bcf4433ad4855f77687',
      '63e65bcf4433ad4855f77688',
    ],
    employee: '63e65138a7370410237edbbb',
  },
  {
    _id: '63e655df149020897457111c',
    projectName: 'Ascent',
    date: '2023-01-07',
    tasks: ['63e65bcf4433ad4855f77689', '63e65bcf4433ad4855f7768a'],
    employee: '63e65138a7370410237edbbc',
  },
  {
    _id: '63e655df149020897457111d',
    projectName: 'Catalyst',
    date: '2023-01-07',
    tasks: ['63e65bcf4433ad4855f7768b'],
    employee: '63e65138a7370410237edbbc',
  },
  {
    _id: '63e655df149020897457111e',
    projectName: 'Inflection',
    date: '2023-01-07',
    tasks: [
      '63e65bcf4433ad4855f7768c',
      '63e65bcf4433ad4855f7768d',
      '63e65bcf4433ad4855f7768e',
      '63e65bcf4433ad4855f7768f',
    ],
    employee: '63e65138a7370410237edbbc',
  },
  {
    _id: '63e655df149020897457111f',
    projectName: 'Odyssey',
    date: '2023-01-08',
    tasks: [
      '63e65bcf4433ad4855f77690',
      '63e65bcf4433ad4855f77691',
      '63e65bcf4433ad4855f77692',
    ],
    employee: '63e65138a7370410237edbbd',
  },
  {
    _id: '63e655df1490208974571120',
    projectName: 'Elevation',
    date: '2023-01-08',
    tasks: ['63e65bcf4433ad4855f77693'],
    employee: '63e65138a7370410237edbbd',
  },
  {
    _id: '63e655df1490208974571121',
    projectName: 'Pioneer',
    date: '2023-01-08',
    tasks: ['63e65bcf4433ad4855f77694', '63e65bcf4433ad4855f77695'],
    employee: '63e65138a7370410237edbbd',
  },
  {
    _id: '63e655df1490208974571122',
    projectName: 'Momentum',
    date: '2023-01-09',
    tasks: [
      '63e65bcf4433ad4855f77696',
      '63e65bcf4433ad4855f77697',
      '63e65bcf4433ad4855f77698',
    ],
    employee: '63e65138a7370410237edbbe',
  },
  {
    _id: '63e655df1490208974571123',
    projectName: 'Velocity',
    date: '2023-01-09',
    tasks: [
      '63e65bcf4433ad4855f77699',
      '63e65bcf4433ad4855f7769a',
      '63e65bcf4433ad4855f7769b',
    ],
    employee: '63e65138a7370410237edbbe',
  },
  {
    _id: '63e655df1490208974571124',
    projectName: 'NextGen',
    date: '2023-01-09',
    tasks: ['63e65bcf4433ad4855f7769c'],
    employee: '63e65138a7370410237edbbe',
  },
  {
    _id: '63e655df1490208974571125',
    projectName: 'Pixel',
    date: '2023-01-10',
    tasks: ['63e65bcf4433ad4855f7769d'],
    employee: '63e65138a7370410237edbbf',
  },
  {
    _id: '63e655df1490208974571126',
    projectName: 'Byte',
    date: '2023-01-10',
    tasks: ['63e65bcf4433ad4855f7769e'],
    employee: '63e65138a7370410237edbbf',
  },
  {
    _id: '63e655df1490208974571127',
    projectName: 'Bit',
    date: '2023-01-10',
    tasks: ['63e65bcf4433ad4855f7769f', '63e65bcf4433ad4855f776a0'],
    employee: '63e65138a7370410237edbbf',
  },
  {
    _id: '63e655df1490208974571128',
    projectName: 'Circuit',
    date: '2023-01-11',
    tasks: ['63e65bcf4433ad4855f776a1'],
    employee: '63e65138a7370410237edbc0',
  },
  {
    _id: '63e655df1490208974571129',
    projectName: 'Cyberspace',
    date: '2023-01-11',
    tasks: [
      '63e65bcf4433ad4855f776a2',
      '63e65bcf4433ad4855f776a3',
      '63e65bcf4433ad4855f776a4',
      '63e65bcf4433ad4855f776a5',
    ],
    employee: '63e65138a7370410237edbc0',
  },
  {
    _id: '63e655df149020897457112a',
    projectName: 'Circuitry',
    date: '2023-01-11',
    tasks: ['63e65bcf4433ad4855f776a6', '63e65bcf4433ad4855f776a7'],
    employee: '63e65138a7370410237edbc0',
  },
  {
    _id: '63e655df149020897457112b',
    projectName: 'Crypton',
    date: '2023-01-12',
    tasks: ['63e65bcf4433ad4855f776a8'],
    employee: '63e65138a7370410237edbc1',
  },
  {
    _id: '63e655df149020897457112c',
    projectName: 'Datacenter',
    date: '2023-01-12',
    tasks: [
      '63e65bcf4433ad4855f776a9',
      '63e65bcf4433ad4855f776aa',
      '63e65bcf4433ad4855f776ab',
    ],
    employee: '63e65138a7370410237edbc1',
  },
  {
    _id: '63e655df149020897457112d',
    projectName: 'Cyberspace',
    date: '2023-01-12',
    tasks: ['63e65bcf4433ad4855f776ac'],
    employee: '63e65138a7370410237edbc1',
  },
  {
    _id: '63e655df149020897457112e',
    projectName: 'Digital',
    date: '2023-01-13',
    tasks: ['63e65bcf4433ad4855f776ad', '63e65bcf4433ad4855f776ae'],
    employee: '63e65138a7370410237edbc2',
  },
  {
    _id: '63e655df149020897457112f',
    projectName: 'Matrix',
    date: '2023-01-13',
    tasks: ['63e65bcf4433ad4855f776af', '63e65bcf4433ad4855f776b0'],
    employee: '63e65138a7370410237edbc2',
  },
  {
    _id: '63e655df1490208974571130',
    projectName: 'Microchip',
    date: '2023-01-13',
    tasks: ['63e65bcf4433ad4855f776b1', '63e65bcf4433ad4855f776b2'],
    employee: '63e65138a7370410237edbc2',
  },
  {
    _id: '63e655df1490208974571131',
    projectName: 'Nano',
    date: '2023-01-14',
    tasks: ['63e65bcf4433ad4855f776b3'],
    employee: '63e65138a7370410237edbc3',
  },
  {
    _id: '63e655df1490208974571132',
    projectName: 'Neuronet',
    date: '2023-01-14',
    tasks: ['63e65bcf4433ad4855f776b4'],
    employee: '63e65138a7370410237edbc3',
  },
  {
    _id: '63e655df1490208974571133',
    projectName: 'Server',
    date: '2023-01-14',
    tasks: [
      '63e65bcf4433ad4855f776b5',
      '63e65bcf4433ad4855f776b6',
      '63e65bcf4433ad4855f776b7',
      '63e65bcf4433ad4855f776b8',
    ],
    employee: '63e65138a7370410237edbc3',
  },
  {
    _id: '63e655df1490208974571134',
    projectName: 'Serverfarm',
    date: '2023-01-15',
    tasks: ['63e65bcf4433ad4855f776b9', '63e65bcf4433ad4855f776ba'],
    employee: '63e65138a7370410237edbc4',
  },
  {
    _id: '63e655df1490208974571135',
    projectName: 'Silicon',
    date: '2023-01-15',
    tasks: [
      '63e65bcf4433ad4855f776bb',
      '63e65bcf4433ad4855f776bc',
      '63e65bcf4433ad4855f776bd',
    ],
    employee: '63e65138a7370410237edbc4',
  },
  {
    _id: '63e655df1490208974571136',
    projectName: 'Software',
    date: '2023-01-15',
    tasks: [
      '63e65bcf4433ad4855f776be',
      '63e65bcf4433ad4855f776bf',
      '63e65bcf4433ad4855f776c0',
      '63e65bcf4433ad4855f776c1',
    ],
    employee: '63e65138a7370410237edbc4',
  },
];

const dataTasks = [
  {
    _id: '63e65bcf4433ad4855f7765d',
    timesheet: '63e655df149020897457110a',
    hour: 14,
    minute: 5,
    description:
      'Labore deserunt nisi eu magna officia. Nostrud velit duis ipsum dolore.',
    remarks:
      'Laborum ea laboris quis. Consectetur laborum ad excepteur dolore laboris ex.',
  },
  {
    _id: '63e65bcf4433ad4855f7765e',
    timesheet: '63e655df149020897457110a',
    hour: 16,
    minute: 26,
    description: 'Enim ad laborum magna mollit incididunt elit.',
    remarks:
      'Consequat Lorem pariatur do reprehenderit culpa irure irure minim. Commodo aliqua qui nostrud sunt.',
  },
  {
    _id: '63e65bcf4433ad4855f7765f',
    timesheet: '63e655df149020897457110b',
    hour: 15,
    minute: 49,
    description:
      'Id aliquip quis excepteur deserunt. Voluptate aliqua magna laborum. Culpa officia quis culpa sunt consectetur elit mollit nulla. Ea incididunt ea Lorem enim aute laborum eu eiusmod.',
    remarks:
      'Do mollit incididunt velit officia laborum dolore adipisicing. Ullamco consequat incididunt sit fugiat id exercitation mollit minim ut. Eiusmod nulla culpa laborum culpa et esse ut. Laborum consectetur fugiat eu ad aute.',
  },
  {
    _id: '63e65bcf4433ad4855f77660',
    timesheet: '63e655df149020897457110b',
    hour: 13,
    minute: 25,
    description:
      'Officia laborum labore ipsum. Nulla nisi aute anim laboris amet. Lorem mollit Lorem ea exercitation sunt deserunt nisi elit nisi.',
    remarks:
      'Sunt enim ad irure ex labore. Culpa laboris duis aliquip do ut incididunt duis velit. Ea ut cillum qui veniam fugiat ex amet. Officia non minim esse proident. Sint cupidatat ex ea.',
  },
  {
    _id: '63e65bcf4433ad4855f77661',
    timesheet: '63e655df149020897457110b',
    hour: 0,
    minute: 40,
    description: 'Minim id in veniam.',
    remarks:
      'Magna est veniam laboris nisi. Mollit do quis ipsum non eiusmod enim voluptate velit excepteur. Sit sit non id ut.',
  },
  {
    _id: '63e65bcf4433ad4855f77662',
    timesheet: '63e655df149020897457110c',
    hour: 18,
    minute: 1,
    description: 'Incididunt officia consequat ex incididunt deserunt.',
    remarks:
      'Nisi dolor excepteur occaecat officia mollit. Sint sunt pariatur proident mollit ea. Dolor minim occaecat aliquip proident incididunt ea.',
  },
  {
    _id: '63e65bcf4433ad4855f77663',
    timesheet: '63e655df149020897457110d',
    hour: 10,
    minute: 13,
    description:
      'Commodo elit occaecat Lorem excepteur proident incididunt esse. Ea enim enim in culpa ea ullamco in. Exercitation dolor laborum incididunt laboris excepteur cupidatat dolor voluptate duis.',
    remarks:
      'Velit voluptate sunt dolor velit laborum sunt reprehenderit reprehenderit.',
  },
  {
    _id: '63e65bcf4433ad4855f77664',
    timesheet: '63e655df149020897457110e',
    hour: 21,
    minute: 9,
    description:
      'Deserunt dolor amet ea elit aliqua ut officia dolor. Do ullamco magna esse anim proident. Duis in esse mollit dolor est veniam enim fugiat sunt.',
    remarks:
      'Excepteur aliqua amet occaecat pariatur voluptate aliquip in cillum. Quis officia culpa laboris deserunt laborum ea non nostrud consequat. Esse aliqua mollit cupidatat irure ipsum. In do magna Lorem est ea officia id dolore deserunt.',
  },
  {
    _id: '63e65bcf4433ad4855f77665',
    timesheet: '63e655df149020897457110e',
    hour: 10,
    minute: 25,
    description:
      'Eiusmod est sunt mollit dolor amet. Amet nisi et do voluptate. Anim laborum anim duis deserunt commodo ut labore sint. Aute ullamco magna elit irure pariatur culpa aute.',
    remarks:
      'Sit occaecat commodo aliqua in ea aute elit amet. Ex commodo ad esse tempor nisi occaecat incididunt eiusmod amet.',
  },
  {
    _id: '63e65bcf4433ad4855f77666',
    timesheet: '63e655df149020897457110e',
    hour: 17,
    minute: 59,
    description:
      'Excepteur aute cillum consequat sunt consequat. Cillum velit anim ad incididunt laborum quis. Irure qui exercitation dolore. Veniam adipisicing in et non do consectetur incididunt. Fugiat exercitation deserunt anim ullamco eiusmod deserunt deserunt.',
    remarks: 'Aliqua ex adipisicing aute.',
  },
  {
    _id: '63e65bcf4433ad4855f77667',
    timesheet: '63e655df149020897457110e',
    hour: 8,
    minute: 14,
    description:
      'Consectetur cillum ex in sunt minim anim quis nulla excepteur.',
    remarks:
      'Adipisicing duis ad do. Ut esse voluptate qui pariatur deserunt non excepteur occaecat irure. Do et proident fugiat consectetur cillum consectetur consequat incididunt.',
  },
  {
    _id: '63e65bcf4433ad4855f77668',
    timesheet: '63e655df149020897457110f',
    hour: 0,
    minute: 49,
    description:
      'Amet exercitation reprehenderit commodo sunt officia magna esse do.',
    remarks:
      'Minim eiusmod nostrud do nulla. Ex nisi pariatur dolore anim mollit laborum fugiat velit pariatur. Cillum nulla non enim. Duis commodo pariatur reprehenderit consequat esse.',
  },
  {
    _id: '63e65bcf4433ad4855f77669',
    timesheet: '63e655df1490208974571110',
    hour: 21,
    minute: 49,
    description:
      'Qui adipisicing commodo labore laboris enim tempor occaecat sunt voluptate. Nostrud exercitation eiusmod mollit officia nostrud consectetur. In minim ad exercitation in aliqua. Voluptate cillum eu Lorem adipisicing.',
    remarks:
      'Ullamco ex duis duis nostrud ea nulla ea pariatur laborum. Deserunt labore fugiat Lorem aute deserunt ipsum sit.',
  },
  {
    _id: '63e65bcf4433ad4855f7766a',
    timesheet: '63e655df1490208974571110',
    hour: 11,
    minute: 39,
    description: 'Labore ex anim duis qui enim eiusmod ex.',
    remarks:
      'Tempor proident tempor ut non labore. Cillum commodo aliqua laboris quis. Duis officia veniam nulla id.',
  },
  {
    _id: '63e65bcf4433ad4855f7766b',
    timesheet: '63e655df1490208974571110',
    hour: 21,
    minute: 12,
    description:
      'Mollit nulla reprehenderit quis nisi dolore consectetur et laborum eiusmod. Labore elit ex dolor dolore nostrud magna incididunt duis. Elit ad tempor sit culpa magna sint ut ullamco velit.',
    remarks:
      'Tempor deserunt magna nulla officia voluptate consequat ipsum. Veniam sit aliqua adipisicing anim.',
  },
  {
    _id: '63e65bcf4433ad4855f7766c',
    timesheet: '63e655df1490208974571110',
    hour: 1,
    minute: 33,
    description: 'Ipsum ullamco sint velit esse ad Lorem non occaecat.',
    remarks: 'Aliqua minim excepteur incididunt laborum culpa magna.',
  },
  {
    _id: '63e65bcf4433ad4855f7766d',
    timesheet: '63e655df1490208974571111',
    hour: 18,
    minute: 5,
    description:
      'Anim est officia enim commodo ipsum anim do dolore. Ipsum do occaecat ut exercitation. Id ullamco in irure duis. Labore quis qui cillum fugiat labore magna irure pariatur laboris. Eiusmod nisi irure nisi.',
    remarks:
      'Cupidatat proident sit aliqua enim reprehenderit esse esse nisi. Adipisicing mollit voluptate Lorem voluptate Lorem dolore reprehenderit nostrud. Sint est exercitation cupidatat consectetur.',
  },
  {
    _id: '63e65bcf4433ad4855f7766e',
    timesheet: '63e655df1490208974571112',
    hour: 17,
    minute: 0,
    description:
      'Occaecat enim eu elit quis in duis magna. Irure in ipsum elit labore eu occaecat quis.',
    remarks: 'Commodo labore qui enim ea duis dolore anim eu amet.',
  },
  {
    _id: '63e65bcf4433ad4855f7766f',
    timesheet: '63e655df1490208974571113',
    hour: 12,
    minute: 51,
    description:
      'Consectetur adipisicing pariatur velit in. Duis consequat sint culpa.',
    remarks:
      'Officia duis laborum nulla sint laboris dolor tempor fugiat ut. Culpa exercitation non ullamco. Aliqua laborum mollit fugiat excepteur exercitation. Velit do cupidatat fugiat veniam eiusmod.',
  },
  {
    _id: '63e65bcf4433ad4855f77670',
    timesheet: '63e655df1490208974571113',
    hour: 18,
    minute: 3,
    description:
      'Anim reprehenderit reprehenderit quis veniam. Excepteur cillum aute dolore.',
    remarks:
      'Lorem cillum occaecat duis ex. Magna proident non labore excepteur aliquip voluptate elit. Irure laboris anim esse reprehenderit aliqua magna consectetur. Minim dolore voluptate mollit sint adipisicing esse in anim laborum.',
  },
  {
    _id: '63e65bcf4433ad4855f77671',
    timesheet: '63e655df1490208974571113',
    hour: 17,
    minute: 13,
    description:
      'Ullamco veniam duis ut velit non commodo ad est quis. Minim veniam consectetur aliqua velit Lorem magna nisi nulla ullamco.',
    remarks:
      'Proident duis esse ea elit sit ea in. Cillum enim aliqua labore eiusmod deserunt ipsum exercitation. Nostrud dolore ea eu do mollit dolore reprehenderit et enim. Magna sunt et laborum deserunt nostrud Lorem. Veniam eiusmod consectetur enim aute amet dolor dolor sit mollit.',
  },
  {
    _id: '63e65bcf4433ad4855f77672',
    timesheet: '63e655df1490208974571114',
    hour: 8,
    minute: 5,
    description:
      'Anim quis reprehenderit eiusmod nisi consectetur nisi eu eu. Aliquip eiusmod duis deserunt. Ad nulla eu qui est. Officia officia cillum tempor.',
    remarks:
      'Eiusmod do esse anim proident minim minim magna sit. Laboris ut mollit dolor enim nostrud sunt reprehenderit proident. Nulla sit dolor laboris.',
  },
  {
    _id: '63e65bcf4433ad4855f77673',
    timesheet: '63e655df1490208974571114',
    hour: 19,
    minute: 32,
    description:
      'Tempor fugiat velit dolor sit nisi quis officia quis. Anim esse excepteur cupidatat irure mollit. Dolore adipisicing do velit pariatur ad exercitation magna. Cupidatat aliquip excepteur tempor ut. Sunt aute irure Lorem consectetur eiusmod nulla mollit.',
    remarks:
      'Exercitation nulla adipisicing enim ut aliquip nostrud minim. Nostrud eu anim elit exercitation quis. Deserunt ea labore ut. Magna do culpa pariatur ad nulla. Do consectetur nostrud do nostrud quis adipisicing cupidatat.',
  },
  {
    _id: '63e65bcf4433ad4855f77674',
    timesheet: '63e655df1490208974571114',
    hour: 3,
    minute: 44,
    description:
      'Esse nostrud amet id anim non exercitation consequat reprehenderit. Irure et deserunt est.',
    remarks:
      'Et ea nisi labore consectetur sunt cillum irure veniam. Commodo ipsum incididunt velit aliqua voluptate deserunt. Laborum exercitation et magna. Proident deserunt laborum fugiat ea adipisicing Lorem eiusmod officia est.',
  },
  {
    _id: '63e65bcf4433ad4855f77675',
    timesheet: '63e655df1490208974571115',
    hour: 23,
    minute: 52,
    description:
      'Cupidatat commodo consectetur sint adipisicing. Nostrud est minim ut dolore dolor et incididunt ad Lorem. Consequat id cupidatat aute.',
    remarks:
      'Elit pariatur consequat in ea cillum nulla eu. Dolore fugiat enim aliquip sit fugiat commodo aliquip. Magna cillum ad cillum aliquip aliqua sit eu sint occaecat. Mollit ad excepteur veniam incididunt ex ullamco voluptate dolor veniam. Lorem amet duis et id consequat.',
  },
  {
    _id: '63e65bcf4433ad4855f77676',
    timesheet: '63e655df1490208974571116',
    hour: 8,
    minute: 56,
    description:
      'Nisi excepteur deserunt culpa et id. Lorem exercitation fugiat sint esse minim id. Ut aliqua laborum eiusmod mollit aliqua velit. Nostrud tempor eu deserunt laborum.',
    remarks:
      'Duis commodo irure id nisi nulla. Eu pariatur et in. Anim laboris minim nostrud pariatur veniam voluptate. Commodo nulla non magna irure ut adipisicing culpa duis.',
  },
  {
    _id: '63e65bcf4433ad4855f77677',
    timesheet: '63e655df1490208974571116',
    hour: 19,
    minute: 36,
    description: 'Quis ea do labore cillum id.',
    remarks:
      'Sint magna do cupidatat fugiat ad proident aliqua fugiat. Fugiat labore consequat duis sit. Pariatur enim eiusmod esse cillum ut.',
  },
  {
    _id: '63e65bcf4433ad4855f77678',
    timesheet: '63e655df1490208974571117',
    hour: 10,
    minute: 58,
    description:
      'Officia aliqua minim qui. Ipsum aliquip aute deserunt eu nisi ullamco mollit consectetur nostrud. Incididunt elit non ad ea enim.',
    remarks: 'Reprehenderit ut cillum laborum. Et minim ex dolore Lorem.',
  },
  {
    _id: '63e65bcf4433ad4855f77679',
    timesheet: '63e655df1490208974571117',
    hour: 9,
    minute: 26,
    description:
      'Est exercitation tempor nulla quis officia. Duis irure nulla aliquip Lorem.',
    remarks:
      'Nisi exercitation nulla occaecat. Reprehenderit culpa aliqua deserunt. Irure incididunt cupidatat aliquip nisi Lorem nostrud do veniam sint.',
  },
  {
    _id: '63e65bcf4433ad4855f7767a',
    timesheet: '63e655df1490208974571117',
    hour: 7,
    minute: 54,
    description:
      'Aute ut nostrud dolor. Labore nisi sit officia eu sit voluptate veniam reprehenderit.',
    remarks:
      'Proident excepteur laborum eu ut. Excepteur cillum laborum fugiat laborum.',
  },
  {
    _id: '63e65bcf4433ad4855f7767b',
    timesheet: '63e655df1490208974571117',
    hour: 18,
    minute: 44,
    description:
      'Pariatur mollit tempor fugiat dolore pariatur reprehenderit fugiat esse.',
    remarks:
      'Minim proident laborum voluptate incididunt nisi. Ad cillum enim laborum id. Sit veniam adipisicing aute consequat nulla aliqua esse tempor id.',
  },
  {
    _id: '63e65bcf4433ad4855f7767c',
    timesheet: '63e655df1490208974571118',
    hour: 18,
    minute: 43,
    description:
      'Sint aliquip pariatur nisi laborum eiusmod consectetur cupidatat et nisi. Cillum eiusmod commodo est nulla dolore. Duis occaecat aliqua laborum nulla.',
    remarks:
      'Incididunt culpa officia sint non excepteur. Ea eu magna labore aliquip adipisicing aute. Qui sint minim in aliqua nulla incididunt. Et officia ad nostrud enim Lorem in sit non.',
  },
  {
    _id: '63e65bcf4433ad4855f7767d',
    timesheet: '63e655df1490208974571118',
    hour: 2,
    minute: 20,
    description: 'Mollit tempor occaecat incididunt adipisicing elit.',
    remarks: 'Labore ullamco fugiat minim occaecat in officia.',
  },
  {
    _id: '63e65bcf4433ad4855f7767e',
    timesheet: '63e655df1490208974571118',
    hour: 11,
    minute: 11,
    description:
      'Adipisicing nulla ullamco veniam ullamco adipisicing laborum minim nulla aliqua. Consectetur dolor aute fugiat et fugiat veniam ipsum. Nisi ea culpa dolore amet ea eiusmod. Consequat excepteur sit fugiat commodo eiusmod incididunt cillum sint.',
    remarks:
      'Lorem non excepteur occaecat qui. Laboris id commodo veniam dolor in quis non amet ullamco.',
  },
  {
    _id: '63e65bcf4433ad4855f7767f',
    timesheet: '63e655df1490208974571118',
    hour: 0,
    minute: 36,
    description:
      'Culpa excepteur reprehenderit ullamco consectetur sit culpa nisi fugiat. Aliqua aute commodo velit esse anim Lorem nisi occaecat.',
    remarks:
      'Occaecat dolor adipisicing ullamco ullamco qui voluptate ex et. In amet sit non aute. Laboris Lorem Lorem dolor ex labore ullamco cupidatat ullamco ipsum.',
  },
  {
    _id: '63e65bcf4433ad4855f77680',
    timesheet: '63e655df1490208974571119',
    hour: 10,
    minute: 58,
    description:
      'Duis magna officia non in labore anim aliqua. Nostrud velit do non quis quis voluptate.',
    remarks:
      'Amet officia mollit do ullamco exercitation cupidatat et ex. Aliqua culpa consectetur occaecat duis. Quis fugiat laborum excepteur aliquip ullamco. Quis pariatur mollit Lorem reprehenderit anim qui nisi nulla.',
  },
  {
    _id: '63e65bcf4433ad4855f77681',
    timesheet: '63e655df1490208974571119',
    hour: 5,
    minute: 38,
    description: 'Anim ea adipisicing non laboris elit ex magna velit duis.',
    remarks:
      'Id proident laboris dolor cillum enim Lorem proident ad. Proident irure fugiat do velit ullamco et aliquip.',
  },
  {
    _id: '63e65bcf4433ad4855f77682',
    timesheet: '63e655df149020897457111a',
    hour: 1,
    minute: 2,
    description:
      'Irure aliquip eu enim irure magna esse tempor adipisicing ut. Amet anim ullamco voluptate nostrud aliquip do velit est. Incididunt cillum laboris exercitation adipisicing non excepteur commodo duis qui. Do non ut sint commodo. Sit dolore deserunt id magna dolor in.',
    remarks:
      'Nulla laboris cillum officia non incididunt irure consequat. Do reprehenderit consectetur incididunt duis quis minim ut. Aute ex laborum proident cupidatat fugiat deserunt anim nisi. Quis laborum minim ad veniam non aliquip commodo excepteur.',
  },
  {
    _id: '63e65bcf4433ad4855f77683',
    timesheet: '63e655df149020897457111a',
    hour: 23,
    minute: 40,
    description:
      'Labore labore amet nostrud id voluptate tempor voluptate laborum. Deserunt adipisicing cillum consectetur in reprehenderit sit proident pariatur. Aliqua ipsum commodo exercitation proident enim est sunt fugiat. Dolor ullamco consequat dolore cupidatat enim minim culpa officia tempor. Irure esse laborum sit incididunt proident irure.',
    remarks:
      'Culpa et sint mollit consequat enim adipisicing elit. Laboris fugiat non amet consequat duis laboris voluptate ipsum. Quis adipisicing eu irure ullamco ea. Voluptate commodo in amet. Excepteur sunt adipisicing ullamco.',
  },
  {
    _id: '63e65bcf4433ad4855f77684',
    timesheet: '63e655df149020897457111a',
    hour: 4,
    minute: 40,
    description:
      'Velit officia mollit occaecat ex exercitation incididunt. Deserunt ullamco qui dolor deserunt.',
    remarks:
      'Eiusmod exercitation veniam aliqua ea voluptate sint sunt occaecat sint. Anim ut veniam dolor commodo nisi ut enim duis sit. Proident id ea amet duis consequat ut. Esse voluptate duis sunt.',
  },
  {
    _id: '63e65bcf4433ad4855f77685',
    timesheet: '63e655df149020897457111a',
    hour: 2,
    minute: 42,
    description:
      'Sint dolore sunt nisi exercitation eiusmod amet minim ullamco fugiat. Laboris voluptate irure quis fugiat sint. Consectetur voluptate quis ullamco ullamco irure ad. Lorem cupidatat id ex ut et.',
    remarks:
      'Occaecat sit enim id. Dolor nisi est ullamco qui quis minim minim sint.',
  },
  {
    _id: '63e65bcf4433ad4855f77686',
    timesheet: '63e655df149020897457111b',
    hour: 0,
    minute: 31,
    description:
      'Duis minim velit ad aute laborum esse. Dolor ea nulla consectetur eu aute anim ullamco. Minim sunt laborum exercitation id elit.',
    remarks: 'Minim commodo ea laborum.',
  },
  {
    _id: '63e65bcf4433ad4855f77687',
    timesheet: '63e655df149020897457111b',
    hour: 0,
    minute: 50,
    description:
      'Deserunt incididunt nostrud voluptate minim. Sunt aute exercitation ea quis in sunt. Ea mollit veniam reprehenderit.',
    remarks:
      'Sit velit est aliquip officia. Eu pariatur et exercitation commodo ullamco excepteur reprehenderit.',
  },
  {
    _id: '63e65bcf4433ad4855f77688',
    timesheet: '63e655df149020897457111b',
    hour: 13,
    minute: 7,
    description:
      'Duis ullamco aliquip nulla ea et cillum. Adipisicing in occaecat minim.',
    remarks:
      'Ad anim pariatur duis. Qui officia culpa proident ad sit veniam. Mollit id proident amet amet dolore ipsum exercitation ex elit. Nostrud officia veniam exercitation.',
  },
  {
    _id: '63e65bcf4433ad4855f77689',
    timesheet: '63e655df149020897457111c',
    hour: 2,
    minute: 26,
    description:
      'Voluptate sunt Lorem sint. Excepteur eu cupidatat laboris est sunt. Proident dolore duis nisi non consequat Lorem. Id officia quis eiusmod. Ex excepteur laboris culpa ad et qui id cillum ea.',
    remarks: 'Reprehenderit duis aliqua nisi in quis.',
  },
  {
    _id: '63e65bcf4433ad4855f7768a',
    timesheet: '63e655df149020897457111c',
    hour: 16,
    minute: 57,
    description:
      'Incididunt mollit laboris laborum cupidatat aute aliquip incididunt. Ea aute laboris ullamco tempor sint dolore. Culpa ullamco culpa eiusmod. Aute mollit eiusmod quis ullamco. Ad enim nisi voluptate.',
    remarks:
      'Cupidatat amet consequat adipisicing reprehenderit. Deserunt ipsum anim reprehenderit pariatur sit elit. Nostrud ullamco amet anim laboris reprehenderit irure. Irure laborum laborum ipsum velit.',
  },
  {
    _id: '63e65bcf4433ad4855f7768b',
    timesheet: '63e655df149020897457111d',
    hour: 18,
    minute: 52,
    description:
      'Qui sint aute nostrud aliqua. Eiusmod commodo et fugiat tempor mollit laborum velit Lorem. Excepteur fugiat reprehenderit pariatur ut laboris et duis consequat. Lorem pariatur Lorem magna nisi ad incididunt nisi ut. Ut officia exercitation anim duis officia id est ad.',
    remarks:
      'Id ea non cupidatat ut minim magna irure dolor cillum. Commodo consectetur dolor sit esse. Dolore exercitation commodo et aliquip non consectetur. Dolor aliqua eu ad pariatur qui eu ea.',
  },
  {
    _id: '63e65bcf4433ad4855f7768c',
    timesheet: '63e655df149020897457111e',
    hour: 19,
    minute: 6,
    description:
      'Id dolore sint officia nulla ipsum aute. Mollit quis elit aute ex. Consequat id dolore aliqua consequat mollit est deserunt commodo consectetur.',
    remarks:
      'Tempor non eu nulla. Enim do officia in aute quis dolor ex commodo. Commodo eu minim deserunt voluptate aliqua proident tempor. Ullamco velit culpa reprehenderit aliquip id eu laboris. Dolor elit in enim duis et laboris nulla adipisicing.',
  },
  {
    _id: '63e65bcf4433ad4855f7768d',
    timesheet: '63e655df149020897457111e',
    hour: 1,
    minute: 4,
    description:
      'Sunt laboris incididunt eiusmod. Aliquip quis ea et. Ea eiusmod sit deserunt. Consequat voluptate sit amet sunt.',
    remarks:
      'Irure sint adipisicing incididunt in anim irure ex eiusmod. Laborum anim minim incididunt in proident id officia dolor. Aute minim amet in exercitation nisi laborum.',
  },
  {
    _id: '63e65bcf4433ad4855f7768e',
    timesheet: '63e655df149020897457111e',
    hour: 11,
    minute: 14,
    description: 'In quis culpa irure.',
    remarks:
      'Fugiat deserunt reprehenderit cillum officia fugiat in sint occaecat.',
  },
  {
    _id: '63e65bcf4433ad4855f7768f',
    timesheet: '63e655df149020897457111e',
    hour: 15,
    minute: 43,
    description:
      'Occaecat minim aliquip ut nisi sint duis. Irure esse veniam est occaecat ut duis. Deserunt reprehenderit aliqua sunt aute tempor. Velit adipisicing pariatur ex dolore officia ea nostrud veniam ea. Et velit occaecat exercitation.',
    remarks:
      'Sint enim qui reprehenderit occaecat irure elit do enim enim. Cupidatat nostrud cupidatat consectetur est sint. Cupidatat labore duis occaecat laborum Lorem officia occaecat. Ex ex et ut aliqua sunt.',
  },
  {
    _id: '63e65bcf4433ad4855f77690',
    timesheet: '63e655df149020897457111f',
    hour: 11,
    minute: 5,
    description: 'Labore tempor et cillum.',
    remarks: 'Irure deserunt aute irure qui cillum fugiat sint ad est.',
  },
  {
    _id: '63e65bcf4433ad4855f77691',
    timesheet: '63e655df149020897457111f',
    hour: 0,
    minute: 8,
    description: 'Mollit adipisicing enim irure elit ex.',
    remarks:
      'Dolore magna deserunt magna. Ad ullamco occaecat amet occaecat eiusmod duis adipisicing. Aliqua veniam laborum amet. Minim commodo ullamco fugiat enim officia dolore ullamco culpa duis. Non consectetur aliqua reprehenderit veniam fugiat ullamco cupidatat sunt culpa.',
  },
  {
    _id: '63e65bcf4433ad4855f77692',
    timesheet: '63e655df149020897457111f',
    hour: 11,
    minute: 56,
    description: 'Dolor culpa do excepteur labore aute.',
    remarks:
      'Velit ut eiusmod eiusmod irure labore consectetur voluptate ullamco. Ex veniam consequat quis amet est quis dolor.',
  },
  {
    _id: '63e65bcf4433ad4855f77693',
    timesheet: '63e655df1490208974571120',
    hour: 22,
    minute: 38,
    description:
      'Eiusmod nostrud occaecat commodo. Aliqua consequat fugiat minim dolore. Magna sint sit anim reprehenderit. Elit ex aliqua non.',
    remarks:
      'Veniam esse eiusmod proident aliqua minim. Sit aliquip incididunt et id. Excepteur veniam nisi ea cupidatat adipisicing. Lorem veniam reprehenderit aliqua in ex exercitation id aute. Incididunt consequat quis esse velit deserunt dolore ullamco quis exercitation.',
  },
  {
    _id: '63e65bcf4433ad4855f77694',
    timesheet: '63e655df1490208974571121',
    hour: 13,
    minute: 10,
    description:
      'Fugiat dolore quis nisi occaecat cillum magna pariatur nisi. Lorem aliquip adipisicing exercitation aliquip sit eu. Nisi aliqua est commodo est adipisicing irure et. Nulla laborum non sunt sit in consequat cillum amet.',
    remarks: 'Tempor est culpa irure. Et magna enim ad non pariatur labore.',
  },
  {
    _id: '63e65bcf4433ad4855f77695',
    timesheet: '63e655df1490208974571121',
    hour: 4,
    minute: 46,
    description:
      'Id dolor cillum irure consectetur. Mollit anim eu eiusmod. Ut ullamco dolor aliqua incididunt.',
    remarks:
      'Occaecat pariatur anim incididunt. Proident laboris cupidatat elit anim eiusmod non fugiat irure ipsum. Veniam labore dolore tempor.',
  },
  {
    _id: '63e65bcf4433ad4855f77696',
    timesheet: '63e655df1490208974571122',
    hour: 5,
    minute: 56,
    description:
      'Cillum do deserunt minim veniam ullamco anim. Fugiat eiusmod dolore officia dolore do. Mollit cillum mollit ex esse cupidatat adipisicing nisi eiusmod amet. Commodo nostrud reprehenderit cillum pariatur nostrud.',
    remarks:
      'Ut ipsum sint aute do ea incididunt. Ullamco cupidatat esse exercitation nisi et. Voluptate id veniam irure veniam ex id veniam do do.',
  },
  {
    _id: '63e65bcf4433ad4855f77697',
    timesheet: '63e655df1490208974571122',
    hour: 1,
    minute: 39,
    description:
      'Mollit exercitation elit cillum. Aute id non ex magna aliquip irure aliqua nulla.',
    remarks:
      'Aliquip ullamco aliquip duis esse. Est irure proident esse dolore eiusmod amet.',
  },
  {
    _id: '63e65bcf4433ad4855f77698',
    timesheet: '63e655df1490208974571122',
    hour: 5,
    minute: 13,
    description:
      'Duis consequat et ex incididunt incididunt cillum consequat commodo. Non fugiat eu Lorem labore reprehenderit.',
    remarks:
      'Minim labore pariatur in amet ea commodo fugiat reprehenderit. Ipsum consectetur ad cupidatat et. Incididunt laborum magna veniam cupidatat proident nulla. Tempor in sint commodo ea.',
  },
  {
    _id: '63e65bcf4433ad4855f77699',
    timesheet: '63e655df1490208974571123',
    hour: 23,
    minute: 45,
    description:
      'Cupidatat amet elit Lorem sint est. Laboris Lorem do tempor aliqua irure incididunt commodo amet deserunt. Quis pariatur aliquip fugiat.',
    remarks:
      'Enim veniam veniam sint sit elit veniam. Minim fugiat aliquip id magna est fugiat voluptate. Est reprehenderit proident proident labore consequat nisi proident. Ullamco tempor aute dolor qui et nisi nostrud nisi proident. Deserunt officia laborum laborum laboris nostrud culpa Lorem do nulla.',
  },
  {
    _id: '63e65bcf4433ad4855f7769a',
    timesheet: '63e655df1490208974571123',
    hour: 5,
    minute: 22,
    description:
      'Excepteur est consequat dolor nisi nostrud aliquip aliqua consectetur. Ipsum esse magna eu ad minim exercitation.',
    remarks:
      'Minim do ex ipsum. Magna sunt quis amet. In exercitation nulla eiusmod dolore incididunt cupidatat eiusmod officia ipsum.',
  },
  {
    _id: '63e65bcf4433ad4855f7769b',
    timesheet: '63e655df1490208974571123',
    hour: 21,
    minute: 0,
    description:
      'Sunt velit ad labore voluptate eu consectetur. Magna consequat cupidatat incididunt id.',
    remarks:
      'Aliqua irure Lorem aliquip fugiat mollit consectetur. Labore id reprehenderit eu est eiusmod officia. Sit excepteur pariatur ea.',
  },
  {
    _id: '63e65bcf4433ad4855f7769c',
    timesheet: '63e655df1490208974571124',
    hour: 3,
    minute: 14,
    description: 'Labore nulla aliquip in.',
    remarks:
      'Id consectetur sint nostrud et exercitation. Minim dolore sint ex quis voluptate quis proident. Aliqua irure ut deserunt do laboris laboris mollit nostrud. Eu aliqua aliqua elit tempor id ipsum.',
  },
  {
    _id: '63e65bcf4433ad4855f7769d',
    timesheet: '63e655df1490208974571125',
    hour: 15,
    minute: 22,
    description:
      'In ipsum velit labore esse. Proident do laborum occaecat anim adipisicing minim culpa irure enim. Cupidatat tempor non aliquip commodo laborum. Aliquip cupidatat eiusmod sit et anim Lorem Lorem. Ea do esse esse exercitation consectetur in fugiat.',
    remarks:
      'Quis et laboris nulla qui duis culpa velit. Sit cupidatat dolore reprehenderit ut qui pariatur reprehenderit ullamco. Aliqua ullamco commodo non ea eu aliquip pariatur. Non aute reprehenderit aliqua minim consequat Lorem ea quis. Magna cupidatat veniam amet occaecat occaecat mollit ea minim nulla.',
  },
  {
    _id: '63e65bcf4433ad4855f7769e',
    timesheet: '63e655df1490208974571126',
    hour: 9,
    minute: 34,
    description:
      'Fugiat consectetur et consequat. Nulla nisi esse dolore velit laborum quis. Officia proident quis irure ut mollit exercitation officia sint. Laborum eiusmod eu occaecat proident.',
    remarks:
      'Et magna aliquip deserunt ex incididunt dolor sit magna. In Lorem fugiat sint sint sit in officia ea. In eiusmod laborum exercitation incididunt quis. Ut irure eu esse commodo elit deserunt sit.',
  },
  {
    _id: '63e65bcf4433ad4855f7769f',
    timesheet: '63e655df1490208974571127',
    hour: 7,
    minute: 34,
    description:
      'Tempor veniam adipisicing anim Lorem irure mollit aliquip ad. Reprehenderit est ullamco cillum culpa tempor nostrud. Consequat excepteur sint pariatur dolor aute esse qui laboris.',
    remarks:
      'Sint ex consectetur Lorem est sunt Lorem culpa nostrud ipsum. Labore tempor irure non laborum voluptate est elit id. Consectetur deserunt non commodo deserunt magna laborum veniam. Minim nisi commodo ad ea.',
  },
  {
    _id: '63e65bcf4433ad4855f776a0',
    timesheet: '63e655df1490208974571127',
    hour: 12,
    minute: 26,
    description:
      'Excepteur Lorem eu dolor laborum minim ad enim officia. Eiusmod proident ut sunt dolor laborum voluptate. Do voluptate tempor do culpa veniam. Ipsum quis deserunt amet id sunt ex.',
    remarks:
      'Dolore consequat irure irure culpa ad commodo adipisicing. Aliquip laborum deserunt cillum esse id. Aute duis sint elit culpa id exercitation dolore est. Esse ex exercitation consequat labore qui.',
  },
  {
    _id: '63e65bcf4433ad4855f776a1',
    timesheet: '63e655df1490208974571128',
    hour: 2,
    minute: 0,
    description:
      'Ullamco ipsum voluptate labore excepteur amet occaecat. Fugiat id non occaecat nisi reprehenderit veniam nulla aliqua.',
    remarks: 'Non dolore deserunt sint do ex.',
  },
  {
    _id: '63e65bcf4433ad4855f776a2',
    timesheet: '63e655df1490208974571129',
    hour: 10,
    minute: 48,
    description: 'Officia aute proident mollit.',
    remarks:
      'Deserunt proident nulla est ex qui duis ea officia. Laborum esse nulla proident eu consequat id. Irure sit ea aute laboris sit ullamco consequat. Commodo pariatur voluptate ipsum elit aliquip pariatur.',
  },
  {
    _id: '63e65bcf4433ad4855f776a3',
    timesheet: '63e655df1490208974571129',
    hour: 5,
    minute: 49,
    description:
      'Reprehenderit cupidatat amet sunt velit ipsum ut minim excepteur.',
    remarks:
      'Et nostrud cillum deserunt pariatur esse. Commodo reprehenderit eu aliquip id minim voluptate labore. Veniam reprehenderit ad consectetur nisi. Sint ea non officia adipisicing excepteur elit tempor. Nisi est do laborum deserunt occaecat.',
  },
  {
    _id: '63e65bcf4433ad4855f776a4',
    timesheet: '63e655df1490208974571129',
    hour: 1,
    minute: 37,
    description: 'Do ea adipisicing commodo velit qui ex id.',
    remarks:
      'Qui laboris dolore occaecat. Exercitation enim aute velit quis quis irure adipisicing laboris. In qui anim exercitation mollit consectetur occaecat duis aute.',
  },
  {
    _id: '63e65bcf4433ad4855f776a5',
    timesheet: '63e655df1490208974571129',
    hour: 1,
    minute: 42,
    description:
      'Ipsum pariatur occaecat aliqua ea dolor. Cupidatat fugiat sit id pariatur. Commodo mollit dolore reprehenderit sunt non minim.',
    remarks:
      'Aute non ipsum cupidatat eiusmod cupidatat. Sit nisi reprehenderit consequat consectetur dolor consequat sint. Nisi nostrud consectetur minim eu Lorem commodo magna. Ad laborum velit ullamco incididunt.',
  },
  {
    _id: '63e65bcf4433ad4855f776a6',
    timesheet: '63e655df149020897457112a',
    hour: 23,
    minute: 57,
    description:
      'Mollit commodo consequat duis. Veniam sit minim ex qui ad ex.',
    remarks:
      'Deserunt voluptate id commodo culpa ea. Cillum officia ea quis veniam. Enim esse pariatur consequat aliqua veniam esse consectetur fugiat amet. Id mollit eu amet sint esse velit. Irure irure non adipisicing cupidatat consequat eiusmod deserunt nostrud dolor.',
  },
  {
    _id: '63e65bcf4433ad4855f776a7',
    timesheet: '63e655df149020897457112a',
    hour: 13,
    minute: 46,
    description:
      'Aliqua nisi non ipsum qui ea incididunt do. Non elit non nostrud veniam eiusmod et quis. Amet nulla qui eiusmod velit ea enim culpa occaecat proident. Elit consectetur quis sit reprehenderit esse aliquip excepteur. Ex duis ipsum nisi aute ullamco.',
    remarks:
      'Labore exercitation occaecat tempor ullamco tempor. Enim dolor minim adipisicing. Ullamco dolor eiusmod consectetur.',
  },
  {
    _id: '63e65bcf4433ad4855f776a8',
    timesheet: '63e655df149020897457112b',
    hour: 7,
    minute: 37,
    description:
      'Fugiat et dolore fugiat consequat deserunt elit. Reprehenderit dolor quis tempor officia elit dolor adipisicing esse veniam. Est quis do voluptate exercitation quis tempor.',
    remarks:
      'Velit non nulla velit proident et sint occaecat. Laboris ex ex commodo laboris id aute est aliquip. Est dolore proident cupidatat duis adipisicing officia aliquip labore. Ut sunt culpa velit qui nisi tempor sint dolore in.',
  },
  {
    _id: '63e65bcf4433ad4855f776a9',
    timesheet: '63e655df149020897457112c',
    hour: 19,
    minute: 45,
    description: 'Aute velit ea amet. Aute aute non dolor ex pariatur.',
    remarks:
      'Proident et consectetur voluptate veniam qui. Labore laborum adipisicing veniam. Elit fugiat adipisicing sint consectetur esse esse tempor ut nulla.',
  },
  {
    _id: '63e65bcf4433ad4855f776aa',
    timesheet: '63e655df149020897457112c',
    hour: 1,
    minute: 12,
    description:
      'Incididunt cupidatat anim occaecat eu id. Incididunt est qui minim elit labore. Minim ullamco ipsum culpa commodo commodo aute exercitation. Voluptate commodo officia minim aliqua ullamco do excepteur sit.',
    remarks:
      'Eiusmod aliquip duis aliqua magna eiusmod ut enim veniam nulla. Voluptate sit qui qui ipsum. Deserunt nostrud enim nisi.',
  },
  {
    _id: '63e65bcf4433ad4855f776ab',
    timesheet: '63e655df149020897457112c',
    hour: 9,
    minute: 48,
    description:
      'Lorem sit esse commodo. Labore in aliqua ad incididunt sit tempor. Ex consectetur ex duis exercitation commodo magna elit. Sunt consequat exercitation minim fugiat. Dolore culpa labore et irure.',
    remarks:
      'Ex proident exercitation nostrud sint non eu sint sunt Lorem. Eu Lorem cillum velit pariatur excepteur commodo. Cillum velit ex ut eu aute sint Lorem sint nisi. Duis Lorem ullamco ad amet nulla ex ipsum ex amet.',
  },
  {
    _id: '63e65bcf4433ad4855f776ac',
    timesheet: '63e655df149020897457112d',
    hour: 23,
    minute: 11,
    description:
      'Id velit eu tempor aliqua do. Id id nostrud laboris nulla consectetur amet consequat. Dolor aliquip velit enim minim pariatur. Minim est amet et tempor pariatur consectetur magna. Ut culpa consectetur est magna labore sit.',
    remarks:
      'Ea exercitation in anim. Reprehenderit amet irure cillum aliquip officia incididunt dolor excepteur id. Aute est eiusmod consequat in incididunt.',
  },
  {
    _id: '63e65bcf4433ad4855f776ad',
    timesheet: '63e655df149020897457112e',
    hour: 8,
    minute: 6,
    description:
      'Do duis nostrud culpa quis sunt. Dolor sit ex exercitation. Minim culpa in commodo esse qui aute ex magna.',
    remarks:
      'Aute aliqua aliqua occaecat in ad est esse in ullamco. Qui ipsum ipsum commodo pariatur enim id nulla.',
  },
  {
    _id: '63e65bcf4433ad4855f776ae',
    timesheet: '63e655df149020897457112e',
    hour: 12,
    minute: 35,
    description:
      'Sunt Lorem esse officia consequat mollit esse. Adipisicing id ullamco id irure sint excepteur quis proident.',
    remarks:
      'Exercitation eiusmod mollit culpa excepteur elit veniam. Duis quis laboris eiusmod labore nulla. Nulla reprehenderit do commodo. Enim reprehenderit magna excepteur in. Sit aliqua consectetur adipisicing deserunt irure occaecat amet eu cillum.',
  },
  {
    _id: '63e65bcf4433ad4855f776af',
    timesheet: '63e655df149020897457112f',
    hour: 14,
    minute: 22,
    description:
      'Ut amet non non ut proident elit ex. Fugiat officia nostrud enim magna id non eiusmod.',
    remarks:
      'Tempor id dolor nisi. Duis nisi quis non. Occaecat aute dolore pariatur laboris ut ad non. Proident occaecat incididunt non ut aliquip sint ex.',
  },
  {
    _id: '63e65bcf4433ad4855f776b0',
    timesheet: '63e655df149020897457112f',
    hour: 8,
    minute: 16,
    description:
      'Aliquip officia fugiat minim esse esse velit. Ex irure id aliqua deserunt ut. Excepteur sit ex duis anim. Officia ipsum voluptate adipisicing mollit aute sit aute.',
    remarks:
      'Magna quis commodo reprehenderit nostrud esse. Incididunt consequat dolor labore. Cupidatat sit cupidatat sit reprehenderit non ipsum. Occaecat commodo exercitation aliqua minim sit id consequat ipsum occaecat. Eu tempor elit laboris eiusmod nisi occaecat culpa.',
  },
  {
    _id: '63e65bcf4433ad4855f776b1',
    timesheet: '63e655df1490208974571130',
    hour: 0,
    minute: 14,
    description: 'Nulla minim in sit commodo qui nisi incididunt nostrud.',
    remarks:
      'Dolor aliquip ullamco consectetur eu velit ipsum excepteur. Mollit magna pariatur labore adipisicing fugiat pariatur velit mollit excepteur. Aute laboris deserunt ipsum tempor ex. Quis occaecat magna consequat sint sint aliquip sunt Lorem. Excepteur irure proident anim qui.',
  },
  {
    _id: '63e65bcf4433ad4855f776b2',
    timesheet: '63e655df1490208974571130',
    hour: 20,
    minute: 15,
    description:
      'Sint laboris ipsum nisi in irure adipisicing labore. Amet officia velit labore exercitation est.',
    remarks:
      'Consequat quis eu mollit Lorem et in deserunt exercitation. Excepteur ullamco quis cupidatat reprehenderit aliquip officia minim. Irure deserunt quis dolor.',
  },
  {
    _id: '63e65bcf4433ad4855f776b3',
    timesheet: '63e655df1490208974571131',
    hour: 21,
    minute: 36,
    description:
      'Commodo occaecat in voluptate consequat non ex anim anim. Dolor ullamco adipisicing sunt velit pariatur amet nulla esse. Nisi magna culpa fugiat aliquip aliqua pariatur aute qui. Non qui tempor commodo culpa cupidatat. Consequat cillum dolore fugiat cupidatat occaecat.',
    remarks:
      'Est ex deserunt ut proident velit ad Lorem reprehenderit enim. Eiusmod eu commodo occaecat incididunt incididunt culpa minim. Magna irure excepteur nulla elit minim cillum.',
  },
  {
    _id: '63e65bcf4433ad4855f776b4',
    timesheet: '63e655df1490208974571132',
    hour: 4,
    minute: 12,
    description: 'Exercitation deserunt esse labore ea fugiat cupidatat Lorem.',
    remarks: 'Excepteur enim consectetur do amet.',
  },
  {
    _id: '63e65bcf4433ad4855f776b5',
    timesheet: '63e655df1490208974571133',
    hour: 9,
    minute: 36,
    description:
      'Consectetur proident sint aliqua aliqua. Commodo labore minim duis labore tempor veniam. Cillum occaecat nulla ipsum reprehenderit officia.',
    remarks:
      'Ullamco in labore deserunt sunt eu. Do ullamco ea aliqua nisi Lorem veniam excepteur. Culpa voluptate laborum nostrud fugiat esse irure aliquip fugiat ut. Non eiusmod anim aliquip ad consectetur cupidatat.',
  },
  {
    _id: '63e65bcf4433ad4855f776b6',
    timesheet: '63e655df1490208974571133',
    hour: 16,
    minute: 27,
    description: 'Incididunt fugiat ullamco esse non sit culpa esse deserunt.',
    remarks:
      'Laboris aliquip ea adipisicing laboris ipsum irure velit est sit.',
  },
  {
    _id: '63e65bcf4433ad4855f776b7',
    timesheet: '63e655df1490208974571133',
    hour: 13,
    minute: 34,
    description:
      'Reprehenderit labore pariatur ad. Aute anim cupidatat voluptate laboris. Quis ipsum elit excepteur in Lorem deserunt quis sunt mollit. Incididunt nostrud qui aute quis nulla amet.',
    remarks:
      'Occaecat est labore pariatur duis deserunt est in reprehenderit fugiat. Mollit tempor ad amet esse tempor quis fugiat dolore minim. Esse mollit laboris nostrud.',
  },
  {
    _id: '63e65bcf4433ad4855f776b8',
    timesheet: '63e655df1490208974571133',
    hour: 0,
    minute: 4,
    description:
      'Irure consectetur est dolore consequat officia nostrud. Id est elit magna est commodo cillum dolore magna reprehenderit. Pariatur excepteur nostrud velit adipisicing et quis veniam occaecat. Mollit minim commodo exercitation culpa in voluptate dolore.',
    remarks:
      'Sunt irure tempor aute duis Lorem cillum proident consectetur. Excepteur sint mollit consequat sunt proident veniam dolor. Mollit ipsum aute ea sit mollit eiusmod veniam deserunt. Qui culpa culpa culpa est aute officia quis mollit.',
  },
  {
    _id: '63e65bcf4433ad4855f776b9',
    timesheet: '63e655df1490208974571134',
    hour: 1,
    minute: 56,
    description:
      'Tempor voluptate consectetur proident minim. Qui quis laboris quis cillum eiusmod. Commodo laboris fugiat nostrud ad sunt officia laborum. Ad ullamco Lorem labore commodo occaecat incididunt nisi consectetur mollit.',
    remarks:
      'Qui consequat id exercitation minim veniam. Dolor adipisicing dolor magna pariatur.',
  },
  {
    _id: '63e65bcf4433ad4855f776ba',
    timesheet: '63e655df1490208974571134',
    hour: 11,
    minute: 5,
    description: 'Lorem eiusmod proident voluptate.',
    remarks:
      'Aute nulla Lorem occaecat ex. Fugiat aliquip laboris ex tempor fugiat eu. Fugiat mollit enim ut duis laborum anim anim cillum Lorem. Consectetur est cillum sunt velit velit est Lorem est laboris. Incididunt reprehenderit tempor culpa incididunt ut laboris deserunt commodo Lorem.',
  },
  {
    _id: '63e65bcf4433ad4855f776bb',
    timesheet: '63e655df1490208974571135',
    hour: 20,
    minute: 17,
    description:
      'Reprehenderit aute reprehenderit minim. Nostrud deserunt nisi duis ad est. Consectetur cupidatat minim est laborum nostrud cillum.',
    remarks: 'Amet velit ea in excepteur id.',
  },
  {
    _id: '63e65bcf4433ad4855f776bc',
    timesheet: '63e655df1490208974571135',
    hour: 1,
    minute: 49,
    description: 'Aliquip mollit est enim minim ipsum.',
    remarks:
      'Fugiat est aute nulla Lorem tempor nostrud. Reprehenderit magna ex ea ullamco aliquip amet.',
  },
  {
    _id: '63e65bcf4433ad4855f776bd',
    timesheet: '63e655df1490208974571135',
    hour: 13,
    minute: 41,
    description:
      'Exercitation proident enim adipisicing quis mollit elit. Pariatur cillum ullamco commodo laborum. Adipisicing et cupidatat eiusmod nisi non fugiat. Ad deserunt quis laborum elit adipisicing.',
    remarks:
      'Elit anim proident quis esse. Non eu fugiat id non excepteur do. Velit quis exercitation mollit reprehenderit proident.',
  },
  {
    _id: '63e65bcf4433ad4855f776be',
    timesheet: '63e655df1490208974571136',
    hour: 12,
    minute: 4,
    description:
      'Nostrud aute do eu minim esse sint amet. Veniam est nostrud do dolore anim adipisicing. Eu laboris ad commodo tempor reprehenderit. Non excepteur consectetur consectetur irure magna. Sint deserunt adipisicing elit Lorem aliquip qui occaecat reprehenderit ipsum.',
    remarks:
      'Mollit nostrud amet ad aliquip ad elit. Cillum esse in ullamco qui sit anim ipsum laborum. Consequat nostrud est velit enim magna.',
  },
  {
    _id: '63e65bcf4433ad4855f776bf',
    timesheet: '63e655df1490208974571136',
    hour: 14,
    minute: 10,
    description: 'Duis officia eu velit elit ipsum minim amet irure et.',
    remarks:
      'Occaecat excepteur dolor cupidatat enim nulla deserunt aliqua. Culpa officia id enim. Dolor nostrud deserunt esse voluptate Lorem. Nisi et duis ex.',
  },
  {
    _id: '63e65bcf4433ad4855f776c0',
    timesheet: '63e655df1490208974571136',
    hour: 13,
    minute: 54,
    description:
      'Qui duis dolore dolore. Do magna esse adipisicing occaecat cupidatat excepteur amet tempor. Proident Lorem fugiat laborum consequat. Ea cupidatat ad quis in cillum cillum minim culpa.',
    remarks:
      'Incididunt irure nisi laboris qui nostrud deserunt ipsum. Eu dolor deserunt dolor amet. Mollit ipsum aliqua cupidatat dolor. Quis duis et est. Esse elit sunt incididunt adipisicing eu culpa et est tempor.',
  },
  {
    _id: '63e65bcf4433ad4855f776c1',
    timesheet: '63e655df1490208974571136',
    hour: 14,
    minute: 8,
    description:
      'Proident ut mollit fugiat aliquip excepteur. Irure commodo amet duis velit esse. Ea elit excepteur fugiat consectetur dolore Lorem irure proident. Occaecat aliquip consequat ipsum velit do laborum nisi mollit. Est culpa exercitation deserunt id ex.',
    remarks:
      'Pariatur occaecat cupidatat amet irure dolore exercitation. Sit id ut elit culpa nulla mollit laboris in in. Ad consequat cupidatat est. Lorem incididunt id dolore tempor deserunt aliquip.',
  },
];

const seedDatabase = async () => {
  await connectDB();

  /* DELETION OF EXITING RECORDS */
  await Role.deleteMany({});
  await User.deleteMany({});
  await Timesheet.deleteMany({});
  await Task.deleteMany({});

  /* INSERTION OF MOCK RECORDS */
  dataUsers.forEach(async (userData) => {
    const user = new User(userData);
    await user.save();
  });

  await Role.insertMany(dataRoles);
  await Task.insertMany(dataTasks);
  await Timesheet.insertMany(dataTimesheets);

  console.info('Insertion of data has been successful!');
  process.exit(1);
};

seedDatabase();
