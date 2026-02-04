// Student records array
let students = [];
let selectedRowIndex = null;
let filteredStudents = null; // holds search-filtered view (null = no filter)

// Mock data embedded directly into script.js
const mockData = [
  { studentId: "073900438", firstName: "Osbourne", lastName: "Wakenshaw", lab1: 69, lab2: 5, lab3: 52, exam: 12, attendance: 78 },
  { studentId: "114924014", firstName: "Albie", lastName: "Gierardi", lab1: 58, lab2: 92, lab3: 16, exam: 57, attendance: 97 },
  { studentId: "111901632", firstName: "Eleen", lastName: "Pentony", lab1: 43, lab2: 81, lab3: 34, exam: 36, attendance: 16 },
  { studentId: "084000084", firstName: "Arie", lastName: "Okenden", lab1: 31, lab2: 5, lab3: 14, exam: 39, attendance: 99 },
  { studentId: "272471551", firstName: "Alica", lastName: "Muckley", lab1: 49, lab2: 66, lab3: 97, exam: 3, attendance: 95 },
  { studentId: "104900721", firstName: "Jo", lastName: "Burleton", lab1: 98, lab2: 94, lab3: 33, exam: 13, attendance: 29 },
  { studentId: "111924392", firstName: "Cam", lastName: "Akram", lab1: 44, lab2: 84, lab3: 17, exam: 16, attendance: 24 },
  { studentId: "292970744", firstName: "Celine", lastName: "Brosoli", lab1: 3, lab2: 15, lab3: 71, exam: 83, attendance: 45 },
  { studentId: "107004352", firstName: "Alan", lastName: "Belfit", lab1: 31, lab2: 51, lab3: 36, exam: 70, attendance: 48 },
  { studentId: "071108313", firstName: "Jeanette", lastName: "Gilvear", lab1: 4, lab2: 78, lab3: 15, exam: 69, attendance: 69 },
  { studentId: "042204932", firstName: "Ethelin", lastName: "MacCathay", lab1: 48, lab2: 36, lab3: 23, exam: 1, attendance: 11 },
  { studentId: "111914218", firstName: "Kakalina", lastName: "Finnick", lab1: 69, lab2: 5, lab3: 65, exam: 10, attendance: 8 },
  { studentId: "074906059", firstName: "Mayer", lastName: "Lorenzetti", lab1: 36, lab2: 30, lab3: 100, exam: 41, attendance: 92 },
  { studentId: "091000080", firstName: "Selia", lastName: "Rosenstengel", lab1: 15, lab2: 42, lab3: 85, exam: 68, attendance: 28 },
  { studentId: "055002480", firstName: "Dalia", lastName: "Tadd", lab1: 84, lab2: 86, lab3: 13, exam: 91, attendance: 22 },
  { studentId: "063101111", firstName: "Darryl", lastName: "Doogood", lab1: 36, lab2: 3, lab3: 78, exam: 13, attendance: 100 },
  { studentId: "071908827", firstName: "Brier", lastName: "Wace", lab1: 69, lab2: 92, lab3: 23, exam: 75, attendance: 40 },
  { studentId: "322285668", firstName: "Bucky", lastName: "Udall", lab1: 97, lab2: 63, lab3: 19, exam: 46, attendance: 28 },
  { studentId: "103006406", firstName: "Haslett", lastName: "Beaford", lab1: 41, lab2: 32, lab3: 85, exam: 60, attendance: 61 },
  { studentId: "104913048", firstName: "Shelley", lastName: "Spring", lab1: 84, lab2: 73, lab3: 63, exam: 59, attendance: 3 },
  { studentId: "051403517", firstName: "Marius", lastName: "Southway", lab1: 28, lab2: 75, lab3: 29, exam: 88, attendance: 92 },
  { studentId: "021301869", firstName: "Katharina", lastName: "Storch", lab1: 6, lab2: 61, lab3: 6, exam: 49, attendance: 56 },
  { studentId: "063115178", firstName: "Hester", lastName: "Menendez", lab1: 70, lab2: 46, lab3: 73, exam: 40, attendance: 56 },
  { studentId: "084202442", firstName: "Shaylynn", lastName: "Scorthorne", lab1: 50, lab2: 80, lab3: 81, exam: 96, attendance: 83 },
  { studentId: "275079882", firstName: "Madonna", lastName: "Willatt", lab1: 23, lab2: 12, lab3: 17, exam: 83, attendance: 5 },
  { studentId: "071001041", firstName: "Bancroft", lastName: "Padfield", lab1: 50, lab2: 100, lab3: 58, exam: 13, attendance: 14 },
  { studentId: "261170740", firstName: "Rici", lastName: "Everard", lab1: 51, lab2: 15, lab3: 48, exam: 99, attendance: 41 },
  { studentId: "113105478", firstName: "Lishe", lastName: "Dashkovich", lab1: 9, lab2: 23, lab3: 48, exam: 63, attendance: 95 },
  { studentId: "267089712", firstName: "Alexandrina", lastName: "Abate", lab1: 34, lab2: 54, lab3: 79, exam: 44, attendance: 71 },
  { studentId: "041002203", firstName: "Jordon", lastName: "Ribbens", lab1: 41, lab2: 42, lab3: 24, exam: 60, attendance: 21 },
  { studentId: "021308176", firstName: "Jennette", lastName: "Andrassy", lab1: 63, lab2: 13, lab3: 100, exam: 67, attendance: 4 },
  { studentId: "122239937", firstName: "Hamid", lastName: "Chapell", lab1: 90, lab2: 92, lab3: 44, exam: 43, attendance: 47 },
  { studentId: "021109935", firstName: "Cordy", lastName: "Crosetto", lab1: 16, lab2: 10, lab3: 99, exam: 32, attendance: 57 },
  { studentId: "111026041", firstName: "Tiphanie", lastName: "Gwin", lab1: 34, lab2: 45, lab3: 88, exam: 87, attendance: 27 },
  { studentId: "072408708", firstName: "Leanor", lastName: "Izachik", lab1: 95, lab2: 35, lab3: 88, exam: 9, attendance: 75 },
  { studentId: "221370030", firstName: "Lissy", lastName: "Tuffley", lab1: 90, lab2: 30, lab3: 84, exam: 60, attendance: 86 },
  { studentId: "104900048", firstName: "Myrta", lastName: "Mathieson", lab1: 88, lab2: 80, lab3: 16, exam: 6, attendance: 48 },
  { studentId: "111311413", firstName: "Cynthea", lastName: "Fowles", lab1: 82, lab2: 59, lab3: 13, exam: 97, attendance: 23 },
  { studentId: "091408695", firstName: "Zacherie", lastName: "Branch", lab1: 67, lab2: 6, lab3: 8, exam: 78, attendance: 10 },
  { studentId: "231372183", firstName: "Britney", lastName: "Blackesland", lab1: 78, lab2: 79, lab3: 36, exam: 23, attendance: 83 },
  { studentId: "263190634", firstName: "Theda", lastName: "Menco", lab1: 50, lab2: 13, lab3: 7, exam: 11, attendance: 8 },
  { studentId: "021606580", firstName: "Carin", lastName: "Schrader", lab1: 77, lab2: 32, lab3: 25, exam: 56, attendance: 53 },
  { studentId: "074902341", firstName: "Shawn", lastName: "Moston", lab1: 64, lab2: 91, lab3: 6, exam: 95, attendance: 21 },
  { studentId: "107006088", firstName: "Virge", lastName: "Sinnat", lab1: 20, lab2: 1, lab3: 78, exam: 44, attendance: 92 },
  { studentId: "091807254", firstName: "Alano", lastName: "Jotcham", lab1: 66, lab2: 35, lab3: 99, exam: 48, attendance: 83 },
  { studentId: "011601029", firstName: "Pietra", lastName: "Roy", lab1: 35, lab2: 34, lab3: 75, exam: 39, attendance: 98 },
  { studentId: "122240010", firstName: "Orren", lastName: "Danihelka", lab1: 51, lab2: 36, lab3: 17, exam: 59, attendance: 32 },
  { studentId: "091400046", firstName: "Angie", lastName: "Grindell", lab1: 51, lab2: 54, lab3: 55, exam: 59, attendance: 61 },
  { studentId: "071001630", firstName: "Vachel", lastName: "Swancock", lab1: 41, lab2: 31, lab3: 88, exam: 24, attendance: 24 },
  { studentId: "061020977", firstName: "Zane", lastName: "Bellie", lab1: 88, lab2: 92, lab3: 92, exam: 52, attendance: 46 },
  { studentId: "065403150", firstName: "Delphine", lastName: "Sirette", lab1: 73, lab2: 35, lab3: 53, exam: 48, attendance: 67 },
  { studentId: "081211300", firstName: "Oliver", lastName: "Pynner", lab1: 47, lab2: 76, lab3: 76, exam: 56, attendance: 87 },
  { studentId: "011601074", firstName: "Barbra", lastName: "Antyukhin", lab1: 72, lab2: 66, lab3: 76, exam: 53, attendance: 42 },
  { studentId: "091014898", firstName: "Charmain", lastName: "Elce", lab1: 61, lab2: 76, lab3: 84, exam: 6, attendance: 64 },
  { studentId: "042100049", firstName: "Herold", lastName: "Klawi", lab1: 3, lab2: 56, lab3: 92, exam: 27, attendance: 76 },
  { studentId: "091906359", firstName: "Mariann", lastName: "Mousdall", lab1: 18, lab2: 42, lab3: 25, exam: 74, attendance: 47 },
  { studentId: "101114992", firstName: "Horatius", lastName: "Romera", lab1: 91, lab2: 52, lab3: 29, exam: 11, attendance: 56 },
  { studentId: "031307604", firstName: "Dall", lastName: "Laboune", lab1: 71, lab2: 61, lab3: 78, exam: 51, attendance: 11 },
  { studentId: "111308031", firstName: "Teddie", lastName: "Carlett", lab1: 39, lab2: 85, lab3: 48, exam: 93, attendance: 87 },
  { studentId: "114919676", firstName: "Kelley", lastName: "Klimentyonok", lab1: 22, lab2: 17, lab3: 83, exam: 61, attendance: 81 },
  { studentId: "322283835", firstName: "Colene", lastName: "Corgenvin", lab1: 13, lab2: 3, lab3: 73, exam: 96, attendance: 15 },
  { studentId: "051402071", firstName: "Diannne", lastName: "Pashan", lab1: 82, lab2: 91, lab3: 70, exam: 78, attendance: 56 },
  { studentId: "081904808", firstName: "Staffard", lastName: "Cullerne", lab1: 46, lab2: 37, lab3: 15, exam: 39, attendance: 50 },
  { studentId: "074914407", firstName: "Alwin", lastName: "Hartzog", lab1: 32, lab2: 10, lab3: 90, exam: 19, attendance: 73 },
  { studentId: "103110813", firstName: "Johnny", lastName: "Calbreath", lab1: 3, lab2: 48, lab3: 19, exam: 4, attendance: 16 },
  { studentId: "241282632", firstName: "Sophronia", lastName: "Fere", lab1: 65, lab2: 58, lab3: 71, exam: 49, attendance: 37 },
  { studentId: "063106734", firstName: "Timothea", lastName: "Lambird", lab1: 77, lab2: 74, lab3: 78, exam: 85, attendance: 52 },
  { studentId: "064102290", firstName: "Lauralee", lastName: "Mc Caghan", lab1: 37, lab2: 76, lab3: 99, exam: 97, attendance: 12 },
  { studentId: "075017947", firstName: "Denny", lastName: "Dani", lab1: 59, lab2: 80, lab3: 5, exam: 4, attendance: 50 },
  { studentId: "072414297", firstName: "Marilin", lastName: "Lilloe", lab1: 1, lab2: 76, lab3: 99, exam: 40, attendance: 25 },
  { studentId: "083908420", firstName: "Hephzibah", lastName: "Mizzi", lab1: 33, lab2: 44, lab3: 69, exam: 72, attendance: 34 },
  { studentId: "075902340", firstName: "Jourdan", lastName: "Toulamain", lab1: 44, lab2: 84, lab3: 89, exam: 80, attendance: 24 },
  { studentId: "114901147", firstName: "Natassia", lastName: "Daniele", lab1: 4, lab2: 68, lab3: 27, exam: 66, attendance: 45 },
  { studentId: "061000256", firstName: "Kellina", lastName: "Newlands", lab1: 13, lab2: 34, lab3: 20, exam: 57, attendance: 89 },
  { studentId: "051009296", firstName: "Andria", lastName: "Thurske", lab1: 1, lab2: 8, lab3: 46, exam: 52, attendance: 72 },
  { studentId: "084205656", firstName: "Shanie", lastName: "Marczyk", lab1: 64, lab2: 2, lab3: 33, exam: 62, attendance: 45 },
  { studentId: "041211298", firstName: "Norine", lastName: "Spinella", lab1: 85, lab2: 33, lab3: 2, exam: 2, attendance: 77 },
  { studentId: "071922379", firstName: "Rudiger", lastName: "Cornbell", lab1: 40, lab2: 44, lab3: 62, exam: 51, attendance: 28 },
  { studentId: "092101030", firstName: "Reynold", lastName: "Dumbelton", lab1: 3, lab2: 25, lab3: 70, exam: 75, attendance: 84 },
  { studentId: "265270413", firstName: "Fielding", lastName: "Gouldstraw", lab1: 57, lab2: 41, lab3: 85, exam: 17, attendance: 23 },
  { studentId: "051502434", firstName: "Toni", lastName: "Wong", lab1: 36, lab2: 19, lab3: 93, exam: 31, attendance: 74 },
  { studentId: "072413557", firstName: "Daisey", lastName: "Shireff", lab1: 85, lab2: 56, lab3: 79, exam: 35, attendance: 47 },
  { studentId: "231371799", firstName: "Cristin", lastName: "Albutt", lab1: 79, lab2: 37, lab3: 46, exam: 79, attendance: 26 },
  { studentId: "122203248", firstName: "Peterus", lastName: "Ojeda", lab1: 30, lab2: 26, lab3: 78, exam: 61, attendance: 41 },
  { studentId: "084205766", firstName: "Nissie", lastName: "Winterflood", lab1: 76, lab2: 2, lab3: 81, exam: 36, attendance: 18 },
  { studentId: "075900465", firstName: "Franciska", lastName: "Meatyard", lab1: 90, lab2: 11, lab3: 97, exam: 41, attendance: 93 },
  { studentId: "051502434", firstName: "Tyler", lastName: "Alekhov", lab1: 89, lab2: 69, lab3: 32, exam: 34, attendance: 8 },
  { studentId: "114922430", firstName: "Cordy", lastName: "Byllam", lab1: 42, lab2: 88, lab3: 50, exam: 77, attendance: 100 },
  { studentId: "221982156", firstName: "Gabriel", lastName: "Limrick", lab1: 92, lab2: 94, lab3: 30, exam: 91, attendance: 41 },
  { studentId: "084201223", firstName: "Nonie", lastName: "McGaffey", lab1: 35, lab2: 12, lab3: 84, exam: 33, attendance: 43 },
  { studentId: "071909211", firstName: "Kittie", lastName: "Alman", lab1: 45, lab2: 22, lab3: 28, exam: 100, attendance: 47 },
  { studentId: "071900663", firstName: "Gran", lastName: "Smithies", lab1: 68, lab2: 35, lab3: 59, exam: 9, attendance: 84 },
  { studentId: "067006432", firstName: "Sammy", lastName: "Gundry", lab1: 48, lab2: 24, lab3: 42, exam: 4, attendance: 61 },
  { studentId: "081503490", firstName: "Ozzy", lastName: "Iskowitz", lab1: 56, lab2: 54, lab3: 78, exam: 55, attendance: 77 },
  { studentId: "081307227", firstName: "Charlie", lastName: "Waldram", lab1: 91, lab2: 41, lab3: 59, exam: 87, attendance: 82 },
  { studentId: "211272465", firstName: "Benn", lastName: "Adnams", lab1: 1, lab2: 29, lab3: 23, exam: 89, attendance: 33 },
  { studentId: "065404913", firstName: "Fidelia", lastName: "Katt", lab1: 35, lab2: 35, lab3: 61, exam: 66, attendance: 36 },
  { studentId: "082900380", firstName: "Fidelia", lastName: "Jahndel", lab1: 24, lab2: 15, lab3: 93, exam: 1, attendance: 43 },
  { studentId: "061101100", firstName: "Marietta", lastName: "Bourgourd", lab1: 74, lab2: 83, lab3: 74, exam: 18, attendance: 7 },
  { studentId: "075072157", firstName: "Elberta", lastName: "Argyle", lab1: 73, lab2: 61, lab3: 24, exam: 52, attendance: 39 },
  { studentId: "082900911", firstName: "Dru", lastName: "Hendrickson", lab1: 60, lab2: 97, lab3: 80, exam: 38, attendance: 74 },
  { studentId: "301271790", firstName: "Clemmie", lastName: "Annett", lab1: 76, lab2: 3, lab3: 27, exam: 26, attendance: 70 },
  { studentId: "122243321", firstName: "Even", lastName: "Stebbings", lab1: 21, lab2: 73, lab3: 94, exam: 40, attendance: 60 },
  { studentId: "112204286", firstName: "Eduardo", lastName: "Scholz", lab1: 55, lab2: 18, lab3: 35, exam: 18, attendance: 7 },
  { studentId: "064108605", firstName: "Ruggiero", lastName: "Colrein", lab1: 69, lab2: 8, lab3: 93, exam: 79, attendance: 63 },
  { studentId: "256072701", firstName: "Lesli", lastName: "Tolefree", lab1: 45, lab2: 58, lab3: 51, exam: 30, attendance: 76 },
  { studentId: "091201818", firstName: "Caitrin", lastName: "Bogeys", lab1: 52, lab2: 26, lab3: 19, exam: 69, attendance: 90 },
  { studentId: "063115437", firstName: "Rodrick", lastName: "Bisset", lab1: 46, lab2: 39, lab3: 11, exam: 12, attendance: 53 },
  { studentId: "211384162", firstName: "Ladonna", lastName: "Bridgewood", lab1: 51, lab2: 11, lab3: 17, exam: 34, attendance: 12 },
  { studentId: "122238938", firstName: "Westleigh", lastName: "Trevear", lab1: 23, lab2: 19, lab3: 23, exam: 99, attendance: 65 },
  { studentId: "111101377", firstName: "Allen", lastName: "Petrovsky", lab1: 62, lab2: 50, lab3: 89, exam: 42, attendance: 51 },
  { studentId: "051404118", firstName: "Tabbitha", lastName: "Havers", lab1: 64, lab2: 51, lab3: 23, exam: 1, attendance: 57 },
  { studentId: "262285223", firstName: "Chev", lastName: "Helstrip", lab1: 16, lab2: 91, lab3: 9, exam: 28, attendance: 96 },
  { studentId: "072413599", firstName: "Garvey", lastName: "Done", lab1: 30, lab2: 17, lab3: 2, exam: 18, attendance: 43 },
  { studentId: "075000734", firstName: "Kalila", lastName: "Wondraschek", lab1: 40, lab2: 54, lab3: 72, exam: 33, attendance: 25 },
  { studentId: "065002030", firstName: "Eustace", lastName: "Hourican", lab1: 91, lab2: 98, lab3: 72, exam: 54, attendance: 83 },
  { studentId: "084307033", firstName: "Frayda", lastName: "Drewell", lab1: 29, lab2: 28, lab3: 39, exam: 25, attendance: 16 },
  { studentId: "114912275", firstName: "Corena", lastName: "Seyler", lab1: 42, lab2: 46, lab3: 19, exam: 6, attendance: 69 },
  { studentId: "071925538", firstName: "Aurie", lastName: "Campanelli", lab1: 40, lab2: 91, lab3: 64, exam: 39, attendance: 48 },
  { studentId: "263190757", firstName: "Juanita", lastName: "Ruhben", lab1: 49, lab2: 66, lab3: 94, exam: 39, attendance: 34 },
  { studentId: "082905181", firstName: "Danica", lastName: "Hillam", lab1: 70, lab2: 65, lab3: 53, exam: 50, attendance: 98 },
  { studentId: "211170169", firstName: "Carney", lastName: "Bastick", lab1: 82, lab2: 58, lab3: 33, exam: 29, attendance: 21 },
  { studentId: "111304608", firstName: "Rori", lastName: "Wragge", lab1: 76, lab2: 37, lab3: 72, exam: 21, attendance: 38 },
  { studentId: "101918240", firstName: "Rebbecca", lastName: "Holywell", lab1: 45, lab2: 51, lab3: 90, exam: 46, attendance: 70 },
  { studentId: "091300719", firstName: "Carina", lastName: "Manuello", lab1: 97, lab2: 98, lab3: 27, exam: 81, attendance: 53 },
  { studentId: "053202305", firstName: "Mandi", lastName: "Meas", lab1: 55, lab2: 10, lab3: 92, exam: 59, attendance: 89 },
  { studentId: "071923747", firstName: "Audry", lastName: "Warkup", lab1: 80, lab2: 77, lab3: 55, exam: 61, attendance: 89 },
  { studentId: "071001630", firstName: "Meryl", lastName: "Mackett", lab1: 17, lab2: 84, lab3: 26, exam: 62, attendance: 39 },
  { studentId: "053201186", firstName: "Richart", lastName: "Tolliday", lab1: 59, lab2: 3, lab3: 98, exam: 69, attendance: 16 },
  { studentId: "071105002", firstName: "Alejoa", lastName: "Kinkead", lab1: 59, lab2: 58, lab3: 76, exam: 64, attendance: 6 },
  { studentId: "065203499", firstName: "Minna", lastName: "Dunkley", lab1: 78, lab2: 55, lab3: 50, exam: 46, attendance: 20 },
  { studentId: "102101496", firstName: "Alyse", lastName: "Gabits", lab1: 92, lab2: 50, lab3: 22, exam: 43, attendance: 55 },
  { studentId: "062000019", firstName: "Orsa", lastName: "Learmouth", lab1: 23, lab2: 94, lab3: 7, exam: 4, attendance: 77 },
  { studentId: "042201948", firstName: "Renata", lastName: "Dykas", lab1: 26, lab2: 100, lab3: 22, exam: 11, attendance: 34 },
  { studentId: "062206415", firstName: "Rogers", lastName: "Ivanyushin", lab1: 53, lab2: 57, lab3: 25, exam: 62, attendance: 93 },
  { studentId: "122243457", firstName: "Shelton", lastName: "Kunc", lab1: 25, lab2: 86, lab3: 21, exam: 33, attendance: 17 },
  { studentId: "061204612", firstName: "Arlen", lastName: "Gobeau", lab1: 25, lab2: 23, lab3: 20, exam: 68, attendance: 76 },
  { studentId: "113110780", firstName: "Fidel", lastName: "Rodgers", lab1: 31, lab2: 62, lab3: 92, exam: 75, attendance: 34 },
  { studentId: "113122655", firstName: "Peadar", lastName: "Brompton", lab1: 22, lab2: 36, lab3: 83, exam: 51, attendance: 12 },
  { studentId: "103101929", firstName: "Noel", lastName: "Caught", lab1: 17, lab2: 15, lab3: 54, exam: 17, attendance: 59 },
  { studentId: "061209756", firstName: "Mitchell", lastName: "Spickett", lab1: 95, lab2: 26, lab3: 60, exam: 57, attendance: 16 },
  { studentId: "082901457", firstName: "Carney", lastName: "Redsull", lab1: 41, lab2: 40, lab3: 34, exam: 50, attendance: 98 },
  { studentId: "211970055", firstName: "Nelia", lastName: "Mattke", lab1: 79, lab2: 11, lab3: 81, exam: 10, attendance: 26 },
  { studentId: "065002108", firstName: "Marcellus", lastName: "Discombe", lab1: 23, lab2: 22, lab3: 51, exam: 76, attendance: 67 },
  { studentId: "323270300", firstName: "Polly", lastName: "Savine", lab1: 19, lab2: 30, lab3: 11, exam: 9, attendance: 64 },
  { studentId: "067005679", firstName: "Nobe", lastName: "Brake", lab1: 1, lab2: 22, lab3: 59, exam: 37, attendance: 65 },
  { studentId: "073915520", firstName: "Nollie", lastName: "Locke", lab1: 40, lab2: 6, lab3: 95, exam: 3, attendance: 24 },
  { studentId: "067091719", firstName: "Dino", lastName: "Davenhall", lab1: 83, lab2: 79, lab3: 9, exam: 90, attendance: 98 },
  { studentId: "063113015", firstName: "Frants", lastName: "Boughey", lab1: 46, lab2: 66, lab3: 87, exam: 15, attendance: 94 },
  { studentId: "104900679", firstName: "Frannie", lastName: "Rigg", lab1: 51, lab2: 53, lab3: 84, exam: 44, attendance: 97 },
  { studentId: "111916452", firstName: "Lazaro", lastName: "Kid", lab1: 47, lab2: 29, lab3: 65, exam: 64, attendance: 55 },
  { studentId: "111906161", firstName: "Berny", lastName: "Caps", lab1: 11, lab2: 63, lab3: 12, exam: 13, attendance: 47 },
  { studentId: "264279334", firstName: "Gerhard", lastName: "McNellis", lab1: 71, lab2: 8, lab3: 31, exam: 98, attendance: 78 },
  { studentId: "101106379", firstName: "Demetra", lastName: "Cristofor", lab1: 79, lab2: 75, lab3: 77, exam: 74, attendance: 98 },
  { studentId: "113110816", firstName: "Timmie", lastName: "Mitcham", lab1: 83, lab2: 77, lab3: 16, exam: 84, attendance: 40 },
  { studentId: "064108757", firstName: "Holmes", lastName: "Dunwoody", lab1: 88, lab2: 30, lab3: 82, exam: 11, attendance: 25 },
  { studentId: "107003418", firstName: "Sully", lastName: "Dawid", lab1: 17, lab2: 53, lab3: 10, exam: 3, attendance: 75 },
  { studentId: "073903150", firstName: "Myer", lastName: "Mandre", lab1: 93, lab2: 40, lab3: 31, exam: 56, attendance: 17 },
  { studentId: "211372352", firstName: "Marco", lastName: "Drysdale", lab1: 81, lab2: 77, lab3: 1, exam: 29, attendance: 2 },
  { studentId: "103112329", firstName: "Tabina", lastName: "Cardinale", lab1: 59, lab2: 41, lab3: 45, exam: 11, attendance: 100 },
  { studentId: "092901803", firstName: "Adams", lastName: "Baythorp", lab1: 23, lab2: 2, lab3: 5, exam: 60, attendance: 73 },
  { studentId: "122105252", firstName: "Jerrold", lastName: "Bailess", lab1: 90, lab2: 80, lab3: 80, exam: 10, attendance: 88 },
  { studentId: "284272654", firstName: "Colman", lastName: "Cavil", lab1: 35, lab2: 85, lab3: 60, exam: 44, attendance: 61 },
  { studentId: "111900455", firstName: "Caryl", lastName: "Audsley", lab1: 28, lab2: 9, lab3: 70, exam: 15, attendance: 78 },
  { studentId: "021207358", firstName: "Cindee", lastName: "Tomik", lab1: 64, lab2: 8, lab3: 41, exam: 88, attendance: 53 },
  { studentId: "083002533", firstName: "Isis", lastName: "Dudley", lab1: 44, lab2: 74, lab3: 14, exam: 9, attendance: 43 },
  { studentId: "261170740", firstName: "Caldwell", lastName: "Izzard", lab1: 51, lab2: 63, lab3: 96, exam: 64, attendance: 21 },
  { studentId: "101102496", firstName: "Olimpia", lastName: "Maymand", lab1: 71, lab2: 25, lab3: 53, exam: 50, attendance: 51 },
  { studentId: "064203021", firstName: "Rhiamon", lastName: "Glowach", lab1: 54, lab2: 18, lab3: 72, exam: 93, attendance: 54 },
  { studentId: "021172661", firstName: "Beale", lastName: "Kordova", lab1: 34, lab2: 1, lab3: 75, exam: 41, attendance: 18 },
  { studentId: "122041523", firstName: "Bebe", lastName: "Crippen", lab1: 65, lab2: 51, lab3: 42, exam: 1, attendance: 94 },
  { studentId: "065301689", firstName: "Kippy", lastName: "Joselin", lab1: 83, lab2: 59, lab3: 77, exam: 34, attendance: 81 },
  { studentId: "111924305", firstName: "Derron", lastName: "Mothersdale", lab1: 95, lab2: 6, lab3: 44, exam: 79, attendance: 23 },
  { studentId: "074000162", firstName: "Early", lastName: "Brilon", lab1: 62, lab2: 39, lab3: 21, exam: 60, attendance: 64 },
  { studentId: "322271779", firstName: "Vitoria", lastName: "Baxstar", lab1: 31, lab2: 55, lab3: 2, exam: 69, attendance: 14 },
  { studentId: "114922430", firstName: "Giulietta", lastName: "Finnie", lab1: 44, lab2: 92, lab3: 8, exam: 4, attendance: 61 },
  { studentId: "055000770", firstName: "Cosmo", lastName: "Harriot", lab1: 84, lab2: 69, lab3: 35, exam: 32, attendance: 5 },
  { studentId: "063114632", firstName: "Netta", lastName: "Glazyer", lab1: 39, lab2: 13, lab3: 94, exam: 18, attendance: 89 },
  { studentId: "101102836", firstName: "Ruggiero", lastName: "Spelsbury", lab1: 57, lab2: 66, lab3: 9, exam: 37, attendance: 100 },
  { studentId: "103101424", firstName: "Sunny", lastName: "Vogeler", lab1: 3, lab2: 51, lab3: 100, exam: 17, attendance: 83 },
  { studentId: "111321270", firstName: "Gustie", lastName: "Roelvink", lab1: 51, lab2: 96, lab3: 47, exam: 30, attendance: 20 },
  { studentId: "073920845", firstName: "Marilin", lastName: "Caldow", lab1: 9, lab2: 40, lab3: 32, exam: 76, attendance: 63 },
  { studentId: "031317380", firstName: "Lindsay", lastName: "Slisby", lab1: 19, lab2: 10, lab3: 63, exam: 51, attendance: 53 },
  { studentId: "065301197", firstName: "Lily", lastName: "Jowitt", lab1: 20, lab2: 97, lab3: 8, exam: 70, attendance: 95 },
  { studentId: "071909198", firstName: "Lezlie", lastName: "Trotton", lab1: 23, lab2: 19, lab3: 67, exam: 89, attendance: 36 },
  { studentId: "043000122", firstName: "Lyndsie", lastName: "Flaune", lab1: 29, lab2: 35, lab3: 73, exam: 98, attendance: 23 },
  { studentId: "211272504", firstName: "Riane", lastName: "Gilford", lab1: 44, lab2: 78, lab3: 2, exam: 3, attendance: 64 },
  { studentId: "091401919", firstName: "Tami", lastName: "Khotler", lab1: 27, lab2: 49, lab3: 2, exam: 52, attendance: 48 },
  { studentId: "064108757", firstName: "Marrissa", lastName: "Alywin", lab1: 79, lab2: 63, lab3: 3, exam: 60, attendance: 84 },
  { studentId: "071902629", firstName: "Gav", lastName: "Maile", lab1: 57, lab2: 53, lab3: 49, exam: 33, attendance: 33 },
  { studentId: "031301053", firstName: "Ben", lastName: "Stockport", lab1: 25, lab2: 84, lab3: 6, exam: 69, attendance: 31 },
  { studentId: "113014077", firstName: "Fran", lastName: "Eyckelbeck", lab1: 93, lab2: 31, lab3: 79, exam: 74, attendance: 21 },
  { studentId: "065303069", firstName: "Ruperto", lastName: "Asp", lab1: 13, lab2: 82, lab3: 29, exam: 25, attendance: 17 },
  { studentId: "071917232", firstName: "Shanon", lastName: "Polly", lab1: 86, lab2: 73, lab3: 35, exam: 10, attendance: 79 },
  { studentId: "086518723", firstName: "Noak", lastName: "Pickring", lab1: 24, lab2: 90, lab3: 2, exam: 39, attendance: 3 },
  { studentId: "101100922", firstName: "Blinni", lastName: "Marsie", lab1: 27, lab2: 16, lab3: 57, exam: 69, attendance: 72 },
  { studentId: "111306871", firstName: "Demetri", lastName: "Plackstone", lab1: 74, lab2: 6, lab3: 66, exam: 20, attendance: 74 },
  { studentId: "052100929", firstName: "Fidole", lastName: "Gremane", lab1: 95, lab2: 90, lab3: 31, exam: 16, attendance: 4 },
  { studentId: "091015224", firstName: "Magdalene", lastName: "Bushell", lab1: 40, lab2: 66, lab3: 88, exam: 70, attendance: 24 },
  { studentId: "071114491", firstName: "Matthus", lastName: "Cecely", lab1: 70, lab2: 75, lab3: 48, exam: 4, attendance: 55 },
  { studentId: "031000040", firstName: "Isac", lastName: "Itzhaiek", lab1: 83, lab2: 25, lab3: 11, exam: 67, attendance: 62 },
  { studentId: "103912723", firstName: "Sawyer", lastName: "Kaman", lab1: 47, lab2: 93, lab3: 1, exam: 42, attendance: 3 },
  { studentId: "281581047", firstName: "Berti", lastName: "Finch", lab1: 64, lab2: 70, lab3: 16, exam: 79, attendance: 65 },
  { studentId: "064000185", firstName: "Jeff", lastName: "Brogiotti", lab1: 18, lab2: 87, lab3: 55, exam: 72, attendance: 7 },
  { studentId: "091916093", firstName: "Elissa", lastName: "Peaden", lab1: 98, lab2: 92, lab3: 78, exam: 57, attendance: 15 },
  { studentId: "041201703", firstName: "Skipp", lastName: "Leet", lab1: 82, lab2: 85, lab3: 86, exam: 63, attendance: 79 },
  { studentId: "243073632", firstName: "Otha", lastName: "Lynskey", lab1: 46, lab2: 68, lab3: 9, exam: 78, attendance: 56 },
  { studentId: "113001077", firstName: "Staford", lastName: "Darell", lab1: 37, lab2: 24, lab3: 64, exam: 77, attendance: 50 },
  { studentId: "103106843", firstName: "Tony", lastName: "Cole", lab1: 34, lab2: 30, lab3: 37, exam: 71, attendance: 51 },
  { studentId: "221472776", firstName: "Kleon", lastName: "Caskie", lab1: 5, lab2: 54, lab3: 34, exam: 42, attendance: 91 },
  { studentId: "075901642", firstName: "Mathilde", lastName: "Lembrick", lab1: 75, lab2: 69, lab3: 29, exam: 70, attendance: 60 },
  { studentId: "104000702", firstName: "Lita", lastName: "McCroft", lab1: 19, lab2: 9, lab3: 13, exam: 53, attendance: 28 },
  { studentId: "226072375", firstName: "Terrijo", lastName: "Tersay", lab1: 8, lab2: 63, lab3: 7, exam: 96, attendance: 80 },
  { studentId: "253173661", firstName: "Janot", lastName: "Wittleton", lab1: 68, lab2: 4, lab3: 86, exam: 56, attendance: 41 },
  { studentId: "264271361", firstName: "Dalis", lastName: "Marrable", lab1: 68, lab2: 19, lab3: 26, exam: 28, attendance: 56 },
  { studentId: "075907497", firstName: "Elisabeth", lastName: "Girsch", lab1: 81, lab2: 62, lab3: 74, exam: 77, attendance: 95 },
  { studentId: "113104521", firstName: "Abe", lastName: "Bovingdon", lab1: 86, lab2: 100, lab3: 51, exam: 57, attendance: 73 },
  { studentId: "062000080", firstName: "Luca", lastName: "Spir", lab1: 71, lab2: 30, lab3: 74, exam: 44, attendance: 7 },
  { studentId: "322271096", firstName: "Colby", lastName: "Greatex", lab1: 73, lab2: 10, lab3: 74, exam: 78, attendance: 52 },
  { studentId: "071111986", firstName: "Bobine", lastName: "Parres", lab1: 12, lab2: 98, lab3: 49, exam: 88, attendance: 38 },
  { studentId: "103000800", firstName: "Aarika", lastName: "Sporrij", lab1: 92, lab2: 67, lab3: 67, exam: 76, attendance: 82 },
  { studentId: "091404369", firstName: "Ajay", lastName: "Marnes", lab1: 26, lab2: 19, lab3: 98, exam: 80, attendance: 81 },
  { studentId: "051404260", firstName: "Duane", lastName: "Novotni", lab1: 24, lab2: 50, lab3: 45, exam: 82, attendance: 88 },
  { studentId: "081501489", firstName: "Glennie", lastName: "Colquite", lab1: 61, lab2: 6, lab3: 41, exam: 10, attendance: 46 },
  { studentId: "063292499", firstName: "Nicol", lastName: "Dicks", lab1: 16, lab2: 48, lab3: 85, exam: 36, attendance: 82 },
  { studentId: "051409139", firstName: "Marsha", lastName: "McOmish", lab1: 35, lab2: 30, lab3: 42, exam: 80, attendance: 79 },
  { studentId: "061208126", firstName: "Harmonie", lastName: "Blose", lab1: 20, lab2: 10, lab3: 39, exam: 94, attendance: 48 },
  { studentId: "221471971", firstName: "Mari", lastName: "Stollman", lab1: 65, lab2: 45, lab3: 100, exam: 36, attendance: 72 },
  { studentId: "274070439", firstName: "Levy", lastName: "Roughey", lab1: 68, lab2: 5, lab3: 63, exam: 91, attendance: 50 },
  { studentId: "026015079", firstName: "Lenka", lastName: "Crake", lab1: 82, lab2: 97, lab3: 3, exam: 69, attendance: 53 },
  { studentId: "122105760", firstName: "Shelagh", lastName: "Liebrecht", lab1: 24, lab2: 9, lab3: 54, exam: 89, attendance: 81 },
  { studentId: "084202219", firstName: "Lilly", lastName: "Stading", lab1: 36, lab2: 80, lab3: 72, exam: 92, attendance: 1 },
  { studentId: "101000789", firstName: "Lise", lastName: "Grabbam", lab1: 6, lab2: 65, lab3: 38, exam: 14, attendance: 21 },
  { studentId: "103012869", firstName: "Laina", lastName: "Olenchikov", lab1: 73, lab2: 100, lab3: 60, exam: 4, attendance: 65 },
  { studentId: "082907888", firstName: "Gerek", lastName: "Marages", lab1: 74, lab2: 51, lab3: 94, exam: 4, attendance: 4 },
  { studentId: "063114700", firstName: "Cliff", lastName: "Starcks", lab1: 95, lab2: 17, lab3: 24, exam: 39, attendance: 20 },
  { studentId: "063115738", firstName: "Darla", lastName: "Pasek", lab1: 57, lab2: 2, lab3: 59, exam: 24, attendance: 29 },
  { studentId: "051404118", firstName: "Christopher", lastName: "Raynard", lab1: 8, lab2: 85, lab3: 83, exam: 98, attendance: 59 },
  { studentId: "063114946", firstName: "Georgina", lastName: "Eisenberg", lab1: 93, lab2: 32, lab3: 84, exam: 20, attendance: 26 },
  { studentId: "072406771", firstName: "Angelica", lastName: "Cresser", lab1: 62, lab2: 38, lab3: 42, exam: 57, attendance: 50 },
  { studentId: "053200446", firstName: "Constancia", lastName: "Messum", lab1: 68, lab2: 49, lab3: 68, exam: 48, attendance: 77 },
  { studentId: "111104853", firstName: "Laney", lastName: "Amphlett", lab1: 33, lab2: 31, lab3: 16, exam: 30, attendance: 20 },
  { studentId: "125102278", firstName: "Andras", lastName: "Szymaniak", lab1: 79, lab2: 21, lab3: 17, exam: 16, attendance: 95 },
  { studentId: "072402788", firstName: "Pen", lastName: "Gillino", lab1: 12, lab2: 44, lab3: 50, exam: 20, attendance: 82 },
  { studentId: "091800329", firstName: "Felipa", lastName: "Newlan", lab1: 17, lab2: 48, lab3: 33, exam: 62, attendance: 72 },
  { studentId: "021214875", firstName: "Ulrich", lastName: "Perri", lab1: 35, lab2: 30, lab3: 30, exam: 38, attendance: 28 },
  { studentId: "123206406", firstName: "Eduino", lastName: "Hawkswell", lab1: 64, lab2: 81, lab3: 91, exam: 3, attendance: 26 },
  { studentId: "122237751", firstName: "Belva", lastName: "Braemer", lab1: 60, lab2: 49, lab3: 81, exam: 84, attendance: 93 },
  { studentId: "082904483", firstName: "Cad", lastName: "Quest", lab1: 48, lab2: 4, lab3: 37, exam: 36, attendance: 39 },
  { studentId: "084303545", firstName: "Abagail", lastName: "Johnys", lab1: 51, lab2: 30, lab3: 52, exam: 94, attendance: 99 },
  { studentId: "062206732", firstName: "Esmaria", lastName: "Ashley", lab1: 69, lab2: 9, lab3: 29, exam: 70, attendance: 31 },
  { studentId: "061119477", firstName: "Antonia", lastName: "Clyne", lab1: 71, lab2: 14, lab3: 39, exam: 27, attendance: 14 },
  { studentId: "084202235", firstName: "Fidel", lastName: "Jurczak", lab1: 40, lab2: 21, lab3: 20, exam: 49, attendance: 59 },
  { studentId: "061019506", firstName: "Jennee", lastName: "Prewer", lab1: 45, lab2: 36, lab3: 50, exam: 75, attendance: 13 },
  { studentId: "041002711", firstName: "Edwin", lastName: "Flasby", lab1: 80, lab2: 69, lab3: 42, exam: 43, attendance: 22 },
  { studentId: "081000032", firstName: "Rafaelita", lastName: "Deeley", lab1: 39, lab2: 7, lab3: 84, exam: 96, attendance: 30 },
  { studentId: "084203043", firstName: "Gayler", lastName: "Link", lab1: 27, lab2: 32, lab3: 24, exam: 51, attendance: 78 },
  { studentId: "122243648", firstName: "Mylo", lastName: "Janeczek", lab1: 50, lab2: 8, lab3: 68, exam: 82, attendance: 8 },
  { studentId: "053100355", firstName: "Roseline", lastName: "Mainz", lab1: 67, lab2: 72, lab3: 69, exam: 63, attendance: 39 },
  { studentId: "061103920", firstName: "Mallorie", lastName: "Byars", lab1: 51, lab2: 91, lab3: 46, exam: 75, attendance: 73 },
  { studentId: "075010193", firstName: "Emmet", lastName: "Hannaford", lab1: 85, lab2: 82, lab3: 100, exam: 26, attendance: 6 },
  { studentId: "053102191", firstName: "Fenelia", lastName: "Gillson", lab1: 13, lab2: 80, lab3: 30, exam: 32, attendance: 7 },
  { studentId: "281073555", firstName: "Patric", lastName: "Spawell", lab1: 99, lab2: 58, lab3: 8, exam: 40, attendance: 34 },
  { studentId: "125105550", firstName: "Elberta", lastName: "Chafer", lab1: 70, lab2: 59, lab3: 66, exam: 13, attendance: 83 },
  { studentId: "244172082", firstName: "Van", lastName: "Venus", lab1: 3, lab2: 97, lab3: 3, exam: 99, attendance: 49 },
  { studentId: "251472636", firstName: "Chet", lastName: "De Zamudio", lab1: 98, lab2: 24, lab3: 27, exam: 1, attendance: 13 },
  { studentId: "121142517", firstName: "Kaylil", lastName: "Bleacher", lab1: 30, lab2: 95, lab3: 39, exam: 33, attendance: 12 },
  { studentId: "211870977", firstName: "Dixie", lastName: "Duerden", lab1: 10, lab2: 44, lab3: 76, exam: 86, attendance: 19 },
  { studentId: "091308795", firstName: "Lane", lastName: "Erlam", lab1: 56, lab2: 19, lab3: 61, exam: 83, attendance: 98 },
  { studentId: "253174851", firstName: "Simona", lastName: "Shapiro", lab1: 1, lab2: 77, lab3: 89, exam: 18, attendance: 83 },
  { studentId: "111915770", firstName: "Crissie", lastName: "Kirsopp", lab1: 3, lab2: 62, lab3: 27, exam: 48, attendance: 90 },
  { studentId: "071925169", firstName: "Sonnie", lastName: "Farquarson", lab1: 51, lab2: 45, lab3: 70, exam: 90, attendance: 76 },
  { studentId: "104901610", firstName: "Babita", lastName: "Riddel", lab1: 82, lab2: 61, lab3: 16, exam: 5, attendance: 97 },
  { studentId: "081914775", firstName: "Mavis", lastName: "Radki", lab1: 97, lab2: 75, lab3: 41, exam: 62, attendance: 52 },
  { studentId: "031306029", firstName: "Blair", lastName: "Mosey", lab1: 99, lab2: 23, lab3: 79, exam: 80, attendance: 63 },
  { studentId: "021207206", firstName: "Urson", lastName: "Caldwell", lab1: 33, lab2: 21, lab3: 79, exam: 92, attendance: 86 },
  { studentId: "123203218", firstName: "Hillier", lastName: "Garrow", lab1: 87, lab2: 87, lab3: 75, exam: 96, attendance: 62 },
  { studentId: "022000046", firstName: "Reilly", lastName: "Caddie", lab1: 4, lab2: 28, lab3: 76, exam: 22, attendance: 53 },
  { studentId: "084202060", firstName: "Emmie", lastName: "Ashman", lab1: 38, lab2: 41, lab3: 93, exam: 37, attendance: 36 },
  { studentId: "111904215", firstName: "Harold", lastName: "Klaus", lab1: 45, lab2: 65, lab3: 81, exam: 22, attendance: 25 },
  { studentId: "081908590", firstName: "Ertha", lastName: "Yurocjkin", lab1: 42, lab2: 59, lab3: 7, exam: 72, attendance: 1 },
  { studentId: "064101398", firstName: "Ethelyn", lastName: "Manhare", lab1: 48, lab2: 27, lab3: 14, exam: 20, attendance: 48 },
  { studentId: "111905340", firstName: "Enriqueta", lastName: "Mounter", lab1: 28, lab2: 55, lab3: 96, exam: 72, attendance: 20 },
  { studentId: "063114108", firstName: "Rodina", lastName: "Anslow", lab1: 1, lab2: 45, lab3: 62, exam: 36, attendance: 53 },
  { studentId: "072401789", firstName: "Dominga", lastName: "Possell", lab1: 22, lab2: 20, lab3: 22, exam: 42, attendance: 42 },
  { studentId: "072413599", firstName: "Sterne", lastName: "Houldcroft", lab1: 96, lab2: 27, lab3: 22, exam: 53, attendance: 21 },
  { studentId: "122200759", firstName: "Hymie", lastName: "Bossom", lab1: 22, lab2: 25, lab3: 59, exam: 5, attendance: 8 },
  { studentId: "075906951", firstName: "Chastity", lastName: "Rubra", lab1: 44, lab2: 7, lab3: 53, exam: 50, attendance: 14 },
  { studentId: "011375245", firstName: "Nikolaus", lastName: "Zecchini", lab1: 23, lab2: 11, lab3: 26, exam: 92, attendance: 70 },
  { studentId: "123206590", firstName: "Willey", lastName: "Baty", lab1: 58, lab2: 77, lab3: 89, exam: 13, attendance: 34 },
  { studentId: "065403477", firstName: "Delilah", lastName: "Calan", lab1: 24, lab2: 52, lab3: 83, exam: 72, attendance: 84 },
  { studentId: "082901101", firstName: "Hally", lastName: "McPherson", lab1: 88, lab2: 9, lab3: 40, exam: 28, attendance: 16 },
  { studentId: "103103749", firstName: "Rurik", lastName: "Napolitano", lab1: 36, lab2: 7, lab3: 18, exam: 88, attendance: 64 },
  { studentId: "111914849", firstName: "Etan", lastName: "Gigg", lab1: 5, lab2: 78, lab3: 35, exam: 44, attendance: 87 },
  { studentId: "101001351", firstName: "Tedman", lastName: "Wolver", lab1: 83, lab2: 59, lab3: 66, exam: 47, attendance: 21 },
  { studentId: "091302788", firstName: "Felecia", lastName: "Fayerman", lab1: 37, lab2: 26, lab3: 56, exam: 12, attendance: 3 },
  { studentId: "075902816", firstName: "Denni", lastName: "Griffin", lab1: 91, lab2: 46, lab3: 29, exam: 1, attendance: 98 },
  { studentId: "264279279", firstName: "Janek", lastName: "Gasker", lab1: 19, lab2: 23, lab3: 85, exam: 45, attendance: 55 },
  { studentId: "086518723", firstName: "Tammy", lastName: "Isakson", lab1: 97, lab2: 34, lab3: 79, exam: 41, attendance: 73 },
  { studentId: "074903337", firstName: "Nikolaos", lastName: "Yann", lab1: 2, lab2: 37, lab3: 82, exam: 60, attendance: 68 },
  { studentId: "072413654", firstName: "Ezra", lastName: "Sandry", lab1: 71, lab2: 33, lab3: 75, exam: 38, attendance: 98 },
  { studentId: "091206101", firstName: "Asher", lastName: "Carass", lab1: 17, lab2: 73, lab3: 18, exam: 19, attendance: 51 },
  { studentId: "125200044", firstName: "Lilias", lastName: "Skurm", lab1: 7, lab2: 4, lab3: 93, exam: 56, attendance: 68 },
  { studentId: "114909165", firstName: "Mignon", lastName: "Beeken", lab1: 14, lab2: 97, lab3: 71, exam: 73, attendance: 53 },
  { studentId: "125107008", firstName: "Ludovika", lastName: "Duerden", lab1: 71, lab2: 47, lab3: 12, exam: 37, attendance: 90 },
  { studentId: "111907827", firstName: "Gaston", lastName: "Gantley", lab1: 66, lab2: 90, lab3: 24, exam: 66, attendance: 69 },
  { studentId: "075900148", firstName: "Reilly", lastName: "Castel", lab1: 24, lab2: 76, lab3: 79, exam: 41, attendance: 42 },
  { studentId: "075907808", firstName: "Yancey", lastName: "Lergan", lab1: 74, lab2: 15, lab3: 37, exam: 4, attendance: 74 },
  { studentId: "122037841", firstName: "Addi", lastName: "Trundler", lab1: 56, lab2: 40, lab3: 11, exam: 63, attendance: 73 },
  { studentId: "111921777", firstName: "Torr", lastName: "Reynolds", lab1: 64, lab2: 31, lab3: 15, exam: 55, attendance: 38 },
  { studentId: "074905173", firstName: "Rick", lastName: "Pyson", lab1: 22, lab2: 47, lab3: 13, exam: 77, attendance: 37 },
  { studentId: "122240890", firstName: "Hedi", lastName: "Moakler", lab1: 31, lab2: 70, lab3: 2, exam: 52, attendance: 59 },
  { studentId: "107006143", firstName: "Gerrard", lastName: "Ferrari", lab1: 49, lab2: 70, lab3: 82, exam: 15, attendance: 93 },
  { studentId: "061103357", firstName: "Gratiana", lastName: "Nuschke", lab1: 85, lab2: 62, lab3: 87, exam: 8, attendance: 4 },
  { studentId: "031318596", firstName: "Margaret", lastName: "Ivic", lab1: 92, lab2: 10, lab3: 70, exam: 74, attendance: 96 },
  { studentId: "053202208", firstName: "Rickey", lastName: "Yakovliv", lab1: 10, lab2: 48, lab3: 44, exam: 59, attendance: 34 },
  { studentId: "075903763", firstName: "Claudius", lastName: "Downgate", lab1: 4, lab2: 41, lab3: 11, exam: 75, attendance: 18 },
  { studentId: "091212179", firstName: "Mira", lastName: "Bettesworth", lab1: 98, lab2: 23, lab3: 93, exam: 11, attendance: 94 },
  { studentId: "073915520", firstName: "Lemmie", lastName: "Honeyghan", lab1: 76, lab2: 11, lab3: 92, exam: 52, attendance: 6 },
  { studentId: "026005050", firstName: "Gasper", lastName: "Ioan", lab1: 27, lab2: 40, lab3: 59, exam: 91, attendance: 18 },
  { studentId: "071104715", firstName: "Roda", lastName: "Freen", lab1: 67, lab2: 64, lab3: 23, exam: 67, attendance: 65 },
  { studentId: "123203878", firstName: "Kirbie", lastName: "Banaszewski", lab1: 62, lab2: 78, lab3: 68, exam: 26, attendance: 24 },
  { studentId: "011302357", firstName: "Lu", lastName: "Arrandale", lab1: 63, lab2: 47, lab3: 63, exam: 80, attendance: 81 },
  { studentId: "043300712", firstName: "Eloise", lastName: "Mendonca", lab1: 4, lab2: 78, lab3: 65, exam: 14, attendance: 1 },
  { studentId: "022310422", firstName: "Dugald", lastName: "Flude", lab1: 73, lab2: 79, lab3: 77, exam: 11, attendance: 19 },
  { studentId: "051405450", firstName: "Jacky", lastName: "McCloughen", lab1: 5, lab2: 54, lab3: 92, exam: 88, attendance: 53 },
  { studentId: "053112631", firstName: "Alric", lastName: "Curedell", lab1: 61, lab2: 73, lab3: 41, exam: 52, attendance: 87 },
  { studentId: "122237955", firstName: "Brooke", lastName: "Bazell", lab1: 8, lab2: 10, lab3: 39, exam: 55, attendance: 50 },
  { studentId: "067005679", firstName: "Nils", lastName: "Deplacido", lab1: 92, lab2: 48, lab3: 2, exam: 11, attendance: 50 },
  { studentId: "061101032", firstName: "Raleigh", lastName: "Flukes", lab1: 40, lab2: 21, lab3: 91, exam: 36, attendance: 38 },
  { studentId: "011100892", firstName: "Abbye", lastName: "Keasley", lab1: 51, lab2: 81, lab3: 88, exam: 14, attendance: 38 },
  { studentId: "067015258", firstName: "Crin", lastName: "Lamzed", lab1: 11, lab2: 17, lab3: 37, exam: 48, attendance: 32 },
  { studentId: "113015995", firstName: "Carlie", lastName: "Trighton", lab1: 25, lab2: 84, lab3: 35, exam: 47, attendance: 57 },
  { studentId: "061206432", firstName: "Cyrill", lastName: "McAster", lab1: 80, lab2: 99, lab3: 51, exam: 8, attendance: 72 },
  { studentId: "111320006", firstName: "Lanae", lastName: "Van Halen", lab1: 46, lab2: 96, lab3: 73, exam: 70, attendance: 7 },
  { studentId: "074914407", firstName: "Yank", lastName: "Lezemere", lab1: 96, lab2: 96, lab3: 3, exam: 52, attendance: 92 },
  { studentId: "081514829", firstName: "Marybelle", lastName: "Currer", lab1: 74, lab2: 74, lab3: 40, exam: 11, attendance: 39 },
  { studentId: "101115098", firstName: "Jaye", lastName: "Jirsa", lab1: 39, lab2: 98, lab3: 20, exam: 74, attendance: 23 },
  { studentId: "107003612", firstName: "Katine", lastName: "Measen", lab1: 69, lab2: 43, lab3: 48, exam: 93, attendance: 87 },
  { studentId: "102004519", firstName: "Dorris", lastName: "Grogona", lab1: 27, lab2: 24, lab3: 96, exam: 4, attendance: 74 },
  { studentId: "211371638", firstName: "Wash", lastName: "Shellard", lab1: 98, lab2: 69, lab3: 23, exam: 50, attendance: 21 },
  { studentId: "254070019", firstName: "Duff", lastName: "Lintott", lab1: 95, lab2: 2, lab3: 23, exam: 16, attendance: 85 },
  { studentId: "071921697", firstName: "Cindy", lastName: "Jillitt", lab1: 100, lab2: 95, lab3: 100, exam: 82, attendance: 77 },
  { studentId: "065404913", firstName: "Glori", lastName: "Riha", lab1: 14, lab2: 14, lab3: 94, exam: 50, attendance: 72 },
  { studentId: "114922430", firstName: "Frannie", lastName: "Cressor", lab1: 48, lab2: 64, lab3: 58, exam: 40, attendance: 91 },
  { studentId: "122242607", firstName: "Jolee", lastName: "Lathom", lab1: 5, lab2: 75, lab3: 61, exam: 38, attendance: 8 },
  { studentId: "091407133", firstName: "Ruy", lastName: "Mattheissen", lab1: 91, lab2: 92, lab3: 78, exam: 47, attendance: 46 },
  { studentId: "104903362", firstName: "Blinny", lastName: "Deignan", lab1: 23, lab2: 89, lab3: 72, exam: 100, attendance: 51 },
  { studentId: "103013211", firstName: "Claire", lastName: "Lofthouse", lab1: 43, lab2: 87, lab3: 46, exam: 25, attendance: 80 },
  { studentId: "084205559", firstName: "Bernardo", lastName: "Kernes", lab1: 82, lab2: 52, lab3: 6, exam: 91, attendance: 17 },
  { studentId: "091216696", firstName: "Oriana", lastName: "Kalinovich", lab1: 2, lab2: 64, lab3: 95, exam: 25, attendance: 80 },
  { studentId: "011104322", firstName: "Moses", lastName: "Buer", lab1: 91, lab2: 88, lab3: 82, exam: 38, attendance: 42 },
  { studentId: "072401064", firstName: "Valery", lastName: "Lester", lab1: 12, lab2: 73, lab3: 94, exam: 22, attendance: 27 },
  { studentId: "125102278", firstName: "Durant", lastName: "Cahalan", lab1: 64, lab2: 28, lab3: 4, exam: 58, attendance: 71 },
  { studentId: "123206846", firstName: "Ahmad", lastName: "Luetchford", lab1: 38, lab2: 4, lab3: 97, exam: 45, attendance: 95 },
  { studentId: "072413751", firstName: "Sergio", lastName: "Oosthout de Vree", lab1: 52, lab2: 42, lab3: 29, exam: 78, attendance: 93 },
  { studentId: "322280485", firstName: "Alli", lastName: "Wintersgill", lab1: 100, lab2: 2, lab3: 97, exam: 31, attendance: 80 },
  { studentId: "031313562", firstName: "Flint", lastName: "Brimacombe", lab1: 83, lab2: 7, lab3: 40, exam: 56, attendance: 22 },
  { studentId: "101105257", firstName: "Curt", lastName: "Curbishley", lab1: 92, lab2: 46, lab3: 65, exam: 3, attendance: 83 },
  { studentId: "011000138", firstName: "Petey", lastName: "Lorey", lab1: 79, lab2: 62, lab3: 55, exam: 67, attendance: 1 },
  { studentId: "271071402", firstName: "Jamill", lastName: "Dunan", lab1: 50, lab2: 60, lab3: 89, exam: 25, attendance: 6 },
  { studentId: "065403150", firstName: "Mitchael", lastName: "Cuskery", lab1: 51, lab2: 85, lab3: 83, exam: 39, attendance: 54 },
  { studentId: "111908509", firstName: "Andeee", lastName: "Ascroft", lab1: 26, lab2: 57, lab3: 41, exam: 70, attendance: 78 },
  { studentId: "064201560", firstName: "Darby", lastName: "Dantesia", lab1: 43, lab2: 100, lab3: 4, exam: 9, attendance: 91 },
  { studentId: "114922265", firstName: "Nicolea", lastName: "Skains", lab1: 76, lab2: 65, lab3: 98, exam: 37, attendance: 95 },
  { studentId: "242070791", firstName: "Wilburt", lastName: "Muffen", lab1: 62, lab2: 23, lab3: 64, exam: 70, attendance: 32 },
  { studentId: "083912393", firstName: "Harland", lastName: "Knowlden", lab1: 51, lab2: 53, lab3: 92, exam: 16, attendance: 22 },
  { studentId: "061300367", firstName: "Maurine", lastName: "Flagg", lab1: 86, lab2: 42, lab3: 83, exam: 57, attendance: 18 },
  { studentId: "041201703", firstName: "Manya", lastName: "Schofield", lab1: 93, lab2: 46, lab3: 27, exam: 91, attendance: 6 },
  { studentId: "075901480", firstName: "Rosalyn", lastName: "McIlrath", lab1: 69, lab2: 4, lab3: 7, exam: 42, attendance: 32 },
  { studentId: "021201639", firstName: "Cari", lastName: "Cockburn", lab1: 23, lab2: 65, lab3: 5, exam: 77, attendance: 73 },
  { studentId: "067016105", firstName: "Adrien", lastName: "Head", lab1: 96, lab2: 69, lab3: 31, exam: 59, attendance: 80 },
  { studentId: "064107729", firstName: "Ada", lastName: "Dericut", lab1: 19, lab2: 50, lab3: 91, exam: 26, attendance: 99 },
  { studentId: "211672531", firstName: "Cassie", lastName: "Pickburn", lab1: 43, lab2: 52, lab3: 27, exam: 21, attendance: 4 },
  { studentId: "322280485", firstName: "Janeva", lastName: "Dicky", lab1: 65, lab2: 77, lab3: 84, exam: 30, attendance: 20 },
  { studentId: "011601074", firstName: "Christian", lastName: "Grog", lab1: 64, lab2: 55, lab3: 5, exam: 67, attendance: 10 },
  { studentId: "065302701", firstName: "Martelle", lastName: "Shekle", lab1: 40, lab2: 46, lab3: 23, exam: 67, attendance: 90 },
  { studentId: "071119865", firstName: "Sharon", lastName: "Cheshir", lab1: 18, lab2: 65, lab3: 71, exam: 64, attendance: 62 },
  { studentId: "072413832", firstName: "Rosamund", lastName: "Poznan", lab1: 50, lab2: 53, lab3: 96, exam: 36, attendance: 11 },
  { studentId: "065200515", firstName: "Griswold", lastName: "Capnerhurst", lab1: 59, lab2: 8, lab3: 52, exam: 56, attendance: 91 },
  { studentId: "063105544", firstName: "Nicolai", lastName: "Dyter", lab1: 33, lab2: 7, lab3: 82, exam: 62, attendance: 94 },
  { studentId: "082904043", firstName: "Sherwin", lastName: "Durkin", lab1: 36, lab2: 18, lab3: 30, exam: 81, attendance: 67 },
  { studentId: "102000937", firstName: "Wang", lastName: "Hrishanok", lab1: 99, lab2: 11, lab3: 82, exam: 100, attendance: 40 },
  { studentId: "021207413", firstName: "Leone", lastName: "Mazzei", lab1: 16, lab2: 7, lab3: 32, exam: 88, attendance: 33 },
  { studentId: "075909660", firstName: "Theresa", lastName: "Saben", lab1: 10, lab2: 17, lab3: 37, exam: 47, attendance: 61 },
  { studentId: "042104249", firstName: "Roxie", lastName: "Harmar", lab1: 71, lab2: 18, lab3: 50, exam: 98, attendance: 42 },
  { studentId: "211272504", firstName: "Filberto", lastName: "Finlason", lab1: 30, lab2: 69, lab3: 78, exam: 94, attendance: 70 },
  { studentId: "061113279", firstName: "Davis", lastName: "Walesby", lab1: 61, lab2: 22, lab3: 8, exam: 32, attendance: 19 },
  { studentId: "103912956", firstName: "Torin", lastName: "Petrina", lab1: 58, lab2: 62, lab3: 68, exam: 41, attendance: 82 },
  { studentId: "102005916", firstName: "Taryn", lastName: "Kirton", lab1: 55, lab2: 47, lab3: 54, exam: 2, attendance: 93 },
  { studentId: "122187212", firstName: "Sibel", lastName: "Bufton", lab1: 50, lab2: 13, lab3: 33, exam: 6, attendance: 52 },
  { studentId: "071925224", firstName: "Anjela", lastName: "Exelby", lab1: 21, lab2: 82, lab3: 31, exam: 31, attendance: 53 },
  { studentId: "021407912", firstName: "Marita", lastName: "Purvess", lab1: 44, lab2: 87, lab3: 17, exam: 13, attendance: 84 },
  { studentId: "274970791", firstName: "Sybyl", lastName: "Loud", lab1: 52, lab2: 28, lab3: 64, exam: 78, attendance: 1 },
  { studentId: "021407912", firstName: "Buffy", lastName: "Suttaby", lab1: 98, lab2: 88, lab3: 79, exam: 80, attendance: 31 },
  { studentId: "052173464", firstName: "Alissa", lastName: "Troke", lab1: 87, lab2: 83, lab3: 89, exam: 100, attendance: 46 },
  { studentId: "073907758", firstName: "Goldie", lastName: "Tattersfield", lab1: 1, lab2: 56, lab3: 61, exam: 20, attendance: 75 },
  { studentId: "113125380", firstName: "Brannon", lastName: "Gilphillan", lab1: 92, lab2: 18, lab3: 24, exam: 98, attendance: 31 },
  { studentId: "121142834", firstName: "Paul", lastName: "Budik", lab1: 3, lab2: 82, lab3: 99, exam: 96, attendance: 88 },
  { studentId: "071117760", firstName: "Sherwood", lastName: "Barnwell", lab1: 70, lab2: 17, lab3: 77, exam: 2, attendance: 66 },
  { studentId: "122239843", firstName: "Fee", lastName: "Shorten", lab1: 48, lab2: 93, lab3: 58, exam: 58, attendance: 55 },
  { studentId: "281073568", firstName: "Dwayne", lastName: "Futter", lab1: 85, lab2: 33, lab3: 18, exam: 65, attendance: 25 },
  { studentId: "073920557", firstName: "Bertie", lastName: "Skillman", lab1: 25, lab2: 73, lab3: 86, exam: 35, attendance: 14 },
  { studentId: "111917590", firstName: "Gale", lastName: "Arbuckle", lab1: 89, lab2: 82, lab3: 80, exam: 38, attendance: 54 },
  { studentId: "051403164", firstName: "Arvie", lastName: "Wiggans", lab1: 70, lab2: 76, lab3: 10, exam: 54, attendance: 71 },
  { studentId: "061000052", firstName: "Alden", lastName: "Loynes", lab1: 1, lab2: 17, lab3: 12, exam: 7, attendance: 75 },
  { studentId: "011401533", firstName: "Rancell", lastName: "Boyd", lab1: 4, lab2: 68, lab3: 64, exam: 83, attendance: 71 },
  { studentId: "081001714", firstName: "Marcelo", lastName: "Salan", lab1: 25, lab2: 69, lab3: 88, exam: 89, attendance: 69 },
  { studentId: "021906471", firstName: "Bebe", lastName: "Le Fevre", lab1: 26, lab2: 100, lab3: 10, exam: 9, attendance: 68 },
  { studentId: "031315382", firstName: "Haze", lastName: "Gingell", lab1: 66, lab2: 94, lab3: 89, exam: 98, attendance: 16 },
  { studentId: "113109720", firstName: "Netty", lastName: "Davers", lab1: 59, lab2: 90, lab3: 90, exam: 75, attendance: 19 },
  { studentId: "101113812", firstName: "Rosalie", lastName: "Wankling", lab1: 79, lab2: 38, lab3: 89, exam: 39, attendance: 45 },
  { studentId: "122087590", firstName: "Paloma", lastName: "Iannuzzelli", lab1: 2, lab2: 78, lab3: 27, exam: 26, attendance: 31 },
  { studentId: "071905985", firstName: "Almira", lastName: "McGougan", lab1: 71, lab2: 90, lab3: 100, exam: 55, attendance: 18 },
  { studentId: "091101455", firstName: "Thorndike", lastName: "Grosvenor", lab1: 9, lab2: 89, lab3: 87, exam: 20, attendance: 48 },
  { studentId: "113116292", firstName: "Frederick", lastName: "Djuricic", lab1: 12, lab2: 51, lab3: 30, exam: 44, attendance: 17 },
  { studentId: "063115372", firstName: "Clarine", lastName: "Housin", lab1: 35, lab2: 18, lab3: 54, exam: 53, attendance: 30 },
  { studentId: "101015020", firstName: "Truda", lastName: "Coaker", lab1: 21, lab2: 51, lab3: 89, exam: 33, attendance: 55 },
  { studentId: "104902392", firstName: "Dale", lastName: "Pettiford", lab1: 61, lab2: 88, lab3: 73, exam: 29, attendance: 96 },
  { studentId: "122242034", firstName: "Lorenza", lastName: "Mila", lab1: 14, lab2: 89, lab3: 60, exam: 100, attendance: 74 },
  { studentId: "063115631", firstName: "Courtnay", lastName: "Willerson", lab1: 5, lab2: 49, lab3: 28, exam: 20, attendance: 64 },
  { studentId: "124002942", firstName: "Jasun", lastName: "Whotton", lab1: 91, lab2: 6, lab3: 13, exam: 43, attendance: 99 },
  { studentId: "081519510", firstName: "Stacey", lastName: "Falcus", lab1: 56, lab2: 91, lab3: 40, exam: 76, attendance: 27 },
  { studentId: "031205955", firstName: "Tedman", lastName: "Mounsey", lab1: 84, lab2: 86, lab3: 95, exam: 79, attendance: 25 },
  { studentId: "071106250", firstName: "Avie", lastName: "Bowart", lab1: 12, lab2: 47, lab3: 19, exam: 7, attendance: 32 },
  { studentId: "103112507", firstName: "Tybi", lastName: "Carayol", lab1: 39, lab2: 20, lab3: 39, exam: 91, attendance: 2 },
  { studentId: "071107220", firstName: "Letisha", lastName: "Follitt", lab1: 78, lab2: 52, lab3: 34, exam: 41, attendance: 100 },
  { studentId: "082901101", firstName: "Jephthah", lastName: "Brereton", lab1: 51, lab2: 88, lab3: 10, exam: 57, attendance: 66 },
  { studentId: "211384162", firstName: "Dita", lastName: "Bover", lab1: 7, lab2: 2, lab3: 72, exam: 23, attendance: 86 },
  { studentId: "121141042", firstName: "Yulma", lastName: "Sumers", lab1: 96, lab2: 37, lab3: 55, exam: 48, attendance: 49 },
  { studentId: "081510739", firstName: "Rawley", lastName: "Clappison", lab1: 33, lab2: 60, lab3: 54, exam: 90, attendance: 17 },
  { studentId: "114921842", firstName: "Mimi", lastName: "Etherington", lab1: 5, lab2: 4, lab3: 22, exam: 65, attendance: 48 },
  { studentId: "107000275", firstName: "Arel", lastName: "MacDiarmond", lab1: 3, lab2: 51, lab3: 39, exam: 98, attendance: 8 },
  { studentId: "081019104", firstName: "Orren", lastName: "Mortimer", lab1: 28, lab2: 66, lab3: 79, exam: 54, attendance: 86 },
  { studentId: "052100893", firstName: "Marylee", lastName: "Hyndley", lab1: 91, lab2: 97, lab3: 39, exam: 60, attendance: 44 },
  { studentId: "065301566", firstName: "Pierson", lastName: "Aitkenhead", lab1: 62, lab2: 83, lab3: 82, exam: 19, attendance: 47 },
  { studentId: "051404118", firstName: "Darla", lastName: "Praundl", lab1: 59, lab2: 22, lab3: 83, exam: 61, attendance: 74 },
  { studentId: "044000037", firstName: "Fonzie", lastName: "Doumerque", lab1: 71, lab2: 82, lab3: 9, exam: 13, attendance: 84 },
  { studentId: "053112343", firstName: "Bryn", lastName: "Quick", lab1: 16, lab2: 92, lab3: 51, exam: 17, attendance: 58 },
  { studentId: "071117760", firstName: "Elwira", lastName: "Cyples", lab1: 68, lab2: 98, lab3: 44, exam: 29, attendance: 2 },
  { studentId: "071108669", firstName: "Sarah", lastName: "Goretti", lab1: 73, lab2: 30, lab3: 1, exam: 57, attendance: 26 },
  { studentId: "122239937", firstName: "El", lastName: "Tomasz", lab1: 40, lab2: 22, lab3: 83, exam: 21, attendance: 77 },
  { studentId: "081912379", firstName: "Ingunna", lastName: "Royal", lab1: 87, lab2: 92, lab3: 1, exam: 10, attendance: 47 },
  { studentId: "104913048", firstName: "Julius", lastName: "Olivia", lab1: 53, lab2: 48, lab3: 38, exam: 89, attendance: 18 },
  { studentId: "064207771", firstName: "Burk", lastName: "Lengthorn", lab1: 48, lab2: 27, lab3: 65, exam: 85, attendance: 82 },
  { studentId: "075912165", firstName: "Claudell", lastName: "Stallibrass", lab1: 40, lab2: 18, lab3: 75, exam: 83, attendance: 82 },
  { studentId: "065405255", firstName: "Isabel", lastName: "Pickring", lab1: 48, lab2: 17, lab3: 48, exam: 51, attendance: 4 },
  { studentId: "073914411", firstName: "Simone", lastName: "Hallihan", lab1: 47, lab2: 87, lab3: 63, exam: 7, attendance: 55 },
  { studentId: "062202749", firstName: "Cullen", lastName: "Blampey", lab1: 71, lab2: 52, lab3: 66, exam: 96, attendance: 49 },
  { studentId: "091915311", firstName: "Felice", lastName: "Custed", lab1: 46, lab2: 41, lab3: 43, exam: 54, attendance: 31 },
  { studentId: "111323689", firstName: "Janet", lastName: "Bruckstein", lab1: 70, lab2: 71, lab3: 41, exam: 16, attendance: 16 },
  { studentId: "061112843", firstName: "Leonardo", lastName: "Gilhool", lab1: 12, lab2: 70, lab3: 53, exam: 38, attendance: 40 },
  { studentId: "111303117", firstName: "Fair", lastName: "Joder", lab1: 46, lab2: 44, lab3: 96, exam: 20, attendance: 69 },
  { studentId: "072407123", firstName: "Joela", lastName: "Dytham", lab1: 53, lab2: 18, lab3: 78, exam: 86, attendance: 24 },
  { studentId: "113008766", firstName: "Naoma", lastName: "Klehyn", lab1: 79, lab2: 47, lab3: 56, exam: 34, attendance: 100 },
  { studentId: "313072819", firstName: "Gard", lastName: "Cardenoza", lab1: 97, lab2: 51, lab3: 86, exam: 5, attendance: 15 },
  { studentId: "271973924", firstName: "Anetta", lastName: "Gaskin", lab1: 74, lab2: 29, lab3: 79, exam: 78, attendance: 32 },
  { studentId: "062201724", firstName: "Tremayne", lastName: "Santello", lab1: 32, lab2: 16, lab3: 98, exam: 4, attendance: 50 },
  { studentId: "071921532", firstName: "Josias", lastName: "Boyd", lab1: 52, lab2: 1, lab3: 78, exam: 27, attendance: 33 },
  { studentId: "123103868", firstName: "Estrella", lastName: "Gummary", lab1: 86, lab2: 70, lab3: 41, exam: 38, attendance: 91 },
  { studentId: "065201116", firstName: "Al", lastName: "Chaperlin", lab1: 43, lab2: 89, lab3: 13, exam: 9, attendance: 80 },
  { studentId: "071109891", firstName: "Ewen", lastName: "Bitcheno", lab1: 73, lab2: 52, lab3: 9, exam: 79, attendance: 53 },
  { studentId: "111103210", firstName: "Darsey", lastName: "Waylett", lab1: 84, lab2: 48, lab3: 78, exam: 32, attendance: 74 },
  { studentId: "063292538", firstName: "Ania", lastName: "Will", lab1: 7, lab2: 1, lab3: 20, exam: 90, attendance: 44 },
  { studentId: "053200983", firstName: "Penny", lastName: "Rookledge", lab1: 44, lab2: 26, lab3: 85, exam: 59, attendance: 37 },
  { studentId: "074000065", firstName: "Camila", lastName: "Stayt", lab1: 86, lab2: 35, lab3: 38, exam: 94, attendance: 13 },
  { studentId: "026013958", firstName: "Reece", lastName: "Knewstubb", lab1: 91, lab2: 99, lab3: 71, exam: 47, attendance: 95 },
  { studentId: "121142779", firstName: "Spenser", lastName: "McMichan", lab1: 60, lab2: 8, lab3: 64, exam: 100, attendance: 6 },
  { studentId: "267090536", firstName: "Jo ann", lastName: "Cund", lab1: 36, lab2: 59, lab3: 52, exam: 100, attendance: 9 },
  { studentId: "255070351", firstName: "Constantin", lastName: "Henningham", lab1: 37, lab2: 71, lab3: 6, exam: 48, attendance: 86 },
  { studentId: "111901467", firstName: "Giorgio", lastName: "Maulden", lab1: 52, lab2: 27, lab3: 91, exam: 67, attendance: 57 },
  { studentId: "084008358", firstName: "Lindsey", lastName: "Geraldini", lab1: 34, lab2: 67, lab3: 53, exam: 65, attendance: 34 },
  { studentId: "091800329", firstName: "Virgie", lastName: "Rivett", lab1: 7, lab2: 59, lab3: 22, exam: 86, attendance: 18 },
  { studentId: "062000116", firstName: "Anna-diane", lastName: "Ollington", lab1: 92, lab2: 19, lab3: 32, exam: 65, attendance: 69 },
  { studentId: "051401836", firstName: "Jeremy", lastName: "Margett", lab1: 3, lab2: 53, lab3: 64, exam: 50, attendance: 79 },
  { studentId: "053208053", firstName: "Jorey", lastName: "Yakovlev", lab1: 88, lab2: 20, lab3: 2, exam: 25, attendance: 94 },
  { studentId: "243373206", firstName: "Gus", lastName: "Lipsett", lab1: 65, lab2: 77, lab3: 51, exam: 46, attendance: 40 },
  { studentId: "107089555", firstName: "Shandeigh", lastName: "Siemantel", lab1: 24, lab2: 71, lab3: 76, exam: 78, attendance: 98 },
  { studentId: "104000058", firstName: "Tedd", lastName: "Tidbald", lab1: 43, lab2: 2, lab3: 97, exam: 63, attendance: 9 },
  { studentId: "101100223", firstName: "Eugenio", lastName: "Fife", lab1: 80, lab2: 80, lab3: 53, exam: 7, attendance: 22 },
  { studentId: "271970066", firstName: "Debbie", lastName: "Charrisson", lab1: 9, lab2: 97, lab3: 49, exam: 94, attendance: 41 },
  { studentId: "071002134", firstName: "Bryanty", lastName: "Miettinen", lab1: 34, lab2: 37, lab3: 90, exam: 96, attendance: 72 },
  { studentId: "271974295", firstName: "Kaela", lastName: "Yetts", lab1: 50, lab2: 34, lab3: 45, exam: 48, attendance: 10 },
  { studentId: "062201779", firstName: "Bendite", lastName: "Matlock", lab1: 60, lab2: 30, lab3: 30, exam: 53, attendance: 99 },
  { studentId: "111319004", firstName: "Tamar", lastName: "Sandiford", lab1: 19, lab2: 52, lab3: 89, exam: 98, attendance: 45 },
  { studentId: "314072986", firstName: "Fran", lastName: "Winham", lab1: 36, lab2: 80, lab3: 55, exam: 64, attendance: 59 },
  { studentId: "265371053", firstName: "Carmine", lastName: "Bride", lab1: 47, lab2: 96, lab3: 23, exam: 74, attendance: 9 },
  { studentId: "226070270", firstName: "Friederike", lastName: "Bulley", lab1: 17, lab2: 65, lab3: 16, exam: 93, attendance: 88 },
  { studentId: "124100080", firstName: "Ches", lastName: "Colson", lab1: 58, lab2: 12, lab3: 26, exam: 66, attendance: 86 },
  { studentId: "042107424", firstName: "Broddy", lastName: "Garahan", lab1: 100, lab2: 19, lab3: 9, exam: 82, attendance: 89 },
  { studentId: "081519303", firstName: "Leonerd", lastName: "Hegge", lab1: 50, lab2: 18, lab3: 37, exam: 37, attendance: 7 },
  { studentId: "113104880", firstName: "Ric", lastName: "Odgers", lab1: 44, lab2: 10, lab3: 93, exam: 53, attendance: 46 },
  { studentId: "071905613", firstName: "Izabel", lastName: "Sisneros", lab1: 93, lab2: 53, lab3: 66, exam: 44, attendance: 94 },
  { studentId: "067005679", firstName: "Laurie", lastName: "Coull", lab1: 59, lab2: 44, lab3: 96, exam: 100, attendance: 47 },
  { studentId: "111909443", firstName: "Brad", lastName: "Horsfield", lab1: 7, lab2: 41, lab3: 91, exam: 81, attendance: 54 },
  { studentId: "056005318", firstName: "Erika", lastName: "Kenneway", lab1: 1, lab2: 77, lab3: 38, exam: 51, attendance: 72 },
  { studentId: "061104518", firstName: "Ollie", lastName: "Heynel", lab1: 73, lab2: 10, lab3: 46, exam: 6, attendance: 82 },
  { studentId: "272471551", firstName: "Peyton", lastName: "Brunn", lab1: 39, lab2: 76, lab3: 22, exam: 22, attendance: 50 },
  { studentId: "053100258", firstName: "Irena", lastName: "Vigar", lab1: 31, lab2: 36, lab3: 17, exam: 10, attendance: 54 },
  { studentId: "061119781", firstName: "Vanessa", lastName: "Irons", lab1: 11, lab2: 1, lab3: 80, exam: 78, attendance: 80 },
  { studentId: "011110688", firstName: "Luigi", lastName: "Danson", lab1: 8, lab2: 55, lab3: 9, exam: 26, attendance: 35 },
  { studentId: "121141107", firstName: "Lissi", lastName: "Balle", lab1: 72, lab2: 63, lab3: 13, exam: 24, attendance: 88 },
  { studentId: "103102229", firstName: "Udell", lastName: "Ewenson", lab1: 46, lab2: 42, lab3: 62, exam: 56, attendance: 82 },
  { studentId: "053100494", firstName: "Sly", lastName: "McGinn", lab1: 55, lab2: 12, lab3: 98, exam: 47, attendance: 39 },
  { studentId: "101001005", firstName: "Edgar", lastName: "Petric", lab1: 73, lab2: 8, lab3: 58, exam: 70, attendance: 95 },
  { studentId: "051400361", firstName: "Baily", lastName: "Straniero", lab1: 41, lab2: 23, lab3: 36, exam: 87, attendance: 39 },
  { studentId: "103100739", firstName: "Laural", lastName: "Conner", lab1: 27, lab2: 19, lab3: 92, exam: 82, attendance: 47 },
  { studentId: "271070788", firstName: "Peirce", lastName: "Belsey", lab1: 18, lab2: 95, lab3: 43, exam: 50, attendance: 58 },
  { studentId: "042174509", firstName: "Janos", lastName: "Bim", lab1: 20, lab2: 94, lab3: 63, exam: 30, attendance: 91 },
  { studentId: "101114303", firstName: "Iain", lastName: "Albers", lab1: 57, lab2: 83, lab3: 7, exam: 82, attendance: 59 },
  { studentId: "021502354", firstName: "Lorita", lastName: "Joplin", lab1: 20, lab2: 56, lab3: 54, exam: 54, attendance: 93 },
  { studentId: "072404142", firstName: "Elmo", lastName: "Cabrera", lab1: 68, lab2: 77, lab3: 78, exam: 54, attendance: 24 },
  { studentId: "072413609", firstName: "Dale", lastName: "Gitsham", lab1: 87, lab2: 6, lab3: 8, exam: 60, attendance: 98 },
  { studentId: "322280870", firstName: "Karyl", lastName: "Esche", lab1: 95, lab2: 93, lab3: 25, exam: 100, attendance: 62 },
  { studentId: "053100258", firstName: "Decca", lastName: "Dreng", lab1: 41, lab2: 82, lab3: 92, exam: 57, attendance: 62 },
  { studentId: "041213814", firstName: "Blithe", lastName: "Rutherforth", lab1: 31, lab2: 96, lab3: 19, exam: 30, attendance: 24 },
  { studentId: "021401617", firstName: "Morgen", lastName: "Christoffersen", lab1: 77, lab2: 88, lab3: 25, exam: 82, attendance: 48 },
  { studentId: "263190812", firstName: "Aldous", lastName: "Cecchetelli", lab1: 5, lab2: 13, lab3: 89, exam: 17, attendance: 9 },
  { studentId: "072410013", firstName: "Ashlen", lastName: "McEneny", lab1: 84, lab2: 47, lab3: 20, exam: 65, attendance: 85 },
  { studentId: "051400549", firstName: "Alano", lastName: "Wall", lab1: 53, lab2: 7, lab3: 28, exam: 21, attendance: 41 },
  { studentId: "121144201", firstName: "Ricki", lastName: "Tapenden", lab1: 68, lab2: 73, lab3: 43, exam: 65, attendance: 45 },
  { studentId: "091916093", firstName: "Sasha", lastName: "Rappoport", lab1: 10, lab2: 76, lab3: 37, exam: 28, attendance: 99 },
  { studentId: "065401000", firstName: "Tera", lastName: "Kleinhaus", lab1: 45, lab2: 35, lab3: 81, exam: 66, attendance: 50 },
  { studentId: "114902793", firstName: "Wren", lastName: "Nock", lab1: 69, lab2: 93, lab3: 43, exam: 6, attendance: 95 },
  { studentId: "041202922", firstName: "Dario", lastName: "Labrone", lab1: 60, lab2: 5, lab3: 36, exam: 66, attendance: 14 },
  { studentId: "111904998", firstName: "Phillipp", lastName: "Badam", lab1: 39, lab2: 52, lab3: 12, exam: 16, attendance: 42 },
  { studentId: "074903890", firstName: "Karleen", lastName: "MacIlhagga", lab1: 84, lab2: 73, lab3: 94, exam: 46, attendance: 18 },
  { studentId: "056073502", firstName: "Felike", lastName: "Pohlak", lab1: 35, lab2: 67, lab3: 20, exam: 4, attendance: 87 },
  { studentId: "121142148", firstName: "Betti", lastName: "Rowbottam", lab1: 33, lab2: 16, lab3: 57, exam: 68, attendance: 1 },
  { studentId: "111925045", firstName: "Henryetta", lastName: "McAuslan", lab1: 42, lab2: 89, lab3: 49, exam: 85, attendance: 58 },
  { studentId: "281073555", firstName: "Corie", lastName: "Luther", lab1: 44, lab2: 51, lab3: 75, exam: 97, attendance: 15 },
  { studentId: "062101219", firstName: "Jacquelynn", lastName: "Skeen", lab1: 79, lab2: 52, lab3: 54, exam: 100, attendance: 95 },
  { studentId: "271992219", firstName: "Danita", lastName: "Cousen", lab1: 71, lab2: 10, lab3: 37, exam: 86, attendance: 14 },
  { studentId: "062200783", firstName: "Eachelle", lastName: "Blaschke", lab1: 98, lab2: 34, lab3: 77, exam: 82, attendance: 18 },
  { studentId: "111901690", firstName: "Nilson", lastName: "Owbridge", lab1: 92, lab2: 36, lab3: 61, exam: 17, attendance: 21 },
  { studentId: "281073568", firstName: "Giana", lastName: "Hyatt", lab1: 65, lab2: 40, lab3: 24, exam: 96, attendance: 54 },
  { studentId: "081908590", firstName: "Myranda", lastName: "Lathy", lab1: 28, lab2: 28, lab3: 97, exam: 15, attendance: 35 },
  { studentId: "125108191", firstName: "Joli", lastName: "Do", lab1: 33, lab2: 70, lab3: 95, exam: 14, attendance: 99 },
  { studentId: "021200339", firstName: "Abey", lastName: "Bairstow", lab1: 53, lab2: 13, lab3: 4, exam: 71, attendance: 61 },
  { studentId: "107002503", firstName: "Norbie", lastName: "Kingsnorth", lab1: 27, lab2: 78, lab3: 39, exam: 86, attendance: 76 },
  { studentId: "243373222", firstName: "Steve", lastName: "Guinery", lab1: 64, lab2: 37, lab3: 79, exam: 89, attendance: 8 },
  { studentId: "111913756", firstName: "Willow", lastName: "Darter", lab1: 95, lab2: 81, lab3: 16, exam: 21, attendance: 30 },
  { studentId: "091200592", firstName: "Rosita", lastName: "Klimuk", lab1: 61, lab2: 33, lab3: 74, exam: 30, attendance: 39 },
  { studentId: "113024562", firstName: "Lorrin", lastName: "Ravilious", lab1: 35, lab2: 22, lab3: 32, exam: 21, attendance: 20 },
  { studentId: "111303117", firstName: "Sheffy", lastName: "Eldred", lab1: 33, lab2: 17, lab3: 7, exam: 58, attendance: 30 },
  { studentId: "082901460", firstName: "Merrielle", lastName: "Rush", lab1: 39, lab2: 89, lab3: 81, exam: 79, attendance: 100 } ];

// Initialize students from the embedded mock data (prefers external mockData if present)
function loadMockData() {
    if (typeof mockData !== 'undefined' && Array.isArray(mockData) && mockData.length > 0) {
        students = [...mockData];
    } else if (typeof partialMockData !== 'undefined' && Array.isArray(partialMockData)) {
        students = [...partialMockData];
    } else {
        students = [];
    }

    renderTable();
    updateRecordCount();
}

// Initialize the page
function init() {
    // Load all mock data from CSV
    loadMockData();
}

// Render the table
function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    const list = filteredStudents || students;

    list.forEach((student, idx) => {
        const index = students.indexOf(student); // map back to main array index
        const row = document.createElement('tr');
        row.setAttribute('data-index', index);
        row.onclick = function() { selectRow(index); };
        
        row.innerHTML = `
            <td>${student.studentId}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.lab1}</td>
            <td>${student.lab2}</td>
            <td>${student.lab3}</td>
            <td>${student.exam}</td>
            <td>${student.attendance}</td>
            <td>
                <button class="btn-edit" onclick="event.stopPropagation(); openEditModal(${index})">✏️ Edit</button>
            </td>
        `;
        
        // Highlight selected row
        if (index === selectedRowIndex) {
            row.classList.add('selected');
        }
        
        tableBody.appendChild(row);
    });
}

// Select a row
function selectRow(index) {
    selectedRowIndex = index;
    renderTable();
}

// Open edit modal
function openEditModal(index) {
    selectedRowIndex = index;
    const student = students[index];
    
    document.getElementById('editIndex').value = index;
    document.getElementById('editStudentId').value = student.studentId;
    document.getElementById('editFirstName').value = student.firstName;
    document.getElementById('editLastName').value = student.lastName;
    document.getElementById('editLab1').value = student.lab1;
    document.getElementById('editLab2').value = student.lab2;
    document.getElementById('editLab3').value = student.lab3;
    document.getElementById('editExam').value = student.exam;
    document.getElementById('editAttendance').value = student.attendance;
    
    document.getElementById('editModal').style.display = 'block';
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Save edit
function saveEdit() {
    const index = parseInt(document.getElementById('editIndex').value);
    const firstName = document.getElementById('editFirstName').value.trim();
    const lastName = document.getElementById('editLastName').value.trim();
    const lab1 = parseInt(document.getElementById('editLab1').value) || 0;
    const lab2 = parseInt(document.getElementById('editLab2').value) || 0;
    const lab3 = parseInt(document.getElementById('editLab3').value) || 0;
    const exam = parseInt(document.getElementById('editExam').value) || 0;
    const attendance = parseInt(document.getElementById('editAttendance').value) || 0;
    
    if (!firstName || !lastName) {
        alert('First Name and Last Name are required!');
        return;
    }
    
    students[index].firstName = firstName;
    students[index].lastName = lastName;
    students[index].lab1 = lab1;
    students[index].lab2 = lab2;
    students[index].lab3 = lab3;
    students[index].exam = exam;
    students[index].attendance = attendance;
    
    renderTable();
    closeEditModal();
    // Reapply current search filter (if any) immediately
    applyFilterNow(document.getElementById('searchInput') ? document.getElementById('searchInput').value : '');
    alert('Record updated successfully!');
}

// Update record count
function updateRecordCount() {
    const count = filteredStudents ? filteredStudents.length : students.length;
    document.getElementById('recordCount').textContent = `Total Records: ${count}`;
}

let filterTimeout = null;

// Debounced search filter (called from the search input)
function filterStudents(query) {
    clearTimeout(filterTimeout);
    filterTimeout = setTimeout(() => {
        const q = (query || '').trim().toLowerCase();
        if (!q) {
            filteredStudents = null;
        } else {
            filteredStudents = students.filter(s =>
                s.studentId.toLowerCase().includes(q) ||
                s.firstName.toLowerCase().includes(q) ||
                s.lastName.toLowerCase().includes(q)
            );
        }
        renderTable();
        updateRecordCount();
    }, 150);
}

// Immediate filter application (use after data changes)
function applyFilterNow(query) {
    clearTimeout(filterTimeout);
    const q = (query || '').trim().toLowerCase();
    if (!q) {
        filteredStudents = null;
    } else {
        filteredStudents = students.filter(s =>
            s.studentId.toLowerCase().includes(q) ||
            s.firstName.toLowerCase().includes(q) ||
            s.lastName.toLowerCase().includes(q)
        );
    }
    renderTable();
    updateRecordCount();
}

// Add new record
function addRecord() {
    const studentId = document.getElementById('studentId').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const lab1 = parseInt(document.getElementById('lab1').value) || 0;
    const lab2 = parseInt(document.getElementById('lab2').value) || 0;
    const lab3 = parseInt(document.getElementById('lab3').value) || 0;
    const exam = parseInt(document.getElementById('exam').value) || 0;
    const attendance = parseInt(document.getElementById('attendance').value) || 0;

    // Validation
    if (!studentId || !firstName || !lastName) {
        alert('Please fill in all required fields (Student ID, First Name, Last Name)');
        return;
    }

    // Check for duplicate Student ID
    if (students.some(s => s.studentId === studentId)) {
        alert('A student with this ID already exists!');
        return;
    }

    // Add new student
    const newStudent = {
        studentId,
        firstName,
        lastName,
        lab1,
        lab2,
        lab3,
        exam,
        attendance
    };

    students.push(newStudent);
    // Reapply/refresh view with current filter (if any)
    applyFilterNow(document.getElementById('searchInput') ? document.getElementById('searchInput').value : '');
    clearFields();
    alert('Record added successfully!');
}

// Delete record with confirmation
function deleteSelectedRecord() {
    if (selectedRowIndex === null) {
        alert('Please select a record to delete by clicking on a row.');
        return;
    }
    
    const student = students[selectedRowIndex];
    const confirmDelete = confirm(
        `Are you sure you want to delete this record?\n\n` +
        `Student ID: ${student.studentId}\n` +
        `Name: ${student.firstName} ${student.lastName}`
    );

    if (confirmDelete) {
        students.splice(selectedRowIndex, 1);
        selectedRowIndex = null;
        // Reapply/refresh view with current filter (if any)
        applyFilterNow(document.getElementById('searchInput') ? document.getElementById('searchInput').value : '');
        alert('Record deleted successfully!');
    }
}

// Clear input fields
function clearFields() {
    document.getElementById('studentId').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('lab1').value = '';
    document.getElementById('lab2').value = '';
    document.getElementById('lab3').value = '';
    document.getElementById('exam').value = '';
    document.getElementById('attendance').value = '';
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', init);

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
}
