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
let currentTime=document.querySelector(".time");
let holiDay=document.querySelector(".holidayname");
let holiDate=document.querySelector(".holidaydate");
let holidayLeft=document.querySelector(".holidaycodown");
let aboutHoliday=document.querySelector(".aboutholiday");


let num = 0;
let some=0;
countBt.addEventListener("click", () => {
  num++;
  const correctSound = new Audio('mixkit-on-or-off-light-switch-tap-2585.wav');
correctSound.play();

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
    const correctSound = new Audio('mixkit-quick-win-video-game-notification-269.wav');
correctSound.play();
    counter.innerText=num;
    tasBeeh.innerText="tasbeeh reset";
    setTimeout(()=>{
        tasBeeh.innerText="tasbeeh............"
    },1000)
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
        function convertTo12Hour(time) {
            let [hours, minutes] = time.split(':');
            let period = 'A.M';
          
            // Convert hours to 12-hour format
            hours = parseInt(hours);
            if (hours >= 12) {
              period = 'P.M';
              if (hours > 12) {
                hours -= 12;
              }
            } else if (hours === 0) {
              hours = 12;
            }
          
            return `${hours}:${minutes}`;
          }
           function convertTo12Hour1(time) {
            let [hours, minutes,seconds] = time.split(':');
            let period = 'A.M';
          
            // Convert hours to 12-hour format
            hours = parseInt(hours);
            if (hours >= 12) {
              period = 'P.M';
              if (hours > 12) {
                hours -= 12;
              }
            } else if (hours === 0) {
              hours = 12;
            }
          
            return `${hours}:${minutes}:${seconds}`;
          }

        let data = await response.json();
        console.log(data);
        function timeUpdate(){const cuTime=new Date().toLocaleTimeString();
          currentTime.innerText=convertTo12Hour1(cuTime);
        }
        setInterval(timeUpdate,1000);
        timeUpdate();
        
        fajrT.innerText=convertTo12Hour(data.data.timings.Fajr); 
        zoharT.innerText=convertTo12Hour(data.data.timings.Dhuhr);
        asrT.innerText=convertTo12Hour(data.data.timings.Asr);
        maghribT.innerText=convertTo12Hour(data.data.timings.Maghrib);
        ishaT.innerText=convertTo12Hour(data.data.timings.Isha);
        engDate.innerText=`${data.data.date.gregorian.date}`;
        urduDate.innerText= data.data.date.hijri.day-1 ;
        islamMonth.innerText=`(${data.data.date.hijri.month.number})${data.data.date.hijri.month.ar} `;
        sunRise.innerText=convertTo12Hour(data.data.timings.Sunrise);
        sunSet.innerText=convertTo12Hour(data.data.timings.Maghrib);
        engMonth.innerText=`(${data.data.date.gregorian.month.number})${data.data.date.gregorian.month.en}`;
        dAy.innerText=`${data.data.date.gregorian.weekday.en}`;
        sehriTime.innerText=convertTo12Hour(data.data.timings.Imsak);
        hijriYear.innerText=`${data.data.date.hijri.year}`;
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

const getDate = async () => {
  const URL = `https://calendarific.com/api/v2/holidays?api_key=ja5zhqTPZOpSQUOKgzc8PVMGmY7kuAn2&country=IN&year=2025`;

  try {
    let response = await fetch(URL);

    // Check if the response is OK (status code 200–299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data = await response.json();
    let holidays = data.response.holidays;
    console.log(data.response);

    function getNextHoliday() {
      const today = new Date();
      for (let i = 0; i < holidays.length; i++) {
        const holidayDate = new Date(holidays[i].date.iso);
        if (holidayDate >= today) {
          return holidays[i];
        }
      }
      return null; // All holidays are over
    }

    function updateHolidayInfo() {
      const nextHoliday = getNextHoliday();

      if (!nextHoliday) {
        holiDay.innerText =
          "No upcoming holidays.";
        holidayLeft.innerText = "";
        return;
      }

      const today = new Date();
      const holidayDate = new Date(nextHoliday.date.iso);
      const timeDiff = holidayDate - today;
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      holiDay.innerText = nextHoliday.name;
      holiDate.innerText=nextHoliday.date.iso.split('-').reverse().join('-');
      holidayLeft.innerText = `In ${daysLeft} days`;
      aboutHoliday.innerText = nextHoliday.description || "No description available.";
    }

    // Update every day at midnight
    updateHolidayInfo();
    setInterval(updateHolidayInfo, 1000 * 60 * 60 * 24); // Update every 24 hours
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
// Call the function to fetch and log data
getDate();


