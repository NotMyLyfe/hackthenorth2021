require("./handler/notifications");
const express = require('express');
const app = express();
const cors = require('cors');
const api = require('./routes/api');

const ConfigAccess = require('./services/configAccess');

app.use(cors());
app.use(express.json());
app.use('/api', api);

app.listen(3000, () => {
    console.log('Listening on port 3000');
})

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

setInterval(function() {
	const configNames = ConfigAccess.getAllConfigNames();
	const currentMode = ConfigAccess.getCurrentConfig();
	
	let switchTarget = false;
	let switchAway = false;
	
	for(const mode of configNames){
		const modeInfo = ConfigAccess.getConfig(mode);
		if(modeInfo.automation === "app"){
			const appName = modeInfo.automationData.app;
			if(appName){
				// check if the app is in the process list
				if(true){
					switchTarget = mode;
					continue;
				}
			}
		}
		else if(modeInfo.automation === "time"){
			const day = modeInfo.automationData.timeDay;
			const startTime = modeInfo.automationData.timeStartTime;
			const endTime = modeInfo.automationData.timeEndTime;
			
			const cDT = new Date();
			const cDayName = weekday[cDT.getDay()]
			
			try {
				if(day.indexOf(cDayName) !== -1){
					const sDT = new Date(startTime);
					const eDT = new Date(endTime);
					
					if(sDT <= cDT && eDT > cDT){
						switchTarget = mode;
						continue;
					}
				}
			}
			catch(err){
				console.log(`error while processing automation for ${mode}`, err);
			}
		}
		
		if(mode === currentMode){
			// condition is no longer active, switch away!
			switchAway = true;
		}
	}
	
	//console.log("switch target det", currentMode, switchTarget, switchAway);
	
	if(switchTarget !== false && switchTarget !== currentMode){
		console.log("Switching to " + switchTarget);
		ConfigAccess.setCurrentConfig(switchTarget);
	}
	else if(switchAway) {
		console.log("Switching away.");
		ConfigAccess.setCurrentConfig("Disabled");
	}
}, 1000);