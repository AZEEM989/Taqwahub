let main = document.querySelector(".main");
let counter = document.querySelector(".counter");
let tasBeeh = document.querySelector(".tasbeeh");
let countBt = document.querySelector(".count");
let resetBt = document.querySelector(".reset");
let fajrT=document.querySelector(".fajr");
let zoharT=document.querySelector(".zuhur");
let asrT=document.querySelector(".asr");
let maghribT=document.querySelector(".maghrib");
let ishaT=document.querySelector(".isha");
let engDate=document.querySelector(".engdate")
let urduDate=document.querySelector(".urdudate");
let islamMonth=document.querySelector(".islammonth");
let sunRise=document.querySelector(".sunrise");
let sunSet=document.querySelector(".sunset");
let engMonth=document.querySelector(".engmonth");
let dAy=document.querySelector(".day");
let sehriTime=document.querySelector(".sehri");
let hijriYear=document.querySelector(".hijriyear");


let num = 0;
let some=0;
countBt.addEventListener("click", () => {
  num++;
  counter.innerText = num;
//   tasBeeh.innerText="tasbeeh.........."
  
  if (num === 100) {
    some++;
    tasBeeh.innerText = `${some} tasbeeh Completed`;
    // tasBeeh,innerText=`الحمدللہ  تسبیح مکمل ہو چکی`
        num = 0;
  }
});

resetBt.addEventListener("click",()=>{
    num=0;
    some=0;
    counter.innerText=num;
    tasBeeh.innerText="tasbeeh reset";
    setTimeout(()=>{
        tasBeeh.innerText="tasbeeh............"
    },2000)
})

const getCurrentDate = () => {
    const today = new Date();
    
    // Format date as dd-mm-yyyy
    let day = String(today.getDate()).padStart(2, '0'); // Ensures 2 digits (e.g., "01" for the 1st)
    let month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1
    let year = today.getFullYear();
  
    return `${day}-${month}-${year}`;
  }
  
  



const getTiming = async () => {
    const currentDate = getCurrentDate();
    const URL = `https://api.aladhan.com/v1/timingsByCity/${currentDate}?city=Badaun&country=IN&method=22`;
    try {
        let response = await fetch(URL);
        
        // Check if the response is OK (status code 200–299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        console.log(data);
        fajrT.innerText=`${data.data.timings.Fajr}   ----------------   فجر`; 
        zoharT.innerText=`${data.data.timings.Dhuhr} ----------------  ظہر`;
        asrT.innerText=`${data.data.timings.Asr} ---------------  عصر`;
        maghribT.innerText=`${data.data.timings.Maghrib} ---------------  مغرب`;
        ishaT.innerText=`${data.data.timings.Isha} ----------------   عشا`;
        engDate.innerText=`${data.data.date.gregorian.date}  ---  انگریزی تاریخ`;
        urduDate.innerText=`${data.data.date.hijri.day} -------------- چاند کی تاریخ`;
        islamMonth.innerText=`(${data.data.date.hijri.month.number}) اسلامی مہینہ ------- ${data.data.date.hijri.month.ar} `;
        sunRise.innerText=`${data.data.timings.Sunrise} ----------- طلوع آفتاب`;
        sunSet.innerText=`${data.data.timings.Maghrib} ----------- غروب آفتاب`;
        engMonth.innerText=`(${data.data.date.gregorian.month.number})${data.data.date.gregorian.month.en} - انگریزی مہینہ`;
        dAy.innerText=`${data.data.date.gregorian.weekday.en} --------------- دن`;
        sehriTime.innerText=`${data.data.timings.Imsak} ---------- سحری کا وقت`;
        hijriYear.innerText=`${data.data.date.hijri.year} ---------------- ہجری`;
        // Log the fetched data to the console
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Call the function to fetch and log data
getTiming();


  // Base URL for the audio
  const baseURL = "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/";

  // Create the dropdown options for 114 Surahs
  const surahSelect = document.getElementById('surahSelect');
  for (let i = 1; i <= 114; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.text = `Surah ${i}`;
      surahSelect.appendChild(option);
  }

  // Function to update the audio source when submit button is clicked
  const updateAudio = () => {
      const surahNumber = surahSelect.value;
      const audioElement = document.getElementById('surahAudio');
      audioElement.src = `${baseURL}${surahNumber}.mp3`;
      audioElement.play();  // Optionally auto-play the selected Surah
  };

  // Event listener for the submit button
  const submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', updateAudio);

  // Set the initial audio to Surah 1 (optional)
  surahSelect.value = 1;



  const getUpdate=async ()=>{
    const someURL="https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar";

  try{
    let responsed2=await fetch(someURL);
    if(!responsed2.ok){
        throw new Error(`HTTP error! Status: ${responsed2.status}`);
    }
    let getFile=await responsed2.json();
    console.log(getFile.result);
  }catch(error){
    console.error("Error fetching data:", error);
  }
  };
  getUpdate();