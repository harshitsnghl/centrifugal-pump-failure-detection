"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var csv = require("csv-parser");
var fs = require("fs");
var argv = require("yargs").argv;
var referenceParameter_1 = require("./shared/referenceParameter");
var display_1 = require("./shared/display");
var path = require("path");
var flow = argv.q;
var dischargePressure = argv.pd;
var current = argv.i;
var efficiency = argv.n;
var amplitudeOfVibration = argv.lemda;
var vibrationSpikeEnergy = argv.se;
var pumpTemperature = argv.tp;
var bearingTemperature = argv.tb;
var controlValveOpening = argv.cv;
var csvFilePath = argv.file;
var defaultFilePath = "assets/devation_data.csv";
var fetchedData = [];
var referenceDataArray = [];
var changeCount;
var totalWarnings;
var totalErrors;
if (fs.existsSync(csvFilePath)) {
    console.log("\nUSER MODE");
}
else if (fs.existsSync(defaultFilePath)) {
    csvFilePath = defaultFilePath;
    console.log("\nDEFAULT MODE");
}
else {
    csvFilePath = path.join(__dirname, "assets/" + "deviation_data.csv");
}
fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", function (data) {
    fetchedData.push(data);
})
    .on("end", function () {
    onReferenceDataFetchComplete();
});
function onReferenceDataFetchComplete() {
    var referenceData;
    for (var i = 0; i < fetchedData.length; i = i + 6) {
        referenceData = {
            criticalRanking: fetchedData[i]["Criticality ranking"],
            failureCauseCode: fetchedData[i]["Failure Cause code"],
            failureCauseDescription: fetchedData[i]["Possible cause of the failure (Failure Mode)"],
            flow: {
                indicator: fetchedData[i]["Q (M3/hr)"],
                setValue: Number(fetchedData[i + 1]["Q (M3/hr)"]),
                thresholdValue1: Number(fetchedData[i + 2]["Q (M3/hr)"]),
                deviation1: Number(fetchedData[i + 3]["Q (M3/hr)"]),
                thresholdValue2: Number(fetchedData[i + 4]["Q (M3/hr)"]),
                deviation2: Number(fetchedData[i + 5]["Q (M3/hr)"]),
            },
            dischargePressure: {
                indicator: fetchedData[i]["Pd (kg/cm2)"],
                setValue: Number(fetchedData[i + 1]["Pd (kg/cm2)"]),
                thresholdValue1: Number(fetchedData[i + 2]["Pd (kg/cm2)"]),
                deviation1: Number(fetchedData[i + 3]["Pd (kg/cm2)"]),
                thresholdValue2: Number(fetchedData[i + 4]["Pd (kg/cm2)"]),
                deviation2: Number(fetchedData[i + 5]["Pd (kg/cm2)"]),
            },
            nPSHr: {
                indicator: fetchedData[i]["NPSHR (m)"],
                setValue: Number(fetchedData[i + 1]["NPSHR (m)"]),
                thresholdValue1: Number(fetchedData[i + 2]["NPSHR (m)"]),
                deviation1: Number(fetchedData[i + 3]["NPSHR (m)"]),
                thresholdValue2: Number(fetchedData[i + 4]["NPSHR (m)"]),
                deviation2: Number(fetchedData[i + 5]["NPSHR (m)"]),
            },
            current: {
                indicator: fetchedData[i]["Pm (kw)/Ct (amps)"],
                setValue: Number(fetchedData[i + 1]["Pm (kw)/Ct (amps)"]),
                thresholdValue1: Number(fetchedData[i + 2]["Pm (kw)/Ct (amps)"]),
                deviation1: Number(fetchedData[i + 3]["Pm (kw)/Ct (amps)"]),
                thresholdValue2: Number(fetchedData[i + 4]["Pm (kw)/Ct (amps)"]),
                deviation2: Number(fetchedData[i + 5]["Pm (kw)/Ct (amps)"]),
            },
            efficiency: {
                indicator: fetchedData[i]["h (%)"],
                setValue: Number(fetchedData[i + 1]["h (%)"]),
                thresholdValue1: Number(fetchedData[i + 2]["h (%)"]),
                deviation1: Number(fetchedData[i + 3]["h (%)"]),
                thresholdValue2: Number(fetchedData[i + 4]["h (%)"]),
                deviation2: Number(fetchedData[i + 5]["h (%)"]),
            },
            changeInVibration: fetchedData[i]["Change in Vibration"] == "yes" ? true : false,
            amplitudeOfVibration: {
                indicator: fetchedData[i]["Vib. Signature, l (mm/s)"],
                setValue: Number(fetchedData[i + 1]["Vib. Signature, l (mm/s)"]),
                thresholdValue1: Number(fetchedData[i + 2]["Vib. Signature, l (mm/s)"]),
                deviation1: Number(fetchedData[i + 3]["Vib. Signature, l (mm/s)"]),
                thresholdValue2: Number(fetchedData[i + 4]["Vib. Signature, l (mm/s)"]),
                deviation2: Number(fetchedData[i + 5]["Vib. Signature, l (mm/s)"]),
            },
            vibrationSpikeEnergy: {
                indicator: fetchedData[i]["Spike energy, gSE"],
                setValue: Number(fetchedData[i + 1]["Spike energy, gSE"]),
                thresholdValue1: Number(fetchedData[i + 2]["Spike energy, gSE"]),
                deviation1: Number(fetchedData[i + 3]["Spike energy, gSE"]),
                thresholdValue2: Number(fetchedData[i + 4]["Spike energy, gSE"]),
                deviation2: Number(fetchedData[i + 5]["Spike energy, gSE"]),
            },
            noise: fetchedData[i]["Noise, dB"],
            pumpTemperature: {
                indicator: fetchedData[i]["TP (0C)"],
                setValue: Number(fetchedData[i + 1]["TP (0C)"]),
                thresholdValue1: Number(fetchedData[i + 2]["TP (0C)"]),
                deviation1: Number(fetchedData[i + 3]["TP (0C)"]),
                thresholdValue2: Number(fetchedData[i + 4]["TP (0C)"]),
                deviation2: Number(fetchedData[i + 5]["TP (0C)"]),
            },
            bearingTemperature: {
                indicator: fetchedData[i]["TB(oC)"],
                setValue: Number(fetchedData[i + 1]["TB(oC)"]),
                thresholdValue1: Number(fetchedData[i + 2]["TB(oC)"]),
                deviation1: Number(fetchedData[i + 3]["TB(oC)"]),
                thresholdValue2: Number(fetchedData[i + 4]["TB(oC)"]),
                deviation2: Number(fetchedData[i + 5]["TB(oC)"]),
            },
            controlValveOpening: {
                indicator: fetchedData[i]["Disc. Cntrl. Vlv. Opening (%)"],
                setValue: Number(fetchedData[i + 1]["Disc. Cntrl. Vlv. Opening (%)"]),
                thresholdValue1: Number(fetchedData[i + 2]["Disc. Cntrl. Vlv. Opening (%)"]),
                deviation1: Number(fetchedData[i + 3]["Disc. Cntrl. Vlv. Opening (%)"]),
                thresholdValue2: Number(fetchedData[i + 4]["Disc. Cntrl. Vlv. Opening (%)"]),
                deviation2: Number(fetchedData[i + 5]["Disc. Cntrl. Vlv. Opening (%)"]),
            },
            averageDeviation: {
                averageDeviation1: Number(fetchedData[i + 2]["Average Deviation"]),
                averageDeviation2: Number(fetchedData[i + 4]["Average Deviation"]),
            },
        };
        referenceDataArray.push(referenceData);
        referenceData = null;
    }
    onReferenceDataObjectCreation();
}
function onReferenceDataObjectCreation() {
    totalErrors = 0;
    totalWarnings = 0;
    // let referenceData = referenceDataArray[0];
    referenceDataArray.forEach(function (referenceData) {
        var averageDeviation = getAverageDeviation(referenceData);
        if (averageDeviation >=
            referenceData.averageDeviation.averageDeviation1 &&
            averageDeviation < referenceData.averageDeviation.averageDeviation2) {
            displayMessage(referenceData, display_1.Display.warning);
        }
        else if (averageDeviation >= referenceData.averageDeviation.averageDeviation2) {
            displayMessage(referenceData, display_1.Display.error);
        }
    });
    console.log("Total Warnings: " + totalWarnings);
    console.log("Total Errors: " + totalErrors);
}
function displayMessage(referenceData, messageType) {
    var screenWidth = process.stdout.columns;
    var upperLine = "";
    var lowerLine = "";
    for (var i = 0; i < screenWidth / 2; i++) {
        if (i > 4)
            upperLine = upperLine + "-";
        lowerLine = lowerLine + "-";
    }
    console.warn("\n" + (upperLine + messageType + upperLine));
    console.warn("\nCritical Ranking: " + referenceData.criticalRanking + "\nFailure Cause Code: " + referenceData.failureCauseCode + "\nPossible Cause of the failure: " + referenceData.failureCauseDescription + "\n");
    console.warn("" + lowerLine + lowerLine + "\n");
    if (messageType == display_1.Display.warning)
        totalWarnings++;
    else if (messageType == display_1.Display.error)
        totalErrors++;
}
function getCalc(spreadedReferenceParamters, inputParameterValue, flag) {
    if (flag === void 0) { flag = false; }
    var calc = 0;
    if ((spreadedReferenceParamters.indicator != referenceParameter_1.Indicator.noChange &&
        (spreadedReferenceParamters.indicator == referenceParameter_1.Indicator.increament ||
            spreadedReferenceParamters.indicator == referenceParameter_1.Indicator.decreament ||
            spreadedReferenceParamters.indicator ==
                referenceParameter_1.Indicator.smallIncreament ||
            spreadedReferenceParamters.indicator ==
                referenceParameter_1.Indicator.smallDecreament ||
            spreadedReferenceParamters.indicator ==
                referenceParameter_1.Indicator.largeIncreament ||
            spreadedReferenceParamters.indicator ==
                referenceParameter_1.Indicator.largeDecreament)) ||
        flag) {
        if (inputParameterValue)
            calc = Math.abs((spreadedReferenceParamters.setValue - inputParameterValue) /
                spreadedReferenceParamters.setValue);
        changeCount++;
    }
    return calc;
}
function getAverageDeviation(referenceData) {
    changeCount = 0;
    var calcFlow = getCalc(referenceData.flow, flow);
    var calcDischargePressure = getCalc(referenceData.dischargePressure, dischargePressure);
    var calcCurrent = getCalc(referenceData.current, current);
    var calcEfficiency = getCalc(referenceData.efficiency, efficiency);
    var calcAmplitudeOfVibration = getCalc(referenceData.amplitudeOfVibration, amplitudeOfVibration, true);
    var calcVibrationSpikeEnergy = getCalc(referenceData.vibrationSpikeEnergy, vibrationSpikeEnergy);
    var calcControlValveOpening = getCalc(referenceData.controlValveOpening, controlValveOpening);
    var calcPumpTemperature = getCalc(referenceData.pumpTemperature, pumpTemperature);
    var calcBearingTemperature = getCalc(referenceData.bearingTemperature, bearingTemperature);
    var sum = Math.abs(calcFlow +
        calcDischargePressure +
        calcCurrent +
        calcAmplitudeOfVibration +
        calcEfficiency +
        calcVibrationSpikeEnergy +
        calcControlValveOpening +
        calcPumpTemperature +
        calcBearingTemperature);
    // console.log(sum);
    // console.log(changeCount);
    var averageDeviation = sum / changeCount;
    return Number(averageDeviation.toFixed(15));
}
//# sourceMappingURL=sample.js.map