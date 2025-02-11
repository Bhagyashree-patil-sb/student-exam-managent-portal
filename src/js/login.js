
const studentsData = {
    "SG23CSD001": { name: "ADITYA", fatherName: "SHIVAKUMAR" },
    "SG23CSD002": { name: "AJEET", fatherName: "IRANNA DUKANDAR" },
    "SG23CSD003": { name: "AMBRESH", fatherName: "SHIVARAM" },
    "SG23CSD004": { name: "AMIT KUMAR", fatherName: "SHIVAGUNDAPPA" },
    "SG23CSD005": { name: "ARPIT", fatherName: "GOPAL" },
    "SG23CSD006": { name: "ASHWINI", fatherName: "BASAVANTRAYA" },
    "SG23CSD007": { name: "BHAGYASHREE", fatherName: "ANNARA0" },
    "SG23CSD008": { name: "BHAVANI", fatherName: "GURUBASAYYA" },
    "SG23CSD009": { name: "BHAVANI PATIL", fatherName: "SHARANABASAPPA" },
    "SG23CSD010": { name: "BHIMANNAGOUDA A BIRADAR", fatherName: "AMRUTH B BIRADAR" },
    "SG23CSD011": { name: "CHETANA", fatherName: "YESHWANTHRAO PATIL" },
    "SG23CSD012": { name: "GIRISH", fatherName: "GOPALKRISHNA S PRABHU" },
    "SG23CSD013": { name: "GURUMURTHY", fatherName: "SOMSHEKHAR" },
    "SG23CSD014": { name: "GURURAJ MASALI", fatherName: "MAHANTESH MASALI" },
    "SG23CSD015": { name: "HARSHITA KATTI", fatherName: "HARI KATTI" },
    "SG23CSD016": { name: "KEDARNATH", fatherName: "RAJENDRA MULAGE" },
    "SG23CSD017": { name: "KOMAL N MENGJI", fatherName: "NARASING C MENGJI" },
    "SG23CSD018": { name: "KUNAL S", fatherName: "SANGRAM" },
    "SG23CSD019": { name: "MAHANTESH", fatherName: "GIREPPA SIBARBANDI" },
    "SG23CSD020": { name: "MALLIKARJUN", fatherName: "VIRUPAKSHAPPA" },
    "SG23CSD021": { name: "MANASVI S KOANGUTTI", fatherName: "SHANT KUMAR" },
    "SG23CSD022": { name: "MD TOUFIQ PATEL", fatherName: "KHASIM PATEL" },
    "SG23CSD023": { name: "MD UNED IMRAN", fatherName: "ABDUL AZIZ SAB" },
    "SG23CSD024": { name: "POOJA", fatherName: "CHANDRAKANTHI" },
    "SG23CSD025": { name: "POOJA", fatherName: "PRAMOD KUMAR HIBARE" },
    "SG23CSD026": { name: "POOJA", fatherName: "SIDRAMAPPA YANAGUNTI" },
    "SG23CSD027": { name: "PRAKASH", fatherName: "ANNAPPA" },
    "SG23CSD028": { name: "RAGHAVENDRA", fatherName: "ANANDKUMAR SHAHAPURKAR" },
    "SG23CSD029": { name: "RAJESH", fatherName: "BASAVARAJ" },
    "SG23CSD030": { name: "RAMLING REDDY", fatherName: "LAXMIKANTH REDDY" },
    "SG23CSD031": { name: "ROHIT", fatherName: "RAMESH GUTTEDAR" },
    "SG23CSD032": { name: "SAHANA", fatherName: "SHAM RAO GOWD" },
    "SG23CSD033": { name: "SANGAMESH", fatherName: "PRAKASH MAROOR" },
    "SG23CSD034": { name: "SANGANGOUDA B PATIL", fatherName: "BABUGOUDA PATIL" },
    "SG23CSD035": { name: "SANJANA", fatherName: "MALLAPPA" },
    "SG23CSD036": { name: "SAYYAD ZAIDPASHA", fatherName: "SAYYAD CHANDPASHA" },
    "SG23CSD037": { name: "SHARANPRAKASH PATIL", fatherName: "MALLINATH PATIL" },
    "SG23CSD038": { name: "SHARANU", fatherName: "SHREEMANTA" },
    "SG23CSD039": { name: "SHILPA SIDDAPPA KUDAVAKKALAGI", fatherName: "SIDDAPPA KALLAPPA KUDAVAKKA" },
    "SG23CSD040": { name: "SHIVANGOUDA", fatherName: "MALLIKARJUN MALIPATIL" },
    "SG23CSD041": { name: "SHIVANNAGOWDA", fatherName: "GOUDAPPA GOUDA POLICE PATIL" },
    "SG23CSD042": { name: "SHRADHA PATIL", fatherName: "RAVINDRA PATIL" },
    "SG23CSD043": { name: "SIDDESHWAR", fatherName: "BASAYYA" },
    "SG23CSD044": { name: "SNEHA", fatherName: "SOMASHEKAR" },
    "SG23CSD045": { name: "SOHAN KALASKAR", fatherName: "ARUN KALASKAR" },
    "SG23CSD046": { name: "SONAJIRAO", fatherName: "SHRAVANKUMAR" },
    "SG23CSD047": { name: "SUHASINI", fatherName: "HANAMANT" },
    "SG23CSD048": { name: "SUMEETKUMAR JANGIR", fatherName: "MAHENDRAKUMAR JANGIR" },
    "SG23CSD049": { name: "SUPRIYA G HIREMATH", fatherName: "GURULINGAYYA SWAMY HIREMAT" },
    "SG23CSD050": { name: "SURAJ PATIL", fatherName: "SHANKARGOUDA MALIPATIL" },
    "SG23CSD051": { name: "SWAYAM S PURANIK", fatherName: "SANGAYYA S PURANIK" },
    "SG23CSD052": { name: "VAIBHAV", fatherName: "DAYANAND G HANJAGIMATH" },
    "SG23CSD053": { name: "VAIBHAV S DHATTI", fatherName: "SHIVKUMAR" },
    "SG23CSD054": { name: "VAIBHAVI S DODDAMANI", fatherName: "SURYAKANT S D" },
    "SG23CSD055": { name: "VEDIKA CHOWDHARY", fatherName: "PRAKASH CHOWDHARY" },
    "SG23CSD056": { name: "VEERESH", fatherName: "SHARANABASAPPA" },
    "SG23CSD057": { name: "VISHWA S KARIKAL", fatherName: "SHIVARUDRAPPA T KARIKAL" },
    "SG23CSD058": { name: "YAZDAN MUSHRAF BAIG", fatherName: "CHAND BAIG" },
    "SG23CSD059": { name: "YOGESH", fatherName: "SHIVARAJ SAGUMALE" },
    "SG23CSD060": { name: "ZYED ASAM", fatherName: "MUKARAM MOIUDDIN" }
};


function populateUSNOptions() {
    const usnSelect = document.getElementById('usn');
    for (let usn in studentsData) {
        const option = document.createElement('option');
        option.value = usn;
        option.textContent = usn;
        usnSelect.appendChild(option);
    }
}


function autoFillDetails() {
    const usn = document.getElementById('usn').value;
    const nameInput = document.getElementById('name');
    const fatherNameInput = document.getElementById('father-name');
    if (studentsData[usn]) {
        nameInput.value = studentsData[usn].name;
        fatherNameInput.value = studentsData[usn].fatherName;
    } else {
        nameInput.value = '';
        fatherNameInput.value = '';
    }
}


function handleLogin(event) {
    event.preventDefault(); 

    const usn = document.getElementById('usn').value;
    const password = document.getElementById('password').value;

 
    if (!studentsData[usn] || password !== "22CS35") {
        document.getElementById('error-message').style.display = 'block';
        return;
    } else {
        document.getElementById('error-message').style.display = 'none'; 
    }


    const studentData = {
        usn: usn,
        name: studentsData[usn].name,
        fatherName: studentsData[usn].fatherName
    };
    localStorage.setItem('loggedInStudent', JSON.stringify(studentData));

    window.location.href = 'exam.html';
}


document.getElementById('login-form').addEventListener('submit', handleLogin);
document.getElementById('usn').addEventListener('change', autoFillDetails);


populateUSNOptions();
